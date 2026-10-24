# Design: website-learn

## D1. One list from the collections
- `src/lib/learn.ts` reads the toolkit, switch, guides, howto and templates collections into one list of entries: type, title, summary, address, topic, length, how-to group, tags and order.
- **Topic:** the first topic whose tags the entry carries (`src/lib/topics.mjs`).
- **Length:**
  - reading time at 200 words a minute for guides and toolkit pieces;
  - the how-to's `minutes`;
  - the template's layout;
  - "Switch guide" for switch pages.
- Drafts are left out, as on the old indexes.

## D2. Pages
- **Shared component:** `LearnLibrary.astro` holds the facets (types with counts, topics with counts, the method quiz) and the grouped rows.
- **Group headers:** the filled group bar (`website-precision-look` D6). On `/learn/` each group has "See all", which opens its type page.
- **Rows:**
  - icon, title link, topic, type and length;
  - below 768 px only the icon, the title and the length remain.
- **Facets:**
  - from 1024 px they sit beside the list;
  - below that, the types are a row of links and the topics a `<details>` (open on a topic page).

## D3. Breadcrumbs and links
- **Breadcrumbs:**
  - how-to → `/learn/how-tos/`;
  - guide → `/learn/methods/` ("Methods");
  - toolkit piece → `/learn/setup/` ("Start here");
  - the quiz → Methods.
- **Other links:** the template gallery's "browse by topic" button, the 404 page and the translated FAQ's Help link now point to Learn.
- `scripts/check-content.mjs` knows the new routes, so a content link to a removed index fails the content check.

## D4. Redirects and their check
- **Redirects:** exact `location =` redirects for each removed index (with and without the trailing slash), and regex redirects for topics and tags.
- **The check:** `scripts/checks/redirects.mjs` parses `nginx.conf` and fails when:
  - a target isn't built;
  - a target's fragment is missing;
  - an exact redirect shadows a page that is still built;
  - a regex's `# e.g.` sample doesn't match it.
- A unit test covers each failure. Later changes (Get started, Compare, What's new) add their redirects here and get the same check.

## Effect on build time and download size
- **Pages:** 7 index pages are removed and 11 Learn pages added; the build time change is unmeasurable.
- **Size:** the Learn page is about 45 kB of HTML for 53 entries, with no script and no image.
