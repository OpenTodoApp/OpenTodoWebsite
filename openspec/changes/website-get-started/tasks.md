# Tasks

## 1. Page

- [x] 1.1 Write `src/lib/start.ts` and `src/pages/start.astro` with styles (D1, D2). Verify against v0.10.1 that 17 targets show, the Docker line names `ghcr.io/pixari/opentodo:0.10.1` and port 8080, and every switch row says whether its format is imported.
- [x] 1.2 Point `NAV.start` to `/start/` and add `/start/` to the content check's routes. Verify `npm run check:dist` finds no broken link.

## 2. Checks

- [x] 2.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`; capture `/start/` at 1280 and 390 px in light and dark. Verify all pass.
