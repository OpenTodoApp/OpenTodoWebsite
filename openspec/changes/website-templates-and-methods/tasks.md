# Tasks

## 1. Schemas and data

- [x] 1.1 Add `audience`, `layout`, `howToUse`, `makeItYours`, `author` and `tags` to the template schema, `tags` to articles, how-tos and posts, with `CONTENT_TAGS`, `TEMPLATE_AUDIENCES`, `TEMPLATE_LAYOUTS` and unit tests. Verify `npm test` passes and a template with `layout: gantt` fails the schema test.
- [x] 1.2 Fill the new front matter on the ten templates and tag the existing guides, relevant how-tos and the ownership posts. Verify `node scripts/check-content.mjs` passes.

## 2. Templates

- [x] 2.1 Build `TemplateGrid` and `TemplateFilters`, the gallery with filters, `/templates/for/[audience]` and `/templates/layout/[layout]` (D1). Verify the board page lists only board templates and `npm run check:dist` finds no broken link.
- [x] 2.2 Rebuild the template page (D2): usage and adaptation sections, byline, "What is inside" from the front matter, similar templates, repeated download. Verify the preview of the weekly review lists its three sections and their tasks, and the page reads at 360 px without JavaScript.

## 3. Methods

- [x] 3.1 Rebuild the guides index as a catalogue with tag filters and `/guides/tag/[tag]` (D3). Verify each tag page lists the right guides and templates.
- [x] 3.2 Write the five new guides (Pomodoro, Eat the frog, Kanban, PARA, SMART goals), each linked to a template. Verify the claim lint passes.
- [x] 3.3 Build the quiz tree and pages (D4). Verify 4 question pages and 12 result pages are built, each result links an existing guide and template, and a deliberately wrong slug fails the build (then revert it).

## 4. Topics and navigation

- [x] 4.1 Build `src/lib/topics.mjs`, `/topics/` and `/topics/[slug]` (D5); add Topics to the Learn menu and the footer; register the new routes in `scripts/check-content.mjs`; update the no-JavaScript test's menu list. Verify every topic page has at least one section and `npm run test:browser` passes.
- [x] 4.2 Add the postponed templates to `content/BACKLOG.md` with audience and layout, and note the app dependencies (one-click install, open in the demo) in the proposal. Verify the backlog renders.
- [x] 4.3 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser`; review the gallery, a template page, the guides index, a quiz result and a topic page at 360 and 1280 px in light and dark. Verify all pass and `openspec validate --all --strict` passes.
