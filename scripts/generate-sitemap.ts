import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { articles, categories } from '../src/data/articles';
import { routeGraph, SITE_URL } from '../src/data/graph';
import { getProductByPath, productImage } from '../src/data/products';
import { getComparisonByPath } from '../src/data/comparisons';

const publicDir = resolve('public');
mkdirSync(publicDir, { recursive: true });

const errors: string[] = [];
const site = new URL(SITE_URL);
if (site.protocol !== 'https:' || site.hostname !== 'www.techworldwindow.com') {
  errors.push(`SITE_URL must be https://www.techworldwindow.com; received ${SITE_URL}`);
}
if (site.pathname !== '/' || site.search || site.hash) {
  errors.push(`SITE_URL must be an origin without a path, query, or hash; received ${SITE_URL}`);
}

const allPaths = routeGraph.map(route => route.path);
const duplicatePaths = [...new Set(allPaths.filter((path, index) => allPaths.indexOf(path) !== index))];
if (duplicatePaths.length) errors.push(`Duplicate route graph paths: ${duplicatePaths.join(', ')}`);

for (const route of routeGraph) {
  if (!route.path.startsWith('/') || route.path.startsWith('//')) {
    errors.push(`Route path must be a root-relative path: ${route.path}`);
  }
  if (route.path !== '/' && route.path.endsWith('/')) {
    errors.push(`Route path must not have a trailing slash: ${route.path}`);
  }
  if (/[?#\\s]/.test(route.path)) {
    errors.push(`Route path contains a query, fragment, or whitespace: ${route.path}`);
  }
}

const indexableRoutes = routeGraph.filter(route => route.indexable);
if (!indexableRoutes.length) errors.push('No indexable routes were found; refusing to write an empty sitemap.');

const articleByPath = new Map<string, (typeof articles)[number]>(
  articles.map(article => [`/${article.slug}`, article]),
);

const isRealCalendarDate = (value: string) => {
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const latestDate = (items: typeof articles) =>
  items
    .map(item => item.updatedAt || item.publishedAt)
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1);

/** Use only real editorial dates. A hub inherits the newest real article date in that hub. */
function hubLastmod(path: string): string | undefined {
  if (path === '/') return latestDate(articles);
  const slug = path.replace(/^\\//, '');
  const category = categories.find(item => item.slug === slug);
  if (!category) return undefined;
  const inHub = slug === 'research'
    ? articles.filter(item => item.slug.startsWith('research/'))
    : slug === 'best'
      ? articles.filter(item => item.slug.startsWith('best-'))
      : articles.filter(item => item.category === category.name);
  return inHub.length ? latestDate(inHub) : undefined;
}

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const sitemapEntries = indexableRoutes.map(route => {
  const loc = new URL(route.path, SITE_URL);
  if (loc.origin !== site.origin) errors.push(`Sitemap URL is outside SITE_URL: ${loc.toString()}`);
  if (loc.search || loc.hash) errors.push(`Sitemap URL must not contain query/hash: ${loc.toString()}`);

  const article = articleByPath.get(route.path);
  const lastmod = article?.updatedAt || article?.publishedAt || hubLastmod(route.path);
  if (lastmod && !isRealCalendarDate(lastmod)) {
    errors.push(`Invalid sitemap lastmod for ${route.path}: ${lastmod}`);
  }

  const imagePath = getProductByPath(route.path) ?? getComparisonByPath(route.path)?.productA;
  const imageSrc = imagePath ? productImage(imagePath)?.src : undefined;
  const image = imageSrc ? new URL(imageSrc, SITE_URL) : undefined;
  if (image && !['http:', 'https:'].includes(image.protocol)) {
    errors.push(`Unsupported image URL protocol for ${route.path}: ${image.toString()}`);
  }

  return {
    path: route.path,
    loc: loc.toString(),
    lastmod,
    image: image?.toString(),
  };
});

const duplicateLocs = [...new Set(
  sitemapEntries.map(entry => entry.loc).filter((loc, index, all) => all.indexOf(loc) !== index),
)];
if (duplicateLocs.length) errors.push(`Duplicate sitemap loc values: ${duplicateLocs.join(', ')}`);
if (sitemapEntries.length > 50_000) {
  errors.push(`Sitemap has ${sitemapEntries.length} URLs; split it into a sitemap index (maximum 50,000 per sitemap).`);
}
if (sitemapEntries.some(entry => !entry.loc.startsWith(`${site.origin}/`) && entry.loc !== site.origin + '/')) {
  errors.push('Sitemap contains a URL outside the configured canonical host.');
}

if (errors.length) {
  console.error('Sitemap generation failed validation:');
  for (const error of errors) console.error(` - ${error}`);
  process.exitCode = 1;
} else {
  const urls = sitemapEntries.map(entry => [
    '  <url>',
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    ...(entry.lastmod ? [`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`] : []),
    ...(entry.image ? [
      '    <image:image>',
      `      <image:loc>${escapeXml(entry.image)}</image:loc>`,
      '    </image:image>',
    ] : []),
    '  </url>',
  ].join('\\n'));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>',
    '',
  ].join('\\n');

  // Lightweight output assertions catch malformed structure and accidental omissions before writing.
  const locCount = (xml.match(/<loc>/g) ?? []).length;
  const closeCount = (xml.match(/<\\/url>/g) ?? []).length;
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>') ||
      !xml.includes('<urlset ') ||
      !xml.endsWith('</urlset>\\n') ||
      locCount !== sitemapEntries.length ||
      closeCount !== sitemapEntries.length) {
    throw new Error('Generated sitemap failed its structural output checks.');
  }

  const sitemapPath = resolve(publicDir, 'sitemap.xml');
  writeFileSync(sitemapPath, xml, 'utf8');

  console.log(`Generated and validated sitemap: ${sitemapEntries.length} indexable URLs, ${sitemapEntries.filter(entry => entry.image).length} image entries.`);
  console.log(`Excluded ${routeGraph.length - indexableRoutes.length} non-indexable routes by routeGraph policy.`);
  console.log(`Sitemap written to ${sitemapPath}`);
}

