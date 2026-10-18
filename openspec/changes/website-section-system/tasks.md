# Tasks

## 1. Section components

- [ ] 1.1 Add `Showcase`, `Statement`, `Split`, `Catalogue` and `Close` in `src/components/sections/`, each with `data-section-type`, light and dark styles, and stories of their layout at 360 and 1280 px on a scratch page excluded from the build; verify `npm run check` passes
- [ ] 1.2 Scope `.card` styles to Catalogue sections and blog cards; verify on the built site that no card outside them is styled
- [ ] 1.3 Write `content/LAYOUT.md` (the five types, when to use each, composition rules, screenshot rules) and link it from `AGENTS.md` under "Content workflow"; verify the links resolve

## 2. Screenshots and the sync visual

- [ ] 2.1 Add `src/lib/crops.ts` and a `crop` prop on `ShotPicture` and `ScreenshotFrame` with the CSS fallback; verify the assistant crop on `/` shows the chat panel legibly at 1280 px in Chromium with and without `object-view-box`
- [ ] 2.2 Add a `static` mode to `SyncPlayground` that renders the two devices and the server without controls or script; verify with JavaScript disabled (`tests/no-js.spec.ts`) that the illustration shows both lists and links to `/self-host/#sync`
- [ ] 2.3 Add the screenshot-width rule to `tests/layout.spec.ts`; verify it fails on the current home page and passes after conversion

## 3. Convert pages

- [ ] 3.1 Convert `/self-host/` to section components and review it in the preview; verify `npm run test:browser`
- [ ] 3.2 Convert `/cost/` and its translations, `/developers/`, `/about/`, `/capture/`, `/vs/*` and `/switch/*`; verify the composition check passes on each and `i18n.test.mjs` passes
- [ ] 3.3 Replace `EndCta` with `Close` on every page and move the coffee button to the footer and `/about/` in the secondary style; verify no page's closing section contains it and no colour outside the bundle tokens is used (`grep` the CSS for hex values)
- [ ] 3.4 Leave the home page's content order as it is but render it with the new components; verify it passes the composition check or list the violations for `website-navigation-and-home` to resolve

## 4. Blog covers

- [ ] 4.1 Render typographic covers for posts without `cover` on `/blog/`, category pages and the home page's post cards; verify in light and dark that no card shows an icon and the axe check passes at 4.5:1
- [ ] 4.2 Add a test in `scripts/test/blog.test.mjs` that a post without a cover gets a title cover; verify `npm test`

## 5. Integration

- [ ] 5.1 Run `npm run build`, `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser`; all pass, and the preview shows every converted page in light and dark at 360 and 1280 px
