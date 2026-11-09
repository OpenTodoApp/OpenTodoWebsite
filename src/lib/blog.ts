// The blog's published posts and helpers for pages (website-blog design D3, D6).
// Every page, the home strip and both feeds go through publishedPosts(), so the
// draft and future-date rules live in one place.
import { getCollection, type CollectionEntry } from 'astro:content';
import authors from '../content/authors.json';
import seriesData from '../content/series.json';
import { CATEGORY_LABELS as LABELS, feedItem, published, readingMinutes, relatedPosts as related, seriesNeighbours as neighbours, seriesParts as parts, seriesProblems, seriesUrl } from './blog-core.mjs';
import { BLOG_CATEGORIES } from '../content/schemas.mjs';

export type Post = CollectionEntry<'blog'>;
export type Category = Post['data']['category'];
export { feedItem, readingMinutes, seriesUrl };
export const CATEGORY_LABELS = LABELS as Record<Category, string>;
export const relatedPosts = (post: Post, posts: Post[], n = 3) => related(post, posts, n) as Post[];
export const CATEGORIES = BLOG_CATEGORIES as Category[];

export async function publishedPosts(): Promise<Post[]> {
  const all = await getCollection('blog');
  // A part number used twice in one series fails the build (website-blog-series D1).
  const problems = seriesProblems(all);
  if (problems.length) throw new Error(problems.join('\n'));
  return published(all) as Post[];
}

export type Series = { title: string; summary: string };
export const SERIES = seriesData as Record<string, Series>;
export const seriesParts = (id: string, posts: Post[]) => parts(id, posts) as Post[];
export const seriesNeighbours = (post: Post, posts: Post[]) => neighbours(post, posts) as { previous?: Post; next?: Post };

export const authorOf = (post: Post) => (authors as Record<string, { name: string; bio: string; url: string }>)[post.data.author];

export const categoryUrl = (c: Category) => `/blog/category/${c}/`;

export const formatDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
