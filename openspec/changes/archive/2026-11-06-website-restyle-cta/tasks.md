# Tasks

- [x] 1.1 Rewrite `src/components/EndCta.astro` with kinds (D1) and set the kind or title on every page that uses it; remove it from Privacy and Accessibility; verify the built guide ends with exactly one link in `.end-cta`.
- [x] 1.2 Add the support line for the `follow` kind (D2) and the monthly note on `/support/`; verify a built post's `.end-cta` links `/support/`.
- [x] 1.3 Remove the labels above titles (D3); verify `grep -rn 'class="kicker"' src` lists only the 404 page, the quiz steps and the home page.
- [x] 1.4 Update `scripts/test/community.test.mjs`; run `npm run check`, `npm run build`, `npm run check:dist`, `npm test`, `npm run test:browser`, and look at a guide, a post and Features at 390 and 1280 px in light and dark.
