// Front matter schemas of the content collections, in plain ESM so the unit tests
// can run them without Astro. Every rule that keeps content true over time lives
// here and fails the build, naming the entry and the field:
//   - comparisons: a "checked on" date no older than 180 days, a docs source for
//     every row where OpenTodo has the feature, at least one gap (website-platform
//     D4, website-switcher-pages D2)
//   - templates, guides, toolkit: a last-reviewed date no older than one
//     year, sources that resolve in the bundle's docs (website-content-hub D1, D3)
import { z } from 'astro/zod';

const DAY = 24 * 60 * 60 * 1000;
export const COMPARE_MAX_AGE_DAYS = 180;
export const CONTENT_MAX_AGE_DAYS = 365;

const isoDay = (d) => d.toISOString().slice(0, 10);

/** A date that must not be older than `days` at build time. */
const freshDate = (field, days, today) =>
  z.preprocess(
    (v) => (v === undefined || v === null || v instanceof Date ? v ?? undefined : new Date(String(v))),
    z.date({ error: (iss) => (iss.input === undefined ? `"${field}" is required` : `"${field}" must be a date (YYYY-MM-DD)`) }),
  ).superRefine((d, ctx) => {
    const age = Math.floor((today().getTime() - d.getTime()) / DAY);
    if (age > days) ctx.addIssue({ code: 'custom', message: `stale: "${field}" is ${isoDay(d)}, ${age} days ago (limit ${days} days). Check the content again and update the date.` });
    if (age < -1) ctx.addIssue({ code: 'custom', message: `"${field}" ${isoDay(d)} is in the future` });
  });

/** A /docs/ path that must exist in the pinned bundle. */
const docPath = (docExists) =>
  z.string().refine((p) => p.startsWith('/docs/'), { message: 'must be a site path starting with /docs/' })
    .refine((p) => !p.startsWith('/docs/') || docExists(p), { error: (iss) => `${iss.input} is not a page of the pinned bundle's docs` });

const verdict = z.enum(['yes', 'partial', 'no']);

export function compareSchema({ docExists, today = () => new Date() }) {
  const row = z.object({
    feature: z.string().min(1),
    them: verdict,
    us: verdict,
    note: z.string().optional(),
    sourceDoc: docPath(docExists).optional(),
  });
  return z.object({
    competitor: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    checkedOn: freshDate('checkedOn', COMPARE_MAX_AGE_DAYS, today),
    audience: z.string().min(1),
    cost: z.object({ them: z.string().min(1), us: z.string().min(1) }),
    rows: z.array(row).min(4),
    gaps: z.array(z.object({ title: z.string().min(1), detail: z.string().min(1) })).min(1, { message: 'every comparison lists where the competitor is ahead ("gaps")' }),
    importFormat: z.string().min(1),
    switchGuide: z.string().startsWith('/docs/').optional(),
    order: z.number().default(0),
  }).superRefine((data, ctx) => {
    data.rows.forEach((r, i) => {
      if (r.us !== 'no' && !r.sourceDoc) {
        ctx.addIssue({ code: 'custom', path: ['rows', i, 'sourceDoc'], message: `row "${r.feature}" claims an OpenTodo feature without a documentation link (sourceDoc)` });
      }
    });
    if (!data.rows.some((r) => rank(r.them) > rank(r.us))) {
      ctx.addIssue({ code: 'custom', path: ['rows'], message: `the table needs at least one row where ${data.competitor} is ahead` });
    }
    if (!data.rows.some((r) => rank(r.us) > rank(r.them))) {
      ctx.addIssue({ code: 'custom', path: ['rows'], message: 'the table needs at least one row where OpenTodo is ahead' });
    }
  });
}
const rank = (v) => ({ no: 0, partial: 1, yes: 2 })[v];

/**
 * Tags shared by guides, templates, how-tos and posts (website-templates-and-methods
 * D3, D5): the methods catalogue filters by them and the topic pages collect by them.
 */
export const CONTENT_TAGS = ['focus', 'procrastination', 'prioritisation', 'time-management', 'task-management', 'teamwork', 'habits', 'goals', 'ownership'];
export const TAG_LABELS = { focus: 'Focus', procrastination: 'Procrastination', prioritisation: 'Prioritisation', 'time-management': 'Time management', 'task-management': 'Task management', teamwork: 'Teamwork', habits: 'Habits', goals: 'Goals', ownership: 'Ownership' };
const tags = () => z.array(z.enum(CONTENT_TAGS, { error: () => `"tags" must be among ${CONTENT_TAGS.join(', ')}` })).default([]);

