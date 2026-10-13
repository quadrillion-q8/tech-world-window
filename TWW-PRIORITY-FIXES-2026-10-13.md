# TWW Priority Improvements — 2026-10-13

## Scope
Applied a small, evidence-led internal-linking pass based on the supplied Search Console export and the existing query-to-page map. This intentionally avoids new URLs, duplicate articles, or repeated metadata edits while Google recrawls the previous title/description updates.

## Files changed
- `src/data/articles.ts`
  - Windows DNS guide: added contextual links to the broader connected-but-no-internet guide and the network adapter reset guide, directly after the router-versus-PC diagnosis.
  - Network adapter reset guide: added links back to the DNS diagnostic and broader connectivity guide at the decision point where a reset is being considered.
  - SSD slowdown guide: added contextual links to SSD health checks and NVMe thermal-throttling guidance alongside the practical next steps.
- `TWW-PRIORITY-FIXES-2026-10-13.md` (this report).

## Why
The Search Console export contains query clues for DNS issues, network reset safety, and SSD slowdown. These rows are very small samples, so the action is to improve useful paths between existing pages rather than creating more pages or claiming a CTR problem.

## Not changed
- No URL slugs, canonical-host settings, SEO titles, or descriptions changed in this pass.
- No new articles were created.
- No claims are made about live deployment or Google recrawling.

## Validation status
The supplied project includes build and content validation scripts. `npm ci` was attempted in this environment but did not complete before timeout, so a production build could not be certified here. Before deployment, run:

```bash
npm ci
npm run build
npm run audit:links
```

Deploy only if the build and validation pass. Then verify the live pages and compare Search Console data over a comparable 28-day period after recrawling.
