# Proposal

## Why

The owner's brief for the landing page (PLAN-1.0 Track C): catchy, attractive and marketing-driven, with real screenshots, motion, and clear calls to action (try the demo, install), and less noise. The home page opened with a long briefing sentence as the headline, a label above it, a caption, a lede, two buttons and a note before the product; sections were numbered; the features part listed 42 feature names.

## What Changes

- Hero: the one-line claim the home page already had ("OpenTodo is a calm task list that runs on your own server.") as a large centred headline, one sentence, Try the demo and Get started, "No account, nothing to install."
- Product stage: the real app of the pinned release, crossfading Today (with its briefing sentence as the caption), quick add and a board; the phone app beside it from 1024 px. Pure CSS, still on Today with reduced motion.
- Your day as three columns; everything included as the six groups linking the new feature pages, with integrations and imports; yours for good as rows; the three ways in as three cards with one action each; the community invitation on one line with the Discord button; the end with both actions and the latest posts as rows.
- No section numbers, no label above the headline. Every language keeps the same sections and reuses its existing strings: no new translations needed.

Pages affected: `/` and `/de/ /fr/ /it/ /es/ /pt/ /zh/`. Out of scope: a recorded video or GIF (none is in the site bundle; adding one to the bundle is an app-repository change). No new build dependency.

## Capabilities

### Modified Capabilities

- `marketing-website`: the outcome-first home page and everything-included requirements.
- `website-languages`: the order scenario of the translated home page.

## Impact

`src/components/home/HomeStory.astro`, `src/styles/site.css` (the old `home-*` rules replaced by `lp-*`).
