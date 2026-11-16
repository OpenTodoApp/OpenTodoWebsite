## ADDED Requirements

### Requirement: Build your own client page
The site SHALL have an English page at `/build/`, "Build your own client", listed in the sitemap, linked from the "Build on it" group of Under the hood, from the Ecosystem page and from the footer's Learn group. It SHALL show, as groups of link rows: three ways in (the REST API, the sync protocol, webhooks with MCP), each linking its docs page of the pinned release; where to start, saying that a client signs in with an API token the person creates and that there is no sign-in flow for other apps, and linking the client guide and the OpenAPI description; the clients to learn from (the `ot` command line, the Obsidian plugin, the n8n nodes, the browser extension and the Home Assistant integration), each with what it uses, its docs page and its source; and community clients. Anything the page links that is not in the pinned release SHALL be linked on GitHub and labelled "On GitHub, not in a release yet", and the guide SHALL link its docs page once the pinned bundle has it. Community clients SHALL come from a list committed in the website repository, which anyone can add to by pull request, and each SHALL be marked "Not vetted by OpenTodo"; while the list is empty the page SHALL say "None yet". The page SHALL say how to be listed: the repository topic `opentodo-client` and a pull request adding the client to the list. The build SHALL NOT call GitHub. The page SHALL read and link without JavaScript at 360 px wide, in light and dark.

#### Scenario: A developer looking for a way in
- **WHEN** a visitor on a 360 px wide phone without JavaScript opens `/build/`
- **THEN** they see the three ways in, how a client signs in, the guide, the OpenAPI description and the clients to learn from, each linked, and the page does not scroll sideways

#### Scenario: Not released yet
- **WHEN** the pinned release has no client guide
- **THEN** the guide links the file on GitHub with the label "On GitHub, not in a release yet", and once a pinned release has the guide, it links its docs page without the label

#### Scenario: No community clients yet
- **WHEN** the committed list is empty
- **THEN** the community clients group says "None yet" and how to be listed

#### Scenario: A client is added
- **WHEN** a pull request adds a client to the list and the site is rebuilt
- **THEN** the community clients group shows it as a link row marked "Not vetted by OpenTodo"

#### Scenario: Found from the technical pages
- **WHEN** a visitor opens Under the hood, the Ecosystem page or any page's footer
- **THEN** each links `/build/`
