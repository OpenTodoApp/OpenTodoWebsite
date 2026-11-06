// The rails of the two catalogs (website-catalog D1): Features by group, Learn by type and topic.
import { featureGroups } from './features';
import { LEARN_TYPES, inTopic, type LearnEntry } from './learn';
import { TOPICS } from './topics.mjs';
import type { RailSection } from '../components/catalog/Catalog.astro';

export const featuresRail = (): RailSection[] => [
  { items: [{ label: 'Overview', href: '/features/' }, ...featureGroups().map((g) => ({ label: g.title, href: `/features/${g.key}/`, count: g.items.length }))] },
  { title: 'Also', items: [{ label: 'Learn', href: '/learn/' }, { label: 'Under the hood', href: '/under-the-hood/' }] },
];

export const learnRail = (all: LearnEntry[]): RailSection[] => [
  { items: [{ label: 'Overview', href: '/learn/' }, ...LEARN_TYPES.map((t) => ({ label: t.title, href: `/learn/${t.key}/`, count: all.filter((e) => e.type === t.key).length }))] },
  { title: 'Topics', items: TOPICS.map((t) => ({ label: t.title, href: `/learn/topic/${t.slug}/`, count: inTopic(all, t.slug).length })) },
  { title: 'Also', items: [{ label: 'Which method fits you?', href: '/guides/quiz/' }, { label: 'Features', href: '/features/' }, { label: 'Docs', href: '/docs/' }] },
];
