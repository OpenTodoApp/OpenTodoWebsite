## 1. Line

- [x] 1.1 `MANAGED_HOSTS` in `src/lib/hosting.ts` with the rule as a comment (PikaPods only), and the "Managed hosting" line at the end of `/hosting/`. Verify `npm run build`.
- [x] 1.2 A test in `scripts/test/hosting.test.mjs` checks the line: its heading, the PikaPods link and the sentence. Verify `npm test`.

## 2. Checks

- [x] 2.1 `npm run check`, `npm run check:dist`, `npm run test:browser` (no-JS), `openspec validate --all --strict`. Verify all pass.
