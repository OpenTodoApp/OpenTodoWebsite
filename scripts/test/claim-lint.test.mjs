import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lint } from '../lib/claim-lint.mjs';

const docExists = (h) => ['/docs/filters/', '/docs/recurrence/'].includes(h.split('#')[0]);
const md = (body) => `---\ntitle: x\n---\n${body}`;

test('flags a feature claim without a docs link, naming the line', () => {
  const p = lint(md('Intro without claims.\n\nOpenTodo filters your tasks offline.\n'), { docExists, file: 'g.md' });
  assert.equal(p.length, 1);
  assert.match(p[0], /^g\.md:6: paragraph mentions "filters"/);
});

test('accepts a claim with a docs link that resolves', () => {
  assert.deepEqual(lint(md('Use [filters](/docs/filters/) to find tasks.\n'), { docExists }), []);
});

test('rejects a docs link that is not in the bundle', () => {
  const p = lint(md('See the [filters](/docs/nope/) page.\n'), { docExists, file: 'g.md' });
  assert.ok(p.some((x) => x.includes('/docs/nope/ is not a page')));
});

test('the no-claim marker exempts the next paragraph only', () => {
  const p = lint(md('<!-- no-claim -->\nWe sync our thoughts weekly.\n\nAnd we sync again.\n'), { docExists, file: 'g.md' });
  assert.equal(p.length, 1);
  assert.match(p[0], /:7:/);
});

test('code spans and fences do not count as claims', () => {
  assert.deepEqual(lint(md('Type `@call & due <= 7 days` anywhere.\n\n```\nfilter sync api\n```\n'), { docExists }), []);
});

test('list items are checked one by one', () => {
  const p = lint(md('- Weekly [repeating](/docs/recurrence/) review\n- Reminders for everything\n'), { docExists, file: 'g.md' });
  assert.equal(p.length, 1);
  assert.match(p[0], /:5: paragraph mentions "Reminders"/);
});
