// Author photos (website-maintainer-and-proof D3): a local file under src/assets/authors/,
// named in authors.json, served through Astro's image pipeline. No remote images.
import type { ImageMetadata } from 'astro';

export interface Author { name: string; bio: string; url: string; photo?: string; note?: string }

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/authors/*.{jpg,jpeg,png,webp,avif}', { eager: true });

/** The author's photo, or undefined when the authors file names none; a missing file fails the build. */
export function authorPhoto(a: Author): ImageMetadata | undefined {
  if (!a.photo) return undefined;
  const img = photos[`../assets/authors/${a.photo.split('/').pop()}`]?.default;
  if (!img) throw new Error(`authors.json: photo ${a.photo} is not in src/assets/authors/`);
  return img;
}

export const initials = (a: Author) => a.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
