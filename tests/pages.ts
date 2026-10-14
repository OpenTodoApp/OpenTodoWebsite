import fs from 'node:fs';
import path from 'node:path';

/** Every page of the site in dist/ (the docs come from the bundle and are checked by the app). */
export function sitePages(dir = 'dist'): string[] {
  const out: string[] = [];
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (path.relative(dir, p) !== 'docs') walk(p); }
      else if (e.name === 'index.html') out.push('/' + path.relative(dir, d).split(path.sep).join('/') + (d === dir ? '' : '/'));
    }
  };
  walk(dir);
  return out.map((p) => p.replace('//', '/')).sort();
}
