# Tasks

## 1. The assets

- [x] 1.1 Write `scripts/test/presskit.test.mjs` first. Against a fake bundle with `brand/kit/`: the groups (lockup, mark, app icon, social images, README) and their files are listed, and every href names a file in the bundle. Against a fake bundle without the kit: only the four basic files are listed. Verify it fails (`npm test`).
- [x] 1.2 Add `scripts/lib/presskit.mjs` (D2), and extend `bundleBrand()` to copy and serve `brand/` (D1). Verify that `npm test` passes, and that `dist/brand/mark-colour.svg` equals the bundle's after `npm run build`.

## 2. The page

- [x] 2.1 Add `src/pages/press-kit.astro` (D3) and the footer link. Verify that `npm run check`, `npm run build` and `npm run check:dist` pass against the pinned v0.22.0, and again with `BUNDLE_DIR` set to a local bundle that has the kit. Take a screenshot of each at 360 px with JavaScript off, and at desktop width.

## 3. Checks

- [x] 3.1 Run `npm test` and `npx --yes @fission-ai/openspec@1.13.2 validate --all --strict`. Verify both pass.
