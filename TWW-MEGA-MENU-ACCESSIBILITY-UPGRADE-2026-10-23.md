# TWW Desktop Mega-Menu Accessibility Upgrade — 23 October 2026

Repository: `quadrillion-q8/tech-world-window`

## Changes made

- Converted all nine main category labels into explicit disclosure buttons while keeping each category destination discoverable as the first **View [category]** link inside its panel. Existing `menuGroups` and route-graph data remain the source of navigation labels and targets.
- Added 175 ms desktop hover-intent delays for both opening and closing. Moving between adjacent category groups cancels the pending close timer, and focus within a panel keeps it open.
- Synchronized `aria-haspopup`, `aria-expanded` and `aria-controls` with the active menu state. Panels expose menu semantics and menu items retain regular Tab navigation.
- Added keyboard behavior: Enter/Space activate the disclosure button natively; Arrow Down opens and focuses the first item; Arrow Up opens and focuses the last; Arrow Up/Down move between menu items; Home/End jump to the first/last item; Left/Right move between category triggers; Escape closes the active panel and restores focus when appropriate.
- Aligned desktop navigation with a single-line flex layout at 1024 px and wider. The hamburger navigation is active at 1023 px and below, with full-width touch-friendly category controls.
- Kept the existing dark mega-menu surface but strengthened navigation focus states and changed sub-link titles to regular 400 weight, preserving clear contrast and the existing two-column layout for long lists.

## Scope and verification

Changed files: `src/components/Header.tsx`, `src/styles/page-layout-refinements.css`, and this report. The existing responsive navigation overrides in `src/styles/sitewide-ui-polish.css` were aligned to the 1024 px breakpoint.

No packages, route definitions, content records, canonical URLs, sitemap generation, or SEO data were changed. TypeScript/build verification should be taken from the GitHub Actions run for the resulting commit. A source edit alone is not proof of WCAG 2.2 AA conformance; visual viewport checks, keyboard-only testing and screen-reader checks still require a browser session.
