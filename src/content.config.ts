import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Blog posts live in `src/content/blog/*.md` (filename = URL slug, date in frontmatter).
// NOTE: Astro 7 dropped legacy collections, so a `glob` loader is required —
// without it the collection silently builds as empty (`type: 'content'` no longer loads files).
// `published: false` means draft — filtered out at render time.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export const collections = { blog };
