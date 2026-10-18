# Tasks

## 1. Checklists and header

- [ ] 1.1 Rewrite `.checks li` as an icon cell plus one content `<span>` in every component that renders it (`ArticlePage.astro`, `self-host.astro`, `cost.astro`, `[lang]/cost.astro`, `about.astro`, `index.astro`, `templates/[slug].astro`, `switch/[slug].astro`); verify at 1280 and 360 px that the about page's "Questions and bug reports go to the issue tracker" reads as one sentence
- [ ] 1.2 Add a column gap between the brand and the desktop navigation; verify at 768 and 1280 px that "OpenTodo" and "Features" are visibly apart
- [ ] 1.3 Add `tests/layout.spec.ts` with the checklist-flow and header-gap checks over `sitePages()` at 360, 768 and 1280 px; verify it fails on the current `main` build and passes after 1.1 and 1.2 (`npm run build && npm run test:browser`)

## 2. Grids and source lists

- [ ] 2.1 Introduce a count-aware grid class and use it for template groups, "Templates for this", blog cards and feature cards; verify `/templates/` and `/guides/kanban/` show no lone card at 1280 px
- [ ] 2.2 Add the lone-card check to `tests/layout.spec.ts`; verify it passes on every page
- [ ] 2.3 Show the docs page title as source link text via a bundle title helper in the three source-list blocks; verify `/guides/kanban/` lists "Sections and boards", "Sharing", "Filters", "Views"
- [ ] 2.4 Add the path-as-link-text rule to `scripts/checks/links.mjs` with a case in `scripts/test/checks.test.mjs`; verify `npm test` and `npm run check:dist` pass

## 3. Page corrections

- [ ] 3.1 Move the "I want to" lead-in to each help group heading and drop it from entries; verify `/help/` at 1280 and 360 px shows no entry whose prefix wraps
- [ ] 3.2 Replace the cost hero facts with the licence, accounts at no cost and the server as the only cost, keep the footprint in "Where it can live", and add the strings to every language dictionary; verify `/cost/` and `/de/cost/` and `npm test` (`i18n.test.mjs`)
- [ ] 3.3 Rewrite the author bio in `authors.json` to read after the name ("who builds OpenTodo in the open…") and check every place it renders (about page, post pages); verify `/about/` and `/blog/welcome/`
- [ ] 3.4 Fix the wording slips found in the review (Kanban guide "`@me-ish`") and set `lastReviewed` to the day of the edit; verify `node scripts/check-content.mjs` passes

## 4. Integration

- [ ] 4.1 Run `npm run build`, `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser`; all pass, and the pull request's preview artefact shows the fixed pages
