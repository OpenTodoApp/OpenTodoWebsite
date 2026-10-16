// Where the site bundle lives and what kind it is. Shared by the bundle scripts,
// astro.config.mjs and the pages (through src/lib/bundle.ts).
//
// Bundle layout v1 (app change `site-bundle`):
//   manifest.json  docs/  shots/  tokens/tokens.css  icons/icons.svg  icons/names.json  changelog.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const DEFAULT_DIR = path.join(ROOT, '.bundle');
export const SOURCE_FILE = '.source.json';

export const LAYOUT_V1 = {
  files: ['manifest.json', 'changelog.json', 'tokens/tokens.css', 'icons/icons.svg', 'icons/names.json', 'docs/index.html'],
  dirs: ['docs', 'shots', 'tokens', 'icons'],
};

/** Missing files or folders of layout v1 in `dir`, as relative paths. */
export function layoutProblems(dir) {
  const missing = [];
  for (const d of LAYOUT_V1.dirs) if (!fs.existsSync(path.join(dir, d)) || !fs.statSync(path.join(dir, d)).isDirectory()) missing.push(d + '/');
  for (const f of LAYOUT_V1.files) if (!fs.existsSync(path.join(dir, f))) missing.push(f);
  if (!missing.includes('manifest.json')) {
    const m = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
    if (m.layout !== 1) missing.push(`manifest.json layout 1 (found ${JSON.stringify(m.layout)})`);
    for (const key of ['version', 'importFormats', 'facts']) if (!(key in m)) missing.push(`manifest.json "${key}"`);
    if (!('screenshots' in m) && !('shots' in m)) missing.push('manifest.json "screenshots"');
  }
  return missing;
}

/** The pin recorded in bundle.json: { version } | { preview } | { interim: true }. */
export function readPin(file = path.join(ROOT, 'bundle.json')) {
  const pin = JSON.parse(fs.readFileSync(file, 'utf8'));
  const kinds = ['version', 'preview', 'interim'].filter((k) => pin[k]);
  if (kinds.length !== 1) throw new Error(`${path.basename(file)} must hold exactly one of "version", "preview" or "interim" (found ${JSON.stringify(pin)})`);
  return pin;
}

/**
 * The bundle the build uses. BUNDLE_DIR (a local folder) wins and is always a
 * preview; otherwise .bundle/ with the source fetch-bundle recorded.
 */
export function resolveBundle(env = process.env) {
  if (env.BUNDLE_DIR) {
    const dir = path.resolve(env.BUNDLE_DIR);
    return { dir, kind: 'local', preview: true, label: `local folder ${dir}` };
  }
  const dir = DEFAULT_DIR;
  const sourceFile = path.join(dir, SOURCE_FILE);
  if (!fs.existsSync(sourceFile)) {
    throw new Error('No site bundle in .bundle/. Run `npm run bundle` (or set BUNDLE_DIR to a bundle folder).');
  }
  const source = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
  return { dir, ...source, preview: source.kind === 'preview' || source.kind === 'local' };
}

/** Production builds (the Docker image) refuse anything that is not a release, except the recorded interim pin. */
export function assertDeployable(bundle, env = process.env) {
  if (env.SITE_ENV !== 'production') return;
  if (bundle.preview) {
    throw new Error(`Refusing a production build with a preview bundle (${bundle.label}). Pin a released version in bundle.json.`);
  }
}

/** True when `href` (a /docs/... path, optionally with #anchor) names a page of the docs in `dir`. */
export function docExistsIn(dir, href) {
  const clean = String(href).split('#')[0].split('?')[0];
  if (!clean.startsWith('/docs/') && clean !== '/docs') return false;
  const rel = clean.slice('/docs'.length).replace(/^\/+/, '');
  const target = path.join(dir, 'docs', rel);
  if (rel && fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  return fs.existsSync(path.join(target, 'index.html'));
}

const IMAGE = 'ghcr.io/pixari/opentodo';

/**
 * The manifest in the shape the pages use (website-release-bundle D1, D2). The
 * app's published manifest (schema 1: "v"-prefixed version, date, screenshots,
 * facts) is converted; the interim manifest (with "shots") passes through.
 */
export function normalizeManifest(raw) {
  if (raw.shots) return raw;
  const version = String(raw.version).replace(/^v/, '');
  const names = (raw.screenshots ?? []).map((p) => path.basename(p).replace(/\.[^.]+$/, ''));
  const files = Object.fromEntries((raw.screenshots ?? []).map((p, i) => [names[i], { file: path.basename(p) }]));
  const darkVariants = Object.fromEntries(names.filter((n) => files[`${n}-dark`]).map((n) => [n, `${n}-dark`]));
  const { dockerImageMB, exportFormat, exportFormatVersion, ...facts } = raw.facts ?? {};
  return {
    layout: raw.layout,
    version,
    tag: `v${version}`,
    releasedAt: raw.date,
    image: `${IMAGE}:${version}`,
    importFormats: raw.importFormats,
    ...(exportFormat ? { exportFormat: { format: exportFormat, version: exportFormatVersion } } : {}),
    facts: { ...facts, ...(dockerImageMB ? { imageMB: dockerImageMB } : {}) },
    shots: files,
    darkVariants,
  };
}

/** Released versions only, newest first, as { version, date, summary, sections: [{ title, items }] }. */
export function normalizeChangelog(raw) {
  if (!Array.isArray(raw)) return raw.releases;
  return raw
    .filter((r) => /^\d+\.\d+\.\d+/.test(r.version))
    .map((r) => ({
      version: r.version,
      date: r.date,
      summary: r.intro ?? '',
      sections: Object.entries(r.sections ?? {}).map(([title, items]) => ({ title, items })),
    }));
}
