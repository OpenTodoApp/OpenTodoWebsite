## Why

The owner's "Build your client" plan (16 November) asks for every part of the API to be documented on the site, not only in the repository. From the next release, OpenTodo publishes a generated OpenAPI description (OpenTodo #1423), and the site bundle carries it as `api/openapi.json`. A reference built from that file shows every route and field of the pinned release, in the site's own pages, readable on a phone without JavaScript, and it can't drift from the server.

## What Changes

- `/api-reference/` lists the groups of routes, each with its number of routes, and links the shared schemas.
- One page per group (`/api-reference/<group>/`) shows, for each route: the method and path, the summary, whether it takes a token or a session, the description from the HTTP API guide, the path parameters, and the request and response fields as tables. A field whose type is a shared schema links to it.
- `/api-reference/schemas/` shows the shared schemas (Task, Project, Label, Note and the others) with their fields and descriptions.
- Everything is rendered at build time from the pinned bundle's `api/openapi.json`: static HTML, no script, no third-party request. While the pinned bundle has no description (1.5.0 and earlier), no page is built and nothing links to one.
- "Under the hood" links the reference beside the HTTP API guide when it exists.

## Capabilities

### Modified Capabilities

- `marketing-website`: a new requirement, "API reference".

## Impact

- `src/lib/openapi.ts`, `src/pages/api-reference/[...slug].astro`, `src/components/api/`, a few lines of CSS, `src/pages/under-the-hood.astro`, and a test.
- About 1.5 MB of HTML over 30 pages with the current description. No dependency.

## Out of scope

- Trying a request from the page: that would need a script and a live server.
- The sync protocol's op payloads, which stay in the sync guide.
