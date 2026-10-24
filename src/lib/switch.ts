// "Switch from <app>" follows the importers (website-switcher-pages D3): only an
// app whose named import format is in the pinned release's manifest gets a
// one-step switch link; every other app links to the general import guide.
import { canImport } from './bundle';

export interface SwitchTarget { app: string; importFormat: string; switchGuide?: string }
export interface SwitchLink { href: string; label: string; named: boolean }

export const IMPORT_GUIDE = '/docs/import/';

export function switchLink(t: SwitchTarget): SwitchLink {
  if (canImport(t.importFormat) && t.switchGuide) return { href: t.switchGuide, label: `Switch from ${t.app}`, named: true };
  return { href: IMPORT_GUIDE, label: 'Import your tasks', named: false };
}
