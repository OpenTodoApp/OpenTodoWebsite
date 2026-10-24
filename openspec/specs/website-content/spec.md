# website-content Specification

## Purpose
Defines the content around the product (template gallery, method guides, toolkit, essays, what's new and the feed) and the rules that keep every published piece useful, truthful and reviewed, so the site earns trust and search traffic without a content team.

## Requirements

### Requirement: Template gallery
The site SHALL offer a gallery of ready-made templates. Each SHALL have a page with a description, a real screenshot in light and dark, and a downloadable file that the pinned release's importer accepts as-is. The page SHALL say how to import the file. Every template file SHALL be imported into a server of the pinned release by the website checks, and a template that fails to import SHALL fail the build.

#### Scenario: Use a template today
- **WHEN** a visitor downloads the "Weekly review" template and imports it in Settings → Import
- **THEN** the projects, sections and tasks shown on the template page are created in their account

#### Scenario: Template broken by a release
- **WHEN** the pinned release changes and a template no longer imports cleanly
- **THEN** the website checks fail and name the template and the import error

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens a template page on a 360 px screen with JavaScript disabled
- **THEN** the description, screenshot, import steps and download link work

### Requirement: Guides, toolkit and essays
The site SHALL offer method guides (for example GTD, weekly review, time blocking, prioritising with filters), a toolkit for setting up OpenTodo for a household and for a small team, and a few essays on owning your data. Each guide SHALL link the templates and documentation pages it uses, and every statement about what OpenTodo can do SHALL link to a documentation page of the pinned release.

#### Scenario: Guide links its template
- **WHEN** a visitor reads the weekly review guide
- **THEN** it links the "Weekly review" template and the documentation of the filters it uses

#### Scenario: Claim without a source
- **WHEN** a guide states a product capability without a link to the documentation
- **THEN** the content check fails and names the guide and the sentence's line

### Requirement: What's new and feed
The site SHALL publish a "What's new" page per release from the bundle's changelog, and SHALL offer an RSS feed listing new guides, templates, essays and releases. Neither SHALL describe features that are not in a released version.

#### Scenario: New release
- **WHEN** the pinned bundle moves to a new release
- **THEN** a "What's new" page for that release appears and the feed lists it

### Requirement: Content navigation
The main navigation SHALL offer Templates and Guides once at least one entry of each is published, alongside the existing navigation, and every content page SHALL end with calls to try the demo, self-host and import.

#### Scenario: Navigation appears with content
- **WHEN** the first template and the first guide are published
- **THEN** every page's navigation shows Templates and Guides, and works at 360 px without JavaScript

### Requirement: Reviewed, sourced and fresh content
Every published piece SHALL be approved by the maintainer through a pull request before it goes live, and SHALL carry a last-reviewed date. Content drafted by an agent SHALL follow the repository's voice guide. A piece whose last-reviewed date is older than one year at build time SHALL be reported as stale by the checks.

#### Scenario: Agent draft
- **WHEN** a scheduled agent drafts a new guide
- **THEN** it opens a pull request with a rendered preview, and the guide is not published until the maintainer merges it

#### Scenario: Stale guide
- **WHEN** a guide's last-reviewed date is 13 months old at build time
- **THEN** the checks report it as stale and name it

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
