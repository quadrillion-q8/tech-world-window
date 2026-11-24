import { routeGraph, SITE_URL } from '../data/graph';

export const INDEX_ROBOTS = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
export const NOINDEX_ROBOTS = 'noindex,follow';

export function cleanPath(path: string): string {
  const url = new URL(path, SITE_URL);
  return url.pathname.replace(/\/$/, '') || '/';
}

export function isIndexablePath(path: string): boolean {
  const url = new URL(path, SITE_URL);
  return url.origin === new URL(SITE_URL).origin && routeGraph.some(route => route.path === cleanPath(path) && route.indexable);
}

// A public route can explicitly opt out, but an unknown/non-indexable route
// must never be made indexable by a page-level default.
export function robotsForPath(path: string, requested = INDEX_ROBOTS): string {
  return isIndexablePath(path) ? requested : NOINDEX_ROBOTS;
}

export function canonicalForPath(path: string): string {
  return new URL(cleanPath(path), SITE_URL).href;
}

export function buildRobotsTxt(): string {
  // Search/retrieval and model-training agents are intentionally listed.
  // TWW's approved policy allows both. Robots is not access control.
  const agents = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'GPTBot', 'ClaudeBot', 'Google-Extended', '*'];
  return [...agents.map(agent => 'User-agent: ' + agent), 'Allow: /', 'Disallow: /admin/', 'Disallow: /api/', '', 'Sitemap: ' + new URL('/sitemap.xml', SITE_URL).href, ''].join('\n');
}
