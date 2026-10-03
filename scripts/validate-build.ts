import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, normalize, resolve } from 'node:path';
import { articles } from '../src/data/articles';
import { routeGraph, SITE_URL } from '../src/data/graph';
import { getSeoData } from '../src/seo/ssgSeo';

const errors: string[] = [];
const root = resolve('.');
const dist = join(root, 'dist');
const paths = routeGraph.map(r => r.path);
const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);
const indexableRoutes = routeGraph.filter(route => route.indexable);

if (duplicates.length) {
  errors.push(`Duplicate graph paths: ${[...new Set(duplicates)].join(', ')}`);
}

if (!SITE_URL.startsWith('https://')) {
  errors.push('SITE_URL must be HTTPS before launch.');
}

const articlePaths = new Set(articles.map(article => `/${article.slug}`));
for (const article of articles) {
  const expected = `/${article.slug}`;
  if (!paths.includes(expected)) errors.push(`Article "${article.id}" is missing from routeGraph: ${expected}`);
  if (!article.title.trim() || !article.dek.trim()) errors.push(`Article "${article.id}" is missing title or dek`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt)) errors.push(`Article "${article.id}" has invalid publishedAt`);
  if (article.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(article.updatedAt)) errors.push(`Article "${article.id}" has invalid updatedAt`);
}

for (const route of routeGraph.filter(r => r.kind === 'article')) {
  if (!articlePaths.has(route.path)) errors.push(`Graph article has no matching article record: ${route.path}`);
}

if (!existsSync(join(root, 'public', 'sitemap.xml'))) {
  errors.push('public/sitemap.xml was not generated.');
} else {
  const xml = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
  for (const route of indexableRoutes) {
    const expected = new URL(route.path, SITE_URL).toString();
    if (!xml.includes(`<loc>${expected}</loc>`)) errors.push(`Sitemap is missing ${expected}`);
  }
  const locCount = (xml.match(/<loc>/g) || []).length;
  if (locCount !== indexableRoutes.length) {
    errors.push(`Sitemap URL count ${locCount} does not match indexable graph count ${indexableRoutes.length}.`);
  }
}

const robotsPath = join(root, 'public', 'robots.txt');
if (!existsSync(robotsPath)) {
  errors.push('public/robots.txt was not generated.');
} else {
  const robots = readFileSync(robotsPath, 'utf8');
  const sitemapUrl = new URL('/sitemap.xml', SITE_URL).toString();
  if (!robots.includes(`Sitemap: ${sitemapUrl}`)) errors.push('robots.txt is missing the canonical sitemap URL.');
}

if (!existsSync(dist)) {
  errors.push('dist/ does not exist. Run the production SSG build before validation.');
} else {
  for (const route of indexableRoutes) {
    const relative = route.path === '/' ? 'index.html' : join(route.path.replace(/^\//, ''), 'index.html');
    const outputPath = normalize(join(dist, relative));
    if (!outputPath.startsWith(normalize(dist))) {
      errors.push(`Unsafe output path calculated for route ${route.path}`);
      continue;
    }
    if (!existsSync(outputPath)) {
      errors.push(`Missing prerendered HTML for ${route.path}: ${relative}`);
      continue;
    }
    const html = readFileSync(outputPath, 'utf8');
    const seo = getSeoData(route.path);
    if (html.length < 1200) errors.push(`Prerendered HTML is unexpectedly small for ${route.path}`);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (!titleMatch) errors.push(`Missing title tag in prerendered HTML for ${route.path}`);
    else if (titleMatch[1].trim() !== seo.title) errors.push(`Incorrect title in prerendered HTML for ${route.path}: expected "${seo.title}"`);
    const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
    if (!canonicalMatch) errors.push(`Missing canonical link in prerendered HTML for ${route.path}`);
    else if (canonicalMatch[1] !== seo.canonical) errors.push(`Incorrect canonical in prerendered HTML for ${route.path}: expected ${seo.canonical}`);
    if (!html.includes(`<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}"`)) errors.push(`Missing expected meta description in prerendered HTML for ${route.path}`);
    if (!html.includes('Tech World Window')) errors.push(`Missing rendered brand/content in prerendered HTML for ${route.path}`);
    if (!html.includes('application/ld+json')) errors.push(`Missing structured data in prerendered HTML for ${route.path}`);
  }

  const htmlFiles = [] as string[];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.html')) htmlFiles.push(full);
    }
  };
  walk(dist);
  const expectedHtmlCount = indexableRoutes.length;
  if (htmlFiles.length < expectedHtmlCount) {
    errors.push(`Only ${htmlFiles.length} HTML files were found in dist; expected at least ${expectedHtmlCount}.`);
  }
  console.log(`Validated ${htmlFiles.length} generated HTML files for ${indexableRoutes.length} indexable routes.`);
  console.log(`dist size: ${(statSync(dist).isDirectory() ? 'directory present' : 'unexpected')}`);
}

if (errors.length) {
  console.error('Validation failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}

console.log(`Validation passed: ${routeGraph.length} graph routes, ${articles.length} articles, ${indexableRoutes.length} prerender targets, sitemap and robots present.`);
