// Claim-and-source lint for content (website-content-hub design D3).
//
// Every paragraph that talks about something OpenTodo does (a feature keyword)
// must carry at least one link into the docs, and every docs link must resolve in
// the pinned bundle. A paragraph that only looks like a claim can opt out with an
// HTML comment on the line above: <!-- no-claim -->, which stays visible in review.
export const FEATURE_WORDS = [
  'offline', 'sync', 'syncs', 'synced', 'recurring', 'repeats', 'repeating', 'reminder', 'reminders', 'filter', 'filters',
  'label', 'labels', 'saved view', 'saved views', 'dashboard', 'board', 'boards', 'share', 'shared', 'sharing', 'invite',
  'assign', 'assignee', 'encrypted', 'encryption', 'end-to-end', 'import', 'export', 'backup', 'backups', 'caldav',
  'webhook', 'webhooks', 'api', 'command line', 'mcp', 'assistant', 'quick add', 'time block', 'time blocks', 'time blocking',
  'estimate', 'estimates', 'keyboard', 'shortcut', 'shortcuts', 'passkey', 'passkeys', 'two-factor', 'single sign-on',
  'notification', 'notifications', 'subtask', 'subtasks', 'history', 'trash',
];
const WORD_RE = new RegExp(`\\b(${FEATURE_WORDS.map((w) => w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'i');
const LINK_RE = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)|href="([^"]+)"/g;

/** Paragraph-like blocks of a Markdown body: { text, line } with 1-based line numbers in the file. */
export function blocks(source) {
  const lines = source.split('\n');
  let i = 0;
  if (lines[0] === '---') { i = 1; while (i < lines.length && lines[i] !== '---') i++; i++; }
  const out = [];
  let cur = null, fence = false, marker = false;
  const flush = () => { if (cur) out.push(cur); cur = null; };
  for (; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*(```|~~~)/.test(l)) { flush(); fence = !fence; continue; }
    if (fence) continue;
    if (!l.trim()) { flush(); continue; }
    if (/^\s*<!--\s*no-claim\s*-->\s*$/.test(l)) { flush(); marker = true; continue; }
    if (/^#{1,6}\s/.test(l)) { flush(); marker = false; continue; }
    const item = /^\s*([-*+]|\d+\.)\s/.test(l);
    if (item) flush();
    if (!cur) { cur = { text: l, line: i + 1, noClaim: marker }; marker = false; }
    else cur.text += '\n' + l;
  }
  flush();
  return out;
}

/**
 * @param {string} source the whole Markdown file
 * @param {{ docExists: (href: string) => boolean, pageExists?: (href: string) => boolean, file?: string }} opts
 * @returns {string[]} problems as "file:line: message"
 */
export function lint(source, { docExists, pageExists = () => true, file = '<input>' }) {
  const problems = [];
  for (const b of blocks(source)) {
    const links = [...b.text.matchAll(LINK_RE)].map((m) => m[1] ?? m[2]);
    const docs = links.filter((h) => h.startsWith('/docs/'));
    for (const h of docs) if (!docExists(h)) problems.push(`${file}:${b.line}: ${h} is not a page of the pinned bundle's docs`);
    for (const h of links.filter((x) => x.startsWith('/') && !x.startsWith('/docs/'))) {
      if (!pageExists(h)) problems.push(`${file}:${b.line}: ${h} is not a page of this site`);
    }
    const word = WORD_RE.exec(b.text.replace(LINK_RE, ' ').replace(/`[^`]*`/g, ' '));
    if (word && !docs.length && !b.noClaim) {
      problems.push(`${file}:${b.line}: paragraph mentions "${word[1]}" without a link to the documentation (add one, or mark it <!-- no-claim -->)`);
    }
  }
  return problems;
}
