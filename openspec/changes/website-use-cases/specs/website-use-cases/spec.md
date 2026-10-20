# Spec Delta

## Purpose

Use-case pages that answer a problem people search for (a weekly review, timeboxing, a shared household list, deep work, planning with their own AI, a Raspberry Pi) with the released app: the checked content that backs each page, the page and its index, how they are reached, and the rules that keep them true to the pinned release.

## ADDED Requirements

### Requirement: Use-case collection with checked front matter
Each use case SHALL be a content entry rendered at `/use-cases/<slug>/` whose front matter carries a title, a summary, the problem in the visitor's words, a screenshot name from the pinned bundle's manifest, a last-reviewed date no older than 180 days at build time, and optional lists of templates, guides, how-tos and toolkit pieces by their ids. A missing or malformed field, a screenshot not in the manifest or an id with no entry SHALL fail the build and name the use case and the field.

#### Scenario: Stale page
- **WHEN** a use case's last-reviewed date is 190 days old at build time
- **THEN** the build fails, names the use case and the field, and says the limit is 180 days

#### Scenario: Unknown screenshot
- **WHEN** a use case names a screenshot that is not in the bundle manifest
- **THEN** the build fails and names the use case and the screenshot

#### Scenario: Template that does not exist
- **WHEN** a use case lists a template id with no entry in the templates collection
- **THEN** the build fails and names the use case and the id

### Requirement: Steps that link the pinned documentation
Each use case SHALL declare between three and five steps, each with a title, a sentence and one documentation link, and every link SHALL be a page (optionally with a fragment) of the pinned bundle's docs. The rendered page SHALL show the steps in order with each step's link, so a step cannot describe a feature the pinned release does not document. For a published use case, a link outside the bundle's docs SHALL fail the build naming the use case and the step.

#### Scenario: Step points at a page the release does not have
- **WHEN** a step links `/docs/focus-list/` and the pinned bundle has no such page
- **THEN** the build fails and names the use case and the step

#### Scenario: Two steps only
- **WHEN** a use case declares two steps
- **THEN** the build fails and says a use case has three to five steps

#### Scenario: Fragment on the docs page
- **WHEN** a step links `/docs/time-blocking/#see-whether-the-day-fits`
- **THEN** the page is accepted at build time and the link check over the built site verifies the fragment names a heading of that docs page

### Requirement: Sourced body
The body of a use case SHALL follow the claim rule of the other collections: every paragraph that mentions a feature of OpenTodo links a documentation page of the pinned bundle, or is marked as claiming nothing, and every internal link resolves to a page of the site or of the docs. A violation SHALL fail the content check naming the file and the line.

#### Scenario: Claim without a source
- **WHEN** a paragraph of a use case says tasks sync between devices without a docs link
- **THEN** the content check fails and names the file and the line

#### Scenario: Link to a page that does not exist
- **WHEN** the body links `/templates/wedding/` and no such template is published
- **THEN** the content check fails and names the file and the line

### Requirement: Use-case page
Each published use case SHALL have a page showing, in order: a breadcrumb to the index, the title, the problem in the visitor's words, a primary call to action to the demo, the screenshot (dark capture when the bundle has one), the numbered steps with their documentation links, the linked templates, the linked guides, how-tos and toolkit pieces, the documentation the page relies on, the last-reviewed date and the site's closing calls to action. Sections with nothing to show SHALL be left out.

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens a use case on a 360 px wide screen with JavaScript disabled
- **THEN** the problem, the screenshot, every step with its link, the template cards and both demo calls to action are visible and work, and the page does not scroll sideways

#### Scenario: No templates for the page
- **WHEN** a use case lists no templates
- **THEN** its page has no "Start from a template" section and the steps lead straight to the further reading

#### Scenario: Demo first
- **WHEN** a visitor reads a use case
- **THEN** the first button on the page opens the demo, and self-hosting and importing are offered only after the steps

### Requirement: Use-case index
The site SHALL have an index at `/use-cases/` listing every published use case in its declared order as a card with its title and summary linking to its page. It SHALL read and navigate at 360 px wide without JavaScript, with no horizontal scrolling.

#### Scenario: A new use case
- **WHEN** a seventh use case is added and published
- **THEN** the rebuilt index lists it in its declared order with no other edit

#### Scenario: Index on a phone without JavaScript
- **WHEN** a visitor opens `/use-cases/` on a 360 px wide screen with JavaScript disabled
- **THEN** every card shows its title and summary and links to its page

### Requirement: Drafts and unreleased features
A use case marked as a draft SHALL have no page and SHALL appear on no index, menu or internal link, and its steps' documentation links SHALL NOT be checked against the pinned bundle, so a page about a feature the release does not document yet can be prepared. A draft SHALL carry a note naming what it waits for. Removing the mark publishes it and turns every check back on.

#### Scenario: Draft page
- **WHEN** a use case is marked as a draft
- **THEN** `/use-cases/<slug>/` is not built, the index does not list it, and the feature tour does not link it

#### Scenario: Draft without a note
- **WHEN** a use case is marked as a draft and has no note saying what it waits for
- **THEN** the build fails and names the use case and the missing field

### Requirement: Use cases in the navigation
Every page's header SHALL offer "Use cases" in the product group, both in the desktop navigation and in the phone menu below 768 px, and the footer's Product list SHALL link the index. The entries SHALL appear only while at least one use case is published, SHALL work without JavaScript, and the header SHALL keep every link on one line at every width where the desktop navigation shows.

#### Scenario: Phone menu without JavaScript
- **WHEN** a visitor on a 360 px wide screen with JavaScript disabled opens the menu
- **THEN** "Use cases" is listed under Product and leads to `/use-cases/`

#### Scenario: No published use case
- **WHEN** every use case is a draft
- **THEN** the header and footer show no "Use cases" entry and no link on the site points at `/use-cases/`

### Requirement: Internal links to the matching use case
A feature of the home page's tour MAY name a use case; its figure SHALL then link that use case beside the documentation link, visible without JavaScript for the first feature and reachable from the feature list for the others. The self-hosting page SHALL link the Raspberry Pi use case. A tour feature naming a use case that does not exist or is a draft SHALL fail the build naming the feature and the slug.

#### Scenario: Tour feature with a use case
- **WHEN** the "Time blocking" feature of the tour names `timeboxing-your-day`
- **THEN** its figure shows a link to `/use-cases/timeboxing-your-day/` next to "how it works"

#### Scenario: Tour names a draft
- **WHEN** a tour feature names a use case that is marked as a draft
- **THEN** the build fails and names the feature and the slug

### Requirement: Use cases pass the website checks and are discoverable
Every published use case and the index SHALL pass the website checks (links, emoji icons, third-party scripts, accessibility in light and dark at 360 and 1280 px, horizontal scrolling, the no-JavaScript pass), SHALL have a social card of its own drawn from its title and summary with the section "Use cases", and SHALL be listed in the sitemap without an edit to the sitemap configuration.

#### Scenario: Social card of a use case
- **WHEN** `/use-cases/weekly-review/` is previewed by a messaging app
- **THEN** the card shows that page's title and the section "Use cases"

#### Scenario: Sitemap
- **WHEN** the site is built with six published use cases
- **THEN** the sitemap lists `/use-cases/` and the six pages

#### Scenario: Broken fragment on a step
- **WHEN** a step's link names a fragment that is not a heading of the docs page
- **THEN** the link check fails and names the page and the link
