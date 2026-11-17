// The API reference (api-reference): built from the pinned bundle's OpenAPI description when it
// has one; absent, and unlinked, when it does not. Runs over dist/ after a build.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from '../checks/lib.mjs';

const dist = path.resolve('dist');
const built = fs.existsSync(path.join(dist, 'index.html'));
const ref = path.join(dist, 'api-reference/index.html');

test('the API reference is built and linked exactly when the release has a description', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const hood = load(path.join(dist, 'under-the-hood/index.html'));
  const linked = hood.querySelectorAll('a[href="/api-reference/"]').length > 0;
  if (!fs.existsSync(ref)) {
    assert.equal(linked, false, 'no link to a reference that is not built');
    return;
  }
  assert.ok(linked, 'Under the hood links the reference');
  const index = load(ref).querySelector('main');
  const groups = index.querySelectorAll('.api-groups a');
  assert.ok(groups.length > 5, 'the index lists the groups');
  assert.ok(index.querySelector('a[href="/api-reference/schemas/"]'), 'the index links the schemas');
  // The task routes: method, path, auth and a table of request fields.
  const page = groups.map((a) => a.getAttribute('href')).find((h) => {
    const f = path.join(dist, h, 'index.html');
    return fs.existsSync(f) && fs.readFileSync(f, 'utf8').includes('id="post-api-v1-tasks"');
  });
  assert.ok(page, 'a group page holds POST /api/v1/tasks');
  const op = load(path.join(dist, page, 'index.html')).querySelector('#post-api-v1-tasks');
  assert.match(op.querySelector('h2').text, /POST\s+\/api\/v1\/tasks/);
  assert.match(op.text, /Token or session/);
  assert.ok(op.querySelectorAll('.api-table tbody tr').length > 3, 'request fields as a table');
  const foreign = load(path.join(dist, page, 'index.html')).querySelectorAll('script[src^="http"]').filter((s) => !s.getAttribute('src').startsWith('https://analytics.pixari.dev/'));
  assert.equal(foreign.length, 0, 'no third-party script besides the site analytics');
});
