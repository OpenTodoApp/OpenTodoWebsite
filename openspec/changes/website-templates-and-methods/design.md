# Design

## Context

- **Builds on** `website-content-hub` (template and guide collections, `ArticlePage`, the template export and screenshots), `website-help-and-howtos` (how-tos, the Learn menu), `website-blog` (posts).
- **Research (todoist.com, 15 October 2026):** the templates gallery filters by category and tags each card List, Board or Calendar; a template page has About, How to use, a byline and Similar templates with the copy button repeated; the productivity-methods hub lists thirteen methods with category filters and opens with a quiz; the footer links topic pages (task management, time management, habit forming).
- **Constraint:** everything must work without JavaScript and come from the pinned release. Filters and the quiz are therefore static pages, and the "what is inside" preview is rendered from the same front matter the download is built from, so it cannot drift from the file.
- **Specs:** `specs/website-content/spec.md`.

## Goals / Non-Goals

**Goals:**
- A visitor finds a template by who they are and how they work, sees exactly what it creates before downloading, and knows how to adapt it.
- A visitor who does not know which method to try gets a recommendation in two clicks, with a guide and a template.
- Every piece of content on a subject is reachable from one page.

**Non-Goals:**
- One-click install, "open in the demo", new templates (see the proposal), a JavaScript quiz.

## Decisions

### D1. Filters as static pages
Templates declare `audience` and `layout`; the gallery renders a `TemplateFilters` row of links to `/templates/for/<audience>/` and `/templates/layout/<layout>/`, each a full page with the same cards (`TemplateGrid`). "Everyone" templates are listed after an audience's own on its page. Static pages instead of client-side filtering: no script, every filtered view indexable and linkable, the no-JS rule kept by construction.

### D2. Template page sections from front matter
`howToUse` and `makeItYours` are lists in the front matter (required, at least one each), rendered as numbered steps and a checklist; `author` names a key of `authors.json` and renders a byline. The "What is inside" section walks `projects`, `sections`, `tasks` and `subtasks` from the same data the export is built from, showing recurrence, estimate, priority and labels per task. Similar templates: same audience or category first, then shared tags, three at most. The download button is repeated under the preview. A pointer to the demo stands in for "open in the demo" until the app can import from a URL.

### D3. Tags and the methods catalogue
One tag vocabulary (`CONTENT_TAGS`) shared by guides, templates, how-tos and posts, validated by the schemas. The guides index lists every guide with its tags and a filter row of static pages `/guides/tag/<tag>/`, which also list the templates carrying the tag. The five new guides follow the existing shape: why it works, set it up in OpenTodo (every step linked to the docs of the pinned release), make it stick, and a template.

### D4. The quiz as a tree of pages
`src/lib/quiz.ts` holds a two-level tree: four answers to "what gets in the way most often?", each with three answers to a follow-up, each leaf a method with a guide, a template, a reason and an alternative. `/guides/quiz/` renders the first question; `/guides/quiz/[...answers]` renders the second question or the result from the tree, so there are 4 question pages and 12 result pages, all static, each with a trail of the answers chosen. The build fails if a leaf names a guide or template that does not exist. Two questions, not five: each extra level triples the pages and the reader's patience; the result is a suggestion to try for a week, not a diagnosis.

### D5. Topic pages
`src/lib/topics.mjs` (plain ESM so the content check can register the routes) defines five topics with the tags they collect: task management, time management, habits and routines, working together, owning your data. `/topics/[slug]` gathers guides, templates, how-tos, toolkit pieces and posts whose tags intersect; the ownership topic also takes posts from the ownership category. Empty sections are left out.

## Effect on build and download
- Build: about 35 more static pages, generated from existing content; a few seconds.
- Download: the gallery cards gain two tags each; a template page gains its rendered task list (2 to 6 KB of HTML). No new script or image.

## Risks / Trade-offs
- Tagging is a judgement; a mis-tagged piece shows on the wrong topic page. Tags are reviewed with the content in the pull request, and the vocabulary is small on purpose.
- The quiz's recommendations are opinions. They are phrased as "try this week", link alternatives, and can be re-taken from any result.
