# Tasks

## 1. Authors data

- [ ] 1.1 Add optional `photo` (local file path) and `note` (at most 120 words) to the authors schema in `src/content/schemas.mjs`, with tests for a remote URL being refused and an over-long note failing; verify `npm test`
- [ ] 1.2 Ask the maintainer for a photo and a note, add them to `src/assets/authors/` and `authors.json` in the pull request, and do not merge without their approval; verify the schema passes on `npm run build`

## 2. Proof strip

- [ ] 2.1 Add `ProofStrip.astro` (a Statement variant) that renders the requested manifest facts with their fixed links and skips missing keys, with a test that a manifest without `specCount` omits it; verify `npm test`
- [ ] 2.2 Add a test (`scripts/test/proof.test.mjs`) that fails when the pinned bundle's manifest carries fewer than two of the strip's keys, so a renamed manifest field cannot silently empty the strip; verify `npm test`
- [ ] 2.3 Use the strip in the home page's closing section and on `/developers/`; verify both pages show 78 specifications, 115 documentation pages and 10 import formats with working links (`npm run check:links`) and pass the composition check

## 3. About page

- [ ] 3.1 Open `/about/` with the maintainer's note, name and photo; verify at 360 px without JavaScript (`tests/no-js.spec.ts`) and the axe check in light and dark
- [ ] 3.2 Replace the hero facts with the licence and the three durable figures, and add the "Release history" line linking `/whats-new/`; verify no release date appears beside the headline and the dates still follow the bundle
- [ ] 3.3 Show the photo in the blog post author box when present; verify on `/blog/welcome/`

## 4. Integration

- [ ] 4.1 Run `npm run build`, `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser`; all pass, and the preview shows `/about/`, `/developers/` and the home page's close in light and dark
