/**
 * Cloudflare Pages Functions — 静的サイトの前段でレスポンスヘッダを付与。
 * `*.pages.dev` および本番カスタムドメイン（attendsalon-r.com）で X-Robots-Tag を付与し、
 * `<meta name="robots">` と併せてインデックスを抑止する。
 *
 * @param {{ request: Request; next: () => Promise<Response> }}} context
 */
const NOINDEX_HOSTS = new Set(['attendsalon-r.com', 'www.attendsalon-r.com']);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const response = await context.next();

  const host = url.hostname;
  const shouldNoindex = host.endsWith('.pages.dev') || NOINDEX_HOSTS.has(host);

  if (!shouldNoindex) {
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
