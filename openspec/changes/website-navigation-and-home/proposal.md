# Proposal

## Why

The header carries eight top-level items, an eight-item Learn menu and two buttons; the footer's Product column lists twenty links; and seven pages overlap as places to find help (Help, How-tos, Guides, Toolkit, Topics, FAQ, Docs). A visitor cannot tell where to look, and the site looks like what it is: pages added one after another. The home page has the same problem in miniature: eleven sections, three hero buttons plus a GitHub link, "Try the demo" five times, and a 70-word hero paragraph. Both need an editor's cut so the site tells one story and every page has an obvious place.

## What Changes

- **Header:** Features, Compare, What it costs, Self-host, Resources (menu), Docs; on the right a GitHub icon link and one "Try the demo" button. The Resources menu lists Help, Guides, Templates, Switch from another app, Developers, Blog and What's new. Below 768 px one panel with the same two groups.
- **Help is the one entry point for doing something.** How-tos, the toolkit, topics, the FAQ and the install pages stay at their URLs but are reached from `/help/` (its groups gain "Browse by topic" and a link to the FAQ); they leave the header.
- **Footer:** four balanced columns (Product, Resources, Self-hosting, Project), languages as one inline row, licences and security in the bottom line.
- **Home page in seven sections, built from the section types of `website-section-system`:** hero (Split: headline, one sentence of at most 25 words, one primary button, two text links for self-host and import, the live miniature) → three ways to get OpenTodo (Catalogue, includes the switch links) → the product (Showcase, the tour) → why your own server (Split: household and cost, phone screenshots) → everyday features and what sets OpenTodo apart, in one grid (Catalogue, includes one entry for the assistant) → works offline (Split: the sync illustration, links to `/self-host/#sync`) → Close, preceded by one line linking the latest post.
- The assistant section, the separate "what you get from running it yourself" section and the "how it works" section leave the home page as standalone sections; their content is kept in the features grid, the ownership section and `/self-host/`, each with one link onward.
- The home page shows the latest post as one line above the closing section instead of three post cards.

Out of scope: page URLs (none removed or renamed, so no redirects), the content of the pages that move into Help, copy edits beyond the home page hero and section headings (`website-voice-and-releases`), translated home pages beyond the strings they share (the `[lang]` home pages follow the new order with their existing translated strings; new strings fall back as `website-languages` already allows).

Pages affected: the header and footer of every page, `/`, the `[lang]` home pages, `/help/`.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `website-platform`: "Shared layout and navigation" names the new header items and the four-column footer.
- `marketing-website`: "Grouped navigation" (Resources menu replaces Learn), "Outcome-first home page" (one primary call to action, a word limit for the hero), "Differentiators and proof on the home page" (the seven-section order and the merged grid).
- `website-help`: "Help landing" becomes the entry point for how-tos, toolkit, topics, FAQ and install pages.
- `website-content`: "Content navigation" places Guides and Templates in the Resources menu.
- `website-blog`: "Blog in navigation and on the home page" shows the latest post on the home page instead of three.

Except for `website-blog`, these capabilities come from implemented, unarchived changes; archive them first. Apply after `website-section-system`.

## Impact

- `src/components/SiteHeader.astro`, `SiteFooter.astro`, `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/[lang]/index.astro`, `src/pages/help.astro`, the language dictionaries for changed home strings.
- Tests: `tests/no-js.spec.ts` (menu without JavaScript), `tests/widths.spec.ts` (768 px header on one line), the composition check from `website-section-system`.
- No new build dependency.
