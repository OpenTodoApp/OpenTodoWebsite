# Design: ci-fast-checks

## Context

See proposal.md. The checks workflow runs one `site` job (unit tests, build, `astro check`, `check:dist`, the Playwright suite) and one `docker` job on every pull request and push to `main`. Measured on recent runs: the browser suite 245 to 455 s, the build 71 to 136 s (of which about 1 s fetches the bundle, under 1 s renders the pages, and 1 to 2 minutes optimises 378 images), the image 92 to 175 s. The per-page tests in `tests/a11y.spec.ts`, `tests/widths.spec.ts` and `tests/no-js.spec.ts` loop over `sitePages()` in `tests/pages.ts`; the other tests visit fixed pages.

## Decisions

### D1. The template set, derived from the routes

`scripts/lib/pages.mjs` reads the `.astro` files under `src/pages/` as routes (`index` is the folder, `[x]` one segment, `[...x]` any number) and assigns each built page to its most specific route, in Astro's order (a static segment before a parameter before a rest parameter). The sample is the largest page of each route, because it shows the most of what the template can render; every page of a route that starts with `[lang]`; and every page no route matches, so nothing falls out unnoticed. With today's site that is 43 of 162 pages and 273 of 987 browser tests. `tests/pages.ts` reads `BROWSER_PAGES` (`all`, `sample` by default, or `list` with `BROWSER_PAGES_FILE`), so local runs are fast too and `npm run test:browser:full` keeps the full suite one command away.

Alternatives considered: a hand-kept list of URLs (goes stale when a template is added), and the first page of each route by name (a short post exercises less of the template than a long one).

### D2. Changed pages from page hashes

Builds are deterministic (two builds give byte-identical HTML), so a page that a change affects is a page whose HTML differs. Every run outside pull requests records `{url: sha256}` for each page and saves it with `actions/cache` (key `page-hashes-<sha>-<run>`). A content-only pull request restores the hashes of its base commit, or the latest of `main`, and the browser checks visit the pages that differ or are new. This finds the post, the blog index and category pages, and any page that lists it, with no map from content collections to URLs. A stale record only adds pages. Content-only means every changed file is Markdown or an image under `src/content/`; the workflow's `changes` job decides it from the merge commit's diff against its first parent. Without a record the pull request falls back to D1.

### D3. The image only when it can change

The `changes` job also says whether the diff touches the `Dockerfile`, `.dockerignore`, `nginx.conf`, `package.json`, `package-lock.json`, `bundle.json`, `astro.config.mjs`, the social card fonts and scripts, the bundle scripts, or the workflow. The repository's ruleset for `main` requires pull requests but no status checks, so a skipped job needs no stand-in.

### D4. Full coverage on main and at night

Push to `main`, `schedule` (04:41 UTC) and `workflow_dispatch` set `BROWSER_PAGES=all` and run the image job. On `schedule` a final job runs `scripts/ci/nightly-alert.sh` (the app repository's approach): any failed job opens or comments on one `ci-nightly` issue, a green night closes it. The concurrency group includes the event, so a nightly run never cancels a push run.

### D5. Caches

`.bundle/` is cached under `site-bundle-<version>-<hash of its URL>`; `fetch-bundle.mjs` already reuses a folder whose recorded release matches the pin. Preview pins are not cached. The build's time is image optimisation, not rendering, so `node_modules/.astro/assets` (Astro's image cache, about 9 MB) is cached under the lockfile and a hash of the image sources, falling back to the newest cache for the same lockfile.

### D6. Effect on build time and download size

Visitors download nothing new. Locally a warm build takes 7 s against 68 s cold; the bundle cache saves about a second. The template set runs in about a quarter of the full suite's time.

## Risks / Trade-offs

- [A pull request can break a page the sample does not visit, for example one post's own Markdown] → A content change checks exactly the pages it changed, and the push to `main` runs every page, so the break is caught at the latest on merge; the nightly run reports it as an issue.
- [The image cache grows with images that are no longer used] → It is small; bump `astro-assets-v1` in the key to start afresh.
