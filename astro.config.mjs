// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import { assertDeployable, resolveBundle } from './scripts/lib/bundle.mjs';

const bundle = resolveBundle();
assertDeployable(bundle);
// Handed to src/lib/bundle.ts, which runs from the prerender chunks where paths differ.
process.env.OPENTODO_BUNDLE = JSON.stringify(bundle);

/** @type {Record<string, string>} */
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

/**
 * The bundle's docs site is served under /docs/ exactly as shipped (spec
 * "Documentation served as shipped"): copied byte for byte into dist/docs/ after
 * the build, and served from the bundle folder by the dev server.
 */
/** @returns {import('astro').AstroIntegration} */
function bundleDocs() {
  const docs = path.join(bundle.dir, 'docs');
  return {
    name: 'opentodo:bundle-docs',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((/** @type {import('node:http').IncomingMessage} */ req, /** @type {import('node:http').ServerResponse} */ res, /** @type {() => void} */ next) => {
          const url = decodeURIComponent((req.url ?? '').split('?')[0]);
          if (!url.startsWith('/docs/') && url !== '/docs') return next();
          let file = path.join(docs, url.slice('/docs'.length));
          if (!file.startsWith(docs)) return next();
          if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
          if (!fs.existsSync(file)) return next();
          res.setHeader('Content-Type', MIME[path.extname(file)] ?? 'application/octet-stream');
          fs.createReadStream(file).pipe(res);
        });
      },
      'astro:build:done': ({ dir }) => {
        const out = path.join(new URL(dir).pathname, 'docs');
        if (fs.existsSync(out)) throw new Error('dist/docs/ already exists: no page may live under /docs/, it belongs to the bundle');
        fs.cpSync(docs, out, { recursive: true });
      },
    },
  };
}

export default defineConfig({
  site: 'https://open-todo.app',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [bundleDocs()],
  vite: {
    resolve: { alias: { '@bundle': bundle.dir } },
    server: { fs: { allow: ['.', bundle.dir] } },
  },
});
