# Search Console Low-Ranking Page Upgrade — Pass 6

Date: 2026-10-18  
Repository: `quadrillion-q8/tech-world-window`  
Source: `techworldwindow.com-Performance-on-Search-2026-10-18.zip`, Search type Web, Last 28 days. The exported page and query tables are separate, so query-to-page attribution is not asserted where it is unavailable. Apex and www rows are reported separately where their values differ.

## Next pages selected

| Existing URL | Export evidence | Changes made |
|---|---|---|
| `/windows-11-disk-100-percent-usage` | 13 impressions, 0 clicks, average position 23.77. Related query rows include “100 percent disk usage windows 11” and “windows 11 system using 100 disk”, each with one impression at positions 50 and 60. | Added a Resource Monitor diagnostic path, repeatable idle/load observations, an interpretation table, cautions against disabling services blindly, related storage links and FAQs. Improved the SEO title and description around 100% active time and finding the responsible process. |
| `/tools/bsod-error-code-lookup/page-fault-in-nonpaged-area` | 20 impressions, 1 click, 5% CTR, average position 25.25. Query variants include `page_fault_in_nonpaged_area (0x50)`, `0x50 page_fault_in_nonpaged_area`, and the plain stop-code name; individual query counts are very small. | Tailored the page title/description around 0x50 / 0x00000050; reordered troubleshooting so recent changes and likely drivers are reviewed before physical RAM handling; improved data-protection guidance and storage checks. The code remains a clue, not proof of a failed component. |
| `/research/what-actually-causes-pc-game-stuttering` | 11 impressions, 0 clicks, average position 30.55. | Improved the meta description to state the research page’s frame-time evidence focus and added a clear next-step section linking the research to the main stutter guide, analyzer, shader-specific page and GPU-spike guide. This keeps its research purpose distinct from step-by-step troubleshooting. |

## Files changed

- `src/data/content-enhancements.ts`
  - Adds the Resource Monitor / process tracing section, diagnostic table, safe checks, source and FAQs to the Windows 11 disk-usage guide.
  - Adds a “next test” handoff from frame-time research to the relevant existing guide/tool cluster.
  - Adds the corresponding search-snippet overrides.
- `src/data/tools.ts`
  - Adds page-specific BSOD metadata for PAGE_FAULT_IN_NONPAGED_AREA.
- `src/data/bsod.ts`
  - Clarifies the possible causes of bug check 0x50 and adjusts the diagnostic sequence to prioritize recent changes, memory testing and evidence-led storage checks.
- `TWW-LOW-RANKING-PAGE-UPGRADE-PASS-6-2026-10-18.md`
  - Records the evidence, scope and validation status for this pass.

## Pages intentionally left alone this pass

- GPU 100% usage, NVMe temperature, general PC stutter, PSU symptoms, calculator, SSD health and slow startup were changed in recent passes. Let the updated pages be recrawled before another round of edits.
- PC games crashing to desktop was already expanded in a recent merged pass and its current Search Console window mostly predates those changes; avoid rewriting it again before newer evidence arrives.
- The research disk page has only three impressions and currently averages position 8.00, so it is not a strong next rewrite candidate yet.

## Validation

No routes, canonical URLs, redirects, sitemap entries, dependencies, or analytics configuration are changed. Build, prerender, content validation, route validation and Vercel checks must pass on the final merged commit before this pass is called complete. Ranking gains are not claimed; compare a comparable Search Console window after recrawl.
