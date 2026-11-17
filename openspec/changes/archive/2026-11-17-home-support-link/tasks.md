## 1. Home page

- [x] 1.1 `end.support` in every home page dictionary and the link in the closing line of `HomeStory.astro`. Verify `npm test` (the dictionaries' shape test) passes.
- [x] 1.2 The no-JavaScript browser test checks the link on the English and German home pages. Verify `npm run test:browser` passes for `tests/no-js.spec.ts`.

## 2. Checks

- [x] 2.1 `npm run build`, `npm run check`, `npm run check:dist`, `openspec validate --all --strict`. Verify all pass.
