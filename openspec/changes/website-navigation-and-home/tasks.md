# Tasks

## 1. Navigation model

- [ ] 1.1 Add `src/lib/nav.ts` with the four groups and per-link placement, and render the header, phone menu and footer from it; verify the built header, menu and footer list exactly the links in the specs
- [ ] 1.2 Replace Learn with Resources in the header, make the GitHub link an icon with the accessible name "OpenTodo on GitHub", keep one "Try the demo" button; verify `tests/no-js.spec.ts` (Resources by keyboard without JavaScript) and `tests/widths.spec.ts` (one line at 768 px)
- [ ] 1.3 Rebuild the footer as four columns plus an inline language row; verify at 1280 px each column has at most eight links and at 360 px nothing scrolls sideways
- [ ] 1.4 Update the Resources cases for missing content in the tests that cover "Learn follows the content"; verify `npm run test:browser`

## 2. Help as the hub

- [ ] 2.1 Add the "Browse by topic" group and the FAQ link to `/help/`, and the toolkit pages as server entries; verify with a link-walk test that every how-to, toolkit, topic and install page and `/faq/` is linked from `/help/`
- [ ] 2.2 Verify `/help/` at 360 px without JavaScript shows every group from the jump row (`tests/no-js.spec.ts`)

## 3. Home page

- [ ] 3.1 Rebuild the hero as a Split with the headline, a promise of at most 25 words, one button and two text links; add the word-limit rule to `scripts/check-content.mjs` with a test in `scripts/test/claim-lint.test.mjs`; verify `npm test`
- [ ] 3.2 Assemble the remaining six sections in the order of the spec from the section components, merging features and differentiators into one nine-item Catalogue with a docs link per item; verify the composition check and `node scripts/check-content.mjs` (every claim sourced)
- [ ] 3.3 Replace the three post cards with the latest-post line above Close; verify the home page shows the newest post and updates when a newer post is added in a test fixture (`scripts/test/blog.test.mjs`)
- [ ] 3.4 Apply the new order to the `[lang]` home pages and remove dictionary keys no longer used; verify `/de/`, `/fr/`, `/it/`, `/es/`, `/pt/` build and `i18n.test.mjs` passes
- [ ] 3.5 Count "Try the demo" on the built home page outside the header; verify it appears exactly twice

## 4. Integration

- [ ] 4.1 Run `npm run build`, `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser`; all pass, and the preview shows the header, footer, home and help pages at 360, 768 and 1280 px in light and dark
