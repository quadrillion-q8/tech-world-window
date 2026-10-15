# Gallery photos placed inside relevant pages — 2026-10-15

- No new URLs. 45 existing gallery photos were placed inside 31 existing pages (30 articles/guides + /about, /testing, /authors/imran-natiq).
- All placements live in one file: `src/data/article-images.ts` (`articleImagePlacements`, `staticPageFigures`). Change `after` (section heading), `id` (gallery file name), `alt` or `caption` there.
- Articles get the photo right after the matching section; `ArticlePage` already renders `section.image`. Static pages render figures after the text with a link to /gallery.
- Buying-guide pages (best-*) captions say the photo is not a product endorsement.
- Existing images on nvme-ssd-temperature-too-high were left untouched.
- `npm run build` passes (102 routes, validation and content integrity OK).
