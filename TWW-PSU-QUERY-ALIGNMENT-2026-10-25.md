# PC Power Supply Troubleshooting — Query Alignment Pass — 2026-10-25

## Search Console evidence

Windsor.ai Search Console, Web search, last 28 days, URL filter `/pc-power-supply-problems-symptoms` returned 45 distinct query rows, most with one to four impressions. This is a low-volume discovery signal, not a stable demand forecast.

Representative queries include:
- `signs of psu failure` — 4 impressions, average position 65.5.
- `symptoms of a failing psu` — 4 impressions, average position 62.5.
- `faulty power supply symptoms` — 3 impressions, average position 50.
- `pc psu problems` — 1 impression, average position 32.
- `power supply pc troubleshooting` — 1 impression, average position 10.
- `what can a bad psu cause` — 1 impression, average position 45.
- `troubleshoot computer power supply` — 1 impression, average position 46.

The current metadata was previously revised on 2026-10-16, and the current 28-day window includes earlier search activity. This pass deliberately does not change the SEO title or description again; wait for a settled post-recrawl sample before judging the title.

## Changes

- Reworked the article card/excerpt answer to immediately explain the main failure patterns (shutdowns, restarts under load, failed starts, and instability after hardware changes) and state that these signs overlap with GPU, thermal, cabling, motherboard and RAM faults.
- Renamed the first subsection to `Bad PSU symptoms: warning signs and what they mean`, aligning the visible diagnosis path with real queries without repeating exact-match phrases unnaturally.
- Updated the article modification date because the visible copy changed.
- Kept the existing safety-first diagnostic procedure, Event ID 41 explanation, PSU tester limitations, official documentation links, calculator link, and existing URL.
- No new URL, fabricated failure test, benchmark, product review, or unsupported diagnosis was added.

## Validation and follow-up

- Run the full TypeScript/build/SSG/content/link audits.
- Confirm Vercel's deployment status separately from GitHub Actions.
- In a comparable settled post-recrawl Search Console window, compare clicks, impressions, CTR and average position, and check whether queries around PSU symptoms and power-supply troubleshooting improve.
- Avoid another title rewrite until there is enough post-change data to make an evidence-based decision.
