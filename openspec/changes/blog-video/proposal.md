## Why

The owner, 17 November: the "OpenTodo in practice" posts should show a feature with videos as well as screenshots. Three posts already have a video (MP4 under `public/media/blog/<slug>/`, in a figure with a caption), but nothing says what a video may weigh or how it stays accessible, nothing checks it, and each was recorded by hand. A daily or thrice-weekly series needs a recording that is cheap and repeatable.

## What Changes

- The convention the three videos already follow becomes a requirement: a self-hosted MP4 under `public/media/blog/<slug>/`, embedded with `<video>` in a `<figure>` whose caption says what happens, with a poster, `controls`, `muted`, `playsinline`, `preload="none"`, no autoplay and no sound. At most 3 MB per video.
- `scripts/record-post.mjs` records a post's pictures from a server of the pinned release with an example account: screenshots next to the post, the video (H.264, trimmed with ffmpeg) and its JPEG poster under `public/media/blog/<slug>/`. Each post's data and steps are `scripts/posts/<slug>.mjs`.
- A test checks every video on the blog's pages, the three existing ones included (they pass).
- The pilot post, part 2 of "OpenTodo in practice": repeating chores, with two screenshots and one video, recorded against OpenTodo 1.5.0.

## Capabilities

### Modified Capabilities

- `website-blog`: a new requirement, "Video in a post".

## Impact

- `scripts/record-post.mjs`, `scripts/posts/chores-that-come-back.mjs`, `scripts/test/blog-video.test.mjs`, the post and its files (two WebP screenshots of about 120 KB together, a 102 KB video and a 46 KB poster). No CSS change.
- Recording needs ffmpeg and Playwright (already a dev dependency); the build does not. No new dependency, no script on the page: the browser's own video player.
