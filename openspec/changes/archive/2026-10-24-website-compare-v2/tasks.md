# Tasks

## 1. Compare

- [x] 1.1 Move the FAQ into `src/lib/faq.ts` and rebuild `/vs/` with the comparison cards, What it costs and Questions (D1, D2). Verify the built page has `#cost` and `#faq`, a FAQPage JSON-LD with 11 questions, and no currency sign.
- [x] 1.2 Remove `/cost/`, `/faq/` and their translations, the `cost` and `faq` dictionary blocks, and set `TRANSLATED_PAGES` to the home page (D3). Verify `npm test` (the dictionary shape test) passes and the translated homes link `/vs/#cost`.

## 2. Redirects

- [x] 2.1 Add the redirects to `nginx.conf` with `# e.g.` samples for the language patterns. Verify `npm run check:redirects` reports every target and fragment built.

## 3. Checks

- [x] 3.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`; capture `/vs/` at 1280 and 390 px with the old `/cost/` and `/faq/` as before. Verify all pass.
