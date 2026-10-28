import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUTPUT_DIR = path.resolve('artifacts/googlebot-raw-html');
const USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const TIMEOUT_MS = 30_000;

const TARGETS = [
  {
    name: 'gpu-100-percent-usage-gaming',
    url: 'https://www.techworldwindow.com/gpu-100-percent-usage-gaming',
    kind: 'article',
  },
  {
    name: 'pc-bottleneck-calculator',
    url: 'https://www.techworldwindow.com/tools/pc-bottleneck-calculator',
    kind: 'tool',
  },
];

function decodeHtml(value = '') {
  const named = {
    amp: '&', apos: "'", gt: '>', lt: '<', quot: '"', nbsp: ' ',
    ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
    hellip: '…', copy: '©', reg: '®',
  };
  return value
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, entity) => {
      if (entity[0] === '#') {
        const hex = entity[1]?.toLowerCase() === 'x';
        const code = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
        try { return Number.isFinite(code) ? String.fromCodePoint(code) : whole; } catch { return whole; }
      }
      return named[entity.toLowerCase()] ?? whole;
    });
}

function attr(tag, name) {
  const match = tag.match(new RegExp('\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))', 'i'));
  return match ? decodeHtml(match[1] ?? match[2] ?? match[3] ?? '') : null;
}

function tagsOf(html, tagName) {
  return [...html.matchAll(new RegExp('<' + tagName + '\\b[^>]*>', 'gi'))].map(match => match[0]);
}

