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
Every page SHALL share one header with navigation to Features, Compare, Self-host, Developers and Docs, and one footer with licence, source and specification links. The layout SHALL follow the visitor's light or dark preference, use the colour tokens, typeface and icon set from the bundle, and collapse the navigation into a menu below 768 px that works without JavaScript.

#### Scenario: Phone navigation without JavaScript
- **WHEN** a visitor on a 360 px wide screen with JavaScript disabled opens the menu
- **THEN** the navigation links are shown and work

#### Scenario: Colours match the app
- **WHEN** the bundle's accent token changes in a new release and the site is rebuilt
- **THEN** buttons and links on the site use the new value without any edit in this repository

### Requirement: Typed content
Content pages that make claims (comparisons, and later templates and guides) SHALL be written as content entries whose required fields are checked at build time, including a "checked on" date and source links where the content kind requires them. A missing or malformed field SHALL fail the build and name the entry.

#### Scenario: Comparison without a date
- **WHEN** a comparison entry has no "checked on" date
- **THEN** the build fails and names the entry and the missing field

### Requirement: Website checks
Every pull request and every build of the main branch SHALL run checks that fail on any of these:
- a broken internal or docs link
- a serious or critical automated accessibility violation on any page in light or dark
- an emoji or Unicode symbol used as an icon
- a third-party script other than the self-hosted analytics
- a page whose main text, navigation or links do not work without JavaScript
- horizontal scrolling at 360 px wide

#### Scenario: Third-party script added
- **WHEN** a change adds a script loaded from another origin than the site or the self-hosted analytics
- **THEN** the checks fail and name the page and the script URL

#### Scenario: Accessibility regression
- **WHEN** a change lowers the contrast of body text below 4.5:1 in dark
- **THEN** the accessibility check fails and names the page, theme and element

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
Pages SHALL carry inline schema.org JSON-LD built from their own data: the home page a WebSite and a SoftwareApplication with the bundle's version, the FAQ a FAQPage with its questions and answers, how-tos, guides, toolkit pieces and posts an article entity with author and dates, templates a Dataset with the download. No third-party script SHALL be loaded for it, and no rating, price or user count SHALL be stated.

#### Scenario: FAQ questions follow the page
- **WHEN** a question is added to the FAQ page
- **THEN** the FAQPage entity lists it without a second edit

#### Scenario: Still no third-party scripts
- **WHEN** the website checks scan the built pages
- **THEN** the structured data blocks have no `src` and the script check passes
