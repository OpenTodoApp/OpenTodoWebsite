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

1. **Checklist items: the icon sits in the item's padding.** `.checks li` becomes a block with left padding the width of the icon plus its gap, and the leading icon is positioned absolutely in that padding. Text, links and emphasis then flow as one paragraph and wrap under each other, with no markup change in the fourteen places that render checklists. *Alternatives:* a two-column grid with one content `<span>` per item (needs every caller rewritten, and any caller that forgets the span breaks again); `display: block` with a floated icon (wrapped lines run under the icon).
2. **The brand never shrinks.** The header row already has a gap; the defect is that flex shrinks the brand's box when the header is full, so its text spills over the first link. `flex-shrink: 0` on the brand keeps it whole, and the check measures drawn text, not boxes.
3. **Help "I want to" once per group.** The group heading carries the lead-in ("I want to…"), and entries read as tasks ("get reminders on my phone"). It keeps the task phrasing the help spec requires, with no repeated element to wrap.
4. **Source list titles from the bundle.** A small helper reads the `<title>` of `.bundle/docs/<path>/index.html` at build time, strips the " · OpenTodo docs" suffix and uses it as link text. A missing page already fails the link check, so the helper cannot invent a title. *Alternative:* a hand-kept title map; rejected because it drifts from the bundle.
5. **Grids that fit their count, in CSS.** Three-column grids (`.grid-3`, `.post-grid`) use six tracks with cards spanning two; when the count leaves one or two cards over, `:has(> :last-child:nth-child(3n+1|3n+2))` widens the last four or two cards to half the row (4 → 2+2, 7 → 3+2+2, 2 → 2, 1 → one half-width card). Every page gets it without a component change.
6. **Layout checks in Playwright, link text in the dist check.** The geometric checks need a rendered page, so they go in `tests/layout.spec.ts` over `sitePages()` at three widths: for each `.checks li`, all descendant text boxes of its content cell share the same left edge or flow inside it; header items have ≥ 16 px between bounding boxes; for each grid, no last row with one item when the column count is three. Path-shaped link text (text that equals the `href`, starts with `/` or `http`) is a static rule added to `scripts/checks/links.mjs` with a unit test.

## Risks / Trade-offs

- [The geometric check may be flaky with web fonts loading late] → wait for `document.fonts.ready` before measuring, as the existing width spec does.
- [Some cards are meant to be alone, such as a featured card] → the grid rule applies only to elements with the grid class; featured layouts use their own class.
- [Translated cost pages share the English facts] → the hero facts move into the language dictionaries with the other cost strings; `i18n.test.mjs` already fails on a missing key.

## Effect on build and downloads

Build time: the title helper reads about 30 small HTML files; the layout spec adds roughly a minute to `npm run test:browser` (157 pages × 3 widths, measuring only). Visitors download a few hundred bytes less CSS; no new JavaScript.
