// The measurements of the accessibility audit (OpenSpec website-accessibility "Automated
// AAA gate", "Pointer targets", "Focus is never obscured"), shared by the audit of every
// page in a11y.spec.ts and the fixtures in fixtures.spec.ts that prove each one fails.
// The page functions run inside the browser through page.evaluate, so each one is
// self-contained: no closure over anything in this module.
import fs from 'node:fs';
import path from 'node:path';
import { parseColor, themesOf } from '../../scripts/checks/contrast.mjs';
import register from '../../src/lib/a11y-exceptions.json' with { type: 'json' };

export const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'wcag2aaa', 'wcag21aaa', 'wcag22aaa'];
export const TARGETS = 'a[href], button, [role="button"], input:not([type="hidden"]), select, textarea, summary';

// The register's pairs as the colours the bundle renders, per theme (design D9).
type Rgb = { r: number; g: number; b: number };
const tokens = themesOf(fs.readFileSync(path.resolve('.bundle/tokens/tokens.css'), 'utf8')) as Record<'light' | 'dark', Record<string, string>>;
const rendered: Record<string, { fg: Rgb; bg: Rgb; any: boolean }[]> = { light: [], dark: [] };
for (const theme of ['light', 'dark'] as const) {
  const lookup = (name: string) => tokens[theme][name.replace(/^--ot-/, '')];
  for (const e of register as { pairs?: { fg: string; bg: string }[] }[]) {
    const value = (name: string) => (name.startsWith('#') ? name : tokens[theme][name]);
    for (const p of e.pairs ?? []) {
      if (!value(p.fg)) continue;
      const bgs = p.bg === '*' ? Object.keys(tokens[theme]) : [p.bg];
      for (const bg of bgs) if (value(bg)) rendered[theme].push({ fg: parseColor(value(p.fg), lookup), bg: parseColor(value(bg), lookup), any: p.bg === '*' });
    }
  }
}
const near = (a: Rgb, b: Rgb) => Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b) * 255 < 6;
export function registered(fgHex: string, bgHex: string): boolean {
  let fg: Rgb, bg: Rgb;
  try { fg = parseColor(fgHex); bg = parseColor(bgHex); } catch { return false; }
  // A page's theme is the visitor's; a subtree may render the other one, so both are consulted.
  return [...rendered.light, ...rendered.dark].some((r) => near(r.fg, fg) && (r.any || near(r.bg, bg)));
}

// The shape of an axe result this module reads (axe's own types are stricter than needed here).
type Check = { id: string; data?: unknown };
type Node = { target: unknown[]; any: Check[]; failureSummary?: string };
type Violation = { id: string; impact?: string | null; help: string; nodes: Node[] };

/** The serious and critical violations, an enhanced-contrast node dropped when its colours are a pair of the register. */
export function blocking(violations: Violation[]): Violation[] {
  return violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').flatMap((v) => {
    if (v.id !== 'color-contrast-enhanced') return [v];
    const nodes = v.nodes.filter((n) => {
      const data = (n.any.find((c) => c.id === 'color-contrast-enhanced') ?? n.any[0])?.data as { fgColor?: string; bgColor?: string } | undefined;
      return !(data?.fgColor && data?.bgColor && registered(data.fgColor, data.bgColor));
    });
    return nodes.length ? [{ ...v, help: `${v.help}; not in the exceptions register`, nodes }] : [];
  });
}

/** One line per violation with up to five nodes, the measured ratio where there is one. */
export function describe(violations: Violation[]): string[] {
  return violations.map((v) => `${v.id} (${v.impact}): ${v.help}\n${v.nodes.slice(0, 5).map((n) => {
    const data = (n.any.find((c) => c.id === 'color-contrast-enhanced') ?? n.any[0])?.data as { contrastRatio?: number } | undefined;
    return `    ${n.target.join(' ')}${data?.contrastRatio ? ` ${Number(data.contrastRatio).toFixed(2)}:1` : ''}: ${n.failureSummary?.split('\n').slice(0, 2).join(' ')}`;
  }).join('\n')}`);
}

/**
 * Pointer targets, in the page: a point just inside 22 px from the centre in four directions
 * hits the target, unless it lies outside the viewport or on another target; inline links and
 * text controls inside a sentence are exempt by the criterion.
 */
