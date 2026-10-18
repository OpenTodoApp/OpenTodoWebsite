// Docs page titles for link text (website-layout-integrity D4).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { docTitleIn } from '../lib/bundle.mjs';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-title-test-'));
fs.mkdirSync(path.join(dir, 'docs/sections-and-boards'), { recursive: true });
fs.writeFileSync(path.join(dir, 'docs/sections-and-boards/index.html'), '<!doctype html><title>Sections and boards · OpenTodo docs</title>');
fs.mkdirSync(path.join(dir, 'docs/import'), { recursive: true });
fs.writeFileSync(path.join(dir, 'docs/import/index.html'), '<!doctype html><title>Import &amp; export</title>');

test('the title loses the docs suffix', () => {
  assert.equal(docTitleIn(dir, '/docs/sections-and-boards/'), 'Sections and boards');
});

test('anchors are ignored and entities decoded', () => {
  assert.equal(docTitleIn(dir, '/docs/import/#csv'), 'Import & export');
});

test('a page missing from the bundle has no title', () => {
  assert.equal(docTitleIn(dir, '/docs/nowhere/'), null);
});
