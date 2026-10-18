# Proposal

## Why

Professional open-source sites earn trust with a person and with evidence. OpenTodo's about page has neither in front: no face or note from the maintainer, and the facts beside its headline are the first and latest release dates, 11 and 18 October 2026, which tell a careful buyer the project is one week old. What lasts is elsewhere on the page: the licence, the published specifications, the documentation, the export format. The bundle already carries real, checkable figures for these (78 specifications, 115 documentation pages, 10 import formats, 6 quick-add languages), so the site can show proof without inventing anything.

## What Changes

- The about page opens with a short note from the maintainer, in the first person, with their photo and name from `authors.json`, saying why OpenTodo exists and how it is run.
- The facts beside the about page's headline become durable ones from the bundle manifest: the licence, the number of published specifications, the number of documentation pages and the number of import formats. Release dates move into a "Release history" line further down that links `/whats-new/`.
- A "Proof" strip, available to any marketing page, shows those same bundle figures, each linking to where a visitor can check it (the specifications on GitHub, `/docs/`, the import docs). The home page's closing section and `/developers/` use it.
- `authors.json` gains an optional `photo` (a file in the repository, never a remote image) and an optional `note`; the post page's author box shows the photo when present.

Out of scope: figures fetched at build time from GitHub or any other service (stars, contributors, downloads), testimonials, "used by" logos or lists, and any number not present in the pinned bundle. The maintainer supplies the photo and approves the note; agents never add or alter a photo of a person.

Pages affected: `/about/`, the home page's closing section, `/developers/`, the author box on every blog post.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `marketing-website`: "About and trust page" opens with the maintainer's note and leads with durable bundle facts; release dates move below.

The proof strip is a component that the existing "Consistent visual language" section types use; it needs no requirement of its own beyond the about page and the sourcing rules already in place. `marketing-website` comes from implemented, unarchived changes; archive them first. Apply after `website-section-system` (the strip is a Statement variant).

## Impact

- `src/pages/about.astro`, `src/pages/developers.astro`, the home page's `Close` section, a `ProofStrip.astro` component, the blog author box.
- `src/content/authors.json` and its schema in `src/content/schemas.mjs` (optional `photo`, `note`); the photo file under `src/assets/authors/`.
- No new build dependency (images go through the existing Astro image pipeline).
