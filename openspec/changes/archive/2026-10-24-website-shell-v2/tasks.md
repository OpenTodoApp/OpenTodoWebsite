# Tasks

## 1. Header and phone menu

- [x] 1.1 Add `NAV` to `src/lib/site.ts` (D2) with today's targets `/#features`, `/help/` and `/#get-it`. Verify `npm run check` passes.
- [x] 1.2 Rewrite `SiteHeader.astro` (D1, D3): five links, Learn current on the guidance pages, Try the demo and Get started, the star from 1360 px; remove the Learn `<details>` menu. Verify in the built `/blog/` that Blog carries `aria-current="page"` and in `/guides/` that Learn does.
- [x] 1.3 Update `site.css` for the new header widths: Try the demo hidden from 768 to 1023 px. Verify `tests/widths.spec.ts` passes at 768, 1024, 1280, 1359, 1360 and 1440 px.

## 2. Footer

- [x] 2.1 Rewrite `SiteFooter.astro` (D4). Verify with `npm run check:dist` that every footer link resolves and the footer of `/` has 19 links in its four groups.

## 3. Tests and checks

- [x] 3.1 Update `tests/no-js.spec.ts` (D5): the five links and two actions in the phone menu on every page; Learn opens the Learn page from the phone menu; the Learn-menu test removed. Verify `npm run test:browser` passes.
- [x] 3.2 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`; capture before and after screenshots of the header and footer at 1280 and 390 px. Verify all pass.
