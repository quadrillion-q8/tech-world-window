# Phase 2F — Google index recovery baseline (2026-11-26)

Source: Google Search Console URL Inspection API via OpenSEO; 143 unique canonical URLs from main public/sitemap.xml. Inspection is historical, not a live Google crawl. Latest prior recovery commit: 2064042 (2026-11-24 22:31:42 UTC).

| Coverage | Count |
| --- | ---: |
| Submitted and indexed | 24 |
| Crawled - currently not indexed | 96 |
| URL is unknown to Google | 21 |
| Duplicate, Google chose different canonical than user | 2 |

All 122 crawled URLs reported successful fetch, robots allowed and indexing allowed. No recorded crawl was newer than the recovery commit. Two canonical disagreements: /testing (2026-10-30) and /pc-power-supply-problems-symptoms (2026-10-13); Google selected the corresponding non-www paths. Web probes observed redirection to www; exact HTTP status and production sitemap headers remain unverified in this session. Do not change URL ownership or redirect architecture without new evidence.

## Priority reassessment cohort
- /gpu-100-percent-usage-gaming (historical non-www: 274 impressions)
- /how-to-check-ssd-health-windows (www: 99 impressions)
- /nvme-ssd-temperature-too-high (non-www: 69 impressions)
- /gpu-frame-time-spikes-causes-fix (www: 45 impressions; non-www: 23)
- /tools/frame-time-analyzer (www: 29 impressions)
- /windows, /reviews, /hardware, /gaming, /guides, /research
- /testing and /pc-power-supply-problems-symptoms (historical canonical mismatch)

Performance window 2026-08-23 through 2026-11-23; page report totals 15 clicks and 2671 impressions across URL variants. Historical impressions are not current index status.

## Unknown URLs (21)
- /reviews/ssds/crucial-t500-2tb
- /reviews/gpus/nvidia-geforce-rtx-5080
- /reviews/gpus/amd-radeon-rx-9070-xt
- /reviews/cpus/amd-ryzen-7-9850x3d
- /reviews/gpus
- /tools/windows-support-lifecycle-checker
- /tools/bsod-error-code-lookup/dpc-watchdog-violation
- /tools/bsod-error-code-lookup/bad-pool-header
- /tools/bsod-error-code-lookup/ntfs-file-system
- /tools/bsod-error-code-lookup/unexpected-store-exception
- /tools/bsod-error-code-lookup/driver-power-state-failure
- /tools/bsod-error-code-lookup/store-data-structure-corruption
- /contact
- /research/windows-100-percent-disk-usage-low-mbps
- /research/how-ssd-temperature-affects-performance
- /windows-patch-tuesday
- /windows-11-26h2-installation-guide
- /windows-11-8gb-ram-update-october-2026
- /windows-11-blue-screen-stop-code-how-to-read
- /windows-secure-boot-certificate-update
- /laptop-plugged-in-not-charging

## Release and recovery gates
- Preserve URLs and www canonical signals; do not bulk delete or noindex based on coverage alone.
- Run build validators and full live smoke checks on production. Phase 2F adds checks for nonempty main/H1 and fallback content, and replaces an unrelated laptop battery illustration on the PSU guide with a desktop repair-bench image.
- In Search Console, inspect priority URLs, run Test live URL, request indexing once if updated and eligible. Verify submitted sitemap is successful. No Indexing API misuse; ordinary web articles do not qualify.
- Compare counts and last crawl dates at 7 and 14 days. Only conclude post-recovery rejection when recorded crawl is after the relevant deployment. Investigate content differentiation and evidence individually before further changes.
- Obtain failed-validation detail export; API inspections do not identify membership of that specific validation attempt.
- Vercel connector did not expose the TWW project in the accessible team, so verify production deployment via GitHub checks and Vercel dashboard.
