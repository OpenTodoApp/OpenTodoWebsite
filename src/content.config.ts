import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docExists } from './lib/bundle';
import { articleSchema, compareSchema, templateSchema } from './content/schemas.mjs';

const md = (base: string) => glob({ pattern: '**/[^_]*.md', base: `./src/content/${base}` });

export const collections = {
  compare: defineCollection({ loader: md('compare'), schema: compareSchema({ docExists }) }),
  templates: defineCollection({ loader: md('templates'), schema: templateSchema({ docExists }) }),
  guides: defineCollection({ loader: md('guides'), schema: articleSchema({ docExists }) }),
  toolkit: defineCollection({ loader: md('toolkit'), schema: articleSchema({ docExists }) }),
  essays: defineCollection({ loader: md('essays'), schema: articleSchema({ docExists, needsSources: false }) }),
};
