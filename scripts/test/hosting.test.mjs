// How do you want to run it? (hosting-choice): /start/ and /install/ offer your own hardware and
// managed hosting side by side, own hardware first; PikaPods always comes with the disclosure and
// is never called recommended or the easiest. Runs over dist/ after a build.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlFiles, load } from '../checks/lib.mjs';

const dist = path.resolve('dist');
const built = fs.existsSync(path.join(dist, 'index.html'));
const skip = !built && 'no dist/ (run npm run build first)';
const PIKAPODS = 'https://www.pikapods.com/apps/opentodo';
const NOTE = 'PikaPods shares part of its revenue with the OpenTodo project. You get the same open-source OpenTodo, and you can export your data and move to your own server at any time.';
const text = (el) => el.text.replace(/\s+/g, ' ').trim();

test('/start/ and /install/ offer own hardware first, then PikaPods with the disclosure', { skip }, () => {
  for (const page of ['start/index.html', 'install/index.html']) {
    const choice = load(path.join(dist, page)).querySelector('#run');
    assert.ok(choice, `${page}: a #run section`);
    assert.equal(text(choice.querySelector('h2')), 'How do you want to run it?');
    const items = choice.querySelectorAll('li');
    assert.deepEqual(items.map((li) => text(li.querySelector('h3'))), ['On your own hardware', 'Managed hosting'], page);
    assert.match(text(items[0]), /Free/);
    for (const name of ['Docker', 'the binary', 'Raspberry Pi', 'NAS', 'server app stores']) {
      assert.ok(items[0].querySelectorAll('a').some((a) => text(a) === name), `${page}: links ${name}`);
    }
    assert.ok(text(items[1]).includes(NOTE), `${page}: the disclosure`);
    assert.ok(items[1].querySelector(`a[href="${PIKAPODS}"]`), `${page}: links PikaPods`);
    assert.equal(items[0].querySelector('a.btn').getAttribute('class'), items[1].querySelector('a.btn').getAttribute('class'), `${page}: equal weight`);
  }
});

test('Support names hosting on PikaPods as a way to help', { skip }, () => {
  const help = load(path.join(dist, 'support/index.html')).querySelector('#help');
  const line = help.querySelectorAll('p').find((p) => text(p) === 'Host on PikaPods: part of what you pay goes to the project.');
  assert.ok(line && line.querySelector(`a[href="${PIKAPODS}"]`));
});

test('no page calls PikaPods recommended or the easiest', { skip }, () => {
  const checked = [];
  for (const file of htmlFiles(dist)) {
    const body = load(file).querySelector('main');
    if (!body || !text(body).includes('PikaPods')) continue;
    assert.doesNotMatch(text(body), /recommended|easiest/i, path.relative(dist, file));
    checked.push(path.relative(dist, file));
  }
  for (const page of ['hosting/index.html', 'start/index.html', 'install/index.html', 'index.html']) assert.ok(checked.includes(page), `${page} is checked`);
});

// The hosting page (hosting-page): headline, what you get, the steps, the disclosure, your own
// server instead, and one primary action, to PikaPods.
test('/hosting/ says what you get, how to set it up and the arrangement, with one primary action', { skip }, () => {
  const root = load(path.join(dist, 'hosting/index.html'));
  const main = root.querySelector('main');
  assert.match(text(root.querySelector('head title')), /PikaPods/);
  assert.ok(root.querySelector('meta[name="description"]').getAttribute('content').includes('PikaPods'));
  assert.equal(text(main.querySelector('h1')), 'Don’t want to run a server? Let PikaPods run it.');
  const points = main.querySelectorAll('#get li');
  assert.ok(points.length >= 3 && points.length <= 4, 'three or four points');
  for (const fact of [/\$2/, /HTTPS/, /backups/, /\$5/]) assert.ok(points.some((li) => fact.test(text(li))), `a point matching ${fact}`);
  const steps = main.querySelectorAll('#setup ol > li');
  assert.ok(steps.length >= 3 && steps.length <= 4, 'three or four steps');
  assert.ok(text(main).includes(NOTE), 'the disclosure');
  const own = main.querySelector('#own');
  assert.equal(text(own.querySelector('h2')), 'Prefer your own server?');
  for (const href of ['/self-host/', '/install/']) assert.ok(own.querySelector(`a[href="${href}"]`), `links ${href}`);
  const primary = main.querySelectorAll('a.btn-primary');
  assert.equal(primary.length, 1, 'one primary button');
  assert.equal(primary[0].getAttribute('href'), PIKAPODS);
  assert.equal(text(primary[0]), 'Run it on PikaPods');
});

test('the header lists Features, Learn, Docs, Blog, Hosting, with Hosting current only on /hosting/', { skip }, () => {
  for (const page of ['index.html', 'de/index.html', 'blog/index.html', 'start/index.html', 'hosting/index.html']) {
    const header = load(path.join(dist, page)).querySelector('header.site-header');
    for (const nav of [header.querySelector('.nav-desktop'), header.querySelector('.nav-menu nav')]) {
      const links = nav.querySelectorAll('a.nav-link').map((a) => text(a));
      assert.deepEqual(links.slice(0, 5), ['Features', 'Learn', 'Docs', 'Blog', 'Hosting'], page);
      const hosting = nav.querySelectorAll('a.nav-link')[4];
      assert.equal(hosting.getAttribute('href'), '/hosting/');
      assert.equal(hosting.getAttribute('aria-current'), page === 'hosting/index.html' ? 'page' : undefined, `${page}: Hosting current`);
    }
    assert.equal(header.querySelectorAll('a[href*="pikapods"]').length, 0, `${page}: the header never links PikaPods`);
  }
});

test('the search index and the sitemap list /hosting/', { skip }, () => {
  const index = JSON.parse(fs.readFileSync(path.join(dist, 'search.json'), 'utf8'));
  assert.ok(index.some((e) => e.u === '/hosting/'), 'search.json');
  const maps = fs.readdirSync(dist).filter((n) => /^sitemap-\d+\.xml$/.test(n)).map((n) => fs.readFileSync(path.join(dist, n), 'utf8')).join('');
  assert.ok(maps.includes('<loc>https://open-todo.app/hosting/</loc>'), 'sitemap');
});

// The home page's ways in (landing-hosted-card): four equal cards in every language, the hosted
// one second, and no PikaPods link in the header or navigation.
test('every home page shows four ways in, hosted for you second', { skip }, () => {
  for (const page of ['index.html', ...['de', 'fr', 'it', 'es', 'pt', 'zh'].map((l) => `${l}/index.html`)]) {
    const root = load(path.join(dist, page));
    const cards = root.querySelectorAll('#get-it .lp-ways > li');
    assert.equal(cards.length, 4, `${page}: four cards`);
    assert.ok(cards[1].querySelector(`a.btn[href="${PIKAPODS}"]`), `${page}: the second card links PikaPods`);
    const classes = cards.map((li) => li.querySelector('a.btn').getAttribute('class'));
    assert.deepEqual(classes.slice(1), [classes[1], classes[1], classes[1]], `${page}: the hosted card weighs the same as join and run your own`);
    assert.equal(root.querySelectorAll(`header a[href*="pikapods"], nav a[href*="pikapods"]`).length, 0, `${page}: no PikaPods link in the header or navigation`);
  }
});
