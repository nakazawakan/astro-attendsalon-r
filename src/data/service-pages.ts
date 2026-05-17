import type { ServiceStepItem, ServiceSyllabusGroup } from "../components/service/ServiceSubheadingCards.astro";
import type { FaqSectionItem, ServiceFeatureItem, ServicePlanData, ServiceSectionBackground, ServicePageTrailingSection } from "../components/service/ServicePageBody.astro";
import { withFeatureSectionMedia } from "./feature-section-media";
import { serviceOfferings } from "./service-offerings";

export interface ServicePageBodyData {
  idPrefix: string;
  aboutTitle: string;
  aboutIntroParagraphs: string[];
  aboutSyllabus: ServiceSyllabusGroup[];
  worries: string[];
  worryLead: string;
  /** WORRIES セクション背景（default / white / surface / gray / blueSoft） */
  worriesBackground?: ServiceSectionBackground;
  aboutSteps?: ServiceStepItem[];
  aboutStepsSectionTitle?: string;
  faqItems?: FaqSectionItem[];
  trailingSections: ServicePageTrailingSection[];
}

const serviceIconBySlug = (slug: "mental-health" | "anger-management" | "harassment") => {
  return serviceOfferings.find((service) => service.slug === slug)?.icon ?? "";
};

const harassmentPlanData = {
  cards: [
    {
      tabLabel: "単体研修",
      trainingType: "ハラスメント研修",
      prices: [
        { amount: "15", suffix: "万円〜/90分" },
        { amount: "20", suffix: "万円〜/120分" },
      ],
    },
    {
      tabLabel: "パッケージ研修",
      trainingType: "3つの研修",
      prices: [
        { amount: "40", suffix: "万円〜/単発" },
        { amount: "80", suffix: "万円〜/年間契約(3回〜)" },
      ],
    },
  ],
  packageTitle: "パッケージ研修",
  packageParagraphs: ["「イキイキと自分らしく働ける組織を実現するためのウェルビーイング経営支援」を目的に、当社ではハラスメント研修を提供しています。とはいえ、ハラスメントは“行動”だけを整えても再発しやすく、その背景にある「感情の扱い方」や「心の負荷（ストレス）」まで含めて整えることが重要です。", "パッケージ研修は、メンタルヘルス（状態に気づく）→アンガーマネジメント（感情を扱う）→ハラスメント（行動に落とし込む）の流れで、個人と組織の課題を段階的に整理し、現場で“機能する”予防と改善につなげる研修設計です。", "単発で終わらせず、組織の土台から整えることで、心理的安全性と指導の質を両立させます。"],
  packagePillars: [
    {
      title: "メンタルヘルス",
      subtitle: "（こころの状態を整える）",
      imageSrc: serviceIconBySlug("mental-health"),
    },
    {
      title: "アンガーマネジメント",
      subtitle: "（感情を扱い）",
      imageSrc: serviceIconBySlug("anger-management"),
    },
    {
      title: "ハラスメント",
      subtitle: "（行動に落とし込む）",
      imageSrc: serviceIconBySlug("harassment"),
    },
  ],
  examplesTitle: "パッケージ研修の具体例",
  examples: [
    {
      titleLines: ["全社員向けメンタルヘルス", "×", "アンガーマネジメント"],
      descriptionLines: ["「感情を仕事にする人のためのメンタルヘルス研修」", "〜感情を抑える仕事ほど心のケアが必要　いい人が限界を超える前に〜"],
    },
    {
      titleLines: ["組織向け3点セット"],
      descriptionLines: ["「ハラスメントを防ぎ、離職を減らすための感情マネジメント研修プログラム」"],
    },
    {
      titleLines: ["管理職者向け感情マネジメント型", "ハラスメント予防研修"],
      descriptionLines: ["指導がハラスメントにならないための管理職の感情マネジメント研修"],
    },
  ],
} satisfies ServicePlanData;

const angerManagementPlanData = {
  ...harassmentPlanData,
  cards: [{ ...harassmentPlanData.cards[0], trainingType: "アンガーマネジメント研修" }, { ...harassmentPlanData.cards[1] }],
  packageParagraphs: ["「イキイキと自分らしく働ける組織を実現するためのウェルビーイング経営支援」を目的に、当社ではアンガーマネジメント研修を提供しています。とはいえ、怒りや衝突は“行動”だけを整えても再発しやすく、その背景にある「感情の扱い方」や「心の負荷（ストレス）」まで含めて整えることが重要です。", ...harassmentPlanData.packageParagraphs.slice(1)],
} satisfies ServicePlanData;

