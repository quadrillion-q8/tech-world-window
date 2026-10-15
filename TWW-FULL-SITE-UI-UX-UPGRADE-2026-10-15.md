# Tech World Window — Full-Site UI/UX Upgrade

Date: 2026-10-15

## Scope
Extend the homepage's dark premium technology language to interior pages while preserving the existing page components, route definitions, article data, and SEO implementation.

## File changed
- `src/styles/globals.css` — added site-wide navy/cyan tokens, dark global header and navigation, consistent card surfaces, form focus styling, article reading styles for code/tables/callouts, footer styling, and reduced-motion handling.

## Intentionally unchanged
- React page components and article content
- Route definitions and link destinations
- SEO component and metadata data
- Interactive tool logic and form handlers
- Build/deployment configuration

## Verification status
- Source update committed to a dedicated branch.
- No production build, dependency installation, or real-browser visual test was run as part of this change.
- Review desktop and mobile layouts and run the project's CI/build before merging.
- CSS uses broad shared selectors; inspect tool-specific screens and any exceptional light-surface components during QA.
