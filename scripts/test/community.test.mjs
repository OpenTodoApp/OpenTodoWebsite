// The community link (website-discord-link D5): every built page's footer links to the
// Discord server as a plain anchor, and nothing on any page is loaded from Discord.
// Runs over dist/ after a build; skipped when there is no build.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlFiles, load } from '../checks/lib.mjs';

// The site-wide constants, read from the source so this test needs no TypeScript loader.
const siteSource = fs.readFileSync(path.resolve('src/lib/site.ts'), 'utf8');
const constant = (key) => /'([^']+)'/.exec(siteSource.split(`${key}:`)[1])[1];
const SITE = { discord: constant('discord'), appRepo: constant('appRepo') };

const dist = path.resolve('dist');
const built = fs.existsSync(path.join(dist, 'index.html'));

test('the footer of the home page and of a translated page links to Discord', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  for (const page of ['index.html', 'it/index.html']) {
    const root = load(path.join(dist, page));
    const links = root.querySelectorAll('footer a').filter((a) => a.getAttribute('href') === SITE.discord);
    assert.equal(links.length, 1, `${page}: one footer link to ${SITE.discord}`);
    assert.match(links[0].text, /Discord/);
  }
});

test('About and Help link to Discord beside the issue tracker', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const about = load(path.join(dist, 'about/index.html'));
  const item = about.querySelectorAll('#who li').find((li) => li.querySelector(`a[href="${SITE.discord}"]`));
  assert.ok(item, 'about: a "Who makes it" item links to Discord');
  assert.ok(item.querySelector(`a[href="${SITE.appRepo}/issues"]`), 'about: the same item links to the issue tracker');
  const help = load(path.join(dist, 'help/index.html'));
  const lede = help.querySelector('#fix .lede');
  const hrefs = lede.querySelectorAll('a').map((a) => a.getAttribute('href'));
  assert.deepEqual(hrefs, [SITE.discord, `${SITE.appRepo}/issues`], 'help: Discord then the issue tracker');
});

test('nothing on any page is loaded from Discord', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const offenders = [];
  for (const file of htmlFiles(dist)) {
    const root = load(file);
    for (const el of root.querySelectorAll('script[src], link[href], img[src], iframe[src], source[src]')) {
      const url = el.getAttribute('src') ?? el.getAttribute('href');
      if (/discord/i.test(url)) offenders.push(`${path.relative(dist, file)}: ${url}`);
    }
  }
  assert.deepEqual(offenders, []);
});
