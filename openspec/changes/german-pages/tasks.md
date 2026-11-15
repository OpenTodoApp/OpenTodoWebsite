# Tasks

## 1. Pages in some languages

- [ ] 1.1 `TRANSLATED_PAGES` becomes a map from English path to languages (D1); `alternatesFor` returns English plus the listed languages; `LangSwitch` links a missing language to its home page. Extend `scripts/test/i18n.test.mjs`: `/self-host/` and `/de/self-host/` have alternates for `en` and `de` only, `/fr/self-host/` is not translated, `/` keeps all seven. Verify `npm test` passes.
- [ ] 1.2 Build and check the head and sitemap: `/self-host/` lists `en`, `de` and `x-default` and no other language. Verify `npm run build && npm run check:dist` pass (the SEO check confirms the alternates are reciprocal and in the sitemap).

## 2. German self-hosting page

- [ ] 2.1 Move the body of `/self-host/` into `SelfHostPage.astro` with `lang` and `s`; give `InstallTabs`, `SyncPlayground` and `EndCta` an optional strings prop with today's English text as default (D2); English strings in `en.mjs` with a comment asking to update `de.mjs` with them. Verify the built `dist/self-host/index.html` has the same visible text as before (diff of the text content before and after).
- [ ] 2.2 German strings in `de.mjs` (`selfHost`, `installTabs`, `syncPlayground`, `endCta`) and the route `src/pages/de/self-host.astro` with `LangNote`. Extend the shape test to these strings for German. Verify `npm test` passes and `/de/self-host/` is built with `lang="de"`.

## 3. German Todoist switch guide

- [ ] 3.1 Add `lang` (default `en`) to the switch schema; filter `lang === 'en'` in `/switch/`, `/switch/[slug]`, `/start/` and `src/lib/learn.ts` (D4); move the template into `SwitchPage.astro` with a strings prop (`switchPage` in `en.mjs`). Verify the English switch pages' visible text is unchanged and `npm run build` passes.
- [ ] 3.2 `src/content/switch/de/todoist.md` (German text, the same facts) and `src/pages/de/switch/[slug].astro`. Test in `i18n.test.mjs`: same `checkedOn`, `sources`, `importFormat` and lengths of `keeps`, `drops`, `terms` as the English entry, naming the field that differs. Verify `npm test` passes and fails when the German `checkedOn` is changed by hand.

## 4. Check and document

- [ ] 4.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist` and `npm run test:browser`. Verify all pass.
- [ ] 4.2 View `/de/self-host/` and `/de/switch/todoist/` at 360 and 1280 px, light and dark, with and without JavaScript; check the language switch on both leads to `/self-host/` or `/switch/todoist/` for English and to `/fr/` for French. Verify by screenshots attached to the pull request.
- [ ] 4.3 README languages section: which pages exist in German only and how to add one. Verify the section is in the pull request diff.
- [ ] 4.4 The pull request lists every German string for review by a German speaker before merge. Verify the list is in the pull request description.
