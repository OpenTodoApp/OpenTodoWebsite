## Why

The home page is where most visitors arrive, and on Tuesday 17 November a Show HN post sends many more. Today it never mentions that OpenTodo can be supported: the way to the support page is the footer's Project group and the end of blog posts. The project now has to cover its running costs (the support page lists about €230 a month), so a visitor who likes what they see should find the support page from the home page, in one quiet place, without a banner or a nag.

## What Changes

- The home page's closing line, which already reads "All posts · Star OpenTodo on GitHub", gains a third text link, "Support OpenTodo", leading to `/support/`, in every home page language.
- Nothing else: no header button, no pill, no new section, and the support page's wording stays as the maintainer wrote it.

## Capabilities

### Modified Capabilities

- `website-community`: "Ways to the support page" adds the home page's closing line.

## Impact

- `src/components/home/HomeStory.astro`, one string per home page dictionary (`src/i18n/*.mjs`), the tests that check the closing line.
- No script, no new dependency, no layout change.

## Out of scope

- The README and the release notes of the app repository (proposed to the maintainer separately).
- Sponsor tiers and what sponsors get: they live on GitHub Sponsors and Buy Me a Coffee and are the maintainer's.
- A hosting partners line: added only once a partner has agreed in writing.
