// Record a blog post's pictures (blog-video): screenshots and at most one short video, from a
// real OpenTodo server of the pinned release with an example account, never from a mock-up.
//
//   OPENTODO_URL=http://127.0.0.1:8080 node scripts/record-post.mjs <slug>
//
// Start the pinned release on a fresh data folder first, for example the release binary:
//   OPENTODO_DATA_DIR=/tmp/ot PORT=8080 ./opentodo-linux-amd64
// The post's scenes are scripts/posts/<slug>.mjs: `seed(api)` creates the example data through
// the REST API and `scenes({ shot, video, page })` takes the pictures. Files are written next to
// the post: screenshots as WebP in src/content/blog/<slug>/, the video as MP4 (H.264, which every
// browser plays) with a JPEG poster in public/media/blog/<slug>/, embedded with <video> in a <figure>.
// Needs ffmpeg for the video.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const slug = process.argv[2];
if (!slug) throw new Error('usage: node scripts/record-post.mjs <slug>');
const BASE = (process.env.OPENTODO_URL ?? 'http://127.0.0.1:8080').replace(/\/$/, '');
const OUT = path.resolve('src/content/blog', slug);
// Astro processes a post's images, not its videos: those are served as they are from
// public/media/blog/<slug>/, like the posts' earlier videos.
const VIDEO_OUT = path.resolve('public/media/blog', slug);
const OWNER = { name: 'Sam', email: 'sam@example.com', password: 'a long example passphrase' };
const VIEW = { width: 1280, height: 800 };

let cookie = '';
const ORIGIN = new URL(BASE).origin;
/** One REST call as the signed-in example owner; JSON in and out. */
export async function api(method, url, body) {
  const res = await fetch(BASE + url, {
    method,
    headers: { Origin: ORIGIN, ...(cookie && { Cookie: cookie }), ...(body !== undefined && { 'Content-Type': 'application/json' }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const session = (res.headers.getSetCookie?.() ?? []).find((c) => c.startsWith('opentodo_session='));
  if (session) cookie = session.split(';')[0];
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${url} -> ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

async function signIn() {
  const status = await api('GET', '/api/v1/auth/status');
  if (status.setupRequired) await api('POST', '/api/v1/auth/register', OWNER);
  else await api('POST', '/api/v1/auth/login', { email: OWNER.email, password: OWNER.password });
  return status.version;
}

const { seed, scenes } = await import(path.resolve('scripts/posts', `${slug}.mjs`));
const version = await signIn();
console.log(`recording ${slug} against OpenTodo ${version}`);
await seed(api);

const { chromium } = await import('@playwright/test');
const sharp = (await import('sharp')).default;
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const [name, value] = cookie.split('=');
const context = async (opts = {}) => {
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 2, colorScheme: 'light', timezoneId: 'Europe/London', locale: 'en-GB', ...opts });
  await ctx.addCookies([{ name, value, domain: new URL(BASE).hostname, path: '/' }]);
  return ctx;
};
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(VIDEO_OUT, { recursive: true });
try {
  const ctx = await context();
  const page = await ctx.newPage();
  /** A screenshot of the page as it is now, saved as <file>.webp next to the post. */
  const shot = async (file, opts = {}) => {
    const png = await page.screenshot(opts);
    await sharp(png).webp({ quality: 82 }).toFile(path.join(OUT, `${file}.webp`));
    console.log(`  ${file}.webp`);
  };
  /** Records `run(page)` in a fresh page of its own and saves it as <file>.mp4 (at most 30 s) with a
   *  poster, <file>-poster.jpg. Needs ffmpeg. */
  const video = async (file, run, opts = {}) => {
    const dir = fs.mkdtempSync(path.join(OUT, '.video-'));
    const vctx = await context({ deviceScaleFactor: 1, recordVideo: { dir, size: VIEW } });
    const vpage = await vctx.newPage();
    const started = Date.now();
    await run(vpage, BASE);
    await vctx.close();
    if (Date.now() - started > 30000) throw new Error(`${file}: the video is longer than 30 s`);
    const [webm] = fs.readdirSync(dir);
    // Playwright records from the moment the page opens, so the first frames are an empty page
    // while the app loads: `trim` seconds are cut from the start with ffmpeg (H.264, no sound).
    const trim = String(opts.trim ?? 0);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', trim, '-i', path.join(dir, webm), '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(VIDEO_OUT, `${file}.mp4`)]);
    // The poster is the last frame: what the video ends on, shown before it plays.
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-sseof', '-0.5', '-i', path.join(VIDEO_OUT, `${file}.mp4`), '-frames:v', '1', path.join(dir, 'poster.png')]);
    await sharp(path.join(dir, 'poster.png')).jpeg({ quality: 82 }).toFile(path.join(VIDEO_OUT, `${file}-poster.jpg`));
    fs.rmSync(dir, { recursive: true });
    console.log(`  ${file}.mp4 (${Math.round(fs.statSync(path.join(VIDEO_OUT, `${file}.mp4`)).size / 1024)} KB)`);
  };
  await scenes({ page, shot, video, base: BASE, api });
  await ctx.close();
} finally {
  await browser.close();
}
