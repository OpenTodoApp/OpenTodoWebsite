## ADDED Requirements

### Requirement: Microsoft To Do link in the header
Until the end date set once in `src/components/MsTodoLink.astro` (2027-06-30, the day Microsoft retires the To Do apps), the header of every page SHALL show one link, in the page's language, asking whether the visitor is leaving Microsoft To Do and leading to the post `/blog/leaving-microsoft-to-do/`. The home page SHALL NOT show a separate Microsoft To Do line.

#### Scenario: German page
- **WHEN** a visitor opens `/de/` before the end date
- **THEN** the header links "Von Microsoft To Do wechseln?" to the post

#### Scenario: After the end date
- **WHEN** the site is built on 2027-07-01 (UTC) or later
- **THEN** no page contains the link

### Requirement: The Microsoft To Do link stays secondary
From 1200 px wide the link SHALL sit just before Try the demo in the header's plain link style, never in the style of Try the demo; from 960 to 1199 px the header's row has no room for it and leaves it out. On translated pages it SHALL carry `hreflang="en"`, as the post is English only.

#### Scenario: Wide window
- **WHEN** a visitor opens `/` at 1280 px wide before the end date
- **THEN** "Leaving Microsoft To Do?" shows as a plain link right before the Try the demo button

### Requirement: The Microsoft To Do link reads everywhere
The Microsoft To Do link SHALL be plain HTML, readable without JavaScript, and meet WCAG 2.2 AA in light and dark. Below 960 px it SHALL be the last link of the `<details>` menu, so the header row neither wraps nor scrolls sideways from 360 px wide.

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/de/` at 360 px wide with JavaScript disabled before the end date and opens the menu
- **THEN** the link shows in the menu, the header row shows only the brand, Try the demo and the menu button, and the page does not scroll sideways
