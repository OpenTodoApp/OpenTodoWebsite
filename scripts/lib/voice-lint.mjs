// Voice lint (website-voice-and-releases D1, D2): the words and phrases that
// content/VOICE.md lists to avoid fail the content check, in content and in page
// copy, naming the file and line. The list lives in the guide, in a fenced block
// with the info string `avoid`, so adding a phrase there is enough. A quotation is
// exempt when marked: `<!-- quote -->` on the line above a Markdown paragraph, or a
// `data-quote` attribute on the element in a page.

/** The phrases in the guide's ```avoid block, lower-cased. */
export function parseAvoid(voiceText) {
  const m = /```avoid\n([\s\S]*?)```/.exec(voiceText);
  if (!m) throw new Error('content/VOICE.md has no ```avoid block');
  return m[1].split('\n').map((l) => l.trim().toLowerCase()).filter((l) => l && !l.startsWith('#'));
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Blank out code comments so they keep their line numbers but are not checked. */
function stripComments(text) {
  const blank = (s) => s.replace(/[^\n]/g, ' ');
  return text
    .replace(/<!--(?!\s*quote\s*-->)[\s\S]*?-->/g, blank)
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:'"`\w])\/\/[^\n]*/g, (m, pre) => pre + blank(m.slice(pre.length)));
}

/**
 * Problems in one file: `file:line: "phrase" is on the voice guide's list to avoid`.
 * `kind` is 'md' for content and 'astro' for pages and components.
 */
export function voiceLint(text, { file, avoid, kind = 'md' }) {
  const out = [];
  const res = avoid.map((p) => [p, new RegExp(`(^|[^\\p{L}])${escape(p)}($|[^\\p{L}])`, 'iu')]);
  const lines = (kind === 'astro' ? stripComments(text) : text.replace(/<!--(?!\s*quote\s*-->)[\s\S]*?-->/g, (s) => s.replace(/[^\n]/g, ' '))).split('\n');
  let quoted = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (kind === 'md') {
      if (/<!--\s*quote\s*-->/.test(line)) { quoted = true; continue; }
      if (!line.trim()) { quoted = false; continue; }
      if (quoted) continue;
    } else if (/data-quote/.test(line)) continue;
    for (const [p, re] of res) if (re.test(line)) out.push(`${file}:${i + 1}: "${p}" is on the voice guide's list to avoid`);
  }
  return out;
}
