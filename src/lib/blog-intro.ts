import type { Category } from './blog';

/** One line under each category heading. */
export const CATEGORY_INTRO: Record<Category, string> = {
  news: 'Announcements, milestones and OpenTodo out in the world.',
  releases: 'What each release brings, and why.',
  development: 'How OpenTodo is built: specs, design decisions and work in progress.',
  ownership: 'Essays on owning your tasks and your data.',
};
