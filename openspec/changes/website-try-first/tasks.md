# Tasks

## 1. The platform list from the bundle

- [ ] 1.1 Write `scripts/lib/platforms.mjs` (D3): `PLATFORMS` in the recorded order, `NOT_PLATFORMS`, `platformsIn(pages)` and `unknownGuides(pages)`; add `docsIndex()` to `src/lib/bundle.ts` and `src/lib/platforms.ts`. Verify with `npm test` that `scripts/test/platforms.test.mjs` passes on a fixture index where one platform's guide is missing (it is left out, order kept) and one unknown self-hosting guide exists (it is named), and that `unknownGuides()` is empty for the pinned bundle after `npm run bundle`.

## 2. Header

- [ ] 2.1 Add `SITE.demoNote` to `src/lib/site.ts` with the sentence restated from `/docs/self-hosting/demo/` of the pinned release (D2). Verify the sentence's lifetime ("two hours without activity") matches the "Expiry and the nightly reset" section of that docs page in `.bundle/docs/self-hosting/demo/index.html`.
- [ ] 2.2 In `SiteHeader.astro` give the demo link `aria-describedby` to a `.visually-hidden` paragraph holding `SITE.demoNote`, add the visible sentence and the "How the demo works" link (`/docs/self-hosting/demo/`) under the phone menu's demo button, and give the brand link `aria-label="OpenTodo, home"`. Verify in the built HTML of any page that the description element exists once and `npm run check:dist` reports no broken link.
- [ ] 2.3 In `site.css` show `.header-cta` at every width and hide the wordmark below 480 px and from 768 to 1023 px (D1). Verify by extending `tests/widths.spec.ts` to measure every visible header item at 360, 390, 480, 768, 1024, 1280, 1359, 1360 and 1440 px and by `npm run test:browser` passing; verify by eye at 360 px that brand icon, demo button and Menu sit on one line in light and dark.
- [ ] 2.4 Extend `tests/no-js.spec.ts` so every page at 360 px without JavaScript has a visible "Try the demo" link in the header before the menu is opened, and the menu panel shows the demo sentence with its docs link. Verify `npm run test:browser` passes.

## 3. The install row

- [ ] 3.1 Build `src/components/InstallRow.astro` (D4) with `limit` and `heading`, the inline list of platform links, the Docker command from `manifest.image`, `facts.port` and `facts.dataDir`, the "Docker guide" link, the "All {n} platforms" link to `/self-host/#platforms` when cut, and the source line naming `versionTag`; add its styles. Verify the built self-host page lists every platform of the pinned bundle in table order and the home page the first eight, the Docker line names the manifest's image tag, and `npm run check:dist` (links, emoji scan, scripts scan) passes.
- [ ] 3.2 Place the row and the demo line in the home hero (`src/pages/index.astro`, D5) and add `section#platforms` to `src/pages/self-host.astro` after the page head. Verify at 390 px that the hero's buttons, the demo line and the row show in the first screenful and the live demo is reached by one scroll; verify at 360 px that no page scrolls sideways (`npm run test:browser`).
- [ ] 3.3 Add `common.installRow`, `common.demoNote`, `common.howDemoWorks` and `common.allPlatforms` to the five dictionaries in `src/i18n/` and render the line and the row in `src/pages/[lang]/index.astro` (D6). Verify `npm test` (the dictionary shape test) passes and the built `/de/` page shows the German heading with the same platform links as `/`.

## 4. Closing calls to action

- [ ] 4.1 Add the demo sentence and the "How the demo works" link under the `cta-row` in `src/components/EndCta.astro` (D8). Verify on a built guide, template, topic, switch and comparison page that the first button is the demo and the sentence follows with a working link, and `npm run check:dist` passes.

## 5. Integration

- [ ] 5.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist` and `npm run test:browser`; review the home page, `/self-host/`, a guide and the phone menu at 360 and 1280 px in light and dark; confirm in the analytics (or by reading `public/analytics.js` unchanged) that a header demo click is one `cta-demo` event with section `nav` and that no new event exists. Verify all pass and `npx --yes @fission-ai/openspec@1.14.3 validate --all --strict` passes.

## Workflow follow-up

- Archive after `website-switcher-pages`, `website-platform` and `website-content-hub`, whose requirements this change modifies; confirm `openspec validate --all --strict` passes afterwards.
