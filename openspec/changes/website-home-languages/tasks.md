# Tasks

## 1. Translated home pages

- [x] 1.1 Move the English home copy into `src/i18n/en.mjs` and render the home page through `src/components/home/HomeStory.astro` (D1). Verify the built `/` has the same sections, links and text as before (`npm run check:dist`, screenshots at 390 and 1280 px).
- [x] 1.2 Render `src/pages/[lang]/index.astro` through the same component and rewrite the `home` strings of de, fr, it, es and pt in the English shape, removing the old ones (D1, D2). Verify `npm test` (shape test against English) and screenshots of `/it/` and `/de/` in light and dark.

## 2. Footer

- [x] 2.1 Make the footer compact below 768 px (D3). Verify with Playwright that the footer is at most 600 px tall at 390 px, every group opens without JavaScript to the same links as the desktop lists, and the desktop footer is unchanged at 1280 px (`npm run test:browser`).

## 3. Checks

- [x] 3.1 Run `npm run build`, `npm run check:dist`, `npm test`, `npm run check`, `npm run test:browser` and `openspec validate --all --strict`; report the phone height of `/` before and after. Verify all pass.
