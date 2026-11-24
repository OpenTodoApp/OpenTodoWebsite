## Why

Microsoft retires the To Do apps on 30 June 2027, personal accounts included, and Planner is not offered to personal accounts. People who look for a new home land anywhere on the site, and the post that shows them how to bring their lists (`/blog/leaving-microsoft-to-do/`) is three scrolls away among the latest posts. A line under the home page hero crowded the hero and was seen only there.

## What Changes

- One quiet link in the header of every page, just before Try the demo, in the page's language: "Leaving Microsoft To Do?" (German "Von Microsoft To Do wechseln?"), leading to the post. It is a plain navigation link, never a button, so Try the demo stays the one primary action. Translated pages mark the link `hreflang="en"`, as the post is English only.
- Below 960 px, where the header's links move into the `<details>` menu, the link is the menu's last link; the header row keeps only the brand, Try the demo and the menu button. From 960 to 1199 px the header's row has no room for it beside the links (the German header already fills it), so the link shows from 1200 px; a narrower window reaches the post from the blog.
- The home page no longer shows the line under the hero.
- The link is one component, `src/components/MsTodoLink.astro`, with its texts and its end date, included in `SiteHeader.astro` on two lines (the wide header and the menu). A build after 2027-06-30 (UTC) leaves it out; removing it earlier is deleting the component, its two lines and its two CSS rules (`.header-ms-todo`).

## Capabilities

### Modified Capabilities

- `marketing-website`: a new requirement, "Microsoft To Do link in the header".

## Impact

- Pages: every page's header (wide header and the menu below 960 px); the home page hero loses the line.
- No new dependency, no script, about 150 bytes of HTML per page. Build time is unchanged.

## Out of scope

- The survey strip, the footer and the page bodies.
- Translating the post: blog posts are English only.
- Tracking or analytics for the link.
