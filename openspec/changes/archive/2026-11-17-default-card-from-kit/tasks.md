# Tasks

## 1. The default card

- [x] 1.1 Add a test to `scripts/test/og.test.mjs` first: `defaultCardSource` returns nothing without cards, the home card without a kit, and the kit card when the bundle has it. Verify it fails.
- [x] 1.2 Add `defaultCardSource` and `KIT_CARD` to `scripts/lib/og.mjs` and use them in `scripts/og.mjs` (D1). Verify `npm test` passes and that a build pinned to v0.22.0 still writes the home card to `dist/assets/og.png`.

## 2. Checks

- [x] 2.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist` and `npx --yes @fission-ai/openspec@1.13.2 validate --all --strict`.
