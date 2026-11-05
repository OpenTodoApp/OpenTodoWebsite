# Proposal: brand-from-bundle

## Why

The site's logo is a hand-made copy in `public/assets/` (`favicon.svg`, `apple-touch-icon.png`), and the social cards draw a tick of their own in `scripts/lib/og.mjs`. Both show a plain tick that the app has not used since its open-loop mark (sidebar-v2), and they break "Released facts only": icons must come from the pinned site bundle. The app has now changed its mark again (the tray mark, app PR 902). This change makes the site follow the bundle, so the next pin shows the tray without another edit.

## What Changes

- The favicon, the Apple touch icon, the header and footer mark and the mark on every social card come from the pinned bundle's `brand/` folder (`mark-colour.svg`), at build time and in the dev server.
- The hand-made `public/assets/favicon.svg`, `apple-touch-icon.png`, `pwa-512.png` and `og.png` are removed. The last two are referenced nowhere.
- Pinned to v0.22.0, the site shows that release's open-loop mark. The tray mark appears with the first bundle pin of a release that carries it.

## Out of scope

- Bumping `bundle.json`: that happens with the next app release.
- The site's layout, colours and the social card's text and layout.
- The wordmark: the header and footer keep "OpenTodo" as text in the site's typeface.

Pages affected: every page (the header, footer, favicon and social card).

No new build dependency: `sharp`, already used for the social cards, renders the touch icon.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-platform`: a new requirement, "Brand mark from the bundle".

## Impact

`astro.config.mjs` (a brand integration), `scripts/lib/brand.mjs` (new), `scripts/lib/og.mjs` and `scripts/og.mjs`, `public/assets/`, tests in `scripts/test/`.
