## ADDED Requirements

### Requirement: API reference
When the pinned release bundle carries `api/openapi.json`, the site SHALL publish an API reference rendered from it at build time:
- an index at `/api-reference/` that lists the groups of routes with their number of routes and links the shared schemas;
- one page per group at `/api-reference/<group>/`;
- a page of the shared schemas at `/api-reference/schemas/`.

For each route, the group page SHALL show:
- the method and path;
- the summary;
- whether it takes a token or a session, or no authentication;
- its description;
- its path parameters, and its request and response fields as tables of name, type, whether required, and description.

A type that names a shared schema SHALL link to it. The pages SHALL be static HTML with no script and no request to another site, SHALL read at 360 px wide without JavaScript and without sideways scrolling, and SHALL take every fact from the pinned description.

While the pinned bundle has no description, no reference page SHALL be built and no page SHALL link to one. "Under the hood" SHALL link the reference beside the HTTP API guide when it exists.

#### Scenario: A route on a phone
- **WHEN** a visitor opens the page of the group that holds the task routes, at 360 px wide without JavaScript
- **THEN** they see `POST /api/v1/tasks` with its summary, its authentication and a table of its request fields, and the page does not scroll sideways

#### Scenario: A release without a description
- **WHEN** the site is built against a bundle whose release has no `api/openapi.json`
- **THEN** no page exists under `/api-reference/` and "Under the hood" has no link to it
