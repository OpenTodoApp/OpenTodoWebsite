# Tasks

## 1. The button

- [x] 1.1 Add `src/components/DiscordButton.astro` (D1) and its colours in `src/styles/site.css` (D2); verify `npm run build` passes and a built page shows the button with the logo.

## 2. Where it appears

- [x] 2.1 Add the community section to `src/pages/index.astro` and `src/pages/[lang]/index.astro` with text in `src/i18n/{de,fr,it,es,pt}.mjs` (D3); verify the English and German home pages show it after `npm run build`.
- [x] 2.2 Add the button to `EndCta.astro` (D4), `SiteFooter.astro` (D5), the About "Who makes it" section and the Help "Something is wrong" section; extend `scripts/test/community.test.mjs` to assert the button on the home page, a translated home page, the footer, the end of a guide, About and Help; verify `npm test` passes after the build.

## 3. Checks

- [x] 3.1 Run `npm run check`, `npm run build`, `npm run check:dist`, `npm test` and `npm run test:browser`, and verify they pass, including contrast and no sideways scroll at 360 px in light and dark; look at the home page, the footer and a guide's end in both themes.
