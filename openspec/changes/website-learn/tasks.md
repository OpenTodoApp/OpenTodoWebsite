# Tasks

## 1. Library

- [x] 1.1 Write `src/lib/learn.ts` (D1). Verify the build lists 53 entries on `/learn/` with the current content (5 setup, 4 switch, 10 methods, 24 how-tos, 10 templates).
- [x] 1.2 Build `LearnLibrary.astro`, the "Something is wrong" section with the Discord link and button on `/learn/`,, `/learn/`, `/learn/<type>/` and `/learn/topic/<slug>/` with styles (D2). Verify at 360 and 1280 px in light and dark, and that `/learn/how-tos/` shows the six groups in order.

## 2. Moving the old pages

- [x] 2.1 Remove the help, guides, how-to, toolkit and topic indexes and the guide tag pages; point breadcrumbs and links into Learn and `NAV.learn` to `/learn/` (D3). Verify `npm run check:dist` reports no broken link and `node scripts/check-content.mjs` passes.
- [x] 2.2 Add the redirects to `nginx.conf` and `scripts/checks/redirects.mjs` with its unit test (D4). Verify `npm test` passes, `npm run check:redirects` reports every redirect resolving, and `nginx -t` accepts the configuration (the Docker smoke test in CI).

## 3. Checks

- [x] 3.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`; capture `/learn/`, `/learn/how-tos/` and a topic page at 1280 and 390 px. Verify all pass.
