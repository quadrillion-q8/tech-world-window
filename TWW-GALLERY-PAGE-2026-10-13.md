# TWW Repair Bench Photo Gallery — 2026-10-13

## Added (one new URL, requested explicitly)
- `/gallery` — "Repair Bench Photo Gallery", 161 photos in 9 categories, with category jump links, lazy-loaded 640px thumbnails, a keyboard-accessible lightbox (Esc, arrow keys) and plain `<a href>` links to the full-size image so it works without JavaScript.
- `public/images/gallery/` — 161 images x 2 sizes (`<name>.webp` 1400px, `<name>.w640.webp` 640px). The word "kuwait" was removed from every file name; one name collision was resolved by renaming `removing-dust-from-laptop-heatsink-with-tweezers-kuwait` to `removing-dust-from-laptop-fan-and-heatsink-fins-with-tweezers`.
- `src/data/gallery.ts` (image list, titles/alt text, categories), `src/pages/GalleryPage.tsx`, gallery styles in `globals.css`.
- Route graph entry (indexable, so it is in the sitemap), SEO title/description in `ssgSeo.ts`, a link in the Hardware menu group and in the footer About column.
- Page markup has ImageGallery + ImageObject JSON-LD and breadcrumbs. No brand or model name is claimed as endorsed; the page says so.

## Notes
- Alt text and captions come from the file names (no "Kuwait"); edit titles in `src/data/gallery.ts`.
- Validated with `npm run build` (97 routes), content integrity and link audit.
- After deploying, submit `/gallery` in Search Console (URL Inspection → Request indexing).
