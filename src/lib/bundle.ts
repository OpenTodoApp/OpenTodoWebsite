// Facts about the app, read from the site bundle at build time. Nothing here is
// written by hand: every value comes from the pinned bundle (spec "App facts come
// from a released site bundle").
import fs from 'node:fs';
import path from 'node:path';
import { docExistsIn, docTitleIn, readMethod, normalizeChangelog, normalizeManifest, resolveBundle } from '../../scripts/lib/bundle.mjs';

export interface Shot { file: string; width?: number; height?: number }
export interface Manifest {
  layout: 1;
  version: string;
  tag?: string;
  releasedAt?: string;
  image?: string;
  importFormats: string[];
  exportFormat?: { format: string; version: number };
  facts: {
    binaryMB?: number; imageMB?: number; idleMemoryMB?: number; architectures?: string[];
    database?: string; license?: string; port?: number; dataDir?: string; minimumServer?: string; quickAddLanguages?: string[];
  };
  shots: Record<string, Shot>;
  darkVariants?: Record<string, string>;
}
export interface Release { version: string; date: string; summary: string; sections: { title: string; items: string[] }[] }

export const bundle: { dir: string; kind: string; preview: boolean; label: string } = process.env.OPENTODO_BUNDLE
  ? JSON.parse(process.env.OPENTODO_BUNDLE)
  : resolveBundle();

const read = (rel: string) => fs.readFileSync(path.join(bundle.dir, rel), 'utf8');

export const manifest: Manifest = normalizeManifest(JSON.parse(read('manifest.json')));
export const releases: Release[] = normalizeChangelog(JSON.parse(read('changelog.json')));

/** True when `href` (a /docs/... path, optionally with #anchor) names a page of the bundle's docs. */
export const docExists = (href: string): boolean => docExistsIn(bundle.dir, href);

/** The title of the docs page `href` names (for link text), or the path when the page has none. */
export const docTitle = (href: string): string => docTitleIn(bundle.dir, href) ?? href;

/** Inner SVG markup of each icon in the bundle's sprite, by name. */
export const icons: Record<string, string> = Object.fromEntries(
  // The bundle's sprite names its symbols "icon-<name>".
  [...read('icons/icons.svg').matchAll(/<symbol id="icon-([^"]+)"[^>]*>([\s\S]*?)<\/symbol>/g)].map((m) => [m[1], m[2]]),
);

/** Whether the pinned release can import the named format (e.g. "todoist-csv"). */
export const canImport = (format: string | undefined) => !!format && manifest.importFormats.includes(format);

/** The tag shown to visitors, e.g. "v0.3.0". */
export const versionTag = manifest.tag ?? `v${manifest.version}`;

/** One term of the Open Loops vocabulary (method.json schema 1). */
export interface MethodTerm { id: string; name: Record<string, string>; description: Record<string, string>; route?: string; keys?: string }
export interface Method {
  schema: number; name: string; languages: string[]; tagline: Record<string, string>;
  moves: MethodTerm[]; principles: MethodTerm[]; places: MethodTerm[]; rhythms: MethodTerm[]; horizons: MethodTerm[];
}

/** The Open Loops vocabulary of the pinned release, or null when it does not ship the method (website-open-loops D1). */
export const method: Method | null = readMethod(bundle.dir, manifest.facts);

/** A term's name and description in `lang`, English when the bundle lacks that language. */
export const term = (t: MethodTerm, lang = 'en') => ({ name: t.name[lang] ?? t.name.en, description: t.description[lang] ?? t.description.en });

/** The tagline in `lang`. */
export const tagline = (lang = 'en') => (method ? method.tagline[lang] ?? method.tagline.en : '');

/**
 * The Place or rhythm whose screen serves a move (website-open-loops D4): a move's route
 * that is "/<id>" of a Place, or equals a rhythm's route. Undefined otherwise, so no
 * screen name is invented.
 */
export function screenOf(move: MethodTerm): MethodTerm | undefined {
  if (!method || !move.route) return undefined;
  return method.places.find((p) => `/${p.id}` === move.route) ?? method.rhythms.find((r) => r.route === move.route);
}
