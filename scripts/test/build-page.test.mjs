// Build your own client (build-your-client): the ways in, where to start, the clients to learn
// from and the community clients, linked from the technical pages. Runs over dist/ after a build.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from '../checks/lib.mjs';

const dist = path.resolve('dist');
const skip = !fs.existsSync(path.join(dist, 'build/index.html')) && 'no dist/ (run npm run build first)';
const text = (el) => el.text.replace(/\s+/g, ' ').trim();
const clients = JSON.parse(fs.readFileSync('src/data/community-clients.json', 'utf8'));

test('/build/ shows the ways in, where to start and the clients to learn from', { skip }, () => {
  const main = load(path.join(dist, 'build/index.html')).querySelector('main');
  assert.equal(text(main.querySelector('h1')), 'Build your own client');
  for (const href of ['/docs/api/', '/docs/sync/', '/docs/webhooks/', '/docs/mcp/']) assert.ok(main.querySelector(`#ways a[href="${href}"]`), `ways in: ${href}`);
  const start = text(main.querySelector('#start'));
  assert.match(start, /API token/);
  assert.match(start, /no sign-in flow for other apps/);
  for (const href of ['/docs/cli/', '/docs/obsidian/', '/docs/n8n/', '/docs/capture/#browser-extension', '/docs/home-assistant/']) assert.ok(main.querySelector(`#examples a[href="${href}"]`), `example: ${href}`);
  assert.equal(main.querySelectorAll('#examples li').length, main.querySelectorAll('#examples a.btn').length, 'each example links its source');
});

test('/build/ labels what is not released and links GitHub for it', { skip }, () => {
  const rows = load(path.join(dist, 'build/index.html')).querySelectorAll('#start li');
  for (const li of rows) {
    const a = li.querySelector('h3 a');
    const label = li.querySelector('.row-prop');
    if (a.getAttribute('href').startsWith('https://github.com/')) assert.equal(label && text(label), 'On GitHub, not in a release yet', text(a));
    else assert.ok(!label || !/release/.test(text(label)), `${text(a)}: released, no label`);
  }
});

test('/build/ lists the community clients, or says none yet, and how to be listed', { skip }, () => {
  const main = load(path.join(dist, 'build/index.html')).querySelector('main');
  const group = main.querySelector('#community');
  if (clients.length === 0) assert.match(text(group), /None yet/);
  else for (const li of group.querySelectorAll('li')) assert.equal(text(li.querySelector('.row-prop')), 'Not vetted by OpenTodo');
  assert.match(text(main), /opentodo-client/);
});

test('Under the hood, Ecosystem and the footer link /build/', { skip }, () => {
  assert.ok(load(path.join(dist, 'under-the-hood/index.html')).querySelector('#build a[href="/build/"]'), 'Under the hood');
  assert.ok(load(path.join(dist, 'ecosystem/index.html')).querySelector('main a[href="/build/"]'), 'Ecosystem');
  assert.ok(load(path.join(dist, 'index.html')).querySelector('footer a[href="/build/"]'), 'footer');
});
