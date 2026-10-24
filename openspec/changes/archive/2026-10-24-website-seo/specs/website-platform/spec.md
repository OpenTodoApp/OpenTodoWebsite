# Spec Delta

## Purpose

Makes every page findable and shareable: a sitemap that includes the docs, a social card per page, and structured data from the page's own facts.

## ADDED Requirements

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
