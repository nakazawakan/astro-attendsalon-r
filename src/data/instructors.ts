/**
 * 講師カード（LP・サブページ共通）と詳細ページ用の拡張フィールド。
 * 画像は public/images/ を参照。
 */

export interface InstructorCard {
  nameJa: string;
  nameEn: string;
  tags: string[];
  /** タグ行直下に出す注釈（例: EAP の※）。任意 */
  tagFootnote?: string;
  qualifications?: string[];
  image: string;
  imageAlt: string;
  imgWidth: number;
  imgHeight: number;
  objectPosition: string;
}

export interface InstructorGalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface InstructorProfile extends InstructorCard {
  slug: string;
  /** 詳細ページ本文（段落ごと） */
  longBio: string[];
  /** 研修・活動写真（トップのポートレートとは別） */
  gallery: InstructorGalleryItem[];
  /** 得意領域・担当イメージ（箇条書き用） */
  focusAreas: string[];
}

const tatenoBase: InstructorCard = {
  nameJa: "舘野 理香",
  nameEn: "Tateno Rika",
  tags: ["元航空会社客室乗務員（乗務管理職）", "エデュケーションアシスタント ※"],
  tagFootnote: "※ Education Assistant＝教員の負荷を軽減する教育委員会の支援制度",
  qualifications: ["キャリアコンサルタント", "産業カウンセラー", "心理相談員", "ファイナンシャルプランナー", "マナープロトコール準１級", "メンタルフードマイスター"],
  image: "/images/instructor-tateno.png",
  imageAlt: "舘野理香のポートレート",
  imgWidth: 920,
  imgHeight: 1380,
  objectPosition: "object-[50%_19%]",
};

const satoBase: InstructorCard = {
  nameJa: "佐藤 亮子",
  nameEn: "Sato Ryoko",
  tags: ["元航空会社客室乗務員（乗務管理職）", "EAPカウンセラー ※"],
  tagFootnote: "※ Employee Assistance Program＝従業員支援プログラム",
  qualifications: ["1級キャリアコンサルティング技能士", "2級キャリアコンサルティング技能士", "キャリアコンサルタント", "公認心理師", "産業カウンセラー", "心理相談員"],
  image: "/images/instructor-sato.png",
  imageAlt: "佐藤亮子のポートレート",
  imgWidth: 933,
  imgHeight: 1400,
  objectPosition: "object-[50%_13%]",
};

/** 左→右: 佐藤、舘野（Figma `294:719` 順に合わせた既存 LP 配置） */
export const instructorProfiles: InstructorProfile[] = [
  {
    ...satoBase,
    slug: "sato-ryoko",
    focusAreas: ["高い専門性の資格、知見に基づいた研修設計", "心理的安全性を踏まえたメンタルヘルス・ハラスメント関連研修", "EAPの現場での相談経験を踏まえた実務的なファシリテーション"],
    longBio: ["元航空会社客室乗務員として乗務管理職を経て、EAPカウンセラーとしても現場に寄り添う支援を行ってきました。", "感情労働の負荷や職場の人間関係に関わる問題に深く関わり、キャリア形成の視点で前に踏み出す力や自己実現を支援します"],
    gallery: [
      // {
      //   src: "/images/trainer/sato-seated-01.jpg",
      //   alt: "座席で資料に向かう佐藤亮子",
      //   width: 1200,
      //   height: 800,
      // },
      {
        src: "/images/trainer/sato-whiteboard-01.jpg",
        alt: "ホワイトボードの前で説明する佐藤亮子",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    ...tatenoBase,
    slug: "tateno-rika",
    focusAreas: ["接客・対人支援の現場に即した研修設計", "マナー・印象づくりを含むコミュニケーション関連研修", "キャリアや生活設計にも踏み込んだ伴走型のファシリテーション"],
    longBio: ["元航空会社客室乗務員として乗務管理職を経て、エデュケーションアシスタントとして接遇・育成の現場を支えてきました。", "ワークライフバランスの視点から働きがいや自身の健康を大切にした女性活躍推進を支援します"],
    gallery: [
      {
        src: "/images/trainer/tateno-desk-01.jpg",
        alt: "デスクで資料を確認する舘野理香",
        width: 1200,
        height: 800,
      },
      // {
      //   src: "/images/trainer/tateno-whiteboard-01.jpg",
      //   alt: "ホワイトボード前で話す舘野理香",
      //   width: 1200,
      //   height: 800,
      // },
    ],
  },
];

/** カード行・LP 用（表示順は instructorProfiles のまま） */
export const instructorsForCards: InstructorCard[] = instructorProfiles.map(({ slug: _slug, longBio: _lb, gallery: _g, focusAreas: _f, ...card }) => card);
