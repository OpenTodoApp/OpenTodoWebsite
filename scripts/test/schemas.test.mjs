// Content rules that fail the build (website-platform 2.3, switcher-pages 3.2, content-hub 1.1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CONTENT_TAGS, HOWTO_GROUPS, articleSchema, compareSchema, howtoSchema, switchSchema, templateSchema } from '../../src/content/schemas.mjs';

const today = () => new Date('2026-10-14T12:00:00Z');
const docExists = (h) => h.startsWith('/docs/real/');
const daysAgo = (n) => new Date(today().getTime() - n * 864e5).toISOString().slice(0, 10);
const messages = (r) => r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);

const compare = (over = {}) => ({
  competitor: 'Acme', title: 't', summary: 's', checkedOn: daysAgo(10), audience: 'a',
  cost: { them: 'per person', us: 'free' }, importFormat: 'acme-csv',
  gaps: [{ title: 'Watch', detail: 'They have one.' }],
  rows: [
    { feature: 'A', them: 'yes', us: 'no' },
    { feature: 'B', them: 'no', us: 'yes', sourceDoc: '/docs/real/b/' },
    { feature: 'C', them: 'yes', us: 'yes', sourceDoc: '/docs/real/c/' },
    { feature: 'D', them: 'partial', us: 'yes', sourceDoc: '/docs/real/d/' },
  ],
  ...over,
});
const cs = compareSchema({ docExists, today });

test('a valid comparison passes', () => assert.equal(cs.safeParse(compare()).success, true));

test('a comparison without checkedOn fails and names the field', () => {
  const { checkedOn, ...rest } = compare();
  const r = cs.safeParse(rest);
  assert.equal(r.success, false);
  assert.ok(messages(r).some((m) => m.startsWith('checkedOn: "checkedOn" is required')));
});

test('a comparison checked 200 days ago is stale', () => {
  const r = cs.safeParse(compare({ checkedOn: daysAgo(200) }));
  assert.equal(r.success, false);
  assert.ok(messages(r).some((m) => /checkedOn: stale: .* 200 days ago \(limit 180 days\)/.test(m)));
});

test('an OpenTodo claim without a docs link fails and names the row', () => {
  const c = compare();
  delete c.rows[1].sourceDoc;
  const r = cs.safeParse(c);
  assert.ok(messages(r).includes('rows.1.sourceDoc: row "B" claims an OpenTodo feature without a documentation link (sourceDoc)'));
});

test('a sourceDoc that is not in the bundle fails', () => {
  const c = compare();
  c.rows[1].sourceDoc = '/docs/gone/';
  assert.ok(messages(cs.safeParse(c)).some((m) => m.includes('/docs/gone/ is not a page')));
});

test('gaps are mandatory', () => {
  assert.ok(messages(cs.safeParse(compare({ gaps: [] }))).some((m) => m.includes('where the competitor is ahead')));
});

const as = articleSchema({ docExists, today });
test('a guide without lastReviewed fails; one 13 months old is stale', () => {
  const ok = { title: 't', summary: 's', lastReviewed: daysAgo(30), sources: ['/docs/real/x/'] };
  assert.equal(as.safeParse(ok).success, true);
  const { lastReviewed, ...missing } = ok;
  assert.ok(messages(as.safeParse(missing)).some((m) => m.includes('"lastReviewed" is required')));
  assert.ok(messages(as.safeParse({ ...ok, lastReviewed: daysAgo(396) })).some((m) => m.includes('stale')));
});

test('templates refuse undeclared labels and bad due offsets', () => {
  const ts = templateSchema({ docExists, today });
  const t = { title: 't', summary: 's', category: 'Home', lastReviewed: daysAgo(1), sources: ['/docs/real/x/'], labels: [{ name: 'a' }], howToUse: ['import it'], makeItYours: ['rename it'],
    projects: [{ name: 'P', tasks: [{ title: 'x', labels: ['b'] }, { title: 'y', due: 'tomorrow' }] }] };
  const m = messages(ts.safeParse(t));
  assert.ok(m.some((x) => x.includes('label "b" is not declared')));
  assert.ok(m.some((x) => x.includes('due must be a relative offset')));
});

import { blogSchema, blogSlugProblem } from '../../src/content/schemas.mjs';

const bs = blogSchema({ releaseExists: (v) => ['0.1.0', '0.2.0', '0.3.0'].includes(v) });
const post = (over = {}) => ({ title: 'T', summary: 'S', publishedAt: '2026-10-14', author: 'raffaele', category: 'news', ...over });

test('blog: a valid post passes', () => assert.equal(bs.safeParse(post()).success, true));

test('blog: a post without publishedAt fails naming the field', () => {
  const { publishedAt, ...rest } = post();
  assert.ok(messages(bs.safeParse(rest)).some((m) => m.startsWith('publishedAt: "publishedAt" is required')));
});

test('blog: a release post must name a released version', () => {
  assert.equal(bs.safeParse(post({ category: 'releases', release: '0.3.0' })).success, true);
  assert.ok(messages(bs.safeParse(post({ category: 'releases', release: '0.4.0' }))).some((m) => m.includes('0.4.0 is not a release')));
  assert.ok(messages(bs.safeParse(post({ category: 'releases' }))).some((m) => m.includes('must name the released version')));
  assert.ok(messages(bs.safeParse(post({ release: '0.3.0' }))).some((m) => m.includes('only for posts in the Releases category')));
});

