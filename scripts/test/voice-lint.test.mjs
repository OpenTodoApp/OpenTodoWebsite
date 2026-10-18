// The voice lint reads its list from the guide (website-voice-and-releases D1, D2).
import fs from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAvoid, voiceLint } from '../lib/voice-lint.mjs';

const guide = '# Voice\n\n```avoid\nhonest\nin plain words\n```\n';

test('the avoid block of the real guide parses', () => {
  const avoid = parseAvoid(fs.readFileSync(new URL('../../content/VOICE.md', import.meta.url), 'utf8'));
  for (const w of ['honest', 'honestly', 'in plain words', 'seamless']) assert.ok(avoid.includes(w), w);
});

test('a word to avoid fails with file and line', () => {
  const avoid = parseAvoid(guide);
  assert.deepEqual(voiceLint('Intro.\n\nThe table below is honest in both directions.', { file: 'a.md', avoid }), ['a.md:3: "honest" is on the voice guide\'s list to avoid']);
});

test('whole words only, any case', () => {
  const avoid = parseAvoid(guide);
  assert.deepEqual(voiceLint('Honesty-free? Dishonestly. Honest!', { file: 'a.md', avoid }), ['a.md:1: "honest" is on the voice guide\'s list to avoid']);
});

test('a marked quotation is exempt', () => {
  const avoid = parseAvoid(guide);
  assert.deepEqual(voiceLint('<!-- quote -->\n"An honest app", a reviewer wrote.\n\nNext.', { file: 'a.md', avoid }), []);
  assert.deepEqual(voiceLint('<blockquote data-quote>An honest app</blockquote>', { file: 'p.astro', avoid, kind: 'astro' }), []);
});

test('code comments in pages are not copy', () => {
  const avoid = parseAvoid(guide);
  assert.deepEqual(voiceLint('// The honesty line\n/* honest */\n<!-- honest -->\n<p>in plain words</p>', { file: 'p.astro', avoid, kind: 'astro' }), ['p.astro:4: "in plain words" is on the voice guide\'s list to avoid']);
});

test('a phrase added to the guide is checked with no change to the script', () => {
  const avoid = parseAvoid(guide.replace('```\n', 'no catch\n```\n'));
  assert.equal(voiceLint('Free, no catch.', { file: 'a.md', avoid }).length, 1);
});
