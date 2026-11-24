# website-platform Specification

## Purpose
Defines how the OpenTodo website is built, where its facts about the app come from, the layout every page shares, and the checks every page must pass, so the site stays professional, consistent with the app and truthful as it grows.

## Requirements

### Requirement: Static build and deploy
The site SHALL build to static files and SHALL be served by a single container listening on one port, deployable by pointing Coolify at this repository with no environment variables required. A build SHALL fail rather than deploy a page that did not render.

#### Scenario: Deploy from a fresh clone
- **WHEN** the container is built from a fresh clone of the main branch
- **THEN** it serves the home page, every content page and `/docs/` on its port, with no runtime service other than the web server

#### Scenario: Broken page
- **WHEN** a page fails to render during the build
- **THEN** the build fails, names the page and produces no image

### Requirement: App facts come from a released site bundle
The version, documentation, screenshots, colour tokens, icons, changelog and supported import formats shown by the site SHALL come from the app's site bundle of one pinned release, recorded in the repository. A preview build MAY use a bundle from the app's main branch or a local folder, and SHALL then mark every page as a preview. Production builds SHALL refuse a bundle that is not attached to a release.

#### Scenario: Updating to a new release
- **WHEN** the maintainer changes the pinned version to the app's latest release and the site is rebuilt
- **THEN** the docs, version, screenshots and import formats on the site match that release

#### Scenario: Preview bundle
- **WHEN** the site is built with a bundle from the app's main branch
- **THEN** every page shows a visible "preview" marker and the build cannot be deployed to production

#### Scenario: Bundle missing
- **WHEN** the pinned bundle cannot be downloaded
- **THEN** the build fails with a message naming the version and the URL tried

### Requirement: Documentation served as shipped
The documentation site from the bundle SHALL be served under `/docs/` without modification, so its search, version and links behave as the app built them.

#### Scenario: Docs search
- **WHEN** a visitor searches the docs on the website
- **THEN** the search works over the bundle's index and no query leaves the browser

### Requirement: Shared layout and navigation
Every page SHALL share one header (Features, Learn, Docs, the Blog while a post exists, the language switch, a Star link and the primary Try the demo) and one footer: the brand line with the language switch, three link groups (Product, Learn, Project), a Community row of text links (Star on GitHub, Sponsor, Buy me a coffee, Discord, X, RSS) and one line of version and licence links. Targets SHALL be defined once in the site constants and checked by the link check. The layout SHALL follow the visitor's colour preference, use the bundle's tokens, typeface and icons, and collapse into a menu below 768 px that works without JavaScript. Below 768 px the footer SHALL be compact: the three link groups as disclosures that open by keyboard and pointer without JavaScript to the same links as the wider footer, the Community row and licence line visible, and every link at least 24 px tall.

#### Scenario: Phone navigation without JavaScript
- **WHEN** a visitor on a 360 px wide screen with JavaScript disabled opens the menu
- **THEN** the navigation links are shown and work

#### Scenario: Colours match the app
- **WHEN** the bundle's accent token changes in a new release and the site is rebuilt
- **THEN** buttons and links on the site use the new value without any edit in this repository

#### Scenario: Header on a laptop
- **WHEN** a visitor opens any page at 1280 px wide with JavaScript disabled
- **THEN** the header shows Features, Learn, Docs and Blog on one line with the language switch, Star and Try the demo, and each link opens its page

#### Scenario: Footer on a phone
- **WHEN** a visitor opens the home page at 390 px wide without JavaScript
- **THEN** the footer is at most 600 px tall, and opening its three groups shows every link of the wider footer

### Requirement: Typed content
Content pages that make claims (switch guides, templates, guides and how-tos) SHALL be written as content entries whose required fields are checked at build time, including a "checked on" date and source links where the content kind requires them. A missing or malformed field SHALL fail the build and name the entry.

#### Scenario: Comparison without a date
- **WHEN** a switch guide has no "checked on" date
- **THEN** the build fails and names the entry and the missing field

### Requirement: Website checks
Every pull request and every build of the main branch SHALL run checks that fail on any of these:
- a broken internal or docs link
- a serious or critical automated accessibility violation on any page in light or dark
- an emoji or Unicode symbol used as an icon
- a third-party script other than the self-hosted analytics
- a page whose main text, navigation or links do not work without JavaScript
- horizontal scrolling at 360 px wide
- a page without a title, a meta description, a canonical link or a built social card; two pages with the same title
- a page without exactly one `<h1>`, or with an image that has no `alt` attribute
- a page of the site itself (the docs excluded) without structured data, or with structured data that does not parse
- an hreflang alternate that is not built, is not reciprocal or lacks an x-default
- a page that is not marked noindex and is missing from the sitemap
- a page that logs an error in the browser console, including a resource the Content-Security-Policy refuses

