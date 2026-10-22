// Each website check fails on a deliberately broken sample (website-platform task 4.1).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkLinks } from '../checks/links.mjs';
import { checkEmoji } from '../checks/emoji.mjs';
import { checkScripts } from '../checks/scripts.mjs';

function site(pages) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'site-'));
  for (const [p, html] of Object.entries(pages)) {
    const file = path.join(dir, p);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
  }
  return dir;
}
const page = (body) => `<!doctype html><html><head><title>t</title></head><body>${body}</body></html>`;

test('links: a clean sample passes', () => {
  const dir = site({ 'index.html': page('<a href="/a/">a</a> <a href="/a/#x">x</a>'), 'a/index.html': page('<h2 id="x">X</h2>') });
  assert.deepEqual(checkLinks(dir).problems, []);
});

test('links: names the page and the broken link or fragment', () => {
  const dir = site({ 'index.html': page('<a href="/missing/">m</a> <a href="/docs/a/#nope">n</a> <img src="/x.webp" alt="">'), 'docs/a/index.html': page('<p id="yes">y</p>') });
  const { problems } = checkLinks(dir);
  assert.ok(problems.includes('/: broken link /missing/'));
  assert.ok(problems.includes('/: broken link /x.webp'));
  assert.ok(problems.some((p) => p.includes('#nope')));
});

test('emoji: icon-like symbols in navigation, buttons and list markers fail', () => {
  const dir = site({ 'index.html': page('<nav><a href="/">📥 Inbox</a></nav><button>▶ Play</button><ul><li>✅ Done</li></ul><p>Plain text with Settings → Data is fine.</p><code>✓</code>') });
  const { problems } = checkEmoji(dir);
  assert.equal(problems.filter((p) => p.includes('📥')).length >= 1, true);
  assert.ok(problems.some((p) => p.includes('▶')));
  assert.ok(problems.some((p) => p.includes('✅')));
  assert.ok(!problems.some((p) => p.includes('→')));
});

test('emoji: the docs are skipped and clean pages pass', () => {
  const dir = site({ 'index.html': page('<nav><a href="/">Inbox</a></nav>'), 'docs/index.html': page('<nav>📥</nav>') });
  assert.deepEqual(checkEmoji(dir).problems, []);
});

test('scripts: names the page and the third-party script', () => {
  const dir = site({
    'index.html': page('<script src="/_astro/a.js"></script><script src="https://analytics.pixari.dev/script.js"></script>'),
    'vs/index.html': page('<script src="https://cdn.example.com/x.js"></script>'),
  });
  assert.deepEqual(checkScripts(dir).problems, ['/vs/: third-party script https://cdn.example.com/x.js']);
});

// OpenSpec website-accessibility "Location, link purpose and headings", "Abbreviations and reading level" (website-accessibility-aaa 4.3, 5.1).
import { checkProse, prosePage } from '../checks/prose.mjs';
import { parse as parseHtml } from 'node-html-parser';

test('prose: a bare link text, a skipped heading and an unexplained abbreviation are named with the page', () => {
  const root = parseHtml(page('<main><h1>T</h1><h3>Skip</h3><p>Our <a href="/x/">Learn more</a> and <a href="/y/">here</a>. Sync over CalDAV works.</p></main>'));
  const { problems } = prosePage(root, '/p/', { CalDAV: 'the calendar sync standard' });
  assert.ok(problems.includes('/p/: the link "Learn more" (/x/) does not say where it goes'));
  assert.ok(problems.includes('/p/: the link "here" (/y/) does not say where it goes'));
  assert.ok(problems.includes('/p/: a heading skips from h1 to h3'));
  assert.ok(problems.some((p) => p.startsWith('/p/: "CalDAV" is used without its expansion')));
});

test('prose: an expansion in parentheses, an abbr element or the full phrase satisfies the first use; long sentences are reported, not failed', () => {
  const ok = parseHtml(page('<main><h1>T</h1><p>Sync over CalDAV (the calendar sync standard) and <abbr title="Model Context Protocol">MCP</abbr>. Single sign-on, SSO, too.</p><p>This sentence has far more words than anyone would ever want to read in one single go before it finally comes around to its end today, really and truly.</p></main>'));
  const { problems, report } = prosePage(ok, '/p/', { CalDAV: 'the calendar sync standard', MCP: 'Model Context Protocol', SSO: 'single sign-on' });
  assert.deepEqual(problems, []);
  assert.equal(report.length, 1);
  assert.match(report[0], /a sentence of 2\d words/);
});

test('prose: the docs tree is skipped and a clean sample passes', () => {
  const dir = site({ 'index.html': page('<main><h1>Home</h1><p>Read the <a href="/guides/">guides</a>.</p></main>'), 'docs/x/index.html': page('<a href="/">here</a>') });
  assert.deepEqual(checkProse(dir, {}).problems, []);
});

// OpenSpec website-accessibility "Abbreviations and reading level" (website-accessibility-aaa 5.1): the build explains first uses.
import { explainAbbreviations } from '../lib/abbr.mjs';

test('the first prose use of a listed abbreviation gets its expansion; links, code, headings and explained terms are left alone', () => {
  const html = page('<main><h1>The API</h1><p>Call the <a href="/x/">API</a> or <code>API</code> first. The API is open. Use the API twice. CSV (comma-separated values) imports work; CSV again.</p></main>');
  const out = explainAbbreviations(html, { API: 'application programming interface', CSV: 'comma-separated values', MCP: 'Model Context Protocol' });
  assert.match(out, /The <abbr title="application programming interface">API<\/abbr><span class="visually-hidden"> \(application programming interface\)<\/span> is open\. Use the API twice\./);
  assert.match(out, /<h1>The API<\/h1>/);
  assert.match(out, /<a href="\/x\/">API<\/a>/);
  assert.ok(!/<abbr[^>]*>CSV/.test(out), 'CSV is already explained in parentheses');
  assert.equal(explainAbbreviations(page('<main><p>No terms.</p></main>'), { API: 'x' }), page('<main><p>No terms.</p></main>'));
  // The prose check accepts the result.
  const { problems } = prosePage(parseHtml(out), '/p/', { API: 'application programming interface', CSV: 'comma-separated values' });
  assert.deepEqual(problems, []);
});
