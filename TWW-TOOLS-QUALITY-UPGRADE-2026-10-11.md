# TWW Tools Quality Upgrade — 2026-10-11

## Updated

- `src/pages/ToolsHubPage.tsx`
  - Sharpened the hub introduction around diagnosis, troubleshooting and upgrade planning.
  - Added compact tool-principle cues (browser-first, transparent, practical).
  - Improved tool links with explicit accessible labels.
  - Clarified what each class of tool can and cannot establish.
- `src/pages/ToolPage.tsx`
  - Added bounded numeric input handling so blank, non-finite, or out-of-range values do not corrupt calculator state.
  - Improved PSU guidance by showing the rounded planning estimate and a shortlist starting wattage, while warning that connectors, transient demand, model quality and vendor guidance still matter.
  - Improved RAM result caveats to distinguish a planning estimate from measured workload needs and compatibility.
  - Improved storage output with comma-separated capacities, decimal TB planning guidance and usable-capacity caveat.
  - Explicitly labels bottleneck output as qualitative rather than a measured percentage or FPS prediction.
- `src/styles/globals.css`
  - Added responsive trust-cue styling, card alignment, numeric input focus states and mobile single-column layouts for the tools hub.

## Validation

- Reviewed the edited source for consistency.
- A full TypeScript/build verification could not be completed in this environment because `npm ci` did not finish before the execution timeout. Run `npm ci` and `npm run build` locally before deploying.

## Important scope note

This upgrade improves presentation, input resilience and interpretation. It does not turn the simplified CPU/GPU tier model into a benchmark database, nor does it certify PSU compatibility or replace device-specific troubleshooting.
