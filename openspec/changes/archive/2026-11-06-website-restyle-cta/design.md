# Design

## D1. One next step
`EndCta` takes a `kind` (`demo`, `start`, `self-host`, `import`, `source`, `follow`) and an optional title. Each kind has one action and a default title of a few words. The band is a hairline-topped row: title left, button right; it wraps on phones. Demo and Get started use the primary button; the others the secondary one, since the page's own content already did the persuading.

## D2. Support without nagging
The footer's Community row (every page) and the Support page carry the asks. The only other place is the end of blog posts and listings, where readers who stayed to the end are the ones most likely to help: one sentence with four text links, no brand colours.

## D3. Labels above titles
The uppercase label repeated the page's navigation name ("Features" above "Everything OpenTodo does."). Removing it shortens every page head by a line. Labels that carry information stay.

## Build and download size
No effect on build time; every content page loses about 1 KB of markup.
