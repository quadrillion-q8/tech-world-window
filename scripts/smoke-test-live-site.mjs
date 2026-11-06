import process from 'node:process';

const DEFAULT_SITE_URL = 'https://www.techworldwindow.com';
const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
const CANONICAL_SITE_URL = DEFAULT_SITE_URL;
const SITE_ORIGIN = new URL(SITE_URL).origin;
const IS_PRODUCTION_SITE = SITE_ORIGIN === new URL(CANONICAL_SITE_URL).origin;
const VERCEL_SHARE_TOKEN = process.env.VERCEL_SHARE_TOKEN || '';
const APEX_URL = 'https://techworldwindow.com/';
const CONCURRENCY = 6;
const REQUEST_TIMEOUT_MS = 20_000;
const failures = [];

function withoutShareToken(url) {
  const parsed = new URL(url);
  parsed.searchParams.delete('_vercel_share');
  return parsed.href;
}

async function fetchWithRetry(url, options = {}, retries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      let requestUrl = url;
      if (!IS_PRODUCTION_SITE && VERCEL_SHARE_TOKEN) {
        const parsedRequestUrl = new URL(url);
        if (parsedRequestUrl.origin === SITE_ORIGIN) {
          parsedRequestUrl.searchParams.set('_vercel_share', VERCEL_SHARE_TOKEN);
          requestUrl = parsedRequestUrl.href;
        }
      }
      const response = await fetch(requestUrl, {
        ...options,
        headers: {
          'user-agent': 'TechWorldWindow-LiveSmokeCheck/1.0 (+https://www.techworldwindow.com)',
          ...(options.headers || {}),
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (response.status >= 500 && attempt < retries) {
        await response.arrayBuffer().catch(() => {});
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < retries) continue;
    }
  }
  throw lastError || new Error('Request failed after retries');
}

async function checkApexRedirect(path = '/') {
  try {
    const apexUrl = new URL(path, APEX_URL);
    const expectedDestination = new URL(path, CANONICAL_SITE_URL).href;
    const response = await fetchWithRetry(apexUrl.href, { redirect: 'manual' });
    const location = response.headers.get('location');
    const destination = location ? withoutShareToken(new URL(location, apexUrl).href) : '';
    if (response.status !== 308 || destination !== expectedDestination) {
      failures.push(`Apex redirect for ${path}: expected one 308 to ${expectedDestination}, received ${response.status} to ${destination || '(no Location header)'}`);
    } else {
      console.log(`PASS apex redirect for ${path}: 308 → ${destination}`);
    }
  } catch (error) {
    failures.push(`Apex redirect request failed for ${path}: ${error.message}`);
  }
}


async function checkRedirectChain(startUrl, expectedFinalUrl, maxRedirects, label) {
  try {
    let currentUrl = startUrl;
    let redirects = 0;

    while (true) {
      const response = await fetchWithRetry(currentUrl, { redirect: 'manual' });
      const isRedirect = [301, 302, 303, 307, 308].includes(response.status);

      if (isRedirect) {
        const location = response.headers.get('location');
        if (!location) {
          failures.push(`${label}: HTTP ${response.status} returned no Location header at ${currentUrl}`);
          return;
        }
        if (response.status !== 308) {
          failures.push(`${label}: expected permanent HTTP 308 at ${currentUrl}, received HTTP ${response.status}`);
          return;
        }
        if (redirects >= maxRedirects) {
          failures.push(`${label}: exceeded ${maxRedirects} redirect(s); next hop would be ${new URL(location, currentUrl).href}`);
          return;
        }
        currentUrl = withoutShareToken(new URL(location, currentUrl).href);
        redirects += 1;
        continue;
      }

      if (response.status !== 200) {
        failures.push(`${label}: expected final HTTP 200 at ${currentUrl}, received HTTP ${response.status}`);
        return;
      }
      if (currentUrl !== expectedFinalUrl) {
        failures.push(`${label}: expected final URL ${expectedFinalUrl}, reached ${currentUrl}`);
        return;
      }
      if (redirects === 0) {
        failures.push(`${label}: expected a redirect but received HTTP 200 directly`);
        return;
      }
      console.log(`PASS ${label}: ${redirects} redirect(s) → ${currentUrl}`);
      return;
    }
  } catch (error) {
    failures.push(`${label}: request failed: ${error.message}`);
  }
}

async function getText(url) {
  const response = await fetchWithRetry(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return { response, text: await response.text() };
}

async function checkRobotsAndSitemap() {
  let robotsText;
  let sitemapText;
  try {
    ({ text: robotsText } = await getText(`${SITE_URL}/robots.txt`));
    if (!/^User-agent:\s*\*\s*$/m.test(robotsText)) {
      failures.push('robots.txt does not contain a wildcard User-agent rule.');
    }
    if (/^Disallow:\s*\/\s*$/m.test(robotsText)) {
      failures.push('robots.txt disallows the entire site.');
    }
    const expectedSitemapUrl = CANONICAL_SITE_URL + '/sitemap.xml';
    if (!robotsText.includes('Sitemap: ' + expectedSitemapUrl)) {
      failures.push('robots.txt does not reference ' + expectedSitemapUrl);
    }
    console.log('PASS robots.txt fetched and sitemap reference checked');
  } catch (error) {
    failures.push(`robots.txt check failed: ${error.message}`);
    return [];
  }

  try {
    ({ text: sitemapText } = await getText(`${SITE_URL}/sitemap.xml`));
  } catch (error) {
    failures.push(`sitemap.xml check failed: ${error.message}`);
    return [];
  }

  const urls = [...sitemapText.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(match => match[1].trim());
  if (!urls.length) {
    failures.push('sitemap.xml contains no <loc> URLs.');
    return [];
  }
  if (new Set(urls).size !== urls.length) failures.push('sitemap.xml contains duplicate URLs.');

  for (const value of urls) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.hostname !== new URL(CANONICAL_SITE_URL).hostname) {
        failures.push(`Unexpected sitemap hostname/protocol: ${value}`);
      }
      if (url.search || url.hash) failures.push(`Sitemap URL contains a query or fragment: ${value}`);
    } catch {
      failures.push(`Invalid sitemap URL: ${value}`);
    }
  }
  console.log(`PASS sitemap.xml parsed: ${urls.length} URLs, ${new Set(urls).size} unique`);
  return [...new Set(urls)];
}

