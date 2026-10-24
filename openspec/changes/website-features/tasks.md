# Tasks

## 1. Data

- [x] 1.1 Write `src/lib/features.ts` (D1, D3) with the six groups, `since` for the entries added in 0.10 and 0.11, integrations and import apps. Verify the build passes against v0.9.0 and lists 43 features, and against a local 0.11 preview bundle (`BUNDLE_DIR`, not committed) lists 54.
- [x] 1.2 Verify that a misspelled `doc` on a shipped entry fails the build naming the feature (try it, then revert).

## 2. Page

- [x] 2.1 Build `src/pages/features.astro` and its styles (D2). Verify at 360 and 1280 px, light and dark, that rows read, the aside is sticky from 1024 px, and no page scrolls sideways (`npm run test:browser`).
- [x] 2.2 Point `NAV.features` to `/features/`. Verify `npm run check:dist` finds no broken link.

## 3. Checks

- [x] 3.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`; capture the page at 1280 and 390 px. Verify all pass.
