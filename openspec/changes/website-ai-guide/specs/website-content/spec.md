## ADDED Requirements

### Requirement: AI on your terms guide
The toolkit SHALL include a guide that explains in plain words how AI works in OpenTodo: off until turned on, the models that can be used, changes proposed for review and undo, a person's own AI tools and their limits, and end-to-end encryption. Every statement SHALL link its documentation page of the pinned release, and an illustration of the review card SHALL be labelled as one. The guide SHALL read at 360 px wide without JavaScript.

#### Scenario: Encrypted account
- **WHEN** a visitor whose account uses end-to-end encryption reads the guide
- **THEN** it says the in-app assistant is not available for that account and links the documentation that explains why

#### Scenario: Linked from the home page
- **WHEN** a visitor follows "AI on your terms" on the home page
- **THEN** the guide opens
