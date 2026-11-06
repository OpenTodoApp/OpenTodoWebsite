# Design

## D1. One catalog
Both catalogs answer "what is there, and where do I read more". The overview shows a few entries per section so the whole catalog fits a few screens and every section is one click deep; a section's page lists everything. The rail is the same component on every catalog page, so a visitor moves between Features and Learn without learning a second layout.

## D2. Search
A build-time index rather than a search library: the corpus is small (about 330 entries) and fixed per build. Ranking: every term must match; a title prefix scores 6, a word start in the title 4, anywhere in the title 3, the summary 1; ties go to the shorter title. Results replace the content while the box has text so the page never shows two lists at once. The docs keep their own full-text search; the catalog search links to it when nothing matches.

## Build and download size
Build: one more JSON endpoint reading 147 docs pages' descriptions (well under a second). Download: the catalog pages gain one small module script (about 2 KB); the index (about 18 KB gzipped) loads only when the box is focused.
