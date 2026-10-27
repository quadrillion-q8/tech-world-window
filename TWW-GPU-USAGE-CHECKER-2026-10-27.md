# TWW GPU Usage Checker + GPU Article Title Pass — 2026-10-27

Source: Search Console export (28 days to 2026-10-27). The "GPU at 100% while gaming" cluster had ~50 queries and ~316 impressions, with about 15 queries already at positions 8-9 and 0 clicks; "gpu at -1%" ranked at position ~4.1 with 38 impressions and no click.

## Changed
- New tool `/tools/gpu-usage-checker` (`src/pages/GpuUsageCheckerPage.tsx`, `src/lib/gpuUsage.ts`, `src/styles/gpu-usage-checker.css`): rules-based, browser-only triage for 100% / low / -1% GPU readings. No universal temperature limit is applied; temperature is compared only with a maximum the reader supplies.
- Registered in `src/data/tools.ts` (with FAQ) and `src/routes.tsx`; added to `public/sitemap.xml`.
- Tool callouts added for `gpu-100-percent-usage-gaming`, `pc-game-low-fps-how-to-find-the-cause` and `gpu-overheating-gaming-pc-causes-fix` via `articleToolLinks`.
- `gpu-100-percent-usage-gaming`: answer-first `seoTitle` / `metaDescription`, plus a dedicated "What does GPU at -1% mean?" section linking to the checker.

## Validation performed
- `gpuUsage.ts` strict-typechecked with TypeScript and exercised with 15 scenario cases plus input-validation and duplicate-key checks (all pass).
- Syntax check (transpile) of the page, tools registry, content enhancements and routes.
- Title/meta lengths within validator limits (tool title 44, meta 144; article title 50, meta 152).

## Not validated
- `npm ci` could not reach the registry in the authoring environment, so `npm run build` (typecheck, prerender, `validate`, link audit) has **not** been run. Run it, or let CI/Vercel preview do so, before merging.
- No ranking or click improvement is claimed. Re-check Search Console on a settled window after recrawl.
