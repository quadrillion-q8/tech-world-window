import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, normalize, relative, resolve } from 'node:path';
import { articles } from '../src/data/articles';
import { navigation, routeGraph, SITE_URL } from '../src/data/graph';
import { getSeoData } from '../src/seo/ssgSeo';

const errors: string[] = [];
const root = resolve('.');
const dist = join(root, 'dist');
const publicDir = join(root, 'public');
const paths = routeGraph.map(route => route.path);
const indexableRoutes = routeGraph.filter(route => route.indexable);
const indexablePaths = new Set(indexableRoutes.map(route => route.path));
const articlePaths = new Set(articles.map(article => `/${article.slug}`));

const normalizeFilePath = (path: string) => path.split('\\').join('/');
const expectedHtmlPath = (routePath: string) => routePath === '/'
  ? 'index.html'
  : `${routePath.replace(/^\//, '').replace(/\/$/, '')}/index.html`;

// ---------------------------------------------------------------------------
// Route graph integrity
// ---------------------------------------------------------------------------
const duplicatePaths = paths.filter((path, index) => paths.indexOf(path) !== index);
if (duplicatePaths.length) {
  errors.push(`Duplicate graph paths: ${[...new Set(duplicatePaths)].join(', ')}`);
}

for (const route of routeGraph) {
  if (!route.path.startsWith('/')) errors.push(`Route path must start with '/': ${route.path}`);
  if (route.path !== '/' && route.path.endsWith('/')) errors.push(`Route path must not have a trailing slash: ${route.path}`);
  if (!route.title.trim()) errors.push(`Route has an empty title: ${route.path}`);
}

const seoTitles = new Map<string, string>();
const canonicals = new Map<string, string>();
for (const route of indexableRoutes) {
  const seo = getSeoData(route.path);
  const previousTitle = seoTitles.get(seo.title);
  if (previousTitle) errors.push(`Duplicate SEO title: "${seo.title}" on ${previousTitle} and ${route.path}`);
  else seoTitles.set(seo.title, route.path);

  const previousCanonical = canonicals.get(seo.canonical);
  if (previousCanonical) errors.push(`Duplicate canonical URL: ${seo.canonical} on ${previousCanonical} and ${route.path}`);
  else canonicals.set(seo.canonical, route.path);

  if (!seo.canonical.startsWith('https://')) errors.push(`Non-HTTPS canonical for ${route.path}: ${seo.canonical}`);
  if (!seo.title.trim()) errors.push(`Missing SEO title for ${route.path}`);
  if (!seo.description.trim()) errors.push(`Missing SEO description for ${route.path}`);
}

if (!SITE_URL.startsWith('https://')) {
  errors.push('SITE_URL must be HTTPS before launch.');
}

const navHrefs = new Set<string>();
const navOrders = new Set<number>();
for (const item of navigation) {
  if (!indexablePaths.has(item.href)) errors.push(`Navigation points to a non-indexable/missing route: ${item.href}`);
  if (navHrefs.has(item.href)) errors.push(`Duplicate navigation href: ${item.href}`);
  navHrefs.add(item.href);
}
for (const route of routeGraph) {
  if (route.navOrder === undefined) continue;
  if (navOrders.has(route.navOrder)) errors.push(`Duplicate navOrder ${route.navOrder} in route graph.`);
  navOrders.add(route.navOrder);
  if (!route.navLabel?.trim()) errors.push(`Route has navOrder but no navLabel: ${route.path}`);
}

