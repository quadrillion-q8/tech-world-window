# Tech World Window — UI/UX and Frontend Quality Audit

**Date:** 19 October 2026  
**Repository:** `quadrillion-q8/tech-world-window`  
**Baseline commit inspected:** `7f19796d700a6e96262f6a3ff7564d99d0cca4c2`

## Executive summary

The deployed site has a functioning React/TypeScript + Vite static-site-generation architecture, a central route graph, route/content validation, and scheduled live-route smoke checks. Before this pass, the latest `main` commit had successful build/validation, Vercel deployment, and scheduled production smoke statuses.

The highest-impact verified UI issue was the desktop mega-menu's dependence on CSS hover. The menu's expanded-state attribute was primarily tied to the mobile toggle state, leaving the desktop sub-navigation unreliable for keyboard-only visitors. Footer discovery also omitted direct links to several important content hubs. Finally, a standalone internal-link topology audit existed but was not part of the standard `npm run build` validation chain.

## Scope inspected

Source-level review covered:

- Shared shell and navigation: `src/layouts/RootLayout.tsx`, `src/components/Header.tsx`, and `src/components/Footer.tsx`.
- Reusable article and media UI: `ArticleCard.tsx`, `ArticleThumbnail.tsx`, `FaqSection.tsx`, `ToolCallout.tsx`, and `AffiliateLink.tsx`.
- Consent, analytics, and structured data: `ConsentBanner.tsx`, `src/lib/consent.ts`, `src/lib/analytics.ts`, and `SiteStructuredData.tsx`.
- Homepage and page templates for articles, categories, static pages, buying/review hubs, comparisons, tools, gallery, and Windows/game diagnostics.
- Route and SEO generation: `src/data/graph.ts`, `src/routes.tsx`, `src/seo/SEOEngine.tsx`, `src/seo/ssgSeo.ts`, `src/seo/title.ts`, `vite.config.ts`, and `src/main.tsx`.
- Design layers: `globals.css`, `visual-refresh.css`, and `workbench.css`.
- Build/quality scripts: `package.json`, `scripts/validate-build.ts`, `scripts/audit-content-integrity.ts`, `scripts/audit-gallery-coverage.ts`, `scripts/audit-link-topology.ts`, and `scripts/smoke-test-live-site.mjs`.
- GitHub Actions build and live-smoke workflows, plus the public production homepage and key category/tool pages.

This is a repository source audit with public production-page inspection, not a claim of exhaustive manual testing in every browser or assistive technology.

## Verified findings and changes

### 1. Desktop navigation was hover-dependent

**Finding:** The previous visibility rule showed mega-menus on hover or when the menu had its mobile-open class. The header did not provide a reliable keyboard-focus opening path, and `aria-expanded` did not consistently describe the desktop popup state.

**Change:** Menu state now opens from desktop pointer hover and keyboard focus, uses a unique `aria-controls` target per group, and keeps `aria-expanded` synchronized with its open state. Escape closes an open disclosure and restores focus when focus was inside that disclosure. Pointer activation outside the header closes open navigation. The CSS visibility rule is state-driven so the menu can actually close on Escape rather than immediately reappearing from a hover selector.

**Remaining QA:** Exercise keyboard Tab/Shift+Tab and Escape flows in a real browser, as well as touch navigation at narrow widths. Source-level changes do not establish WCAG conformance on their own.

### 2. Footer discovery was incomplete

**Finding:** The footer rendered only the first four navigation groups; it did not offer direct footer links to Guides, Reviews, Buying Guides, and Tools.

**Change:** Added direct footer shortcuts for Guides, Reviews, Buying Guides, Research, and Free Tools while retaining existing About, editorial, privacy, contact, testing, affiliate disclosure, and gallery destinations.

### 3. Internal-link topology audit was not part of the default build gate

**Finding:** `npm run audit:links` existed, but `npm run build`'s `validate` step did not call it. This meant a useful check of article relationship and tool-link references could be skipped by the normal build path.

**Change:** Added `npm run audit:links` to the standard validation script. The audit's heuristic editorial warnings remain advisory; actual topology reference errors return a non-zero exit code.

### 4. Styling layers are intentionally stacked

**Finding:** `src/main.tsx` imports three global style layers, with `workbench.css` last. That file explicitly disables the decorative animated circuit background and establishes a warm, restrained Workbench theme. This is an intentional current design choice rather than a proven defect.

**Action:** No theme rewrite or animation change was made. The stylesheet stack is a maintenance risk because similar shared selectors exist across layers; consolidation should be a separate change backed by browser screenshots and visual regression checks. Raw source CSS size is not a substitute for measuring the production payload.

### 5. Existing safeguards retained

- The route graph continues to be the source for route registration, navigation, sitemap generation, and prerender inclusion.
- No article, content registry, public route, canonical URL, SEO metadata, or functional tool logic was changed.
- Existing reduced-motion CSS rules and consent-gated analytics flow were retained.
- No dependency was added.

## Files changed in this pass

- `src/components/Header.tsx` — keyboard/pointer disclosure state, Escape and outside-pointer dismissal, focus restoration, and explicit menu controls.
- `src/styles/globals.css` — changed mega-menu visibility from a hover-only selector to its controlled open state.
- `src/components/Footer.tsx` — added direct discovery links for Guides, Reviews, Buying Guides, Research, and Tools.
- `package.json` — included the internal-link topology check in the standard validation command.
- `TWW-UI-UX-AUDIT-2026-10-19.md` — this audit record.

## Verification status and limitations

### Verified before changes

- Build-and-validation workflow for baseline commit `7f19796d700a6e96262f6a3ff7564d99d0cca4c2`: **success**.
- Scheduled live-production smoke check for the same baseline commit: **success**.
- Vercel status for the same baseline commit: **deployment completed**.
- Public production homepage, Windows/Gaming/Hardware/Guides/Tools and About pages were retrievable through public web indexing.

### Required on this branch

- Run the GitHub Actions build-and-validation workflow, including TypeScript, SSG output, content integrity, gallery coverage, and the newly included internal-link audit.
- Confirm the PR's CI status before merging.

### Not verified in this environment

The working container could not clone GitHub because it could not resolve `github.com`, so I did not run `npm ci` or a local production build. I also did not perform live keyboard/screen-reader sessions, manual viewport screenshots, browser-console inspection, Lighthouse, or measured Core Web Vitals. Do not interpret the successful baseline checks as evidence that the new branch has already passed its own CI or that the site meets all WCAG 2.2 AA criteria.

## Prioritized remaining work

1. Review the new navigation with keyboard-only and touch interactions in a browser, including Escape, focus return, outside clicks, and focus visibility.
2. Run and review the PR's CI/build results before merging.
3. Capture repeatable desktop/mobile screenshots for homepage, article, category, tool, comparison/review, and gallery templates; make any visual corrections from observed defects.
4. Measure production bundle size and real Core Web Vitals before claiming performance improvements.
5. Consider a separately scoped CSS consolidation only after a visual regression baseline exists.
