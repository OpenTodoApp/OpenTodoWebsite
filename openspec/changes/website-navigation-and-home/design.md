# Design

## Context

See proposal.md. The header (`SiteHeader.astro`) builds three arrays (`product`, `learn`, `run`) and renders the Learn menu as a `<details>` element so it works without JavaScript; the phone menu is another `<details>`. The footer is hand-written in `SiteFooter.astro`. The home page (`src/pages/index.astro`, 248 lines) writes eleven sections inline; the `[lang]` home pages reuse it through the language dictionaries.

## Goals / Non-Goals

**Goals:** one navigation model used by header, phone menu and footer; a home page that reads as one argument; Help as the hub; no URL changes.

**Non-Goals:** search on the site (the docs search stays the search), mega-menus, new pages.

## Decisions

1. **One navigation data file.** `src/lib/nav.ts` exports the groups (Product, Resources, Self-hosting, Project) with each link's label, href, match prefix and where it appears (`header`, `menu`, `footer`). Header, phone menu and footer render from it, and the content-dependent links (Guides, Templates, Blog) are filtered there once. *Alternative:* keep three hand-written lists; rejected because that is how they drifted.
2. **Resources stays a `<details>` disclosure.** Same mechanism as Learn today, so the no-JavaScript and keyboard behaviour already covered by `tests/no-js.spec.ts` carries over. A small existing script closes it on outside click; without it the menu still closes by activating the summary again.
3. **GitHub as an icon link.** The star call-to-action moves out of the header (the hero's "free and open source" line and the footer keep the repository link). The header is then one button, which is what makes "Try the demo" stand out.
4. **Home sections map to section types.** Hero = Split; three ways = Catalogue; tour = Showcase (the existing `FeatureTour` inside it); why your own server = Split with the phone screenshots; features + differentiators = Catalogue (nine items, three by three: Today and Upcoming, projects and boards, reminders and repeats, labels and filters, sharing, one server for the household, offline, encryption, the assistant with your own key; export and leaving is the ownership section's closing line); offline = Split with the static sync illustration; latest post line + Close. Two Catalogues, not adjacent: the composition rule holds.
5. **Where removed home content goes.** The AI section's five safety points and three ways in already live in `docs/ai-and-agents`; the grid entry links there. "What you get from running it yourself" merges into the features grid and the ownership section. "How it works" (sync, one container) is the offline Split plus `/self-host/`. Nothing is deleted from the site, only from the home page.
6. **Hero word limit in the content check.** `scripts/check-content.mjs` reads the hero promise string (one exported constant per language) and fails above 25 words, so translations are held to the same bar.
7. **Help absorbs the directories.** `/help/` gains a "Browse by topic" group generated from the topics collection and an FAQ link in the jump row; the toolkit pages are entries in "I run the server". Existing index pages (`/how-to/`, `/toolkit/`, `/topics/`) stay as lists for search engines and old links.

## Risks / Trade-offs

- [Visitors and search engines used the header links to How-tos, Toolkit and Topics] → URLs stay, the footer and Help link them, and the sitemap is unchanged; internal link counts drop but every page stays two clicks from any other.
- [Translated home pages lose sections whose strings exist only in English] → the order changes in the shared template; strings that are removed are deleted from every dictionary, and `i18n.test.mjs` fails on any key used but missing.
- [Fewer calls to action could lower demo visits] → the analytics already count demo clicks per page; compare the four weeks before and after and report in the pull request that follows.

## Effect on build and downloads

Build time: unchanged. Downloads: the home page loses about 40% of its HTML and three post-card images; the header loses one button. No new JavaScript.
