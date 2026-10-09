import type { Article } from '../data/articles';

const RESEARCH_BY_TOPIC: Record<string, string[]> = {
  'SSD': ['research-ssd-nearly-full', 'research-nvme-thermal'],
  'Storage': ['research-ssd-nearly-full', 'research-disk-100-low-mbps', 'research-nvme-thermal'],
  'Windows 11': ['research-disk-100-low-mbps', 'research-ram-capacity'],
  'Disk Usage': ['research-disk-100-low-mbps'],
  'RAM': ['research-ram-capacity'],
  'Gaming': ['research-gaming-stutter'],
  'Gaming Performance': ['research-gaming-stutter'],
  'Stuttering': ['research-gaming-stutter'],
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
  // If a cluster explicitly names an article pillar, surface it first even when
  // an older article's relatedArticles list forgot to include the reciprocal edge.
  const pillar = article.pillarPath
    ? articles.find(candidate => `/${candidate.slug}` === article.pillarPath && candidate.id !== article.id)
    : undefined;
  const explicitCandidates = [
    ...(pillar ? [pillar] : []),
    ...(article.relatedArticles || [])
      .map(id => articles.find(candidate => candidate.id === id))
      .filter((candidate): candidate is Article => Boolean(candidate)),
  ];
  const explicit = [...new Map(explicitCandidates.map(candidate => [candidate.id, candidate])).values()];
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
  // Research pages declare their related article IDs. Prefer these editorially
  // curated reverse relationships, then use the topic map as a fallback.
  const researchPages = articles.filter(candidate =>
    candidate.slug.startsWith('research/') && candidate.id !== article.id
  );
  const direct = researchPages.filter(candidate =>
    (candidate.relatedArticles ?? []).includes(article.id)
  );
  const researchIds = new Set<string>(direct.map(candidate => candidate.id));
  for (const tag of article.tags) {
    for (const id of RESEARCH_BY_TOPIC[tag] ?? []) researchIds.add(id);
  }
  const byId = new Map(articles.map(candidate => [candidate.id, candidate]));
  const curatedFirst = [
    ...direct,
    ...[...researchIds]
      .filter(id => !direct.some(candidate => candidate.id === id))
      .map(id => byId.get(id))
      .filter((candidate): candidate is Article => Boolean(candidate && candidate.slug.startsWith('research/'))),
  ];
  return [...new Map(curatedFirst.map(candidate => [candidate.id, candidate])).values()].slice(0, limit);
}
