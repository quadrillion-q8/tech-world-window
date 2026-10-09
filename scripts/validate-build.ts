import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, normalize, relative, resolve } from 'node:path';
import { articles, headingId } from '../src/data/articles';
import { navigation, menuGroups, routeGraph, SITE_URL } from '../src/data/graph';
import { getSeoData } from '../src/seo/ssgSeo';
import { BSOD_BASE_PATH, bsodEntries, bsodPath } from '../src/data/bsod';
import { articleToolLinks, getToolPageData, toolByPath, tools } from '../src/data/tools';

const errors: string[] = [];
const root = resolve('.');
const dist = join(root, 'dist');
const publicDir = join(root, 'public');
const paths = routeGraph.map(route => route.path);
const indexableRoutes = routeGraph.filter(route => route.indexable);
const indexablePaths = new Set(indexableRoutes.map(route => route.path));
const articlePaths = new Set(articles.map(article => `/${article.slug}`));

const decodeHtml = (value: string) => value
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&');
const decodeJsonLdEscapes = (value: string) => value
  .replace(/\\u003c/gi, '<')
  .replace(/\\u003e/gi, '>')
  .replace(/\\u0026/gi, '&');

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

for (const group of menuGroups) {
  if (group.href && !indexablePaths.has(group.href)) errors.push(`Mega-menu group points to a missing/non-indexable route: ${group.href}`);
  for (const link of group.links) {
    if (!indexablePaths.has(link.href)) errors.push(`Mega-menu link points to a missing/non-indexable route: ${link.href}`);
  }
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
for (const article of articles) {
  if (article.pillarPath && !indexablePaths.has(article.pillarPath)) errors.push(`Article "${article.id}" has an invalid pillarPath: ${article.pillarPath}`);
  if (article.contentRole === 'cluster' && !article.pillarPath) errors.push(`Cluster article "${article.id}" is missing pillarPath.`);
}

// Internal-link / topical-cluster integrity
const articlesById = new Map(articles.map(article => [article.id, article]));
for (const article of articles) {
  const related = article.relatedArticles || [];
  if (article.contentRole === 'cluster' && related.length < 2) {
    errors.push(`Cluster article "${article.id}" should expose at least 2 related internal links.`);
  }

  for (const relatedId of related) {
    const target = articlesById.get(relatedId);
    if (!target) {
      errors.push(`Article "${article.id}" links to missing related article ID: ${relatedId}`);
      continue;
    }
    if (article.contentRole === 'cluster' && target.category !== article.category) {
      errors.push(`Cluster article "${article.id}" links across categories to "${target.id}" (${target.category}).`);
    }
  }

  for (const relatedId of related) {
    const target = articlesById.get(relatedId);
    if (!target) continue;
    if (!(target.relatedArticles || []).includes(article.id)) {
      errors.push(`Internal-link graph is not reciprocal: "${article.id}" -> "${target.id}" without the reverse link.`);
    }
  }
}
for (const route of routeGraph.filter(route => route.kind === 'article')) {
  if (!articlePaths.has(route.path)) errors.push(`Graph article has no matching article record: ${route.path}`);
}
for (const article of articles) {
  if (!indexablePaths.has(`/${article.slug}`)) errors.push(`Article is not indexable in routeGraph: ${article.slug}`);
}

// ---------------------------------------------------------------------------
// Article content integrity: headings, tables, internal links, SEO field limits
// ---------------------------------------------------------------------------
for (const article of articles) {
  const ids = new Set<string>();
  for (const section of article.content) {
    if (section.heading) {
      const id = headingId(section.heading);
      if (!id) errors.push(`Article "${article.id}" has a heading that produces an empty anchor: "${section.heading}"`);
      if (ids.has(id)) errors.push(`Article "${article.id}" has duplicate heading anchor: #${id}`);
      ids.add(id);
    }
  }

  for (const section of article.content) {
    for (const link of section.relatedLinks ?? []) {
      if (!link.label.trim()) errors.push(`Article "${article.id}" has a contextual link with an empty label.`);
      if (!link.description.trim()) errors.push(`Article "${article.id}" has a contextual link with an empty description: ${link.href}`);
      if (!link.href.startsWith('/') || link.href.startsWith('//')) {
        errors.push(`Article "${article.id}" contextual link must be an internal path: ${link.href}`);
      } else if (!indexablePaths.has(link.href)) {
        errors.push(`Article "${article.id}" contextual link points to a missing/non-indexable route: ${link.href}`);
      }
    }

    const table = section.table;
    if (!table) continue;
    if (!table.caption.trim()) errors.push(`Article "${article.id}" has a table without a caption.`);
    for (const [rowIndex, row] of table.rows.entries()) {
      if (row.length !== table.headers.length) {
        errors.push(`Article "${article.id}" table "${table.caption}" row ${rowIndex + 1} has ${row.length} cells; expected ${table.headers.length}.`);
      }
      for (const cell of row) {
        if (typeof cell === 'string') continue;
        if (cell.href.startsWith('#')) {
          if (!ids.has(cell.href.slice(1))) errors.push(`Article "${article.id}" links to a missing in-page anchor: ${cell.href}`);
        } else if (cell.href.startsWith('/')) {
          if (!indexablePaths.has(cell.href)) errors.push(`Article "${article.id}" table links to a missing/non-indexable route: ${cell.href}`);
        } else {
          errors.push(`Article "${article.id}" table link must be an internal route or #anchor: ${cell.href}`);
        }
      }
    }
  }

  // Search-result snippets: keep overrides within display limits.
  if (article.seoTitle && article.seoTitle.length > 65) errors.push(`Article "${article.id}" seoTitle is ${article.seoTitle.length} characters; keep it at 65 or fewer.`);
  if (article.metaDescription && (article.metaDescription.length < 70 || article.metaDescription.length > 160)) {
    errors.push(`Article "${article.id}" metaDescription is ${article.metaDescription.length} characters; keep it between 70 and 160.`);
  }
  for (const source of article.sources || []) {
    if (!source.url.startsWith('https://')) errors.push(`Article "${article.id}" source must use HTTPS: ${source.url}`);
  }
  for (const item of article.faq || []) {
    if (item.answer.includes('`')) errors.push(`Article "${article.id}" FAQ answer contains a backtick, which would leak into FAQPage JSON-LD: "${item.question}"`);
  }
}

// ---------------------------------------------------------------------------
// Tools registry and BSOD knowledge-base integrity
// ---------------------------------------------------------------------------
const toolGraphPaths = new Set(routeGraph.filter(route => route.kind === 'tool').map(route => route.path));
for (const tool of tools) {
  if (!toolGraphPaths.has(tool.path)) errors.push(`Tool "${tool.id}" is missing from routeGraph: ${tool.path}`);
  if (tool.seoTitle.length > 65) errors.push(`Tool "${tool.id}" seoTitle is ${tool.seoTitle.length} characters; keep it at 65 or fewer.`);
  if (tool.metaDescription.length < 70 || tool.metaDescription.length > 160) errors.push(`Tool "${tool.id}" metaDescription is ${tool.metaDescription.length} characters; keep it between 70 and 160.`);
  for (const item of tool.faq || []) {
    if (item.answer.includes('`')) errors.push(`Tool "${tool.id}" FAQ answer contains a backtick: "${item.question}"`);
  }
}
for (const path of toolGraphPaths) if (!toolByPath.has(path)) errors.push(`Graph tool route has no registry entry: ${path}`);

const bsodSlugs = new Set<string>();
const bsodNames = new Set<string>();
const bsodHexes = new Set<string>();
const bsodGraphPaths = new Set(routeGraph.filter(route => route.kind === 'bsod-code').map(route => route.path));
for (const entry of bsodEntries) {
  if (bsodSlugs.has(entry.slug)) errors.push(`Duplicate BSOD slug: ${entry.slug}`);
  if (bsodNames.has(entry.name)) errors.push(`Duplicate BSOD name: ${entry.name}`);
  if (bsodHexes.has(entry.hex)) errors.push(`Duplicate BSOD hex code: ${entry.hex}`);
  bsodSlugs.add(entry.slug); bsodNames.add(entry.name); bsodHexes.add(entry.hex);
  if (!/^0x[0-9A-F]{8}$/.test(entry.hex)) errors.push(`BSOD "${entry.name}" hex must look like 0x000000EF: ${entry.hex}`);
  if (entry.slug !== entry.name.toLowerCase().replace(/_/g, '-')) errors.push(`BSOD slug must match the lower-case hyphenated name: ${entry.slug}`);
  if (entry.steps.length < 4) errors.push(`BSOD "${entry.name}" needs at least 4 fix steps.`);
  if (entry.causes.length < 3) errors.push(`BSOD "${entry.name}" needs at least 3 causes.`);
  if (!entry.related.length) errors.push(`BSOD "${entry.name}" needs at least one related guide.`);
  for (const related of entry.related) {
    if (!indexablePaths.has(related)) errors.push(`BSOD "${entry.name}" links to a missing/non-indexable route: ${related}`);
  }
  if (!bsodGraphPaths.has(bsodPath(entry.slug))) errors.push(`BSOD "${entry.name}" is missing from routeGraph.`);
  const page = getToolPageData(bsodPath(entry.slug));
  if (!page) errors.push(`No page data for BSOD "${entry.name}".`);
  else {
    if (page.description.length < 70 || page.description.length > 160) errors.push(`BSOD "${entry.name}" meta description is ${page.description.length} characters; keep it between 70 and 160.`);
    for (const item of page.faq) if (item.answer.includes('`')) errors.push(`BSOD "${entry.name}" FAQ answer contains a backtick: "${item.question}"`);
  }
}
for (const path of bsodGraphPaths) {
  if (!path.startsWith(`${BSOD_BASE_PATH}/`) || !bsodSlugs.has(path.slice(BSOD_BASE_PATH.length + 1))) errors.push(`Graph BSOD route has no knowledge-base entry: ${path}`);
}
for (const [slug, toolPaths] of Object.entries(articleToolLinks)) {
  if (!articlePaths.has(`/${slug}`)) errors.push(`articleToolLinks references a missing article: ${slug}`);
  for (const toolPath of toolPaths) if (!toolByPath.has(toolPath)) errors.push(`articleToolLinks references a missing tool: ${toolPath}`);
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
    else if (decodeHtml(titleMatch[1].trim()) !== seo.title) errors.push(`Incorrect title in ${route.path}: expected "${seo.title}"`);

    const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
    if (!canonicalMatch) errors.push(`Missing canonical link in ${route.path}`);
    else if (canonicalMatch[1] !== seo.canonical) errors.push(`Incorrect canonical in ${route.path}: expected ${seo.canonical}`);

    const descriptionMatch = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    if (!descriptionMatch) errors.push(`Missing meta description in ${route.path}`);
    else if (decodeHtml(descriptionMatch[1]) !== seo.description) errors.push(`Incorrect meta description in ${route.path}`);

    if (!html.includes('name="robots"') || !html.includes('index,follow')) errors.push(`Missing index/follow robots directive in ${route.path}`);
    if (!html.includes('Tech World Window')) errors.push(`Missing rendered brand/content in ${route.path}`);
    if (!html.includes('application/ld+json')) errors.push(`Missing JSON-LD structured data in ${route.path}`);
    if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`Missing BreadcrumbList JSON-LD in ${route.path}`);
    if (route.path === '/' && !html.includes('"@type":"Organization"')) errors.push('Homepage is missing Organization JSON-LD.');

    if (route.kind === 'tool' || route.kind === 'bsod-code') {
      const toolPage = getToolPageData(route.path);
      if (toolPage?.faq.length && !html.includes('"@type":"FAQPage"')) errors.push(`Missing FAQPage JSON-LD in ${route.path}`);
      if (toolPage?.webApp && !html.includes('"@type":"WebApplication"')) errors.push(`Missing WebApplication JSON-LD in ${route.path}`);
      if (route.kind === 'bsod-code') {
        const entry = bsodEntries.find(item => bsodPath(item.slug) === route.path);
        if (entry && !html.includes(entry.name)) errors.push(`Prerendered HTML is missing the stop code name in ${route.path}`);
        if (entry && !html.includes('article-steps')) errors.push(`Prerendered HTML is missing the numbered fix steps in ${route.path}`);
        if (!html.includes('"name":"BSOD Error Code Lookup"')) errors.push(`Breadcrumb for ${route.path} is missing the BSOD lookup level.`);
      }
      if (route.path === '/tools/frame-time-analyzer' && !html.includes('never uploaded')) errors.push('Frame-time analyzer is missing its privacy statement in prerendered HTML.');
    }

    if (route.kind === 'article') {
      if (!html.includes('"@type":"Article"')) errors.push(`Missing Article JSON-LD in ${route.path}`);
      const article = articles.find(item => `/${item.slug}` === route.path);
      if (article && !decodeJsonLdEscapes(html).includes(`"headline":"${article.title.replace(/"/g, '\\"')}"`)) {
        errors.push(`Article JSON-LD headline mismatch in ${route.path}`);
      }
      if (article?.faq?.length && !html.includes('"@type":"FAQPage"')) errors.push(`Missing FAQPage JSON-LD in ${route.path}`);
      if (article?.content.some(section => section.table) && !html.includes('<table')) errors.push(`Prerendered HTML is missing the article tables in ${route.path}`);
      if (article?.content.some(section => section.steps) && !html.includes('article-steps')) errors.push(`Prerendered HTML is missing the numbered steps in ${route.path}`);
      if (article && !html.includes('"wordCount"')) errors.push(`Article JSON-LD is missing wordCount in ${route.path}`);
      if (article?.contentRole === 'cluster' && !article.pillarPath) errors.push(`Cluster article missing pillarPath: ${route.path}`);
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
