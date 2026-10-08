import type { Article } from '../data/articles';

const RESEARCH_BY_TOPIC: Record<string, string[]> = {
  'SSD': ['ssd-nearly-full-what-really-changes', 'how-ssd-temperature-affects-performance'],
  'Storage': ['ssd-nearly-full-what-really-changes', 'windows-100-percent-disk-usage-low-mbps', 'how-ssd-temperature-affects-performance'],
  'Windows 11': ['windows-100-percent-disk-usage-low-mbps', 'does-more-ram-make-windows-faster'],
  'Disk Usage': ['windows-100-percent-disk-usage-low-mbps'],
  'RAM': ['does-more-ram-make-windows-faster'],
  'Gaming': ['what-actually-causes-pc-game-stuttering'],
  'Gaming Performance': ['what-actually-causes-pc-game-stuttering'],
  'Stuttering': ['what-actually-causes-pc-game-stuttering'],
};

function score(a: Article, b: Article): number {
  if (a.id === b.id) return -1;
  const aTags = new Set(a.tags.map(t => t.toLowerCase()));
  const bTags = new Set(b.tags.map(t => t.toLowerCase()));
  let value = 0;
  for (const tag of aTags) if (bTags.has(tag)) value += 3;
  if (a.category === b.category) value += 2;
  if (a.subcategory && a.subcategory === b.subcategory) value += 3;
  if (a.pillarPath && `/${b.slug}` === a.pillarPath) value += 5;
  if (b.pillarPath && `/${a.slug}` === b.pillarPath) value += 5;
  return value;
}

export function getRelatedArticles(article: Article, articles: Article[], limit = 4): Article[] {
  const explicit = (article.relatedArticles || [])
    .map(id => articles.find(a => a.id === id))
    .filter((a): a is Article => Boolean(a));
  const explicitIds = new Set(explicit.map(a => a.id));
  const discovered = articles
    .filter(a => !explicitIds.has(a.id) && a.id !== article.id)
    .map(a => ({ article: a, score: score(article, a) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.article);
  return [...explicit, ...discovered].slice(0, limit);
}

export function getResearchForArticle(article: Article, articles: Article[], limit = 2): Article[] {
  const researchIds = new Set<string>();
  for (const tag of article.tags) for (const id of RESEARCH_BY_TOPIC[tag]) researchIds.add(id);
  return [...researchIds]
    .map(id => articles.find(a => a.id === id))
    .filter((a): a is Article => Boolean(a && a.slug.startsWith('research/')))
    .slice(0, limit);
}
