# Design

## Context

- **What this builds on.** `website-platform` (layout, `<details>` phone menu, checks), `website-switcher-pages` (home page hierarchy D1, `page-head`, cards, `facts` list), `website-content-hub` and `website-blog` (the content sections the Learn menu groups).
- **What the research showed (todoist.com, 15 October 2026).** One primary path ("Start for free"), a Resources menu (Templates, Toolkit, Help center, Methods, Inspiration), Pricing in the header, a trust section ("In it for the long haul", security, about). OpenTodo cannot copy the hosted path, so it has to be explicit about the three paths it does have.
- **Specs:** `specs/marketing-website/spec.md`.

## Goals / Non-Goals

**Goals:**
- Within the first two screens a visitor knows how to get OpenTodo, that it is not a hosted service, and what it costs in words.
- Who makes it, the licence, the security policy and the release history are one click from every page.
- Learn content is one menu, with no link lost from the navigation.

**Non-Goals:**
- Hosted sign-up, prices in currency, testimonials, video (see the proposal).

## Decisions

### D1. The get-it block
Three cards in a `grid-3` right under the hero (before the import strip): **Try it now** (demo; a private sandbox that is deleted after two hours without activity, from the demo docs), **Someone you know runs a server** (open the invitation link, install the app from the browser; links to the install docs), **Run it yourself** (one container, a small server, links to `/self-host/` and `/cost/`). One line under the heading says OpenTodo is not offered as a hosted service, so the cards are the only paths. Why cards and not a wizard: three choices read in one glance and need no script. The import strip stays directly after, since "bring your tasks over" belongs to whichever path is chosen.

### D2. The cost page at `/cost/`
Sections: "The software" (free, AGPL, from the manifest's `facts.license`), "The server" (the footprint from `manifest.facts`: image size, idle memory, minimum server, architectures; the three usual homes for it: a machine already at home, a Raspberry Pi, a small VPS), "The work" (who installs, who updates, what everyone else does; links to the Docker and Coolify docs), "Compared with a plan per person" (reused wording from the comparison entries' `cost` fields), "Where the money goes" (nothing is sold; a link to the support page from the footer). Figures come from the manifest, so the page stays true at every bundle pin; the comparison cost sentences are already dated through `checkedOn`. Costs in words only: the voice guide forbids currency.

### D3. The about page at `/about/`
Sections: "Who makes it" (`authors.json`), "Since when" (the first and the latest release from the bundle's `changelog.json`, with the count of releases and a link to `/whats-new/`), "The licence, in plain words" (AGPL: run, study, change and share; anyone offering a changed version as a service must publish the source; the manifest's `facts.license` names it), "Security" (link to the app's `SECURITY.md`, the account security docs, end-to-end encryption docs), "Written down before it is built" (the specs, from `specUrl`), "The demo" (sandbox lifetime, from the demo docs), "This website" (bundle version, self-hosted analytics, content rules, review before publishing), "Leaving" (export docs). Facts are read from the bundle at build time or link to a docs page of the pinned release, which is how they stay true.

### D4. Grouped navigation without JavaScript
The desktop navigation keeps flat links for Features, Compare, What it costs, Self-host, Developers and Docs and adds one **Learn** `<details>` whose panel lists Guides, Templates, Toolkit, Blog and What's new. A `<details>` opens on click and on Enter or Space, closes with the same, and needs no script; the panel is absolutely positioned under the trigger. Hover does not open it (hover menus fail on touch and keyboards). Learn appears once Guides and Templates are published, like the links it replaces; Blog joins it once a post is published. The phone menu lists every link under two headings, Product and Learn, in one open panel, so nothing is nested two taps deep. Seven desktop items replace eight, so the tablet rule (one line from 768 px) holds; the width test covers it.

### D5. Demo counters
`<em>` in the hero demo's sidebar becomes `<span class="count">` with the same style. Text-only renderings and screen readers stop reading "Inbox, emphasis, 3".

## Effect on build and download
- Build: two more static pages, under a second.
- Download: about 6 KB of HTML per new page; the header gains one `<details>` and under 1 KB of CSS; no new JavaScript or image.

## Risks / Trade-offs
- A `<details>` menu in the header closes only on a second click or Escape-free interaction (there is no script to close it on outside click). Accepted: it mirrors the phone menu, which already works this way.
- "Not offered as a hosted service" will need rewording if a hosted offering ships; the sentence lives in one component.
