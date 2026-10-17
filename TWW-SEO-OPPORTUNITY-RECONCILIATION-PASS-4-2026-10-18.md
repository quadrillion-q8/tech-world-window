# TWW SEO Opportunity & Canonical Reconciliation — Pass 4

Audit date: 2026-10-18  
Search Console window: 2026-09-17 to 2026-10-14 (latest settled window returned). Google Analytics was intentionally excluded.

## Summary

Search Console returned 7 clicks from 358 impressions (about 1.96% CTR; average position about 22). The sample is small, so query-level observations below are directional, not proof of demand.

The first priority is to reconcile canonical and sitemap signals before adding more URLs. The repository declares `SITE_URL = 'https://www.techworldwindow.com'` in `src/data/graph.ts`, generates sitemap locations from indexable graph routes, and has an apex-to-www permanent redirect in `vercel.json`. Yet Google URL Inspection has recorded host-specific self-canonicals for both apex and www versions of the homepage and GPU article. Those inspections were crawled on different dates, so verify current live responses before changing production config.

## Search Console opportunities

| Existing page | Clicks | Impressions | Avg position | Recommended action |
|---|---:|---:|---:|---|
| /gpu-100-percent-usage-gaming | 1 | 86 | 19.56 | Improve direct answer and internal links; query variants include “gpu at 100 while gaming” and “gpu at -1%” |
| /nvme-ssd-temperature-too-high | 0 | 44 | 10.98 | Review snippet/intent match and link to SSD health and thermal research |
| /pc-game-stuttering-fix-frame-time | 0 | 34 | 17.65 | Clarify general stutter intent and link into diagnostic cluster |
| /pc-power-supply-problems-symptoms | 0 | 19 | 42.00 | Improve existing diagnosis content before considering new pages |
| /tools/bsod-error-code-lookup/page-fault-in-nonpaged-area | 1 | 17 | 27.71 | Improve safe diagnosis path and links to relevant hardware guides |
| /shader-compilation-stutter-pc-games | 0 | 15 | 8.13 | Review title/snippet and reinforce distinct shader-specific intent |
| /gpu-frame-time-spikes-causes-fix | 0 | 12 | 11.42 | Add contextual internal links from stutter articles and research |
| /windows-11-disk-100-percent-usage | 0 | 11 | 26.18 | Improve diagnosis and link to SSD health / slow SSD pages |
| /windows-11-high-memory-usage-how-to-find-the-cause | 0 | 8 | 8.38 | Answer “find the cause” quickly and link to relevant next steps |
| /windows-11-dns-not-working-how-to-fix | 0 | 5 | 3.60 | Preserve; monitor before rewriting because sample is tiny |
| /tools/frame-time-analyzer | 0 | 5 | 3.80 | Link from relevant articles and explain when the tool is useful |

Observed query details: “gpu at 100 when gaming” (4 impressions, position 8.5), “gpu at 100 while gaming” (4, position 7.75), “is it normal for gpu to be at 100 while gaming” (4, position 8), “gpu at -1%” (6, position 2.67), “frame time spikes” (1, position 8), and “shader compilation stutter” (1, position 6). These are low-impression observations, not keyword volume estimates. Answer them on the existing pages; do not create one page per wording.

PSU symptom query variants are appearing around positions 49–64, and the PSU page has 19 impressions at position 42. Strengthen the existing page rather than generating near-duplicate symptom pages. BSOD code pages should prioritize safe troubleshooting and evidence-based distinctions, not mass generation of thin URLs.

## International and device signals

- United States: 117 impressions, 0 clicks, average position about 35.0.
- India: 22 impressions, 1 click, average position about 17.9.
- United Kingdom: 14 impressions, 1 click, average position about 20.2.
- Kuwait: 5 impressions, 3 clicks, average position about 6.2.
- Desktop: 283 impressions, 5 clicks, average position about 24.8.
- Mobile: 74 impressions, 2 clicks, average position about 11.4.

Samples are small; do not infer stable market preferences or create localized URL variants from this snapshot. Keep international English content and review trends over a longer window.

## Canonical and sitemap reconciliation

### Repository evidence
- `src/data/graph.ts` declares the www hostname as `SITE_URL`.
- `scripts/generate-sitemap.ts` creates URLs from indexable `routeGraph` routes using that site URL.
- `public/robots.txt` declares the www sitemap.
- `vercel.json` configures a permanent redirect from apex to www.

