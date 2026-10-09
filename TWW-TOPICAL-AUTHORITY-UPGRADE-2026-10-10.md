# Tech World Window — Topical Authority & Content Enrichment Upgrade

Date: 2026-10-10

## Objective

Deepen the existing Windows, PC gaming performance, storage, and buying-guide clusters without adding new URLs or changing established slugs. This update improves diagnostic usefulness, adds curated in-body links to relevant next steps, and validates those links as part of the content integrity workflow.

## What changed

### Content model and rendering

- `src/data/articles.ts`: added optional `relatedLinks` to `ArticleSection`; visible link labels and descriptions are counted in article structured-data word counts.
- `src/pages/ArticlePage.tsx`: renders curated contextual links after the section content so readers can follow the next diagnostic step from the body of the article.
- `src/lib/contentRelationships.ts`: prioritizes an article's actual pillar in the related-story cards, and uses reverse relationships declared by research pages before falling back to tag-based research suggestions.
- `src/styles/globals.css`: adds responsive, low-visual-noise styling for the contextual link list.

### Enriched content

- Windows troubleshooting pillar: added a decision table that matches observations with the next investigation and warns against premature conclusions.
- Windows high memory use: distinguishes utilization from actual memory pressure and memory stability issues.
- SSD health: adds a baseline-and-timeline process, data-protection guidance, and links to the SSD symptom cluster.
- SSD slowdown: adds a symptom-led decision table and contextual routes to the relevant storage guides and research.
- Windows freezing: adds a disciplined Reliability Monitor/Event Viewer timeline workflow and cautions against treating isolated events as a diagnosis.
- PC game stuttering: adds a reproducible capture protocol and frame-time pattern interpretation table.
- Best SSDs: adds a transparent comparison framework that distinguishes manufacturer specifications from genuine firsthand testing.

### Link validation and sitemap

- `scripts/validate-build.ts`: checks that contextual links have labels/descriptions and point to indexable internal routes.
- `scripts/audit-content-integrity.ts`: checks contextual link destinations and incorporates their text into content integrity analysis.
- `scripts/audit-link-topology.ts`: includes contextual in-body links and rendered pillar fallbacks in incoming/outgoing topology counts without falsely treating them as reciprocal `relatedArticles` relationships.
- `public/sitemap.xml`: added the five missing research article routes and refreshed `lastmod` on the enriched pages.
- `BUILD-VERIFICATION.md`: replaced the stale 16-route statement with dynamic graph-based validation guidance.

## Cluster map (priority routes)

- **Windows troubleshooting:** `/windows-troubleshooting-complete-guide` → startup and boot recovery, Windows Update, high memory use, 100% disk usage, startup delay, freezes, RAM checks, and networking/DNS troubleshooting.
- **PC gaming performance:** `/pc-game-stuttering-fix-frame-time` → GPU frame-time spikes, shader compilation stutter, low FPS diagnosis, the Frame-Time Analyzer, and the related reproducible-stutter research page.
- **Storage and SSDs:** `/how-to-check-ssd-health-windows` ↔ SSD slowdown, NVMe temperature, nearly-full-drive symptoms, and SSD free-space research. The links distinguish health warnings from capacity, heat and workload effects.
- **SSD buying guidance:** `/best-ssds` → the model-specific Samsung 990 PRO and Crucial T500 profiles, SSD health guidance and NVMe thermal guidance. Pages must keep their evidence basis explicit.

These are editorial pathways, not a guarantee of rankings. Use Search Console performance and reader behavior to refine them after deployment.

## URL and SEO preservation

- No route slug was renamed or removed.
- No third-party dependency was added.
- Existing explicit `relatedArticles` relationships were not rewritten, avoiding unintended reciprocity/cluster-validator changes.
- Only pages with new enrichment receive the 2026-10-10 `updatedAt` date through the enhancement layer. Other legacy enrichment dates remain unchanged.

## Validation status

Source changes and route destinations were checked statically. A full production build was not run in this package-edit step because this extracted project has no `node_modules` directory and dependencies have not been installed in this environment. On Windows, run:

```powershell
npm ci
npm run build
npm run audit:links
npm run preview
```

Do not consider the update fully release-verified until the build ends with `Validation passed`, the contextual-link validator reports no errors, and the generated sitemap has the expected current route set.

## Editorial follow-through

The next meaningful authority gains should come from genuine original testing, method transparency, and Search Console feedback—not by publishing another large volume of generic articles. Product pages must say whether they are firsthand tests or specification-based profiles; never imply measurements that TWW has not performed.
