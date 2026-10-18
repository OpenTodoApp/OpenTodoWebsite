## MODIFIED Requirements

### Requirement: Help landing
The site SHALL have a page at `/help/` that is the entry point for doing something with OpenTodo. It SHALL group entry points by audience (people who use the app, people who run the server, people who build on it, and people for whom something is wrong) and phrase them as tasks, each linking the how-to, install page, toolkit page, guide or documentation page of the pinned release that answers it. It SHALL also link every topic page and the FAQ, so that how-tos, toolkit, topics, FAQ and install pages are all reachable from it. It SHALL link the documentation's search. It SHALL be linked from the main navigation of every page and SHALL read and link at 360 px wide without JavaScript.

#### Scenario: A task-shaped question
- **WHEN** a visitor on the help landing looks for how to get reminders on a phone
- **THEN** an entry in the first audience group leads to a page that answers it with steps and a link to the notifications documentation

#### Scenario: Audiences without scripts
- **WHEN** the page is opened without JavaScript
- **THEN** all audience groups are visible and reachable from a jump row at the top

#### Scenario: Everything that left the header is reachable
- **WHEN** the link check walks from `/help/`
- **THEN** every how-to, toolkit page, topic page, install page and the FAQ is linked from `/help/` directly
