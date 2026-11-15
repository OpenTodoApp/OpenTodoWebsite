# Proposal: german-pages

## Why

German-speaking visitors are the site's largest audience: 4,704 of the visits in the 30 days to 14 November 2026 came from Germany, Austria and Switzerland, against 2,399 from the United States (the site's self-hosted analytics). Only the home page (`/de/`, the fourth most visited page) and the phone apps page exist in German, so a German visitor who goes one step further, to run it or to leave Todoist, lands in English. The two pages that answer those two steps are the self-hosting page and the Todoist switch guide.

Today the website-languages spec allows a translated page only when it exists in all six other languages. Translating these two pages into six languages would be six times the work and the upkeep for an audience the analytics do not show. This change lets a page exist in English and German only.

## What Changes

- `/de/self-host/`: the self-hosting page in German, from the same component as `/self-host/`, with the same sections in the same order, the same footprint figures from the bundle and the language note. The install tabs, the sync playground and the end band take their strings from the dictionary, English by default, so the English page is unchanged.
- `/de/switch/todoist/`: the Todoist switch guide in German. Its German text is a second entry of the switch collection, tied to the English entry: the same `checkedOn`, `sources` and `importFormat`, and the same number of kept, dropped and mapped items. The page template's own strings (headings, the "checked on" line, the term table, the sources list) come from the dictionary.
- A page may now exist in a subset of the site's languages. Its `hreflang` alternates and the sitemap list English, `x-default` and the languages it exists in, nothing else. The language switch still lists every language; a language without this page links that language's home page, as it does on English-only pages today.
- `/self-host/` and `/switch/todoist/` gain alternates for German; every other English page is unchanged.
- The unit tests check the German self-hosting strings against the English shape, the German switch entry against the English facts, and that the two German pages are the only partial translations.

Out of scope: these pages in French, Italian, Spanish, Portuguese or Chinese; the other switch guides; the documentation, which stays English and comes from the pinned bundle; any German page without an English original; translated page addresses (the paths keep the English slugs under `/de/`).

Pages affected: `/self-host/`, `/switch/todoist/`, the two new German pages, the header and footer language switch on those four pages, and the sitemap.

## Capabilities

### New Capabilities
- (none)

### Modified Capabilities
- `website-languages`: a page may be translated into some languages only, with alternates and the sitemap limited to the languages it exists in; the self-hosting page and the Todoist switch guide exist in German.

## Impact

- `src/i18n/index.mjs` (`TRANSLATED_PAGES` becomes per page and language), `src/components/LangSwitch.astro`, `src/layouts/Base.astro` (alternates), `src/i18n/en.mjs` and `de.mjs` (strings for the self-hosting page, the switch template, the two islands and the end band), `src/components/InstallTabs.astro`, `SyncPlayground.astro`, `EndCta.astro` (an optional strings prop), new `src/components/SelfHostPage.astro` and `SwitchPage.astro` extracted from the two pages, new routes `src/pages/de/self-host.astro` and `src/pages/de/switch/[slug].astro`, the switch collection schema (a `lang` field, default `en`), `scripts/test/i18n.test.mjs`.
- No new dependency. Two more pages to build and to check.
