// The site's mark, from the pinned bundle's brand/ folder (brand-from-bundle D1).
// The site keeps no copy of its own: a new mark arrives with the next bundle pin.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const MARK_FILE = 'brand/mark-colour.svg';

/**
 * The favicon (the bundle's colour mark byte for byte) and the touch icon's SVG:
 * the same mark filling its square at 180 px, since iOS rounds the icon itself.
 */
export function brandIcons(bundleDir) {
  const file = path.join(bundleDir, MARK_FILE);
  if (!fs.existsSync(file)) throw new Error(`The site bundle has no ${MARK_FILE}: the site's mark comes from it.`);
  const favicon = fs.readFileSync(file);
  const touchSvg = favicon.toString().replace(/ rx="[^"]*"/, '').replace('<svg ', '<svg width="180" height="180" ');
  return { favicon, touchSvg };
}

/**
 * A short content hash of the mark, the `?v=` of every URL that points at the favicon or the
 * touch icon (versioned-brand-assets). A new mark in a new bundle changes the URLs, so neither
 * browsers nor the CDN keep showing the old one from their caches.
 */
export function brandVersion(bundleDir) {
  return crypto.createHash('sha256').update(brandIcons(bundleDir).favicon).digest('hex').slice(0, 10);
}

/** The touch icon as an opaque PNG. */
export async function touchIconPng(touchSvg) {
  const sharp = (await import('sharp')).default;
  return sharp(Buffer.from(touchSvg)).resize(180, 180).flatten({ background: '#0f172a' }).png().toBuffer();
}
