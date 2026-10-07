# Tech World Window — Launch & Impression Checklist

This checklist is for the first indexing phase after the codebase is deployed.

## 1. Domain and deployment

- [ ] Register/activate `techworldwindow.com`.
- [ ] Connect the domain to the Vercel project.
- [ ] Confirm `https://techworldwindow.com/` returns HTTP 200.
- [ ] Confirm `https://techworldwindow.com/robots.txt` returns HTTP 200.
- [ ] Confirm `https://techworldwindow.com/sitemap.xml` returns HTTP 200.
- [ ] Confirm the sitemap contains the current 62 indexable routes.
- [ ] Confirm a representative article returns HTTP 200 directly, not only after client-side navigation.

## 2. Google Search Console

Create a **Domain property** for `techworldwindow.com` and submit:

`https://techworldwindow.com/sitemap.xml`

Then inspect these pages first:

- `/`
- `/windows`
- `/windows-troubleshooting-complete-guide`
- `/windows-11-wifi-connected-no-internet`
- `/pc-game-stuttering-fix-frame-time`
- `/how-to-check-ssd-health-windows`
- `/tools`
- `/tools/pc-bottleneck-calculator`
- `/about`
- `/authors/imran-natiq`

Do not repeatedly request indexing for every URL. Submit the sitemap and let the internal links distribute discovery.

## 3. Trust and editorial signals added in this release

- Article bylines now link directly to the author profile.
- Articles now contain a stronger author/evidence section.
- Articles link to the testing methodology and editorial policy.
- The author page now links into methodology, research, policy and practical guides.
- Static pages now expose breadcrumb structured data.
- Organization structured data now describes the site's core technical subjects.
- The Tools mega-menu exposes all four calculators instead of only the bottleneck calculator.

## 4. What to do after indexing begins

Do not immediately publish dozens of unrelated posts.

Prioritize:

1. Windows troubleshooting cluster depth.
2. PC gaming performance cluster depth.
3. Hardware diagnostics cluster depth.
4. Original testing/research with real measurements.
5. Useful tools that link into explanatory guides.
6. Genuine external mentions and community discovery.

## 5. Evidence standard for new articles

For hands-on claims, record where practical:

- device/component tested
- CPU/GPU/SSD/RAM model
- operating system and version
- driver/firmware version
- workload or game
- settings
- measurement tool
- duration
- relevant ambient conditions
- limitations
- what changed and what was retested

Never describe an untested product or result as personally tested.

## 6. First 30-day measurement goals

Watch Search Console for:

- Indexed pages
- Impressions
- Queries producing impressions
- Pages receiving impressions
- Average position by cluster
- Crawled but currently not indexed
- Discovered but currently not indexed
- Duplicate/canonical issues
- Search appearance enhancements

The first objective is **crawl + index + query discovery**, not immediate high rankings.
