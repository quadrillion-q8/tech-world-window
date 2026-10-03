import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { routeGraph } from './src/data/graph';
import { injectSsgSeo } from './src/seo/ssgSeo';

const staticRoutes = routeGraph.filter(route => route.indexable).map(route => route.path);

// The route graph is the single source of truth for SSG output. This prevents
// a new public route from being added to the sitemap without also being
// prerendered, and vice versa.
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    entry: 'src/main.tsx',
    dirStyle: 'nested',
    includedRoutes: () => staticRoutes,
    onPageRendered: (route, renderedHTML) => injectSsgSeo(renderedHTML, route),
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