const mentalHealthPlanData = {
  ...harassmentPlanData,
  cards: [{ ...harassmentPlanData.cards[0], trainingType: "メンタルヘルス研修" }, { ...harassmentPlanData.cards[1] }],
  packageParagraphs: ["「イキイキと自分らしく働ける組織を実現するためのウェルビーイング経営支援」を目的に、当社ではメンタルヘルス研修を提供しています。とはいえ、不調や疲弊は“行動”だけを整えても再発しやすく、その背景にある「感情の扱い方」や「心の負荷（ストレス）」まで含めて整えることが重要です。", ...harassmentPlanData.packageParagraphs.slice(1)],
} satisfies ServicePlanData;

const harassmentFaqItems = [
  {
    q: "ハラスメント研修では、具体的にどのような内容を扱いますか？",
    a: "法令で求められる基礎知識に加え、職場で起こりやすいグレー事例の判断軸、相談を受けた際の初期対応、再発防止のためのコミュニケーションまで、現場で使える内容を扱います。",
  },
  {
    q: "管理職者向けと一般職向けで内容を分けられますか？",
    a: "はい。対象者の役割に応じて、管理職者向けは指導・対応判断を中心に、一般職向けは相談・報告のしやすさや日常コミュニケーションを中心に設計できます。",
  },
  {
    q: "現在起きている事例を題材にしてもらえますか？",
    a: "可能です。事前ヒアリングで状況を整理したうえで、匿名化したケースとして研修内に反映し、組織に合った形で扱います。",
  },
  {
    q: "見積もりは無料ですか？",
    a: "初回ヒアリングおよび概算お見積もりは無料です。実施形式や時間、受講人数に合わせて正式なお見積もりをご提示します。",
    cta: { href: "/contact/", label: "研修の無料相談" },
  },
] satisfies FaqSectionItem[];

const angerManagementFaqItems = [
  {
    q: "アンガーマネジメント研修では、どのような内容ですか？",
    a: "怒りのメカニズム理解、トリガーの把握、感情を整える実践方法、職場での伝え方までを、ケーススタディと対話を交えて実践的に扱います。",
  },
  {
    q: "ハラスメント予防と組み合わせた実施はできますか？",
    a: "はい。アンガーマネジメントとハラスメント研修を段階的に組み合わせることで、感情の扱い方と行動の判断基準を同時に整える設計が可能です。",
  },
  {
    q: "怒りを我慢しがちな職場にも効果がありますか？",
    a: "あります。怒りを抑え込むことによる疲弊や衝突を防ぐために、感情を否定せず適切に扱う方法を学び、現場で実践できる形に落とし込みます。",
  },
  {
    q: "オンライン開催にも対応していますか？",
    a: "対面を基本としつつ、オンラインやハイブリッドにも対応可能です。運用体制に合わせて最適な実施形式をご提案します。",
  },
] satisfies FaqSectionItem[];

const mentalHealthFaqItems = [
  {
    q: "メンタルヘルス研修では、どのような内容を扱いますか？",
    a: "ストレス反応の理解、セルフケアの基本、管理職のラインケア、相談を受けた際の初期対応などを、現場実務に沿って整理します。",
  },
  {
    q: "管理職者向けのラインケア研修にも対応していますか？",
    a: "はい。部下の変化への気づき、声かけ、相談導線づくりなど、管理職が日常で実践しやすい内容にカスタマイズできます。",
  },
  {
    q: "休職や離職の予防を目的にした設計は可能ですか？",
    a: "可能です。課題の棚卸しを行ったうえで、セルフケアと職場支援の両面から、組織の実態に合わせた予防プログラムを設計します。",
  },
  {
    q: "費用の目安を知りたいです",
    a: "所要時間や内容により異なりますが、90分〜120分を基本に、目的や受講人数に応じて個別にお見積もりします。",
    cta: { href: "/contact/", label: "研修の無料相談" },
  },
] satisfies FaqSectionItem[];

