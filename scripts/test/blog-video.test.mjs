// Video in a post (blog-video): every video on a blog page is a short self-hosted MP4 in a figure
// with a caption that says what happens, with a poster and controls, muted, never autoplaying and
// never loaded before it is played. Runs over dist/ after a build.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlFiles, load } from '../checks/lib.mjs';

const dist = path.resolve('dist');
const skip = !fs.existsSync(path.join(dist, 'blog/index.html')) && 'no dist/ (run npm run build first)';
const LIMIT = 3 * 1024 * 1024;
const self = (src, where) => {
  assert.ok(src?.startsWith('/media/blog/'), `${where}: under /media/blog/ (${src})`);
  const f = path.join(dist, src);
  assert.ok(fs.existsSync(f), `${where}: ${src} exists`);
  return f;
};

test('every video in a blog post is a short self-hosted MP4 in a figure with a caption', { skip }, () => {
  let seen = 0;
  for (const file of htmlFiles(path.join(dist, 'blog'))) {
    for (const v of load(file).querySelectorAll('video')) {
      const where = path.relative(dist, file);
      seen++;
      for (const a of ['controls', 'muted', 'playsinline']) assert.ok(v.hasAttribute(a), `${where}: ${a}`);
      assert.ok(!v.hasAttribute('autoplay'), `${where}: no autoplay`);
      assert.equal(v.getAttribute('preload'), 'none', `${where}: preload="none"`);
      self(v.getAttribute('poster'), `${where} poster`);
      const sources = v.querySelectorAll('source');
      assert.ok(sources.length > 0, `${where}: a <source>`);
      for (const s of sources) {
        assert.equal(s.getAttribute('type'), 'video/mp4', `${where}: MP4`);
        assert.ok(fs.statSync(self(s.getAttribute('src'), where)).size <= LIMIT, `${where}: at most 3 MB`);
      }
      const caption = v.parentNode?.tagName === 'FIGURE' ? v.parentNode.querySelector('figcaption') : null;
      assert.ok(caption && caption.text.trim().length > 40, `${where}: a figure caption that says what happens`);
    }
  }
  assert.ok(seen > 0, 'at least one post has a video');
});
