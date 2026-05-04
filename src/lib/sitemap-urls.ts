/**
 * サイトマップは用途が二系統ある。
 *
 * - **sitemap.xml** … 検索エンジン向け。静的パス＋コンテンツ（news / column）の URL をすべて含める。
 * - **`/sitemap/` HTML** … 人間向けナビ。掲載リンクは意図的に絞る（一覧のみ・サンクス除外など）。
 */

/** `sitemap.xml` に含める静的パス（thanks・sitemap 自身・準備中ページも含む。末尾スラッシュ統一） */
export const SITEMAP_XML_STATIC_PATHS: readonly string[] = ["/", "/reason/", "/trainer/", "/faq/", "/company/", "/contact/", "/contact/thanks/", "/request/", "/request/thanks/", "/news/", "/column/", "/philosophy/", "/privacy-policy/", "/comming-soon/", "/sitemap/"] as const;

/** `/sitemap/` ページのリンク一覧に出すパスのみ（個別記事・サンクスは載せない） */
export const HTML_SITEMAP_NAV_PATHS: readonly string[] = ["/", "/reason/", "/trainer/", "/faq/", "/company/", "/contact/", "/request/", "/news/", "/column/", "/philosophy/", "/privacy-policy/"] as const;

export interface SitemapNavEntry {
  path: string;
  label: string;
}

const NAV_LABELS: Record<string, string> = {
  "/": "トップ",
  "/reason/": "選ばれる理由",
  "/trainer/": "講師紹介",
  "/faq/": "よくある質問",
  "/company/": "運営者情報",
  "/contact/": "研修の無料相談",
  "/contact/thanks/": "研修の無料相談（送信完了）",
  "/request/": "資料請求",
  "/request/thanks/": "資料請求完了",
  "/news/": "お知らせ",
  "/column/": "お役立ち情報",
  "/philosophy/": "研修ポリシー",
  "/privacy-policy/": "プライバシーポリシー",
  "/comming-soon/": "準備中のご案内",
  "/sitemap/": "サイトマップ（本ページ）",
};

/** `/sitemap/` HTML ページ用のナビ項目（XML とは別リスト） */
export function getHtmlSitemapNavEntries(): SitemapNavEntry[] {
  return HTML_SITEMAP_NAV_PATHS.map((path) => ({
    path,
    label: NAV_LABELS[path] ?? path,
  }));
}
