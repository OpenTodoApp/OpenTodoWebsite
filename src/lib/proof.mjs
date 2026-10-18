// The proof strip's figures (website-maintainer-and-proof D1): only facts the pinned
// bundle's manifest carries, each with the place a visitor can check it. A figure
// the bundle does not carry is left out, never estimated.

/** Fact keys the strip can show, in display order, with their label and where to check. */
export const PROOF_FACTS = {
  license: { label: (v) => String(v), caption: 'licence', href: (repo) => `${repo}/blob/main/LICENSE` },
  specCount: { label: (v) => String(v), caption: 'published specifications', href: (repo) => `${repo}/tree/main/openspec/specs` },
  docsPages: { label: (v) => String(v), caption: 'documentation pages', href: () => '/docs/' },
  importFormatCount: { label: (v) => String(v), caption: 'import formats', href: () => '/docs/import/' },
};

/** The figures to show for `keys`, from `facts`, skipping any the manifest lacks. */
export function proofFigures(facts, keys, repo) {
  return keys
    .filter((k) => PROOF_FACTS[k] && facts?.[k] !== undefined && facts[k] !== null && facts[k] !== '')
    .map((k) => ({ key: k, value: PROOF_FACTS[k].label(facts[k]), caption: PROOF_FACTS[k].caption, href: PROOF_FACTS[k].href(repo) }));
}
