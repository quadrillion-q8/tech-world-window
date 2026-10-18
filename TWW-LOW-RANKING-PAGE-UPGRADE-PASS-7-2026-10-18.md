# Search Console Low-Ranking Page Upgrade — Pass 7

Date: 2026-10-18  
Repository: `quadrillion-q8/tech-world-window`  
Source: `techworldwindow.com-Performance-on-Search-2026-10-18.zip`, Web search, Last 28 days. The report exposes separate page and query tables, so exact query-to-page attribution is not assumed unless the URL is directly established. Samples are small; these rows identify improvement candidates, not stable demand estimates.

## Pages selected

| Existing URL | Export evidence | Improvements made |
|---|---|---|
| `/gpu-frame-time-spikes-causes-fix` | 14 impressions, 0 clicks, average position 10.93. Query variants include “frame time spikes” (2 impressions, position 7.50) and “frametime spikes” (2 impressions, position 18.50). | Expanded the existing diagnostic into a controlled-capture workflow with a pattern interpretation table, evidence to record around a hitch, safe testing order and three FAQs. Clarifies that a spike is not proof of faulty GPU hardware. |
| `/windows-11-high-memory-usage-how-to-find-the-cause` | 8 impressions, 0 clicks, average position 8.38. Low-volume queries include “desktop window manager high memory” and “search using ram windows 11”. | Added a DWM-specific section, process/memory-pressure checks, an interpretation table, safe guidance and two FAQs. Updated the meta description to better reflect DWM/SearchHost and the distinction between caching and real pressure. |
| `/ddr4-vs-ddr5-ram-difference` | 5 impressions, 0 clicks, average position 17.60. The query “whats the difference in ddr4 and ddr5” appeared once at position 51. | Added an illustrative CAS-latency calculation and comparison table so readers can compare CL values more carefully; added FAQs and refined the description around compatibility, data rate, CAS latency and platform cost. Example timings are explicitly illustrative and not a whole-system benchmark. |

## Files changed

- `src/data/content-enhancements.ts`
  - Expanded the GPU frame-time spike page with an evidence-led test workflow, troubleshooting table and FAQs.
  - Expanded the high-memory page for Desktop Window Manager and memory-pressure intent, with additional safe diagnostic steps, a signal table and FAQs.
  - Added CAS-latency comparison guidance and FAQs to the existing DDR4/DDR5 page; refined the high-memory and DDR search descriptions.
- `TWW-LOW-RANKING-PAGE-UPGRADE-PASS-7-2026-10-18.md`
  - Records Search Console evidence, scope and final validation status.

## What remains unchanged

- No new URLs, routes, redirects, canonicals, sitemap entries, analytics configuration or dependencies.
- Existing GPU/PSU, RAM calculator, BSOD, SSD health, disk usage and general stutter upgrades were not repeated.
- No performance benchmark results or ranking gains are claimed. The example DDR timing math explains only the CAS component; full system latency and workload performance depend on more variables.

## Validation

The PR must pass the repository's build, prerender, content and route validators, plus the Vercel preview check. After merge and recrawl, assess another comparable Search Console period before deciding whether to revise snippets again.
