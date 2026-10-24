# Proposal

## Why

The template gallery and the guides are the two places Todoist keeps visitors browsing after they have understood the product: sixteen template categories with List, Board and Calendar tags, template pages that explain how to use and adapt each one, a catalogue of thirteen methods with tags and a quiz, and topic pages that gather everything on one subject. OpenTodo's gallery is ten templates under four category headings, its template pages are a summary and import steps, its guides are five essays with no way to pick by problem, and nothing collects content by topic. The pieces exist; they are not navigable.

## What Changes

- **Gallery filters.** Each template declares an audience (Everyone, Households, Professionals, Students, Teams) and a layout (list, board, calendar). The gallery shows both as tags on every card and offers filter rows that lead to static pages per audience and per layout, so filtering needs no script.
- **Template pages** gain "How to use it" and "Make it yours" sections from the front matter, a byline from the authors file, a "What is inside" preview rendered from the template file itself (every project, section and task, as the import will create them), similar templates, and the download repeated at the bottom.
- **Methods catalogue.** Guides carry tags (focus, procrastination, prioritisation, time management, task management, teamwork, habits, goals, ownership); the guides index becomes a catalogue with tag filters leading to static pages, and five guides join it: the Pomodoro technique, Eat the frog, Kanban for a small team, the PARA method and SMART goals as projects. Each sets the method up in OpenTodo with the features of the pinned release and links a template.
- **"Which method fits you?"** A two-question quiz rendered as a tree of static pages under `/guides/quiz/`: every answer is a link, every result has its own address naming a guide and a template.
- **Topic pages** (`/topics/` and five topics) that collect guides, templates, how-tos, toolkit pieces and posts by tag. Templates, how-tos and posts can carry the same tags.
- **Navigation:** Topics joins the Learn menu and the footer; the gallery, the guides and the quiz link each other.

## Out of scope (postponed to the app, or blocked on it)

- **One-click install** of a template from the site: needs the app change `project-templates` (ROADMAP "Parity and depth" 7). The site's download and import steps stay until then.
- **"Open in the demo"** for a template: needs the demo to accept an import from a URL, an app change. The template page points to the demo and the import steps instead.
- **New templates** (wedding, renovation, freelancer tracker, packing list, job search, exam revision, onboarding, content calendar): each needs its screenshots captured against the pinned app image by `npm run templates:check --shots`, which this session cannot run (no Docker daemon). They are added to the content backlog with their audience and layout, to ship one by one from an environment that runs the image.
- Videos, hosted sign-up, localisation.

Pages affected: `/templates/` and every template page, `/guides/` and the Learn menu, plus the new filter, quiz and topic pages. No new build dependency.

## Capabilities

### Modified Capabilities

- `website-content`: the template gallery gains filters and richer pages; guides become a tagged catalogue with a quiz; topic pages collect content by tag.

## Impact

- **Website:** `src/content/schemas.mjs` (template `audience`, `layout`, `howToUse`, `makeItYours`, `author`, `tags`; `tags` on articles, how-tos and posts), the ten template entries (new front matter), five new guide entries, tags on the existing guides, some how-tos and two posts, `src/lib/quiz.ts`, `src/lib/topics.mjs`, components `TemplateGrid` and `TemplateFilters`, new pages under `templates/for/`, `templates/layout/`, `guides/tag/`, `guides/quiz/`, `topics/`, the header and footer, `scripts/check-content.mjs`, unit tests, `content/BACKLOG.md`.
- **Visitors:** about 35 more static pages; no new script. Template pages grow by the rendered task list (a few KB).
- **Dependencies:** none.
