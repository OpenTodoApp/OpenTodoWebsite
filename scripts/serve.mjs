#!/usr/bin/env node
// Serves dist/ like nginx does (directory URLs -> index.html, 404 page), for the
// browser checks and local previews: node scripts/serve.mjs [port]
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve('dist');
const port = Number(process.argv[2] ?? 4322);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.txt': 'text/plain' };

// The fixed response headers of nginx.conf (the security headers), so the browser checks run
// under the same Content-Security-Policy as production (site-polish D4).
export const serverHeaders = (conf) => Object.fromEntries([...conf.matchAll(/^\s*add_header (\S+) (?:"([^"]*)"|([^\s$]\S*)) always;/gm)].map((m) => [m[1], m[2] ?? m[3]]));
const headers = serverHeaders(fs.readFileSync(new URL('../nginx.conf', import.meta.url), 'utf8'));

if (import.meta.url === `file://${process.argv[1]}`) http.createServer((req, res) => {
  let file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) {
    const notFound = path.join(root, '404.html');
    res.writeHead(404, { ...headers, 'Content-Type': types['.html'] });
    res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found');
    return;
  }
  const type = types[path.extname(file)] ?? 'application/octet-stream';
  // Text is compressed as nginx does (gzip on), so measurements here match production.
  if (/^(text|application\/(javascript|json|xml))|svg/.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')) {
    res.writeHead(200, { ...headers, 'Content-Type': type, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
    res.end(zlib.gzipSync(fs.readFileSync(file)));
    return;
  }
  res.writeHead(200, { ...headers, 'Content-Type': type });
  fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`serving dist/ on http://127.0.0.1:${port}`));
