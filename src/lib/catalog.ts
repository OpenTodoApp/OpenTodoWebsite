// The rails of the two catalogs (website-catalog D1): Features by group, Learn by type and topic.
import { featureGroups } from './features';
import { p as strings, href as hrefIn } from '../i18n/path/index.mjs';
import { LEARN_TYPES, inTopic, type LearnEntry } from './learn';
import { TOPICS } from './topics.mjs';
import type { RailSection } from '../components/catalog/Catalog.astro';

export const featuresRail = (lang: 'en' | 'de' = 'en'): RailSection[] => {
  const s = strings(lang).features;
  const to = hrefIn(lang);
  return [
    { items: [{ label: s.overview, href: to('/features/') }, ...featureGroups(lang).map((g) => ({ label: g.title, href: to(`/features/${g.key}/`), count: g.items.length }))] },
    { title: s.also, items: [{ label: s.learn, href: '/learn/' }, { label: s.underTheHood, href: '/under-the-hood/' }] },
  ];
};

export const learnRail = (all: LearnEntry[]): RailSection[] => [
  { items: [{ label: 'Overview', href: '/learn/' }, ...LEARN_TYPES.map((t) => ({ label: t.title, href: `/learn/${t.key}/`, count: all.filter((e) => e.type === t.key).length }))] },
  { title: 'Topics', items: TOPICS.map((t) => ({ label: t.title, href: `/learn/topic/${t.slug}/`, count: inTopic(all, t.slug).length })) },
  { title: 'Also', items: [{ label: 'Which method fits you?', href: '/guides/quiz/' }, { label: 'Features', href: '/features/' }, { label: 'Docs', href: '/docs/' }] },
];
