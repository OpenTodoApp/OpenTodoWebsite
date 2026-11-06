# Proposal: landing-hosted-card

## Why

The home page's "Three ways in" says OpenTodo is not offered as a hosted service. PikaPods now runs managed OpenTodo pods and shares part of its revenue with the project (hosting-choice). The home page should show that option as one of the ways in, with the same weight as the others and never above running your own.

## What Changes

- "Three ways in" becomes "Four ways in": Try the demo, Hosted for you (PikaPods, from $2 a month, updates and HTTPS handled, part of what you pay supports OpenTodo), Join a server, Run your own. Four equal cards with the same layout; only the demo keeps the primary button.
- The intro no longer says OpenTodo is not offered as a hosted service; it says OpenTodo has no cloud of its own, so there is nothing to sign up for on the site.
- The hosted card's second link leads to `/start/#run`, where the disclosure stands in full.
- The grid is one column on phones, two from 768 px and four from 1100 px.
- All seven languages of the home page.

## Out of scope

- The header and navigation (no new items), `/start/`, `/install/` and `/support/` (hosting-choice), a blog post.

Pages affected: the home page in every language.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `marketing-website`: "Paths to get OpenTodo on the home page".

## Impact

`src/components/home/HomeStory.astro`, `src/i18n/*.mjs`, `src/styles/site.css`, `scripts/test/hosting.test.mjs`. Depends on hosting-choice (`SITE.pikapods`, `/start/#run`). No new dependency.
