# Tasks

## 1. The link

- [x] 1.1 Add `x` to `SITE` in `src/lib/site.ts` (D1), the "X" item to the Community list of `src/components/SiteFooter.astro` and the sentence to "Who makes it" in `src/pages/about.astro` (D2); verify `npm run build` passes and the built home page and About page carry the link.
- [x] 1.2 Extend `scripts/test/community.test.mjs` so the footer of the home page and of a translated page links to the X account as a text item after Discord, and About links it in "Who makes it"; verify `npm test` passes after the build.

## 2. Checks

- [x] 2.1 Run `npm run check`, `npm run build`, `npm run check:dist` and `npm test`, and verify they pass; look at the footer and About at 360 px in both themes.
