type FaqLike = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

const DEFAULT_ORGANIZATION_NAME = 'アテンドサロンR';

export interface BuildOrganizationJsonLdInput {
  site: URL;
  name?: string;
  logoPath?: string;
}

export function buildOrganizationJsonLd({
  site,
  name = DEFAULT_ORGANIZATION_NAME,
  logoPath = '/images/logo.png',
}: BuildOrganizationJsonLdInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': new URL('#organization', site).toString(),
    name,
    url: site.toString(),
    logo: {
      '@type': 'ImageObject',
      url: new URL(logoPath, site).toString(),
    },
  };
}

export interface BuildWebSiteJsonLdInput {
  site: URL;
  name?: string;
}

export function buildWebSiteJsonLd({
  site,
  name = DEFAULT_ORGANIZATION_NAME,
}: BuildWebSiteJsonLdInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': new URL('#website', site).toString(),
    name,
    url: site.toString(),
    inLanguage: 'ja',
    publisher: {
      '@id': new URL('#organization', site).toString(),
    },
  };
}

export interface BuildWebPageJsonLdInput {
  title: string;
  pageUrl: string;
  description?: string;
}

export function buildWebPageJsonLd({
  title,
  pageUrl,
  description,
}: BuildWebPageJsonLdInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    ...(description ? { description } : {}),
    inLanguage: 'ja',
    url: pageUrl,
  };
}

export interface BuildServiceJsonLdInput {
  title: string;
  description: string;
  pageUrl: string;
  site: URL;
}

export function buildServiceJsonLd({
  title,
  description,
  pageUrl,
  site,
}: BuildServiceJsonLdInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    serviceType: '感情労働特化型研修',
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: DEFAULT_ORGANIZATION_NAME,
      url: site.toString(),
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
  };
}

export interface BuildFaqPageJsonLdOptions {
  normalizeAnswerWhitespace?: boolean;
}

export function buildFaqPageJsonLd(
  items: FaqLike[],
  options: BuildFaqPageJsonLdOptions = {},
): Record<string, unknown> {
  const { normalizeAnswerWhitespace = false } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .map((item) => {
        const question = item.question ?? item.q ?? '';
        const rawAnswer = item.answer ?? item.a ?? '';
        const answer = normalizeAnswerWhitespace
          ? rawAnswer.replace(/\s+/g, ' ').trim()
          : rawAnswer;

        if (!question || !answer) return null;

        return {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        };
      })
      .filter((entry): entry is Record<string, unknown> => entry !== null),
  };
}

export interface BuildArticleJsonLdInput {
  title: string;
  description: string;
  pageUrl: string;
  site: URL;
  publishedIso: string;
  modifiedIso: string;
  imageUrl?: string;
  keywords?: string;
}

export function buildArticleJsonLd({
  title,
  description,
  pageUrl,
  site,
  publishedIso,
  modifiedIso,
  imageUrl,
  keywords,
}: BuildArticleJsonLdInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    inLanguage: 'ja',
    mainEntityOfPage: pageUrl,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    ...(keywords ? { keywords } : {}),
    author: {
      '@type': 'Organization',
      name: DEFAULT_ORGANIZATION_NAME,
      url: site.toString(),
    },
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_ORGANIZATION_NAME,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/images/logo.png', site).toString(),
      },
    },
  };
}
