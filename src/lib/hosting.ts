// Managed hosting (hosting-choice): the disclosure shown wherever PikaPods is offered, in the
// maintainer's words. PikaPods sits next to self-hosting, never above it.
export { PIKAPODS_NOTE_DE } from './install.de';
export const PIKAPODS_NOTE = 'PikaPods shares part of its revenue with the OpenTodo project. You get the same open-source OpenTodo, and you can export your data and move to your own server at any time.';

// The hosting page (hosting-page D2): PikaPods' own facts, read from its OpenTodo page on
// `checkedOn`. When PikaPods changes them, change them here.
export const PIKAPODS_FACTS = {
  checkedOn: '2026-11-06',
  price: 'From $2 a month',
  billing: 'billed by the hour from prepaid credit',
  minimum: '0.25 CPU, 0.25 GB RAM and 5 GB of storage',
  credit: '$5',
};

// Managed hosting line (managed-hosting-line): the hosting companies named at the end of
// /hosting/. The owner's rule (2026-11-16): a company is listed when it shares revenue with the
// project or sponsors it, and on no other ground; no favours case by case. Add one only on the
// owner's word, after they have read its terms.
export const MANAGED_HOSTS: { name: string; url: string }[] = [
  { name: 'PikaPods', url: 'https://www.pikapods.com/apps/opentodo' },
];
export const MANAGED_HOSTS_NOTE = 'These links support the project, which receives a share when they’re used.';
