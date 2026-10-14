// Facts about the app, read from the site bundle at build time. Nothing here is
// written by hand: every value comes from the pinned bundle (spec "App facts come
// from a released site bundle").
import fs from 'node:fs';
import path from 'node:path';
import { docExistsIn, resolveBundle } from '../../scripts/lib/bundle.mjs';

export interface Shot { file: string; width: number; height: number }
export interface Manifest {
  layout: 1;
  interim?: boolean;
  version: string;
  tag?: string;
  releasedAt?: string;
  image?: string;
  importFormats: string[];
  exportFormat?: { format: string; version: number };
  facts: {
    binaryMB?: number; imageMB?: number; idleMemoryMB?: number; architectures?: string[];
    database?: string; license?: string; port?: number; dataDir?: string; minimumServer?: string;
  };
  shots: Record<string, Shot>;
  darkVariants?: Record<string, string>;
}
export interface Release { version: string; date: string; summary: string; sections: { title: string; items: string[] }[] }

export const bundle: { dir: string; kind: string; preview: boolean; label: string } = process.env.OPENTODO_BUNDLE
  ? JSON.parse(process.env.OPENTODO_BUNDLE)
  : resolveBundle();

const read = (rel: string) => fs.readFileSync(path.join(bundle.dir, rel), 'utf8');

export const manifest: Manifest = JSON.parse(read('manifest.json'));
export const releases: Release[] = JSON.parse(read('changelog.json')).releases;

/** True when `href` (a /docs/... path, optionally with #anchor) names a page of the bundle's docs. */
export const docExists = (href: string): boolean => docExistsIn(bundle.dir, href);

/** Inner SVG markup of each icon in the bundle's sprite, by name. */
export const icons: Record<string, string> = Object.fromEntries(
  [...read('icons/icons.svg').matchAll(/<symbol id="([^"]+)"[^>]*>([\s\S]*?)<\/symbol>/g)].map((m) => [m[1], m[2]]),
);

/** Whether the pinned release can import the named format (e.g. "todoist-csv"). */
export const canImport = (format: string | undefined) => !!format && manifest.importFormats.includes(format);

/** The tag shown to visitors, e.g. "v0.3.0". */
export const versionTag = manifest.tag ?? `v${manifest.version}`;
