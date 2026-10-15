import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cardSvg, ogFileFor, ogPathFor, sectionOf, wrap } from '../../scripts/lib/og.mjs';

test('every page maps to its own card path', () => {
  assert.equal(ogPathFor('/'), '/og/index.png');
  assert.equal(ogPathFor('/vs/things/'), '/og/vs/things.png');
  assert.equal(ogPathFor('/how-to/set-a-reminder'), '/og/how-to/set-a-reminder.png');
  assert.equal(ogFileFor('/d', '/cost/'), '/d/og/cost.png');
});

test('titles wrap to at most three lines and end with an ellipsis when cut', () => {
  assert.deepEqual(wrap('Short title'), ['Short title']);
  const long = wrap('Get reminders on your phone when the app is closed and nothing else is open at all', 26, 3);
  assert.equal(long.length, 3);
  assert.ok(long[2].endsWith('…'));
  assert.ok(long.every((l) => l.length <= 27));
});

test('the card names the section and escapes markup', () => {
  assert.equal(sectionOf('/how-to/x/'), 'How-to');
  assert.equal(sectionOf('/'), 'open-todo.app');
  const svg = cardSvg({ title: 'A <b>bold</b> & brave title', description: 'desc', section: 'Guides' });
  assert.ok(svg.includes('&lt;b&gt;bold&lt;/b&gt; &amp; brave'));
  assert.ok(svg.includes('· Guides'));
  assert.ok(svg.startsWith('<svg'));
});
