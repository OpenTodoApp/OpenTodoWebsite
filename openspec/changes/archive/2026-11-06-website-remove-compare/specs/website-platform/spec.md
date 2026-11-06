# Spec Delta

## MODIFIED Requirements

### Requirement: Typed content
Content pages that make claims (switch guides, templates, guides and how-tos) SHALL be written as content entries whose required fields are checked at build time, including a "checked on" date and source links where the content kind requires them. A missing or malformed field SHALL fail the build and name the entry.

#### Scenario: Comparison without a date
- **WHEN** a switch guide has no "checked on" date
- **THEN** the build fails and names the entry and the missing field

### Requirement: Structured data
Pages SHALL carry inline schema.org JSON-LD built from their own data: the home page a WebSite and a SoftwareApplication with the bundle's version, how-tos, guides, toolkit pieces and posts an article entity with author and dates, templates a Dataset with the download. No third-party script SHALL be loaded for it, and no rating, price or user count SHALL be stated.

#### Scenario: FAQ questions follow the page
- **WHEN** a how-to is published
- **THEN** its page carries an article entity with its author and dates without a second edit

#### Scenario: Still no third-party scripts
- **WHEN** the website checks scan the built pages
- **THEN** the structured data blocks have no `src` and the script check passes

### Requirement: Moved pages keep their addresses
When a page moves or is folded into another, its old address SHALL answer with a permanent redirect to the page that now holds its content, defined in the server configuration. The website checks SHALL fail when a redirect leads to a page or fragment that is not built, or when a redirect hides a page that is still built. Redirects SHALL work without JavaScript, as they are answered by the server.

#### Scenario: An old index
- **WHEN** a visitor opens `/help/`
- **THEN** the server answers with a permanent redirect to `/learn/`

#### Scenario: Compare is gone
- **WHEN** a visitor opens `/vs/todoist/`
- **THEN** the server answers with a permanent redirect to `/switch/todoist/`

#### Scenario: A broken redirect
- **WHEN** a redirect in the server configuration names a target that the build does not produce
- **THEN** `npm run check:dist` fails naming the line and the target
