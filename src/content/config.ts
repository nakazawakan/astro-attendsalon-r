import { defineCollection, z } from 'astro:content';

/** お知らせ: `src/content/news/` のファイル名（拡張子除く）が URL スラッグ。命名は投稿日の `YYYYMMDD` のみ。 */
const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullable().optional(),
    draft: z.boolean().default(false),
  }),
});

const column = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keyword: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullable().optional(),
    articleType: z.string().optional(),
    ymyl: z.enum(['no', 'suspected', 'yes']).default('no'),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { column, news };
