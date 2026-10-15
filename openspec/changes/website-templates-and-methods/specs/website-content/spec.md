# Spec Delta

## Purpose

Makes the templates and guides navigable: filters and richer template pages, a tagged methods catalogue with a quiz, and topic pages that collect content by tag.

## ADDED Requirements

### Requirement: Template gallery filters
Every template SHALL declare an audience and a layout (list, board or calendar), shown on its card, and the gallery SHALL offer filters by audience and by layout that lead to static pages listing the matching templates. The filters SHALL work without JavaScript at 360 px wide.

#### Scenario: Filter by layout
- **WHEN** a visitor chooses the board layout in the gallery
- **THEN** a page lists only the templates whose layout is board, with the filter marked as current

#### Scenario: Unknown layout
- **WHEN** a template declares a layout other than list, board or calendar
- **THEN** the build fails and names the template and the field

### Requirement: Template page guidance and preview
Every template page SHALL show how to use the template and how to adapt it (at least one item each, from the template's front matter), a byline from the authors file, every project, section and task the file creates rendered from the same data as the download, similar templates, and the download repeated after the preview. A template without usage notes SHALL fail the build.

#### Scenario: Preview matches the file
- **WHEN** a task is added to a template's front matter
- **THEN** the rebuilt page lists it under "What is inside" and the download contains it

#### Scenario: Missing usage notes
- **WHEN** a template has no "howToUse" entry
- **THEN** the build fails naming the template and the field

### Requirement: Methods catalogue
Guides SHALL carry tags from one vocabulary shared with templates, how-tos and posts, and the guides index SHALL list every guide with its tags and offer tag filters that lead to static pages. The catalogue SHALL include at least ten methods, each setting the method up with features of the pinned release, every claim linked to its documentation page. A tag outside the vocabulary SHALL fail the build.

#### Scenario: Filter by tag
- **WHEN** a visitor chooses the procrastination tag
- **THEN** a page lists the guides tagged procrastination and the templates carrying the tag

#### Scenario: Unknown tag
- **WHEN** a guide declares a tag that is not in the vocabulary
- **THEN** the build fails and names the guide and the tag

### Requirement: Method quiz
The site SHALL offer a short quiz under the guides that leads, through static pages where every answer is a link, to a result naming a method, its guide and a template, with a reason and an alternative. A result that names a guide or template that does not exist SHALL fail the build. The quiz SHALL work without JavaScript at 360 px wide.

#### Scenario: Two answers to a result
- **WHEN** a visitor answers the first question and the second
- **THEN** the result page names a method, links its guide and a template, and offers to start again

#### Scenario: Broken result
- **WHEN** a result names a guide slug that has no entry
- **THEN** the build fails and names the slug

### Requirement: Topic pages
The site SHALL have topic pages that collect the guides, templates, how-tos, toolkit pieces and posts carrying the topic's tags, with an index of topics linked from the Learn menu and the footer. Empty sections SHALL be left out. The pages SHALL read and link without JavaScript at 360 px wide.

#### Scenario: A tagged how-to
- **WHEN** a how-to carries the teamwork tag
- **THEN** it appears on the "Working together" topic page under how-tos

#### Scenario: Topic with no posts
- **WHEN** no post carries a topic's tags
- **THEN** the topic page shows no "From the blog" section
