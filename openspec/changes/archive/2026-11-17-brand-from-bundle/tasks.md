# Tasks

## 1. The mark from the bundle

- [x] 1.1 Write tests first in `scripts/test/brand.test.mjs`: `brandIcons(bundleDir)` returns the favicon byte-identical to `brand/mark-colour.svg` and a touch-icon SVG without `rx`; the 180 px touch icon PNG is opaque and its corner pixel is the slate square; `public/` holds no `favicon.svg`, `apple-touch-icon.png`, `pwa-512.png`, `og.png` or other copy of the mark. Verify they fail (`npm test`).
- [x] 1.2 Add `scripts/lib/brand.mjs` and the `bundleBrand()` integration in `astro.config.mjs` (D1), and remove the four files from `public/assets/`. Verify that `npm test` passes, and that after `npm run build`, `dist/assets/favicon.svg` equals `.bundle/brand/mark-colour.svg` (`cmp`).
- [x] 1.3 Make `cardSvg` take the mark and nest it (D2), and make `scripts/og.mjs` pass the bundle's mark. Update `scripts/test/og.test.mjs` first: the card contains the bundle mark's paths and no longer the hand-drawn tick. Verify with `npm test`, and look at a built card in `dist/og/`.

## 2. Checks

- [x] 2.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist` and `npx --yes @fission-ai/openspec@1.13.2 validate --all --strict`. Verify that all pass and that the home page at 360 px shows the bundle's mark in the header (screenshot of the built site).
