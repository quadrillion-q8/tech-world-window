import type { Article } from '../data/articles';

function overlap(a: string[], b: string[]) {
  const set = new Set(a.map(x => x.toLowerCase()));
  return b.reduce((n, x) => n + (set.has(x.toLowerCase()) ? 1 : 0), 0);
}

/**
 * Builds contextual internal links when an editor has not supplied enough
 * explicit related stories. It deliberately favours the same topic cluster
 * over generic popularity.
 */
export function contextualRelated(current: Article, all: Article[], limit = 4): Article[] {
  const explicit = new Set(current.relatedArticles ?? []);
  const candidates = all.filter(a => a.id !== current.id && !explicit.has(a.id));

  return candidates
    .map(article => {
      const sharedTags = overlap(current.tags, article.tags);
      const sameCategory = article.category === current.category ? 2 : 0;
      const sameSubcategory = current.subcategory && article.subcategory === current.subcategory ? 2 : 0;
      const samePillar = current.pillarPath && article.pillarPath === current.pillarPath ? 3 : 0;
      const researchBridge = article.contentRole === 'cluster' && article.subcategory === 'Research' ? 1 : 0;
      return { article, score: sharedTags * 3 + sameCategory + sameSubcategory + samePillar + researchBridge };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title))
    .slice(0, limit)
    .map(item => item.article);
}

/** Finds a small number of research pages that add evidence to a normal guide. */
export function researchConnections(current: Article, all: Article[], limit = 2): Article[] {
  if (current.subcategory === 'Research') return [];
  return all
    .filter(a => a.id !== current.id && a.subcategory === 'Research')
    .map(article => ({ article, score: overlap(current.tags, article.tags) * 4 + (article.category === current.category ? 1 : 0) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
}
