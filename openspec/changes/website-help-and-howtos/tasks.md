# Tasks

## 1. Cost page

- [x] 1.1 Change the `/cost/` headline and lede to lead with free (proposal). Verify the built page's `<h1>` contains "free" before any mention of a server.

## 2. Collections and checks

- [x] 2.1 Add `howtoSchema` and `switchSchema` to `src/content/schemas.mjs`, the collections to `src/content.config.ts`, and unit tests (group enum, stale `checkedOn`, `terms` minimum). Verify `npm test` passes.
- [x] 2.2 Teach `scripts/check-content.mjs` the new collections and routes (`/how-to/`, `/switch/`, `/install/…`, `/help/`, `/faq/`). Verify `node scripts/check-content.mjs` lints the new files.

## 3. Pages

- [x] 3.1 Build `/help/` (D1). Verify at 360 px without JavaScript that the three groups and the jump row work and every link resolves (`npm run check:dist`).
- [x] 3.2 Build `/how-to/` and `/how-to/[slug]` (D2) with the screenshot check. Verify a how-to with a wrong `shot` key fails the build naming it, then remove the test entry.
- [x] 3.3 Build `src/lib/install.ts`, `/install/` and `/install/[platform]` (D3). Verify every docs anchor resolves in the link check.
- [x] 3.4 Build `/switch/` with the glossary and `/switch/[slug]` (D4), and link the switch pages from the comparison pages. Verify the pages say "no one-step importer" with the interim bundle and all links resolve.
- [x] 3.5 Build `/faq/` (D5). Verify the answers are visible without JavaScript at 360 px.

## 4. Content

- [x] 4.1 Write the how-tos (at least twenty across the six groups, including the five Fix it pages named in the proposal), each with `lastReviewed` today and sources. Verify the claim lint passes.
- [x] 4.2 Write the four switch pages with `checkedOn` today. Verify the stale check and the claim lint pass.
- [x] 4.3 Write the three toolkit pieces (D6) and remove backlog row 5. Verify the claim lint passes.

## 5. Navigation and integration

- [x] 5.1 Add Help to the header, How-tos and Switch to Learn, the new sections to the footer and the 404 page (D7); update the no-JavaScript browser test's expected links. Verify header items stay on one line at 768 to 1440 px (`npm run test:browser`).
- [x] 5.2 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser`; review `/help/`, a how-to, an install page, a switch page and `/faq/` at 360 and 1280 px in light and dark. Verify all pass and `openspec validate --all --strict` passes.