export function smallTargets(selector: string): string[] {
  const out: string[] = [];
  const shown = (el: Element) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[aria-hidden="true"], [inert], details:not([open]) > :not(summary)'); };
  const desc = (el: Element) => `<${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).slice(0, 2).join('.') : ''}> "${(el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)}"`;
  for (const el of document.querySelectorAll(selector)) {
    if (!shown(el)) continue;
    const display = getComputedStyle(el).display;
    if (display === 'inline') continue;
    // An inline box inside a text container is a link in a sentence, exempt by the criterion.
    if (/^inline/.test(display) && el.parentElement && /^(P|SPAN|LI|DD|DT|TD|TH|LABEL|H[1-6]|FIGCAPTION|SMALL|EM|STRONG)$/.test(el.parentElement.tagName)) continue;
    if (el.tagName === 'INPUT' && ['checkbox', 'radio', 'range', 'color', 'file'].includes(el.getAttribute('type') ?? '')) continue;
    if (el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && !['button', 'submit'].includes(el.getAttribute('type') ?? ''))) continue;
    // Bring the control into the middle of the viewport first, so a control below the fold is
    // measured too; the nearest inline edge, so a clipped container is not scrolled sideways.
    el.scrollIntoView({ block: 'center', inline: 'nearest' });
    const r = el.getBoundingClientRect(); const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2; const d = 21;
    if (cx < 0 || cy < 0 || cx >= innerWidth || cy >= innerHeight) continue;
    // An element whose own centre is under something else (a banner, a menu) is covered, not small.
    const centre = document.elementFromPoint(cx, cy);
    if (!centre || !(centre === el || el.contains(centre))) continue;
    // Pinned chrome (the sticky header) claims the points it covers; a target cannot grow under it.
    const pinned = (n: Element | null) => { for (let a = n; a && a !== document.body; a = a.parentElement) { const pos = getComputedStyle(a).position; if (pos === 'sticky' || pos === 'fixed') return true; } return false; };
    const misses: string[] = [];
    for (const [name, x, y] of [['up', cx, cy - d], ['down', cx, cy + d], ['left', cx - d, cy], ['right', cx + d, cy]] as const) {
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
      const top = document.elementFromPoint(x, y);
      if (!top || top === el || el.contains(top)) continue;
      if (top.matches(selector) || top.closest(selector)) continue;
      if (!el.contains(top) && !top.contains(el) && pinned(top)) continue;
      misses.push(name);
    }
    if (misses.length) out.push(`${desc(el)} ${Math.round(r.width)}×${Math.round(r.height)}: 22 px ${misses.join(', ')} misses`);
  }
  return out;
}

/**
 * Focus never obscured, in the page: every focusable element, once focused, lies inside the
 * viewport and the topmost element at its corners and centre is itself, a descendant, or its
 * own neighbourhood (its grandparent's subtree, such as a badge or a sibling control).
 * Transitions must be stopped first, so a control that moves into view on focus (the skip
 * link) is measured where it ends up.
 */
export function obscuredFocus(selector: string): string[] {
  const out: string[] = [];
  const els = [...document.querySelectorAll<HTMLElement>(selector)].filter((el) => !el.closest('[aria-hidden="true"], [inert]') && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0);
  const label = (el: Element) => (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40);
  for (const el of els.slice(0, 120)) {
    el.focus({ preventScroll: false });
    if (document.activeElement !== el) continue;
    const r = el.getBoundingClientRect();
    // A card taller than the viewport cannot be inside it whole; its top edge is what the browser shows.
    if (r.height > innerHeight * 0.8) { if (r.top < -1 || r.left < -1 || r.right > innerWidth + 1) out.push(`${el.tagName.toLowerCase()} "${label(el)}": partly outside the viewport`); continue; }
    if (r.top < -1 || r.left < -1 || r.bottom > innerHeight + 1 || r.right > innerWidth + 1) { out.push(`${el.tagName.toLowerCase()} "${label(el)}": partly outside the viewport`); continue; }
    const pts: [number, number][] = [[r.left + 1, r.top + 1], [r.right - 1, r.top + 1], [r.left + 1, r.bottom - 1], [r.right - 1, r.bottom - 1], [(r.left + r.right) / 2, (r.top + r.bottom) / 2]];
    for (const [x, y] of pts) {
      const top = document.elementFromPoint(x, y);
      if (!top || top === el || el.contains(top) || top.contains(el)) continue;
      const tb = top.getBoundingClientRect();
      if (x < tb.left || x > tb.right || y < tb.top || y > tb.bottom) continue;
      const home = el.parentElement?.parentElement;
      if (home && home !== document.body && home.contains(top)) continue;
      out.push(`${el.tagName.toLowerCase()} "${label(el)}": under <${top.tagName.toLowerCase()}.${(top.className && typeof top.className === 'string' ? top.className.split(' ')[0] : '')}>`);
      break;
    }
  }
  (document.activeElement as HTMLElement | null)?.blur?.();
  return out;
}

export const STILL = '*, *::before, *::after { transition-duration: 0s !important; animation-duration: 0s !important; scroll-behavior: auto !important; }';
