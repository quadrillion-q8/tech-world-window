import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { routeGraph } from '../src/data/graph';
import { getSeoData, getRouteSchemas } from '../src/seo/ssgSeo';
import { routeSeoKey } from '../src/seo/routeSeoKey';

const dir = resolve('src/generated/route-seo');
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
const keys = new Set<string>();
for (const route of routeGraph.filter(item => item.indexable)) {
  const key = routeSeoKey(route.path);
  if (keys.has(key)) throw new Error('Duplicate route SEO key: ' + key);
  keys.add(key);
  // The shared site graph is generated at runtime from the same siteSchema
  // module. Avoid duplicating it in every route's payload.
  const schemas = getRouteSchemas(route.path).slice(1);
  writeFileSync(resolve(dir, key + '.json'), JSON.stringify({ seo: getSeoData(route.path), schemas }) + '\n');
}
console.log('Generated ' + keys.size + ' route-scoped SEO payloads.');
