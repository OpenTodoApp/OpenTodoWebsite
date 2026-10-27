# Tasks

## 1. The page

- [x] 1.1 Add `SITE.sponsor` and `src/components/SponsorButton.astro` with its colours (D2); verify a built page shows the button with the heart.
- [x] 1.2 Add `src/pages/support.astro` with the approved text and the layout of D1; verify `npm run build` renders `/support/` and its text matches the approved text.

## 2. Ways in

- [x] 2.1 Add the Support pill to the header and the phone menu (D3), the footer links, the line in `EndCta.astro` and the link on About; extend `scripts/test/community.test.mjs` to assert them and the page's buttons; verify `npm test` passes after the build.

## 3. Checks

- [x] 3.1 Run `npm run check`, `npm run build`, `npm run check:dist`, `npm test` and `npm run test:browser`; look at `/support/` and the header at 390 and 1280 px in light and dark.
