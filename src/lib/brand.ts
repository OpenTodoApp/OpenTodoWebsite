// The URLs of the site's mark (versioned-brand-assets): the favicon and the touch icon are
// written to /assets/ from the pinned bundle (astro.config.mjs, bundleBrand), and every page
// refers to them through these URLs, which carry a hash of the mark so a new mark is a new URL.
import { brandVersion } from '../../scripts/lib/brand.mjs';
import { bundle } from './bundle';

const v = brandVersion(bundle.dir);

export const BRAND = {
  favicon: `/assets/favicon.svg?v=${v}`,
  touchIcon: `/assets/apple-touch-icon.png?v=${v}`,
};
