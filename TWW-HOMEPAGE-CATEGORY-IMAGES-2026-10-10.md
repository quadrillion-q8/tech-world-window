# Homepage Category Images — 2026-10-10

## What changed

Added image-backed category cards to the TWW homepage for News, Windows, Gaming, Hardware, Guides and Reviews. The six visuals are all delivered as local WebP assets in `public/images/categories/`.

## Category mapping

- **News:** new generated editorial technology illustration (the supplied set contained only five images).
- **Windows:** `Fix Windows.jpg` visual.
- **Gaming:** `Fix PC gaming.jpg` visual.
- **Hardware:** the motherboard / cooling assembly visual from `Technology Reviews.jpg` (mapped by its actual content, not the filename).
- **Guides:** `The complete guides.jpg` visual.
- **Reviews:** the caliper / benchmark rating visual from `Your PC hardware.jpg` (mapped by its actual content, not the filename).

## Image performance decisions

Each category has 480 × 270 and 960 × 540 WebP variants, cropped consistently to 16:9. Assets use WebP quality 78 and are stored locally; category markup uses `srcset` and `sizes` to let browsers select a suitable resolution. Images also use `loading="lazy"`, `decoding="async"`, declared width and height, and a fixed 16:9 container to avoid layout shifts. Card illustrations are decorative within links whose category heading and description already convey their purpose, so image alt text is empty by design.

The 12 generated WebP files total approximately **307 KB** in encoded file sizes (about 328 KB allocated on disk); browsers normally fetch only one selected variant per image, not both. The 480px variant total is approximately 80 KB across all six cards, and the 960px variants total approximately 227 KB. Actual transfer varies by viewport and device pixel ratio.

## Files created

- `public/images/categories/news-480.webp`
- `public/images/categories/news-960.webp`
- `public/images/categories/windows-480.webp`
- `public/images/categories/windows-960.webp`
- `public/images/categories/gaming-480.webp`
- `public/images/categories/gaming-960.webp`
- `public/images/categories/hardware-480.webp`
- `public/images/categories/hardware-960.webp`
- `public/images/categories/guides-480.webp`
- `public/images/categories/guides-960.webp`
- `public/images/categories/reviews-480.webp`
- `public/images/categories/reviews-960.webp`

## Files modified

- `src/pages/Home.tsx` — responsive image markup, accessible structure, and section intro copy.
- `src/data/articles.ts` — category-specific image base paths.
- `src/styles/globals.css` — responsive image-led card layout, hover treatment and spacing.
- `scripts/audit-content-integrity.ts` — required 480px and 960px category image asset checks.

## Verification notes

- All 12 WebP files decode and have the expected dimensions.
- Responsive source paths match the category data entries.
- The image asset validator checks both variants for all six categories.
- A full production build still needs to be run in the project's normal development environment after dependencies are installed; this environment has no project `node_modules` directory.
