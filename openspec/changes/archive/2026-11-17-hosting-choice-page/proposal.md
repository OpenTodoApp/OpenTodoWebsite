## Why

The owner, 17 November: `/hosting/` is a PikaPods landing page, and Railway shows up only as a name in its last line. The page should help a person choose where to run OpenTodo. Today it answers "should I use PikaPods?", but people arrive asking "where do I run this?".

## What Changes

- `/hosting/` becomes "Where to run OpenTodo". Under the title, three short lines say which option suits whom, each linking its column.
- Three options side by side, in one stated order (how much you look after yourself, least first): PikaPods, Railway, your own server. Each one shows the same six facts in the same order: cost and billing, setup, updates, backups, HTTPS and your own domain, and leaving with your data. Each has one button of the same weight and its setup steps.
- The hosts' facts are their own, read from each host's pages on the day and kept with that date in one site constant per host. Nothing is compared, ranked or called best.
- One disclosure, once: "These links support the project, which receives a share when they're used."
- The "Managed hosting" line at the end of the page goes. Its job, naming every listed host with the disclosure, is now the page itself. The listing rule stays beside the list in `src/lib/hosting.ts`.

## Capabilities

### Modified Capabilities

- `marketing-website`: "Hosting page" changes; "Managed hosting line" is removed.

## Impact

- `src/lib/hosting.ts` (the facts per host), `src/pages/hosting.astro`, a few lines of CSS, the search entry, `scripts/test/hosting.test.mjs`.
- No dependency, no script, no logo. English only, like the page today.
