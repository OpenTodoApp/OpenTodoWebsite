## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Security headers
The server SHALL answer every request with a Content-Security-Policy that allows scripts and connections only from the site and the self-hosted analytics, and forbids plugins, foreign framing and foreign form targets, with Strict-Transport-Security, `nosniff`, a Referrer-Policy and a Permissions-Policy. The headers live in the server configuration; the preview server of the browser checks SHALL read them from there, and the policy's origins SHALL equal the script check's allow-list plus the beacon the CDN adds.

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
