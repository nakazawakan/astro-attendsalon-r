export type ServiceSlug = 'mental-health' | 'anger-management' | 'harassment';

export type ServiceBodyTone = 'dark' | 'muted';

export interface ServiceOffering {
  slug: ServiceSlug;
  title: string;
  detailPath: `/service/${ServiceSlug}/`;
  homeAnchorId: `service-${ServiceSlug}`;
  homeAnchorPath: `/#service-${ServiceSlug}`;
  summary: string;
  bodyTone: ServiceBodyTone;
  icon: string;
  iconSize?: 'default' | 'large';
  ctaLabel: string;
}

/** サイト全体で利用する研修サービス定義（表記・URLの正本） */
export const serviceOfferings: readonly ServiceOffering[] = [
  {
    slug: 'mental-health',
    title: 'メンタルヘルス研修',
    detailPath: '/service/mental-health/',
    homeAnchorId: 'service-mental-health',
    homeAnchorPath: '/#service-mental-health',
    summary: '不調の早期発見とセルフケア、相談しやすい職場づくりを支援します',
    bodyTone: 'dark',
    icon: '/images/service-icon-heart.png',
    iconSize: 'large',
    ctaLabel: '研修詳細へ',
  },
  {
    slug: 'anger-management',
    title: 'アンガーマネジメント研修',
    detailPath: '/service/anger-management/',
    homeAnchorId: 'service-anger-management',
    homeAnchorPath: '/#service-anger-management',
    summary: '怒りを抑えるのではなく、上手に扱い、冷静に対処できる力を身につけます',
    bodyTone: 'muted',
    icon: '/images/service-icon-fire.png',
    iconSize: 'large',
    ctaLabel: '研修詳細へ',
  },
  {
    slug: 'harassment',
    title: 'ハラスメント研修',
    detailPath: '/service/harassment/',
    homeAnchorId: 'service-harassment',
    homeAnchorPath: '/#service-harassment',
    summary: 'ハラスメントによるトラブルに対して、ひとりで抱え込まない対応と組織としての線引きを学びます',
    bodyTone: 'muted',
    icon: '/images/service-icon-prohibited.png',
    iconSize: 'large',
    ctaLabel: '研修詳細へ',
  },
];
