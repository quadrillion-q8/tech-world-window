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

## Architecture upgrades

The project now keeps an entity-first discipline while remaining editorial: grouped mega-navigation, pillar/cluster metadata, stronger internal linking, Organization/WebSite/FAQ structured data, richer article metadata, deterministic SSG SEO, accessibility motion preferences, and a reduced third-party font dependency. See `ARCHITECTURE-PATTERNS-INTEGRATED.md` for the exact boundary between reusable engineering patterns and business-specific features that are not included.

## Article content model

Articles live in `src/data/articles.ts`; long pillars may live in their own file (see `src/data/windows-troubleshooting-pillar.ts`). Sections support `paragraphs`, `bullets`, ordered `steps`, and a `table` whose cells can be plain text or internal links (`/route` or `#anchor`). Optional `seoTitle`, `metaDescription` and `appliesTo` control search snippets and version scope. All of it is checked by `scripts/validate-build.ts`.

## Production maintenance checklist

The public website is https://www.techworldwindow.com/. Google Search Console and Analytics have previously been configured for the site; re-check account and domain ownership if settings change, rather than treating an earlier verification as a permanent guarantee.

Before and after meaningful production releases, verify:

- **Editorial quality:** technical claims, source links, author attribution, publication/update dates, and version-specific advice.
- **Image and content rights:** licenses or permissions for screenshots, photographs, quoted material, and embedded media.
- **Privacy and disclosure:** cookie/privacy information and clear disclosure of third-party services or AI features that submit user-provided text to a provider.
- **Accessibility and performance:** keyboard navigation, visible focus, form labels, reduced-motion behavior, mobile layouts, and Core Web Vitals on representative pages.
- **Technical SEO:** canonical URLs, redirects, robots directives, sitemap parity, prerendered HTML, and Search Console indexing reports.
- **Release health:** required CI/build validations pass, the Vercel production deployment is healthy, and key pages/tools work in a real browser.

These are recurring release checks, not a claim that every item is currently failing or that each has just been independently re-tested.
