# Hardware Pillar Upgrade — 2026-10-25

## Goal

Make `/hardware` a useful international entry point for PC component diagnosis, upgrade planning, compatibility research and product evaluation. The goal is to improve topic clarity, internal discovery and search-result relevance; rankings, impressions and CTR cannot be guaranteed by a code change alone.

## Changes in this pass

- Replaced the generic `Hardware` title with `PC Hardware Guides: CPUs, GPUs, RAM & SSDs` and wrote a focused description that names the core hardware families and the site's diagnostic/compatibility angle.
- Reworked the hub introduction and added two clear next actions: a PC bottleneck calculator and the RAM/SSD upgrade decision research page.
- Added an eight-path component map covering SSD health, NVMe temperature, RAM capacity, laptop upgrades, GPU thermals, CPU/GPU bottlenecks, PSU symptoms and SSD slowdowns.
- Added routes to the upgrade decision guide, product-profile hub and bottleneck tool, plus direct links to CPU, GPU, laptop and SSD profile pages and RAM/SSD/laptop buying guides.
- Added contextual links from 12 relevant existing component, gaming-hardware and buying-guide sections back to `/hardware`, including the RAM research page, to make the hub/cluster relationship reciprocal.
- Kept every existing public URL unchanged. No invented benchmarks, new product reviews, new dependencies, tracking changes or unsupported performance claims were added.

## Search Console prioritization

Connected Search Console data for the last 28 days shows a very small sample for `/hardware` (four impressions across two rows, zero clicks); this is not enough to draw a stable CTR or ranking conclusion.

Existing component pages show useful follow-up opportunities in the same window. The data pull returned multiple rows for some identical page paths, so these should be inspected with hostname/canonical context before combining rows into a definitive page-level baseline:

- `/nvme-ssd-temperature-too-high`: 67 impressions at average position 19.18 and another 17 at position 11; one click across the returned rows.
- `/pc-power-supply-problems-symptoms`: 79 impressions at position 51 and another 17 at position 44.82; zero clicks.
- `/how-to-check-ssd-health-windows`: 98 impressions at position 62.07 and another row with one impression at position 7; zero clicks in the returned rows.
- `/why-ssd-is-slowing-down-windows`: 20 impressions at position 49.9 and another row with one impression at position 56; zero clicks.
- `/ssd-nearly-full-windows-performance`: 26 impressions at average position 37.19.
- `/gpu-overheating-gaming-pc-causes-fix`: 14 impressions at average position 46.36.
- `/laptop-nvme-ssd-upgrade-compatibility`: 15 impressions at average position 39.87.

These page-level rows are diagnostic clues, not reliable estimates of search demand or promises of traffic. The low-volume hub needs stronger topical discovery, while the existing component pages need time and a cleaner, comparable baseline before further repeated title changes.

## Validation

- Confirm all curated URLs against the route graph/tool registry before merging.
- Run the repository's build, prerender and validation workflow.
- Check the Vercel deployment separately from GitHub Actions; do not label a code change as live unless the deployment is READY and the production source has been verified.
- After recrawl, compare Search Console clicks, impressions, CTR and average position by URL and query family over a comparable settled window. Inspect hostname/canonical variations before aggregating page rows.

## Next measurement focus

Prioritize the SSD temperature page for its closer-to-page-one query visibility, and the PSU/SSD-health pages for diagnosis of broad impressions with weak positions. Do not create additional hardware URLs until query-to-page data demonstrates a clear intent gap.
