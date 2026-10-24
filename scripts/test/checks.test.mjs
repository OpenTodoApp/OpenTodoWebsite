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

test('redirects: a target that is not built, a hidden page and a bad sample are named', async () => {
  const { checkRedirects } = await import('../checks/redirects.mjs');
  const dir = site({ 'learn/index.html': page('<h2 id="faq">F</h2>'), 'old/index.html': page('x') });
  const conf = [
    '    location = /help/ { return 301 /learn/; }',
    '    location = /cost/ { return 301 /learn/#faq; }',
    '    location = /gone/ { return 301 /missing/; }',
    '    location = /old/ { return 301 /learn/; }',
    '    location ~ ^/topics/([a-z-]+)/?$ { return 301 /learn/topic/$1/; } # e.g. /topics/x/ /nope',
  ].join('\n');
  const { problems } = checkRedirects(dir, conf);
  assert.ok(problems.some((p) => p.includes('/gone/ redirects to /missing/')));
  assert.ok(problems.some((p) => p.includes('/old/ is still built')));
  assert.ok(problems.some((p) => p.includes('/topics/x/ redirects to /learn/topic/x/')));
  assert.ok(problems.some((p) => p.includes('sample /nope does not match')));
  assert.ok(!problems.some((p) => p.includes('/help/') || p.includes('/cost/')));
});
