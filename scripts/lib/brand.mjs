// The site's mark, from the pinned bundle's brand/ folder (brand-from-bundle D1).
// The site keeps no copy of its own: a new mark arrives with the next bundle pin.
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

/** The touch icon as an opaque PNG. */
export async function touchIconPng(touchSvg) {
  const sharp = (await import('sharp')).default;
  return sharp(Buffer.from(touchSvg)).resize(180, 180).flatten({ background: '#0f172a' }).png().toBuffer();
}
