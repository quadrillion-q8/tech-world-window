# TWW Changelog — Content Enrichment & SEO Pass

**Date:** 2026-10-10  
**Scope:** Improve existing guides and prepare the next universal problem-solution cluster without introducing new published URLs.

## Files changed

### Updated: `src/data/content-enhancements.ts`

- Extended the enhancement model to support article-level source references, concise SEO titles, and meta-description overrides.
- Deepened 12 existing diagnostic/educational routes with new decision tables, troubleshooting sequences, safety caveats, FAQs and contextual next-step links:
  - `/windows-11-network-adapter-reset-guide`
  - `/gpu-100-percent-usage-gaming`
  - `/pc-games-crashing-to-desktop-troubleshooting`
  - `/laptop-nvme-ssd-upgrade-compatibility`
  - `/windows-11-dns-not-working-how-to-fix`
  - `/gpu-overheating-gaming-pc-causes-fix`
  - `/pc-power-supply-problems-symptoms`
  - `/gaming-laptop-upgradeable-ram-ssd`
  - `/ddr4-vs-ddr5-ram-difference`
  - `/how-much-ram-do-you-need-gaming`
  - `/gpu-frame-time-spikes-causes-fix`
  - `/shader-compilation-stutter-pc-games`
- Added verified vendor/documentation sources where they are directly relevant, including Microsoft Wi-Fi and PowerShell documentation, Microsoft Disk Management, Intel XMP, NVIDIA FrameView and AMD performance-metric documentation.
- Added 28 concise SEO-title overrides to prevent long editorial headlines from becoming overlong title tags after ` | Tech World Window` is appended. The reader-facing headline and established URL are unchanged.
- Shortened fallback meta descriptions for the connected/no-internet and game-stuttering articles, and added explicit concise descriptions to the newly enriched pages.
- Kept additions within the existing enhancement architecture; no new package dependency was introduced.

### Updated: `public/sitemap.xml`, `public/feed.xml`, and `scripts/generate-sitemap.ts`

- Regenerated the sitemap from the central route graph: 94 indexable URLs, with refreshed `lastmod` dates from the enriched article records.
- Regenerated the RSS feed from the current article registry: 39 article items, with dates aligned to current `updatedAt`/`publishedAt` data.
- Preserved the existing RSS-discovery comment in `robots.txt` and updated the sitemap generator so the comment survives future builds.

### Updated: `scripts/validate-build.ts`

- Title validation now checks the **rendered title tag**, including the site-name suffix, rather than only checking the unsuffixed `seoTitle` field.
- The build validator should now catch future title regressions of this kind before release.

### Created: `TWW-UNIVERSAL-PROBLEM-SOLUTION-GUIDES-2026-10-10.md`

- Detailed editorial briefs for six proposed pages: Wi-Fi disconnects, black screen after login, laptop not charging, PC no display, SSD not detected, and USB device not recognized.
- Each brief defines a distinct intent, decision table, section plan, sourcing requirements, internal links and safety notes.
- These are briefs, **not live routes**. No URL was added to the sitemap in this pass.

## SEO / URL preservation

- Existing slugs and route graph were not renamed or removed.
- No new dependencies were added.
- New internal body links are validated against indexable route paths.
- Do not claim search performance improvement until deployed data is available in Search Console.

## Verification status

The source changes have been applied, but a full production build has not yet been confirmed in this extraction because dependencies are not included with the ZIP. Run from the project directory:

```powershell
npm ci
npm run build
npm run audit:links
npm run preview
```

The release gate is passed only if the production build and both validation stages finish without errors, the 94-route graph/sitemap expectation remains correct for this version, and the six brief-only ideas do not appear as indexable routes.
