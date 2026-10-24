# Proposal: website-home-languages

## Why

`website-home-v2` rewrote the English home page as one story in five parts but left the German, French, Italian, Spanish and Portuguese home pages on their old sections and copy, so a visitor who switches language gets a different, longer page that no longer matches the English one. On phones the home page is about 4,700 px tall, and the footer alone takes about 1,100 px of it: four link lists stacked in two columns, the languages, the licence links and the fine print.

## What Changes

- **Translated home pages follow the English layout:**
  - `src/pages/index.astro` and `src/pages/[lang]/index.astro` render one shared component, `src/components/home/HomeStory.astro`, so both have the same sections in the same order: the briefing headline over the Today screen, 01 your day, 02 everything included, 03 yours for good (with AI on your terms), 04 three ways in, the community invitation and the end band with the latest posts.
  - The English copy moves into `src/i18n/en.mjs` (`home`), and each language's `home` strings are rewritten in that shape; the old sections' strings are removed.
  - Facts still come from the pinned release: the screenshots, the feature groups and counts, the integrations and the import apps. Group titles are translated; feature names, integrations and app names stay as the app and its docs name them (in English, marked `lang="en"`).
  - Links without a translated target keep pointing at the English pages.
  - The translated pages keep the language note under the hero, corrected: in the pinned release the app itself speaks these languages (`/docs/language/`), so the note now says the app is in the language too and only the rest of the site and the docs are English.
- **Shorter footer on phones:** below 768 px the four link groups become disclosures, two per row, that open without JavaScript, and the languages, licence links and fine print get tighter spacing. From 768 px the footer is unchanged.

**Out of scope:**
- Translating other pages, the footer's words, the documentation or the blog posts (the latest posts stay English and are marked so).
- New claims: the translated pages say only what the English page says.

**Pages affected:** `/`, `/de/`, `/fr/`, `/it/`, `/es/`, `/pt/`, and the footer of every page at phone width.

**New build dependency:** none.
