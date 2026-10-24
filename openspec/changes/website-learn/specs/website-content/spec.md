## ADDED Requirements

### Requirement: Learn library
The site SHALL have a Learn library at `/learn/` that lists every published guide, how-to, toolkit piece, switch guide and template by type, one row each with its topic, type and length, built from the content collections so it follows what is published. Type and topic filters SHALL be links to static pages with their counts. Without JavaScript and at 360 px wide every filter SHALL work and every row SHALL keep its title and length.

#### Scenario: Filter without JavaScript
- **WHEN** a visitor on a 360 px wide screen without JavaScript chooses "How-to"
- **THEN** `/learn/how-tos/` opens and lists only how-tos, in their groups

#### Scenario: A new guide
- **WHEN** a guide is published
- **THEN** it appears on `/learn/`, on `/learn/methods/` and on the topic page of its tags, and the counts include it

## MODIFIED Requirements

### Requirement: Topic pages
The site SHALL have topic pages at `/learn/topic/<slug>/` that collect the guides, templates, how-tos, toolkit pieces and switch guides carrying the topic's tags, and the posts that carry them, linked from the Learn library's topic facet. Empty sections SHALL be left out. The pages SHALL read and link without JavaScript at 360 px wide.

#### Scenario: A tagged how-to
- **WHEN** a how-to carries the teamwork tag
- **THEN** it appears on the "Working together" topic page under how-tos

#### Scenario: Topic with no posts
- **WHEN** no post carries a topic's tags
- **THEN** the topic page shows no "From the blog" section

### Requirement: Methods catalogue
Guides SHALL carry tags from one vocabulary shared with templates, how-tos and posts, and the Learn library's methods page SHALL list every guide with its topic, with the topic pages as its filters. The catalogue SHALL include at least ten methods, each setting the method up with features of the pinned release, every claim linked to its documentation page. A tag outside the vocabulary SHALL fail the build.

#### Scenario: Filter by tag
- **WHEN** a visitor follows the old address of the procrastination tag, or chooses the topic that holds it
- **THEN** the "Task management" topic page lists the guides and templates carrying the tag

#### Scenario: Unknown tag
- **WHEN** a guide declares a tag that is not in the vocabulary
- **THEN** the build fails and names the guide and the tag
