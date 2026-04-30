import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { SITEMAP_XML_STATIC_PATHS } from '../lib/sitemap-urls';

type SitemapUrl = { path: string; lastmod?: string };

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

/**
 * 検索エンジン向け sitemap.xml。
 * HTML の `/sitemap/` ページ（`getHtmlSitemapNavEntries`）とはデータ源を分け、こちらは全公開 URL を列挙する。
 */
export async function GET({ site }: APIContext) {
  const baseUrl = site ?? new URL('https://attendsalon-r.com');

  const articles: CollectionEntry<'column'>[] = await getCollection(
    'column',
    (entry: CollectionEntry<'column'>) => !entry.data.draft,
  );
  const articlePaths: SitemapUrl[] = articles.map((article) => ({
    path: `/column/${article.slug}/`,
    lastmod: (article.data.updatedAt ?? article.data.publishedAt).toISOString().slice(0, 10),
  }));

  const newsItems: CollectionEntry<'news'>[] = await getCollection(
    'news',
    (entry: CollectionEntry<'news'>) => !entry.data.draft,
  );
  const newsPaths: SitemapUrl[] = newsItems.map((item) => ({
    path: `/news/${item.slug}/`,
    lastmod: (item.data.updatedAt ?? item.data.publishedAt).toISOString().slice(0, 10),
  }));

  const urls: SitemapUrl[] = [
    ...SITEMAP_XML_STATIC_PATHS.map((path) => ({ path })),
    ...newsPaths,
    ...articlePaths,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ path, lastmod }) => {
    const loc = escapeXml(new URL(path, baseUrl).toString());
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
