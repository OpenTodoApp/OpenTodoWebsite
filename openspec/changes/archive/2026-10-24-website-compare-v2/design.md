# Design: website-compare-v2

## D1. One page, three anchored parts
- **Head:** a jump row to the comparisons, What it costs and Questions.
- **Comparisons:** one card per comparison on the band: the audience, "Where {app} is ahead:" with the titles of its `gaps`, the checked-on date and the link.
- **What it costs:** the licence and the three checks beside the manifest's footprint facts, "Where it can live" as `.rows`, "The work" as the existing fine list, and one closing line on the per-person comparison and support.
- **Questions:** `<details open>`, so every answer reads without JavaScript.
- The FAQ data moves to `src/lib/faq.ts`, and the page builds the FAQPage JSON-LD from it.

## D2. Facts stay sourced
- The footprint comes only from the manifest fields the bundle carries, as on the old cost page.
- "Ahead" comes from each comparison's `gaps`, which the schema already requires, and every comparison keeps its `checkedOn` date.

## D3. Translations
- `TRANSLATED_PAGES` is `['/']`. The `cost` and `faq` blocks leave `src/i18n/*.mjs`, and the dictionary test keeps all five in the same shape.
- Old translated addresses redirect to the English anchors.

## Effect on build time and download size
- 12 fewer pages (the cost and FAQ pages in six languages).
- `/vs/` grows to about 35 kB of HTML, with no script and no image.
