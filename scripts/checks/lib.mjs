// Shared helpers of the website checks: they read the built HTML in dist/ offline.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

export function htmlFiles(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) out.push(p);
    }
  };
  walk(dir);
  return out.sort();
}

/** The URL path a built file is served at: dist/vs/things/index.html -> /vs/things/. */
export const urlOf = (dir, file) => '/' + path.relative(dir, file).split(path.sep).join('/').replace(/index\.html$/, '');

export const isDocs = (url) => url === '/docs/' || url.startsWith('/docs/');

const cache = new Map();
export function load(file) {
  if (!cache.has(file)) cache.set(file, parse(fs.readFileSync(file, 'utf8'), { comment: false, blockTextElements: { script: true, style: true, pre: true } }));
  return cache.get(file);
}

/** Runs a check's CLI: prints problems and sets the exit code. */
export function report(name, problems, summary) {
  if (problems.length) {
    console.error(`${name}: ${problems.length} problem(s)\n${problems.map((p) => `  ${p}`).join('\n')}`);
    process.exitCode = 1;
  } else {
    console.log(`${name}: ${summary}`);
  }
}
