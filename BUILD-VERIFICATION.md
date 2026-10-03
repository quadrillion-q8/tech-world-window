# Build verification notes

The V1 production build is intentionally gated by:

```text
routeGraph
  -> sitemap + robots
  -> TypeScript check
  -> vite-react-ssg client build
  -> vite-react-ssg server/SSG build
  -> prerendered route HTML
  -> build-time SEO injection
  -> validation
```

The validation script expects all 16 indexable graph routes to have nested prerendered `index.html` files in `dist/`.

It also verifies, for every indexable route:

- route-specific `<title>`
- exact canonical URL
- route-specific meta description
- rendered Tech World Window content
- JSON-LD structured data

The SSG layer uses `vite-react-ssg`'s documented `onPageRendered` hook to make the final crawler-facing HTML deterministic. The React pages still use `Head` for runtime/document-head behavior, while the build-time hook guarantees static SEO output.

On Windows:

```bash
npm install
npm run build
npm run preview
```

Do not submit URLs to Google Search Console until `npm run build` ends with `Validation passed`.
