## MODIFIED Requirements

### Requirement: Paths to get OpenTodo on the home page
The home page in every language SHALL show four ways to get OpenTodo as equal cards of the same layout: trying the demo, hosted for you by PikaPods (from its price, with updates and HTTPS handled and part of what you pay supporting OpenTodo), joining a server someone else runs with an invitation link, and running one's own server. Only the demo card SHALL use the primary button. The block SHALL say that OpenTodo has no cloud of its own, so there is nothing to sign up for on the site. The hosted card SHALL link PikaPods' OpenTodo page and the site's choice of how to run the server, where the disclosure stands in full; it SHALL NOT be called recommended or the easiest way, and the header SHALL NOT link PikaPods. Each other path SHALL link to the page or documentation of the pinned release that continues it. The price SHALL be the one on PikaPods' OpenTodo page, checked when it changes. The block SHALL read and link without JavaScript at 360 px wide, the cards stacked.

#### Scenario: A visitor who will not run a server
- **WHEN** a visitor reads the block on a 360 px wide phone without JavaScript
- **THEN** the third path tells them to open the invitation link they were sent and links to the documentation for installing the app from the browser

#### Scenario: Demo lifetime from the docs
- **WHEN** the demo card states how long a sandbox lives
- **THEN** the statement matches the demo documentation of the pinned release and links to it

#### Scenario: No hosted sign-up is implied
- **WHEN** a visitor looks for a "sign up" or "start for free" path
- **THEN** the block says OpenTodo has no cloud of its own and offers the demo, managed hosting by PikaPods and the other ways in

#### Scenario: Equal weight
- **WHEN** a visitor compares the cards at 1280 px
- **THEN** the four cards stand in one row with the same size and layout, and the hosted, join and run-your-own cards use the same button style
