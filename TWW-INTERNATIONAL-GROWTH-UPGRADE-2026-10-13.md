# Tech World Window — International Growth Upgrade

**Date:** 13 October 2026  
**Source:** `tech-world-window-main(5).zip` and Search Console export dated 13 October 2026  
**Upgrade type:** Focused technical SEO, evidence-led content enrichment, and local tool UX

## What changed

### 1. Canonical hostname consistency

- Set `SITE_URL` to `https://www.techworldwindow.com`, matching the live redirect from the apex hostname to `www` observed during review.
- Updated generated sitemap, robots sitemap reference, and RSS feed URLs to the preferred host.
- Updated the launch checklist to verify the permanent apex-to-www redirect and submit the preferred-host sitemap.
- Added build validation that rejects an unexpected preferred hostname and checks RSS uses the canonical site URL.

**Deployment follow-through:** keep the existing apex-to-www redirect in Vercel/domain configuration. After deployment, inspect the final HTML canonical on the homepage and two articles, `robots.txt`, `sitemap.xml`, and RSS feed. The local source update cannot itself change Vercel domain settings.

### 2. Updated high-opportunity troubleshooting pages

Enriched the existing articles without changing their URLs or adding thin pages:

- `/nvme-ssd-temperature-too-high`: added a repeatable thermal/throttling check, a symptom interpretation table, safer response to drive errors, links to SSD health/research guides, and a focused FAQ.
- `/pc-game-stuttering-fix-frame-time`: added a controlled five-step capture protocol, a pattern-to-cause table, and contextual links to the analyzer and companion research.
- `/gpu-frame-time-spikes-causes-fix`: added a controlled GPU workload test and an interpretation table to avoid diagnosing from utilization alone.
- `/shader-compilation-stutter-pc-games`: added guidance against indiscriminate shader-cache clearing and a repeat-run interpretation table.
- `/windows-11-dns-not-working-how-to-fix`: added clearer distinctions between resolver timeouts, NXDOMAIN, successful lookups, and HTTPS failures.

Search titles and descriptions were tuned for clarity and query fit while retaining existing URLs and the current content architecture. Updated articles use `2026-10-13` modification dates.

### 3. Frame-Time Analyzer UX

- Added **Download report (.txt)** after analysis.
- The report includes the capture summary, target refresh rate, source column, input row count, findings, warnings, and up to five slowest detected stutter events.
- Updated the tool's page intro, hub summary, metadata, and FAQ to describe report export.
- Clarified that analysis, copying, and report generation happen locally in the browser. The export does not upload capture data.
- Updated the report's displayed site URL to the preferred `www` hostname.

### 4. Better regression checks

- The build validator now enforces the chosen preferred hostname.
- It also checks that the RSS channel URL follows `SITE_URL` and that article feed URLs do not point to the apex host.
- Existing graph-driven route, sitemap, robots, metadata, prerender, and content validation remains in place.

## Search Console snapshot and prioritization

The supplied export shows **74 impressions and 1 click** in the daily chart for the selected range, with early country-level impressions spread across multiple markets. It is not yet enough data to infer a stable ranking trend or choose a language strategy.

Pages worth monitoring after this update:

| Page | Impressions | Average position | Next measurement |
|---|---:|---:|---|
| `/nvme-ssd-temperature-too-high` | 20 | 8.35 | Impressions, CTR, queries, and engagement after recrawl |
| `/pc-game-stuttering-fix-frame-time` | 20 | 15.10 | Query coverage and movement into more visible results |
| `/shader-compilation-stutter-pc-games` | 7 | 8.43 | First-use stutter queries and internal tool clicks |
| `/tools/frame-time-analyzer` | 4 | 2.50 | Tool completion, report-download events, and query CTR |
| `/windows-11-dns-not-working-how-to-fix` | 3 | 2.67 | Query impressions and whether visitors continue to broader diagnostics |
| `/gpu-frame-time-spikes-causes-fix` | 3 | 5.33 | Links from the stutter guide and analyzer engagement |

These numbers are small samples. This work improves usefulness and technical consistency; it does not guarantee rankings, indexing, or traffic volume.

## Files modified

- `src/data/graph.ts`
- `src/data/content-enhancements.ts`
- `src/pages/FrameTimeAnalyzerPage.tsx`
- `src/data/tools.ts`
- `src/lib/frameTime.ts`
- `scripts/validate-build.ts`
- `public/sitemap.xml` (generated output aligned with preferred hostname)
- `public/robots.txt` (generated sitemap reference aligned with preferred hostname)
- `public/feed.xml` (generated RSS URLs aligned with preferred hostname)
- `TWW-LAUNCH-SEO-CHECKLIST.md`
- `TWW-INTERNATIONAL-GROWTH-UPGRADE-2026-10-13.md` (this change report)

## Verification status

- [x] Confirmed the public apex hostname redirects to `www` during the review.
- [x] TypeScript/TSX syntax-transpilation checks passed for the six modified source files.
- [x] Content-integrity audit passed for 40 articles, 95 graph routes, and 73 source references.
- [x] Sample analyzer smoke test passed with 5,720 generated frames and a valid analysis summary.
- [x] Pre-build SEO/route validator found no content, metadata, hostname, sitemap, robots, or RSS errors; its only failure was the missing `dist/` production output.
- [x] Updated canonical source configuration and the generated public sitemap/robots/RSS hostnames.
- [x] Confirmed sitemap has 95 URLs in the supplied repository snapshot.
- [x] Added direct regression checks for preferred hostname and RSS host consistency.
- [ ] Full production build/typecheck/prerender has **not** been completed in this sandbox. The uploaded project contains no installed dependencies, and `npm ci --offline` failed because `react-dom` package metadata was not available in the local npm cache. Run `npm ci` and `npm run build` in the connected CI/Vercel environment before deploying.
- [ ] After deployment, inspect the deployed canonical tags, check the full sitemap in Search Console, and monitor affected pages over the following weeks.

## Recommended deployment sequence

1. Commit and deploy this ZIP's source changes.
2. Ensure Vercel continues permanently redirecting `https://techworldwindow.com/*` to `https://www.techworldwindow.com/*`.
3. Confirm homepage and representative article HTML canonicals all use `www`.
4. Confirm the sitemap has 95 current graph URLs and all use `www`; robots.txt points to the www sitemap.
5. Submit `https://www.techworldwindow.com/sitemap.xml` in the existing Search Console **Domain property** for `techworldwindow.com`.
6. Test analyzer file upload, sample, copy, and report download on desktop and mobile. Verify the report remains local and download events appear in GA4 without sending capture contents.
