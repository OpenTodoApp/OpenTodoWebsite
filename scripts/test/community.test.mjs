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

test('the footer of the home page and of a translated page links to Discord, as text and as the button', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  for (const page of ['index.html', 'it/index.html']) {
    const root = load(path.join(dist, page));
    const links = root.querySelectorAll('footer a').filter((a) => a.getAttribute('href') === SITE.discord);
    // The link columns exist twice (wide columns and the phone disclosures, one hidden by CSS).
    assert.ok(links.some((a) => !a.classList.contains('btn-discord') && /Discord/.test(a.text)), `${page}: footer text link`);
    assert.equal(links.filter((a) => a.classList.contains('btn-discord')).length, 1, `${page}: one footer button`);
  }
});

// The Discord button (website-discord-invite): blurple, the logo hidden from assistive
// technology, a label that names Discord, on the home pages, at the end of content
// pages, on About and Learn (which took over Help, website-learn).
test('the Discord button invites people on the home pages, at the end of a guide, on About and Learn', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const home = load(path.join(dist, 'index.html'));
  const section = home.querySelector('#community');
  assert.ok(section, 'home: a community section');
  assert.match(section.querySelector('h2').text, /say hello/);
  assert.ok(section.querySelector(`a.btn-discord[href="${SITE.discord}"]`), 'home: the button in the community section');
  const de = load(path.join(dist, 'de/index.html')).querySelector('#community a.btn-discord');
  assert.ok(de && /Discord/.test(de.text) && !/Join us/.test(de.text), 'German home: a German button label');
  const guide = fs.readdirSync(path.join(dist, 'guides')).find((d) => fs.existsSync(path.join(dist, 'guides', d, 'index.html')) && d !== 'quiz');
  for (const page of [`guides/${guide}/index.html`, 'about/index.html', 'learn/index.html']) {
    const root = load(path.join(dist, page));
    const inMain = root.querySelectorAll('a.btn-discord').filter((a) => !a.closest('footer'));
    assert.ok(inMain.length >= 1, `${page}: a Discord button outside the footer`);
    for (const a of inMain) {
      assert.equal(a.getAttribute('href'), SITE.discord);
      assert.equal(a.querySelector('svg').getAttribute('aria-hidden'), 'true');
      assert.match(a.text, /Discord/);
    }
  }
});

test('About and Learn link to Discord beside the issue tracker', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const about = load(path.join(dist, 'about/index.html'));
  const item = about.querySelectorAll('#who li').find((li) => li.querySelector(`a[href="${SITE.discord}"]`));
  assert.ok(item, 'about: a "Who makes it" item links to Discord');
  assert.ok(item.querySelector(`a[href="${SITE.appRepo}/issues"]`), 'about: the same item links to the issue tracker');
  const help = load(path.join(dist, 'learn/index.html'));
  const lede = help.querySelector('#fix .lede');
  const hrefs = lede.querySelectorAll('a').map((a) => a.getAttribute('href'));
  assert.deepEqual(hrefs, [SITE.discord, `${SITE.appRepo}/issues`], 'learn: Discord then the issue tracker');
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