export const harassmentServicePageBody: ServicePageBodyData = {
  idPrefix: "harassment",
  aboutTitle: "感情労働特化型の\nハラスメント研修とは",
  aboutIntroParagraphs: ["「これは指導？ハラスメント？」と迷わない判断軸をつくり、「知らなかった」「つもりだった」をなくします。法令の基礎理解にとどまらず、日常の指導・注意・コミュニケーションの中で起こりやすいケースをもとに、現場で使える判断基準と対応力を身につけます。現場で起こる事例については事前にヒアリングさせていただきます。"],
  aboutSyllabus: [
    {
      heading: "従業員向け",
      cards: [
        {
          title: "ハラスメントの基礎理解",
        },
        {
          title: "グレー事例のケーススタディ",
        },
        {
          title: "日常で心がけるコミュニケーション",
        },
      ],
    },
    {
      heading: "管理者向け",
      cards: [
        {
          title: "法令と安全配慮の基礎理解",
        },
        {
          title: "判断軸のケーススタディ",
        },
        {
          title: "心理的安全性を高める職場づくり",
        },
      ],
    },
  ],
  worries: ["強い言い方をしてしまい、後から後悔することがある", "部下への注意や指導が、パワハラと受け取られないか不安になる", "「昔は当たり前だった」が通用しなくなり、どう伝えるべきか迷っている", "相談を受けても、どこまで介入すべきか判断に困る"],
  worryLead: "アテンドサロンRは、感情労働に特化したハラスメント研修で、ケーススタディを取り入れながら分かりやすく進めていきます。",
  faqItems: harassmentFaqItems,
  trailingSections: [
    {
      key: "feature",
      label: "FEATURE",
      title: "ハラスメント研修の特徴",
      whiteBackground: true,
      intro: "感情を扱う現場を熟知した元CA管理職×国家資格者による、ハラスメントを起こさない、現場で本当に使える実践重視の組織づくり研修を提供しています。",
      features: withFeatureSectionMedia([
        {
          num: "01",
          title: "現場力",
          body: "客室乗務員経験40年以上、管理職経験10年以上、クレーム対応や感情コントロールの最前線で培った圧倒的現場力で、机上論ではなく実際の現場で起こるリアルな悩みをもとに、実情に即したハラスメント予防研修を提案します。",
        },
        {
          num: "02",
          title: "組織構築経験",
          body: "日常相談スペースやセルフキャリアドックを立ち上げた実績を活かし、ハラスメントを未然に防ぐ仕組みづくりと相談しやすい組織風土の構築を支援します。",
        },
        {
          num: "03",
          title: "国家資格×実務",
          body: "公認心理師、産業カウンセラー、1級キャリアコンサルティング技能士などの専門資格と、産業現場での実務経験をもとに、個人対応だけでなく組織全体の判断基準と対応力の向上にアプローチします。",
        },
      ]) satisfies ServiceFeatureItem[],
    },
    { key: "voice", label: "VOICE", title: "研修を受講した\nお客様の声", whiteBackground: false },
    {
      key: "plan",
      label: "PLAN",
      title: "研修ラインナップ・料金",
      whiteBackground: true,
      plan: harassmentPlanData,
    },
    { key: "instructor", label: "INSTRUCTOR", title: "講師紹介", whiteBackground: false },
    { key: "area", label: "AREA", title: "対応エリア", whiteBackground: true },
    { key: "flow", label: "FLOW", title: "導入までの流れ", whiteBackground: false },
  ],
};

export const angerManagementServicePageBody: ServicePageBodyData = {
  idPrefix: "anger",
  aboutTitle: "感情労働特化型の<br />アンガーマネジメント研修とは",
  aboutIntroParagraphs: ["感情を扱うことが日常となる職場では、抑え込まれた怒りや価値観の衝突が、対人トラブルやハラスメントの火種になることがあります。怒りはなくすものではなく、仕組みを理解し適切に扱うことで、未然に問題を防ぐことが可能です。", "本研修では、本人だけでなく管理職や組織全体の関わり方にも焦点を当て、怒りをコントロールする力と伝える力を育て、感情に振り回されない冷静な判断と対話ができる職場づくりを支援します。"],
  aboutSyllabus: [
    {
      heading: "従業員向け",
      cards: [
        {
          title: "怒りの正体を知る",
        },
        {
          title: "自分の価値観（思い込み）を知る",
        },
        {
          title: "感情と上手に付き合う",
        },
      ],
    },
    {
      heading: "管理者向け",
      cards: [
        {
          title: "アンガーマネジメントの基礎理解",
        },
        {
          title: "管理者の感情マネジメント",
        },
        {
          title: "育成につながる伝え方",
        },
      ],
    },
  ],
  worries: ["クレームや忙しさでイライラが溜まりやすい", "感情的な言動でトラブルが起きている", "怒りを我慢して疲弊している従業員が多い", "注意や指導がハラスメントにならないか不安"],
  worryLead: "アテンドサロンRは、アンガーマネジメント研修を通して、現場に広がる怒りの連鎖を考えます。",
  faqItems: angerManagementFaqItems,
  trailingSections: [
    {
      key: "feature",
      label: "FEATURE",
      title: "アンガーマネジメント研修の特徴",
      whiteBackground: true,
      intro: "感情を扱う現場を熟知した元CA管理職×国家資格者による、怒りに振り回されない、現場で本当に使える実践重視のアンガーマネジメント研修を提供しています。",
      features: withFeatureSectionMedia([
        {
          num: "01",
          title: "現場力",
          body: "客室乗務員経験40年以上、管理職経験10年以上、感情コントロールの最前線で培った現場力をもとに、対人トラブルや価値観の衝突が起きやすい場面を踏まえた実情に即した研修を提案します。",
        },
        {
          num: "02",
          title: "組織構築経験",
          body: "日常相談スペースや組織支援の実績を活かし、怒りを抱え込まない仕組みづくりと、安心して対話できる職場環境の構築を支援します。",
        },
        {
          num: "03",
          title: "国家資格×実務",
          body: "公認心理師、産業カウンセラー、1級キャリアコンサルティング技能士などの専門資格と産業現場での実務経験をもとに、個人の感情コントロール力と組織全体の対話力向上の双方にアプローチします。",
        },
      ]) satisfies ServiceFeatureItem[],
    },
    { key: "voice", label: "VOICE", title: "研修を受講したお客様の声", whiteBackground: false },
    {
      key: "plan",
      label: "PLAN",
      title: "研修ラインナップ・料金",
      whiteBackground: true,
      plan: angerManagementPlanData,
    },
    { key: "instructor", label: "INSTRUCTOR", title: "講師紹介", whiteBackground: false },
    { key: "area", label: "AREA", title: "対応エリア", whiteBackground: true },
    { key: "flow", label: "FLOW", title: "導入までの流れ", whiteBackground: false },
  ],
};