function canonicalFromHtml(html) {
  const linkTag = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)?.[0];
  return linkTag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || null;
}

async function checkPage(url) {
  try {
    const canonicalUrl = new URL(url);
    const requestUrl = new URL(canonicalUrl.pathname + canonicalUrl.search, SITE_URL).href;
    const { response, text: html } = await getText(requestUrl);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('text/html')) {
      failures.push(`Expected HTML but received "${contentType}" for ${url}`);
      return;
    }
    if (!/<title\b[^>]*>\s*[^<]+\s*<\/title>/i.test(html)) {
      failures.push(`Missing or empty <title> on ${url}`);
    }
    const canonical = canonicalFromHtml(html);
    if (!canonical) {
      failures.push(`Missing canonical link on ${url}`);
    } else {
      const expected = new URL(canonicalUrl.pathname + canonicalUrl.search, CANONICAL_SITE_URL);
      expected.hash = '';
      const actualCanonical = new URL(canonical, expected);
      actualCanonical.hash = '';
      // Treat the root URL with and without a trailing slash as equivalent.
      // Non-root paths must still match exactly, including their trailing slash.
      const normalizeRootSlash = value => value.pathname === '/' ? `${value.origin}/` : value.href;
      if (normalizeRootSlash(actualCanonical) !== normalizeRootSlash(expected)) {
        failures.push(`Canonical mismatch on ${url}: found ${canonical}`);
      }
    }
    const robotsTag = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0] || '';
    if (/\bnoindex\b/i.test(robotsTag)) failures.push(`Indexable sitemap URL has noindex on ${url}`);
  } catch (error) {
    failures.push(`Page request failed for ${url}: ${error.message}`);
  }
}

