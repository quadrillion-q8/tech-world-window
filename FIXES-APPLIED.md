# V1 build and SSG fixes applied

This project includes the following build/SSG fixes:

1. Added `@types/node` to `devDependencies` and `node` to the TypeScript `types` list so the build scripts can use `node:fs`, `node:path`, and `process`.
2. Made the sitemap article lookup map explicitly keyed by `string` to match the route graph's path type.
3. Removed the unused `Author` import from `src/data/articles.ts`.
4. Removed the Rollup `manualChunks` rule that manually grouped React packages. With `vite-react-ssg`'s SSR build, React is externalized and that manual chunk rule causes Rollup to fail with `EXTERNAL_MODULES_CANNOT_BE_INCLUDED_IN_MANUAL_CHUNKS`.
5. Added a build-time `onPageRendered` SEO layer. It deterministically injects route-specific title, description, robots, canonical, Open Graph, Twitter, Article/Breadcrumb/WebSite JSON-LD, and publication metadata into each prerendered HTML file. This makes the static HTML SEO output independent of client-side head hydration.
6. Strengthened validation so it checks the exact expected canonical URL and title, a route-specific description, structured data, and the full prerendered HTML set.
7. Kept `vite-react-ssg`'s `Head` support in the React pages for runtime/navigation behavior, while the SSG post-processor provides a deterministic build-time guarantee for the files served to crawlers.

The intended production pipeline is:

`routeGraph → navigation/sitemap → TypeScript check → vite-react-ssg client build → vite-react-ssg server/SSG build → onPageRendered SEO injection → prerender validation`

On Windows, run `npm install` and then `npm run build` from the folder containing `package.json`.
