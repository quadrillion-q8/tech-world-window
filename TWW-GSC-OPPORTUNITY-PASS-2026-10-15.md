# TWW Search Console Opportunity Pass — 2026-10-15

## Scope
Focused on improving the next-step internal-link pathways for existing pages surfaced in the 2026-10-15 Google Search Console export. No new URLs were created and existing SEO titles/meta descriptions were left unchanged because the available query samples are small.

## Changed
- `src/data/content-enhancements.ts`
  - Added contextual links from the shader-compilation stutter diagnosis to the broader PC game stuttering guide and frame-time analyzer.
  - Added contextual links from the GPU frame-time spike diagnosis to the frame-time analyzer, broader stuttering guide, and shader-compilation diagnosis.
  - Added contextual links from the NVMe temperature diagnosis to SSD health checks, SSD slowdown troubleshooting, and the SSD temperature research page.

## Validation performed
- Confirmed each new link target exists in `src/data/graph.ts`.
- Attempted `npm ci --no-audit --no-fund` twice, but dependency installation timed out in this environment. Therefore the production build and full validators have **not** been confirmed locally; Vercel/CI validation is still required before merge/deploy.

## Deliberately not changed
- No new articles were added.
- No titles/meta descriptions were changed on the basis of very small impression counts.
- No canonical/redirect configuration was changed without a live-domain verification.
