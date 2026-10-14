import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveDue, toExport, uuidv5, summarise } from '../lib/template-export.mjs';

const today = new Date('2026-10-14T09:00:00Z');
const tree = {
  labels: [{ name: 'errand' }, { name: 'call', color: '#dc2626' }],
  projects: [{
    name: 'Weekly review',
    tasks: [{ title: 'Empty the inbox', due: '+0d', time: '17:00', recurrence: 'every friday', estimate: 15, labels: ['call'],
      subtasks: [{ title: 'Paper inbox' }, { title: 'Email', subtasks: [{ title: 'Archive newsletters' }] }] }],
    sections: [{ name: 'Look ahead', tasks: [{ title: 'Check next week', due: '+1w', priority: 2, labels: ['errand'] }] }],
  }],
};

test('uuidv5 matches a reference implementation', () => {
  // Same value as Python's uuid.uuid5(uuid.NAMESPACE_URL, 'http://python.org/').
  assert.equal(uuidv5('http://python.org/'), '4c565f0d-3f5a-5890-b41b-20cf47701c5e');
});

test('ids are deterministic and unique', () => {
  const a = toExport('weekly-review', tree, { today });
  const b = toExport('weekly-review', tree, { today: new Date('2027-01-01T00:00:00Z') });
  const ids = (d) => [...d.labels, ...d.projects, ...d.sections, ...d.tasks].map((e) => e.id);
  assert.deepEqual(ids(a), ids(b));
  assert.equal(new Set(ids(a)).size, ids(a).length);
  assert.notDeepEqual(ids(a), ids(toExport('other-slug', tree, { today })));
});

test('nesting: subtasks point at their parent, sections at their project', () => {
  const d = toExport('weekly-review', tree, { today });
  const byTitle = Object.fromEntries(d.tasks.map((t) => [t.title, t]));
  assert.equal(byTitle['Paper inbox'].parent_id, byTitle['Empty the inbox'].id);
  assert.equal(byTitle['Archive newsletters'].parent_id, byTitle['Email'].id);
  assert.equal(byTitle['Email'].project_id, d.projects[0].id);
  assert.equal(byTitle['Check next week'].section_id, d.sections[0].id);
  assert.equal(d.sections[0].project_id, d.projects[0].id);
  assert.deepEqual(byTitle['Check next week'].labels, [d.labels[0].id]);
  assert.deepEqual(summarise(d), { projects: 1, sections: 1, tasks: 5, labels: 2, recurring: 1 });
});

test('recurrence, estimate and due with time are carried', () => {
  const t = toExport('weekly-review', tree, { today }).tasks[0];
  assert.equal(t.recurrence, 'every friday');
  assert.equal(t.estimate_minutes, 15);
  assert.deepEqual(t.due, { date: '2026-10-14', time: '17:00' });
});

test('relative dates', () => {
  assert.equal(resolveDue('+0d', today), '2026-10-14');
  assert.equal(resolveDue('+2d', today), '2026-10-16');
  assert.equal(resolveDue('+3w', today), '2026-11-04');
  assert.equal(resolveDue('+1m', new Date('2026-01-31T12:00:00Z')), '2026-02-28');
  assert.throws(() => resolveDue('tomorrow', today), /invalid due offset/);
});

test('the document has the own-export shape the importer detects', () => {
  const d = toExport('weekly-review', tree, { today });
  assert.equal(d.format, 'opentodo-export');
  assert.equal(d.version, 1);
  for (const key of ['labels', 'projects', 'sections', 'tasks', 'reminders', 'views']) assert.ok(Array.isArray(d[key]), key);
  for (const t of d.tasks) for (const f of ['id', 'title', 'priority', 'position', 'created_at', 'labels', 'project_id']) assert.ok(f in t, f);
});

test('undeclared labels are refused', () => {
  assert.throws(() => toExport('x', { projects: [{ name: 'P', tasks: [{ title: 'T', labels: ['nope'] }] }] }, { today }), /undeclared label "nope"/);
});