function textFromHtml(html) {
  return decodeHtml(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}

function headingTexts(html, tagName) {
  return [...html.matchAll(new RegExp('<' + tagName + '\\b[^>]*>([\\s\\S]*?)<\\/' + tagName + '\\s*>', 'gi'))]
    .map(match => textFromHtml(match[1]))
    .filter(Boolean);
}

function count(regex, value) {
  return [...value.matchAll(regex)].length;
}

function pass(name, ok, detail) {
  return { check: name, status: ok ? 'PASS' : 'WARN', detail };
}

async function checkTarget(target) {
  const result = {
    name: target.name,
    requestedUrl: target.url,
    kind: target.kind,
    userAgent: USER_AGENT,
    retrievedAt: new Date().toISOString(),
    caveat: 'This is a Googlebot-like user-agent simulation, not proof that the request came from Googlebot.',
    checks: [],
  };

  try {
    const response = await fetch(target.url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'cache-control': 'no-cache',
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const html = await response.text();
    const contentType = response.headers.get('content-type') || '';
    result.statusCode = response.status;
    result.finalUrl = response.url;
    result.redirected = response.redirected;
    result.contentType = contentType;
    result.rawHtmlBytes = Buffer.byteLength(html, 'utf8');

    await writeFile(path.join(OUTPUT_DIR, target.name + '.html'), html, 'utf8');

    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1];
    const metaTags = tagsOf(html, 'meta');
    const robotsTag = metaTags.find(tag => (attr(tag, 'name') || '').toLowerCase() === 'robots');
    const robots = robotsTag ? attr(robotsTag, 'content') : null;
    const canonicalTag = tagsOf(html, 'link').find(tag =>
      (attr(tag, 'rel') || '').toLowerCase().split(/\s+/).includes('canonical')
    );
    const canonical = canonicalTag ? attr(canonicalTag, 'href') : null;

    const bodyHtml = html.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i)?.[1] ?? html;
    const mainHtml = bodyHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main\s*>/i)?.[1] ?? bodyHtml;
    const bodyText = textFromHtml(bodyHtml);
    const mainText = textFromHtml(mainHtml);
    const h1 = headingTexts(bodyHtml, 'h1');
    const h2 = headingTexts(mainHtml, 'h2');
    const inputCount = count(/<input\b/gi, mainHtml);
    const selectCount = count(/<select\b/gi, mainHtml);
    const buttonCount = count(/<button\b/gi, mainHtml);
    const textareaCount = count(/<textarea\b/gi, mainHtml);
    const formCount = count(/<form\b/gi, mainHtml);
    const roleButtonCount = count(/\brole\s*=\s*["']button["']/gi, mainHtml);
    const interactiveControlCount = inputCount + selectCount + buttonCount + textareaCount;

    let canonicalMatches = false;
    try {
      canonicalMatches = !!canonical && new URL(canonical, target.url).href.replace(/\/$/, '') === target.url.replace(/\/$/, '');
    } catch { /* A malformed canonical is reported as a warning. */ }

    result.title = title ? textFromHtml(title) : null;
    result.canonical = canonical;
    result.robots = robots;
    result.h1 = h1;
    result.h2 = h2;
    result.rawVisibleBodyTextCharacters = bodyText.length;
    result.mainVisibleTextCharacters = mainText.length;
    result.interactiveStructures = {
      inputs: inputCount,
      selects: selectCount,
      buttons: buttonCount,
      textareas: textareaCount,
      forms: formCount,
      roleButtons: roleButtonCount,
      formControlsAndButtons: interactiveControlCount,
    };

    result.checks.push(pass('HTTP 2xx response', response.ok, 'HTTP ' + response.status + ' (' + response.url + ')'));
    result.checks.push(pass('HTML response content type', /text\/html|application\/xhtml\+xml/i.test(contentType), contentType || 'Content-Type absent'));
    result.checks.push(pass('Non-empty title', !!result.title, result.title || 'No title found in raw HTML'));
    result.checks.push(pass('Canonical points to requested www URL', canonicalMatches, canonical || 'No canonical link found'));
    result.checks.push(pass('No explicit noindex directive', !/\bnoindex\b/i.test(robots || ''), robots || 'No meta robots tag (check X-Robots-Tag separately if needed)'));
    result.checks.push(pass('At least one H1 present in raw HTML', h1.length >= 1, h1.length + ' H1 heading(s)'));
    result.checks.push(pass('At least two H2 headings present in raw main HTML', h2.length >= 2, h2.length + ' H2 heading(s)'));
    result.checks.push(pass('Substantial raw body text', mainText.length >= 400, mainText.length + ' visible characters within main/body'));
    if (target.kind === 'tool') {
      result.checks.push(pass('Raw tool controls present', interactiveControlCount >= 2 && buttonCount >= 1,
        interactiveControlCount + ' raw control/button elements; ' + buttonCount + ' button(s)'));
    } else {
      result.checks.push(pass('Article structure present', /<article\b/i.test(mainHtml) || /<main\b/i.test(bodyHtml),
        /<article\b/i.test(mainHtml) ? 'article element present' : (/<main\b/i.test(bodyHtml) ? 'main element present' : 'Neither article nor main element detected')));
    }

    return result;
  } catch (error) {
    result.fetchError = error instanceof Error ? error.message : String(error);
    result.checks.push({ check: 'Live raw fetch', status: 'INCONCLUSIVE', detail: result.fetchError });
    return result;
  }
}

function markdownReport(results) {
  const lines = [
    '# TWW Googlebot-like raw HTML verification',
    '',
    'This is a simulated user-agent fetch from a GitHub-hosted runner. It does not prove that Googlebot made the request.',
    '',
    'Retrieved: ' + new Date().toISOString(),
    '',
  ];
  for (const result of results) {
    lines.push('## ' + result.name, '');
    lines.push('- Requested URL: ' + result.requestedUrl);
    lines.push('- Final URL: ' + (result.finalUrl || 'not retrieved'));
    lines.push('- HTTP status: ' + (result.statusCode ?? 'not retrieved'));
    lines.push('- Content type: ' + (result.contentType || 'not retrieved'));
    lines.push('- Raw HTML bytes: ' + (result.rawHtmlBytes ?? 'not retrieved'));
    lines.push('- Title: ' + (result.title || 'not found'));
    lines.push('- Canonical: ' + (result.canonical || 'not found'));
    lines.push('- Meta robots: ' + (result.robots || 'not present'));
    lines.push('- H1: ' + (result.h1?.join(' | ') || 'not found'));
    lines.push('- H2 count: ' + (result.h2?.length ?? 'not retrieved'));
    lines.push('- Main visible text characters: ' + (result.mainVisibleTextCharacters ?? 'not retrieved'));
    lines.push('- Interactive structures: ' + JSON.stringify(result.interactiveStructures || 'not retrieved'));
    lines.push('', '| Check | Status | Detail |', '|---|---|---|');
    for (const check of result.checks) {
      lines.push('| ' + check.check.replace(/\|/g, '\\|') + ' | ' + check.status + ' | ' + String(check.detail).replace(/\|/g, '\\|') + ' |');
    }
    lines.push('');
    if (result.fetchError) lines.push('Fetch error: ' + result.fetchError, '');
  }
  return lines.join('\n');
}

await mkdir(OUTPUT_DIR, { recursive: true });
const results = [];
for (const target of TARGETS) {
  console.log('\nFetching ' + target.url + ' with a Googlebot-like user agent...');
  const result = await checkTarget(target);
  results.push(result);
  console.log(JSON.stringify({
    url: result.requestedUrl,
    finalUrl: result.finalUrl ?? null,
    statusCode: result.statusCode ?? null,
    title: result.title ?? null,
    h1Count: result.h1?.length ?? null,
    h2Count: result.h2?.length ?? null,
    mainVisibleTextCharacters: result.mainVisibleTextCharacters ?? null,
    interactiveStructures: result.interactiveStructures ?? null,
    fetchError: result.fetchError ?? null,
    checks: result.checks,
  }, null, 2));
}

await writeFile(path.join(OUTPUT_DIR, 'report.json'), JSON.stringify(results, null, 2) + '\n', 'utf8');
await writeFile(path.join(OUTPUT_DIR, 'report.md'), markdownReport(results) + '\n', 'utf8');

const hardFailures = results.some(result =>
  result.fetchError ||
  (typeof result.statusCode === 'number' && (result.statusCode < 200 || result.statusCode >= 300))
);

if (hardFailures) {
  console.error('\nOne or more live page fetches failed. The raw response/report artifacts will still be uploaded.');
  process.exitCode = 1;
} else {
  console.log('\nRaw fetch completed. Review the uploaded report for each content and structure check.');
}
