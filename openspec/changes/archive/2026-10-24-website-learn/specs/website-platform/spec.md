## ADDED Requirements

### Requirement: Moved pages keep their addresses
When a page moves or is folded into another, its old address SHALL answer with a permanent redirect to the page that now holds its content, defined in the server configuration. The website checks SHALL fail when a redirect leads to a page or fragment that is not built, or when a redirect hides a page that is still built. Redirects SHALL work without JavaScript, as they are answered by the server.

#### Scenario: An old index
- **WHEN** a visitor opens `/help/`
- **THEN** the server answers with a permanent redirect to `/learn/`

#### Scenario: A broken redirect
- **WHEN** a redirect in the server configuration names a target that the build does not produce
- **THEN** `npm run check:dist` fails naming the line and the target