test('blog: shippedIn must be a released version on an in-development post', () => {
  assert.equal(bs.safeParse(post({ category: 'development', inDevelopment: true, shippedIn: '0.3.0' })).success, true);
  assert.ok(messages(bs.safeParse(post({ category: 'development', inDevelopment: true, shippedIn: '9.9.9' }))).some((m) => m.includes('9.9.9 is not a release')));
});

test('blog: a cover without alt text fails', () => {
  assert.ok(messages(bs.safeParse(post({ cover: 'cover.png' }))).some((m) => m.startsWith('coverAlt:')));
});

test('blog: unknown category and reserved slugs are refused', () => {
  assert.ok(messages(bs.safeParse(post({ category: 'misc' }))).some((m) => m.startsWith('category:')));
  assert.match(blogSlugProblem('page'), /collides/);
  assert.equal(blogSlugProblem('hello-world'), null);
});

test('a how-to needs a known group; shot and minutes are optional', () => {
  const hs = howtoSchema({ docExists, today });
  const ok = { title: 't', summary: 's', lastReviewed: daysAgo(3), sources: ['/docs/real/x/'], group: HOWTO_GROUPS[0] };
  assert.equal(hs.safeParse(ok).success, true);
  assert.equal(hs.safeParse(ok).data.audience, 'user');
  assert.ok(messages(hs.safeParse({ ...ok, group: 'Misc' })).some((m) => m.includes('"group" must be one of')));
  assert.equal(hs.safeParse({ ...ok, shot: 'today', minutes: 5 }).success, true);
  assert.ok(messages(hs.safeParse({ ...ok, minutes: 0 })).length > 0);
});

test('a switch page needs a fresh checkedOn, three terms and honest drops', () => {
  const ss = switchSchema({ docExists, today });
  const ok = { app: 'Acme', title: 't', summary: 's', checkedOn: daysAgo(10), sources: ['/docs/real/import/'], importFormat: 'acme-csv',
    terms: [{ them: 'a', us: 'b' }, { them: 'c', us: 'd' }, { them: 'e', us: 'f', note: 'n' }], keeps: ['titles'], drops: ['comments'] };
  assert.equal(ss.safeParse(ok).success, true);
  assert.ok(messages(ss.safeParse({ ...ok, checkedOn: daysAgo(200) })).some((m) => m.includes('stale')));
  assert.ok(messages(ss.safeParse({ ...ok, terms: ok.terms.slice(0, 2) })).some((m) => m.includes('at least three terms')));
  assert.ok(messages(ss.safeParse({ ...ok, drops: [] })).some((m) => m.includes('drops')));
  assert.ok(messages(ss.safeParse({ ...ok, sources: ['/docs/nope/'] })).some((m) => m.includes('not a page of the pinned bundle')));
});

test('templates carry audience, layout, usage notes and known tags', () => {
  const ts = templateSchema({ docExists, today });
  const t = { title: 't', summary: 's', category: 'Home', lastReviewed: daysAgo(1), sources: ['/docs/real/x/'], howToUse: ['import it'], makeItYours: ['rename it'],
    projects: [{ name: 'P', tasks: [{ title: 'x' }] }] };
  const ok = ts.safeParse(t);
  assert.equal(ok.success, true);
  assert.equal(ok.data.audience, 'Everyone');
  assert.equal(ok.data.layout, 'list');
  assert.equal(ok.data.author, 'raffaele');
  assert.ok(messages(ts.safeParse({ ...t, howToUse: [] })).some((m) => m.includes('howToUse')));
  assert.ok(messages(ts.safeParse({ ...t, layout: 'gantt' })).some((m) => m.includes('"layout" must be one of')));
  assert.ok(messages(ts.safeParse({ ...t, audience: 'Robots' })).some((m) => m.includes('"audience" must be one of')));
  assert.ok(messages(ts.safeParse({ ...t, tags: ['nope'] })).some((m) => m.includes('"tags" must be among')));
  assert.equal(ts.safeParse({ ...t, tags: [CONTENT_TAGS[0]] }).success, true);
});

test('guides accept known tags only', () => {
  const g = { title: 't', summary: 's', lastReviewed: daysAgo(30), sources: ['/docs/real/x/'] };
  assert.deepEqual(as.safeParse(g).data.tags, []);
  assert.equal(as.safeParse({ ...g, tags: ['focus', 'habits'] }).success, true);
  assert.ok(messages(as.safeParse({ ...g, tags: ['Focus'] })).some((m) => m.includes('"tags" must be among')));
});

test('authors: a local photo and a short note pass; a remote photo or a long note fail', async () => {
  const { authorsSchema } = await import('../../src/content/schemas.mjs');
  const base = { name: 'A', bio: 'A builds it.', url: 'https://example.org' };
  assert.ok(authorsSchema.safeParse({ a: { ...base, photo: 'src/assets/authors/a.jpg', note: 'I build it.' } }).success);
  const remote = authorsSchema.safeParse({ a: { ...base, photo: 'https://example.org/a.jpg' } });
  assert.ok(!remote.success && messages(remote).some((m) => m.includes('not a URL')));
  const long = authorsSchema.safeParse({ a: { ...base, note: Array(121).fill('word').join(' ') } });
  assert.ok(!long.success && messages(long).some((m) => m.includes('at most 120 words')));
});

test('authors: the real authors file is valid', async () => {
  const { authorsSchema } = await import('../../src/content/schemas.mjs');
  const fs = await import('node:fs');
  const r = authorsSchema.safeParse(JSON.parse(fs.readFileSync(new URL('../../src/content/authors.json', import.meta.url), 'utf8')));
  assert.ok(r.success, r.success ? '' : messages(r).join('\n'));
});
