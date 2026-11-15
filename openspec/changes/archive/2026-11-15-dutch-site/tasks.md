# Tasks

## 1. Dutch

- [x] 1.1 Add `nl` (Nederlands, `nl`, `nl_NL`) to `LANGS` and the locales in `astro.config.mjs`; `src/i18n/nl.mjs` with every string of the German dictionary in Dutch, in the app's own Dutch terms (`web/src/locales/nl.json` in the app repository). Verify `npm test` passes (the shape test covers the new dictionary).
- [x] 1.2 Update the tests that list the home page languages. Verify `npm test` and the no-JavaScript browser test pass for `/nl/` and `/nl/apps/`.

## 2. Chinese note

- [x] 2.1 `zh.mjs` `common.langNote`: the app is in Simplified Chinese too; quick add reads the six other languages. Verify the built `/zh/` shows it.

## 3. Check and publish

- [x] 3.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`. Verify all pass.
- [x] 3.2 Merge together with the pin of the first release whose language documentation lists Nederlands; before that the pull request stays a draft. Verify the pinned bundle's `docs/language/` names Nederlands before merging.
