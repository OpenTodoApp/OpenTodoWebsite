// fetch-bundle against a fake release served locally (website-platform task 1.3).
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { main } from '../fetch-bundle.mjs';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fetch-bundle-test-'));
let server, base;
const routes = new Map();

function makeBundle(version) {
  const dir = path.join(tmp, `src-${version}`);
  for (const d of ['docs', 'shots', 'tokens', 'icons']) fs.mkdirSync(path.join(dir, d), { recursive: true });
  fs.writeFileSync(path.join(dir, 'docs/index.html'), '<!doctype html><title>Docs</title>');
  fs.writeFileSync(path.join(dir, 'tokens/tokens.css'), ':root{--ot-accent:#047857}');
  fs.writeFileSync(path.join(dir, 'icons/icons.svg'), '<svg></svg>');
  fs.writeFileSync(path.join(dir, 'icons/names.json'), '[]');
  fs.writeFileSync(path.join(dir, 'changelog.json'), '{"releases":[]}');
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ layout: 1, version: version.slice(1), importFormats: ['csv'], facts: {}, shots: {} }));
  const tarball = path.join(tmp, `opentodo-site-bundle-${version}.tar.gz`);
  execFileSync('tar', ['-czf', tarball, '-C', dir, '.']);
  return fs.readFileSync(tarball);
}

before(async () => {
  const good = makeBundle('v9.0.0');
  routes.set('/v9.0.0/opentodo-site-bundle-v9.0.0.tar.gz', good);
  routes.set('/v9.0.0/SHA256SUMS', `${crypto.createHash('sha256').update(good).digest('hex')}  opentodo-site-bundle-v9.0.0.tar.gz\n`);
  const tampered = makeBundle('v9.0.1');
  routes.set('/v9.0.1/opentodo-site-bundle-v9.0.1.tar.gz', tampered);
  routes.set('/v9.0.1/SHA256SUMS', `${'0'.repeat(64)}  opentodo-site-bundle-v9.0.1.tar.gz\n`);
  server = http.createServer((req, res) => {
    const body = routes.get(req.url);
    if (!body) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200); res.end(body);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

const pin = (obj) => {
  const f = path.join(tmp, `pin-${crypto.randomUUID()}.json`);
  fs.writeFileSync(f, JSON.stringify(obj));
  return f;
};
const outDir = () => path.join(tmp, `out-${crypto.randomUUID()}`);

test('downloads, verifies and unpacks a release bundle', async () => {
  const out = outDir();
  const src = await main({ env: { BUNDLE_BASE_URL: base }, pinFile: pin({ version: 'v9.0.0' }), out });
  assert.equal(src.kind, 'release');
  assert.ok(fs.existsSync(path.join(out, 'docs/index.html')));
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, '.source.json'), 'utf8')).version, 'v9.0.0');
});

test('refuses a bundle whose checksum does not match', async () => {
  await assert.rejects(main({ env: { BUNDLE_BASE_URL: base }, pinFile: pin({ version: 'v9.0.1' }), out: outDir() }), /checksum mismatch/);
});

test('names the version and the URL when the asset is missing', async () => {
  await assert.rejects(
    main({ env: { BUNDLE_BASE_URL: base }, pinFile: pin({ version: 'v9.9.9' }), out: outDir() }),
    (err) => err.message.includes('v9.9.9') && err.message.includes(`${base}/v9.9.9/opentodo-site-bundle-v9.9.9.tar.gz`),
  );
});

test('production refuses preview pins and local folders', async () => {
  await assert.rejects(main({ env: { SITE_ENV: 'production' }, pinFile: pin({ preview: '123' }), out: outDir() }), /Refusing a production build with a preview bundle/);
  const out = outDir();
  await main({ env: { BUNDLE_BASE_URL: base }, pinFile: pin({ version: 'v9.0.0' }), out });
  await assert.rejects(main({ env: { SITE_ENV: 'production', BUNDLE_DIR: out } }), /preview bundle \(local folder/);
});

test('a local folder outside production is accepted as a preview', async () => {
  const out = outDir();
  await main({ env: { BUNDLE_BASE_URL: base }, pinFile: pin({ version: 'v9.0.0' }), out });
  const src = await main({ env: { BUNDLE_DIR: out } });
  assert.equal(src.preview, true);
});

test('bundle.json must hold exactly one pin', async () => {
  await assert.rejects(main({ env: {}, pinFile: pin({ version: 'v1', interim: true }), out: outDir() }), /exactly one/);
});
