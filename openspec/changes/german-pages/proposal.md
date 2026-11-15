# Proposal: german-pages

## Why

German-speaking visitors are the site's largest audience: 4,704 of the visits in the 30 days to 14 November 2026 came from Germany, Austria and Switzerland, against 2,399 from the United States (the site's self-hosted analytics). Only the home page (`/de/`, the fourth most visited page) and the phone apps page exist in German. A German visitor who goes one step further, to see what it does, to start, to install it on a device, to run it or to leave another app, lands in English. After the home page, the most visited pages are exactly those steps: Features, Get started, Install and Self-host.

Today the website-languages spec allows a translated page only when it exists in all six other languages. Translating these pages into six languages would be six times the work and the upkeep for an audience the analytics do not show. This change lets a page exist in English and German only, and translates the German visitor's path.

## What Changes

- German versions, under `/de/` with the English slugs, of:
  - the features catalogue: `/de/features/` and its six group pages, every feature with a German name and line;
  - `/de/start/`, with the ways in, where it runs, the devices and the switch guides;
  - `/de/install/` and its six platform pages;
  - `/de/self-host/`, with the install tabs, the sync playground and the data cards;
  - `/de/switch/`, the index of the switch guides, and the guides for Todoist, Microsoft To Do (where Wunderlist, made in Berlin, sent its users) and Things.
- Each German page renders from the same component as its English original, with the same sections in the same order, the same figures from the bundle and the language note. The components shared with the English pages (install tabs, sync playground, end band, the run choice, the catalogue) take their strings as an optional prop whose default is today's English, so the English pages are unchanged.
- The data the pages read get German twins: the feature catalogue, the platforms, the deploy targets, and a German entry of the switch collection for each of the three guides, tied to the English entry's facts. A unit test fails when an English item has no German twin, naming it.
- A page may exist in a subset of the site's languages. Its `hreflang` alternates and the sitemap list English, `x-default` and the languages it exists in, nothing else. The language switch still lists every language; a language without this page links that language's home page, as it does on English-only pages today.
- The German text is written by an agent and is not read by a person before merging, at the maintainer's decision.

Out of scope: these pages in French, Italian, Spanish, Portuguese or Chinese; the documentation, which stays English and comes from the pinned bundle (German pages link the English docs); the blog, method guides, how-tos, templates, toolkit, hosting and developer pages; the other six switch guides; translated page addresses.

Pages affected: the English originals of the pages above (their head gains the German alternate), the new German pages, the language switch on those pages, and the sitemap.

## Capabilities

### New Capabilities
- (none)

### Modified Capabilities
- `website-languages`: a page may be translated into some languages only, with alternates and the sitemap limited to the languages it exists in; the visitor's path (features, start, install, self-host, switch index and three switch guides) exists in German, and the German data stays complete by test.

## Impact

- Language plumbing: `src/i18n/index.mjs` (`TRANSLATED_PAGES` per page and language), `src/components/LangSwitch.astro`, `src/layouts/Base.astro`.
- Strings: `src/i18n/en.mjs` and `de.mjs` (page and component strings); German twins in `src/lib/features.ts`, `src/lib/install.ts`, `src/lib/start.ts` and `src/lib/hosting.ts` (the PikaPods note).
- Components: `InstallTabs`, `SyncPlayground`, `EndCta`, `RunChoice`, `catalog/Catalog`, `catalog/CatalogRows` gain an optional strings prop; new `SelfHostPage`, `StartPage`, `InstallIndex`, `InstallPlatform`, `SwitchIndex` and `SwitchPage` components extracted from the English pages.
- Routes: `src/pages/de/` with `features/index.astro`, `features/[group].astro`, `start.astro`, `install/index.astro`, `install/[platform].astro`, `self-host.astro`, `switch/index.astro`, `switch/[slug].astro`.
- Content: the switch collection gains `lang` (default `en`) and `src/content/switch/de/{todoist,microsoft-todo,things}.md`.
- Tests: `scripts/test/i18n.test.mjs`.
- No new dependency. Nineteen more pages to build and to check.
