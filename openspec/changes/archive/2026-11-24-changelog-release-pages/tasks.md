## 1. Release pages

- [x] 1.1 `src/pages/changelog/[version].astro` and `ReleaseChanges.astro`: one page per release with changes (`ls dist/changelog`)
- [x] 1.2 `/changelog/`: the newest release open, older ones link their page (`scripts/test/changelog.test.mjs`)

## 2. API reference

- [x] 2.1 `.api-op` exempt from text balancing in `site.css`

## 3. Verify

- [x] 3.1 `npm test`, `npm run check`, `npm run build`, `npm run check:dist`, `npm run test:browser`
- [x] 3.2 Lighthouse on a phone profile: `/changelog/` 100, a release page 100, the longest API reference page 100 (before: 85 and 97)
