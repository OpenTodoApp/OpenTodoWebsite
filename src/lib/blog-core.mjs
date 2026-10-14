// Pure blog rules (website-blog design D3, D6), shared by src/lib/blog.ts and the
// unit tests. A post here is { id, data, body }, as Astro's content layer gives it.

export const WORDS_PER_MINUTE = 220;
export const PAGE_SIZE = 12;

const day = (d) => Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

/** Published: not a draft, and dated on or before the build day. */
export const isPublished = (post, today = new Date()) => !post.data.draft && day(post.data.publishedAt) <= day(today);

/** Newest first; same day falls back to the title so the order is stable. */
export const byNewest = (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.data.title.localeCompare(b.data.title);

export const published = (posts, today = new Date()) => posts.filter((p) => isPublished(p, today)).sort(byNewest);

/** Minutes to read: words outside code blocks and markup, divided by 220, rounded up, at least 1. */
export function readingMinutes(markdown = '') {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Up to `n` other posts of the same category, newest first. */
export const relatedPosts = (post, posts, n = 3) =>
  posts.filter((p) => p.id !== post.id && p.data.category === post.data.category).sort(byNewest).slice(0, n);

export const postUrl = (post) => `/blog/${post.id}/`;

/** One RSS item for a post. */
export const feedItem = (post) => ({ title: post.data.title, description: post.data.summary, link: postUrl(post), pubDate: post.data.publishedAt });

export const CATEGORY_LABELS = { news: 'News', releases: 'Releases', development: 'Development', ownership: 'Ownership' };
