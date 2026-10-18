## MODIFIED Requirements

### Requirement: What it costs page
The site SHALL have a page at `/cost/` that explains the cost of using OpenTodo in words and without currency: the free licence named by the bundle manifest, the server footprint from the bundle manifest, who installs and updates, and how this compares with a plan per person. The facts shown beside the headline SHALL be about cost (the licence, that every person on a server gets an account at no cost, and that the server is the only cost); the server footprint SHALL appear in the section about where the server can live, not beside the headline. Every statement about the app SHALL link to its documentation page of the pinned release. The page SHALL be in the main navigation and SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Figures follow the release
- **WHEN** a new bundle is pinned with a different image size or idle memory
- **THEN** the cost page shows the new figures without any edit in this repository

#### Scenario: No prices
- **WHEN** the page is scanned for currency symbols or amounts
- **THEN** none are found; costs are described in words

#### Scenario: The headline facts answer the page's question
- **WHEN** a visitor opens `/cost/` at 1280 px or at 360 px wide without JavaScript
- **THEN** the facts beside or below the headline name the licence from the bundle manifest, accounts at no cost, and the server as the only cost, and the binary size and architectures appear only further down the page
