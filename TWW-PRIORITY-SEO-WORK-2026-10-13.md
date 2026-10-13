# TWW Priority SEO Work — 2026-10-13

## Source changes in this ZIP

- `src/data/articles.ts` — expanded the NVMe temperature diagnosis with pattern-based interpretation, safe next steps, and links to SSD health, SSD slowdown, and game-stutter guidance.
- `src/data/articles.ts` — strengthened the shader-compilation cluster with links to the Frame-Time Analyzer, the central game-stutter guide, and SSD slowdown troubleshooting.
- `src/data/articles.ts` — added Frame-Time Analyzer and pillar links to the GPU frame-time guide.

## Existing work confirmed in the supplied source

- The central `/pc-game-stuttering-fix-frame-time` article already links to GPU frame-time spikes, shader compilation, SSD slowdown, SSD health, and NVMe temperature.
- The Frame-Time Analyzer already includes a CSV/paste workflow, sample data, findings, a chart, report download, privacy copy, and related guide links. It tracks `tool_used` and `tool_completed` events through the existing analytics helper.
- The Windows troubleshooting pillar already links to DNS/network reset and several broader troubleshooting topics.
- `public/robots.txt` references `https://www.techworldwindow.com/sitemap.xml`.

## Not certified by this source-only update

A successful build, deployed HTML, live apex-to-www redirect, canonical tags across production routes, sitemap freshness after build, mobile interaction testing, Search Console URL inspection/index status, and live analytics event receipt still require running the project and checking the deployed site. Do not treat this ZIP as deployed or as proof of ranking/CTR improvement.

## Validation

Run from the project root with Node 22: `npm ci`, then `npm run build`, then `npm run audit:links`. Resolve failures before deploying. After deployment, verify the affected URLs and canonical hostname, then compare Search Console data over a consistent period.
