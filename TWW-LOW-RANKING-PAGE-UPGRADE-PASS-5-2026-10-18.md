# Search Performance-Based Low-Ranking Page Upgrade — Pass 5

Date: 2026-10-18  
Repository: `quadrillion-q8/tech-world-window`  
Evidence: user-provided Google Search Console export marked “Last 28 days”. The latest daily row in the included chart is 2026-10-15. Samples are still small and rankings can fluctuate; this report is a prioritization snapshot, not a forecast.

## Why these pages were selected

| Existing page or query | Export evidence | Action in this pass |
|---|---|---|
| `/tools/pc-bottleneck-calculator` | Apex URL: 22 impressions, 0 clicks, average position 70.86. Query “bottleneck calculator”: 5 impressions at position 70.80; “bottleneck checker”: 4 at position 74.00. The www row also has 2 impressions, so host-specific measurements are not simply merged. | Tightened the title and description around CPU-vs-GPU estimates at 1080p/1440p/4K; strengthened the on-page explanation and FAQs about the tool’s limits and validating with FPS/frame-time data. |
| `/tools/bsod-error-code-lookup/kernel-security-check-failure` | 18 impressions, 0 clicks, average position 60.17. Query “kernel security check failure”: 8 impressions at position 73.38; the underscore variant also appeared. | Added stop-code-specific metadata using the familiar `0x139` form alongside `0x00000139`, with driver, RAM-setting and low-level-software guidance. The article’s existing safe diagnostic sequence remains intact. |
| `/how-to-check-ssd-health-windows` | Apex row: 5 impressions, 0 clicks, average position 61.40; the www row adds one impression at position 7.00. The data is too sparse for a stable aggregate. | Added a practical SSD-health workflow, supported PowerShell reliability-counter example, an interpretation table, safety guidance, source links, related internal links and FAQs. Added a clearer search title/description. |
| `/windows-11-slow-startup-fix` | Apex row: 8 impressions at position 36.38; www row: 5 impressions at position 8.80. | Sharpened title/description to match the query while explaining that the delay may occur before Windows, at sign-in, or after the desktop loads. Existing route is unchanged. |
| `/nvme-ssd-temperature-too-high` | Apex row: 46 impressions at position 10.98, 0 clicks; www row: 4 impressions at position 8.25, 0 clicks. | Reframed title/description around “what is normal” and model/sensor differences, to set a clearer expectation before a click. Existing technical content remains intact. |

## Files changed

- `src/pages/ToolPage.tsx`
  - Updated the PC bottleneck calculator page title and concise intro/SEO description.
  - Added two user-facing FAQs: what the broad-tier tool compares and how to validate a possible limit before buying parts.
- `src/data/tools.ts`
  - Synchronized bottleneck tool metadata and FAQ content used by the tool catalogue and structured metadata.
  - Added a tailored SEO title/description for the KERNEL_SECURITY_CHECK_FAILURE code page.
- `src/data/content-enhancements.ts`
  - Enriched the SSD health article with evidence-led checks, safe backup guidance, a PowerShell example, interpretation table, FAQs, source links and contextual links.
  - Updated snippet metadata for SSD health, Windows 11 slow startup and NVMe temperature.
- `TWW-LOW-RANKING-PAGE-UPGRADE-PASS-5-2026-10-18.md`
  - Added this evidence and change report.

## What was intentionally not changed

- No new article URLs or near-duplicate pages were created.
- No route graph, canonical URL, redirect, sitemap, dependency, or analytics changes were made.
- The GPU-usage article was not rewritten again because the repository already records a fresh update dated 2026-10-18; much of this export predates it.
- The PSU symptoms article was not rewritten again because the repository already records an update dated 2026-10-16; the exported search data is not yet sufficient to judge that update.
- The frame-time stutter article already has a controlled diagnostic workflow and query-oriented metadata from an earlier pass, so it was left unchanged rather than adding repetitive sections.

## Important interpretation note

The export contains apex and www rows for several same-path URLs with very different average positions. This can split the reporting signal. The repository’s prior audit documents the intended www canonical setup; this pass deliberately does not change production redirect/canonical configuration without a fresh live verification of final URLs and rendered canonical tags.

## Validation and next measurement

- The first CI run built and prerendered 127 indexable routes, then failed the content metadata validator because the RAM Calculator meta description was 188 characters (the repository limit is 160).
- A follow-up correction shortened that description to 145 characters. The post-correction GitHub Actions “Build and validate” run passed on main commit `f2073b8f48fb897bc1fc89b768181b5d171d2611`; the Vercel check for that commit is also successful.
- This is a source/build verification result, not proof of ranking gains. The connected Vercel/browser integration denied direct inspection of the live HTML on the target URLs, so this report does not claim an independent rendered-page spot-check.

After Google has recrawled the pages and enough reporting data accumulates, compare clicks, impressions, CTR and queries together; do not judge success from a single daily position.