// ---------------------------------------------------------------------------
// Article ↔ graph parity
// ---------------------------------------------------------------------------
for (const article of articles) {
  const expected = `/${article.slug}`;
  if (!paths.includes(expected)) errors.push(`Article "${article.id}" is missing from routeGraph: ${expected}`);
  if (!article.title.trim() || !article.dek.trim()) errors.push(`Article "${article.id}" is missing title or dek.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt)) errors.push(`Article "${article.id}" has invalid publishedAt: ${article.publishedAt}`);
  if (article.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(article.updatedAt)) errors.push(`Article "${article.id}" has invalid updatedAt: ${article.updatedAt}`);
}
for (const route of routeGraph.filter(route => route.kind === 'article')) {
  if (!articlePaths.has(route.path)) errors.push(`Graph article has no matching article record: ${route.path}`);
}
for (const article of articles) {
  if (!indexablePaths.has(`/${article.slug}`)) errors.push(`Article is not indexable in routeGraph: ${article.slug}`);
}

// ---------------------------------------------------------------------------
// Sitemap ↔ graph and robots ↔ sitemap parity
// ---------------------------------------------------------------------------
const sitemapPath = join(publicDir, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  errors.push('public/sitemap.xml was not generated.');
} else {
  const xml = readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].trim());
  const expectedLocs = indexableRoutes.map(route => new URL(route.path, SITE_URL).toString());
  const locSet = new Set(locs);
  const expectedSet = new Set(expectedLocs);

  if (locs.length !== locSet.size) errors.push('Sitemap contains duplicate <loc> entries.');
  for (const expected of expectedSet) if (!locSet.has(expected)) errors.push(`Sitemap is missing ${expected}`);
  for (const actual of locSet) if (!expectedSet.has(actual)) errors.push(`Sitemap contains an unexpected URL: ${actual}`);
  if (locs.length !== expectedLocs.length) errors.push(`Sitemap URL count ${locs.length} does not match indexable graph count ${expectedLocs.length}.`);
}

const robotsPath = join(publicDir, 'robots.txt');
if (!existsSync(robotsPath)) {
  errors.push('public/robots.txt was not generated.');
} else {
  const robots = readFileSync(robotsPath, 'utf8');
  const sitemapUrl = new URL('/sitemap.xml', SITE_URL).toString();
  if (!robots.includes(`Sitemap: ${sitemapUrl}`)) errors.push('robots.txt is missing the canonical sitemap URL.');
  if (!/^User-agent:\s*\*\s*$/m.test(robots)) errors.push('robots.txt is missing a User-agent: * directive.');
  if (!/^Allow:\s*\/\s*$/m.test(robots)) errors.push('robots.txt is missing Allow: /.');
}

// ---------------------------------------------------------------------------
// Prerendered HTML exact-set validation
// ---------------------------------------------------------------------------
if (!existsSync(dist)) {
  errors.push('dist/ does not exist. Run the production SSG build before validation.');
} else {
  const htmlFiles: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.html')) htmlFiles.push(full);
    }
  };
  walk(dist);

  const actualHtml = new Set(htmlFiles.map(file => normalizeFilePath(relative(dist, file))));
  const expectedHtml = new Set(indexableRoutes.map(route => expectedHtmlPath(route.path)));

  if (htmlFiles.length !== expectedHtml.size) {
    errors.push(`Found ${htmlFiles.length} HTML files in dist; expected exactly ${expectedHtml.size}.`);
  }

  for (const expected of expectedHtml) {
    if (!actualHtml.has(expected)) errors.push(`Missing prerendered HTML: ${expected}`);
  }
  for (const actual of actualHtml) {
    if (!expectedHtml.has(actual)) errors.push(`Unexpected HTML file in dist: ${actual}`);
  }

  for (const route of indexableRoutes) {
    const outputPath = normalize(join(dist, expectedHtmlPath(route.path)));
    if (!outputPath.startsWith(normalize(dist))) {
      errors.push(`Unsafe output path calculated for route ${route.path}`);
      continue;
    }
    if (!existsSync(outputPath)) continue;

    const html = readFileSync(outputPath, 'utf8');
    const seo = getSeoData(route.path);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (!titleMatch) errors.push(`Missing <title> in ${route.path}`);
    else if (titleMatch[1].trim() !== seo.title) errors.push(`Incorrect title in ${route.path}: expected "${seo.title}"`);

    const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
    if (!canonicalMatch) errors.push(`Missing canonical link in ${route.path}`);
    else if (canonicalMatch[1] !== seo.canonical) errors.push(`Incorrect canonical in ${route.path}: expected ${seo.canonical}`);

    const descriptionMatch = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    if (!descriptionMatch) errors.push(`Missing meta description in ${route.path}`);
    else if (descriptionMatch[1].replace(/&quot;/g, '"') !== seo.description) errors.push(`Incorrect meta description in ${route.path}`);

    if (!html.includes('name="robots"') || !html.includes('index,follow')) errors.push(`Missing index/follow robots directive in ${route.path}`);
    if (!html.includes('Tech World Window')) errors.push(`Missing rendered brand/content in ${route.path}`);
    if (!html.includes('application/ld+json')) errors.push(`Missing JSON-LD structured data in ${route.path}`);
    if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`Missing BreadcrumbList JSON-LD in ${route.path}`);

    if (route.kind === 'article') {
      if (!html.includes('"@type":"Article"')) errors.push(`Missing Article JSON-LD in ${route.path}`);
      const article = articles.find(item => `/${item.slug}` === route.path);
      if (article && !html.includes(`"headline":"${article.title.replace(/"/g, '\\"')}"`)) {
        errors.push(`Article JSON-LD headline mismatch in ${route.path}`);
      }
    }
  }

  console.log(`Validated ${htmlFiles.length} generated HTML files for ${indexableRoutes.length} indexable routes.`);
  console.log(`dist size: ${statSync(dist).isDirectory() ? 'directory present' : 'unexpected'}`);
}

if (errors.length) {
  console.error('Validation failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}

console.log(`Validation passed: ${routeGraph.length} graph routes, ${articles.length} articles, ${indexableRoutes.length} prerender targets, navigation/sitemap/robots parity and prerendered SEO checks passed.`);