export const mentalHealthServicePageBody: ServicePageBodyData = {
  idPrefix: "mental",
  aboutTitle: "感情労働特化型の<br />メンタルヘルス研修とは",
  aboutIntroParagraphs: ["感情を扱うことが業務の一部となっている職場では、責任感や我慢強さゆえに不調が見えにくく、気づいたときには限界を超えていることも少なくありません。メンタルヘルス不調は、早期の気づきと適切な関わりによって予防することが可能です。", "本研修では、本人のセルフケアだけでなく、管理職や周囲の支え方にも焦点を当て、「気づく力」と「支える力」を育て、休職や離職を防ぎながら安心して働き続けられる職場づくりを支援します。"],
  aboutSyllabus: [
    {
      heading: "従業員向け",
      cards: [
        {
          title: "メンタルヘルスの基礎理解",
        },
        {
          title: "セルフケア",
        },
        {
          title: "相談する力",
        },
      ],
    },
    {
      heading: "管理者向け",
      cards: [
        {
          title: "知っておくべき管理者の役割",
        },
        {
          title: "ラインケア",
        },
        {
          title: "組織対応",
        },
      ],
    },
  ],
  worries: ["不調に気づいた時にはすでに限界を超えている", "部下への声かけや初期対応に迷ってしまう", "休職や離職が続いている", "相談しにくい職場風土になっている"],
  worryLead: "アテンドサロンRは、感情労働に特化したメンタルヘルス研修を通じて現場の“不調の芽”を早期に摘み取ります",
  faqItems: mentalHealthFaqItems,
  trailingSections: [
    {
      key: "feature",
      label: "FEATURE",
      title: "メンタルヘルス研修の特徴",
      whiteBackground: true,
      intro: "感情を扱う現場を熟知した元CA管理職×国家資格者による、感情疲労を起こさない、現場で本当に使える実践重視のメンタルヘルス研修を提供しています。",
      features: withFeatureSectionMedia([
        {
          num: "01",
          title: "現場力",
          body: "客室乗務員経験40年以上、管理職経験10年以上、感情労働の最前線で培った現場力をもとに、我慢や責任感の強さから生じる不調の兆しを踏まえた実情に即した研修を提案します。",
        },
        {
          num: "02",
          title: "組織構築経験",
          body: "日常相談スペースやセルフキャリアドックの立ち上げ実績を活かし、セルフケアとラインケアの両面から、休職・離職を予防する組織づくりを支援します。",
        },
        {
          num: "03",
          title: "国家資格×実務",
          body: "公認心理師、産業カウンセラー、1級キャリアコンサルティング技能士などの専門資格と産業現場での実務経験を武器に、個人の不調予防と組織全体の支援体制強化の双方にアプローチします。",
        },
      ]) satisfies ServiceFeatureItem[],
    },
    { key: "voice", label: "VOICE", title: "研修を受講したお客様の声", whiteBackground: false },
    {
      key: "plan",
      label: "PLAN",
      title: "研修ラインナップ・料金",
      whiteBackground: true,
      plan: mentalHealthPlanData,
    },
    { key: "instructor", label: "INSTRUCTOR", title: "講師紹介", whiteBackground: false },
    { key: "area", label: "AREA", title: "対応エリア", whiteBackground: true },
    { key: "flow", label: "FLOW", title: "導入までの流れ", whiteBackground: false },
  ],
};
