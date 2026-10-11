# TWW Article Upgrade: Windows Says Connected but No Internet

Date: 2026-10-11

## Objective

Upgrade the existing troubleshooting page to match the supplied complete guide while preserving its established URL and the site's article-rendering and SEO systems.

## Updated page

- URL preserved: `/windows-11-wifi-connected-no-internet`
- H1 preserved: `Windows Says Connected but No Internet: Complete Troubleshooting Guide`
- Updated the SEO title and meta description for the connected/no-internet search intent. The page template appends ` | Tech World Window`, so the stored title is compact enough to keep the final title tag around 58 characters.
- Expanded the page into a layer-by-layer diagnostic flow covering scope, IP/DHCP, gateway/public-IP/DNS tests, VPN/proxy/security checks, router/modem checks, adapter/driver, Ethernet, MTU/IPv6, Network Reset, hardware isolation, a decision table, and nine FAQs.
- Added contextual links to the Windows troubleshooting pillar, DNS guide, and Network Reset guide.
- Set the article update date to 2026-10-11 and enabled the existing Windows 10/Windows 11 applicability labels.
- Kept the site's existing Article, author-profile, and FAQ structured-data generation; the FAQ content is shared by the visible section and generated FAQ JSON-LD.
- Did not publish screenshot/bench-photo placeholders from the source file or invent a case study.

## Files changed

1. `src/data/articles.ts` — replaced the short article with the full structured guide, test tables, command blocks, contextual links, and nine FAQs.
2. `src/data/content-enhancements.ts` — updated the slug-level SEO override so it matches the new title and meta description instead of replacing them with the older metadata.
3. `public/sitemap.xml` — set this article's `lastmod` to `2026-10-11`.
4. `public/feed.xml` — updated this article item's description and publication date to match the current article metadata.

## Validation notes

- TypeScript syntax parsing passed for both edited TypeScript source files.
- The upgraded article object passed an isolated strict TypeScript type-check against the site's article data shape.
- The full project build and integrated validators could not be run in this environment because `npm ci` did not complete and the local project dependencies were unavailable. Run `npm run build` after installing the project's dependencies before deploying.