#### Scenario: Third-party script added
- **WHEN** a change adds a script loaded from another origin than the site or the self-hosted analytics
- **THEN** the checks fail and name the page and the script URL

#### Scenario: A page left out of the sitemap
- **WHEN** a built page is missing from `sitemap-0.xml`
- **THEN** `npm run check:dist` fails and names the page

#### Scenario: Accessibility regression
- **WHEN** a change lowers the contrast of body text below 4.5:1 in dark
- **THEN** the accessibility check fails and names the page, theme and element

#### Scenario: A second heading of the first level
- **WHEN** a page is built with two `<h1>` elements
- **THEN** `npm run check:dist` fails and names the page

#### Scenario: An image from another site's script
- **WHEN** a page loads a resource the Content-Security-Policy of `nginx.conf` does not allow
- **THEN** `npm run test:browser` fails and names the page and the refused resource

### Requirement: Sitemap and robots
The build SHALL write a sitemap index that lists every page of the site and every documentation page of the pinned bundle, excluding the not-found page, and `robots.txt` SHALL point at it.

#### Scenario: Docs in the sitemap
- **WHEN** the site is built
- **THEN** the sitemap lists `/docs/getting-started/` alongside the site's own pages

#### Scenario: New page
- **WHEN** a content entry is added and the site rebuilt
- **THEN** its URL appears in the sitemap without any edit to the sitemap configuration

