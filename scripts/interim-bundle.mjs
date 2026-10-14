#!/usr/bin/env node
// Builds a bundle-shaped .bundle/ from the files this repository carries in
// interim/ (website-platform design D2), until the app publishes real site
// bundles. Delete this script and interim/ when bundle.json pins a release.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, SOURCE_FILE, layoutProblems } from './lib/bundle.mjs';

export function buildInterim(out = path.join(ROOT, '.bundle'), src = path.join(ROOT, 'interim')) {
  fs.rmSync(out, { recursive: true, force: true });
  const copy = (from, to) => fs.cpSync(path.join(src, from), path.join(out, to), { recursive: true });
  copy('docs', 'docs');
  copy('shots', 'shots');
  copy('tokens.css', 'tokens/tokens.css');
  copy('icons.svg', 'icons/icons.svg');
  copy('names.json', 'icons/names.json');
  copy('LICENSE-lucide.txt', 'icons/LICENSE-lucide.txt');
  copy('changelog.json', 'changelog.json');
  copy('manifest.json', 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(path.join(out, 'manifest.json'), 'utf8'));
  const problems = layoutProblems(out);
  if (problems.length) throw new Error(`interim bundle does not match layout v1: missing ${problems.join(', ')}`);
  fs.writeFileSync(path.join(out, SOURCE_FILE), JSON.stringify({ kind: 'interim', version: manifest.version, label: `interim bundle (v${manifest.version})` }, null, 2) + '\n');
  return manifest;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const m = buildInterim();
  console.log(`interim bundle for v${m.version} written to .bundle/`);
}
