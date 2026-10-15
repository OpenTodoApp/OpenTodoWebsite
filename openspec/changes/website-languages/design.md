# Design

## Context

- **Builds on** `website-first-visit` (the home page's get-it block, `/cost/`), `website-help-and-howtos` (the FAQ), `website-seo` (hreflang joins the head's metadata, the sitemap carries alternates).
- **The app's languages:** quick add is bundled for English, German, French, Italian, Spanish and Portuguese (`/docs/quick-add/#languages`); the interface itself is English, with localisation on the roadmap in that order. The site's languages follow the app's, so a reader is never promised a localised app the release does not have.
- **Constraint:** released facts only, the voice guide (calm, concrete, no prices), the cap of ten languages.
- **Specs:** `specs/website-languages/spec.md`.

## Decisions

### D1. Languages and paths
`src/i18n/index.mjs` lists the languages with their native names, `hreflang` codes and Open Graph locales, and the English paths that exist in every language. A translated page lives at `/<lang><english path>`; English stays unprefixed, as it is the site. Astro's `i18n` config names the locales so the sitemap integration emits the alternates. No redirect by browser language: static pages, explicit links, and a visitor who lands on the English page sees the languages in the footer.

### D2. Dictionaries, one per language
Each dictionary is one plain ESM object with the same shape: `common` (the shared buttons and the honesty note), `home`, `cost`, `faq`. Placeholders (`{licence}`, `{version}`, `{minimum}`, `{memory}`, `{demo}`) are filled at build from the bundle manifest and the site constants, so the translated pages state the same facts as the English ones and change with the pin. A unit test compares every dictionary's leaf paths with the German one, so a missing or extra string fails the tests, and checks that answers link only within the site or the docs. Registers follow the app's own examples in each language: "du" in German, "vous" in French, "tu" in Italian, Spanish and (European) Portuguese.

### D3. Translated pages mirror the English hierarchy
`src/pages/[lang]/index.astro`, `cost.astro` and `faq.astro` render from the dictionary with the English pages' structure, icons and docs links. The home page replaces the live miniature and the feature tour (English islands) with real screenshots from the bundle, so nothing on a translated page is half-translated. A `LangNote` under the hero says what is and is not in the reader's language. Links to English-only pages keep their English targets; the FAQ answers link the translated cost and home pages where they exist.

### D4. Discovery
`Base.astro` sets `<html lang>`, `og:locale`, and for every page that exists in all languages (translated or English original) a `link rel="alternate" hreflang` per language plus `x-default` pointing at English. Translated pages show a language bar under the header; every page's footer lists the languages, linking this page's versions when they exist and each language's home page otherwise. The social card renderer reads each page's title, so translated pages get cards in their language without further work.

## Effect on build and download
- Build: fifteen more pages, a few seconds.
- Download: translated pages weigh what the English ones do; the footer adds six links (under 0.5 KB) to every page. No script.

## Risks / Trade-offs
- Translations drift from the English copy when the English page changes. The dictionary shape test catches structure, not meaning; the review in the pull request catches meaning, and the English page's section order is mirrored so a diff reads side by side.
- The app is English; a German reader may expect a German app. The honesty note says so on every translated page, and the quick add languages are the one true localisation the release has.
