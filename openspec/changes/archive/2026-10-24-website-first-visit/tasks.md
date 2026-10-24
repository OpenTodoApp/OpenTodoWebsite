# Tasks

## 1. Home page

- [x] 1.1 Add the get-it block (D1) to `src/pages/index.astro` below the hero: three cards (demo, join a server, run it yourself), the "not offered as a hosted service" line, links to the demo, the install docs, `/self-host/` and `/cost/`. Verify at 360 px without JavaScript that the three cards stack and every link resolves (`npm run check:dist`).
- [x] 1.2 Replace `<em>` with `<span class="count">` in `src/components/HeroDemo.astro` and its style (D5). Verify the built home page's text contains "Inbox 3" with no `<em>` inside `.demo-side`.

## 2. New pages

- [x] 2.1 Build `/cost/` (D2) from `manifest.facts`, with every app statement linked to a docs page. Verify the page has no currency symbol or amount (grep the built HTML for `€`, `$`, `£`), reads at 360 px without JavaScript, and `npm run check:dist` passes.
- [x] 2.2 Build `/about/` (D3) from `authors.json`, the bundle's `releases` and `manifest.facts.license`, with links to `SECURITY.md`, the specs, the demo docs, the export docs and the analytics note. Verify the first and latest release dates on the page match `changelog.json` and all links resolve.
- [x] 2.3 Register `/about/` and `/cost/` as site pages in `scripts/check-content.mjs` so content may link to them. Verify `node scripts/check-content.mjs` passes.

## 3. Navigation

- [x] 3.1 Rebuild `SiteHeader.astro` (D4): flat links plus the Learn `<details>` on desktop, two groups in the phone menu; add the styles. Verify with the browser tests that every header item is on one line at 768, 1024, 1280, 1359, 1360 and 1440 px and that the phone menu shows both groups without JavaScript.
- [x] 3.2 Add About and What it costs to the footer and update the no-JavaScript test's expected menu links (Learn group included). Verify `npm run test:browser` passes.

## 4. Integration

- [x] 4.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist` and `npm run test:browser`; review the home page, `/cost/` and `/about/` at 360 and 1280 px in light and dark. Verify all pass and `npx @fission-ai/openspec validate --all --strict` passes.
