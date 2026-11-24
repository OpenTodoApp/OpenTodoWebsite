## 1. Header link

- [x] 1.1 `src/components/MsTodoLink.astro` with the text of every site language (the build fails for a language without one) and the end date, included in `SiteHeader.astro` just before Try the demo (shown from 1200 px) and as the last link of the menu; `src/components/home/MsTodoNotice.astro` and its include in `HomeStory.astro` removed. Verify `npm run build`, that `dist/index.html`, `dist/de/index.html` and `dist/features/index.html` link to `/blog/leaving-microsoft-to-do/` from the header, and that no home page has `ms-todo-notice`.
- [x] 1.2 Browser test in `tests/no-js.spec.ts`: without JavaScript, the link reads in the wide header at 1280 px before Try the demo and not as a button, and at 360 px it is hidden from the header row and shows in the opened menu, on `/` and in German on `/de/`, without sideways scrolling; skipped once a build leaves the link out. Verify `npm run test:browser`.

## 2. Checks

- [x] 2.1 `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser`, `openspec validate ms-todo-home-notice --strict`. Verify all pass.
