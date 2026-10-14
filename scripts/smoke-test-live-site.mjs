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

async function checkApexRedirect() {
  try {
    const response = await fetchWithRetry(APEX_URL, { redirect: 'manual' });
    const location = response.headers.get('location');
    const destination = location ? new URL(location, APEX_URL).href : '';
    if (response.status !== 308 || destination !== `${SITE_URL}/`) {
      failures.push(`Apex redirect: expected 308 to ${SITE_URL}/, received ${response.status} to ${destination || '(no Location header)'}`);
    } else {
      console.log(`PASS apex redirect: 308 → ${destination}`);
    }
  } catch (error) {
    failures.push(`Apex redirect request failed: ${error.message}`);
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
  await checkApexRedirect();
  const urls = await checkRobotsAndSitemap();
  if (!urls.length) {
    console.error('\nLive smoke check failed before route checks could run.');
    process.exitCode = 1;
    return;
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
