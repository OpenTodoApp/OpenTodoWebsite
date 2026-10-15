// "Which method fits you?" (website-templates-and-methods D4): a two-question
// decision tree rendered as static pages, so it works without JavaScript and every
// result has a shareable address. Each leaf names a guide and a template.
export interface Leaf { method: string; guide: string; template?: string; why: string; also?: string }
export interface Question { question: string; options: { slug: string; label: string; next: Question | Leaf }[] }

const leaf = (l: Leaf): Leaf => l;

export const QUIZ: Question = {
  question: 'What gets in the way most often?',
  options: [
    {
      slug: 'deciding', label: 'I never know what to do first',
      next: {
        question: 'How would you rather decide?',
        options: [
          { slug: 'urgent-important', label: 'By what is urgent and what is important', next: leaf({ method: 'The Eisenhower matrix', guide: 'eisenhower-matrix', template: 'weekly-review', why: 'Four saved views sort every task by urgency and importance, and a dashboard puts them side by side. You decide once a day, not all day.', also: 'getting-things-done' }) },
          { slug: 'one-thing', label: 'By picking one thing that matters most each day', next: leaf({ method: 'Eat the frog', guide: 'eat-the-frog', template: 'weekly-review', why: 'One P1 a day, done first, before the inbox gets a say. Priorities and a saved view make the frog impossible to miss.', also: 'time-blocking' }) },
          { slug: 'system', label: 'With a written system I can trust', next: leaf({ method: 'Getting Things Done', guide: 'getting-things-done', template: 'gtd-setup', why: 'Contexts as labels, lists as saved views, and a weekly review. The template builds the whole structure in one import.', also: 'weekly-review' }) },
        ],
      },
    },
    {
      slug: 'starting', label: 'I put things off and start late',
      next: {
        question: 'What helps you actually begin?',
        options: [
          { slug: 'short-bursts', label: 'Short bursts with a clear end', next: leaf({ method: 'The Pomodoro technique', guide: 'pomodoro', template: 'study-plan', why: 'Twenty-five minute estimates, Quick wins for the gaps, and a calendar that shows the bursts as blocks.', also: 'time-blocking' }) },
          { slug: 'hardest-first', label: 'Getting the hardest thing out of the way', next: leaf({ method: 'Eat the frog', guide: 'eat-the-frog', template: 'weekly-review', why: 'Pick tonight, do first thing tomorrow, before anything else gets a vote.', also: 'pomodoro' }) },
          { slug: 'see-time', label: 'Seeing the time on a calendar', next: leaf({ method: 'Time blocking', guide: 'time-blocking', template: 'study-plan', why: 'Give tasks an estimate and a slot, and the day header tells you whether the plan is honest.', also: 'pomodoro' }) },
        ],
      },
    },
    {
      slug: 'overwhelm', label: 'Too much lands on me and things get lost',
      next: {
        question: 'Which habit sounds doable?',
        options: [
          { slug: 'daily-inbox', label: 'Emptying one inbox every day', next: leaf({ method: 'Inbox zero for tasks', guide: 'inbox-zero-for-tasks', template: 'gtd-setup', why: 'Capture from anywhere, then four decisions a day: do, date, delegate, drop.', also: 'weekly-review' }) },
          { slug: 'weekly-ritual', label: 'One longer tidy-up a week', next: leaf({ method: 'The weekly review', guide: 'weekly-review', template: 'weekly-review', why: 'Thirty minutes every Friday that keep the list trustworthy, with a template that repeats on its own.', also: 'getting-things-done' }) },
          { slug: 'folders', label: 'Fewer, clearer places for things', next: leaf({ method: 'The PARA method', guide: 'para-method', template: 'gtd-setup', why: 'Projects, Areas, Resources and Archives as four parent projects, with archiving built in.', also: 'inbox-zero-for-tasks' }) },
        ],
      },
    },
    {
      slug: 'together', label: 'I work with others and we lose track',
      next: {
        question: 'What does the group need most?',
        options: [
          { slug: 'see-flow', label: 'Seeing where everything stands', next: leaf({ method: 'Kanban', guide: 'kanban', template: 'product-launch', why: 'Sections as columns, cards you drag, a limit on work in progress, and everyone sees the same board.', also: 'weekly-review' }) },
          { slug: 'clear-goals', label: 'Agreeing on what done looks like', next: leaf({ method: 'SMART goals', guide: 'smart-goals', template: 'new-job', why: 'A goal as a project, measurable subtasks, a date, and the progress shown on the parent.', also: 'kanban' }) },
          { slug: 'shared-review', label: 'A regular moment to catch up', next: leaf({ method: 'The weekly review, together', guide: 'weekly-review', template: 'weekly-review', why: 'A shared review project that repeats, plus the Activity feed to see what changed since last time.', also: 'kanban' }) },
        ],
      },
    },
  ],
};

export const isLeaf = (n: Question | Leaf): n is Leaf => 'method' in n;

/** Every path through the tree: [] (the first question), [a], [a, b] (a result). */
export function paths(q: Question = QUIZ, prefix: string[] = []): { answers: string[]; node: Question | Leaf; trail: string[] }[] {
  const out: { answers: string[]; node: Question | Leaf; trail: string[] }[] = [];
  for (const o of q.options) {
    const answers = [...prefix, o.slug];
    out.push({ answers, node: o.next, trail: [] });
    if (!isLeaf(o.next)) out.push(...paths(o.next, answers));
  }
  return out;
}

/** The labels of the answers chosen so far, for the trail line. */
export function trail(answers: string[]): string[] {
  const labels: string[] = [];
  let node: Question | Leaf = QUIZ;
  for (const a of answers) {
    if (isLeaf(node)) break;
    const o: Question['options'][number] | undefined = node.options.find((x) => x.slug === a);
    if (!o) break;
    labels.push(o.label);
    node = o.next;
  }
  return labels;
}
