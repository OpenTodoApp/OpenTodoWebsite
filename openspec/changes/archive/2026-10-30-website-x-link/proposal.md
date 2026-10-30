# Proposal

## Why

OpenTodo has an account on X (https://x.com/opentodoapp) where releases and the work in progress are posted in short form. The site links the repository, the Discord server and the coffee page from every footer and names them on About; the X account is not reachable from the site.

## What Changes

- The footer's Community list, on every page in every language, gets an "X" item after Discord, pointing at the account.
- The About page's "Who makes it" section names the X account as the place to follow releases and work in progress in short form, as a link.
- The address is one entry in the site-wide constants, like the Discord invite, so a changed handle is one edit.

Pages affected: the shared footer (every page), `/about/`. Out of scope: an X button like the Discord one (text links only, since X's mark and colours would read as an endorsement the Discord button does not carry), a home page section, embedded posts or any request to an X address, a Threads link (added when that account exists). No new build dependency.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-community`: a new requirement for the X link in the footer and on About.

## Impact

- `src/lib/site.ts` (the `x` constant), `src/components/SiteFooter.astro` (one list item), `src/pages/about.astro` (one sentence with a link), `scripts/test/community.test.mjs` (one test).
