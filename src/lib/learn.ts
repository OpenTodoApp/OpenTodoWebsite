// The Learn library (website-learn D1): guides, how-tos, toolkit pieces, switch guides and
// templates as one list, each entry with its type, topic and length. Built from the content
// collections at build time, so the counts and rows follow what is published.
import { getCollection } from 'astro:content';
import { HOWTO_GROUPS } from '../content/schemas.mjs';
import { TOPICS } from './topics.mjs';

export type LearnType = 'setup' | 'switch' | 'methods' | 'how-tos' | 'templates';

/** The types in the order the library lists them, with their page, label and row icon. */
export const LEARN_TYPES: { key: LearnType; title: string; label: string; icon: string; lede: string }[] = [
  { key: 'setup', title: 'Start here', label: 'Setup', icon: 'rocket', lede: 'Setting OpenTodo up for yourself, a household or a small team, and keeping the server healthy.' },
  { key: 'switch', title: 'Moving from another app', label: 'Switch', icon: 'folder-input', lede: 'What comes across from the app you use now, and how to import it.' },
  { key: 'methods', title: 'Methods', label: 'Method', icon: 'compass', lede: 'Well-known ways of working, set up with OpenTodo.' },
  { key: 'how-tos', title: 'How-tos', label: 'How-to', icon: 'list-checks', lede: 'One task each, in numbered steps.' },
  { key: 'templates', title: 'Templates', label: 'Template', icon: 'layout-template', lede: 'Ready-made lists you can import.' },
];

export interface LearnEntry {
  type: LearnType;
  title: string;
  summary: string;
  href: string;
  /** The first topic whose tags the entry carries; empty when none does. */
  topic: string;
  /** Reading time, minutes to do it, or the template's layout. */
  length: string;
  /** How-tos only: their group, in HOWTO_GROUPS order. */
  group?: string;
  tags: string[];
  order: number;
}

const topicOf = (tags: string[] = []) => TOPICS.find((t) => t.tags.some((tag) => tags.includes(tag)));
/** Minutes to read a body at about 200 words a minute, never less than one. */
const readTime = (body = '') => `${Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200))} min read`;
const LAYOUT: Record<string, string> = { list: 'List', board: 'Board', calendar: 'Calendar' };

export async function learnEntries(): Promise<LearnEntry[]> {
  const live = <T extends { data: { draft?: boolean } }>(e: T) => !e.data.draft;
  const [toolkit, switches, guides, howtos, templates] = await Promise.all([
    getCollection('toolkit', live), getCollection('switch'), getCollection('guides', live), getCollection('howto', live), getCollection('templates'),
  ]);
  const entry = (type: LearnType, href: string, d: { title: string; summary: string; order: number; tags?: string[] }, length: string, group?: string): LearnEntry =>
    ({ type, href, title: d.title, summary: d.summary, order: d.order, tags: d.tags ?? [], topic: topicOf(d.tags)?.title ?? '', length, group });
  const all = [
    ...toolkit.map((e) => entry('setup', `/toolkit/${e.id}/`, e.data, readTime(e.body))),
    ...switches.map((e) => entry('switch', `/switch/${e.id}/`, e.data, 'Switch guide')),
    ...guides.map((e) => entry('methods', `/guides/${e.id}/`, e.data, readTime(e.body))),
    ...howtos.map((e) => entry('how-tos', `/how-to/${e.id}/`, e.data, e.data.minutes ? `${e.data.minutes} min` : '', e.data.group)),
    ...templates.map((e) => entry('templates', `/templates/${e.id}/`, e.data, LAYOUT[e.data.layout] ?? '')),
  ];
  const groupIndex = (g?: string) => (g ? HOWTO_GROUPS.indexOf(g) : 0);
  return all.sort((a, b) => groupIndex(a.group) - groupIndex(b.group) || a.order - b.order || a.title.localeCompare(b.title));
}

/** Entries that carry one of a topic's tags. */
export const inTopic = (entries: LearnEntry[], slug: string) => {
  const topic = TOPICS.find((t) => t.slug === slug);
  return topic ? entries.filter((e) => e.tags.some((t) => topic.tags.includes(t))) : [];
};
