## MODIFIED Requirements

### Requirement: Support page
The site SHALL have an English page at `/support/` that shows the maintainer's approved text about why OpenTodo stays free, what he promises, what it costs to run and how to help, without changing its wording. The promises SHALL be an ordered list, the costs a table with a header row, and the sponsor links buttons: "Sponsor on GitHub" and "Buy me a coffee" in the opening section and again in the section about helping, and the Discord button with the ways to help without money. Under the ways to give money, the page SHALL name hosting on PikaPods as a way to help, in the line "Host on PikaPods: part of what you pay goes to the project." linking PikaPods' OpenTodo page from the site-wide constants. The sponsor, coffee and Discord addresses SHALL come from the site-wide constants. The buttons SHALL be drawn by the site, loading nothing from GitHub, Buy Me a Coffee or Discord. The costs are the project's own and SHALL stay in the currency the maintainer wrote them in; when they change, the maintainer's text and the page change together. The page SHALL read at 360 px wide and without JavaScript, in light and dark, with no serious or critical accessibility violation.

#### Scenario: Reading the page on a phone
- **WHEN** a visitor opens `/support/` at 360 px wide with JavaScript disabled
- **THEN** they see the title "Support OpenTodo", the Sponsor on GitHub and Buy me a coffee buttons, five numbered promises, the cost table and the Discord button, without sideways scrolling

#### Scenario: Changed sponsor address
- **WHEN** the sponsor address in the site-wide constants changes and the site is rebuilt
- **THEN** every Sponsor on GitHub button carries the new address

#### Scenario: Hosting as a way to help
- **WHEN** a visitor reads the section about helping
- **THEN** below the sponsor and coffee buttons a line says "Host on PikaPods: part of what you pay goes to the project." and links PikaPods' OpenTodo page
