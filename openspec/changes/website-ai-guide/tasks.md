# Tasks

## 1. Guide

- [x] 1.1 Write `src/content/toolkit/ai-on-your-terms.md` (D1). Verify `node scripts/check-content.mjs` passes with no unsourced paragraph and every link resolves in `npm run check:dist`.
- [x] 1.2 Add the illustration and its styles (D2) and link the guide from `/features/`. Verify at 360 and 1280 px in light and dark that the card reads, and that axe passes (`npm run test:browser`).

## 2. Checks

- [x] 2.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`. Verify all pass.
