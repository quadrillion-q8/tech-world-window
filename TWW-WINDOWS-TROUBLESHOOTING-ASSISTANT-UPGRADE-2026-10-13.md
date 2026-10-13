# Tech World Window — Phase 2 International Growth Upgrade

**Date:** 13 October 2026  
**Purpose:** Add a useful, privacy-conscious troubleshooting tool that improves user pathways through existing guides instead of creating a large batch of thin search pages.

## What changed

### 1. New interactive tool

Added `/tools/windows-troubleshooting-assistant` with symptom-led routing for six problem groups:

- Windows will not start
- Blue screens and repeated crashes
- Slow, frozen, or high-resource Windows
- Wi-Fi, Ethernet, DNS, or internet issues
- Windows Update stalls, error codes, and rollbacks
- PC gaming low FPS, stutter, shader compilation, and crashes

Each flow provides a short, non-destructive first-check plan, safety cautions where relevant, and links to focused existing pages. The tool does not scan the computer, upload files, or claim to prove a hardware fault.

### 2. SEO and structured data

- Registered the tool in `src/data/tools.ts`, so it joins the existing graph-driven route inventory and automatic sitemap generation.
- The tool registry supplies page title, meta description, WebApplication schema data, and a visible FAQ mirrored in the site's generated FAQPage structured data.
- Updated the tools-hub description in `src/data/tools.ts` and `src/seo/ssgSeo.ts` to better describe its diagnostic tools.
- Updated `public/sitemap.xml` from 95 to 96 URLs, adding the assistant's canonical `www` URL. Sitemap and route inventory matched exactly in the local static parity check.

### 3. Route integration and internal discovery

- Added the page-specific renderer in `src/routes.tsx`.
- Added contextual tool-callout links for 12 relevant Windows and PC-gaming articles in `src/data/tools.ts`.
- Promoted the tool in `src/pages/ToolsHubPage.tsx` through the shared tool registry, and refreshed homepage tool-banner wording in `src/pages/Home.tsx`.

### 4. Privacy-conscious event measurement

Uses the existing centralized `trackMonetization` helper for `tool_used`, `tool_completed`, and `tool_conversion` events. Events only send when the existing GA4 consent gate has loaded analytics. Event parameters are limited to the tool name, symptom category/option, method, and selected destination—never uploaded logs or file contents.

### 5. Responsive UI

Added responsive symptom cards, follow-up choices, a results panel, keyboard-visible states, privacy wording, and small-screen layout rules in `src/styles/globals.css`.

## Files changed in this phase

- `src/pages/WindowsTroubleshootingAssistantPage.tsx` — new assistant UI and flow content.
- `src/routes.tsx` — assistant page route renderer.
- `src/data/tools.ts` — tool registry, FAQ/metadata, tool-callout map, and tools-hub description.
- `src/seo/ssgSeo.ts` — aligned tools-hub description for prerendered SEO.
- `src/pages/ToolsHubPage.tsx` — updated tool-hub text.
- `src/pages/Home.tsx` — updated free-tools banner copy.
- `src/styles/globals.css` — responsive assistant styles.
- `public/sitemap.xml` — added the new route; 96 URLs total.
- `TWW-WINDOWS-TROUBLESHOOTING-ASSISTANT-UPGRADE-2026-10-13.md` — this report.

## Verification performed

- TypeScript/TSX syntax transpilation: **51 files checked, 0 syntax errors**.
- Assistant links: **23 distinct internal destinations checked; 0 missing routes**.
- Article-to-tool callout map: **12 entries checked against source slugs; 0 unknown slugs**.
- New tool SEO: title is 33 characters; meta description is 156 characters.
- Sitemap parity: **96 expected routes / 96 sitemap URLs; no missing or unexpected paths**.
- FAQ text checked for backticks that could leak into JSON-LD: none found.

**Build limitation:** A full TypeScript typecheck and production build were not run here because project dependencies are not installed in this environment and package installation was unavailable. Syntax transpilation is not a substitute for `npm run build`.

**Live-status limitation:** The live site's URLs were inaccessible through the browser checker during this phase, so no claim is made that the new route is live or indexed.

## Deployment and live acceptance checklist

1. Merge/extract the updated source into the GitHub repository.
2. Run `npm ci` and `npm run build` in an environment with dependency access; do not deploy if validation fails.
3. Deploy through the existing Vercel pipeline.
4. Verify `https://www.techworldwindow.com/tools/windows-troubleshooting-assistant` returns successfully with the expected canonical, title, and description.
5. Verify `https://www.techworldwindow.com/sitemap.xml` contains the new tool URL and submit/resubmit the sitemap in Search Console if needed.
6. With analytics consent accepted in a test browser, complete the assistant and confirm `tool_used`, `tool_completed`, and relevant `tool_conversion` events in GA4 DebugView. With consent declined, confirm no GA4 event is sent.
7. After enough new data accrues, compare query impressions, clicks, CTR, and landing-page engagement rather than judging the change after only a day or two.

## Recommended next measurement step

Allow Google and analytics to collect meaningful post-deployment data. Then use a fresh Search Console export to prioritize pages by impressions and query intent, and use GA4 to see whether visitors move from guides into tools and onward to useful next steps. Avoid making multiple major title changes on pages that still have only a few impressions.
