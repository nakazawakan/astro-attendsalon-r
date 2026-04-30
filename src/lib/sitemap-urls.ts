import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/** `sitemap.xml` と HTML サイトマップで共有する静的パス（末尾スラッシュ統一） */
export const SITEMAP_STATIC_PATHS: readonly string[] = [
  '/',
  '/trainer/',
  '/faq/',
  '/company/',
  '/contact/',
  '/contact/thanks/',
  '/request/',
  '/request/thanks/',
  '/news/',
  '/column/',
  '/philosophy/',
  '/privacy-policy/',
  '/comming-soon/',
  '/sitemap/',
] as const;

export interface SitemapNavEntry {
  path: string;
  label: string;
}

const STATIC_LABELS: Record<string, string> = {
  '/': 'トップ',
  '/trainer/': '講師紹介',
  '/faq/': 'よくある質問',
  '/company/': '運営者情報',
  '/contact/': 'お問い合わせ',
  '/contact/thanks/': 'お問い合わせ完了',
  '/request/': '資料請求',
  '/request/thanks/': '資料請求完了',
  '/news/': 'お知らせ（一覧）',
  '/column/': 'お役立ち情報（一覧）',
  '/philosophy/': '研修ポリシー',
  '/privacy-policy/': 'プライバシーポリシー',
  '/comming-soon/': '準備中のご案内',
  '/sitemap/': 'サイトマップ（本ページ）',
};

export function getStaticSitemapNavEntries(): SitemapNavEntry[] {
  return SITEMAP_STATIC_PATHS.map((path) => ({
    path,
    label: STATIC_LABELS[path] ?? path,
  }));
}

export async function getNewsSitemapNavEntries(): Promise<SitemapNavEntry[]> {
  const items: CollectionEntry<'news'>[] = await getCollection(
    'news',
    (entry: CollectionEntry<'news'>) => !entry.data.draft,
  );
  return items
    .slice()
    .sort(
      (a, b) =>
        b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf() ||
        a.slug.localeCompare(b.slug),
    )
    .map((item) => ({
      path: `/news/${item.slug}/`,
      label: item.data.title,
    }));
}

export async function getColumnSitemapNavEntries(): Promise<SitemapNavEntry[]> {
  const articles: CollectionEntry<'column'>[] = await getCollection(
    'column',
    (entry: CollectionEntry<'column'>) => !entry.data.draft,
  );
  return articles
    .slice()
    .sort(
      (a, b) =>
        b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf() ||
        a.slug.localeCompare(b.slug),
    )
    .map((article) => ({
      path: `/column/${article.slug}/`,
      label: article.data.title,
    }));
}
