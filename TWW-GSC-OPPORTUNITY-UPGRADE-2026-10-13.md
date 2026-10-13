# TWW Search Console Opportunity Upgrade — 2026-10-13

## Basis
Reviewed the supplied Search Console export dated 2026-10-13. The export shows early, low-volume visibility:
- `/nvme-ssd-temperature-too-high`: 20 impressions, average position 8.35
- `/pc-game-stuttering-fix-frame-time`: 20 impressions, average position 15.1
- `/shader-compilation-stutter-pc-games`: 7 impressions, average position 8.43
- `/windows-11-dns-not-working-how-to-fix`: 3 impressions, average position 2.67
- `/windows`: 1 impression, average position 3.0

These are small samples, so they identify test candidates rather than proving that any page has a persistent CTR problem.

## Changed
- `src/data/articles.ts`
  - Added more query-aligned SEO titles and meta descriptions to the PC game stuttering, shader compilation stutter, Windows 11 DNS, and SSD slowdown articles.
  - Refined the NVMe temperature article title and description to foreground temperature, safe interpretation, throttling signs and cooling.
- `TWW-GSC-OPPORTUNITY-UPGRADE-2026-10-13.md` (this report)

## Why these changes
- Use language that matches visible query themes without keyword stuffing or promising guaranteed fixes.
- Make snippets more specific about what the reader will learn.
- Preserve existing slugs and page structure to avoid unnecessary URL changes.

## Validation and measurement
Run `npm ci` and `npm run build` before deployment. After deploying, compare the same pages' impressions, clicks, CTR, average position, and actual queries over a comparable 28-day window. Do not judge CTR from one to seven impressions alone.
