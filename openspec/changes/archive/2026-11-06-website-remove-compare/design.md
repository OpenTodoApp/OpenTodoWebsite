# Design

## D1. Where old addresses go
`/vs/` was an overview of how OpenTodo compares; Features is the closest overview of what it does. Each `/vs/<app>/` had a switch guide for the same app, which keeps the visitor's intent (they use that app). `/cost` pointed at the cost table; the server plan says what running OpenTodo takes. `/faq` pointed at questions that the Learn page's troubleshooting and the docs answer. All are exact or sample-annotated nginx redirects, so `npm run check:redirects` verifies each target is built.

## Build and download size
Four fewer pages and their social cards; slightly faster build. Nothing changes in what visitors download on other pages.
