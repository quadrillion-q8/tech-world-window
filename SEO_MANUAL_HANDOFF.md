# TWW — Phase 2A release and indexing handoff

Canonical: https://www.techworldwindow.com (no trailing slash on non-root routes).
Repository: quadrillion-q8/tech-world-window; baseline main f24b6a7 (143 indexable routes).
Keep all existing public URLs, article content, UI, DNS, and redirect destinations unchanged.

## Release blocker
The connected Vercel team currently returns only KCROC; TWW project and www.techworldwindow.com alias were not found in that scope. GitHub baseline Vercel status links to a build-rate-limit failure. Do not create a replacement project, transfer domains, alter DNS or merge/release before verifying the original project's access and a valid preview. Check Vercel dashboard for the project owning the production domain, reconnect/authorize that project, confirm build quota and production branch, and identify the currently serving commit. No paid upgrade is assumed.

## Release checks
1. npm ci && npm run build; exact sitemap/SSG parity (143 public HTML routes plus static 404), robots and JSON-LD checks must pass.
2. Verify preview build for the exact PR commit; Vercel preview/outdated deployment URLs should emit X-Robots-Tag: noindex (or be protected). Do not bake environment-specific noindex into promotable static HTML.
3. Check unknown URL serves actual HTTP 404 and custom HTML with noindex, not a catch-all 200. Do not add an SPA fallback rewrite. The direct /404.html artifact is excluded from the sitemap.
4. Verify production canonical www URLs return 200 with no index blocking, apex redirects to www, tracking parameters retain clean canonical, robots is text/plain and sitemap is XML. Run REQUIRE_CUSTOM_404=1 node scripts/smoke-test-live-site.mjs after release; preserve existing historical redirect checks.
5. Investigate historical /windows-second-monitor-not-detected (404) in GSC and history before choosing any redirect; no equivalent confirmed in current inventory. Do not redirect unrelated pages to home. Old vercel.app alias is not under verified control.
6. Google Search Console: verify domain property/DNS ownership (do not replace an existing token), submit https://www.techworldwindow.com/sitemap.xml, use URL Inspection live test for homepage, /windows, /guides, /tools and historical affected URLs, request indexing only where needed, review Page Indexing, Crawl Stats and Core Web Vitals. HTTP 200 and canonical correctness do not guarantee indexing.
7. Bing Webmaster Tools: verify site, submit same sitemap and inspect representative URLs.
8. Robots: approved policy explicitly allows search/retrieval and training agents; /admin/ and /api/ are reserved, not security boundaries. Do not block noindex pages via robots. If training preference changes, edit the generator policy separately. Review actual crawl access after release.

International publisher, not a local service business: do not add local NAP or fabricated credentials. Remaining authority/SEO handoff work belongs to later phases.

## Phase 2E — Editorial authority and off-site work
- Verify the author’s actual public professional profile, credentials and photo with the owner before adding sameAs, qualifications, years of experience or a portrait. Do not invent affiliations, awards, certifications or testimonials.
- Original research: publish a real test record only after running the documented protocol. Include configuration, versions, conditions, tools, repetitions, measurements and limitations. Preserve raw evidence with private identifiers removed.
- Sources: verify linked documentation and exact SKU/version; the automated audit checks source registry/rendering parity, not the truth or live availability of an external claim. Record material corrections; do not refresh dates without substantive changes.
- Commercial readiness: verify affiliate relationships and disclosure placement before adding monetized links; review privacy and applicable disclosure rules separately. Do not claim approval, revenue or hands-on tests without evidence.
- International discovery: submit the existing sitemap through verified search properties, monitor queries and indexing, and earn relevant editorial citations through useful original work. Do not purchase links or fabricate third-party endorsements. No off-site account or outreach action has been performed by this change.
