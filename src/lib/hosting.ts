// Managed hosting (hosting-choice): the disclosure shown wherever PikaPods is offered on its own
// (/start/, /install/), in the maintainer's words. PikaPods sits next to self-hosting, never above it.
export { PIKAPODS_NOTE_DE } from './install.de';
export const PIKAPODS_NOTE = 'PikaPods shares part of its revenue with the OpenTodo project. You get the same open-source OpenTodo, and you can export your data and move to your own server at any time.';

// The facts every option on /hosting/ shows, in this order (hosting-choice-page).
export const FACTS = ['Cost', 'Setup', 'Updates', 'Backups', 'HTTPS and domain', 'Leaving'] as const;
export type Facts = Record<(typeof FACTS)[number], string>;

export interface Host {
  name: string;
  url: string;
  button: string;
  /** Who it suits, in a few words: the "which one is for me" line at the top of /hosting/. */
  who: string;
  /** When the facts were read from the host's own pages. Read them again when they change. */
  checkedOn: string;
  facts: Facts;
  steps: string[];
  /** The host's guide in the app's docs, linked once the pinned bundle has it. */
  guide: string;
}

// The hosting companies, in the order /hosting/ shows them: how much a person looks after
// themselves, least first. The owner's rule (2026-11-16): a company is listed when it shares
// revenue with the project or sponsors it, and on no other ground; no favours case by case. Add one
// only on the owner's word, after they have read its terms. Facts are the host's own, read on
// `checkedOn`; strings are trusted HTML written here.
export const MANAGED_HOSTS: Host[] = [
  {
    // Revenue share. Facts from https://www.pikapods.com/apps/opentodo.
    name: 'PikaPods',
    url: 'https://www.pikapods.com/apps/opentodo',
    button: 'Run it on PikaPods',
    who: 'The least to look after',
    checkedOn: '2026-11-16',
    facts: {
      Cost: 'From $2 a month, billed by the hour from prepaid credit, with $5 of welcome credit. The smallest pod has 0.25 CPU, 0.25 GB of memory and 5 GB of storage.',
      Setup: 'Start a pod from PikaPods’ OpenTodo page. PikaPods lists OpenTodo as experimental.',
      Updates: 'PikaPods installs them. Each version is tested by hand first, and updates roll out weekly.',
      Backups: 'Nightly encrypted backups to your own S3 storage, once you turn them on. PikaPods’ server backups can’t restore a single pod.',
      'HTTPS and domain': 'Free HTTPS, on PikaPods’ address or your own domain.',
      Leaving: 'Back up, then restore the archive on your own server: <a href="/docs/self-hosting/pikapods/#move-to-your-own-server">Move to your own server</a>.',
    },
    steps: [
      'Start the pod, then open it right away and create the owner account. Whoever finishes that screen first becomes the owner, so do it before you share the address.',
      'If it asks for a setup code, use the one in the pod’s logs or the setup token you configured.',
      'Registration is closed. Invite people from Settings, then People.',
    ],
    guide: '/docs/self-hosting/pikapods/',
  },
  {
    // Template kickback (template programme), published and tested by the owner on 2026-11-16.
    // Facts from https://railway.com/pricing, https://docs.railway.com/volumes/backups and
    // https://railway.com/deploy/opentodo.
    name: 'Railway',
    url: 'https://railway.com/deploy/opentodo?referralCode=nbgVDr',
    button: 'Deploy on Railway',
    who: 'Already on Railway, or want it next to your other services there',
    checkedOn: '2026-11-16',
    facts: {
      Cost: 'The Hobby plan is $5 a month and includes $5 of usage; only usage above that costs more. New accounts start with a 30-day trial with $5 of credit. What OpenTodo uses in a month hasn’t been measured.',
      Setup: 'Deploy the template: one service from the released image, with a volume for your data.',
      Updates: 'You start them: redeploy the service and Railway pulls the new release. Back up first.',
      Backups: 'Volume backups daily, weekly or monthly, from the service’s Backups tab, billed like storage. OpenTodo can also back up to your own S3 or WebDAV storage.',
      'HTTPS and domain': 'HTTPS on a railway.app address. Add your own domain in the service’s Networking settings, then set <code>OPENTODO_BASE_URL</code> to it.',
      Leaving: 'Back up with OpenTodo, then restore the archive on any other server: <a href="/docs/backups/#restore">Restore</a>.',
    },
    steps: [
      'Deploy the template.',
      'If the first deploy fails with “OPENTODO_BASE_URL must be an absolute URL”, open Settings, then Networking, choose Generate Domain with port 8080, and redeploy.',
      'Copy <code>OPENTODO_SETUP_TOKEN</code> from the service’s Variables tab, open the service’s address and create the owner account with it.',
      'Sign-up stays closed. Invite people from Settings, then People.',
    ],
    guide: '/docs/self-hosting/railway/',
  },
];
export const MANAGED_HOSTS_NOTE = 'These links support the project, which receives a share when they’re used.';

// Your own server, the last option: free, and everything is yours to look after.
export const OWN_SERVER: Facts = {
  Cost: 'Free, on your own computer, a Raspberry Pi, a NAS or any server.',
  Setup: 'One container and one volume, or your NAS’s app store.',
  Updates: 'You pull the new image when a release is out: <a href="/docs/self-hosting/docker/#updating">Updating</a>.',
  Backups: 'OpenTodo backs itself up on a schedule to a folder, S3 or WebDAV: <a href="/docs/backups/">Backups</a>.',
  'HTTPS and domain': 'Through your own reverse proxy: <a href="/docs/self-hosting/docker/#behind-a-reverse-proxy">Behind a reverse proxy</a>.',
  Leaving: 'There is nothing to leave: your data is one folder on your machine.',
};
