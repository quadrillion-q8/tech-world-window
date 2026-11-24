import { useMatches } from 'react-router-dom';
import type { getSeoData } from './ssgSeo';
import { routeSeoKey } from './routeSeoKey';

export type RouteSeoPayload = { seo: ReturnType<typeof getSeoData>; schemas: Record<string, unknown>[] };
const modules = import.meta.glob<{ default: RouteSeoPayload }>('../generated/route-seo/*.json');

export async function loadRouteSeo(path: string): Promise<RouteSeoPayload> {
  const loader = modules['../generated/route-seo/' + routeSeoKey(path) + '.json'];
  if (!loader) throw new Error('Missing generated SEO payload for ' + path);
  return (await loader()).default;
}

export function useRouteSeo(): RouteSeoPayload | undefined {
  const matches = useMatches();
  return (matches.at(-1)?.handle as { routeSeo?: RouteSeoPayload } | undefined)?.routeSeo;
}
