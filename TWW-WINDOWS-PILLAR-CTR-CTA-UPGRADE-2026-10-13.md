# TWW Windows Pillar: CTR, Discovery and CTA Upgrade

Date: 2026-10-13

## Scope

Enhanced the `/windows` category page to behave more like a symptom-first Windows troubleshooting hub while preserving the existing category/article architecture.

## Changes

- Added Windows-specific title and meta description through the existing `SEOEngine`.
- Reworked the Windows hero copy to communicate the Windows 11/Windows 10 scope and evidence-led troubleshooting approach.
- Added a primary CTA to `/windows-troubleshooting-complete-guide`.
- Added a secondary CTA to `/tools/windows-troubleshooting-assistant`.
- Added six symptom pathways for startup failure, blue screens, freezing/slow performance, connected-but-no-internet, DNS/network issues, and Windows Update.
- Added a secondary assistant prompt for visitors who do not know which guide to choose.
- Added responsive styling for desktop, tablet and mobile.

## Files changed

- `src/pages/Category.tsx`
- `src/styles/globals.css`
- `TWW-WINDOWS-PILLAR-CTR-CTA-UPGRADE-2026-10-13.md` (new)

## Validation status

- Reviewed the target routes against the project's route graph and existing content data.
- Attempted `npm ci`, but dependency installation timed out in this environment. Therefore `npm run typecheck` and the full production build were not completed here.
- Run `npm ci` and `npm run build` locally before deploying. Then inspect `/windows` at desktop and mobile widths and verify the prerendered HTML includes the custom title, description, hero and symptom links.

## Measurement plan

In Google Search Console, record the `/windows` URL's impressions, clicks, CTR and average position for the 28 days before deployment. Compare the same metrics after 28 days, using the same date range length and checking query-level changes. Do not treat a CTR or ranking improvement as guaranteed.
