import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { articles, type Article } from '../src/data/articles';
import { routeGraph, SITE_URL } from '../src/data/graph';

/**
 * Editorial integrity audit inspired by KCROC's graph and asset validators.
 * It deliberately validates explicit Markdown links instead of guessing that
 * every slash-containing technical string is a URL.
 */
const errors: string[] = [];
const warnings: string[] = [];
const publicDir = resolve('public');
const routePaths = new Set(routeGraph.filter(route => route.indexable).map(route => route.path));
const incoming = new Map(articles.map(article => [article.id, 0]));

function sectionText(article: Article): string[] {
  const values: string[] = [article.title, article.dek, article.excerpt, ...(article.tags ?? [])];
  for (const section of article.content) {
    values.push(section.heading ?? '', ...section.paragraphs, ...(section.bullets ?? []),
      ...(section.steps ?? []), ...(section.codeBlocks ?? []),
      ...(section.relatedLinks ?? []).flatMap(link => [link.label, link.description]));
    if (section.table) {
      values.push(section.table.caption, ...section.table.headers);
      for (const row of section.table.rows) {
        for (const cell of row) values.push(typeof cell === 'string' ? cell : cell.text);
      }
    }
  }
  for (const faq of article.faq ?? []) values.push(faq.question, faq.answer);
  return values;
}

function checkInternalUrl(rawUrl: string, context: string) {
  if (!rawUrl.startsWith('/') || rawUrl.startsWith('//')) return;
  const rawPath = rawUrl.split(/[?#]/, 1)[0] || '/';
  const cleanPath = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  if (cleanPath.startsWith('/assets/')) {
    const assetPath = join(publicDir, cleanPath.replace(/^\//, ''));
    if (!existsSync(assetPath)) errors.push(`${context}: missing public asset ${cleanPath}`);
    return;
  }
  if (!routePaths.has(cleanPath)) errors.push(`${context}: internal link points to missing/non-indexable route ${cleanPath}`);
}

for (const article of articles) {
  for (const section of article.content) {
    for (const link of section.relatedLinks ?? []) {
      if (!link.label.trim()) errors.push(`Article ${article.slug}: related link has an empty label.`);
      if (!link.description.trim()) errors.push(`Article ${article.slug}: related link has an empty description: ${link.href}`);
      if (!link.href.startsWith('/') || link.href.startsWith('//')) {
        errors.push(`Article ${article.slug}: contextual related link must be an internal path: ${link.href}`);
      } else {
        checkInternalUrl(link.href, `Article ${article.slug} contextual link`);
      }
    }
  }

  const content = sectionText(article).join('\n');
  const markdownLinks = [...content.matchAll(/\[[^\]]+\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)];
  for (const match of markdownLinks) {
    const target = match[1].replace(/^<|>$/g, '');
    if (target.startsWith('/')) checkInternalUrl(target, `Article ${article.slug}`);
    else if (/^https?:\/\//i.test(target)) {
      try {
        const parsed = new URL(target);
        if (parsed.protocol !== 'https:') errors.push(`Article ${article.slug}: source/link should use HTTPS: ${target}`);
      } catch {
        errors.push(`Article ${article.slug}: malformed external link ${target}`);
      }
    }
  }

  for (const source of article.sources ?? []) {
    try {
      const url = new URL(source.url);
      if (url.protocol !== 'https:') errors.push(`Article ${article.slug}: source must use HTTPS: ${source.url}`);
      if (!source.label.trim()) errors.push(`Article ${article.slug}: source has an empty label: ${source.url}`);
    } catch {
      errors.push(`Article ${article.slug}: malformed source URL ${source.url}`);
    }
  }

  if (article.heroImage) {
    if (/^https?:\/\//i.test(article.heroImage)) {
      try {
        if (new URL(article.heroImage).protocol !== 'https:') errors.push(`Article ${article.slug}: hero image must use HTTPS.`);
      } catch { errors.push(`Article ${article.slug}: malformed hero image URL.`); }
    } else if (article.heroImage.startsWith('/')) {
      const path = join(publicDir, article.heroImage.replace(/^\//, ''));
      if (!existsSync(path)) errors.push(`Article ${article.slug}: hero image does not exist: ${article.heroImage}`);
    } else {
      errors.push(`Article ${article.slug}: heroImage must be an absolute public path or HTTPS URL: ${article.heroImage}`);
    }
  }

  for (const relatedId of article.relatedArticles ?? []) {
    if (incoming.has(relatedId)) incoming.set(relatedId, (incoming.get(relatedId) ?? 0) + 1);
  }
}

for (const article of articles) {
  if ((incoming.get(article.id) ?? 0) === 0 && article.contentRole !== 'pillar') {
    warnings.push(`Article has no incoming related-article relationship: /${article.slug}`);
  }
  if (article.content.length < 3) warnings.push(`Article has fewer than 3 content sections; review whether it fully satisfies intent: /${article.slug}`);
}

// Check explicitly linked internal routes in article source strings. Keep URL
// detection narrow to Markdown links to avoid false positives from commands/code.
if (!SITE_URL.startsWith('https://')) errors.push('SITE_URL must use HTTPS.');
const missingArticleRoutes = articles.filter(article => !routePaths.has(`/${article.slug}`));
for (const article of missingArticleRoutes) errors.push(`Article route is not indexable: /${article.slug}`);

console.log(`Content integrity: checked ${articles.length} articles, ${routeGraph.length} graph routes, and ${articles.reduce((sum, article) => sum + (article.sources?.length ?? 0), 0)} source references.`);
if (warnings.length) {
  console.warn(`Content review warnings (${warnings.length}; non-blocking):\n- ${warnings.join('\n- ')}`);
}
if (errors.length) {
  console.error(`Content integrity failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('Content integrity passed: explicit internal Markdown links, source URLs, hero image paths, and article route parity are valid.');
