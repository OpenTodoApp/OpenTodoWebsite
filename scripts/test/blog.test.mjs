// Blog rules (website-blog task 1.3).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { feedItem, isPublished, published, readingMinutes, relatedPosts, seriesNeighbours, seriesParts, seriesProblems, seriesUrl } from '../../src/lib/blog-core.mjs';

const today = new Date('2026-10-14T09:00:00Z');
const post = (id, over = {}) => ({ id, data: { title: id, summary: 's', publishedAt: new Date('2026-10-01'), category: 'news', draft: false, ...over } });

test('drafts and future-dated posts are not published', () => {
  assert.equal(isPublished(post('a'), today), true);
  assert.equal(isPublished(post('b', { draft: true }), today), false);
  assert.equal(isPublished(post('c', { publishedAt: new Date('2026-10-15') }), today), false);
  assert.equal(isPublished(post('d', { publishedAt: new Date('2026-10-14') }), today), true);
});

test('published posts are newest first', () => {
  const list = published([post('old', { publishedAt: new Date('2026-01-01') }), post('new', { publishedAt: new Date('2026-10-10') }), post('draft', { draft: true })], today);
  assert.deepEqual(list.map((p) => p.id), ['new', 'old']);
});

test('reading time is words / 220, rounded up, at least one minute', () => {
  assert.equal(readingMinutes('word '.repeat(220)), 1);
  assert.equal(readingMinutes('word '.repeat(221)), 2);
  assert.equal(readingMinutes(''), 1);
  assert.equal(readingMinutes('word '.repeat(200) + '```\n' + 'code '.repeat(500) + '\n```'), 1);
});

test('related posts share the category and exclude the post itself', () => {
  const me = post('me', { category: 'development' });
  const all = [me, post('a', { category: 'development' }), post('b', { category: 'news' }), post('c', { category: 'development', publishedAt: new Date('2026-10-05') }), post('d', { category: 'development' }), post('e', { category: 'development' })];
  const rel = relatedPosts(me, all);
  assert.equal(rel.length, 3);
  assert.ok(rel.every((p) => p.data.category === 'development' && p.id !== 'me'));
  assert.equal(rel[0].id, 'c');
});

test('feed items link to the post', () => {
  assert.deepEqual(feedItem(post('hello')), { title: 'hello', description: 's', link: '/blog/hello/', pubDate: new Date('2026-10-01') });
});

// Series (website-blog-series task 1.4).
const part = (id, n, over = {}) => post(id, { series: 'in-practice', part: n, ...over });

test('a part number used twice in a series is a problem, drafts included', () => {
  assert.deepEqual(seriesProblems([part('a', 1), part('b', 2), post('c'), part('d', 1, { series: 'other' })]), []);
  const problems = seriesProblems([part('a', 1), part('b', 1, { draft: true })]);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /"a" and "b" are both part 1 of series "in-practice"/);
});

test('a series lists its published parts in part order', () => {
  const live = published([part('two', 2, { publishedAt: new Date('2026-10-08') }), part('one', 1), part('three', 3, { draft: true }), post('other')], today);
  assert.deepEqual(seriesParts('in-practice', live).map((p) => p.id), ['one', 'two']);
  assert.deepEqual(seriesParts('nothing', live), []);
  assert.equal(seriesUrl('in-practice'), '/blog/series/in-practice/');
});

test('a part links to its published neighbours only', () => {
  const live = published([part('one', 1), part('two', 2), part('three', 3, { draft: true }), part('four', 4, { publishedAt: new Date('2026-12-01') })], today);
  const two = live.find((p) => p.id === 'two');
  assert.equal(seriesNeighbours(two, live).previous.id, 'one');
  assert.equal(seriesNeighbours(two, live).next, undefined);
  assert.deepEqual(seriesNeighbours(post('alone'), live), {});
});
