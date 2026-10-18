## MODIFIED Requirements

### Requirement: Grouped navigation
From 768 px wide, the header SHALL show Features, Compare, What it costs, Self-host, a Resources menu and Docs on one line. The Resources menu SHALL list Help, Guides, Templates, Switch from another app, Developers, Blog and What's new, and SHALL open and close without JavaScript, by keyboard and pointer. How-tos, the toolkit, topics, the FAQ and the install pages SHALL be reached from Help and from the footer, not from the header. Below 768 px the phone menu SHALL show the same links in two groups, Product and Resources, in one panel that opens without JavaScript.

#### Scenario: Resources menu without JavaScript on a laptop
- **WHEN** a visitor at 1280 px wide with JavaScript disabled activates Resources with the keyboard
- **THEN** the links Help, Guides, Templates, Switch from another app, Developers, Blog and What's new are shown and work

#### Scenario: Resources follows the content
- **WHEN** no guide, template or post is published
- **THEN** the Resources menu omits the link that has no content, as the content and blog specifications require, and still lists Help, Developers and What's new

#### Scenario: Phone menu groups
- **WHEN** a visitor on a 360 px wide screen without JavaScript opens the menu
- **THEN** the Product group shows Features, Compare, What it costs, Self-host and Docs, and the Resources group shows Help, Guides, Templates, Switch from another app, Developers, Blog and What's new

#### Scenario: Tablet width
- **WHEN** the header is shown at 768 px wide
- **THEN** every header item stays on one line and the page does not scroll sideways

### Requirement: Outcome-first home page
The home page SHALL open with the outcome for people who use a task app, not with implementation details. Above the first screenful it SHALL show a headline, a promise of at most 25 words, one primary call to action to try the demo, and text links to install on one's own server and to bring tasks from another app, with the live miniature of the app beside it from 768 px wide and directly below it on a phone. Architecture terms SHALL NOT appear above the fold. The call to try the demo SHALL appear at most twice on the home page outside the header: in the hero and in the closing section.

#### Scenario: A Todoist user lands on the home page
- **WHEN** a visitor opens the home page on a 390 px wide phone
- **THEN** the first screenful shows the headline, the promise and the calls to action, and the live demo is reachable by scrolling once, without any mention of op logs, clocks or SQLite

#### Scenario: One primary action
- **WHEN** the hero is shown at any width, with or without JavaScript
- **THEN** it contains exactly one button, and the self-host and import paths are text links

#### Scenario: Short promise
- **WHEN** the content check reads the home page hero
- **THEN** the promise under the headline is at most 25 words, or the build fails and names the page

### Requirement: Differentiators and proof on the home page
Below the hero, the home page SHALL present, in this order and using the site's section types: the three ways to get OpenTodo; the product in real screenshots; why running it oneself pays off for a household or team; one grid of everyday features and differentiators (one server for a whole household, full offline use, optional end-to-end encryption, assistants with the user's own model key, leaving at any time); working offline, shown with the sync illustration and linking the self-hosting page's interactive demo; and the closing section. Every claim in these sections SHALL link to its documentation page of the pinned release.

#### Scenario: Technical detail is one click away
- **WHEN** a visitor wants to know how sync works
- **THEN** a link from the home page leads to the self-hosting page with the interactive sync demo

#### Scenario: Section order
- **WHEN** the built home page is read section by section
- **THEN** it has the seven sections in the order above, the composition check passes, and no section repeats a differentiator already listed in the features grid

#### Scenario: Phone without JavaScript
- **WHEN** a visitor reads the home page at 360 px wide with JavaScript disabled
- **THEN** every section, screenshot and link is shown and works, the tour shows its first topic with links to the others, and the page does not scroll sideways
