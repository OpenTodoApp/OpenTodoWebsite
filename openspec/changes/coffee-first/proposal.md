## Why

On 16 November the owner said that people support OpenTodo mainly through Buy Me a Coffee, not GitHub Sponsors. Where both are offered, the way people use should come first, especially while a Show HN thread sends visitors to the support page.

## What Changes

- Buy Me a Coffee comes before GitHub Sponsors in the support page's two button rows, in the footer's Community row and in the support line at the end of blog posts.
- The wording and the buttons don't change; only their order does.

## Capabilities

### Modified Capabilities

- `website-community`: a new requirement, "Buy Me a Coffee first".

## Impact

- `src/pages/support.astro`, `src/components/SiteFooter.astro`, `src/components/EndCta.astro`, and a test.

## Out of scope

- The app repository's README, `FUNDING.yml` and release notes (OpenTodo #1429).
- The support page's wording, which stays the maintainer's.
