// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { assertDeployable, resolveBundle } from './scripts/lib/bundle.mjs';
import { abbreviations } from './scripts/lib/abbr.mjs';

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

/**
 * Social preview cards (website-seo D2): after the build, one PNG per page from
 * its title and description, rendered by scripts/og.mjs in its own process so the
 * bundled Inter files are picked up by fontconfig on every machine.
 */
/** @returns {import('astro').AstroIntegration} */
function socialCards() {
  return {
    name: 'opentodo:social-cards',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const out = new URL(dir).pathname;
        const r = spawnSync(process.execPath, [path.join(process.cwd(), 'scripts/og.mjs'), out], { stdio: 'inherit' });
        if (r.status !== 0) throw new Error('social cards: scripts/og.mjs failed');
      },
    },
  };
}

/** The docs come from the bundle, outside Astro's routes, so the sitemap lists them explicitly (website-seo D1). */
function docsUrls() {
  const docs = path.join(bundle.dir, 'docs');
  /** @type {string[]} */
  const out = [];
  /** @param {string} d @param {string} rel */
  const walk = (d, rel) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(d, e.name), `${rel}${e.name}/`);
      else if (e.name === 'index.html') out.push(`https://open-todo.app/docs/${rel}`);
    }
  };
  if (fs.existsSync(docs)) walk(docs, '');
  return out.sort();
}

export default defineConfig({
  site: 'https://open-todo.app',
  output: 'static',
  // The site is English; a few pages exist in the other languages the app's quick add speaks (website-languages D1).
  i18n: { defaultLocale: 'en', locales: ['en', 'de', 'fr', 'it', 'es', 'pt'], routing: { prefixDefaultLocale: false } },
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    bundleDocs(),
    // The first use of each listed abbreviation is explained on every built page (website-accessibility D8).
    abbreviations(),
    // Preview builds are noindex, so they get no sitemap entries beyond the structure.
    sitemap({
      customPages: docsUrls(),
      filter: (page) => !page.endsWith('/404/') && !page.endsWith('/404.html'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de', fr: 'fr', it: 'it', es: 'es', pt: 'pt' } },
    }),
    socialCards(),
  ],
  // Code in posts is highlighted at build time (website-blog D4): inline colours for
  // both themes, switched by the visitor's colour-scheme preference in site.css.
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false } },
  vite: {
    resolve: { alias: { '@bundle': bundle.dir } },
    server: { fs: { allow: ['.', bundle.dir] } },
  },
});
