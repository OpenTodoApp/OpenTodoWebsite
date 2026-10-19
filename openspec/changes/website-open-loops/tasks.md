# Tasks

## 1. Reading the method

- [x] 1.1 Copy the vocabulary the app's `methodVocabulary()` generates into `scripts/test/fixtures/method.json`; verify it parses and lists the five moves
- [x] 1.2 Add `readMethod(dir)` to `scripts/lib/bundle.mjs` (null without `method.json` or without `vocabulary` in the manifest's `method` fact; an error naming the field on an unknown schema or a missing move) with tests against the fixture; verify `npm test`
- [x] 1.3 Export `method`, `term()` and the move-to-screen lookup from `src/lib/bundle.ts`, and `methodPage(lang)` from `src/lib/nav.ts`; verify `npm run check`

## 2. The page

- [x] 2.1 Build `LoopDiagram.astro` (cycle on a circle from 560 px, SVG arrows in tokens, centre panel, moves as links to the full list, island script setting `aria-current` and an `aria-live` panel, ordered list without JavaScript); verify with a temporary `BUNDLE_DIR` build of a local 0.8.0 bundle that keyboard and pointer choose a move and that the list shows without JavaScript
- [x] 2.2 Build `src/pages/open-loops.astro` from the section types with the eight sections of the design, every section linking its `/docs/method/` chapter; verify `npm run check:links` on the preview build and the composition check
- [x] 2.3 Show the Loop home captures through a `docs` option of `ScreenshotFrame` with the `loop` crop box; verify light and dark at 1280 and 360 px on the preview build
- [x] 2.4 Add `/open-loops/` to the composition check's pages and add browser tests (moves in `method.json` order with their words, keyboard choice, no-JavaScript list, no loop script on `/`), skipped when the page is not built; verify they pass on the preview build and skip on the 0.7.0 build

## 3. Translations

- [x] 3.1 Add the `method` block to the five dictionaries and `src/pages/[lang]/open-loops.astro`, built for each site language that `method.languages` lists; add `/open-loops/` to the translated pages when the method exists; verify `i18n.test.mjs` and that `/it/open-loops/` shows the Italian move names from the fixture on the preview build

## 4. Links in

- [ ] 4.1 Add Open Loops to the Resources menu, the phone menu and the footer through `methodPage()`; verify the 0.7.0 build has no link to `/open-loops/` (`npm run check:links`, `tests/no-js.spec.ts`) and the preview build has them
- [ ] 4.2 Add the conditional links from the GTD guide, the weekly review template, the quiz results and Help; verify the help link test and the link check on both builds

## 5. Integration

- [ ] 5.1 On the 0.7.0 build, run `npm run build`, `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser`; all pass and no `/open-loops/` page exists. On the preview build of a local 0.8.0 bundle, run the same checks; all pass and the page and its links exist. Record both in the pull request