/** Shared by guides and toolkit pieces. */
export function articleSchema({ docExists, today = () => new Date(), needsSources = true }) {
  return z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    lastReviewed: freshDate('lastReviewed', CONTENT_MAX_AGE_DAYS, today),
    sources: needsSources ? z.array(docPath(docExists)).min(1) : z.array(docPath(docExists)).default([]),
    templates: z.array(z.string()).default([]),
    tags: tags(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  });
}

/** Audiences and layouts of the template gallery's filters (website-templates-and-methods D1). */
export const TEMPLATE_AUDIENCES = ['Everyone', 'Households', 'Professionals', 'Students', 'Teams'];
export const TEMPLATE_LAYOUTS = ['list', 'board', 'calendar'];
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Groups of the how-to collection (website-help-and-howtos D2), in the order the index shows them. */
export const HOWTO_GROUPS = ['Get started', 'Every day', 'Phone and notifications', 'Together', 'Fix it', 'Run the server'];

/**
 * A how-to: one task, numbered steps, sourced like a guide. `shot` names a
 * screenshot of the bundle (checked by the page, since the manifest is not
 * available here); `minutes` is how long the task takes.
 */
export function howtoSchema({ docExists, today = () => new Date() }) {
  return articleSchema({ docExists, today }).extend({
    group: z.enum(HOWTO_GROUPS, { error: () => `"group" must be one of ${HOWTO_GROUPS.join(', ')}` }),
    audience: z.enum(['user', 'operator']).default('user'),
    shot: z.string().min(1).optional(),
    minutes: z.number().int().positive().max(120).optional(),
    related: z.array(z.string()).default([]),
  });
}

/**
 * A switch page (website-help-and-howtos D4): how to leave a named app for
 * OpenTodo with the importers of the pinned release. Facts about the other app
 * carry a "checked on" date like a comparison; every OpenTodo statement in the
 * body links to the docs (claim lint).
 */
export function switchSchema({ docExists, today = () => new Date() }) {
  return z.object({
    app: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    checkedOn: freshDate('checkedOn', COMPARE_MAX_AGE_DAYS, today),
    sources: z.array(docPath(docExists)).min(1),
    importFormat: z.string().min(1),
    compare: z.string().optional(),
    terms: z.array(z.object({ them: z.string().min(1), us: z.string().min(1), note: z.string().optional() })).min(3, { message: 'a switch page maps at least three terms' }),
    keeps: z.array(z.string().min(1)).min(1),
    drops: z.array(z.string().min(1)).min(1, { message: 'say honestly what does not come across ("drops")' }),
    order: z.number().default(0),
  });
}

/** A relative due offset: +0d (today), +2d, +1w, +1m. */
export const DUE_OFFSET = /^\+(\d+)([dwm])$/;

export function templateSchema({ docExists, today = () => new Date() }) {
  const task = z.lazy(() =>
    z.object({
      title: z.string().min(1).max(500),
      description: z.string().optional(),
      priority: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
      due: z.string().regex(DUE_OFFSET, 'due must be a relative offset such as +0d, +2d, +1w or +1m').optional(),
      time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'time must be HH:MM').optional(),
      recurrence: z.string().optional(),
      estimate: z.number().int().positive().optional(),
      labels: z.array(z.string()).default([]),
      subtasks: z.array(task).default([]),
    }).refine((t) => !t.time || t.due, { message: 'a task with a time needs a due offset' }),
  );
  const project = z.object({
    name: z.string().min(1),
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    tasks: z.array(task).default([]),
    sections: z.array(z.object({ name: z.string().min(1), tasks: z.array(task).default([]) })).default([]),
  });
  return z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.enum(['Personal', 'Home', 'Work', 'Method']),
    audience: z.enum(TEMPLATE_AUDIENCES, { error: () => `"audience" must be one of ${TEMPLATE_AUDIENCES.join(', ')}` }).default('Everyone'),
    layout: z.enum(TEMPLATE_LAYOUTS, { error: () => `"layout" must be one of ${TEMPLATE_LAYOUTS.join(', ')}` }).default('list'),
    howToUse: z.array(z.string().min(1)).min(1, { message: 'a template says how to use it ("howToUse", at least one step)' }),
    makeItYours: z.array(z.string().min(1)).min(1, { message: 'a template says how to adapt it ("makeItYours", at least one idea)' }),
    author: z.string().min(1).default('raffaele'),
    tags: tags(),
    lastReviewed: freshDate('lastReviewed', CONTENT_MAX_AGE_DAYS, today),
    sources: z.array(docPath(docExists)).min(1),
    guide: z.string().optional(),
    labels: z.array(z.object({ name: z.string().min(1), color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional() })).default([]),
    projects: z.array(project).min(1),
    order: z.number().default(0),
  }).superRefine((data, ctx) => {
    const known = new Set(data.labels.map((l) => l.name));
    const walk = (tasks, where) => tasks.forEach((t, i) => {
      for (const l of t.labels ?? []) if (!known.has(l)) ctx.addIssue({ code: 'custom', path: [...where, i, 'labels'], message: `label "${l}" is not declared in "labels"` });
      walk(t.subtasks ?? [], [...where, i, 'subtasks']);
    });
    data.projects.forEach((p, pi) => {
      walk(p.tasks, ['projects', pi, 'tasks']);
      p.sections.forEach((s, si) => walk(s.tasks, ['projects', pi, 'sections', si, 'tasks']));
    });
  });
}

