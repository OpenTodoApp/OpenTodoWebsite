// How do you want to run it? (hosting-choice): /start/ and /install/ offer your own hardware and
// managed hosting side by side, own hardware first; PikaPods always comes with the disclosure and
// is never called recommended or the easiest. Runs over dist/ after a build.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlFiles, load } from '../checks/lib.mjs';
import { PATH } from '../../src/i18n/path/index.mjs';

const deChrome = PATH.de.chrome;

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

// The hosting page (hosting-choice-page): where to run OpenTodo. Every listed host and your own
// server, in one stated order, each with the same facts in the same order, one button of the same
// weight and its steps; the hosts' facts dated; the disclosure exactly once.
const FACTS = ['Cost', 'Setup', 'Updates', 'Backups', 'HTTPS and domain', 'Leaving'];
const DISCLOSURE = 'These links support the project, which receives a share when they’re used.';

test('/hosting/ helps a person choose: the options side by side with the same facts', { skip }, () => {
  const root = load(path.join(dist, 'hosting/index.html'));
  const main = root.querySelector('main');
  assert.match(text(root.querySelector('head title')), /^Where to run OpenTodo/);
  assert.equal(text(main.querySelector('h1')), 'Where to run OpenTodo');
  const which = main.querySelectorAll('.hosting-which li');
  assert.deepEqual(which.map((li) => li.querySelector('a').getAttribute('href')), ['#pikapods', '#railway', '#own'], 'which one is for me, linking each option');
  assert.match(text(main.querySelector('.hosting-order')), /least first/);
  const options = main.querySelectorAll('.hosting-option');
  assert.deepEqual(options.map((o) => text(o.querySelector('h2'))), ['PikaPods', 'Railway', 'Your own server'], 'the order');
  const buttons = options.map((o) => o.querySelectorAll('a.btn'));
  for (const [i, o] of options.entries()) {
    assert.deepEqual(o.querySelectorAll('dt').map(text), FACTS, `${text(o.querySelector('h2'))}: the same facts in the same order`);
    assert.equal(buttons[i].length, 1, 'one button each');
    assert.ok(o.querySelectorAll('ol.steps > li').length >= 3, 'its setup steps');
  }
  assert.equal(new Set(buttons.map((b) => b[0].getAttribute('class'))).size, 1, 'buttons of the same weight');
  assert.deepEqual(buttons.map((b) => b[0].getAttribute('href')), [PIKAPODS, 'https://railway.com/deploy/opentodo?referralCode=nbgVDr', '/self-host/']);
  for (const o of options.slice(0, 2)) assert.ok(o.querySelector('.hosting-meta time[datetime]'), 'a host’s facts carry the day they were checked');
  for (const href of ['/self-host/', '/install/']) assert.ok(main.querySelector(`#own a[href="${href}"]`), `own server links ${href}`);
  assert.ok(text(main.querySelector('#railway')).includes('Generate Domain with port 8080'), 'Railway’s public domain step');
});

test('/hosting/ states the arrangement exactly once, and no logo', { skip }, () => {
  const main = load(path.join(dist, 'hosting/index.html')).querySelector('main');
  assert.equal(text(main).split(DISCLOSURE).length - 1, 1, 'the disclosure once');
  assert.ok(!text(main).includes(NOTE), 'no second disclosure');
  assert.equal(main.querySelectorAll('img').length, 0, 'no logos');
  assert.doesNotMatch(text(main), /\bbest\b|cheapest|recommended|easiest/i);
});

test('the header lists Features, Learn, Docs, Blog, Hosting, Ecosystem, with Hosting current only on /hosting/', { skip }, () => {
  for (const page of ['index.html', 'de/index.html', 'blog/index.html', 'start/index.html', 'hosting/index.html']) {
    const header = load(path.join(dist, page)).querySelector('header.site-header');
    for (const nav of [header.querySelector('.nav-desktop'), header.querySelector('.nav-menu nav')]) {
      const links = nav.querySelectorAll('a.nav-link').map((a) => text(a));
      // German pages have a German header (german-pages D7).
      const names = ['Features', 'Learn', 'Docs', 'Blog', 'Hosting', 'Ecosystem'];
      assert.deepEqual(links.slice(0, 6), page.startsWith('de/') ? names.map((n) => deChrome[n]) : names, page);
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
  for (const page of ['index.html', ...['de', 'fr', 'it', 'es', 'pt', 'zh', 'nl'].map((l) => `${l}/index.html`)]) {
    const root = load(path.join(dist, page));
    const cards = root.querySelectorAll('#get-it .lp-ways > li');
    assert.equal(cards.length, 4, `${page}: four cards`);
    assert.ok(cards[1].querySelector(`a.btn[href="${PIKAPODS}"]`), `${page}: the second card links PikaPods`);
    const classes = cards.map((li) => li.querySelector('a.btn').getAttribute('class'));
    assert.deepEqual(classes.slice(1), [classes[1], classes[1], classes[1]], `${page}: the hosted card weighs the same as join and run your own`);
    assert.equal(root.querySelectorAll(`header a[href*="pikapods"], nav a[href*="pikapods"]`).length, 0, `${page}: no PikaPods link in the header or navigation`);
  }
});
