# Design

## D1. One component, seven pages

`AppsPage.astro` renders the page from the `apps` strings of `src/i18n/<lang>.mjs`, like `HomeStory`. `src/pages/apps.astro` renders English and `src/pages/[lang]/apps.astro` the other languages, with the language note under the heading. `/apps/` joins `TRANSLATED_PAGES`, so the head carries hreflang alternates and the language switch leads to the page's own versions. The App Store listing address is one constant, `SITE.appStore`.

## D2. Unavailable stores

Google Play and F-Droid are `<span role="link" aria-disabled="true">` elements with no address: not focusable, announced as an unavailable link, the store name and its status as their text. They are drawn by the site (a dashed outline, muted text that still meets 4.5:1) because the stores' badges may only link to a live listing. The Apple badge is the official artwork already in `public/badges/`, unaltered.

## D3. Size

A few hundred bytes of CSS and HTML per page, no script and no image beyond the existing badge; seven more pages and social cards in the build (well under a second).
