# Proposal: hosting-choice

## Why

PikaPods now offers managed OpenTodo pods (https://www.pikapods.com/apps/opentodo) and shares part of its revenue with the project. People who will not run a server should be able to find it, but it is one option among several: running OpenTodo on your own hardware stays first and carries the same weight. The maintainer approved the plan and the disclosure wording.

## What Changes

- `/start/` and `/install/` get a short "How do you want to run it?" choice: **On your own hardware** (free, full control; links to Docker, the binary, Raspberry Pi, NAS and server app stores) and **Managed hosting** (PikaPods, with the disclosure and a link to its OpenTodo page). Both have the same layout and button style; own hardware comes first.
- `/start/`'s "Run your own" path leads to that choice, and its server list is titled "On your own hardware".
- `/support/` names hosting on PikaPods as a way to help, under the ways to give money.
- The disclosure, in the maintainer's words, appears wherever PikaPods is offered: "PikaPods shares part of its revenue with the OpenTodo project. You get the same open-source OpenTodo, and you can export your data and move to your own server at any time." No page calls PikaPods recommended or the easiest way.

## Out of scope

- The home page's "Three ways in" (a separate change, landing-hosted-card), the header and navigation (no new items), and a blog post.
- Linking the app's PikaPods guide (`docs/self-hosting/pikapods.md`): it reaches the site with the next release pin.

Pages affected: `/start/`, `/install/`, `/support/`. All three pages are English only, like every page but the home page (website-languages), so there is nothing to translate.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `marketing-website`: "Get started page" offers the choice; a new requirement, "How to run the server".
- `website-community`: "Support page" names hosting on PikaPods.

## Impact

`src/components/RunChoice.astro` (new), `src/lib/hosting.ts` (new), `src/lib/site.ts`, `src/pages/start.astro`, `src/pages/install/index.astro`, `src/pages/support.astro`, `src/styles/site.css`, `scripts/test/hosting.test.mjs` (new). No new dependency.