async function main() {
  console.log('Checking ' + (IS_PRODUCTION_SITE ? 'production site: ' : 'preview site: ') + SITE_URL);
  const urls = await checkRobotsAndSitemap();
  if (!urls.length) {
    console.error('\nLive smoke check failed before route checks could run.');
    process.exitCode = 1;
    return;
  }

  if (IS_PRODUCTION_SITE) {
    // The apex-to-www redirect is configured at the Vercel project-domain level.
    await checkApexRedirect('/');
    const representativePage = urls.find(url => new URL(url).pathname !== '/');
    if (representativePage) {
      await checkApexRedirect(new URL(representativePage).pathname);
    }
  } else {
    console.log('SKIP apex redirect checks: preview hosts do not own the production apex domain');
  }

  // On production, validate the two-hop apex -> www -> legacy destination chain
  // and the one-hop www legacy redirects. On a preview host, the legacy paths
  // should redirect directly to their production canonical destinations.
  const legacyRedirects = IS_PRODUCTION_SITE ? [
    {
      path: '/windows-11-update-stuck-troubleshooting',
      destination: 'https://www.techworldwindow.com/windows/windows-update-stuck',
      label: 'legacy Windows Update URL (apex)',
      host: 'https://techworldwindow.com',
      maxRedirects: 2,
    },
    {
      path: '/tools/windows-crash-investigator',
      destination: 'https://www.techworldwindow.com/tools',
      label: 'legacy Windows Crash Investigator URL (apex)',
      host: 'https://techworldwindow.com',
      maxRedirects: 2,
    },
    {
      path: '/windows-11-update-stuck-troubleshooting',
      destination: 'https://www.techworldwindow.com/windows/windows-update-stuck',
      label: 'legacy Windows Update URL (www)',
      host: 'https://www.techworldwindow.com',
      maxRedirects: 1,
    },
    {
      path: '/tools/windows-crash-investigator',
      destination: 'https://www.techworldwindow.com/tools',
      label: 'legacy Windows Crash Investigator URL (www)',
      host: 'https://www.techworldwindow.com',
      maxRedirects: 1,
    },
  ] : [
    {
      path: '/windows-11-update-stuck-troubleshooting',
      destination: 'https://www.techworldwindow.com/windows/windows-update-stuck',
      label: 'legacy Windows Update URL (Preview host)',
      host: SITE_URL,
      maxRedirects: 1,
    },
    {
      path: '/tools/windows-crash-investigator',
      destination: 'https://www.techworldwindow.com/tools',
      label: 'legacy Windows Crash Investigator URL (Preview host)',
      host: SITE_URL,
      maxRedirects: 1,
    },
  ];
  await Promise.all(legacyRedirects.map(item =>
    checkRedirectChain(new URL(item.path, item.host).href, item.destination, item.maxRedirects, item.label)
  ));

  if (IS_PRODUCTION_SITE) {
    // Trailing-slash normalization should not add a third hop on HTTPS apex URLs.
    await checkRedirectChain(
      'https://techworldwindow.com/guides/',
      'https://www.techworldwindow.com/guides',
      2,
      'HTTPS apex trailing-slash normalization'
    );
    await checkRedirectChain(
      'https://www.techworldwindow.com/guides/',
      'https://www.techworldwindow.com/guides',
      1,
      'www trailing-slash normalization'
    );
    // HTTP adds an HTTPS upgrade before host/path normalization.
    await checkRedirectChain(
      'http://techworldwindow.com/guides/',
      'https://www.techworldwindow.com/guides',
      3,
      'HTTP apex trailing-slash normalization'
    );
  } else {
    await checkRedirectChain(
      new URL('/guides/', SITE_URL).href,
      new URL('/guides', SITE_URL).href,
      1,
      'Preview trailing-slash normalization'
    );
  }

  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, urls.length) }, async () => {
    while (nextIndex < urls.length) {
      const index = nextIndex;
      nextIndex += 1;
      await checkPage(urls[index]);
      if ((index + 1) % 20 === 0 || index + 1 === urls.length) {
        console.log(`Checked ${index + 1}/${urls.length} sitemap URLs`);
      }
    }
  });
  await Promise.all(workers);

  if (failures.length) {
    console.error(`\nLive smoke check failed with ${failures.length} issue(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }
  console.log(`\nPASS: apex redirect, robots.txt, sitemap.xml, and all ${urls.length} canonical HTML routes.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
