# Tasks

## 1. The link

- [ ] 1.1 Add `discord` to `SITE` in `src/lib/site.ts` (D1) and the "Community on Discord" item to the Project list in `src/components/SiteFooter.astro` (D2); verify `npm run build` passes and `dist/index.html` and `dist/it/index.html` contain one anchor to the invite in the footer.
- [ ] 1.2 Add the test from D5 under `scripts/test/` asserting the footer anchor on the home page and the Italian home page and that no `script`, `link`, `img` or `iframe` in any built page points at a Discord address; verify `npm test` passes after `npm run build`.

## 2. About and Help

- [ ] 2.1 Rewrite the "Questions and bug reports" item of `src/pages/about.astro` per D3; verify the built `/about/` has links to the invite and to `${appRepo}/issues` in that item, and `npm run check:dist` passes.
- [ ] 2.2 Add the Discord link to the "Something is wrong" lede of `src/pages/help.astro` per D4; verify the built `/help/` links Discord then the issue tracker in that paragraph and `npm run check:dist` passes.

## 3. Checks

- [ ] 3.1 Run `npm run check`, `npm run build`, `npm run check:dist`, `npm test` and `npm run test:browser` and verify they pass; open `/`, `/about/` and `/help/` at 360 px with JavaScript disabled in light and dark and verify the three links are visible, focusable and open Discord.
- [ ] 3.2 Open a draft pull request linking the preview, per the content workflow; verify the preview's footer shows the link.
