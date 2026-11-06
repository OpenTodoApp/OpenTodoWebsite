# Proposal

## Why

Almost every page ends with the same band: "Your to-do list, on your own server.", a sentence, three buttons (demo, self-host, import), a support sentence, a paragraph about stars, coffee and Discord, and two brand buttons. Eight actions, two already in the header, repeated on every page whatever the visitor came for. The owner asked for something much sharper: less text and one clear, targeted action per context (PLAN-1.0 Track C). Most pages also open with a small uppercase label above the title that repeats the navigation.

## What Changes

- The closing band becomes one title and one action chosen by the page: Try the demo (features, learn, guides, how-tos, templates, install, playground), Get started (status), Install with Docker (self-host), How importing works (switch pages), OpenTodo on GitHub (developers, about), RSS (blog). Privacy and Accessibility end without one.
- Blog pages add one quiet line under it: free forever, and star, sponsor, coffee or the support page. Support stays in the footer of every page; nowhere else nags.
- The Support page notes that GitHub Sponsors and Buy Me a Coffee take one-off amounts or monthly memberships.
- The uppercase labels above page titles go, except where they carry information (the 404 code, the quiz step).

Pages affected: every page with the closing band, `/support/`, page heads across the site. Out of scope: the home page (its own change), the header and footer (previous change). No new build dependency.

## Capabilities

### Modified Capabilities

- `website-content`: content pages end with one contextual action.
- `website-community`: the closing band no longer shows the Discord and coffee buttons; the support line moves to blog pages.
- `website-blog`: a post ends with the follow action and the support line.

## Impact

`src/components/EndCta.astro`, the pages using it, `src/pages/support.astro`, `src/styles/site.css`, `scripts/test/community.test.mjs`.
