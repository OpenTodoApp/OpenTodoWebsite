## ADDED Requirements

### Requirement: Article layout
Guides, toolkit pieces and how-tos SHALL share one article layout: a breadcrumb through Learn, the page's position in its Learn list with links to the previous and next entry, the content, and a facts column with its sections, length, topic, review date and what to read next. The position SHALL follow the Learn library's order. At 360 px wide and without JavaScript the facts SHALL follow the content and every link SHALL work.

#### Scenario: Next how-to
- **WHEN** a visitor on a how-to follows "next" in the bar
- **THEN** the next how-to in the Learn library's how-to order opens, and its bar shows its own position

### Requirement: Articles name their documentation
The facts column of an article SHALL list the documentation pages the article relies on, named by their titles in the pinned bundle, each linking that page.

#### Scenario: Docs titles follow the release
- **WHEN** the pinned bundle renames a documentation page that a guide relies on
- **THEN** the guide's facts column shows the new title with no edit in this repository
