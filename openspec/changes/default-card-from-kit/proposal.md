# Proposal: default-card-from-kit

## Why

The site's default social card, `/assets/og.png`, is a copy of the home page's card (website-seo-depth D6). The docs pages of bundles before 0.23.0 name it, and so do links shared earlier. From app 0.23.0 the site bundle carries the brand kit (`brand/kit/`, bundle-brand-kit), whose `og-default-1200x630.png` is the brand's own default card: the new tray mark, the outlined wordmark and the tagline. The docs pages of that release name the kit card directly (app change brand-assets-everywhere). The site's default card should be the same file.

## What Changes

- `/assets/og.png` is the pinned bundle's `brand/kit/png/og-default-1200x630.png` when the bundle has it, and the home page's card otherwise (v0.22.0 and earlier).

## Out of scope

- The per-page cards (unchanged; they take the bundle's mark already) and bumping `bundle.json`.

Pages affected: none directly; the default card shown for the docs pages and older shared links.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-platform`: a new requirement, "Default social card from the bundle".

## Impact

`scripts/lib/og.mjs`, `scripts/og.mjs`, `scripts/test/og.test.mjs`. No new dependency.
