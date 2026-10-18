## MODIFIED Requirements

### Requirement: Shared layout and navigation
Every page SHALL share one header and one footer. The header SHALL offer Features, Compare, What it costs, Self-host, a Resources menu and Docs, a link to the app's source repository shown as an icon with an accessible name, and one primary call to action to try the demo. The footer SHALL have four columns (Product, Resources, Self-hosting, Project), list the site's languages in one row, and carry the licence, source, specification and security links. The layout SHALL follow the visitor's light or dark preference, use the colour tokens, typeface and icon set from the bundle, and collapse the navigation into a menu below 768 px that works without JavaScript.

#### Scenario: Phone navigation without JavaScript
- **WHEN** a visitor on a 360 px wide screen with JavaScript disabled opens the menu
- **THEN** the navigation links are shown and work

#### Scenario: Colours match the app
- **WHEN** the bundle's accent token changes in a new release and the site is rebuilt
- **THEN** buttons and links on the site use the new value without any edit in this repository

#### Scenario: One call to action in the header
- **WHEN** a visitor looks at the header at 1280 px wide
- **THEN** exactly one button is shown ("Try the demo"), and the source repository link is an icon whose accessible name is "OpenTodo on GitHub"

#### Scenario: Balanced footer
- **WHEN** a visitor reaches the footer at 1280 px wide
- **THEN** it shows four columns of at most eight links each and the six languages on one line, and at 360 px wide the columns stack and the languages wrap without horizontal scrolling
