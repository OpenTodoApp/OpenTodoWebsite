# Tasks

## 1. Page selection

- [x] 1.1 Write `scripts/test/pages.test.mjs` first: routes and their order, the sample (largest page per template, every home page, no docs, unmatched pages included, a new template included), changed pages from hashes, and `BROWSER_PAGES`. Verify it fails, then passes with `scripts/lib/pages.mjs` (`npm test`).
- [x] 1.2 Add `scripts/checks/pages.mjs` and make `tests/pages.ts` use `browserPages`; add `test:browser:full`. Verify `npx playwright test --list` counts 273 tests and `BROWSER_PAGES=all` 987, and that `npm run test:browser` passes.

## 2. Workflow

- [x] 2.1 Add the `changes` job, the page choice, the hashes, the caches, the Docker condition, `schedule`, `workflow_dispatch` and the nightly alert to `.github/workflows/checks.yml`; add `scripts/ci/nightly-alert.sh`. Verify the alert with `DRY_RUN=1` for a red and a green result.
- [x] 2.2 Verify on the pull request: the template set runs, the image builds (the workflow changed), and a manual run checks every page and saves the hashes.
- [ ] 2.3 After merging, measure a content-only pull request (a blog post) and a layout pull request against the timings in design.md.

## 3. Docs and checks

- [x] 3.1 Describe the modes in README.md and AGENTS.md. Run `npm test`, `npm run check` and `npx --yes @fission-ai/openspec@1.13.2 validate --all --strict`. Verify all pass.
