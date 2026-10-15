# Tasks

## 1. Reading the published bundle

- [x] 1.1 Add `normalizeManifest` and `normalizeChangelog` to `scripts/lib/bundle.mjs` and use them from `src/lib/bundle.ts`; accept `screenshots` or `shots` in the layout check. Verify with unit tests in `scripts/test/fetch-bundle.test.mjs`: the app's manifest and changelog convert to the page shapes (tag, date, shots, dark variants, sections, no "Unreleased"), the interim format passes through unchanged, and a manifest without screenshots fails naming the field.
- [x] 1.2 Show only carried facts on the self-host page (binary size when no image size; no memory figure without one). Verify a build with `BUNDLE_DIR` pointing at the unpacked `v0.3.1-rc.1` bundle succeeds and the self-host page shows the binary size and no memory line, then run `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser` against the interim pin.

## 2. After the app releases v0.4.0 (separate pull request)

- [ ] 2.1 Pin `{ "version": "v0.4.0" }` in `bundle.json`, delete `interim/` and `scripts/interim-bundle.mjs`, and update README and AGENTS.md. Verify all checks and `openspec validate --all --strict` pass and the Docker build accepts the pin.
