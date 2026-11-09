# Design

## D1. One data file, checked twice
`src/content/series.json` maps a series id to `{ title, summary }`; the id is the URL. The blog schema refuses an id that is not a key there and requires `part` (a whole number from 1) exactly when `series` is set. Uniqueness spans posts, so it is checked where every page reads the collection (`publishedPosts()`), over all posts including drafts, because a draft part publishes later under the same number. The error names both folders.

## D2. The part's page
The label sits directly above the title, in the accent colour of the byline's category link, and links to the series page. At the end, the existing previous and next cards point to the neighbouring published parts (labelled "Part N") when there is one, and otherwise to the neighbouring posts as before, so a post never shows two pairs of cards. Drafts and future-dated parts are left out because the neighbours come from the published posts.

## D3. The series page
`/blog/series/<id>/` is built only for a series with at least one published part, so nothing ever links to an empty page; a category page differs because the category tabs always link it. It reuses the blog's rows, with "Part N" where a row shows its category, oldest part first. The content check knows the page once a part is published, so a post may link it.

## Build and download size
One more page per series with a published part; a few lines of CSS. No script, no new image, no measurable effect on build time.
