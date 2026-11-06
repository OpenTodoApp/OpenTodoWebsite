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
const SITE = { discord: constant('discord'), appRepo: constant('appRepo'), x: constant('x') };

const dist = path.resolve('dist');
const built = fs.existsSync(path.join(dist, 'index.html'));

// The footer's Community row (website-restyle-chrome D4): text links with an icon, no brand buttons.
test('the footer of the home page and of a translated page links to Discord as text', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  for (const page of ['index.html', 'it/index.html', 'about/index.html']) {
    const root = load(path.join(dist, page));
    const links = root.querySelectorAll('footer nav[aria-label="Community"] a').filter((a) => a.getAttribute('href') === SITE.discord);
    assert.equal(links.length, 1, `${page}: one Discord link in the Community row`);
    assert.match(links[0].text, /Discord/);
    assert.equal(root.querySelectorAll('footer a.btn').length, 0, `${page}: no buttons in the footer`);
  }
});

test('the footer offers every way to support the project', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const sponsor = /'([^']+)'/.exec(siteSource.split('sponsor:')[1])[1];
  const coffee = /'([^']+)'/.exec(siteSource.split('coffee:')[1])[1];
  const root = load(path.join(dist, 'index.html'));
  const hrefs = root.querySelectorAll('footer nav[aria-label="Community"] a').map((a) => a.getAttribute('href'));
  for (const h of [SITE.appRepo, sponsor, coffee, SITE.discord]) assert.ok(hrefs.includes(h), `footer links ${h}`);
});

// The Discord button (website-discord-invite): blurple, the logo hidden from assistive
// technology, a label that names Discord, on the home pages, at the end of content
// pages, on About and Learn (which took over Help, website-learn).
test('the Discord button invites people on the home pages, on Support and Learn', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const home = load(path.join(dist, 'index.html'));
  const section = home.querySelector('#community');
  assert.ok(section, 'home: a community section');
  assert.match(section.querySelector('h2').text, /say hello/);
  assert.ok(section.querySelector(`a.btn-discord[href="${SITE.discord}"]`), 'home: the button in the community section');
  const de = load(path.join(dist, 'de/index.html')).querySelector('#community a.btn-discord');
  assert.ok(de && /Discord/.test(de.text) && !/Join us/.test(de.text), 'German home: a German button label');
  for (const page of ['support/index.html', 'learn/index.html']) {
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

// The support page (website-support-page): the approved text, the buttons from the
// site-wide constants, and the ways to it from every page.
const SUPPORT = { sponsor: constant('sponsor'), coffee: constant('coffee') };

test('the support page shows the promises, the costs and the buttons', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const root = load(path.join(dist, 'support/index.html'));
  const main = root.querySelector('main') ?? root;
  assert.equal(main.querySelector('h1').text.trim(), 'Support OpenTodo');
  assert.equal(main.querySelectorAll('#promise ol > li').length, 5, 'five promises');
  assert.equal(main.querySelectorAll('#costs tbody tr').length, 5, 'five costs');
  assert.match(main.querySelector('#costs table').text, /about €200 a month/);
  assert.equal(main.querySelectorAll(`a.btn-sponsor[href="${SUPPORT.sponsor}"]`).length, 2, 'two sponsor buttons');
  assert.equal(main.querySelectorAll(`a.btn-coffee[href="${SUPPORT.coffee}"]`).length, 2, 'two coffee buttons');
  assert.ok(main.querySelector(`#help a.btn-discord[href="${SITE.discord}"]`), 'the Discord button');
  for (const a of main.querySelectorAll('a.btn-sponsor')) assert.equal(a.querySelector('svg').getAttribute('aria-hidden'), 'true');
});

test('every way in leads to the support page', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  for (const page of ['index.html', 'it/index.html', 'about/index.html']) {
    const root = load(path.join(dist, page));
    // The header stays to four destinations and the demo (website-restyle-chrome D1); Support is in the footer's Project group.
    assert.ok(root.querySelectorAll('footer nav[aria-label="Project"] a[href="/support/"]').length >= 1, `${page}: the footer links to it`);
  }
  // One action per page end (website-restyle-cta D1): a guide ends with the demo, a post with the support line.
  const guide = fs.readdirSync(path.join(dist, 'guides')).find((d) => fs.existsSync(path.join(dist, 'guides', d, 'index.html')) && d !== 'quiz');
  const end = load(path.join(dist, 'guides', guide, 'index.html')).querySelector('.end-cta');
  assert.equal(end.querySelectorAll('a').length, 1, 'end of a guide: one action');
  const post = fs.readdirSync(path.join(dist, 'blog')).find((d) => fs.existsSync(path.join(dist, 'blog', d, 'index.html')) && !['page', 'category'].includes(d));
  assert.ok(load(path.join(dist, 'blog', post, 'index.html')).querySelector('.end-cta a[href="/support/"]'), 'end of a post');
  assert.ok(load(path.join(dist, 'about/index.html')).querySelector('#licence a[href="/support/"]'), 'About, licence section');
});

// The X account (website-x-link): a text item after Discord in every footer, and a link on About; no request to X.
test('the footer links to the X account after Discord, and About names it', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  for (const page of ['index.html', 'it/index.html']) {
    const root = load(path.join(dist, page));
    const items = root.querySelectorAll('footer nav[aria-label="Community"] li a').map((a) => a.getAttribute('href'));
    assert.ok(items.includes(SITE.x), `${page}: footer links to X`);
    assert.equal(items.indexOf(SITE.x), items.indexOf(SITE.discord) + 1, `${page}: X follows Discord`);
    const loaded = root.querySelectorAll('script[src], img[src], iframe[src], link[href]').map((e) => e.getAttribute('src') ?? e.getAttribute('href') ?? '');
    assert.ok(!loaded.some((u) => /x\.com|twitter\.com/.test(u)), `${page}: nothing loaded from X`);
  }
  const about = load(path.join(dist, 'about/index.html'));
  assert.ok(about.querySelector(`#who a[href="${SITE.x}"]`), 'about: "Who makes it" links to X');
});
