# Build verification notes

The V1 production build is intentionally gated by:

```text
routeGraph
  -> sitemap + robots
  -> TypeScript check
  -> vite-react-ssg client build
  -> vite-react-ssg server/SSG build
  -> prerendered route HTML
  -> build-time SEO injection
  -> validation
```

The validation script derives the expected route set dynamically from `routeGraph.filter(route => route.indexable)`. At the 2026-10-10 source snapshot this graph contains 94 indexable routes; treat that number as a snapshot, not a hard-coded rule. Every indexable route must have its nested prerendered `index.html` file in `dist/`.

It also verifies, for every indexable route:

- route-specific `<title>`
- exact canonical URL
- route-specific meta description
- rendered Tech World Window content
- JSON-LD structured data

The SSG layer uses `vite-react-ssg`'s documented `onPageRendered` hook to make the final crawler-facing HTML deterministic. The React pages still use `Head` for runtime/document-head behavior, while the build-time hook guarantees static SEO output.

On Windows:

```bash
npm ci
npm run build
npm run preview
```

Do not submit URLs to Google Search Console until `npm run build` ends with `Validation passed`.


The build also regenerates `public/sitemap.xml` and `public/robots.txt` from the current route graph before type checking. If the checked-in sitemap appears out of sync, run `npm run generate:sitemap` and review the diff; do not hand-maintain a fixed route count in validation documentation.
