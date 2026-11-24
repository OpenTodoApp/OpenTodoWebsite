## Why

Microsoft retires the To Do apps on 30 June 2027, personal accounts included, and Planner is not offered to personal accounts. People who look for a new home land on the home page, and the post that shows them how to bring their lists (`/blog/leaving-microsoft-to-do/`) is three scrolls away among the latest posts.

## What Changes

- One line under the hero's app badges on every home page (English and each translated home page), in the page's language: "Leaving Microsoft To Do?" and a link to the post. The translated pages say the post is in English.
- The line is one component, `src/components/home/MsTodoNotice.astro`, with its strings, its end date and its styles, included once in `HomeStory.astro`. A build after 2027-06-30 (UTC) leaves it out; removing it earlier is deleting the component and its one include.

## Capabilities

### Modified Capabilities

- `marketing-website`: a new requirement, "Microsoft To Do notice on the home page".

## Impact

- Pages: the home page and the translated home pages (`/`, `/de/`, `/fr/`, `/it/`, `/es/`, `/pt/`, `/zh/`, `/nl/`), the hero section only.
- No new dependency, no script, about 300 bytes of HTML and CSS per home page. Build time is unchanged.

## Out of scope

- Any other page, the header or the survey strip.
- Translating the post: blog posts are English only.
- Tracking or analytics for the link.
