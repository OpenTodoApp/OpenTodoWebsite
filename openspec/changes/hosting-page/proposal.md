# Proposal: hosting-page

## Why

PikaPods runs managed OpenTodo pods (hosting-choice, landing-hosted-card), but a visitor only meets it inside `/start/`, `/install/` and the home page's cards. People who do not want to run a server need one short page that says what they get, how to set it up and what the arrangement is, reachable from the header.

## What Changes

- A new English page `/hosting/`: the headline, what you get (price and billing, managed updates and HTTPS, backups, welcome credit), four setup steps, the disclosure, a short "Prefer your own server?" block linking `/self-host/` and `/install/`, and one primary action, "Run it on PikaPods".
- The header gets a fifth destination, Hosting, after Blog, on desktop and in the phone menu, current on `/hosting/`. The header still never links PikaPods itself.
- The page is in the sitemap (automatic) and in the Features and Learn search index.
- `scripts/test/hosting.test.mjs` checks the page and the header and keeps the ban on "recommended" and "easiest" over every page that names PikaPods, `/hosting/` included.

## Out of scope

- Translations: `/hosting/` is English only, like every page but the home page (website-languages), and the header's labels are English in every language today, so "Hosting" stays English beside Features, Learn, Docs and Blog.
- A link to the app's PikaPods guide (`/docs/self-hosting/pikapods/`): it is not in the pinned bundle (v0.23.0); it is linked after the next pin.
- `/start/`, `/install/`, `/support/` and the home page's cards, a blog post.

Pages affected: the header on every page, the new `/hosting/`, `search.json`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `marketing-website`: "Five-destination navigation" (Hosting after Blog) and a new requirement "Hosting page".

## Impact

`src/pages/hosting.astro`, `src/components/SiteHeader.astro`, `src/lib/hosting.ts`, `src/pages/search.json.ts`, `src/styles/site.css`, `scripts/test/hosting.test.mjs`. No new dependency.
