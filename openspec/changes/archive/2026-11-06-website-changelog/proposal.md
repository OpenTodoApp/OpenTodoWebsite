# Proposal

## Why

The owner wants the website to be more technical (addition to PLAN-1.0 Track C): a changelog page rendered from the app's CHANGELOG.md at the pinned version. The site bundle already carries it as `changelog.json` (used by the feed and About), so no change to the app repository is needed. Release posts and the footer linked GitHub's release pages, which show the same text without the site's navigation.

## What Changes

- New `/changelog/`: every released version, newest first, with an anchor per version, its date, summary, a GitHub link and its sections; the latest release open, older ones in disclosures; a sticky version list on wide screens and a jump disclosure on phones.
- The footer's "Release notes" (GitHub) becomes "Changelog" (`/changelog/`); a release post's notice links its version on the changelog.

Pages affected: new `/changelog/`, the footer, release posts. Out of scope: the feed (still links posts or GitHub), "Unreleased" entries (never shown). No new build dependency.

## Capabilities

### Modified Capabilities

- `website-content`: the changelog page, and the "What's new and feed" rule that release notes are not republished per release.

## Impact

New `src/pages/changelog.astro`, `scripts/test/changelog.test.mjs`; `src/lib/changelog.ts` (anchor helpers), `SiteFooter.astro`, `src/pages/blog/[slug].astro`, `src/styles/site.css`.
