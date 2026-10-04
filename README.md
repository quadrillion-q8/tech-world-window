# Tech World Window — V1

**Brand:** TECH WORLD WINDOW  
**Tagline:** Your Window Into Technology  
**Editorial promise:** Technology news, practical fixes, real-world testing and useful tools — clearly explained.

This V1 uses one canonical route graph to drive route registration, navigation, sitemap generation, robots.txt, Vite React SSG inclusion, and production validation.

## Production pipeline

```text
src/data/graph.ts
   ├── canonical public URL inventory
   ├── src/routes.tsx → exact React Router route registration
   ├── Header → graph-derived navigation
   ├── scripts/generate-sitemap.ts → sitemap.xml + robots.txt
   └── vite.config.ts → vite-react-ssg includedRoutes
                         ↓
                  prerendered HTML
                         ↓
              build-time SEO injection
                         ↓
              scripts/validate-build.ts
                         ↓
       exact route / navigation / sitemap / HTML checks
```

### Build guarantees

- `routeGraph` is the canonical inventory for public routes.
- Every graph route is registered by `src/routes.tsx`.
- Header navigation is derived from the route graph.
- Sitemap and `robots.txt` are generated from the same graph.
- `vite-react-ssg` prerenders every indexable graph route.
- Build-time SEO injection writes deterministic title, description, robots, canonical, Open Graph, Twitter, BreadcrumbList, and article metadata into the generated HTML.
- Validation checks duplicate/invalid graph paths, SEO uniqueness, navigation-to-route parity, article↔graph parity, sitemap exact-set parity, robots↔sitemap parity, and exact prerendered HTML output.
- Article HTML is checked for Article JSON-LD and BreadcrumbList JSON-LD.
- The project is pinned to Node 22.x at the package level and in GitHub Actions to keep local/CI/Vercel runtime expectations aligned.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

The production build is intentionally gated:

```text
sitemap generation
      ↓
typecheck
      ↓
vite-react-ssg client build
      ↓
vite-react-ssg server/SSG build
      ↓
prerendered HTML
      ↓
SEO injection
      ↓
exact validation
```

A failed validation exits the build with a non-zero status. GitHub Actions runs the same `npm run build` gate on pushes to `main` and pull requests targeting `main`.

## Launch gates still outstanding

Before public launch, still verify the final domain, editorial accuracy, article sourcing, author credentials, licensed images, privacy/cookie disclosures, accessibility, Core Web Vitals, redirects, and Search Console ownership.
