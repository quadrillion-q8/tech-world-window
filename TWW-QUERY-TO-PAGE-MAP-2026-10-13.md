# TWW Search Console Query-to-Page Map — 2026-10-13

## What the export supports
Source: `techworldwindow.com-Performance-on-Search-2026-10-13.zip`, Search type Web, last 28 days.
This is an early sample: 74 chart impressions and one click across the listed dates; only 14 query rows are exposed. Treat every one-impression query as a clue, not as evidence of stable demand or a persistent CTR issue.

## Query-to-page mapping

| Observed query | Impressions | Avg. position | Best matching URL | Recommended action |
|---|---:|---:|---|---|
| `frame-time analysis ...` | 3 | 1.0 | `/tools/frame-time-analyzer` | Keep the tool as the primary answer. Ensure the title and intro immediately explain what the analyzer measures and how to use it. Link to `/pc-game-stuttering-fix-frame-time` for interpretation. |
| `tech window` | 2 | 9.5 | `/` (brand intent) | No article needed. Strengthen consistent site-name/brand signals and homepage title only if it accurately represents the brand. |
| `dns issues windows 11` | 1 | 2.0 | `/windows-11-dns-not-working-how-to-fix` | Keep the DNS guide as the target; make sure the opening diagnostic explains how to distinguish DNS failure from total connection failure. |
| `shader compilation stutter` | 1 | 6.0 | `/shader-compilation-stutter-pc-games` | Target the phrase naturally in the H1/intro and clearly distinguish first-run shader stutter from persistent stutter. |
| `stuttering` | 1 | 18.0 | `/pc-game-stuttering-fix-frame-time` or `/gpu-frame-time-spikes-causes-fix` | Broad intent; do not create a new page. Use the general stutter guide as the hub and link to the GPU-specific diagnosis. |
| `reset network adapter windows 11 cmd` | 1 | 29.0 | `/windows-11-network-adapter-reset-guide` | Match the command-focused intent with a safe, copyable command section, explain effects and VPN/network implications, and link from the DNS guide. |
| `pc stuttering` | 1 | 38.0 | `/pc-game-stuttering-fix-frame-time` | Reinforce diagnostic steps and links to frame-time, GPU, shader and storage causes. |
| `stop code page_fault_in_nonpaged_area 0x50` | 1 | 42.0 | `/tools/bsod-error-code-lookup/page-fault-in-nonpaged-area` | Ensure the tool result gives a useful first diagnostic path and links to the broader Windows stop-code guide. |
| `game stuttering` | 1 | 49.0 | `/pc-game-stuttering-fix-frame-time` | Keep one main page for broad gaming stutter intent; use related articles for specific causes. |
| `ssd slowing down` | 1 | 53.0 | `/why-ssd-is-slowing-down-windows` | Match the phrase in natural copy and explain free space, background activity, temperature and drive health. |
| `is network reset safe windows 11` | 1 | 47.0 | `/windows-11-network-adapter-reset-guide` | Add/retain a direct safety answer near the top and a concise explanation of what settings may need reconfiguration. |
| `ssd performance issue windows os` | 1 | 67.0 | `/why-ssd-is-slowing-down-windows` | Use as a secondary topic, not an exact-match title. Add a clear diagnostic flow and link to SSD health and temperature guides. |

## Page performance triage

### Priority A — meaningful visibility with room to grow
1. `/nvme-ssd-temperature-too-high` — 20 impressions, average position 8.35.
2. `/pc-game-stuttering-fix-frame-time` — 20 impressions, average position 15.1.
3. `/shader-compilation-stutter-pc-games` — 7 impressions, average position 8.43.

Keep the updated, query-aligned SEO titles and descriptions. Once Google has recrawled the changes, evaluate the next comparable 28-day window. Avoid changing titles repeatedly during the observation period.

### Priority B — confirm tool-to-guide handoffs
- `/tools/frame-time-analyzer` — 4 impressions, average position 2.5.
- `/tools/bsod-error-code-lookup/page-fault-in-nonpaged-area` — 1 impression, average position 42.

For the frame-time tool, the main conversion is successful tool use followed by a relevant explanation—not a sales CTA. For the BSOD lookup, ensure the result is actionable and links to a fuller guide.

### Priority C — don't overreact to tiny samples
- `/windows` — 1 impression, average position 3.
- `/windows-11-dns-not-working-how-to-fix` — 3 impressions, average position 2.67.
- `/windows-11-network-adapter-reset-guide` — 2 impressions, average position 38.

These counts are too small to conclude the pages have a CTR problem. Keep the pillar helpful, but don't rewrite it based on a single impression.

## Recommended internal-link paths
- `/windows` → DNS guide → network adapter reset guide.
- `/pc-game-stuttering-fix-frame-time` → GPU frame-time guide → shader compilation guide.
- Gaming stutter guide → NVMe temperature guide and SSD slowdown guide only where storage symptoms are discussed.
- Frame-time analyzer tool → PC game stuttering guide.
- BSOD lookup result → Windows stop-code guide and RAM diagnostic guide where relevant.

Use visible, descriptive anchor text and link only when it helps the reader. Verify all paths against the current route graph before deployment.

## Measurement plan
1. Save this export as the baseline.
2. After the updated metadata is deployed and recrawled, compare the same URLs and query families over a comparable 28-day period.
3. Track impressions, clicks, CTR and average position by page and query.
4. Review actual query-to-page alignment; if Google surfaces the wrong page consistently, adjust internal links and the opening sections before considering URL changes.
5. Do not change URLs or create near-duplicate articles based on these low-volume rows.

## Files in this upgrade
- `src/data/articles.ts` — metadata changes made in the preceding GSC opportunity pass.
- `TWW-GSC-OPPORTUNITY-UPGRADE-2026-10-13.md` — prior metadata implementation report.
- `TWW-QUERY-TO-PAGE-MAP-2026-10-13.md` — this data-led mapping and action plan.

## Validation
The ZIP archive is checked for integrity. Run `npm ci` and `npm run build` locally before deployment; a successful production build has not been certified in this environment.
