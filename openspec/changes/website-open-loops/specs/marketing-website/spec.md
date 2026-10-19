## MODIFIED Requirements

### Requirement: Grouped navigation
From 768 px wide, the header SHALL show Features, Compare, What it costs, Self-host, a Resources menu and Docs on one line. The Resources menu SHALL list Help, Guides, Templates, Open Loops, Switch from another app, Developers, Blog and What's new, and SHALL open and close without JavaScript, by keyboard and pointer. Open Loops SHALL be listed only while the Open Loops page exists (website-method "Shown only for a release that ships the method"). How-tos, the toolkit, topics, the FAQ and the install pages SHALL be reached from Help and from the footer, not from the header. Below 768 px the phone menu SHALL show the same links in two groups, Product and Resources, in one panel that opens without JavaScript.

#### Scenario: Resources menu without JavaScript on a laptop
- **WHEN** a visitor at 1280 px wide with JavaScript disabled activates Resources with the keyboard
- **THEN** the links Help, Guides, Templates, Switch from another app, Developers, Blog and What's new are shown and work, and Open Loops too while its page exists

#### Scenario: Resources follows the content
- **WHEN** no guide, template or post is published, or the pinned bundle does not ship the method
- **THEN** the Resources menu omits the link that has no page, as the content, blog and method specifications require, and still lists Help, Developers and What's new

#### Scenario: Phone menu groups
- **WHEN** a visitor on a 360 px wide screen without JavaScript opens the menu
- **THEN** the Product group shows Features, Compare, What it costs, Self-host and Docs, and the Resources group shows the same links as the Resources menu

#### Scenario: Tablet width
- **WHEN** the header is shown at 768 px wide
- **THEN** every header item stays on one line and the page does not scroll sideways
