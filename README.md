# Tech World Window — V1

**Brand:** TECH WORLD WINDOW  
**Tagline:** Your Window Into Technology  
**Editorial promise:** Technology news, practical fixes, real-world testing and useful tools — clearly explained.

This V1 now uses the same engineering principle requested for the KCROC foundation: **one canonical route graph drives route registration, navigation/content relationships, sitemap generation, SSG inclusion, and production validation.**

## Production pipeline

```text
src/data/graph.ts
   ├── canonical public URL inventory
   ├── src/routes.tsx → exact React Router route registration
   ├── Header navigation → graph-derived navigation
   ├── scripts/generate-sitemap.ts → public/sitemap.xml + public/robots.txt
   └── vite.config.ts → vite-react-ssg includedRoutes
                         ↓
                  prerendered HTML
                         ↓
              scripts/validate-build.ts
                         ↓
        route-by-route HTML / SEO / sitemap checks
```

### What is now enforced

- `routeGraph` is the canonical inventory for public indexable routes.
- `vite-react-ssg` 0.9.2 is paired with the supported Vite 6.4 line rather than the older Vite 5 starter dependency.
- Every graph route is registered as a concrete route in `src/routes.tsx`.
- Navigation is sourced from the route graph rather than a disconnected URL list.
- `vite-react-ssg` prerenders every indexable graph route with nested output such as `/news/index.html`.
- Sitemap URLs and `robots.txt` are generated from the same graph.
- Validation checks duplicate routes, article↔graph parity, sitemap↔graph parity, robots↔sitemap parity, and the existence of route-specific prerendered HTML.
- Validation also checks that each prerendered page contains a title, canonical URL, and rendered Tech World Window content.
- Article pages emit Article JSON-LD and BreadcrumbList JSON-LD.
- SEO head generation uses `vite-react-ssg`’s built-in `<Head />`, so titles, canonicals, descriptions and schema are available during prerendering—not only after client hydration.
- Category and article pages resolve their URLs from `location.pathname`, matching the concrete graph routes used for SSG.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

The production build is intentionally gated: sitemap generation → typecheck → SSG → validation. A failed validation exits the build with a non-zero status.

## Launch gates still outstanding

This engineering upgrade verifies the rendering pipeline. Before a public launch, still verify the final domain, editorial accuracy, article sourcing, author credentials, licensed images, privacy/cookie disclosures, accessibility, Core Web Vitals, redirects, and Search Console ownership.

### Tools hub

`/tools` is the public tools hub. Individual tools live beneath it, starting with `/tools/pc-bottleneck-calculator`. The header Tools link points to the hub.
