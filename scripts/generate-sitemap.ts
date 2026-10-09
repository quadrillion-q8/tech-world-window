import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { articles } from '../src/data/articles';
import { routeGraph, SITE_URL } from '../src/data/graph';

const publicDir = resolve('public');
mkdirSync(publicDir, { recursive: true });

const articleByPath = new Map<string, (typeof articles)[number]>(
  articles.map(article => [`/${article.slug}`, article]),
);

const urls = routeGraph
  .filter(route => route.indexable)
  .map(route => {
    const loc = new URL(route.path, SITE_URL).toString();
    const article = articleByPath.get(route.path);
    const lastmod = article?.updatedAt || article?.publishedAt;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      '  </url>',
    ].join('\n');
  });

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
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

console.log(`Generated sitemap with ${urls.length} URLs at ${sitemapPath}`);
console.log(`Generated robots.txt with sitemap reference at ${robotsPath}`);
