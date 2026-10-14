// Template downloads and screenshots (website-content-hub design D1, D2).
import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { summarise, toExport } from '../../scripts/lib/template-export.mjs';

/** The opentodo-export v1 document of a template, with dates relative to the build day. */
export const templateExport = (entry: CollectionEntry<'templates'>) => toExport(entry.id, entry.data, { today: new Date() });
export const templateSummary = (entry: CollectionEntry<'templates'>) => summarise(templateExport(entry));

const shots = import.meta.glob<{ default: ImageMetadata }>('../assets/template-shots/*.{webp,png}', { eager: true });

/** Light and dark captures made by the template check (scripts/templates-check.mjs) against the pinned release. */
export function templateShots(slug: string) {
  const find = (variant: string) => Object.entries(shots).find(([k]) => k.includes(`/template-shots/${slug}-${variant}.`))?.[1].default;
  const light = find('light');
  const dark = find('dark');
  if (!light || !dark) {
    throw new Error(`Template "${slug}" has no screenshots in src/assets/template-shots/. Run \`npm run templates:check\` against the pinned release to import it and capture them.`);
  }
  return { light, dark };
}
