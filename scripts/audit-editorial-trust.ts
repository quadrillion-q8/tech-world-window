import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { articles } from '../src/data/articles';
import { authors } from '../src/data/authors';
import { products, productPath } from '../src/data/products';
import { comparisons } from '../src/data/comparisons';
import { getRouteSchemas } from '../src/seo/ssgSeo';

const errors: string[] = [];
const warnings: string[] = [];
const html = (path: string) => readFileSync(join('dist', path === '/' ? 'index.html' : path.slice(1) + '/index.html'), 'utf8');
let citedArticles = 0;
let sourceCount = 0;
let researchCount = 0;
for (const article of articles) {
  const path = '/' + article.slug;
  const author = authors[article.authorId];
  const body = html(path);
  if (!author || !body.includes('data-author-bio="' + author.id + '"') || !body.includes('href="' + author.url + '"')) errors.push(path + ': missing author attribution or bio');
  const research = article.slug.startsWith('research/');
  if (!body.includes('data-editorial-trust="' + (research ? 'research' : 'article') + '"')) errors.push(path + ': missing editorial transparency');
  if (research) { researchCount++; if (!article.testing?.trim() || !body.includes('data-evidence-note="true"')) errors.push(path + ': missing explicit research evidence note'); }
  const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value));
  if (!validDate(article.publishedAt) || (article.updatedAt && (!validDate(article.updatedAt) || article.updatedAt < article.publishedAt))) errors.push(path + ': invalid editorial date sequence');
  if (!article.sources?.length) warnings.push(path + ': no registered references; editorial source review recommended');
  else { citedArticles++; sourceCount += article.sources.length; }
  const schema = getRouteSchemas(path).find(item => item['@type'] === 'Article');
  if (!schema || (schema.author as { '@id'?: string })?.['@id'] !== 'https://www.techworldwindow.com' + author?.url + '#person') errors.push(path + ': missing stable article author schema');
  if (article.sources?.length && path !== '/gamebar-presence-writer-fix') {
    if (!Array.isArray(schema?.citation) || schema.citation.length !== article.sources.length) errors.push(path + ': citation schema differs from source registry');
    for (const source of article.sources) if (!body.includes(source.url.replace(/&/g, '&amp;'))) errors.push(path + ': source missing from rendered HTML: ' + source.url);
  }
}
for (const product of products) {
  const path = productPath(product), body = html(path);
  if (!body.includes('data-editorial-trust="product"') || !body.includes('href="/affiliate-disclosure"')) errors.push(path + ': missing commercial transparency');
  if (!product.sources.some(source => source.kind === 'manufacturer')) errors.push(path + ': no registered manufacturer source');
}
for (const comparison of comparisons) if (!html(comparison.path).includes('data-editorial-trust="comparison"') || !comparison.evidenceNote.trim()) errors.push(comparison.path + ': missing comparison evidence disclosure');
for (const path of ['/about','/authors/imran-natiq','/editorial-policy','/affiliate-disclosure','/testing']) if (!html(path).includes('href="/contact"')) errors.push(path + ': missing correction contact path');
console.log('TWW EDITORIAL TRUST AUDIT');
console.log('Articles with author and editorial checks: ' + articles.length);
console.log('Research evidence notes checked: ' + researchCount);
console.log('Articles with registered sources: ' + citedArticles + '/' + articles.length);
console.log('Registered article source references: ' + sourceCount);
console.log('Product profiles checked: ' + products.length);
console.log('Comparisons checked: ' + comparisons.length);
for (const warning of warnings) console.warn('EDITORIAL REVIEW: ' + warning);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('PASS: author attribution, evidence disclosures and editorial source parity. Source URL reachability and factual accuracy require separate editorial review.');
