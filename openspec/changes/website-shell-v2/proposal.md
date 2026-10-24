# Proposal: website-shell-v2

## Why

The header leads to 16 places: four flat links, a Learn menu with eight more, four more links and two buttons. The footer has about 40 links. Visitors can't tell what matters, and the app's own shell is much quieter. The redesign (round 2, accepted) reduces the header to five destinations and one primary action, and the footer to four short columns.

## What Changes

- **Header:**
  - Links: **Features · Learn · Compare · Docs · Blog**. Blog appears while a post is published, as today.
  - Actions: **Try the demo** (secondary) and **Get started** (primary). The GitHub star count shows from 1360 px, as today.
  - The Learn `<details>` menu goes away. Learn is one page.
- **Phone menu** (below 768 px): the same five links and the two actions, in one `<details>` panel that works without JavaScript.
- **Footer:**
  - Four columns of at most five links: Product, Learn, Project, Community.
  - The brand line keeps the version sentence and the coffee and Discord buttons.
  - One fine-print line keeps the licence, source and specification links.
  - The language list stays.
- **Link targets in one place:** `NAV` in `src/lib/site.ts`, so later changes repoint them with a one-line edit. Until those pages exist:
  - Features → `/#features`;
  - Learn → `/help/` (its heading is already "What do you want to do?");
  - Get started → `/#get-it`.
  - `website-features`, `website-learn` and `website-get-started` change them to `/features/`, `/learn/` and `/start/`.
- **Pages that leave the navigation stay reachable** from the Learn page, from the home page and from each other: guides, how-tos, toolkit, topics, the quiz, the playground, capture, the planner, the cost page and the FAQ. Later changes fold them in with redirects.

**Out of scope**
- Page content.
- The new pages (Features, Learn, Get started).
- Redirects.

**Pages affected:** every page (the header and footer).

**New build dependency:** none.
