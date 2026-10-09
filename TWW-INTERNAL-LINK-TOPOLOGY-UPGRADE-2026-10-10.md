# Tech World Window — Internal-Link Topology Audit Upgrade

Date: 2026-10-10

## Added

- `scripts/audit-link-topology.ts` — a report-only audit for related-article links, pillar-to-cluster coverage, low incoming links, articles without explicit related links, and likely tool-link review candidates.

## Updated

- `package.json` — adds `npm run audit:links`.

## How to run

```powershell
npm run audit:links
```

Run after installing dependencies. The audit intentionally does not add links automatically: keyword overlap alone does not prove that a link is useful. Review suggested candidates for actual reader intent and context.

## Scope and limitations

- Existing `scripts/validate-build.ts` remains the blocking validation for broken article IDs, reciprocal relationships, route parity, and tool registry integrity.
- This audit examines the explicit `relatedArticles` graph and the `articleToolLinks` registry. It is not a crawler and does not measure every rendered HTML anchor or external link.
- Low incoming counts are review signals, not proof that a page is orphaned; category hubs, navigation, research modules, and contextual links can provide other discovery paths.
- Heuristic tool candidates require editorial review before adding callouts.
