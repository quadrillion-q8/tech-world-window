# Targeted validation recovery — 2026-11-26

Google Search Console validation screenshot: started 2026-11-22, failed 2026-11-24, 116 pending, two failed:
- /gpu-100-percent-usage-gaming — recorded crawl 2026-11-24 16:09:50 UTC
- /tools/pc-bottleneck-calculator — recorded crawl 2026-11-24 16:01:16 UTC

Both recorded Google fetches succeeded, robots and indexing allowed, declared and Google canonical match. These are historical crawls, not post-Phase-2G evaluations. No causal inference about indexing is warranted.

Code defect: the prior heuristic multiplied GPU tier by increasing resolution weight, causing the same GPU to appear stronger as rendering demand increased. Divide by the illustrative demand factor instead. Maintain ordinal tiers and the 0.8 balance band; disclose that weights and band are uncalibrated. No FPS prediction or exact bottleneck percentage is implied. A new measured-FPS comparison calculates only the user's observed relative change. Regression tests exercise all 48 tier/resolution combinations and invalid FPS inputs.

Keep URLs and metadata architecture intact. Verify build, production HTML and live URL inspection for both URLs before restarting the issue validation. Search Console UI is required for live testing, indexing requests and restarting validation. No claim of indexing recovery.
