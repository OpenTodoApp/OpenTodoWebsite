# Tasks

## 1. Section components

- [x] 1.1 Add `Showcase`, `Statement`, `Split`, `Catalogue` and `Close` in `src/components/sections/`, each with `data-section-type` and light and dark styles; verify `npm run check` passes and the converted pages render at 360 and 1280 px
- [x] 1.2 Allow cards only in Catalogue sections on marketing pages, enforced by the composition check (content pages keep their own cards); verify the check fails on a card outside a Catalogue and passes on every converted page
- [x] 1.3 Write `content/LAYOUT.md` (the five types, when to use each, composition rules, screenshot rules) and link it from `AGENTS.md` under "Content workflow"; verify the links resolve

## 2. Screenshots and the sync visual

- [x] 2.1 Add `src/lib/crops.ts` and a `crop` prop on `ScreenshotFrame` (positioned image in an aspect-ratio box, which every browser supports, so no `object-view-box` path is needed); verify the assistant and Today crops show their panel legibly at 1280 px
- [x] 2.2 Add `SyncIllustration`, the playground's two devices and server as static markup with the playground's classes and no script, and place it in the home page's sync section; verify with JavaScript disabled (`tests/no-js.spec.ts`) that the illustration shows both lists and links to `/self-host/#sync`
- [x] 2.3 Add the screenshot-width rule to `tests/layout.spec.ts`; verify it fails on the current home page (the Today and assistant shots at 552 and 539 px) and passes on every converted page; the home page passes once `website-navigation-and-home` rebuilds it

## 3. Convert pages

- [x] 3.1 Convert `/self-host/` to section components and review it in the preview; verify `npm run test:browser`
- [x] 3.2 Convert `/cost/` and its translations, `/developers/`, `/about/`, `/capture/` and `/vs/*` (the `/switch/*` pages are step-by-step guides, laid out like how-tos, and only get the new closing section); verify the composition check passes on each and `i18n.test.mjs` passes
- [x] 3.3 Replace `EndCta` with `Close` on every page and move the coffee button to the footer and `/about/` in the secondary style; verify no page's closing section contains it and no colour outside the bundle tokens is used (`grep` the CSS for hex values)
- [x] 3.4 Leave the home page's content order as it is (it is rebuilt from the components in `website-navigation-and-home`), tag its sections with their types, keep it out of the composition check until then, and list its violations in that change's tasks; verify the list matches the check's output

## 4. Blog covers

- [x] 4.1 Render typographic covers for posts without `cover` on `/blog/`, category pages and the home page's post cards; verify in light and dark that no card shows an icon and the axe check passes at 4.5:1
- [x] 4.2 Add a browser test in `tests/layout.spec.ts` that every card on `/blog/` without a cover image shows its title as the cover and no icon (the cover is rendered markup, so it is checked on the built page); verify `npm run test:browser`

## 5. Integration

- [x] 5.1 Run `npm run build`, `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser`; all pass, and the preview shows every converted page in light and dark at 360 and 1280 px
