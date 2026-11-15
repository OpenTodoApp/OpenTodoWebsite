# Proposal: dutch-site

## Why

The app's next release adds Dutch (Nederlands), with a reviewed catalog and quick add in Dutch (OpenTodo #1077, #1251). Visitors reading in Dutch are the ninth-largest browser language of the site (135 in the 30 days to 14 November; 303 visits from the Netherlands), and the site has no Dutch page. The day the release ships, a Dutch home page can say truthfully that the app, quick add and reminders are in Dutch.

The Chinese home page's language note is also out of date: it says the app speaks six languages, but the pinned release 1.4.2 lists 简体中文 among the app's languages. Its quick add still reads six languages, without Chinese.

## What Changes

- Dutch (`nl`, `nl_NL`) joins the site's languages: the home page `/nl/` and the phone apps page `/nl/apps/`, from the same components as every other language, with a Dutch dictionary `src/i18n/nl.mjs` of the German dictionary's shape, and the language switch, alternates and sitemap following.
- This change merges in the pull request that pins the first release whose language documentation lists Nederlands, not before (released facts only). Until then it waits as a draft.
- The Chinese language note says that the app is in Simplified Chinese too, chosen in its settings, and that quick add reads dates in English, German, French, Spanish, Italian and Portuguese, not yet in Chinese.

Out of scope: Dutch versions of other pages (the German path stays German only); other new languages; the feature catalogue's language count (it follows the bundle in the pin pull request).

Pages affected: `/nl/`, `/nl/apps/`, `/zh/` and `/zh/apps/` (the note), the language switch on every page, the sitemap.

## Capabilities

### New Capabilities
- (none)

### Modified Capabilities
- `website-languages`: the site's translated home and apps pages include Dutch, published with the release that ships Dutch.

## Impact

- `src/i18n/index.mjs` (`LANGS`), `src/i18n/dict.mjs`, new `src/i18n/nl.mjs`, `src/i18n/zh.mjs` (the note), `astro.config.mjs` (locales and sitemap), the tests that list the home page languages (`scripts/test/hosting.test.mjs`, `tests/no-js.spec.ts`).
- No new dependency. Two more pages to build; nothing changes for English visitors.
