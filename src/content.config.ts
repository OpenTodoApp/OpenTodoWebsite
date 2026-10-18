import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docExists, releases } from './lib/bundle';
import authors from './content/authors.json';
import { articleSchema, authorsSchema, blogSchema, blogSlugProblem, compareSchema, howtoSchema, switchSchema, templateSchema } from './content/schemas.mjs';

const md = (base: string) => glob({ pattern: '**/[^_]*.md', base: `./src/content/${base}` });

// One folder per post (website-blog D1): src/content/blog/<slug>/index.md, images beside it.
const blogLoader = glob({
  pattern: '*/index.md',
  base: './src/content/blog',
  generateId: ({ entry }) => {
    const slug = entry.split('/')[0];
    const problem = blogSlugProblem(slug);
    if (problem) throw new Error(problem);
    return slug;
  },
});
const releaseExists = (v: string) => releases.some((r) => r.version === v);
// A key of src/content/authors.json; checked here so a typo fails the build (Astro's reference() only logs).
// The authors file itself (website-maintainer-and-proof D3): a bad photo path or an over-long note fails the build.
const authorsCheck = authorsSchema.safeParse(authors);
if (!authorsCheck.success) throw new Error(`src/content/authors.json: ${authorsCheck.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
const authorKey = z.string().refine((k) => k in authors, { error: (iss) => `"author" ${iss.input} is not in src/content/authors.json` });

export const collections = {
  compare: defineCollection({ loader: md('compare'), schema: compareSchema({ docExists }) }),
  templates: defineCollection({ loader: md('templates'), schema: templateSchema({ docExists }) }),
  guides: defineCollection({ loader: md('guides'), schema: articleSchema({ docExists }) }),
  toolkit: defineCollection({ loader: md('toolkit'), schema: articleSchema({ docExists }) }),
  howto: defineCollection({ loader: md('howto'), schema: howtoSchema({ docExists }) }),
  switch: defineCollection({ loader: md('switch'), schema: switchSchema({ docExists }) }),
  authors: defineCollection({
    loader: file('src/content/authors.json'),
    schema: z.object({ name: z.string().min(1), bio: z.string().min(1), url: z.url() }),
  }),
  blog: defineCollection({
    loader: blogLoader,
    schema: ({ image }) => blogSchema({ releaseExists, image, author: authorKey }),
  }),
};
