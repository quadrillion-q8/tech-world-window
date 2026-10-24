# TWW Main Menu Upgrade — 24 October 2026

Repository: \`quadrillion-q8/tech-world-window\`

## Scope

- Make category highlighting recognize both category paths and curated child destinations.
- Close mobile navigation and active mega-menu state whenever the route changes.
- Replace application-style \`menu/menuitem\` semantics with ordinary site navigation and disclosure buttons; retain keyboard opening, hover intent, Escape dismissal, and focus restoration.
- Remove redundant submenu links that duplicated the group landing CTA.
- Rename **Best** to **Buying Guides** while retaining the existing \`/best\` URL.
- Add a keyboard-accessible site search (Ctrl+K / Cmd+K) across article titles, descriptions, tags, topic hubs, reviews, comparisons, error-code pages and registered tools. Article search data loads on demand.
- Move the desktop/mobile navigation breakpoint to 1120px so the longer category label and search control do not crowd the desktop header. Keep mobile menu toggle and search control touch targets at 44px.
- Add build-time checks for duplicate menu group labels, duplicate destinations and repeated group landing links.

## Files changed

- \`src/components/Header.tsx\`
- \`src/components/SearchDialog.tsx\` (new)
- \`src/data/graph.ts\`
- \`src/styles/sitewide-ui-polish.css\`
- \`src/styles/page-layout-refinements.css\`
- \`scripts/validate-build.ts\`

## Preserved behavior

- Existing route paths, canonical URLs, article data, tool paths, sitemap data and page SEO metadata are unchanged.
- The **Buying Guides** category continues to resolve to \`/best\`.
- Search is a progressive enhancement: the navigation remains available if the search dialog is closed, and the article-index import has a non-blocking fallback to registered routes and tools.

## Validation required

The normal \`npm run build\` pipeline runs TypeScript, SSG, sitemap/SEO validation, content checks and the link-topology audit. Confirm the pull request's CI result before merging. Also manually test keyboard-only and touch navigation plus viewport widths of 1440, 1280, 1120, 1119, 1024, 768, 390 and 320px in a browser. Verify the Vercel deployment uses the merged commit; a successful source build alone does not prove the correct production deployment is live.
