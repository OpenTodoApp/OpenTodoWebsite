# Design: website-article-layout

## D1. Layout
- **Bar:** an ordered list for the breadcrumb, with the current page marked `aria-current`. The previous and next links have visually hidden labels naming their target; at the ends of the list they show as disabled.
- **Grid:** `minmax(0, 1fr) 17rem` from 1024 px. The main column is capped at 44 rem, and the summary and content are indented to line up with the title after the ring, as in the app's task page.
- **Facts column:** small uppercase headings and a definition list.
- **Phones:** the indent drops below 640 px.
- **Touch:** the previous and next buttons are 32 px with a mouse and 44 px on touch.
- No script.

## D2. Position comes from Learn
- `learnEntries()` (website-learn) gives the order. The page finds itself in its type's list, so "n of m" and previous and next match what `/learn/<type>/` shows.
- How-tos follow their fixed groups.

## D3. Docs titles from the bundle
- `docTitle()` in `src/lib/bundle.ts` reads the `<title>` of the bundle's docs page, so a source shows as "Recurring task rules" instead of `/docs/recurrence/`. A page without a title falls back to its path.

## Effect on build time and download size
- Each page reads a few docs titles from the bundle at build time; the effect on build time can't be measured.
- Each article's HTML is about the same size: the facts column replaces the sources and related sections.