// Keep robots.txt and llms.txt generated from the same canonical site configuration.
const robotsPath = resolve(publicDir, 'robots.txt');
writeFileSync(
  robotsPath,
  `User-agent: *\\nAllow: /\\n\\nSitemap: ${new URL('/sitemap.xml', SITE_URL).toString()}\\n\\n# RSS feed for publishers and readers\\n`,
  'utf8',
);

// llms.txt: a plain-text map of the site for AI assistants and crawlers, built from real data so it cannot drift.
const llmsLines = [
  '# Tech World Window',
  '',
  '> Practical Windows troubleshooting, PC gaming performance guides, hardware analysis and free tools, written from real repair-bench experience.',
  '',
  '## Start here',
  ...articles
    .filter(item => item.contentRole === 'pillar')
    .map(item => `- [${item.title}](${new URL('/' + item.slug, SITE_URL)}): ${item.dek}`),
  '',
  '## Sections',
  ...categories.map(item => `- [${item.name}](${new URL('/' + item.slug, SITE_URL)}): ${item.description}`),
  '',
  '## Tools',
  `- [Free PC and Windows tools](${new URL('/tools', SITE_URL)})`,
  `- [BSOD error code lookup](${new URL('/tools/bsod-error-code-lookup', SITE_URL)})`,
  '',
  '## Trust',
  `- [Editorial policy](${new URL('/editorial-policy', SITE_URL)})`,
  `- [Testing methodology](${new URL('/testing', SITE_URL)})`,
  '',
];
writeFileSync(resolve(publicDir, 'llms.txt'), llmsLines.join('\\n'), 'utf8');
