# Tech World Window — Global SEO Upgrade

Implemented in the logo-integrated codebase on October 7, 2026.

## What changed

- Repositioned the homepage around **Windows + PC Gaming + Hardware** instead of generic technology wording.
- Rebuilt the homepage into a curated authority structure: pillar guides, Windows, Gaming, Hardware, latest explainers and tools.
- Added a transparent **TWW Testing Methodology** page at `/testing`.
- Added a **TWW Technology Research** page at `/research` for future original studies and benchmark data.
- Expanded the author page content and removed the unfinished `[EDIT: ...]` placeholder.
- Added `ProfilePage` / `Person` structured data for the author page.
- Strengthened Organization and WebSite structured data, including the brand logo.
- Added default 1200×630 Open Graph/Twitter imagery so indexable pages always have a crawlable social image.
- Added Article structured-data imagery and publisher logo data.
- Added RSS feed generation and `/feed.xml` discovery.
- Added RSS generation to the production build command.
- Updated the sitemap to include the new indexable authority pages.
- Filled previously empty GPU, laptop and CPU commercial hubs with useful diagnostic/buying-guide links rather than pretending there are hands-on reviews.
- Updated the October 7 Microsoft/Surface article from a pre-event preview into a post-event analysis using current primary-source and reporting references.
- Added methodology/research links to the footer trust area.

## Important editorial rule

The site now explicitly separates:

1. Manufacturer/documentation facts
2. TWW hands-on measurements
3. Technical analysis or informed guidance

Do not label specification profiles as hands-on reviews until TWW has actually tested the product.

## Deployment

Run the normal production build:

```bash
npm install
npm run build
```

The build now regenerates both:

- `public/sitemap.xml`
- `public/feed.xml`

The development environment used for this upgrade did not have the project's npm dependencies installed; package installation timed out before a complete production build could be executed here. The edited TypeScript files were structurally checked and internal route references were cross-checked against the route/article graph.
