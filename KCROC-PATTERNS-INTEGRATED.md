# KCROC Patterns Integrated into Tech World Window

This upgrade adapts reusable engineering and SEO patterns from the KCROC project to TWW without copying KCROC's repair-business branding or local-service intent.

## Integrated

- Entity-first canonical route graph remains the single source of truth.
- Route graph now also exposes editorial mega-menu groupings and validates every menu destination.
- Desktop/mobile grouped mega-navigation with contextual links.
- Stronger footer information architecture for discovery and internal linking.
- Article pillar/cluster metadata (`contentRole`, `pillarPath`, `searchIntent`).
- Explicit article-to-hub internal linking.
- Related-story discovery remains data-driven.
- Article tags surfaced on-page.
- Sources/further-reading support surfaced when supplied.
- Deterministic build-time canonical/title/meta/OG/Twitter SEO remains in place.
- Article, BreadcrumbList, Organization, WebSite and FAQPage structured data.
- Article schema now carries category and optional hero image.
- 404 remains `noindex,follow`.
- External Google Fonts CSS import removed to reduce render-blocking third-party dependency and improve performance consistency.
- Reduced-motion accessibility support added.
- Build validation now checks mega-menu links, cluster pillar paths, Organization schema, and FAQ schema.
- Existing sitemap/robots/SSG/CI architecture is preserved rather than replaced.

## Deliberately not copied

- KCROC local Kuwait service-area pages and local-business schema.
- Repair-service pricing/booking CTAs.
- KCROC Technical Noir branding.
- Arabic/local commercial landing-page strategy.
- Repair-specific ChatWidget/API integration.

Those are business-specific to KCROC and would dilute TWW's editorial identity.

## Verification status

The source changes were checked for balanced TypeScript/JSX/CSS delimiters and the external font dependency was confirmed removed.

A full `npm run build` could not be completed in this environment because `npm install` timed out before dependencies were available. The available global TypeScript compiler reached the dependency/type-definition stage and reported only missing installed type packages (`node`, `vite/client`); no source syntax error was reported before that stage.

After downloading/extracting this project locally, run:

```bash
npm install
npm run build
npm run preview
```

Do not submit the production URLs to Search Console until the build ends with `Validation passed`.
