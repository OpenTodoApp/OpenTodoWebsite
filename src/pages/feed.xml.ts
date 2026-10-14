// RSS 2.0 feed over guides, templates, essays, toolkit pieces and releases,
// newest first (website-content-hub D4). Releases come only from the pinned
// bundle's changelog.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { releases } from '../lib/bundle';

export async function GET(context: APIContext) {
  const published = <T extends { data: { draft?: boolean } }>(e: T) => !e.data.draft;
  const items = [
    ...(await getCollection('guides', published)).map((e) => ({ title: e.data.title, description: e.data.summary, link: `/guides/${e.id}/`, pubDate: e.data.lastReviewed })),
    ...(await getCollection('toolkit', published)).map((e) => ({ title: e.data.title, description: e.data.summary, link: `/toolkit/${e.id}/`, pubDate: e.data.lastReviewed })),
    ...(await getCollection('essays', published)).map((e) => ({ title: e.data.title, description: e.data.summary, link: `/essays/${e.id}/`, pubDate: e.data.lastReviewed })),
    ...(await getCollection('templates')).map((e) => ({ title: `Template: ${e.data.title}`, description: e.data.summary, link: `/templates/${e.id}/`, pubDate: e.data.lastReviewed })),
    ...releases.map((r) => ({ title: `OpenTodo ${r.version}`, description: r.summary.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') || `Release notes of OpenTodo ${r.version}`, link: `/whats-new/${r.version}/`, pubDate: new Date(`${r.date}T00:00:00Z`) })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime() || a.title.localeCompare(b.title));
  return rss({
    title: 'OpenTodo',
    description: 'Guides, templates, essays and releases of OpenTodo, the task manager you host yourself.',
    site: context.site!,
    items,
  });
}
