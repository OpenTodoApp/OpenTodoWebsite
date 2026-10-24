# Proposal: website-retire-whats-new

## Why

Releases are announced twice: as one "What's new" page per version, generated from the bundle's changelog (16 pages), and as release posts on the blog. The app's GitHub releases carry the same notes in full. The redesign decided to drop the "What's new" pages in favour of the release posts plus the full release notes.

## What Changes

- **Pages removed:** `/whats-new/` and `/whats-new/<version>/`, each with a 301 in `nginx.conf`:
  - the index → the blog's Releases category;
  - a version with a published release post (0.3.0, 0.6.0, 0.9.0) → that post;
  - every other version → its release notes on GitHub;
  - 0.7.2, which was not published on its own, → 0.8.0's notes, which include it.
- **The feed** still lists every release of the pinned bundle's changelog. Each links its release post when one is published, and its release notes otherwise.
- **Links that pointed at What's new** now point at the release post or the release notes:
  - the footer ("Release notes");
  - About, the demo status page, the shipped notice on posts, and release posts' "full list of changes";
  - three how-tos or toolkit pieces, and the welcome post;
  - the home page's structured data. Its `softwareHelp` also moves from the old Help page to Learn.
- **The redirect check** accepts redirects to another site and checks only redirects that stay on this one.

**Out of scope:** writing release posts for past versions.

**Pages affected:**
- the removed What's new pages;
- the footer on every page;
- About, status, the blog post template, the feed, and the four content pieces listed above.

**New build dependency:** none.
