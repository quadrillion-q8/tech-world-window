import process from 'node:process';

const SITE_URL = (process.env.SITE_URL || 'https://www.techworldwindow.com').replace(/\/$/, '');
const APEX_URL = 'https://techworldwindow.com/';
const CONCURRENCY = 6;
const REQUEST_TIMEOUT_MS = 20_000;
const failures = [];

async function fetchWithRetry(url, options = {}, retries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
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
    const expectedDestination = new URL(path, SITE_URL).href;
    const response = await fetchWithRetry(apexUrl.href, { redirect: 'manual' });
    const location = response.headers.get('location');
    const destination = location ? new URL(location, apexUrl).href : '';
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
        currentUrl = new URL(location, currentUrl).href;
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
    if (!robotsText.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
      failures.push(`robots.txt does not reference ${SITE_URL}/sitemap.xml`);
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
      if (url.protocol !== 'https:' || url.hostname !== new URL(SITE_URL).hostname) {
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
    const { response, text: html } = await getText(url);
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
      const expected = new URL(url);
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
  console.log(`Checking production site: ${SITE_URL}`);
  const urls = await checkRobotsAndSitemap();
  if (!urls.length) {
    console.error('\nLive smoke check failed before route checks could run.');
    process.exitCode = 1;
    return;
  }

  // Check the canonical host redirect at both the root and a real sitemap route.
  // A root-only check would miss path-specific redirect or routing regressions.
  await checkApexRedirect('/');
  const representativePage = urls.find(url => new URL(url).pathname !== '/');
  if (representativePage) {
    await checkApexRedirect(new URL(representativePage).pathname);
  }

  // The Vercel project domain setting canonicalizes the apex host to www.
  // An apex legacy URL can therefore require two permanent redirects:
  // apex -> www, followed by the legacy path -> its final canonical destination.
  // A www legacy URL should still reach its destination in one redirect.
  const legacyRedirects = [
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
  ];
  await Promise.all(legacyRedirects.map(item =>
    checkRedirectChain(`${item.host}${item.path}`, item.destination, item.maxRedirects, item.label)
  ));

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
  // HTTP adds an HTTPS upgrade before host/path normalization, so allow that
  // protocol upgrade plus the two canonicalization steps.
  await checkRedirectChain(
    'http://techworldwindow.com/guides/',
    'https://www.techworldwindow.com/guides',
    3,
    'HTTP apex trailing-slash normalization'
  );

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
