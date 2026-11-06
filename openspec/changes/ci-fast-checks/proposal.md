# Proposal: ci-fast-checks

## Why

The website checks take 8 to 15 minutes on every pull request, most of it in the browser suite: axe in light and dark at 360 and 1280 px, the 768 px width check and the no-JavaScript pass, on every one of about 160 pages (about 990 browser tests). A blog post waits as long as a change to the layout. Most of those pages share a template, so one page of each template finds what the rest would. The build spends two minutes optimising the same images again on every run, and the container image is built for changes that cannot affect it.

## What Changes

- **Pull requests check one page of every template.** The per-page browser checks visit one page per page template in `src/pages/` (the largest one), every page of a template under `[lang]` (the home page in each language), and every page no template accounts for. The set is derived from the templates and the built pages on each run, so a new template is covered with no change to the checks. `npm run test:browser` runs this set; `npm run test:browser:full` runs every page.
- **A change to content alone checks the pages it changed.** When a pull request only changes Markdown or images under `src/content/`, the browser checks visit the pages whose HTML differs from the last build of `main` (each run on `main` records a hash per page). Without a recorded build they visit the template set. The build, `astro check`, `check:dist` and the unit tests run on every pull request as before. A `bundle.json` change is never content alone.
- **Every page on main, nightly and on demand.** Pushes to `main`, a nightly run and a manual run check every page. A failed night opens, or comments on, one issue labelled `ci-nightly`; the next green night closes it.
- **The image is built when it can change.** On pull requests the Docker job runs only when the Dockerfile, the server configuration, the packages, the pin, the build configuration or the scripts the image build runs change; it always runs on `main` and nightly. No check is required by the repository's ruleset, so a skipped job blocks nothing.
- **Caches.** The pinned bundle is cached by its version and download address, and Astro's optimised images by the packages and image sources (Astro keys each image by its source and options, so a partial match is safe).

## Out of scope

- The docs under `/docs/`: they are the bundle's pages copied byte for byte, checked by the app, and the browser checks have never visited them.
- Splitting the full suite across several jobs; the full run is not on the path of a pull request.
- The Templates workflow.

Pages affected: none; this changes how the website checks run.

No new build dependency.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-platform`: the requirement "Website checks" says which pages a pull request checks in the browser, and that `main`, the nightly run and a manual run check every page.

## Impact

`.github/workflows/checks.yml`; new `scripts/lib/pages.mjs`, `scripts/checks/pages.mjs` and `scripts/ci/nightly-alert.sh`, with `scripts/test/pages.test.mjs`; `tests/pages.ts` selects the pages; `package.json` gains `test:browser:full`; README and AGENTS.md describe the modes.
