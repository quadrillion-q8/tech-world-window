# Search Console Low-Ranking Page Upgrade — Pass 8

Date: 2026-10-18  
Repository: `quadrillion-q8/tech-world-window`  
Source: `techworldwindow.com-Performance-on-Search-2026-10-18.zip`, Web search, Last 28 days.

The export's Pages.csv and Queries.csv are separate tables. The metrics below are attributed to the listed URLs as shown in Pages.csv; no claim is made that a particular query generated the impressions on a particular URL. These pages have small samples, so the figures are prioritization signals rather than stable demand estimates.

## Pages selected

| Existing URL | Search Console evidence | Upgrades |
|---|---|---|
| `/why-ssd-is-slowing-down-windows` | 4 impressions, 0 clicks, average position 43.25 | Expanded the diagnostic with a pattern table, a safe test sequence, write-cache interpretation, a backup-first warning for drives with errors, related SSD diagnostic links and three targeted FAQs. Added a more directly relevant search description. |
| `/pc-game-low-fps-how-to-find-the-cause` | 4 impressions, 0 clicks, average position 29.25 | Added a decision table to distinguish consistently low FPS from sudden frame-time drops, explained frame caps/V-Sync and controlled comparison steps, added related diagnostic links and three FAQs. Refined the search description while keeping the route and article title. |
| `/tools/storage-calculator` | 3 impressions, 0 clicks, average position 30.67 | Updated the tool's heading and metadata to make SSD/HDD capacity planning explicit. Added a substantial explanation of the calculator math, 20% planning allowance, 100 GB rounding, decimal TB display, usable-capacity limitations, advice for more realistic inputs and FAQs. Corrected the generic estimate disclaimer so each tool describes its own limitations. |

## Files changed

- `src/data/content-enhancements.ts`
  - Added SSD slowdown diagnostic steps, symptom table, data-protection guidance, FAQs and a search description.
  - Added low-FPS pattern interpretation, a controlled test sequence, FAQs and a search description.
- `src/data/tools.ts`
  - Updated the Storage Calculator's tools-hub title, description and menu copy.
- `src/pages/ToolPage.tsx`
  - Updated the Storage Calculator heading and SEO description.
  - Added explanatory capacity-planning content and FAQs.
  - Replaced one generic disclaimer used for all tools with per-tool caveats, including clearer storage-estimate limits.
- `TWW-LOW-RANKING-PAGE-UPGRADE-PASS-8-2026-10-18.md`
  - Records the evidence, scope and validation/deployment status.

## Guardrails

- No new URLs, redirects, canonical changes, sitemap edits, analytics changes or dependencies.
- No fabricated benchmarks or ranking promises.
- The storage calculator's input/output behavior is unchanged. Its existing formula sums estimated game storage and other files, adds 20% headroom, rounds up in 100 GB increments, and displays decimal TB; the new copy documents that behavior.

## Final validation status

- The first Pass 8 CI run (`39089582819`) failed during prerender because a low-FPS SEO metadata object was placed in the article-enhancement map. This was a source issue, not a Vercel issue.
- The placement error was corrected in [PR #59](https://github.com/quadrillion-q8/tech-world-window/pull/59). GitHub Actions `build-and-validate` passed on the corrected code in [run 39089668107](https://github.com/quadrillion-q8/tech-world-window/actions/runs/39089668107).
- Vercel's PR check returned `build-rate-limit`. Successful Vercel preview/production deployment is therefore **not confirmed** by this pass; source build validation and deployment status are separate.
- No live rendered-HTML verification or ranking improvement is claimed.

After Google recrawls the updates, assess a comparable Search Console window before deciding whether these page improvements led to better visibility or clicks.

After Google recrawls the updates, assess a comparable Search Console window before deciding whether these page improvements led to better visibility or clicks.
