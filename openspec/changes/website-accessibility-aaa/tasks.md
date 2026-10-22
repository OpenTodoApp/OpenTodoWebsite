# Tasks

## 1. Register, statement and the contrast check

- [ ] 1.1 Add `src/lib/a11y-exceptions.json` with the `muted-tone` and `accent-label` entries and a unit test in `scripts/test/` that every entry carries every field; verify `npm test`.
- [ ] 1.2 Add `src/lib/a11y-pairs.mjs` (the text and background pairs `site.css` uses) and `scripts/checks/contrast.mjs` (OKLCH resolver, measurement from the bundle's `tokens.css`, the three rules, the unlisted-pair scan) wired into `prebuild`; verify `npm test` covers an unregistered 6.5:1 pair failing, a registered 4.2:1 pair failing, a stale entry at 7:1 failing, and `npm run build` passing against the pinned bundle.
- [ ] 1.3 Render `src/pages/accessibility.astro` from the register and the bundle (target, exceptions with measured values and ending conditions, checks list, not covered, report, review date); verify the built page lists both entries and `npm run check:dist` passes.

## 2. High contrast from the system

- [ ] 2.1 Add the build-time transform that wraps the bundle's high-contrast blocks in `@media (prefers-contrast: more)` when the pinned bundle carries them, and the statement wording for both cases; verify a unit test with a bundle fixture that has the blocks and one that does not, and `npm run build` against the pinned bundle emits nothing extra.

## 3. Pointer targets and focus

- [ ] 3.1 Give icon links, pagination, language links and tag chips 44 px hit areas (`min-width`/`min-height` where invisible, the `.hit` class elsewhere) and add the target pass to `tests/a11y.spec.ts`; verify `npm run test:browser` passes on every page at both widths and a fixture with a 32 px control fails naming it.
- [ ] 3.2 Add `scroll-padding-top` for the sticky header and the focus-not-obscured pass to `tests/a11y.spec.ts`; verify tabbing backwards onto a link under the header in the test leaves it fully visible and the pass passes every page.

## 4. Reading blocks, trail, links and headings

- [ ] 4.1 Set the prose rhythm (line height 1.5, paragraph gap 2.25 em, 80ch measure, start alignment, lede at 1.5) in `site.css` with a stylesheet test over the built CSS; verify `npm test` and the preview shows no change outside paragraph spacing.
- [ ] 4.2 Add `src/components/Trail.astro`, the `trail` slot in `Base.astro`, and trails in every template below the top level (guides, how-tos, blog posts and categories, templates, toolkit, switch, vs, topics, install, localized pages); verify a browser test that every page except the top level has the "You are here" landmark with working links, and `npm run check:links`.
- [ ] 4.3 Add the bare-link-text lint and the heading-order check to `scripts/check-content.mjs` and fix what they report; verify `npm test` fails on a fixture with "Learn more" and passes on the site.

## 5. Abbreviations and reading level

- [ ] 5.1 Add `src/lib/abbreviations.json`, `src/components/Abbr.astro` (expansion in `title` and visually hidden text), the first-use lint over `dist/` skipping code, and the long-sentence report; expand the first uses the lint finds; verify `npm test` fails on an unexpanded fixture page and `npm run build` passes on the site with the report printed.
- [ ] 5.2 Add the 25-word sentence limit and the abbreviation rule to `content/VOICE.md` and the register workflow to `README.md`; verify the docs read as written and `npm run check` passes.

## 6. AAA gate and review

- [ ] 6.1 Add the AAA tags and the register filter for `color-contrast-enhanced` to `tests/a11y.spec.ts`; verify `npm run test:browser` passes on every page and a fixture with an unregistered 5:1 caption fails naming the ratio.
- [ ] 6.2 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist` and `npm run test:browser`, set the statement's review date, and open a draft pull request with the preview link for the maintainer's review of the rendered statement and trails.
