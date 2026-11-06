#!/usr/bin/env node
// The pages the browser checks visit (ci-fast-checks D1, D2), for the checks workflow.
//
//   node scripts/checks/pages.mjs sample [dist]               one page per template, and every home page
//   node scripts/checks/pages.mjs hashes [dist] > hashes.json  each page's HTML hash, saved after a build of main
//   node scripts/checks/pages.mjs changed hashes.json [dist]   the pages whose HTML differs from those hashes
import fs from 'node:fs';
import { changedPages, pageHashes, samplePages } from '../lib/pages.mjs';

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'sample') console.log(samplePages(args[0] ?? 'dist').join('\n'));
else if (cmd === 'hashes') console.log(JSON.stringify(pageHashes(args[0] ?? 'dist'), null, 1));
else if (cmd === 'changed') console.log(changedPages(args[1] ?? 'dist', JSON.parse(fs.readFileSync(args[0], 'utf8'))).join('\n'));
else {
  console.error('usage: pages.mjs sample [dist] | hashes [dist] | changed <hashes.json> [dist]');
  process.exit(2);
}
