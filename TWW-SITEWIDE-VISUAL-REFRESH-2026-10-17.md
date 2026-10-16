# TWW Sitewide Visual Refresh — 2026-10-17

## Audit finding

The shared stylesheet had grown to more than 86 KB with hundreds of CSS rules and several overlapping generations of design overrides. The resulting visual system mixed old light-surface styles, a dark navy global theme, pale callouts and tables, cyan highlights, and amber emphasis. Some shared text and table rules retained light-theme colors even after the site switched to dark surfaces.

## Changes in this pass

- Added `src/styles/visual-refresh.css`, imported after the existing global stylesheet so the refresh applies consistently without rewriting functional page components.
- Consolidated shared design tokens for background, text, muted text, borders, surfaces, accent and warning color.
- Standardized article, category, research, review, content and tool cards onto one restrained surface and border system.
- Made homepage category tiles visually consistent so the subject images—not arbitrary pastel tile fills—provide category differentiation.
- Reduced the global circuit-grid/circuit-trace intensity so the background stops competing with body text.
- Refined navigation and mega-menu colors, active states, brand sizing and hover behavior.
- Made article tables and diagnostic callouts fit the dark editorial palette instead of showing unrelated pale surfaces.
- Standardized headings, body copy, links, buttons, form controls, focus outlines and mobile breakpoints.
- Reserved amber for warnings/caution; cyan/teal is the main interaction accent.
- Preserved the existing route/component structure, copy, image assets, SEO metadata and structured-data code.

## Design intent

The target is a coherent “technical editorial” identity: deep navy background, softly separated dark surfaces, near-white headings, readable blue-gray body copy, restrained cyan interaction accents, and fewer competing gradients/glows. It is intentionally not a pure-black neon interface.

## Validation status

The CSS and import were committed to a review branch. A production build and visual QA at desktop/tablet/mobile sizes must pass before final deployment. Confirm long tables remain horizontally scrollable on narrow devices, check dropdown/keyboard states, compare the homepage and representative article/tool/category pages, and run the normal production validators.
