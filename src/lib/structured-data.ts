type FaqLike = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

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
      name: 'アテンドサロンR',
      url: site.toString(),
    },
    publisher: {
      '@type': 'Organization',
      name: 'アテンドサロンR',
      logo: {
        '@type': 'ImageObject',
        url: new URL('/images/logo.png', site).toString(),
      },
    },
  };
}
