# Tasks

## 1. The choice

- [x] 1.1 Add `scripts/test/hosting.test.mjs` first: `/start/` and `/install/` have `#run` with "On your own hardware" then "Managed hosting", the five own-hardware links, the disclosure, the PikaPods link and equal button classes; Support has the PikaPods line; no page naming PikaPods says "recommended" or "easiest way". Verify it fails.
- [x] 1.2 Add `SITE.pikapods`, `src/lib/hosting.ts` and `RunChoice.astro`; use it on `/start/` (the "Run your own" path leads to `#run`, the server list is titled "On your own hardware") and `/install/`. Verify the test passes after `npm run build`.
- [x] 1.3 Add "Host on PikaPods: part of what you pay goes to the project." under the ways to give on `/support/`.

## 2. Checks

- [x] 2.1 Look at `/start/`, `/install/` and `/support/` at 390 and 1280 px, light and dark: no sideways scrolling, both options with the same weight.
- [x] 2.2 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser -- -g "start|install|support"` and `npx --yes @fission-ai/openspec@1.13.2 validate --all --strict`.
