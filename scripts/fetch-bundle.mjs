#!/usr/bin/env node
// Fetches the site bundle pinned in bundle.json into .bundle/ (website-platform design D2).
//
//   { "version": "v0.4.0" }   release asset opentodo-site-bundle-v0.4.0.tar.gz, checked against SHA256SUMS
//   { "preview": "<run id>" } bundle artefact of an app CI run on main (needs GITHUB_TOKEN); pages say "preview"
//
// BUNDLE_DIR=/path skips the download and uses that folder as a preview.
// SITE_ENV=production (set by the Dockerfile) refuses preview and local bundles.
// BUNDLE_BASE_URL and BUNDLE_API_URL override GitHub for tests.
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ROOT, SOURCE_FILE, assertDeployable, layoutProblems, readPin } from './lib/bundle.mjs';

const REPO = 'pixari/opentodo';

export class BundleError extends Error {}

async function download(url, headers = {}) {
  let res;
  try {
    res = await fetch(url, { headers, redirect: 'follow' });
  } catch (err) {
    throw new BundleError(`could not reach ${url}: ${err.cause?.message ?? err.message}`);
  }
  if (!res.ok) throw new BundleError(`${res.status} ${res.statusText} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function unpack(archive, out) {
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'bundle-')), 'bundle.tar.gz');
  fs.writeFileSync(tmp, archive);
  execFileSync('tar', ['-xzf', tmp, '-C', out]);
  // Accept archives with a single top-level folder as well as flat ones.
  const entries = fs.readdirSync(out);
  if (entries.length === 1 && fs.statSync(path.join(out, entries[0])).isDirectory() && !fs.existsSync(path.join(out, 'manifest.json'))) {
    const inner = path.join(out, entries[0]);
    for (const e of fs.readdirSync(inner)) fs.renameSync(path.join(inner, e), path.join(out, e));
    fs.rmdirSync(inner);
  }
}

function checkLayout(out, what) {
  const problems = layoutProblems(out);
  if (problems.length) throw new BundleError(`${what} does not match bundle layout v1: missing ${problems.join(', ')}`);
}

export async function fetchRelease(version, out, env = process.env) {
  const base = env.BUNDLE_BASE_URL ?? `https://github.com/${REPO}/releases/download`;
  const asset = `opentodo-site-bundle-${version}.tar.gz`;
  const url = `${base}/${version}/${asset}`;
  const sumsUrl = `${base}/${version}/SHA256SUMS`;
  let archive, sums;
  try {
    archive = await download(url);
  } catch (err) {
    throw new BundleError(`site bundle ${version} could not be downloaded: ${err.message}`);
  }
  try {
    sums = (await download(sumsUrl)).toString('utf8');
  } catch (err) {
    throw new BundleError(`checksums for site bundle ${version} could not be downloaded: ${err.message}`);
  }
  const line = sums.split('\n').find((l) => l.trim().split(/\s+\*?/).pop() === asset);
  if (!line) throw new BundleError(`SHA256SUMS of ${version} (${sumsUrl}) has no entry for ${asset}`);
  const expected = line.trim().split(/\s+/)[0].toLowerCase();
  const actual = crypto.createHash('sha256').update(archive).digest('hex');
  if (expected !== actual) throw new BundleError(`checksum mismatch for ${url}: expected ${expected}, got ${actual}`);
  unpack(archive, out);
  checkLayout(out, `site bundle ${version}`);
  const manifest = JSON.parse(fs.readFileSync(path.join(out, 'manifest.json'), 'utf8'));
  return { kind: 'release', version, url, label: `release ${version}`, manifestVersion: manifest.version };
}

export async function fetchPreview(runId, out, env = process.env) {
  const api = env.BUNDLE_API_URL ?? `https://api.github.com/repos/${REPO}`;
  if (!env.GITHUB_TOKEN) throw new BundleError(`preview bundle of run ${runId} needs GITHUB_TOKEN to download the artefact`);
  const headers = { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' };
  const listUrl = `${api}/actions/runs/${runId}/artifacts`;
  const list = JSON.parse((await download(listUrl, headers)).toString('utf8'));
  const art = (list.artifacts ?? []).find((a) => a.name.startsWith('opentodo-site-bundle'));
  if (!art) throw new BundleError(`run ${runId} has no opentodo-site-bundle artefact (${listUrl})`);
  const zip = await download(art.archive_download_url, headers);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-'));
  fs.writeFileSync(path.join(tmp, 'a.zip'), zip);
  execFileSync('unzip', ['-q', path.join(tmp, 'a.zip'), '-d', tmp]);
  const tarball = fs.readdirSync(tmp).find((f) => f.endsWith('.tar.gz'));
  if (!tarball) throw new BundleError(`artefact ${art.name} of run ${runId} holds no .tar.gz`);
  unpack(fs.readFileSync(path.join(tmp, tarball)), out);
  checkLayout(out, `preview bundle of run ${runId}`);
  return { kind: 'preview', run: String(runId), label: `preview from app run ${runId}` };
}

export async function main({ env = process.env, pinFile = path.join(ROOT, 'bundle.json'), out = path.join(ROOT, '.bundle') } = {}) {
  if (env.BUNDLE_DIR) {
    const dir = path.resolve(env.BUNDLE_DIR);
    checkLayout(dir, `BUNDLE_DIR ${dir}`);
    const bundle = { kind: 'local', preview: true, label: `local folder ${dir}` };
    assertDeployable(bundle, env);
    return bundle;
  }
  const pin = readPin(pinFile);
  if (pin.preview) assertDeployable({ preview: true, label: `preview from app run ${pin.preview}` }, env);
  let source;
  if (pin.version) {
    const have = path.join(out, SOURCE_FILE);
    const cached = fs.existsSync(have) && JSON.parse(fs.readFileSync(have, 'utf8'));
    if (cached && cached.kind === 'release' && cached.version === pin.version && !layoutProblems(out).length) return cached;
    source = await fetchRelease(pin.version, out, env);
  } else {
    source = await fetchPreview(pin.preview, out, env);
  }
  fs.writeFileSync(path.join(out, SOURCE_FILE), JSON.stringify(source, null, 2) + '\n');
  return source;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .then((s) => console.log(`site bundle ready: ${s.label}`))
    .catch((err) => {
      console.error(`fetch-bundle: ${err.message}`);
      process.exit(1);
    });
}
