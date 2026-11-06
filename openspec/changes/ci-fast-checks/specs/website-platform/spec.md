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

The checks that need a browser (accessibility, horizontal scrolling and the pass without JavaScript) SHALL visit every page on the main branch, in a nightly run and in a manual run. On a pull request they SHALL visit one page of every page template, every page of the home page in each language, and every page no template accounts for, derived from the templates and the built pages on each run so that a new template is included without a change to the checks. When a pull request changes only Markdown and images of the site's content, they SHALL instead visit the pages whose HTML differs from the last recorded build of the main branch, or the template set when no build is recorded. A failed nightly run SHALL open or update one issue, and the next green nightly run SHALL close it.

#### Scenario: Third-party script added
- **WHEN** a change adds a script loaded from another origin than the site or the self-hosted analytics
- **THEN** the checks fail and name the page and the script URL

#### Scenario: A page left out of the sitemap
- **WHEN** a built page is missing from `sitemap-0.xml`
- **THEN** `npm run check:dist` fails and names the page

#### Scenario: Accessibility regression
- **WHEN** a change lowers the contrast of body text below 4.5:1 in dark
- **THEN** the accessibility check fails and names the page, theme and element

#### Scenario: A new page template
- **WHEN** a pull request adds a page template under `src/pages/`
- **THEN** the browser checks of that pull request visit one page built from it, in light and dark at 360 and 1280 px and without JavaScript

#### Scenario: A new blog post
- **WHEN** a pull request only adds a post's Markdown and images
- **THEN** the browser checks visit the post and the pages that list it, and every page again once it merges

#### Scenario: A red night
- **WHEN** the nightly run fails on a page
- **THEN** an issue labelled `ci-nightly` names the run and the failed job, and it closes after the next green nightly run
