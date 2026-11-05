// The search index Features and Learn share (website-catalog D2), built with the site: every
// feature of the pinned release (linking its docs page), every Learn entry, and every docs page
// of the pinned bundle with its summary. t: title, s: summary, u: address, k: kind.
import fs from 'node:fs';
import path from 'node:path';
import { bundle } from '../lib/bundle';
import { featureGroups } from '../lib/features';
import { LEARN_TYPES, learnEntries } from '../lib/learn';

const decode = (s: string) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function docsPages(): { t: string; s: string; u: string; k: string }[] {
  const index = JSON.parse(fs.readFileSync(path.join(bundle.dir, 'docs', 'search.json'), 'utf8')) as { pages: { t: string; u: string }[] };
  return index.pages.map((p) => {
    const file = path.join(bundle.dir, p.u.replace(/^\//, ''), 'index.html');
    const html = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    const s = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '';
    return { t: p.t, s: decode(s), u: p.u, k: 'Docs' };
  });
}

export async function GET() {
  const features = featureGroups().flatMap((g) => g.items.map((f) => ({ t: f.name, s: f.line, u: f.doc, k: `Feature · ${g.title}` })));
  const label = Object.fromEntries(LEARN_TYPES.map((t) => [t.key, t.label]));
  const learn = (await learnEntries()).map((e) => ({ t: e.title, s: e.summary, u: e.href, k: label[e.type] }));
  return new Response(JSON.stringify([...features, ...learn, ...docsPages()]), { headers: { 'Content-Type': 'application/json' } });
}
