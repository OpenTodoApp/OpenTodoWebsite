# Proposal

## Why

Almost every section on the site is built the same way: a small green label, a large heading, a grey paragraph, then a grid of cards with an icon tile. The home page repeats this ten times in 10,500 px, and the other pages follow it too. With every block at the same weight nothing leads, so good content reads as a patchwork, and the screenshots that should carry the product are shrunk to around 450 px, where the app's text cannot be read. The site needs a small set of distinct section types with rules for when each is used, so that pages get a rhythm and the product itself is the strongest visual.

## What Changes

- A defined set of five section types, each a component with its own layout: **Showcase** (one large product screenshot, full content width), **Statement** (one claim and at most one supporting fact, no cards), **Split** (text beside one image or one interactive demo), **Catalogue** (a dense grid or table of items, the only type that uses cards), and **Close** (the end-of-page call to action).
- Page composition rules: no two Catalogue sections in a row; at most two Catalogue sections per marketing page; the section label (kicker) only where a page has three or more sections, and never on two adjacent sections with the same visual type.
- Screenshot rules: a screenshot in a Showcase or Split is shown at least 640 px wide at 1280 px, or as a crop of the relevant part at its natural size; product shots are never scaled below the width at which their body text stays legible.
- The interactive sync demo becomes the site's signature visual: the same two-device illustration (static, with the demo's classes) introduces offline and sync wherever they are mentioned outside `/self-host/`.
- Blog cards without a cover show a typographic cover (the post title set large on a category tint) instead of an icon on a gradient.
- The "Buy me a coffee" button uses the site's secondary button style and appears only in the footer and on `/about/`, not in every page's closing section.
- The section types and rules are written down in `content/LAYOUT.md`, beside `content/VOICE.md`, for agents and the maintainer.

Out of scope: rewriting the home page's content and order (that is `website-navigation-and-home`, which uses these types), copy changes (`website-voice-and-releases`), new colours or fonts (they come from the bundle's tokens), and `/docs/`.

Pages affected: every marketing page (`/`, the `[lang]` home and cost pages, `/self-host/`, `/cost/`, `/developers/`, `/about/`, `/capture/`, `/vs/*`), the blog index and blog cards on the home page, and the closing section on every page. The `/switch/*` pages are step-by-step guides with the how-to layout, so they count as content pages and only get the new closing section.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `marketing-website`: "Consistent visual language" gains the section types, composition rules, screenshot legibility and the signature sync visual.
- `website-blog`: "Blog index" shows a typographic cover for posts without a cover image.

`marketing-website` is introduced by implemented but unarchived changes; archive them before this change. Apply after `website-layout-integrity`, whose count-aware grid the Catalogue type uses.

## Impact

- New components in `src/components/sections/` (`Showcase`, `Statement`, `Split`, `Catalogue`, `Close`), replacing ad-hoc section markup in the pages listed; `EndCta.astro` becomes `Close`.
- `ScreenshotFrame.astro` and `ShotPicture.astro` gain a crop option: a focus box per screenshot name, kept in `src/lib/crops.ts` (the bundle lists screenshots by path only, with no focus metadata).
- `src/components/blog/` card cover; `CoffeeButton.astro` restyled and removed from `EndCta`.
- `content/LAYOUT.md` (new), referenced from `AGENTS.md`.
- A composition check in `tests/layout.spec.ts` (from `website-layout-integrity`).
- No new build dependency.
