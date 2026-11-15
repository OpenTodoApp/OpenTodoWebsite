// Where OpenTodo runs, for /start/ (website-get-started D2): each target is shown while the
// pinned bundle has its self-hosting guide, so a new guide appears with the release that
// ships it and a removed one disappears.
import { docExists } from './bundle';
import { TARGETS_DE } from './install.de';

const TARGETS: [string, string, string][] = [
  ['Docker', 'docker', 'docker run or Compose'], ['Podman', 'podman', 'Quadlet or a pod'], ['Umbrel', 'umbrel', 'App store'],
  ['Unraid', 'unraid', 'Community Applications'], ['CasaOS and ZimaOS', 'casaos', 'App store'], ['TrueNAS', 'truenas', 'Apps catalogue'],
  ['Synology', 'synology', 'Container Manager'], ['Runtipi', 'runtipi', 'App store'], ['Cosmos Cloud', 'cosmos', 'Market'],
  ['Portainer', 'portainer', 'Stack'], ['Coolify', 'coolify', 'One-click service'], ['Dokploy', 'dokploy', 'Template'],
  ['CapRover', 'caprover', 'One-click app'], ['Easypanel', 'easypanel', 'Template'], ['Kubernetes', 'kubernetes', 'Helm chart'],
  ['Fly.io', 'fly', 'fly.toml'], ['Render', 'render', 'Blueprint'],
];

export const deployTargets = (lang: 'en' | 'de' = 'en') => TARGETS
  .map(([name, slug, how]) => ({ name, how: lang === 'de' ? TARGETS_DE[slug] ?? how : how, href: `/docs/self-hosting/${slug}/` }))
  .filter((t) => docExists(t.href));
