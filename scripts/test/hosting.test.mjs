// How do you want to run it? (hosting-choice): /start/ and /install/ offer your own hardware and
// managed hosting side by side, own hardware first; PikaPods always comes with the disclosure and
// is never called recommended or the easiest way. Runs over dist/ after a build.
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

test('no page calls PikaPods recommended or the easiest way', { skip }, () => {
  for (const file of htmlFiles(dist)) {
    const body = load(file).querySelector('main');
    if (!body || !text(body).includes('PikaPods')) continue;
    assert.doesNotMatch(text(body), /recommended|easiest way/i, path.relative(dist, file));
  }
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
