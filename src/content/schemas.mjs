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

/** Shared by guides and toolkit pieces. */
export function articleSchema({ docExists, today = () => new Date(), needsSources = true }) {
  return z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    lastReviewed: freshDate('lastReviewed', CONTENT_MAX_AGE_DAYS, today),
    sources: needsSources ? z.array(docPath(docExists)).min(1) : z.array(docPath(docExists)).default([]),
    templates: z.array(z.string()).default([]),
    order: z.number().default(0),
    draft: z.boolean().default(false),
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
