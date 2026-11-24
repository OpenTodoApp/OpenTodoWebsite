## 1. Notice

- [x] 1.1 `src/components/home/MsTodoNotice.astro` with the strings of every home page language (the build fails for a language without them), the end date and its styles, included once in `HomeStory.astro`. Verify `npm run build` and that `dist/index.html` and `dist/de/index.html` contain the link to `/blog/leaving-microsoft-to-do/`.
- [x] 1.2 Browser test in `tests/no-js.spec.ts`: the line and its link read on `/` and `/de/` at 360 px without JavaScript, the German one says the post is in English, and the page does not scroll sideways; skipped once a build leaves the notice out. Verify `npm run test:browser`.

## 2. Checks

- [x] 2.1 `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser`, `openspec validate ms-todo-home-notice --strict`. Verify all pass.
