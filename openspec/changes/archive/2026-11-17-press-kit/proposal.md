# Proposal: press-kit

## Why

People writing about OpenTodo, listing it in a catalogue or putting it on a slide need its logo in the right form, and today they have to dig through the app repository for it. A press kit page gives them one address. It starts with the brand assets, and later sections (screenshots, fact sheet, quotes) can join it.

## What Changes

- A new page, **Press kit** (`/press-kit/`), linked from the footer's Project group. Its first section, Brand assets, shows a preview of each asset with download links:
  - the lockup on light and on dark;
  - the mark on light, on dark, black and white;
  - the app icon (rounded and square) and an avatar;
  - the social images;
  - the kit's README.

  A short list of usage rules and the licence go with them.
- The files come from the pinned bundle's `brand/` folder, which the build copies to `/brand/` (served from the bundle in dev). With a bundle that carries `brand/kit/` (app change `bundle-brand-kit`), the page offers the whole kit. With an older bundle, such as today's v0.22.0, it offers the files that bundle has: the colour mark, the mono mark, the wordmark and the 512 px icon.

## Out of scope

- Screenshots, a fact sheet, quotes and a contact for journalists. These are later sections of the same page.
- A single archive with every file. It would need an archiver at build time, and the folder link on GitHub serves that need.
- Translations: the page is English, like every page except the home page.

Pages affected: the new `/press-kit/` page and the footer.

No new build dependency.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `marketing-website`: a new requirement, "Press kit page".

## Impact

New `src/pages/press-kit.astro` and `scripts/lib/presskit.mjs` with a test. The brand integration in `astro.config.mjs` also copies the bundle's `brand/` folder, and `SiteFooter.astro` gets the link.
