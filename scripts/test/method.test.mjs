// The Open Loops vocabulary from the bundle (website-open-loops D1). The fixture is
// what the app's methodVocabulary() generates for 0.8.0.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readMethod } from '../lib/bundle.mjs';

const fixture = fs.readFileSync(new URL('./fixtures/method.json', import.meta.url), 'utf8');
const bundle = (json) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'method-'));
  if (json !== undefined) fs.writeFileSync(path.join(dir, 'method.json'), json);
  return dir;
};
const facts = { method: ['vocabulary', 'modes', 'loop-home'] };

test('the 0.8.0 vocabulary reads with its five moves in order', () => {
  const m = readMethod(bundle(fixture), facts);
  assert.deepEqual(m.moves.map((x) => x.id), ['catch', 'clarify', 'place', 'do', 'review']);
  assert.equal(m.moves[2].description.en, 'Give every item one home: a project, a date, Waiting or Someday.');
  assert.ok(m.languages.includes('it'));
});

test('no method without method.json or without the vocabulary feature', () => {
  assert.equal(readMethod(bundle(), facts), null);
  assert.equal(readMethod(bundle(fixture), {}), null);
  assert.equal(readMethod(bundle(fixture), { method: ['modes'] }), null);
});

test('an unknown schema or a missing move fails, naming the field', () => {
  const v2 = JSON.parse(fixture); v2.schema = 2;
  assert.throws(() => readMethod(bundle(JSON.stringify(v2)), facts), /method\.json: schema 2/);
  const noReview = JSON.parse(fixture); noReview.moves = noReview.moves.filter((x) => x.id !== 'review');
  assert.throws(() => readMethod(bundle(JSON.stringify(noReview)), facts), /moves has no move with the id "review"/);
});
