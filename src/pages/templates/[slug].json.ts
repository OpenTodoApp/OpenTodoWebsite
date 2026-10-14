// The downloadable file of each template: OpenTodo's own export format.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { templateExport } from '../../lib/templates';

export async function getStaticPaths() {
  return (await getCollection('templates')).map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(templateExport(props.entry), null, 2) + '\n', { headers: { 'Content-Type': 'application/json' } });
