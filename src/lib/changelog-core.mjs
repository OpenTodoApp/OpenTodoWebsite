// The release list's summary of each release (website-voice-and-releases D3, D4),
// plain JavaScript so the node tests can import it. Everything comes from the
// bundle's changelog: the intro's first sentence, the size of each section, and
// whether the version is a pre-release.

const ABBREVIATIONS = ['e.g', 'i.e', 'etc', 'vs', 'cf', 'approx'];

/** The first sentence of a changelog intro (Markdown), or '' when there is none. */
export function firstSentence(intro) {
  const text = String(intro ?? '').trim();
  if (!text) return '';
  // Code spans and link targets can hold full stops ("192.168.1.10", "docs/a.md"):
  // mask them with same-length filler so positions stay valid.
  const masked = text
    .replace(/`[^`]*`/g, (m) => '`' + 'x'.repeat(m.length - 2) + '`')
    .replace(/\]\([^)]*\)/g, (m) => '](' + 'x'.repeat(m.length - 3) + ')');
  const re = /[.!?](?=\s+[\p{Lu}*`[(]|\s*$)/gu;
  let m;
  while ((m = re.exec(masked))) {
    const before = masked.slice(0, m.index).toLowerCase();
    if (ABBREVIATIONS.some((a) => before.endsWith(a))) continue;
    return text.slice(0, m.index + 1);
  }
  return text;
}

const NAMES = {
  added: ['addition', 'additions'],
  changed: ['change', 'changes'],
  fixed: ['fix', 'fixes'],
  security: ['security fix', 'security fixes'],
  breaking: ['breaking change', 'breaking changes'],
  removed: ['removal', 'removals'],
  deprecated: ['deprecation', 'deprecations'],
};

/** "30 security fixes", "1 breaking change", or "n entries in <name>" for an unknown section. */
export function sectionCount(title, n) {
  const names = NAMES[String(title).toLowerCase()];
  if (names) return `${n} ${n === 1 ? names[0] : names[1]}`;
  return `${n} ${n === 1 ? 'entry' : 'entries'} in ${title}`;
}

/** The counts of a release's sections in changelog order; upgrade notes are a mark, not a count. */
export function sectionCounts(sections) {
  return (sections ?? []).filter((s) => s.items.length && !/^upgrade notes$/i.test(s.title)).map((s) => sectionCount(s.title, s.items.length));
}

/** Whether a release carries upgrade notes. */
export const hasUpgradeNotes = (sections) => (sections ?? []).some((s) => /^upgrade notes$/i.test(s.title) && s.items.length > 0);

/** A semver pre-release: a suffix after the patch number, as in 0.3.1-rc.1. */
export const isPreRelease = (version) => /^\d+\.\d+\.\d+-/.test(String(version));
