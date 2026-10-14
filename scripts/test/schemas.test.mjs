// Content rules that fail the build (website-platform 2.3, switcher-pages 3.2, content-hub 1.1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articleSchema, compareSchema, templateSchema } from '../../src/content/schemas.mjs';

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
  const t = { title: 't', summary: 's', category: 'Home', lastReviewed: daysAgo(1), sources: ['/docs/real/x/'], labels: [{ name: 'a' }],
    projects: [{ name: 'P', tasks: [{ title: 'x', labels: ['b'] }, { title: 'y', due: 'tomorrow' }] }] };
  const m = messages(ts.safeParse(t));
  assert.ok(m.some((x) => x.includes('label "b" is not declared')));
  assert.ok(m.some((x) => x.includes('due must be a relative offset')));
});
