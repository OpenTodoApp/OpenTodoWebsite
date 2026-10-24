# Proposal

## Why

Todoist ships its site in about twenty languages; OpenTodo's site is English only, while the app's quick add already understands German, French, Italian, Spanish and Portuguese, and the app's own localisation is on the roadmap in that order. A German household deciding whether to run a server should be able to read the three pages that decide it (the home page, what it costs, the FAQ) in German, and search engines should know those pages exist. Everything else, the docs included, can stay English for now, as long as the site says so plainly.

## What Changes

- **Six languages, English first.** The site declares its languages (English, German, French, Italian, Spanish, Portuguese: the five the app's quick add speaks, which keeps the count under the maintainer's cap of ten) and the pages that exist in every language: the home page, "What it costs" and the FAQ, at `/<lang>/`, `/<lang>/cost/` and `/<lang>/faq/`.
- **Translated pages from dictionaries.** One dictionary per language (`src/i18n/<lang>.mjs`) holds every string of those three pages; the pages render from them with the same facts as the English originals (the footprint and version from the bundle, the demo lifetime from the docs). The translated home page uses a real screenshot in place of the English-only live miniature and feature tour.
- **Honest about scope.** Each translated page carries a note that this page is in the reader's language while the rest of the site, the documentation and the app itself are in English, and that the app's quick add understands dates and times in their language.
- **Discovery.** `hreflang` alternates (plus `x-default`) in the head of every translated page and its English original, `og:locale` per language, the page's `lang` attribute, the alternates in the sitemap, a language bar under the header on translated pages and a language row in the footer of every page.
- **Checks.** A unit test proves every dictionary has exactly the same strings as the German one, no empty values, only known placeholders and only internal links; the existing accessibility, no-JavaScript and width tests run over the new pages like any other.

## Out of scope

- Translating the docs (they come from the app's bundle), the how-tos, guides, templates, comparisons and switch pages. They follow when the app itself is localised.
- A language negotiation redirect: static pages, explicit links; the visitor chooses.
- More than six languages: the dictionaries make adding one a single file, within the cap of ten.

Pages affected: fifteen new pages, the layout's head on every page, the footer. No new build dependency.

## Capabilities

### New Capabilities

- `website-languages`: which languages the site has, which pages exist in them, how the translated pages stay true to the English facts, and how they are discovered.

## Impact

- **Website:** `src/i18n/` (index, dictionaries, helpers), `src/pages/[lang]/` (three pages), `src/components/LangNote.astro`, `src/layouts/Base.astro`, `src/components/SiteFooter.astro`, `astro.config.mjs` (i18n and sitemap alternates), styles, a unit test.
- **Visitors:** fifteen static pages; the footer gains six links; no script.
- **Dependencies:** none.
