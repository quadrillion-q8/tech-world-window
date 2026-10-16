# RAM Research Page Audit — 2026-10-17

Target page: https://www.techworldwindow.com/research/does-more-ram-make-windows-faster

## Audit verdict

The page's core recommendation was sensible: additional RAM helps when capacity is the bottleneck, not simply because memory use is high. However, the live page had several quality issues that weakened its authority and polish. The updated version improves diagnosis, sourcing, information order, related content, and transparency. It does **not** claim that TWW has conducted a RAM benchmark.

## Issues found and addressed

1. **Self-link in the research connection module.** The article appeared as one of its own “See the evidence behind this topic” recommendations because topic-tag fallback could add the current research article's ID. The relationship helper now excludes the current article.
2. **Irrelevant sources.** The prior references concerned blue-screen and stop-code troubleshooting rather than supporting the page's core explanations of memory capacity, commit charge and paging. They were replaced with Microsoft documentation about memory and the page file, plus a clearly attributed independent gaming-capacity study from TechSpot (8 January 2026).
3. **Section-order defect.** The “Bottom line” preceded the later “More RAM or faster RAM” section because the latter was appended through the enhancement layer. The comparison now resides in the canonical article content and the conclusion is the final main section.
4. **Insufficient measurement detail.** The revised article explains how to inspect Task Manager and Resource Monitor during the actual slowdown, distinguishes committed memory from resident physical RAM, and warns that hard faults or Pages/sec do not independently prove insufficient capacity.
5. **Limited practical decision support.** The revised page compares capacity and speed as separate upgrade decisions, gives a controlled before/after testing method, covers channel/rank/timing confounders, and lists common measurement mistakes.
6. **No FAQ section.** Six reader questions were added. The current article renderer also emits FAQ structured data when FAQ content exists.
7. **Weak next action.** The page now points to the site's RAM Calculator callout.

## Important evidence boundary

The TechSpot study is cited as external gaming evidence and is explicitly scoped to its test system and tested games. It is not presented as a TWW measurement or as a universal recommendation for every Windows computer.

The page now explicitly states that TWW has not published controlled in-house RAM-capacity benchmark results. To become a genuinely leading research resource, TWW's next major step is to perform and publish its own reproducible tests with complete hardware/software details, raw observations, repeat runs, and limitations. Do not invent benchmark numbers to fill this gap.

## Technical scope

- Existing URL and route retained.
- Article canonical route, title/description plumbing, author attribution, structured Article/Breadcrumb data, and sitemap generation flow retained.
- Added six FAQs through the existing Article model; no new URL was created.
- Added a related free RAM Calculator callout using the existing tool component.
- No TWW performance percentages or fabricated lab results were added.

## Validation still required

A production build was not run by the repository connector during this edit. Before merging/deploying, run:

```bash
npm ci
npm run build
npm run audit:links
```

Then verify the deployed page visually at desktop and mobile widths, confirm the RAM Calculator callout and FAQ render correctly, check the four source links, and validate the canonical/Article/Breadcrumb/FAQ structured data. Compare the generated sitemap's last-modified date with the article's updated date.
