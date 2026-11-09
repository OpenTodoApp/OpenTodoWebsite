# Spec Delta

## MODIFIED Requirements

### Requirement: Post page
Each published post SHALL have its own page at `/blog/<slug>/` showing its category, publish date and reading time on one line above its title, update date when set, author with a short bio, category, cover image when set, the full text, links to the previous and next posts, up to three related posts from the same category as rows, and a closing call to action that offers the RSS feed and one line of ways to support the project. A post that is part of a series SHALL also show the series title and its part number directly above its title, linking to the series page, and its previous and next links SHALL go to the neighbouring published parts of the series when there is one. It SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Reading a post on a phone without JavaScript
- **WHEN** a visitor opens a post on a 360 px wide screen with JavaScript disabled
- **THEN** the full text, images, code samples and links are readable and work, and the page does not scroll sideways

#### Scenario: Updated post
- **WHEN** a post has an update date
- **THEN** its page shows both the publish date and the update date

#### Scenario: Reading a part of a series
- **WHEN** a visitor opens part 2 of "OpenTodo in practice", and parts 1 and 3 are published
- **THEN** "OpenTodo in practice · Part 2" above the title links to `/blog/series/in-practice/`, and the links at the end lead to parts 1 and 3

#### Scenario: The next part is still a draft
- **WHEN** part 3 is a draft or dated in the future
- **THEN** part 2 offers no link to it

### Requirement: Checked post metadata
A post SHALL have a title, a summary, a publish date, an author known to the site and a category, checked at build time. A post MAY name a series defined once in the site's list of series, together with its part number, a whole number from 1; a part number SHALL NOT be used twice within one series, drafts included. A missing or malformed field SHALL fail the build and name the post and the field. A post with a publish date in the future or marked as a draft SHALL NOT be published.

#### Scenario: Missing publish date
- **WHEN** a post has no publish date
- **THEN** the build fails and names the post and the missing field

#### Scenario: Draft post
- **WHEN** a post is marked as a draft
- **THEN** it has no page and does not appear on the index, category pages, series pages, home page or feeds

#### Scenario: Unknown series or missing part
- **WHEN** a post names a series that is not in the list of series, or names a series without a part number
- **THEN** the build fails and names the post and the field

#### Scenario: Two posts claim the same part
- **WHEN** two posts, one of them a draft, are both part 2 of the same series
- **THEN** the build fails and names both posts

## ADDED Requirements

### Requirement: Series pages
Each series with at least one published part SHALL have a page at `/blog/series/<id>/` showing the series title and summary from the site's list of series and its published parts as rows in part order, each with its publish date, title, summary and part number. A series without a published part SHALL have no page. No post folder SHALL be named `series`. The page SHALL be readable at 360 px wide without JavaScript, without horizontal scrolling.

#### Scenario: Browsing a series
- **WHEN** parts 1 and 2 of "OpenTodo in practice" are published and part 3 is a draft
- **THEN** `/blog/series/in-practice/` lists part 1, then part 2, and not part 3

#### Scenario: A series before its first part
- **WHEN** no part of a series is published
- **THEN** the build makes no page for it
