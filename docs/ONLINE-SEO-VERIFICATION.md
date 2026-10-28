# Online-only TWW raw HTML verification

This check runs on GitHub's hosted runner. You do not need a local computer folder, terminal, or local workspace.

## How to run it after this pull request is merged

1. Open the repository: https://github.com/quadrillion-q8/tech-world-window
2. Select the Actions tab.
3. Choose Googlebot-like raw HTML verification from the workflow list.
4. Click Run workflow, keep the branch as main, then click the green Run workflow button.
5. Open the new workflow run. At the bottom, download the artifact named tww-googlebot-raw-html-...
6. Open report.md first. The .html files contain the raw responses before JavaScript runs; report.json contains the structured results.

## What the check examines

- HTTP status and final URL after redirects
- Raw title, canonical, and meta robots
- H1 and H2 headings visible in the unhydrated HTML
- Approximate visible text length in the main/body
- Input, select, button, textarea, and form counts in the raw HTML
- The complete raw HTML response for each target URL

The request uses a Googlebot-like user-agent string, but this is only a user-agent simulation from GitHub's runner, not proof of a genuine Googlebot crawl. The script reports an inconclusive result if the runner cannot fetch a page.

## Privacy

Only the two public production pages are fetched. The resulting raw HTML artifacts are retained by GitHub Actions for seven days. No Search Console exports or credentials are needed for this check.
