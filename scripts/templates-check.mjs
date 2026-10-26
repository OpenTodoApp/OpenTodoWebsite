#!/usr/bin/env node
// Imports every template into a fresh OpenTodo server of the pinned release and,
// with --shots, captures each imported project in light and dark
// (website-content-hub design D2). Fails, naming the template and the rows,
// when a template does not import cleanly.
//
//   OPENTODO_URL=http://127.0.0.1:8080 node scripts/templates-check.mjs [--shots] [slug ...]
//
// The server must be empty (the script creates the owner account) or already
// have the owner below. CI starts the pinned release image (ghcr.io/opentodoapp/opentodo, or ghcr.io/pixari/opentodo up to 0.14.2).
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { ROOT } from './lib/bundle.mjs';
import { toExport } from './lib/template-export.mjs';

const BASE = (process.env.OPENTODO_URL ?? 'http://127.0.0.1:8080').replace(/\/$/, '');
const DIR = process.env.TEMPLATES_DIR ?? path.join(ROOT, 'src/content/templates');
const SHOTS_DIR = path.join(ROOT, 'src/assets/template-shots');
const OWNER = { name: 'Alex Rivera', email: 'alex@example.com', password: 'correct horse battery staple' };
const args = process.argv.slice(2);
const wantShots = args.includes('--shots');
const only = new Set(args.filter((a) => !a.startsWith('--')));

/** Reads a template's front matter (the same data the site builds the download from). */
export function readTemplate(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!m) throw new Error(`${file}: no front matter`);
  return parseYaml(m[1]);
}

let cookie = '';
async function api(method, url, body, headers = {}) {
  const res = await fetch(BASE + url, { method, headers: { ...(cookie && { Cookie: cookie }), ...headers }, body });
  const set = res.headers.getSetCookie?.() ?? [];
  const session = set.find((c) => c.startsWith('opentodo_session='));
  if (session) cookie = session.split(';')[0];
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* not JSON */ }
  if (!res.ok) throw new Error(`${method} ${url} -> ${res.status} ${text.slice(0, 300)}`);
  return json;
}
const jsonBody = (o) => [JSON.stringify(o), { 'Content-Type': 'application/json' }];

async function signIn() {
  const status = await api('GET', '/api/v1/auth/status');
  if (status.setupRequired) await api('POST', '/api/v1/auth/register', ...jsonBody(OWNER));
  else await api('POST', '/api/v1/auth/login', ...jsonBody({ email: OWNER.email, password: OWNER.password }));
  return status.version;
}

const form = (slug, doc) => {
  const f = new FormData();
  f.append('file', new Blob([JSON.stringify(doc)], { type: 'application/json' }), `${slug}.json`);
  f.append('timeZone', 'UTC');
  return f;
};

async function importTemplate(slug, doc) {
  const preview = await api('POST', '/api/v1/import/preview', form(slug, doc));
  const problems = [];
  if (preview.format !== 'opentodo') problems.push(`detected format "${preview.format}", expected "opentodo"`);
  for (const r of preview.rows ?? []) {
    const where = `row ${r.row} (${r.kind} "${r.title}")`;
    if (r.outcome === 'error') problems.push(`${where}: ${r.reason}`);
    for (const w of r.warnings ?? []) problems.push(`${where}: warning: ${typeof w === 'string' ? w : JSON.stringify(w)}`);
  }
  if ((preview.totals?.error ?? 0) > 0 && !problems.length) problems.push(`${preview.totals.error} error rows`);
  if ((preview.totals?.warnings ?? 0) > 0 && !problems.some((p) => p.includes('warning'))) problems.push(`${preview.totals.warnings} warnings`);
  if (problems.length) return { ok: false, problems };
  const { job } = await api('POST', '/api/v1/import', form(slug, doc));
  for (let i = 0; i < 120; i++) {
    const { job: j } = await api('GET', `/api/v1/import/jobs/${job.id}`);
    if (j.status === 'done') return { ok: true, job: j.id };
    if (j.status === 'failed') return { ok: false, problems: [`import job failed: ${JSON.stringify(j.errors ?? j.error ?? j)}`] };
    await new Promise((r) => setTimeout(r, 250));
  }
  return { ok: false, problems: ['import job did not finish within 30 s'] };
}

async function capture(slug, doc) {
  const { chromium } = await import('@playwright/test');
  const sharp = (await import('sharp')).default;
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const [name, value] = cookie.split('=');
  const host = new URL(BASE).hostname;
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
  try {
    for (const scheme of ['light', 'dark']) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5, colorScheme: scheme, timezoneId: 'UTC', locale: 'en-GB' });
      await ctx.addCookies([{ name, value, domain: host, path: '/' }]);
      const page = await ctx.newPage();
      await page.goto(`${BASE}/project/${doc.projects[0].id}`);
      await page.getByRole('heading', { name: doc.projects[0].name }).first().waitFor({ timeout: 20000 });
      const last = doc.tasks.filter((t) => t.project_id === doc.projects[0].id && !t.parent_id).at(-1);
      await page.getByText(last.title).first().waitFor({ timeout: 20000 });
      await page.waitForTimeout(800);
      const png = await page.screenshot();
      await sharp(png).webp({ quality: 80 }).toFile(path.join(SHOTS_DIR, `${slug}-${scheme}.webp`));
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_')).sort();
  const version = await signIn();
  console.log(`OpenTodo ${version} at ${BASE}`);
  const failures = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    if (only.size && !only.has(slug)) continue;
    const doc = toExport(slug, readTemplate(path.join(DIR, file)));
    let result;
    try {
      result = await importTemplate(slug, doc);
    } catch (err) {
      result = { ok: false, problems: [err.message] };
    }
    if (!result.ok) {
      failures.push(slug);
      console.error(`FAIL ${slug}\n${result.problems.map((p) => `  - ${p}`).join('\n')}`);
      continue;
    }
    console.log(`ok   ${slug} (${doc.tasks.length} tasks)`);
    if (wantShots) await capture(slug, doc);
    // Undo and empty the trash, so the next template is captured on a clean account.
    await api('POST', `/api/v1/import/jobs/${result.job}/undo`);
    await api('POST', '/api/v1/trash/purge');
  }
  if (failures.length) {
    console.error(`\n${failures.length} template(s) failed to import: ${failures.join(', ')}`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => { console.error(`templates-check: ${err.message}`); process.exit(1); });
}
