# Design

## Context

See proposal.md for the defects. Root causes found in the source:

- `.checks li { display: flex }` (`src/styles/site.css:189`) makes every text node and every `<a>` inside an item a separate flex item, so a sentence with a link becomes three columns.
- `.brand` and the desktop nav sit in one flex row with no gap rule between them.
- `/help/` renders "I want to" as a separate element in front of every entry; at narrow column widths it wraps to two lines.
- Source lists print `href` as the link text (`ArticlePage.astro:57`, `switch/[slug].astro:75`, `how-to/[slug].astro`).
- Grids use `repeat(3, 1fr)` whatever the item count.
- `cost.astro` reuses the self-host footprint `facts` list in its hero.
- The about page prints the author's `bio` right after the name, and the bio starts with a verb ("Builds…").

## Goals / Non-Goals

**Goals:** fix each defect at its root, and add checks so the classes of defect cannot return unnoticed.

**Non-Goals:** new section designs, new copy beyond the corrections named, or anything served under `/docs/`.

## Decisions

1. **Checklist item markup: icon + one content wrapper.** Each `.checks li` becomes a two-column grid (`grid-template-columns: auto 1fr`) whose second cell is a single `<span>` holding the text and links. A plain-text item and a linked item render the same. *Alternative:* `display: block` with a floated icon; rejected because the icon then misaligns with multi-line text.
2. **Brand gap in the header grid, not on the logo.** Give the header row a `column-gap` and let the brand be its own grid area, so the gap holds even when the navigation grows.
3. **Help "I want to" once per group.** The group heading carries the lead-in ("I want to…"), and entries read as tasks ("get reminders on my phone"). It keeps the task phrasing the help spec requires, with no repeated element to wrap.
4. **Source list titles from the bundle.** A small helper reads the `<title>` of `.bundle/docs/<path>/index.html` at build time, strips the " · OpenTodo docs" suffix and uses it as link text. A missing page already fails the link check, so the helper cannot invent a title. *Alternative:* a hand-kept title map; rejected because it drifts from the bundle.
5. **Grids that fit their count.** A `grid` component sets columns from the item count: 1 → single wide card, 2 → two columns, 4 → two by two, 3/6/9 → three columns, otherwise three columns with the last row's cards widening to fill it (`grid-auto-flow` plus `:last-child:nth-child(3n+1)` spanning). Pages that render the same grid with different counts (templates by group, "Templates for this") get the rule for free.
6. **Layout checks in Playwright, link text in the dist check.** The geometric checks need a rendered page, so they go in `tests/layout.spec.ts` over `sitePages()` at three widths: for each `.checks li`, all descendant text boxes of its content cell share the same left edge or flow inside it; header items have ≥ 16 px between bounding boxes; for each grid, no last row with one item when the column count is three. Path-shaped link text (text that equals the `href`, starts with `/` or `http`) is a static rule added to `scripts/checks/links.mjs` with a unit test.

## Risks / Trade-offs

- [The geometric check may be flaky with web fonts loading late] → wait for `document.fonts.ready` before measuring, as the existing width spec does.
- [Some cards are meant to be alone, such as a featured card] → the grid rule applies only to elements with the grid class; featured layouts use their own class.
- [Translated cost pages share the English facts] → the hero facts move into the language dictionaries with the other cost strings; `i18n.test.mjs` already fails on a missing key.

## Effect on build and downloads

Build time: the title helper reads about 30 small HTML files; the layout spec adds roughly a minute to `npm run test:browser` (157 pages × 3 widths, measuring only). Visitors download a few hundred bytes less CSS; no new JavaScript.
