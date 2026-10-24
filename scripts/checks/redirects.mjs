#!/usr/bin/env node
// Redirect check (website-learn D4): every `return 301` in nginx.conf must lead to a page of
// the build (and its #fragment to an id on it), and an exact redirect must not hide a page that
// is still built. Regex redirects are checked on the sample paths written after them in a
// `# e.g.` comment.
import fs from 'node:fs';
import path from 'node:path';
import { load, report } from './lib.mjs';

export function parseRedirects(conf) {
  const out = [];
  const lines = conf.split('\n');
  lines.forEach((line, i) => {
    const exact = line.match(/location = (\S+) \{ return 301 (\S+); \}/);
    if (exact) { out.push({ from: exact[1], to: exact[2], line: i + 1 }); return; }
    const re = line.match(/location ~ (\S+) \{ return 301 (\S+); \}/);
    if (re) {
      const samples = (line.match(/# e\.g\. (.+)$/)?.[1] ?? '').split(/\s+/).filter(Boolean);
      for (const s of samples) {
        const m = s.match(new RegExp(re[1]));
        if (m) out.push({ from: s, to: re[2].replace(/\$(\d)/g, (_, n) => m[Number(n)]), line: i + 1 });
        else out.push({ from: s, to: null, line: i + 1 });
      }
    }
  });
  return out;
}

export function checkRedirects(dir, conf) {
  const problems = [];
  const redirects = parseRedirects(conf);
  const built = (p) => fs.existsSync(path.join(dir, p, 'index.html')) || (fs.existsSync(path.join(dir, p)) && fs.statSync(path.join(dir, p)).isFile());
  for (const r of redirects) {
    if (r.to === null) { problems.push(`nginx.conf:${r.line}: sample ${r.from} does not match its location`); continue; }
    const [to, frag] = r.to.split('#');
    if (!built(to)) { problems.push(`nginx.conf:${r.line}: ${r.from} redirects to ${r.to}, which is not built`); continue; }
    if (frag) {
      const file = path.join(dir, to, 'index.html');
      const ids = new Set(load(file).querySelectorAll('[id]').map((e) => e.getAttribute('id')));
      if (!ids.has(frag)) problems.push(`nginx.conf:${r.line}: ${r.from} redirects to ${r.to}, but #${frag} is not on ${to}`);
    }
    if (r.from.endsWith('/') && built(r.from)) problems.push(`nginx.conf:${r.line}: ${r.from} is still built, so the redirect hides it`);
  }
  return { problems, count: redirects.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = path.resolve(process.argv[2] ?? 'dist');
  const { problems, count } = checkRedirects(dir, fs.readFileSync(path.resolve(process.argv[3] ?? 'nginx.conf'), 'utf8'));
  report('redirects', problems, `${count} redirects in nginx.conf, each to a built page`);
}
