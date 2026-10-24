import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { articles, categories } from '../src/data/articles';
import { routeGraph, SITE_URL } from '../src/data/graph';
import { getProductByPath, productImage } from '../src/data/products';
import { getComparisonByPath } from '../src/data/comparisons';

const publicDir = resolve('public');
mkdirSync(publicDir, { recursive: true });

const articleByPath = new Map<string, (typeof articles)[number]>(
  articles.map(article => [`/${article.slug}`, article]),
);

const latestDate = (items: typeof articles) =>
  items.map(item => item.updatedAt || item.publishedAt).filter(Boolean).sort().slice(-1)[0];

/** Hub pages inherit the newest real article date inside them. Pages with no real date get no lastmod (an invented one would be ignored). */
function hubLastmod(path: string): string | undefined {
  if (path === '/') return latestDate(articles);
  const slug = path.replace(/^\//, '');
  const category = categories.find(item => item.slug === slug);
  if (!category) return undefined;
  const name = category.name;
  const inHub = slug === 'research'
    ? articles.filter(item => item.slug.startsWith('research/'))
    : slug === 'best'
      ? articles.filter(item => item.slug.startsWith('best-'))
      : articles.filter(item => item.category === name);
  return inHub.length ? latestDate(inHub) : undefined;
}

const urls = routeGraph
  .filter(route => route.indexable)
  .map(route => {
    const loc = new URL(route.path, SITE_URL).toString();
    const article = articleByPath.get(route.path);
    const lastmod = article?.updatedAt || article?.publishedAt || hubLastmod(route.path);
    const imagePath = (getProductByPath(route.path) ?? getComparisonByPath(route.path)?.productA);
    const imageSrc = imagePath ? productImage(imagePath)?.src : undefined;
    const image = imageSrc ? new URL(imageSrc, SITE_URL).toString() : undefined;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      ...(image ? ['    <image:image>', `      <image:loc>${image}</image:loc>`, '    </image:image>'] : []),
      '  </url>',
    ].join('\n');
  });

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...urls,
  '</urlset>',
  '',
].join('\n');

const sitemapPath = resolve(publicDir, 'sitemap.xml');
writeFileSync(sitemapPath, xml, 'utf8');

const robotsPath = resolve(publicDir, 'robots.txt');
writeFileSync(
  robotsPath,
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', SITE_URL).toString()}\n\n# RSS feed for publishers and readers\n`,
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
writeFileSync(resolve(publicDir, 'llms.txt'), llmsLines.join('\n'), 'utf8');

console.log(`Generated sitemap with ${urls.length} URLs at ${sitemapPath}`);
console.log(`Generated robots.txt with sitemap reference at ${robotsPath}`);
