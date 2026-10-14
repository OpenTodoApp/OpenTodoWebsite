// RSS 2.0 feed of published blog posts only, newest first (website-blog D6).
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { feedItem, publishedPosts } from '../../lib/blog';

export async function GET(context: APIContext) {
  return rss({
    title: 'OpenTodo blog',
    description: 'News, releases and how OpenTodo is built.',
    site: context.site!,
    items: (await publishedPosts()).map(feedItem),
  });
}