### Requirement: Social card per page
Every page SHALL declare a social preview image of its own, drawn at build time from that page's title and description with the app's typeface, unless the page provides an image of its own (such as a post's cover). The card SHALL render identically on every build machine, using font files kept in the repository.

#### Scenario: A how-to shared in a chat
- **WHEN** a how-to's URL is previewed by a messaging app
- **THEN** the card shows that how-to's title and section, not the home page's image

#### Scenario: Post with a cover
- **WHEN** a blog post has a cover image
- **THEN** its social image is the cover and no card is rendered for it

### Requirement: Structured data
Pages SHALL carry inline schema.org JSON-LD built from their own data. Every page of the site SHALL carry a WebPage entity (a CollectionPage on a list of pieces, an AboutPage on the About page) with its canonical URL, title, description, language and social image, part of the site's WebSite and published by its Organization, and pages with a place in the site (posts, switch guides, how-tos, guides, toolkit pieces) a BreadcrumbList that the page entity refers to. In addition: the home page a WebSite, an Organization (name, address, logo, the repository, X and Discord) and a SoftwareApplication with the bundle's version, the operating systems, the licence and an offer of price 0, how-tos, guides, toolkit pieces and posts an article entity with author and dates, and templates a Dataset with the download. The page entity is built by the shared layout from the page's own title and description, so it stays true without a second edit. No third-party script SHALL be loaded for it, and no rating or user count, and no price other than the free offer, SHALL be stated. Structured data is not shown, so it reads the same at phone width and without JavaScript.

#### Scenario: FAQ questions follow the page
- **WHEN** a how-to is published
- **THEN** its page carries an article entity with its author and dates without a second edit

#### Scenario: Still no third-party scripts
- **WHEN** the website checks scan the built pages
- **THEN** the structured data blocks have no `src` and the script check passes

#### Scenario: A new page
- **WHEN** a page is added that uses the shared layout
- **THEN** it carries a WebPage entity with its own title, description and canonical URL, with no edit to the page for it

### Requirement: Moved pages keep their addresses
When a page moves or is folded into another, its old address SHALL answer with a permanent redirect to the page that now holds its content, defined in the server configuration. The website checks SHALL fail when a redirect leads to a page or fragment that is not built, or when a redirect hides a page that is still built. Redirects SHALL work without JavaScript, as they are answered by the server.

#### Scenario: An old index
- **WHEN** a visitor opens `/help/`
- **THEN** the server answers with a permanent redirect to `/learn/`

#### Scenario: Compare is gone
- **WHEN** a visitor opens `/vs/todoist/`
- **THEN** the server answers with a permanent redirect to `/switch/todoist/`

#### Scenario: Developers became Under the hood
- **WHEN** a visitor opens `/developers/`
- **THEN** the server answers with a permanent redirect to `/under-the-hood/`

#### Scenario: A broken redirect
- **WHEN** a redirect in the server configuration names a target that the build does not produce
- **THEN** `npm run check:dist` fails naming the line and the target

### Requirement: Search metadata
Every page SHALL have a unique title and a meta description of at most 160 characters (a longer description is cut at the last sentence or word that fits), a canonical link and a social card. A title SHALL end with " · OpenTodo" unless it already names OpenTodo. Every page SHALL carry the Open Graph title, description, image and URL, the same as Twitter card tags with the project's account from the site constants, and SHALL allow search results to show its large preview image; a preview build SHALL be marked noindex instead. Descriptions SHALL say what the page offers in plain words, without repeated keywords. The site SHALL emit search-engine ownership tags only when their tokens are set in the site constants. The docs' default card (`/assets/og.png`) SHALL be built from the home page's card. The quiz's steps and results SHALL have titles that name their question or the answer that led to them.

#### Scenario: A long post summary
- **WHEN** a post's summary is 230 characters long
- **THEN** its meta description ends at the last full sentence within 160 characters

#### Scenario: Verification token set
- **WHEN** the maintainer sets `SITE.verification.google`
- **THEN** every page carries `<meta name="google-site-verification">` with it, and no page does while it is empty

#### Scenario: A release post
- **WHEN** a post is titled "OpenTodo 1.6: away, a quarter view and safer sign-out"
- **THEN** its `<title>` is that title, without " · OpenTodo" after it

### Requirement: Brand mark from the bundle
The site's favicon, its Apple touch icon, the mark in the header and the footer, and the mark on every social card SHALL be the colour mark of the pinned bundle's `brand/` folder, read at build time and by the dev server. The site SHALL NOT keep a copy of the mark of its own. A bundle pin to a release with another mark SHALL change all of them with no other edit. The favicon SHALL be byte-identical to the bundle's `brand/mark-colour.svg`. The touch icon SHALL be a 180 px opaque render of that mark filling its square, because iOS rounds it itself. The mark is an image: a page shows it at phone width and without JavaScript like any other image.

#### Scenario: A new mark in the pinned release
- **WHEN** `bundle.json` is bumped to a release whose `brand/mark-colour.svg` differs, and the site is built
- **THEN** `/assets/favicon.svg` equals the new file, the touch icon and every social card show the new mark, and no other file in the repository changed

#### Scenario: A hand-made copy comes back
- **WHEN** a contributor adds `public/assets/favicon.svg` or another copy of the mark
- **THEN** the tests fail and name the file

#### Scenario: Phone without JavaScript
- **WHEN** a page is opened at 360 px with JavaScript turned off
- **THEN** the header shows the bundle's mark beside the name, and the browser tab shows it as the favicon

### Requirement: Default social card from the bundle
The site's default social card at `/assets/og.png` SHALL be the pinned site bundle's brand kit card (`brand/kit/png/og-default-1200x630.png`) when the bundle carries one, and the home page's own card otherwise.

#### Scenario: A bundle with the brand kit
- **WHEN** the pinned bundle has `brand/kit/png/og-default-1200x630.png`
- **THEN** the built `/assets/og.png` is that file byte for byte

#### Scenario: An older bundle
- **WHEN** the pinned bundle has no brand kit
- **THEN** the built `/assets/og.png` is the home page's card

### Requirement: Security headers
The server SHALL answer every request with a Content-Security-Policy that allows scripts and connections only from the site and the self-hosted analytics, and forbids plugins, foreign framing and foreign form targets, with Strict-Transport-Security, `nosniff`, a Referrer-Policy and a Permissions-Policy. The headers live in the server configuration; the preview server of the browser checks SHALL read them from there, and the policy's origins SHALL equal the script check's allow-list.

#### Scenario: A page under the policy
- **WHEN** the browser checks open any page of the build
- **THEN** it renders, its islands work and its console shows no refused resource

#### Scenario: The analytics move
- **WHEN** the analytics origin changes in the script check's allow-list but not in `nginx.conf`
- **THEN** `npm test` fails

### Requirement: Quiet motion
Hover and navigation feedback SHALL be drawn from the bundle's tokens and stay small: colour changes of at most 160 ms, an arrow icon that moves at most 3 px, and a cross-fade between pages of at most 140 ms in browsers that support it. All of it SHALL stop for visitors who prefer reduced motion, SHALL need no JavaScript, and SHALL change no layout at any width from 360 px.

#### Scenario: Reduced motion
- **WHEN** a visitor who prefers reduced motion moves from the home page to Features
- **THEN** the page changes at once, with no fade

#### Scenario: Without JavaScript
- **WHEN** a visitor without JavaScript hovers "Try the demo"
- **THEN** the button changes colour and its arrow moves as with JavaScript
