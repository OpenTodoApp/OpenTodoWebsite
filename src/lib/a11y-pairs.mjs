// The text and background token pairs the site's stylesheet uses (OpenSpec
// website-accessibility "Contrast measured from the bundle"; design D2). Each pair is
// measured from the pinned bundle's tokens on every build: 7:1, or 4.5:1 when the
// exceptions register (src/lib/a11y-exceptions.json) lists it. The names are the
// bundle's --ot-* tokens without the prefix; `site.css` aliases them (--text, --muted …).
export const SURFACES = ['canvas', 'surface', 'raised', 'sunken'];
export const TEXT = ['text', 'text-strong', 'muted'];

/** A pair: foreground on background, both token names. */
export const PAIRS = [
  ...TEXT.flatMap((fg) => SURFACES.map((bg) => [fg, bg])),
  ['accent-text', 'canvas'], ['accent-text', 'surface'], ['accent-text', 'accent-soft'],
  ['on-accent', 'accent'], ['on-accent', 'accent-hover'],
  ['accent-soft-text', 'accent-soft'],
  ['warning-soft-text', 'warning-soft'],
  ['on-coffee', 'coffee'],
  // The playground miniatures' overdue date in the danger colour.
  ['danger', 'canvas'], ['danger', 'surface'],
  // Discord's button (website-community): its brand colour, drawn by the site, not a token.
  ['#ffffff', '#5865f2'],
];

/** site.css aliases → bundle tokens, so the stylesheet scan can name a pair by its aliases. */
export const ALIASES = {
  '--text': 'text', '--strong': 'text-strong', '--muted': 'muted', '--bg': 'canvas', '--surface': 'surface', '--raised': 'raised', '--sunken': 'sunken',
  '--accent': 'accent', '--accent-hover': 'accent-hover', '--accent-text': 'accent-text', '--accent-soft': 'accent-soft', '--accent-soft-text': 'accent-soft-text',
};
