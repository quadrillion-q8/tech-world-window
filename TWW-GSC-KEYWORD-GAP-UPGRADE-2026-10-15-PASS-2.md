# TWW GSC Keyword-Gap Upgrade — Pass 2

Date: 2026-10-15

## Scope

Implemented focused improvements to existing destinations based on the 15 October Search Console query review. No new article URLs were created and `public/sitemap.xml` was intentionally left unchanged.

## Files changed

- `src/data/content-enhancements.ts`
  - Added a Windows Search / SearchHost.exe / indexing diagnostic section to the existing Windows 11 high-memory guide.
  - Added a concise FAQ and contextual links to the RAM calculator and existing RAM research page.
- `src/pages/ToolPage.tsx`
  - Extended the existing RAM calculator with memory data-rate, CAS-latency, and channel inputs.
  - Calculates estimated CAS latency in nanoseconds and theoretical peak bandwidth, with clear limitations and compatibility caveats.
  - Updated the tool's title/description for the expanded capability.
- `src/data/tools.ts`
  - Updated RAM calculator card metadata to describe capacity and speed/latency comparisons.

## Existing work retained from the supplied prior upgrade ZIP

- GPU utilization explanation on `/gpu-100-percent-usage-gaming`.
- More-RAM-versus-faster-RAM comparison on `/research/does-more-ram-make-windows-faster`.
- Windows 10 game-stutter troubleshooting section on the existing stutter page.

## Intentional non-changes

- No new URL or sitemap entry.
- No separate PSU symptom page while the existing page is being evaluated.
- No Portuguese calculator page based on one impression.
- No dedicated page for the ambiguous `gpu at -1%` query.

## Validation status

The source changes were reviewed for intended route references and the sitemap was preserved unchanged. A production build and runtime/browser verification have not been completed in this environment; run `npm ci` and `npm run build` before deployment. Do not treat this ZIP as build-verified until those checks pass.
