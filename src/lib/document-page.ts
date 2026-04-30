/** Breadcrumb trail for document page UI and JSON-LD. */
export interface DocumentBreadcrumbItem {
  label: string;
  /** Relative path (e.g. `/column/`). Omit on the current page segment. */
  href?: string;
}

/** BreadcrumbList JSON-LD; trailing segment resolves to `pageUrl`. */
export function buildBreadcrumbJsonLd(
  items: DocumentBreadcrumbItem[],
  site: URL,
  pageUrl: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const itemUrl = isLast
        ? pageUrl
        : item.href
          ? new URL(item.href, site).toString()
          : pageUrl;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: itemUrl,
      };
    }),
  };
}
