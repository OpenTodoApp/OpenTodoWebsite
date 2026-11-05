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
  const mark = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64"/></svg>';
  const svg = cardSvg({ title: 'A <b>bold</b> & brave title', description: 'desc', section: 'Guides', mark });
  assert.ok(svg.includes('&lt;b&gt;bold&lt;/b&gt; &amp; brave'));
  assert.ok(svg.includes('· Guides'));
  assert.ok(svg.startsWith('<svg'));
});

test('the card draws the bundle\'s colour mark, not a tick of its own', () => {
  const mark = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><!-- note --><rect width="64" height="64" rx="14" fill="#0f172a"/><path d="M1 2h3" stroke="#34d399"/></svg>';
  const svg = cardSvg({ title: 'T', description: '', section: 'Guides', mark });
  assert.ok(svg.includes('<svg x="80" y="76" width="44" height="44" viewBox="0 0 64 64">'), 'nested at the mark\'s place');
  assert.ok(svg.includes('<path d="M1 2h3" stroke="#34d399"/>'));
  assert.ok(!svg.includes('M12 23 l8 8 l13 -15'), 'the hand-drawn tick is gone');
  assert.throws(() => cardSvg({ title: 'T', description: '', section: 'Guides' }), /mark/);
});
