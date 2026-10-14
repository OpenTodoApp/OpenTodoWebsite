// Template tree -> OpenTodo's own export format (opentodo-export, version 1),
// which the released importer accepts as-is (website-content-hub design D1).
//
// Ids are name-based UUIDs (version 5) from the template slug and the path of
// each entity, so the same template always produces the same ids: importing it
// twice skips what exists instead of duplicating it. Due offsets (+0d, +2d, +1w,
// +1m) become dates relative to `today`, the build date.
// Field names follow the app's sync schema (internal/sync/ops.go).
import crypto from 'node:crypto';

/** UUID v5 in the URL namespace. */
export function uuidv5(name) {
  const ns = Buffer.from('6ba7b8119dad11d180b400c04fd430c8', 'hex');
  const h = crypto.createHash('sha1').update(Buffer.concat([ns, Buffer.from(name, 'utf8')])).digest();
  h[6] = (h[6] & 0x0f) | 0x50;
  h[8] = (h[8] & 0x3f) | 0x80;
  const x = h.subarray(0, 16).toString('hex');
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`;
}

const pad = (n) => String(n).padStart(2, '0');
const isoDay = (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;

/** "+3d" -> the date three days after `today`, as YYYY-MM-DD (calendar dates, UTC). */
export function resolveDue(offset, today) {
  const m = /^\+(\d+)([dwm])$/.exec(offset);
  if (!m) throw new Error(`invalid due offset "${offset}" (expected +Nd, +Nw or +Nm)`);
  const n = Number(m[1]);
  const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  if (m[2] === 'd') d.setUTCDate(d.getUTCDate() + n);
  if (m[2] === 'w') d.setUTCDate(d.getUTCDate() + 7 * n);
  if (m[2] === 'm') {
    const day = d.getUTCDate();
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() + n);
    const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
    d.setUTCDate(Math.min(day, last));
  }
  return isoDay(d);
}

const PALETTE = ['#059669', '#2563eb', '#d97706', '#7c3aed', '#db2777', '#0891b2'];

/**
 * @param {string} slug template slug, the id namespace
 * @param {{ labels?: {name:string,color?:string}[], projects: any[] }} tree
 * @param {{ today?: Date }} [opts]
 */
export function toExport(slug, tree, { today = new Date() } = {}) {
  const now = today.getTime();
  const id = (...path) => uuidv5(`https://open-todo.app/templates/${slug}/${path.join('/')}`);
  const labels = (tree.labels ?? []).map((l, i) => ({
    id: id('label', l.name), name: l.name, color: l.color ?? PALETTE[i % PALETTE.length], position: i + 1, created_at: now,
  }));
  const labelId = new Map(labels.map((l) => [l.name, l.id]));
  const projects = [], sections = [], tasks = [];

  const addTasks = (list, project, section, parent, path) => {
    list.forEach((t, i) => {
      const tPath = [...path, `${i}:${t.title}`];
      const task = {
        id: id('task', ...tPath),
        title: t.title,
        description: t.description ?? '',
        priority: t.priority ?? 4,
        position: i + 1,
        created_at: now,
        completed_at: null,
        labels: (t.labels ?? []).map((name) => {
          const l = labelId.get(name);
          if (!l) throw new Error(`template ${slug}: task "${t.title}" uses undeclared label "${name}"`);
          return l;
        }),
        project_id: project.id,
        parent_id: parent ? parent.id : null,
        section_id: section ? section.id : null,
      };
      if (t.due) task.due = t.time ? { date: resolveDue(t.due, today), time: t.time } : { date: resolveDue(t.due, today) };
      if (t.recurrence) task.recurrence = t.recurrence;
      if (t.estimate) task.estimate_minutes = t.estimate;
      tasks.push(task);
      addTasks(t.subtasks ?? [], project, section, task, tPath);
    });
  };

  tree.projects.forEach((p, pi) => {
    const project = { id: id('project', p.name), name: p.name, color: p.color ?? PALETTE[pi % PALETTE.length], position: pi + 1, archived: false, parent_id: null, created_at: now };
    projects.push(project);
    addTasks(p.tasks ?? [], project, null, null, [p.name]);
    (p.sections ?? []).forEach((s, si) => {
      const section = { id: id('section', p.name, s.name), name: s.name, project_id: project.id, position: si + 1, created_at: now };
      sections.push(section);
      addTasks(s.tasks ?? [], project, section, null, [p.name, s.name]);
    });
  });

  return { format: 'opentodo-export', version: 1, exportedAt: today.toISOString(), labels, projects, sections, tasks, reminders: [], views: [] };
}

/** Counts shown on a template page. */
export function summarise(doc) {
  return { projects: doc.projects.length, sections: doc.sections.length, tasks: doc.tasks.length, labels: doc.labels.length, recurring: doc.tasks.filter((t) => t.recurrence).length };
}
