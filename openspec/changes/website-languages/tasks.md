# Tasks

- [x] 1.1 Add `src/i18n/index.mjs` (languages, translated paths, helpers) and `dict.mjs`, and the five dictionaries with the strings of the home, cost and FAQ pages (D1, D2). Verify `npm test` runs the shape test and it passes.
- [x] 1.2 Build `src/pages/[lang]/index.astro`, `cost.astro` and `faq.astro` and `LangNote` (D3). Verify each builds for the five languages, the German cost page shows the manifest's figures, and every page passes the accessibility, no-JS and width tests.
- [x] 1.3 Add `lang`, `og:locale`, hreflang alternates and the language bar to `Base.astro`, the language row to the footer, the i18n config and sitemap alternates (D4). Verify the English FAQ head lists six alternates and `x-default`, a how-to's head none, and the sitemap carries `xhtml:link` alternates for `/de/cost/`.
- [x] 1.4 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser`; review the German home and the Portuguese FAQ at 360 and 1280 px. Verify all pass and `openspec validate --all --strict` passes.
