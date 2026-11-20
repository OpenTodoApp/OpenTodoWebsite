import assert from 'node:assert/strict';
import { test } from 'node:test';
import { SURVEY, surveyActive } from '../../src/lib/survey.mjs';

// survey-strip: built until the end date (UTC), gone the day after.
test('the survey strip ends on its own', () => {
  assert.equal(SURVEY.end, '2026-12-11');
  assert.ok(surveyActive(new Date('2026-11-20T12:00:00Z')));
  assert.ok(surveyActive(new Date('2026-12-11T23:59:59Z')));
  assert.ok(!surveyActive(new Date('2026-12-12T00:00:00Z')));
});

test('the survey is a plain link without tracking parameters', () => {
  const url = new URL(SURVEY.url);
  assert.equal(url.origin, 'https://tally.so');
  assert.equal(url.search, '');
});
