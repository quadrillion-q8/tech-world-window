# TWW Keyword-Gap Upgrade — 2026-10-15

## Source data
Reviewed the supplied Google Search Console export dated 2026-10-15 (date filter: Last 3 months) alongside the current website source ZIP and its route graph/sitemap. The query export is a small sample; many opportunities have only 1–7 impressions, so this pass improves existing URLs rather than creating thin new pages.

## Code changed
- `src/data/content-enhancements.ts`
  - Expanded `/gpu-100-percent-usage-gaming` with a dedicated explanation of GPU utilization and a diagnostic table aligned to broader searches such as `gpu utilization`, `what should gpu usage be when gaming`, and `is my gpu supposed to be at 100`.
  - Expanded `/pc-game-stuttering-fix-frame-time` with a Windows 10-specific troubleshooting section, while retaining the existing URL and the broader game-stutter intent. This responds to the observed `windows 10 stuttering` query without creating a new page from just two impressions.
  - Expanded `/research/does-more-ram-make-windows-faster` with a more-RAM-versus-faster-RAM decision section, evidence-based upgrade guidance, a comparison table, and internal links to related RAM/Windows pages.

## Deliberately not created
- No new URLs. The export does not yet establish enough demand to justify a standalone Windows 10 stuttering page or a separate general GPU-utilization article.
- No new title/meta changes; the GPU page already received query-aligned metadata in the current source.
- No changes to the disk-usage, PSU, crashing, DNS, or network-reset pages because the current sitemap already contains matching destinations.

## Validation
- Added sections use the existing `ArticleSection` enhancement mechanism; the build merges them into current article routes, so canonical URLs and sitemap entries remain unchanged.
- Verified each new internal-link target is present in `src/data/graph.ts`.
- A production build was not run during this ZIP-editing pass. Run `npm ci` followed by `npm run build` and the project's content/SEO validators before deploying.

## Measurement plan
After deployment and recrawl, compare query and page performance over a comparable 28-day period. Prioritize impressions, clicks, CTR, average position, and whether each query is assigned to the intended existing URL. Do not judge success from one or two impressions.
