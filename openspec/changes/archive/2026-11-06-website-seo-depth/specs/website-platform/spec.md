# Spec Delta

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
- an hreflang alternate that is not built, is not reciprocal or lacks an x-default
- a page that is not marked noindex and is missing from the sitemap

#### Scenario: Third-party script added
- **WHEN** a change adds a script loaded from another origin than the site or the self-hosted analytics
- **THEN** the checks fail and name the page and the script URL

#### Scenario: A page left out of the sitemap
- **WHEN** a built page is missing from `sitemap-0.xml`
- **THEN** `npm run check:dist` fails and names the page

#### Scenario: Accessibility regression
- **WHEN** a change lowers the contrast of body text below 4.5:1 in dark
- **THEN** the accessibility check fails and names the page, theme and element

### Requirement: Structured data
Pages SHALL carry inline schema.org JSON-LD built from their own data: the home page a WebSite, an Organization (name, address, logo, the repository, X and Discord) and a SoftwareApplication with the bundle's version, the operating systems, the licence and an offer of price 0, how-tos, guides, toolkit pieces and posts an article entity with author and dates, templates a Dataset with the download, and pages with a place in the site (posts, switch guides, how-tos, guides, toolkit pieces) a BreadcrumbList. No third-party script SHALL be loaded for it, and no rating or user count, and no price other than the free offer, SHALL be stated.

#### Scenario: FAQ questions follow the page
- **WHEN** a how-to is published
- **THEN** its page carries an article entity with its author and dates without a second edit

#### Scenario: Still no third-party scripts
- **WHEN** the website checks scan the built pages
- **THEN** the structured data blocks have no `src` and the script check passes

## ADDED Requirements

### Requirement: Search metadata
Every page SHALL have a unique title and a meta description of at most 160 characters (a longer description is cut at the last sentence or word that fits), a canonical link and a social card. Descriptions SHALL say what the page offers in plain words, without repeated keywords. The site SHALL emit search-engine ownership tags only when their tokens are set in the site constants. The docs' default card (`/assets/og.png`) SHALL be built from the home page's card. The quiz's steps and results SHALL have titles that name their question or the answer that led to them.

#### Scenario: A long post summary
- **WHEN** a post's summary is 230 characters long
- **THEN** its meta description ends at the last full sentence within 160 characters

#### Scenario: Verification token set
- **WHEN** the maintainer sets `SITE.verification.google`
- **THEN** every page carries `<meta name="google-site-verification">` with it, and no page does while it is empty
