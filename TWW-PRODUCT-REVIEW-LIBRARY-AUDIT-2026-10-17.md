# TWW Product Review Library Audit — 2026-10-17

## Findings

The original library did not contain TWW hands-on reviews for GPUs, laptops or CPUs. The existing Samsung 990 PRO 4TB entry and Crucial T500 2TB entry were both marked spec-profile; their pages correctly said they were not TWW lab reviews, but the broader navigation and page titles still used review-oriented wording. GPU, laptop and CPU hubs mostly linked to troubleshooting guides instead of named products.

This update does not fabricate TWW test results. All eight entries are marked spec-profile, and all product pages display that TWW has not physically tested or independently benchmarked those products. The new GPU, CPU and laptop entries link to manufacturer specifications plus published independent testing. Outside results are labeled as outside findings, not TWW measurements.

## Product library after this change

| Category | Product | Evidence |
| --- | --- | --- |
| SSD | Samsung 990 PRO 4TB | Samsung official sources; specification profile |
| SSD | Crucial T500 2TB | Crucial official source; specification profile |
| GPU | NVIDIA GeForce RTX 5080 Founders Edition | NVIDIA official specifications + Tom's Hardware review |
| GPU | AMD Radeon RX 9070 XT | AMD official specifications + TechSpot 52-game comparison + Tom's Hardware review |
| CPU | AMD Ryzen 7 9850X3D | AMD official specifications + Tom's Hardware review |
| CPU | Intel Core Ultra 5 250K Plus | Intel official specifications + Tom's Hardware review |
| Laptop | Lenovo Legion Pro 7i Gen 10 (RTX 5080 configuration) | Lenovo PSREF + Notebookcheck + Tom's Hardware reviews |
| Laptop | HyperX OMEN MAX 16 (RTX 5090 configuration) | HP product specification + Tom's Hardware review |

Source URLs are kept in src/data/products.ts; the product pages render source attribution by source type. Configurations vary by region and SKU, so laptop pages specifically warn readers to verify the exact machine type/model.

## Implemented

- Expanded the product data model from SSD-only to SSD, GPU, Laptop and CPU.
- Added six product-specific specification profiles with source links and independent-review summaries.
- Converted product route registration in src/data/graph.ts to derive routes from the product data source; these routes feed SSG, sitemap generation and link/route validation.
- Made ProductReviewPage category-aware with dynamic breadcrumbs, clear testing-status disclosure, specs, practical pros/limitations, independent source findings and manufacturer-source lists.
- Populated the /reviews, /reviews/gpus, /reviews/laptops and /reviews/cpus hubs from product data rather than leaving them as guide-only pages.
- Updated hub title/description metadata and removed stale fixed SEO titles that called specification profiles “Reviews”.
- Corrected a Lenovo configuration mismatch: Notebookcheck's test unit is listed with 32GB DDR5-6400 and a 1TB SSD; retail/PSREF configurations vary. The profile calls this out rather than conflating the test sample with another SKU.
- Added responsive styling for product shelves, source-aware cards and status panels.
- Added build validation that checks product route registration, unique product paths, source integrity, manufacturer source links, external review attribution for non-SSD product profiles, and visible testing disclosures in prerendered HTML.

## Editorial boundaries

- No invented TWW review scores, “tested by TWW” badges, affiliate links, product prices or benchmark numbers were added.
- The existing structured data intentionally remains WebPage/about Thing rather than Product rich-result markup until the page meets the project's policy for real review or offer data.
- These entries are product-specific profiles with research links, not a claim that TWW has already built a hands-on laboratory review program.

## Build and deployment validation required

Run the existing repository validation path before considering the change complete:

    npm ci
    npm run build
    npm run audit:links

Check /reviews, each of the four category hubs, the eight product pages, generated sitemap entries and source links. Verify that the product route prerenders contain the visible TWW testing-status disclosure. The Vercel/GitHub status on the pull request is the source of truth for remote build success.