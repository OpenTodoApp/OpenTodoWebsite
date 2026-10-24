# Proposal: website-learn

## Why

Five index pages cover overlapping ground:
- `/guides/` (methods);
- `/how-to/`;
- `/toolkit/` (setup);
- `/topics/` (a regrouping of the other three);
- `/help/` (a task list linking into all of them).

Each has its own look and its own filters, and none shows the whole library. The redesign replaces them with one Learn library that lists everything in the app's row grammar, filtered by type and topic. The header's Learn link opens it.

## What Changes

- **New pages:**
  - `/learn/`: three places to start, type and topic facets, then every entry grouped by type, one row each with topic, type and length.
  - `/learn/<type>/` for each type: setup, switch, methods, how-tos, templates. How-tos are grouped in their fixed order.
  - `/learn/topic/<slug>/` for each topic, with "From the blog" as before.
  - Every filter is a static page, so it works without JavaScript. Phones get the types as a row of links and the topics folded in a `<details>`.
- **Removed index pages, each with a 301 in `nginx.conf`:**
  - `/help/` → `/learn/`;
  - `/guides/` → `/learn/methods/`;
  - `/how-to/` → `/learn/how-tos/`;
  - `/toolkit/` → `/learn/setup/`;
  - `/topics/` → `/learn/`, and `/topics/<slug>/` → `/learn/topic/<slug>/`;
  - `/guides/tag/<tag>/` → the topic that holds the tag.
  - Article pages (`/guides/<slug>/`, `/how-to/<slug>/`, `/toolkit/<slug>/`, `/switch/<slug>/`, `/templates/<slug>/`) keep their addresses. Their breadcrumbs point into Learn.
- **A redirect check (`npm run check:redirects`, part of `check:dist`):** every `return 301` in `nginx.conf` must lead to a built page and fragment, and an exact redirect must not hide a page that is still built. Regex redirects are checked on sample paths written beside them.
- **Header and footer:** `NAV.learn` points to `/learn/`.
- **"Something is wrong"** moves from the help page to `/learn/`: the troubleshooting how-tos, the Discord link and button, and the issue tracker (website-community "Where to ask a question").

**Out of scope**
- The article layout (`website-article-layout`).
- `/switch/` and `/templates/` as indexes: they stay, and Get started and the template gallery link them.

**Pages affected:** the five index pages above (removed), the new Learn pages, breadcrumbs on article pages, and the 404 page.

**New build dependency:** none.
