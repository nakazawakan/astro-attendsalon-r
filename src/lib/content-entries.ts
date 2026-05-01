import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export async function listPublishedColumnEntries(): Promise<CollectionEntry<'column'>[]> {
  return (await getCollection('column', (entry: CollectionEntry<'column'>) => !entry.data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

export async function listPublishedNewsEntries(): Promise<CollectionEntry<'news'>[]> {
  return (await getCollection('news', (entry: CollectionEntry<'news'>) => !entry.data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}
