# File Change Log — Topical Authority Upgrade (2026-10-10)

## Created

- `TWW-TOPICAL-AUTHORITY-UPGRADE-2026-10-10.md` — purpose, scope, implementation details, validation steps, and editorial follow-through.
- `TWW-CHANGELOG-TOPICAL-AUTHORITY-2026-10-10.md` — this file-by-file change log.

## Modified

- `src/data/articles.ts` — extends the content model with validated, curated in-body related links and includes their visible text in structured-data word-count calculations.
- `src/data/content-enhancements.ts` — adds diagnostic enrichment for the Windows pillar, Windows memory diagnosis, SSD health and slowdown, random freezes, game stuttering, and SSD buying criteria. Adds explicit next-step links and updated dates for these enriched pages.
- `src/pages/ArticlePage.tsx` — renders in-body contextual link lists.
- `src/lib/contentRelationships.ts` — prioritizes a linked article pillar in related cards and surfaces research pages based first on their editorially declared reverse relationships.
- `src/styles/globals.css` — styles the new contextual link list.
- `scripts/validate-build.ts` — validates contextual link labels, descriptions, and indexable route destinations.
- `scripts/audit-content-integrity.ts` — validates contextual links and includes their visible text in article-content checks.
- `scripts/audit-link-topology.ts` — counts contextual in-body links and rendered pillar fallbacks in the topology report.
- `public/sitemap.xml` — adds five missing research URLs and updates last-modified dates for enriched URLs.
- `BUILD-VERIFICATION.md` — removes the obsolete fixed count of 16 routes, describes dynamic route validation, and recommends `npm ci`.

## Unchanged by design

- `src/data/graph.ts` and all established URLs — no new URL or slug changes were necessary.
- `package.json` and `package-lock.json` — no new dependencies.
- Existing explicit `relatedArticles` edges — left intact to avoid triggering reciprocal-link rules without editorial review.

## Verification

A full `npm run build` is still required in the development environment after installing dependencies. See `TWW-TOPICAL-AUTHORITY-UPGRADE-2026-10-10.md`.
