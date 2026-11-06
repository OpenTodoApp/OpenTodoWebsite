# Tasks

## 1. Four ways in

- [x] 1.1 Add a test to `scripts/test/hosting.test.mjs` first: every home page has four cards in `#get-it`, the second links PikaPods, cards two to four have the same button class, and no header or nav link names PikaPods. Verify it fails.
- [x] 1.2 Add the hosted card to `HomeStory.astro` and the strings to all seven dictionaries (title "Four ways in.", the new intro). Verify the test and the i18n shape test pass.
- [x] 1.3 Grid: one column, two from 768 px, four from 1100 px. Look at it at 390, 768, 1024 and 1280 px, light and dark: no sideways scrolling.

## 2. Checks

- [x] 2.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser` on the home pages, and `npx --yes @fission-ai/openspec@1.13.2 validate --all --strict`.