### URL Inspection evidence
| URL | Verdict | Google-selected canonical | Last crawl |
|---|---|---|---|
| https://techworldwindow.com/ | PASS, submitted and indexed | https://techworldwindow.com/ | 2026-10-06 |
| https://www.techworldwindow.com/ | PASS, submitted and indexed | https://www.techworldwindow.com/ | 2026-10-15 |
| https://techworldwindow.com/gpu-100-percent-usage-gaming | PASS, submitted and indexed | Apex URL | 2026-10-12 |
| https://www.techworldwindow.com/gpu-100-percent-usage-gaming | PASS, submitted and indexed | www URL | 2026-10-15 |

These snapshots show host-specific canonical selection at the time of each crawl. This conflicts with the intended single-host setup but does not prove the current redirect is failing; crawl dates differ.

Search Console sitemap list:
- www sitemap: submitted/downloaded 2026-10-15, 0 warnings/errors, 102 submitted URLs, 0 indexed in the sitemap counters.
- apex sitemap: submitted 2026-10-13, downloaded 2026-10-17, 0 warnings/errors, 114 web URLs plus 11 image URLs, 0 indexed in sitemap counters.

The sitemap counters conflict with URL Inspection showing indexed pages. Do not interpret the sitemap's “0 indexed” count as proof that the entire site has no indexed pages.

### Verify before changing production
1. Request apex homepage, article and sitemap over HTTPS; record status and final URL after redirects.
2. Confirm corresponding www URLs return 200 and do not redirect away from www.
3. Inspect final HTML: one absolute canonical per page, always on www.
4. Confirm generated sitemap contains only absolute www URLs for indexable graph routes.
5. Confirm sitemap URLs return 200 and have matching self-canonicals.
6. Re-submit the canonical sitemap only after confirming the old apex sitemap behavior; remove the old submission only if it is proven redundant.
7. Re-run URL Inspection after any fix and allow Google to recrawl before evaluating consolidation.

## Ranked implementation plan

### P0 — Verify canonical and sitemap consistency
Test live redirects, rendered canonicals and sitemap contents. Fix only the layer that fails. Keep graph.ts as the route source of truth. Acceptance: apex redirects permanently to equivalent www URL; www pages return 200 and self-canonicalize; sitemap contains only www URLs; automated smoke checks cover these conditions.

### P1 — GPU and NVMe pages
Update existing pages `/gpu-100-percent-usage-gaming` and `/nvme-ssd-temperature-too-high`: direct answer near the top, intent-aligned title/description, safe first checks, contextual links. Acceptance: one title/description/canonical in production HTML, validation passes, compare GSC metrics after a mature 28-day period.

### P2 — Frame-time cluster
Connect `/pc-game-stuttering-fix-frame-time`, `/gpu-frame-time-spikes-causes-fix`, `/shader-compilation-stutter-pc-games`, `/tools/frame-time-analyzer` and `/research/what-actually-causes-pc-game-stuttering`. Preserve distinct intent: general stutter, GPU spikes, shader compilation, measurement tool, research. Acceptance: relevant contextual inbound links, no redundant page.

### P3 — Windows troubleshooting paths
Connect DNS, high-memory, 100%-disk, slow-SSD, SSD-health and slow-startup pages around clear diagnostic next steps. Do not duplicate generic slow-PC advice. Acceptance: links resolve and route graph, sitemap, SSG and validation remain consistent.

### P4 — BSOD lookup
Improve the lookup landing page and existing code pages with safe first response, code-specific troubleshooting and relevant links to RAM/storage/driver guides. Do not create thin pages for code variants.

### P5 — Validate new keyword demand
Use keyword metrics and live SERPs for GPU usage, NVMe temperature, stutter, Windows disk/memory, BSOD and PSU clusters. Every proposed new URL must document target query, intent gap, source/evidence plan, internal links and why an existing page cannot satisfy the intent.

## Architecture guardrails

- Preserve graph → sitemap/navigation → Vite SSG → validation.
- No bulk generation of near-duplicate articles.
- No invented keyword volumes, backlinks, test results or deployment claims.
- This audit documents evidence and priorities only; it does not claim a production fix or successful deployment.

## Repository references
- [Route graph](https://github.com/quadrillion-q8/tech-world-window/blob/main/src/data/graph.ts)
- [Sitemap generator](https://github.com/quadrillion-q8/tech-world-window/blob/main/scripts/generate-sitemap.ts)
- [robots.txt](https://github.com/quadrillion-q8/tech-world-window/blob/main/public/robots.txt)
- [Vercel redirects](https://github.com/quadrillion-q8/tech-world-window/blob/main/vercel.json)
- [SEO rendering](https://github.com/quadrillion-q8/tech-world-window/blob/main/src/seo/ssgSeo.ts)
- [Build validation](https://github.com/quadrillion-q8/tech-world-window/blob/main/scripts/validate-build.ts)
