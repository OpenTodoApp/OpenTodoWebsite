# Proposal

## Why

Todoist, Things and Linear win trust and search traffic with content around the product: Todoist's Inspiration hub (guides, methods, comparisons), its Toolkit (onboarding courses for teams), and template galleries. Visitors arrive with a question ("how do I do a weekly review?", "how do I set up a family task list?") and leave with the product. OpenTodo has none of this. The maintainer has little time to write but can review a lot, so the content must be drafted by agents and approved by a person. Its visuals must come from what we can produce truthfully and automatically: real screenshots of the app.

## What Changes

- **Template gallery (`/templates`).** Ready-made projects (weekly review, GTD setup, moving house, trip planning, product launch, household chores, and so on). Each has a framed screenshot and a downloadable file in OpenTodo's own export format that the existing importer accepts today. The future `templates` feature only adds a one-click button.
- **Method guides (`/guides`).** GTD, weekly review, time blocking, Eisenhower matrix through filters, inbox zero for tasks. Each shows the feature in action and links its template.
- **Toolkit (`/toolkit`).** "Set up OpenTodo for your household" and "…for a small team", for the person who runs the server and the people who just use the app.
- **A few ownership essays.** Why your task list should live on your server, what local-first means for you, leaving without losing anything.
- **"What's new" pages,** generated from `CHANGELOG.md` with screenshots of what changed, plus an RSS feed for the content sections.
- **Visuals from the product.** A framing style for the automated screenshots (device frames, crops and backgrounds from the colour tokens, light and dark), so every image is real and current.
- **An agent-drafted, human-approved content workflow:**
  - **Voice guide.** A guide in the repository for tone and for how we speak about competitors (factual, dated, honest about gaps).
  - **Fact rules.** Every product claim links to a spec or doc page, and the checks fail on dead links or stale "checked on" dates.
  - **Backlog.** A content backlog file listing upcoming pieces.
  - **Draft PRs.** An optional scheduled agent that opens one draft pull request every two weeks with a rendered preview. Nothing merges without maintainer approval.

## Out of scope

- People profiles, customer stories, remote-work essays and a newsletter. They need ongoing editorial work we cannot sustain.
- AI-generated imagery. Visuals are real screenshots and, later, a small commissioned or openly licensed illustration set.
- The home page and comparison pages (in `website-switcher-pages`) and the in-app templates feature (a future `templates` change).
- The build platform, layout and checks (`website-platform`).

Advances no ROADMAP.md capability directly. It supports adoption, like `website-switcher-pages`.

## Capabilities

### New Capabilities

- `website-content`: the template gallery, guides, toolkit, essays, "what's new" pages and RSS feed, their structure and calls to action, and the rules every published piece follows (sources for claims, review before publishing, freshness).

### Modified Capabilities

None. The navigation entries for Templates and Guides are specified in `website-content`, so this change doesn't depend on `website-switcher-pages` being archived first.

## Impact

- **Website:** new content collections (`templates`, `guides`, `toolkit`, `essays`) and pages in `src/`, the RSS feed and "what's new" pages from the bundle's `changelog.json`.
- **App repository (small, separate change there if needed):** template screenshots come from the app's screenshot script. Template files are checked by importing them into a throwaway OpenTodo server of the pinned release in this repository's CI.
- **Repository:** voice guide, content backlog and fact-check rules, plus an optional scheduled routine that opens draft pull requests.
- **App and server:** none. Templates use the existing importer and own export format.
- **Depends on:** `website-platform`. It reuses the screenshot frame from `website-switcher-pages` when available.
