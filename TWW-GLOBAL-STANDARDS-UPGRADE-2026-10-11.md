# TWW global-standards upgrade — 2026-10-11

No routes, URLs or article content were added or removed. `npm run build` and both validators pass (95 pages).

## Accessibility (WCAG 2.2 AA)
- axe-core scan of all 95 prerendered pages: 0 violations (was failing on every page).
- Text colours raised to >= 4.5:1 (`--muted`, card meta, reading time, eyebrow, breadcrumbs, article links, footer on dark).
- Footer links meet the 24px target-size rule (WCAG 2.5.8).
- Global `:focus-visible` outline; unique landmark labels on article "Related guides"; hidden h2 on category pages to fix heading order.

## Privacy (GDPR / ePrivacy / UK PECR / CPRA)
- GA4 no longer loads until the visitor presses Accept. Decline loads nothing.
- Google Consent Mode v2 defaults to denied; ad storage / personalisation never granted.
- Global Privacy Control browser signal is treated as Decline.
- "Privacy choices" link in the footer reopens the banner. Privacy policy text updated to match.
- Files: `src/lib/consent.ts`, `src/components/ConsentBanner.tsx`, `src/layouts/RootLayout.tsx`.

## Security (vercel.json)
HSTS (preload), CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP.
Note: CSP keeps `'unsafe-inline'` for scripts because vite-react-ssg emits two small per-page inline scripts.

## Performance
- Footer logo 753 KB -> 23 KB (WebP), header mark 330 KB -> 6 KB (WebP), favicon 125 KB -> 22 KB, OG image 422 KB -> 256 KB (same URL).
- Immutable 1-year cache on /assets, 30-day cache on images/icons. Framework code split into a `vendor` chunk.
- Width/height on header and footer images (no layout shift).

## Metadata / PWA
`site.webmanifest`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, SVG favicon link.

## Not done (needs a decision)
- Arabic / RTL version and hreflang.
- Per-route lazy loading of article data (main JS is still ~550 KB + 308 KB vendor).
- Self-hosted web fonts.
