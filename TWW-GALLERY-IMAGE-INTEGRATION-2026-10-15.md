# Gallery image integration — 2026-10-15

## What changed
- Updated `src/components/ArticleThumbnail.tsx` so article cards use relevant real photos from `/public/images/gallery` instead of the generic SVG diagnostic illustration.
- Added topic-based photo selection for battery, RAM, SSD/NVMe, GPU, cooling, blue-screen, networking, BIOS/boot, display, MacBook, hinge, laptop power, gaming-laptop and desktop-PC topics.
- Preserved any explicit `imageUrl` supplied by an article; the gallery image is the fallback.
- Kept lazy loading, asynchronous decoding, descriptive alt text and responsive 16:9 card crops.
- Retained existing in-article placements in `src/data/article-images.ts`: 44 unique gallery photos across 31 pages, including 30 articles/guides and three static pages.
- No article URLs, page copy, route definitions, or gallery assets were changed.

## Asset validation
- The gallery data contains 472 image IDs.
- Every gallery image ID referenced by the new thumbnail selector was checked against `src/data/gallery.ts`.
- Photo choice is based on title/slug keywords and broad category fallback. Review the Vercel preview for any article whose title combines multiple hardware topics, as keyword matching is a practical visual fallback rather than a manual image assignment for every individual article.

## Verification
- Source-level check: all referenced gallery IDs exist.
- A full production build and real-browser visual QA have not been run in this change.
