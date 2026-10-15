// The dictionaries by language (website-languages D2).
import de from './de.mjs';
import es from './es.mjs';
import fr from './fr.mjs';
import it from './it.mjs';
import pt from './pt.mjs';

export const DICT = { de, fr, it, es, pt };

/** Fills {licence}, {version}, {demo}, {minimum}, {memory} in a string. */
export const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

/** Every leaf path of an object, for the shape test: ['home.title', 'home.getIt.paths.0.when', …]. */
export function leafPaths(obj, prefix = '') {
  if (obj === null || typeof obj !== 'object') return [prefix];
  return Object.keys(obj).flatMap((k) => leafPaths(obj[k], prefix ? `${prefix}.${k}` : k));
}
