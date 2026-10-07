import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { articles } from '../src/data/articles';
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from '../src/data/graph';

const publicDir = resolve('public');
mkdirSync(publicDir, { recursive: true });
const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const items = articles.slice(0, 40).map(article => {
  const url = new URL(`/${article.slug}`, SITE_URL).toString();
  const date = article.updatedAt || article.publishedAt;
  return [
    '<item>',
    `<title>${esc(article.title)}</title>`,
    `<link>${esc(url)}</link>`,
    `<guid isPermaLink="true">${esc(url)}</guid>`,
    `<description>${esc(article.dek)}</description>`,
    `<pubDate>${new Date(`${date}T12:00:00Z`).toUTCString()}</pubDate>`,
    `<category>${esc(article.category)}</category>`,
    '</item>',
  ].join('\n');
});
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0">',
  '<channel>',
  `<title>${esc(SITE_NAME)}</title>`,
  `<link>${esc(SITE_URL)}</link>`,
  `<description>${esc(SITE_TAGLINE)} — ${esc('Windows, PC gaming and hardware guides.')}</description>`,
  `<language>en</language>`,
  ...items,
  '</channel>',
  '</rss>',
  '',
].join('\n');
writeFileSync(resolve(publicDir, 'feed.xml'), xml, 'utf8');
console.log(`Generated RSS feed with ${items.length} items.`);
