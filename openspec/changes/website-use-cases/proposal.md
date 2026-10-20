# Proposal

## Why

People rarely search for a task manager by name; they search for a problem: "how to do a weekly review", "time-block my day", "shared shopping list for the family", "run a to-do app on a Raspberry Pi". Every page the site has today is organised by what OpenTodo is (comparisons, templates, guides, how-tos, topics), so those searches land on a method guide or a docs page at best, and on nothing at worst. A use-case page answers the problem in the visitor's words, shows the released app solving it in a few sourced steps, and hands over the template, the guide and the demo. The pinned release (v0.7.0) documents everything the first six pages need, so they can be written now without describing anything unreleased.

## What Changes

- **A `useCases` content collection** at `/use-cases/<slug>/`. Each entry declares in its front matter the problem as a visitor would phrase it, three to five steps that each link one documentation page of the pinned release, one screenshot from the bundle, the templates, guides, how-tos and toolkit pieces that fit, and a `lastReviewed` date that must be at most 180 days old at build time. The body (Markdown) carries the problem in the visitor's words and goes through the claim lint like every other collection.
- **One page layout** for every use case: the problem, the screenshot, the numbered steps with their documentation links, "Start from a template", "Read more", the documentation the page relies on, and the demo as the primary call to action at the top and in the closing calls to action. Readable without JavaScript at 360 px.
- **An index** at `/use-cases/` listing every published use case as a card.
- **Six use cases**, each listed below with the documentation it relies on (all present in the v0.7.0 bundle). Bodies are written at apply time, not here.
- **Navigation:** a "Use cases" entry in the header's product group (desktop link and the phone `<details>` menu) and in the footer's Product list; the home page's feature tour links each matching feature to its use case; `/self-host/` links the Raspberry Pi page.
- **Checks:** schema validation at build (stale date, unknown screenshot, unknown template or guide, a step whose documentation page is not in the bundle, fewer than three or more than five steps), the claim lint over the new collection, the existing link, emoji, script, accessibility, width and no-JavaScript checks over the new pages, a social card per page, and the pages in the sitemap.

### The first six pages

| Slug | Problem | Documentation each step relies on (pinned bundle) | Screenshot | Template(s) | Guide(s) and more |
| --- | --- | --- | --- | --- | --- |
| `weekly-review` | A weekly review and a GTD setup that you keep doing | `/docs/process-the-inbox/`, `/docs/labels-and-filters/`, `/docs/views/#build-a-dashboard`, `/docs/review-and-statistics/`, `/docs/recurrence/` | `dashboard` | weekly-review, gtd-setup | guides weekly-review, getting-things-done |
| `timeboxing-your-day` | Timeboxing: seeing whether the day fits before it starts | `/docs/time-blocking/#estimate-how-long-a-task-takes`, `/docs/time-blocking/#place-a-task-on-the-calendar`, `/docs/time-blocking/#see-whether-the-day-fits`, `/docs/other-calendars/`, `/docs/quick-add/` | `week` | study-plan, product-launch | guides time-blocking, pomodoro; how-to plan-your-day |
| `shared-household-list` | One list for the whole household, from the shopping list to the chores | `/docs/sharing/#share-a-project`, `/docs/sharing/#invite-with-a-link`, `/docs/sharing/#assign-tasks`, `/docs/notifications/`, `/docs/display-mode/#set-up-a-shared-screen` | `share` | household-chores, meal-planning, home-maintenance | toolkit household; how-tos share-a-project, invite-someone-with-a-link |
| `deep-work-and-focus` | Protecting a block of deep work and keeping the list quiet meanwhile | `/docs/time-blocking/#see-whether-the-day-fits`, `/docs/views/#narrow-a-list-by-duration`, `/docs/display-mode/`, `/docs/notifications/#reminders-inside-the-app`, `/docs/keyboard/` | `today` | study-plan | guides pomodoro, eat-the-frog, time-blocking |
| `planning-with-your-own-ai` | Planning with an AI assistant you choose, that cannot act without you | `/docs/ai-and-agents/`, `/docs/assistant/#use-your-own-provider-and-key`, `/docs/assistant/#ask-and-review`, `/docs/assistant/#undo`, `/docs/mcp/` | `assistant` | (none) | docs `/docs/ai-limits/`; the home page's AI section |
| `raspberry-pi` | The household's task list on a Raspberry Pi, for a few watts | `/docs/self-hosting/docker/#resource-usage`, `/docs/self-hosting/docker/#plain-docker-run`, `/docs/self-hosting/docker/#behind-a-reverse-proxy`, `/docs/backups/#destinations`, `/docs/install-app/` | `settings-backups` | (none) | toolkit raspberry-pi, your-first-server |

The deep-work page is published, scoped to what v0.7.0 documents: time blocks and estimates, the duration filter, display mode as a single full-screen view, snoozing reminders, and the keyboard. The bundle has no "focus list" or "daily check" page, so the page claims neither; if the maintainer wants the page built around such a feature, it is written `draft: true` with a front-matter note naming the release it waits for, and has no route until then.

Backlog rows the pages absorb (noted here, `content/BACKLOG.md` is not edited by this change): row 7 "Using your own AI model with your tasks" is covered by `planning-with-your-own-ai`, and row 2 "A shared shopping list that actually works" in substance by `shared-household-list` (the shopping list is its opening example and the Meal planning template is linked). The maintainer removes or narrows those rows in the pull request that ships the pages.

## Out of scope

- Comparison pages (`/vs/`), blog posts, new templates, pricing or cost pages, and any change to the app or its documentation.
- Use cases for features the pinned release does not document (a focus list, email to task as a GTD inbox beyond what `/docs/email/` says today): they join `content/BACKLOG.md` when a release documents them.
- Translated use-case pages (`website-languages` covers the pages it lists).

Pages affected: the new `/use-cases/` and `/use-cases/<slug>/`, the header and footer of every page, the feature tour on the home page, `/self-host/`. No new build dependency.

## Capabilities

### New Capabilities

- `website-use-cases`: use-case pages that answer a problem with the released app: the collection and its checked front matter, the page and index, their navigation and internal links, and the rules that keep them true to the pinned release.

### Modified Capabilities

None. The navigation, social card and sitemap requirements of `website-platform` already cover any new page; this change adds pages that satisfy them and states the use-case-specific rules in the new capability.

## Impact

- **Website:** `src/content/schemas.mjs` (`useCaseSchema`, `USE_CASE_MAX_AGE_DAYS`), `src/content.config.ts`, six entries in `src/content/use-cases/`, `src/pages/use-cases/index.astro` and `[slug].astro`, `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/lib/tour.ts` and `src/components/FeatureTour.astro` (a `useCase` link per feature), `src/pages/self-host.astro` (one link), `scripts/check-content.mjs` (the collection and its routes), `scripts/lib/og.mjs` (the section name), `tests/no-js.spec.ts` (the menu list), unit tests in `scripts/test/`.
- **Visitors:** seven more static pages; no new script, no new image (the screenshots are already rendered for other pages).
- **Dependencies:** none.
