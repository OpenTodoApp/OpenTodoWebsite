# Proposal

## Why

The iPhone and iPad app is in the App Store as a first release, and the site links every App Store badge straight to Apple. That first release shows the web app inside a native shell; it does not feel native and has glitches, and a fully native version is being built. A visitor who taps the badge should first read that, see where the other stores stand, and know that the installed web app is a good alternative. The maintainer asked for one page that does this (2026-11-10).

## What Changes

- A new page `/apps/`, in every site language (`/de/apps/`, `/fr/apps/`, …): the App Store badge linking to the App Store listing, Google Play and F-Droid as greyed, unavailable buttons with their status (closed testing; inclusion requested), one plain paragraph about the first version and the native version in progress with a link to the install guide, and one line on where the Android app comes from today.
- Every App Store badge and link on the site leads to `/apps/` in the page's language instead of to Apple: the home hero in every language, the iPhone and iPad install page notice and the install index.
- The footer's Product group links the page.

Pages affected: `/apps/` and its translations (new), the home pages, `/install/`, `/install/iphone-ipad/`, the footer. Out of scope: store artwork for Google Play and F-Droid (their badges may not be shown greyed or without a listing, so the site draws quiet buttons with the store names), dates for those stores, any change to the app. No new build dependency.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-help`: a phone apps page, and the App Store links lead to it.
- `website-languages`: the phone apps page is translated like the home page.

## Impact

- New `src/components/AppsPage.astro`, `src/pages/apps.astro`, `src/pages/[lang]/apps.astro`; `apps` strings in every `src/i18n/*.mjs`; `TRANSLATED_PAGES` gains `/apps/`; `HomeStory.astro`, `IosNotice.astro`, `install/index.astro`, `SiteFooter.astro`, `src/lib/site.ts`; `src/styles/site.css`; `scripts/check-content.mjs` knows the page; `scripts/test/i18n.test.mjs` checks the new strings.