/** @type {['news', 'releases', 'development', 'ownership']} */
export const BLOG_CATEGORIES = ['news', 'releases', 'development', 'ownership'];
/** Slugs that collide with blog routes (website-blog design D1). */
export const RESERVED_BLOG_SLUGS = ['page', 'category', 'feed.xml'];
const VERSION = /^\d+\.\d+\.\d+$/;

/**
 * Blog posts (website-blog design D1). `releaseExists(version)` answers whether
 * the version is in the pinned bundle's changelog; `image` is Astro's image()
 * helper for covers (a plain string is accepted in unit tests).
 * @param {{ releaseExists: (v: string) => boolean, image?: () => import('astro/zod').ZodType, author?: import('astro/zod').ZodType }} opts
 */
export function blogSchema({ releaseExists, image = () => z.string(), author = z.string().min(1) }) {
  const version = (field) =>
    z.string().regex(VERSION, `"${field}" must be a version like 0.3.0`)
      .refine((v) => releaseExists(v), { error: (iss) => `"${field}" ${iss.input} is not a release in the pinned bundle's changelog` });
  return z.object({
    title: z.string().min(1),
    summary: z.string().min(1).max(300),
    publishedAt: z.preprocess(
      (v) => (v === undefined || v === null || v instanceof Date ? v ?? undefined : new Date(String(v))),
      z.date({ error: (iss) => (iss.input === undefined ? '"publishedAt" is required' : '"publishedAt" must be a date (YYYY-MM-DD)') }),
    ),
    updatedAt: z.coerce.date().optional(),
    author,
    category: z.enum(BLOG_CATEGORIES, { error: () => `"category" must be one of ${BLOG_CATEGORIES.join(', ')}` }),
    cover: image().optional(),
    coverAlt: z.string().min(1).optional(),
    release: version('release').optional(),
    inDevelopment: z.boolean().default(false),
    shippedIn: version('shippedIn').optional(),
    tags: tags(),
    draft: z.boolean().default(false),
  }).superRefine((d, ctx) => {
    if (d.cover && !d.coverAlt) ctx.addIssue({ code: 'custom', path: ['coverAlt'], message: 'a cover image needs "coverAlt" (its text alternative)' });
    if (d.category === 'releases' && !d.release) ctx.addIssue({ code: 'custom', path: ['release'], message: 'a Releases post must name the released version in "release"' });
    if (d.category !== 'releases' && d.release) ctx.addIssue({ code: 'custom', path: ['release'], message: '"release" is only for posts in the Releases category' });
    if (d.shippedIn && !d.inDevelopment) ctx.addIssue({ code: 'custom', path: ['shippedIn'], message: '"shippedIn" is only for posts marked "inDevelopment"' });
    if (d.updatedAt && d.updatedAt < d.publishedAt) ctx.addIssue({ code: 'custom', path: ['updatedAt'], message: '"updatedAt" is before "publishedAt"' });
  });
}

/** The folder name of a post must not collide with a blog route. */
export const blogSlugProblem = (slug) =>
  RESERVED_BLOG_SLUGS.includes(slug) ? `blog post folder "${slug}" collides with the route /blog/${slug}/; rename it` : null;

/**
 * One author in src/content/authors.json (website-maintainer-and-proof D3, D4): a name,
 * a one-sentence bio, a link, and optionally a photo (a file in this repository, never
 * a remote image, so no third-party request) and a short first-person note for /about/.
 */
export const NOTE_MAX_WORDS = 120;
export const authorSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(1),
  url: z.string().url(),
  photo: z.string().regex(/^src\/assets\/authors\/[\w.-]+\.(jpe?g|png|webp|avif)$/, 'a photo is a file under src/assets/authors/, not a URL').optional(),
  note: z.string().refine((s) => s.trim().split(/\s+/).length <= NOTE_MAX_WORDS, `a note has at most ${NOTE_MAX_WORDS} words`).optional(),
});
export const authorsSchema = z.record(z.string(), authorSchema);
