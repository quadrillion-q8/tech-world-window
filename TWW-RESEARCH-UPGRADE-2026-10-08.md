# Tech World Window — Research Content Upgrade

## Added research articles

- `/research/ssd-nearly-full-what-really-changes`
- `/research/windows-100-percent-disk-usage-low-mbps`
- `/research/what-actually-causes-pc-game-stuttering`
- `/research/does-more-ram-make-windows-faster`
- `/research/how-ssd-temperature-affects-performance`

## Editorial standard

These pages intentionally do **not** invent benchmark numbers, lab measurements, product test results, or universal thresholds. They publish original diagnostic analysis and reproducible test designs now. Measured TWW results should be added only after the stated hardware/software tests have actually been performed.

Each research article includes:

- a specific technical question;
- a diagnostic model or decision framework;
- evidence tables or controlled-test steps;
- related links into existing TWW content;
- source references where appropriate;
- a testing/evidence note that distinguishes analysis from hands-on measurement.

## Architecture changes

- Added `src/data/research-articles.ts`.
- Imported research articles into `src/data/articles.ts`.
- Added all five canonical routes to `src/data/graph.ts`.
- Added a Research mega-menu group with links to the new articles.
- Expanded the `/research` static page with the current research series.

## Build note

A full dependency installation could not complete in the execution environment before the timeout, so a complete production build was not possible here. Route/article consistency and structural source checks passed. Run `npm ci` followed by `npm run build` locally before deployment.
