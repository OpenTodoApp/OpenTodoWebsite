# Tasks

## 1. The page and the header

- [x] 1.1 Extend `scripts/test/hosting.test.mjs` first: `/hosting/` has the headline, four points, the steps, the disclosure, links to `/self-host/` and `/install/` and exactly one primary button, to PikaPods; every page's header lists Features, Learn, Docs, Blog, Hosting in order, desktop and phone menu, Hosting current only on `/hosting/` and no header link to PikaPods; the ban covers "recommended" and "easiest" and names `/hosting/`; `search.json` has `/hosting/`. Verify it fails.
- [x] 1.2 Add `PIKAPODS_FACTS` to `src/lib/hosting.ts`, the page `src/pages/hosting.astro`, the header entry and the search entry. Verify the test passes.
- [x] 1.3 Look at the header and the page at 390, 768 and 1280 px, light and dark: one line at 768 px, no sideways scrolling.

## 2. Checks

- [x] 2.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser -g "hosting|home|start"` and `npx --yes @fission-ai/openspec@1.13.2 validate --all --strict`.
