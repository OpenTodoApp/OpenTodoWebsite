## 1. Strip

- [x] 1.1 `src/lib/survey.mjs` with the address, the end date and `surveyActive(date)`. Verify `npm test` (`scripts/test/survey.test.mjs`: shown on 2026-12-11, gone on 2026-12-12).
- [x] 1.2 `common.survey` in every dictionary. Verify `npm test` (`scripts/test/i18n.test.mjs`: every language has the English survey strings).
- [x] 1.3 `SurveyStrip.astro` in `Base.astro`, the head script and the styles. Verify `npm run build` and `npm run check:scripts` (no third-party script).
- [x] 1.4 Browser tests: visible without JavaScript at 360 px without the close button, closed by keyboard and gone on the next page. Verify `npm run test:browser`.

## 2. Checks

- [x] 2.1 `npm run build`, `npm run check`, `npm test`, `npm run check:dist`, `npm run test:browser`, `openspec validate --all --strict`. Verify all pass.
