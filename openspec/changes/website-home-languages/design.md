# Design: website-home-languages

## D1. One component, strings per language
- `HomeStory.astro` takes the language and its `home` strings and renders every section; the pages only add `Base`, the head data and (English) the structured data.
- The English strings live in `src/i18n/en.mjs`. The unit test checks that every other language's `home` has exactly the English `home` shape and no empty string, so a string added to the English page fails the test until each language has it.
- Strings with inline links (the yours-for-good intro) carry their anchors as HTML, links within the site only, as the existing test already enforces. Counts are filled with `fill()` and a new `{count}` placeholder.

## D2. What stays English
- Feature names, integrations and import app names come from `src/lib/features.ts` and the bundle, name things as the app's English interface and docs do, and link to the English docs. They are rendered with `lang="en"` so screen readers pronounce them correctly.
- The latest posts are English and wrapped in `lang="en"`.

## D3. Footer below 768 px
- The four link groups become `<details>` disclosures, two per row, each opening to its links. They open by keyboard and pointer without JavaScript.
- Like the home page's feature groups, the footer renders the groups twice: the lists from 768 px and the disclosures below, each hidden at the other widths. The desktop footer is untouched; every page's HTML grows by about 1.5 kB.
- The brand line, the languages, the licence links and the fine print stay visible, with smaller gaps; links keep at least 24 px of target height (WCAG 2.2 target size, minimum).
- On the home page the phone section spacing is tightened (no content removed).

## Effect on build time and download size
- No new dependency, no script. The translated home pages shrink from about 11,000 px to about 4,500 px on phones, and the English home page from 4,666 px to about 4,100 px (the footer from about 1,090 px to 600 px). Build time is unchanged.
