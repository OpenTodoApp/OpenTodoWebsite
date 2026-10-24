## REMOVED Requirements

### Requirement: Hero demo reads cleanly without styles
**Reason**: The home page no longer has the scripted hero demo; it shows the real Today screen from the bundle (website-home-v2).
**Migration**: The quick-add and filter playgrounds stay on `/playground/`; the hero shows a screenshot with a descriptive alternative text.

## MODIFIED Requirements

### Requirement: Outcome-first home page
The home page SHALL open with the outcome for people who use a task app, not with implementation details. Above the first screenful it SHALL show a headline, a one-sentence promise and calls to action to try the demo and to get started, with a real screenshot of the pinned release directly below. Architecture terms SHALL NOT appear above the fold.

#### Scenario: A Todoist user lands on the home page
- **WHEN** a visitor opens the home page on a 390 px wide phone
- **THEN** the first screenful shows the headline, the promise and the calls to action, and the Today screenshot is reachable by scrolling once, without any mention of op logs, clocks or SQLite

### Requirement: Paths to get OpenTodo on the home page
The home page SHALL show the three ways to get OpenTodo: trying the demo, joining a server someone else runs with an invitation link, and running one's own server. It SHALL state that OpenTodo is not offered as a hosted service. Each path SHALL link to the page or documentation of the pinned release that continues it. The block SHALL read and link without JavaScript at 360 px wide.

#### Scenario: A visitor who will not run a server
- **WHEN** a visitor reads the block on a 360 px wide phone without JavaScript
- **THEN** the second path tells them to open the invitation link they were sent and links to the documentation for installing the app from the browser

#### Scenario: Demo lifetime from the docs
- **WHEN** the demo card states how long a sandbox lives
- **THEN** the statement matches the demo documentation of the pinned release and links to it

#### Scenario: No hosted sign-up is implied
- **WHEN** a visitor looks for a "sign up" or "start for free" path
- **THEN** the block says OpenTodo is not offered as a hosted service and offers the demo instead

### Requirement: Differentiators and proof on the home page
The home page SHALL present the differentiators (one server for a whole household, full offline use, optional end-to-end encryption, AI only on the person's terms with their own model, leaving at any time), each linked to its documentation or guide, real screenshots of the pinned release, and a path that links to the self-hosting page.

#### Scenario: Technical detail is one click away
- **WHEN** a visitor wants to know how sync works
- **THEN** a link from the home page leads to the self-hosting page with the interactive sync demo

## ADDED Requirements

### Requirement: Everything included on the home page
The home page SHALL show the breadth of the pinned release in one compact part: every feature group with its count and first items linked to their documentation, the integrations and import apps by name, and a link to the features page saying no feature is held back for a paid plan. It SHALL use the features page's data, so it follows the pinned release. At 360 px wide and without JavaScript the groups SHALL be disclosures that open to their items.

#### Scenario: A new release adds a feature
- **WHEN** the pin moves to a release that adds a listed feature
- **THEN** its group's count on the home page grows with no edit to the home page
