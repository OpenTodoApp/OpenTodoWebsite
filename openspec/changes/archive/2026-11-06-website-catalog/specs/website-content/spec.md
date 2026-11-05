# Spec Delta

## MODIFIED Requirements

### Requirement: Learn library
The site SHALL have a Learn library at `/learn/` on the catalog layout Features shares: an overview listing each type's first five entries (guides, how-tos, toolkit pieces, switch guides and templates) with the type's count and a link to the type's page, then the fixes for common problems; one row per entry with its title, summary and length, built from the content collections so it follows what is published. A rail SHALL link every type and topic page with their counts. Without JavaScript and at 360 px wide the rail SHALL work and every row SHALL keep its title and length.

#### Scenario: Filter without JavaScript
- **WHEN** a visitor on a 360 px wide screen without JavaScript chooses "How-to"
- **THEN** `/learn/how-tos/` opens and lists only how-tos, in their groups

#### Scenario: A new guide
- **WHEN** a guide is published
- **THEN** it appears on `/learn/`, on `/learn/methods/` and on the topic page of its tags, and the counts include it

### Requirement: Topic pages
The site SHALL have topic pages at `/learn/topic/<slug>/` that collect the guides, templates, how-tos, toolkit pieces and switch guides carrying the topic's tags, and the posts that carry them, linked from the Learn rail. Empty sections SHALL be left out. The pages SHALL read and link without JavaScript at 360 px wide.

#### Scenario: A tagged how-to
- **WHEN** a how-to carries the teamwork tag
- **THEN** it appears on the "Working together" topic page under how-tos

#### Scenario: Topic with no posts
- **WHEN** no post carries a topic's tags
- **THEN** the topic page shows no "From the blog" section

## ADDED Requirements

### Requirement: Catalog search
The Features and Learn pages SHALL offer one search box over every feature of the pinned release, every Learn entry and every docs page of the pinned bundle, from an index built with the site (`/search.json`, with title, summary, address and kind) and fetched on first use; no request leaves the site while typing. Results SHALL replace the page's content while the box has text, show each entry's kind (feature and its group, the Learn type, or Docs) and summary, rank title matches above summary matches, announce their count to assistive technology, and clear with Escape; `/` SHALL focus the box. Without JavaScript the box SHALL be hidden and the rail SHALL reach the same pages. The index SHALL stay under 120 KB and every address in it SHALL be a built page.

#### Scenario: Searching a word
- **WHEN** a visitor types "repeat" into the search on `/learn/`
- **THEN** results include features, how-tos and docs pages about repeating tasks, and the library is hidden until the box is cleared

#### Scenario: A new docs page
- **WHEN** the bundle pin brings a new docs page and the site is rebuilt
- **THEN** the index lists it with its summary, with no edit in this repository

#### Scenario: Without JavaScript
- **WHEN** a visitor opens `/features/` with JavaScript disabled
- **THEN** no search box is shown and every group page is reachable from the rail
