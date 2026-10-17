# TWW International SEO Growth Pass 3 — 2026-10-18

## Scope and operating rules

This pass uses current repository source, a live on-page audit, and connected Google Search Console data. It preserves the existing architecture:

`src/data/graph.ts` → generated sitemap → Vite SSG routes → build validation → production smoke checks.

No new article URL, route, dependency, sitemap entry, or framework migration is included in this pass.

## Search Console baseline

- Property: `sc-domain:techworldwindow.com`
- Search type: Web
- 90-day window settled through 2026-10-15
- Clicks: 7
- Impressions: 358
- CTR: 1.96%
- Average position: 22.01

This is an early, low-volume baseline. It should guide testing, not be treated as a mature forecast or proof of ranking potential.

## Query-led opportunity

The query `gpu at -1%` appeared with 6 impressions and an average position of approximately 2.67 in the available query sample. This is ambiguous telemetry-related intent, so this pass deliberately adds an explanatory FAQ to the existing GPU utilization article rather than creating a thin standalone URL.

The answer explains that a negative utilization reading is not physical GPU load, that monitoring tools may display an unavailable/invalid value depending on the tool, and that users should compare readings with Task Manager and the vendor utility before diagnosing hardware failure.

## Live on-page audit

Seven pages were checked on 2026-10-18 against the 2026-09-17 to 2026-10-14 reporting window:

- 7/7 returned HTTP 200 and were indexable.
- 0 critical and 0 high-severity issues were reported.
- 1 medium issue was reported: an Organization object associated with the Windows Troubleshooting Assistant's WebApplication structured data omitted a logo.
- Low-severity image-alt findings were reported on sampled pages. The shared header logo is intentionally decorative inside an accessible home link and correctly uses an empty alt attribute; do not replace decorative empty alt text with keyword-filled text. Inspect the exact image node before changing any remaining alt finding.

## Sitemap submissions to reconcile

Search Console currently lists:

- `https://www.techworldwindow.com/sitemap.xml`: 102 submitted URLs, 0 indexed in the sitemap report, no reported warnings/errors; last submitted 2026-10-15.
- `https://techworldwindow.com/sitemap.xml`: 114 submitted URLs, 0 indexed in the sitemap report, no reported warnings/errors; last downloaded 2026-10-17.

The repository generator uses `SITE_URL = https://www.techworldwindow.com`, and `public/robots.txt` points to the `www` sitemap. The live smoke test already checks that the apex host returns a 308 redirect to the preferred host and validates sitemap host consistency.

Do not edit sitemap counts by hand or add routes to chase a submitted-count discrepancy. Run the existing production smoke test, verify the deployed sitemap generated from the current commit, inspect the apex redirect, then remove the obsolete apex sitemap submission in Search Console if the redirect and canonical-host checks pass. Sitemap API indexed counts alone do not prove that every URL is excluded from Google's index.

## Changes in this pass

1. Added the TWW logo to the Organization publisher object embedded in WebApplication structured data, addressing the exact medium-severity audit finding.
2. Added a focused FAQ to the existing GPU utilization article for the observed `gpu at -1%` query.
3. Kept the existing route graph, canonical URLs, sitemap, content architecture, and dependencies unchanged.

## Next execution order

1. Run `npm ci` and `npm run build`; confirm typecheck, content-integrity, gallery, route-graph, and sitemap validation pass.
2. Confirm CI/live smoke test passes on the deployed preview, including apex-to-www redirect and sitemap checks.
3. Re-run the live SEO audit for the Windows Troubleshooting Assistant and verify the WebApplication publisher now contains the logo.
4. In Search Console, verify the preferred sitemap and apex redirect, then remove the old apex sitemap submission if confirmed safe.
5. Re-measure the GPU utilization page and query cluster after sufficient settled data; do not judge the FAQ from a single day's movement.
6. Prioritize the existing NVMe temperature and gaming stutter pages next, preserving distinct search intent and avoiding new URLs until query evidence justifies them.

## Validation status

Source edits are prepared for CI validation. A successful build or production deployment is not claimed by this report; those checks must pass in the repository's build/preview workflow before merge or release.
