import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { routeGraph, SITE_URL } from '../src/data/graph';
import { topicLinks, productTopicLinks } from '../src/data/topicLinks';
import { products, productPath } from '../src/data/products';
import { articleToolLinks } from '../src/data/tools';

const dist = resolve('dist');
const routes = routeGraph.filter(route => route.indexable);
const paths = new Set(routes.map(route => route.path));
const all = new Map<string, Set<string>>();
const contextual = new Map<string, Set<string>>();
const failures = new Set<string>();
const origins = new Set([new URL(SITE_URL).origin, 'https://techworldwindow.com', 'http://techworldwindow.com', 'http://www.techworldwindow.com']);
function links(html: string, from: string): Set<string> {
  const found = new Set<string>();
  for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1].replace(/&amp;/g, '&');
    if (href.startsWith('#') || /^(mailto|tel|javascript|data):/i.test(href)) continue;
    let url: URL;
    try { url = new URL(href, new URL(from, SITE_URL)); } catch { failures.add(from + ': invalid href ' + href); continue; }
    if (!origins.has(url.origin)) continue;
    const path = url.pathname.replace(/\/$/, '') || '/';
    if (paths.has(path)) { if (path !== from) found.add(path); continue; }
    // Real static downloads/images/feeds are not graph nodes.
    if (path !== '/' && existsSync(join(dist, path)) && /\.[a-z0-9]+$/i.test(path)) continue;
    failures.add(from + ': broken/unregistered internal link ' + href);
  }
  return found;
}
for (const route of routes) {
  const filename = route.path === '/' ? 'index.html' : route.path.slice(1) + '/index.html';
  const html = readFileSync(join(dist, filename), 'utf8').replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, '');
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
  if (!main) failures.add(route.path + ': missing main content landmark');
  all.set(route.path, links(html, route.path));
  contextual.set(route.path, links(main || '', route.path));
}
function depth(graph: Map<string, Set<string>>) {
  const seen = new Map([['/', 0]]);
  const queue = ['/'];
  for (let i = 0; i < queue.length; i++) {
    for (const target of graph.get(queue[i]) || []) {
      if (seen.has(target)) continue;
      seen.set(target, seen.get(queue[i])! + 1);
      queue.push(target);
    }
  }
  return seen;
}
const fullDepth = depth(all);
const mainDepth = depth(contextual);
const incoming = new Map(routes.map(route => [route.path, 0]));
const mainIncoming = new Map(routes.map(route => [route.path, 0]));
for (const targets of all.values()) for (const path of targets) incoming.set(path, incoming.get(path)! + 1);
for (const targets of contextual.values()) for (const path of targets) mainIncoming.set(path, mainIncoming.get(path)! + 1);
const orphans = routes.filter(route => route.path !== '/' && !incoming.get(route.path));
const unreachable = routes.filter(route => !fullDepth.has(route.path));
for (const route of orphans) failures.add('Orphan route: ' + route.path);
for (const route of unreachable) failures.add('Unreachable from homepage: ' + route.path);
let reviewedEdges = 0;
function verifyEdges(source: string, targets: readonly (readonly [string, string])[]) {
  if (!paths.has(source)) failures.add('Unregistered contextual source: ' + source);
  const seen = new Set<string>();
  for (const [target, reason] of targets) {
    if (!paths.has(target) || source === target || seen.has(target) || !reason.trim()) failures.add('Invalid contextual edge: ' + source + ' -> ' + target);
    if (!contextual.get(source)?.has(target)) failures.add('Contextual edge missing in rendered main: ' + source + ' -> ' + target);
    seen.add(target); reviewedEdges++;
  }
}
for (const [source, targets] of Object.entries(topicLinks)) verifyEdges(source, targets);
for (const product of products) verifyEdges(productPath(product), productTopicLinks[product.category] || []);
let toolEdges = 0;
for (const [slug, targets] of Object.entries(articleToolLinks)) {
  for (const target of targets) {
    if (!contextual.get('/' + slug)?.has(target)) failures.add('Tool callout link missing in rendered main: /' + slug + ' -> ' + target);
    toolEdges++;
  }
}
const report = routes.map(route => ({ path: route.path, kind: route.kind, incoming: incoming.get(route.path), mainIncoming: mainIncoming.get(route.path), depth: fullDepth.get(route.path) ?? null, mainDepth: mainDepth.get(route.path) ?? null, outgoing: all.get(route.path)?.size ?? 0, mainOutgoing: contextual.get(route.path)?.size ?? 0 }));
console.log('\nTWW RENDERED LINK GRAPH AUDIT');
console.log('Indexable routes inspected: ' + routes.length);
console.log('Orphan routes: ' + orphans.length);
console.log('Unreachable routes: ' + unreachable.length);
console.log('Maximum full-page click depth: ' + Math.max(...fullDepth.values()));
console.log('Routes within 3 clicks: ' + [...fullDepth.values()].filter(n => n <= 3).length);
console.log('Routes reachable using main content links only: ' + mainDepth.size);
console.log('Maximum main-content click depth (reachable routes): ' + Math.max(...mainDepth.values()));
console.log('Reviewed contextual edges verified: ' + reviewedEdges);
console.log('Article-to-tool edges verified: ' + toolEdges);
console.log('Unique full-page internal edges: ' + [...all.values()].reduce((n,s) => n+s.size,0));
console.log('Unique main-content internal edges: ' + [...contextual.values()].reduce((n,s) => n+s.size,0));
for (const route of report.filter(row => row.path !== '/' && (row.mainIncoming ?? 0) <= 1)) console.log('LOW MAIN-INCOMING: ' + route.mainIncoming + ' | ' + route.path);
writeFileSync(join(dist, '.vite', 'internal-link-report.json'), JSON.stringify({routes:report, reviewedEdges,toolEdges, failures:[...failures]}, null, 2));
if (failures.size) { console.error('Rendered link audit failed:\n- ' + [...failures].join('\n- ')); process.exit(1); }
console.log('PASS: rendered canonical routes, curated links and tool pathways.');
