# Spec Delta

## ADDED Requirements

### Requirement: Support page
The site SHALL have an English page at `/support/` that shows the maintainer's approved text about why OpenTodo stays free, what he promises, what it costs to run and how to help, without changing its wording. The promises SHALL be an ordered list, the costs a table with a header row, and the sponsor links buttons: "Sponsor on GitHub" and "Buy me a coffee" in the opening section and again in the section about helping, and the Discord button with the ways to help without money. The sponsor, coffee and Discord addresses SHALL come from the site-wide constants. The buttons SHALL be drawn by the site, loading nothing from GitHub, Buy Me a Coffee or Discord. The costs are the project's own and SHALL stay in the currency the maintainer wrote them in; when they change, the maintainer's text and the page change together. The page SHALL read at 360 px wide and without JavaScript, in light and dark, with no serious or critical accessibility violation.

#### Scenario: Reading the page on a phone
- **WHEN** a visitor opens `/support/` at 360 px wide with JavaScript disabled
- **THEN** they see the title "Support OpenTodo", the Sponsor on GitHub and Buy me a coffee buttons, five numbered promises, the cost table and the Discord button, without sideways scrolling

#### Scenario: Changed sponsor address
- **WHEN** the sponsor address in the site-wide constants changes and the site is rebuilt
- **THEN** every Sponsor on GitHub button carries the new address

### Requirement: Ways to the support page
Every page SHALL link to `/support/` from the main navigation, as its last item labelled "Support" with a heart icon from the bundle in the app's pink hue, without animation, and from the footer, in the Community list and, from 768 px wide, beside the coffee and Discord buttons (phones keep the footer short). The closing call to action shared by content pages SHALL say that OpenTodo is free and always will be and link to `/support/`, and the About page's licence section SHALL link to it. The navigation item SHALL be in the phone menu too, and the header SHALL fit without sideways scrolling from 360 px.

#### Scenario: Navigation on a phone
- **WHEN** a visitor opens the menu on any page at 360 px wide without JavaScript
- **THEN** the last item is "Support" with a heart, and it leads to `/support/`

#### Scenario: End of a guide
- **WHEN** a visitor reaches the end of a guide
- **THEN** the closing call to action links to `/support/`
