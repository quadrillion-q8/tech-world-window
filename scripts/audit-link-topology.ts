import { articles } from '../src/data/articles';
import { routeGraph } from '../src/data/graph';
import { articleToolLinks, tools } from '../src/data/tools';

/**
 * Reports the editorial internal-link topology without inventing or injecting links.
 * Run with `npm run audit:links`. Recommendations are heuristic and require editorial review.
 */
const byId = new Map(articles.map(article => [article.id, article]));
const bySlug = new Map(articles.map(article => [article.slug, article]));
const incoming = new Map(articles.map(article => [article.id, new Set<string>()]));
const outgoing = new Map(articles.map(article => [article.id, new Set<string>()]));
const issues: string[] = [];
const warnings: string[] = [];

for (const article of articles) {
  for (const targetId of article.relatedArticles ?? []) {
    const target = byId.get(targetId);
    if (!target) {
      issues.push(`${article.slug}: related article ID does not exist: ${targetId}`);
      continue;
    }
    outgoing.get(article.id)?.add(targetId);
    incoming.get(targetId)?.add(article.id);
    if (target.id === article.id) issues.push(`${article.slug}: self-referencing related article`);
  }
  // In-body contextual links are navigation pathways too. Include them in
  // incoming/outgoing counts, but not in the reciprocal relatedArticles graph.
  for (const section of article.content) {
    for (const link of section.relatedLinks ?? []) {
      const target = bySlug.get(link.href.replace(/^\//, '').replace(/\/$/, ''));
      if (target && target.id !== article.id) {
        outgoing.get(article.id)?.add(target.id);
        incoming.get(target.id)?.add(article.id);
      }
    }
  }

  if (article.pillarPath) {
    const pillar = bySlug.get(article.pillarPath.replace(/^\//, ''));
    if (pillar && pillar.id !== article.id) {
      // ArticlePage also adds this pillar to the related-card fallback, so
      // include the rendered navigation path in topology counts.
      outgoing.get(article.id)?.add(pillar.id);
      incoming.get(pillar.id)?.add(article.id);
      if (!(pillar.relatedArticles ?? []).includes(article.id)) {
        warnings.push(`Explicit pillar edge missing: /${article.slug} points to ${article.pillarPath}; ArticlePage supplies a rendered pillar fallback, but consider adding a reviewed reciprocal relatedArticles edge if appropriate.`);
      }
    }
  }
}

const articleRoutePaths = new Set(routeGraph.filter(route => route.kind === 'article').map(route => route.path));
const toolPaths = new Set(tools.map(tool => tool.path));
for (const [slug, paths] of Object.entries(articleToolLinks)) {
  if (!bySlug.has(slug)) issues.push(`Tool link map references missing article: /${slug}`);
  for (const path of paths) if (!toolPaths.has(path)) issues.push(`Tool link map references unregistered tool: ${path}`);
}

const pillars = articles.filter(article => article.contentRole === 'pillar');
for (const pillar of pillars) {
  const expectedClusters = articles.filter(article => article.pillarPath === `/${pillar.slug}`);
  const linked = new Set(pillar.relatedArticles ?? []);
  const missing = expectedClusters.filter(article => !linked.has(article.id));
  if (missing.length) warnings.push(`Pillar /${pillar.slug} is missing ${missing.length} explicit cluster link(s): ${missing.map(article => `/${article.slug}`).join(', ')}`);
}

const lowIncoming = articles
  .filter(article => article.contentRole !== 'pillar')
  .map(article => ({ article, count: incoming.get(article.id)?.size ?? 0 }))
  .sort((a, b) => a.count - b.count || a.article.title.localeCompare(b.article.title));

const noRelated = articles.filter(article => !(outgoing.get(article.id)?.size));
for (const article of noRelated) warnings.push(`No explicit related-article links: /${article.slug}`);

const toolCoverage = articles.filter(article => articleToolLinks[article.slug]);
const likelyToolCandidates = articles.filter(article => {
  if (articleToolLinks[article.slug]) return false;
  const text = `${article.title} ${article.dek} ${article.tags.join(' ')}`.toLowerCase();
  return (text.includes('frame time') || text.includes('stutter') || text.includes('blue screen') || text.includes('stop code') || text.includes('bottleneck') || text.includes('power supply') || text.includes('ram') || text.includes('ssd') || text.includes('storage'));
});

console.log('\nTWW INTERNAL-LINK TOPOLOGY AUDIT');
console.log('================================');
console.log(`Articles: ${articles.length}`);
console.log(`Article routes in graph: ${articleRoutePaths.size}`);
console.log(`Registered tools: ${tools.length}`);
console.log(`Articles mapped to a tool callout: ${toolCoverage.length}`);
console.log(`Articles with zero incoming related-article links: ${lowIncoming.filter(item => item.count === 0).length}`);
console.log(`Articles with zero outgoing related-article links: ${noRelated.length}`);
console.log(`Potential tool-link review candidates (heuristic): ${likelyToolCandidates.length}`);

console.log('\nLOWEST INCOMING RELATED-LINK COUNTS');
for (const { article, count } of lowIncoming.slice(0, 20)) {
  console.log(`- ${count} incoming | /${article.slug}${article.contentRole === 'pillar' ? ' [pillar]' : ''}`);
}

console.log('\nPOTENTIAL TOOL-LINK REVIEW CANDIDATES');
for (const article of likelyToolCandidates.slice(0, 30)) console.log(`- /${article.slug} — ${article.title}`);
if (likelyToolCandidates.length > 30) console.log(`- ... ${likelyToolCandidates.length - 30} more; review the article registry for the full set.`);

if (warnings.length) {
  console.log(`\nEDITORIAL WARNINGS (${warnings.length}; review before changing links)`);
  for (const warning of warnings) console.log(`- ${warning}`);
}
if (issues.length) {
  console.error(`\nTOPOLOGY ERRORS (${issues.length})`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log('\nTopology references are valid. Treat low incoming counts and tool candidates as editorial review prompts, not automatic instructions.');
}
