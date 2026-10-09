# TWW — KCROC SEO Integrity Upgrade

Date: 2026-10-10

## Scope

This pass transfers selected KCROC engineering practices into TWW's existing architecture. It does not copy KCROC's local-business schema, repair-service pages, location SEO, pricing, booking, or review-count logic.

## Changes

- Added `scripts/audit-content-integrity.ts` as a focused editorial integrity check.
- Added `npm run validate:content` and wired it into the existing `npm run validate` chain.
- The new check validates explicit Markdown internal links against indexable routes, checks referenced `/assets/` paths, validates external Markdown links and source URLs use HTTPS, checks configured hero-image paths, verifies article route parity, and reports non-blocking editorial review warnings for articles without incoming related-article relationships or with very few content sections.
- Updated `TWW-LAUNCH-SEO-CHECKLIST.md` to remove a hardcoded sitemap count and point back to route-graph parity validation.
- Documented the build's automated checks in the launch checklist.

## Why this is useful

The goal is to catch broken editorial links, missing local assets and source hygiene problems during development rather than after publication. Warnings are deliberately non-blocking because a short article or a page without a related-article relationship is a prompt for editorial review, not automatically a search-engine defect.

## Verification status

- Source edits and package-script wiring reviewed.
- A full `npm ci` was attempted in the working environment but did not finish before the execution timeout; therefore a complete TypeScript check and production build could not be certified here.
- Before deployment, run `npm ci` and `npm run build` locally. Fix any audit errors before pushing.

## Important limits

This is a source-code integrity improvement, not proof of improved rankings. After deployment, compare Search Console impressions, clicks, queries, country and page data against a saved baseline. Do not publish extra URLs solely to increase sitemap size.
