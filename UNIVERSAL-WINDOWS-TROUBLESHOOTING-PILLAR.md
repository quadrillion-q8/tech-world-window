# Universal Windows Troubleshooting Pillar

- **URL:** `/windows-troubleshooting-complete-guide`
- **Role:** Windows pillar (international informational / problem-solving intent)
- **Source:** `src/data/windows-troubleshooting-pillar.ts` (moved out of `articles.ts`)
- **Length:** about 6,100 words, 28 sections, 7 reference tables, 10 FAQs, 4 verified Microsoft sources
- **Updated:** 2026-10-06

## What changed in this upgrade

**Content**
- Symptom-first triage table at the top, linking to sections and to specialist guides.
- Windows 11 *and* Windows 10 scope, including Windows 10 end of support (Oct 14, 2025).
- Editions and display-language guidance (codes and commands are language-independent).
- BitLocker / recovery-key safety step before invasive repairs.
- Event Viewer table (Kernel-Power 41, BugCheck 1001, Disk 7/51/153, Ntfs 55, WHEA-Logger, Display 4101, etc.).
- Language-independent command table (`perfmon /rel`, `eventvwr.msc`, `mdsched.exe`, `ms-settings:` URIs, Win+Ctrl+Shift+B).
- 15-row stop-code table, Windows Update error-code table, recovery-ladder table.
- New sections: boot-loop steps and Quick Machine Recovery, in-place repair / "Fix problems using Windows Update", malware vs Windows faults, troubleshooting log, specialist-guide hub table.
- DISM-before-SFC order, now matching Microsoft's guidance.

**Rendering and SEO** (`ArticlePage.tsx`, `SEOEngine.tsx`, `ssgSeo.ts`)
- New optional `Article` fields: `seoTitle`, `metaDescription`, `appliesTo`; new section fields: `table`, `steps`.
- `seoTitle` / `metaDescription` override the title and description used in search results (the long `dek` was being used as the meta description before).
- Article JSON-LD now includes `articleSection`, `keywords`, `wordCount`, `inLanguage`, `isAccessibleForFree`, and author `url` / `jobTitle`.
- Accessible, responsive tables (caption, `scope`, keyboard-focusable scroll region), numbered steps, inline `code`, scrollable TOC.
- Heading anchors no longer end with a stray hyphen (shared `headingId()` helper).

**Validator** (`scripts/validate-build.ts`) now also fails the build on:
- duplicate or empty heading anchors;
- table rows with the wrong number of cells;
- table links to missing routes or missing in-page anchors;
- `seoTitle` over 65 characters, or `metaDescription` outside 70-160 characters;
- non-HTTPS sources; backticks inside FAQ answers (they would leak into FAQPage JSON-LD);
- prerendered HTML missing the tables, steps, or `wordCount`.

## Internal-link design note
The site validator requires `relatedArticles` to be reciprocal and cluster articles to stay in one category, so the pillar's `relatedArticles` still lists only the three Windows network guides. Links to Gaming and Hardware guides are done through in-article table links instead, which are validated against the route graph without needing reciprocal edges.

## Verification
`npm ci && npm run build` passes: typecheck, SSG build of 24 routes, and the full validation gate.
