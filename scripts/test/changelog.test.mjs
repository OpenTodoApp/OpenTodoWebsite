// Release summaries from the real changelog intros (website-voice-and-releases D3).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { firstSentence, hasUpgradeNotes, isPreRelease, sectionCount, sectionCounts } from '../../src/lib/changelog-core.mjs';

test('first sentences of the 0.4.0 to 0.7.0 intros', () => {
  assert.equal(firstSentence('OpenTodo 0.7.0 is a hardening release, the result of a review of the whole code base. Your account is harder to take over.'), 'OpenTodo 0.7.0 is a hardening release, the result of a review of the whole code base.');
  assert.equal(firstSentence('OpenTodo 0.6.1 makes plain-http installs work: opened by a home server\'s or NAS\'s address (`http://192.168.1.10:8080`), the app no longer shows **Offline** with nothing saved. It adds an **Unraid template**.'),
    'OpenTodo 0.6.1 makes plain-http installs work: opened by a home server\'s or NAS\'s address (`http://192.168.1.10:8080`), the app no longer shows **Offline** with nothing saved.');
  assert.equal(firstSentence('OpenTodo 0.6.0 speaks your language and looks back as well as ahead. The interface comes in **English, German**.'), 'OpenTodo 0.6.0 speaks your language and looks back as well as ahead.');
  assert.equal(firstSentence('OpenTodo 0.4.0 makes the app yours to look at and easier to move into. Tasks can have a deadline.'), 'OpenTodo 0.4.0 makes the app yours to look at and easier to move into.');
});

test('abbreviations and links do not end a sentence', () => {
  assert.equal(firstSentence('Filters, e.g. due dates, see [the guide](docs/filters.md). Next.'), 'Filters, e.g. due dates, see [the guide](docs/filters.md).');
  assert.equal(firstSentence(''), '');
  assert.equal(firstSentence('No full stop at all'), 'No full stop at all');
});

test('section counts in changelog order, upgrade notes as a mark', () => {
  const sections = [{ title: 'Upgrade notes', items: ['a'] }, { title: 'Security', items: Array(30).fill('x') }, { title: 'Fixed', items: Array(59).fill('x') }, { title: 'Breaking', items: ['x'] }, { title: 'Odd', items: ['x', 'y'] }];
  assert.deepEqual(sectionCounts(sections), ['30 security fixes', '59 fixes', '1 breaking change', '2 entries in Odd']);
  assert.equal(hasUpgradeNotes(sections), true);
  assert.equal(sectionCount('Added', 1), '1 addition');
});

test('pre-releases by suffix', () => {
  assert.equal(isPreRelease('0.3.1-rc.1'), true);
  assert.equal(isPreRelease('0.7.0'), false);
});
