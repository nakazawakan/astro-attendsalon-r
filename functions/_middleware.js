/**
 * Cloudflare Pages Functions — 静的サイトの前段でレスポンスヘッダを付与。
 * `*.pages.dev`（本番用 *.pages.dev およびブランチのプレビュー URL）では検索エンジンにインデックスさせない。
 * 本番カスタムドメイン（例: attendsalon-r.com）は hostname が異なるため対象外。
 *
 * @param {{ request: Request; next: () => Promise<Response> }}} context
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const response = await context.next();

  if (!url.hostname.endsWith('.pages.dev')) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
