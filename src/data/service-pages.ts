import type { ServiceSyllabusColumn } from '../components/service/ServiceSubheadingCards.astro';
import type { ServicePageTrailingSection } from '../components/service/ServicePageBody.astro';

export interface ServicePageBodyData {
  idPrefix: string;
  aboutTitle: string;
  aboutIntroParagraphs: string[];
  aboutSyllabus: ServiceSyllabusColumn[];
  worries: string[];
  worryLead: string;
  worryParagraphs: string[];
  trailingSections: ServicePageTrailingSection[];
}

export const harassmentServicePageBody: ServicePageBodyData = {
  idPrefix: 'harassment',
  aboutTitle: '感情労働特化型のハラスメント研修とは',
  aboutIntroParagraphs: [
    '「これは指導？ハラスメント？」と迷わない判断軸をつくり、「知らなかった」「つもりだった」をなくします。法令の基礎理解にとどまらず、日常の指導・注意・コミュニケーションの中で起こりやすいケースをもとに、現場で使える判断基準と対応力を身につけます。現場で起こる事例については事前にヒアリングさせていただきます。',
  ],
  aboutSyllabus: [
    {
      tag: '基礎理解',
      subheads: ['「知らなかった」をなくす', '「つもりだった」をなくす'],
      bullets: ['ハラスメントの定義（パワハラ／セクハラ／カスハラなど）', '法改正のポイント'],
    },
    {
      tag: 'ケーススタディ',
      subheads: ['あなたならどう対応するか'],
      bullets: ['現在起こっている事例', '判断が分かれるグレー事例', 'NG対応例（放置・軽視・独断処理）'],
    },
    {
      tag: 'コミュニケーション',
      subheads: ['トラブルを未然に防ぐために'],
      bullets: ['相談を受けたら', 'ハラスメントを起こさないコミュニケーション', '感情が高ぶったときは…'],
    },
  ],
  worries: [
    '部下への注意や指導が、パワハラととられないか不安になる',
    '「昔は当たり前だった」が通用しなくなり、どう伝えるべきか迷っている',
    '強い言い方をしてしまい、後から後悔することがある',
    '相談を受けても、どこまで介入すべきか判断に困る',
  ],
  worryLead: 'アテンドサロンRは、感情労働に特化したハラスメント研修で、現場と組織の“見えにくい負担”を根本から整えます',
  worryParagraphs: [
    '介護・医療・接客・教育など、感情を扱うことが仕事の一部になっている職場では、無自覚な圧力や我慢の積み重ねがハラスメントの火種になることがあります。私たちは感情労働の構造を理解したうえで、現場に即した判断基準と実践的な対応力を育てる研修をご提供します。',
  ],
  trailingSections: [
    {
      key: 'feature',
      label: 'FEATURE',
      title: 'ハラスメント研修の特徴',
      whiteBackground: true,
      intro:
        '感情を扱う現場を熟知した元CA管理職×国家資格者による、ハラスメントを起こさない、現場で本当に使える実践重視の組織づくり研修を提供しています。',
    },
    { key: 'voice', label: 'VOICE', title: '研修を受講したお客様の声', whiteBackground: false },
    { key: 'plan', label: 'PLAN', title: '研修ラインナップ・料金', whiteBackground: true },
    { key: 'instructor', label: 'INSTRUCTOR', title: '講師紹介', whiteBackground: false },
    { key: 'flow', label: 'FLOW', title: '導入までの流れ', whiteBackground: true },
  ],
};

export const angerManagementServicePageBody: ServicePageBodyData = {
  idPrefix: 'anger',
  aboutTitle: '感情労働特化型のアンガーマネジメント研修とは',
  aboutIntroParagraphs: [
    '感情を扱うことが日常となる職場では、抑え込まれた怒りや価値観の衝突が、対人トラブルやハラスメントの火種になることがあります。怒りはなくすものではなく、仕組みを理解し適切に扱うことで、未然に問題を防ぐことが可能です。',
    '本研修では、本人だけでなく管理職や組織全体の関わり方にも焦点を当て、怒りをコントロールする力と伝える力を育て、感情に振り回されない冷静な判断と対話ができる職場づくりを支援します。',
  ],
  aboutSyllabus: [
    {
      tag: '基礎理解',
      subheads: ['怒りのメカニズムを知る', '自分と相手のトリガーを知る'],
      bullets: ['怒りの種類と身体・思考への影響', '感情労働の現場で起きやすいパターン', 'ストレスと怒りの関係'],
    },
    {
      tag: 'ケーススタディ',
      subheads: ['あなたならどう対応するか'],
      bullets: ['指導・注意の場面での言い回し', 'クレームや多忙時のイライラ対応', 'NG例（押しつけ・否定・エスカレート）'],
    },
    {
      tag: 'コミュニケーション',
      subheads: ['トラブルを未然に防ぐために'],
      bullets: ['怒りを伝えるコツ', '冷静さを取り戻す工夫', '周囲が関わるときのポイント'],
    },
  ],
  worries: [
    '感情的な言動でトラブルが起きている',
    '怒りを我慢して疲弊している職員が多い',
    '注意や指導がハラスメントにならないか不安',
    'クレームや忙しさでイライラが溜まりやすい',
  ],
  worryLead:
    'アテンドサロンRは、感情労働に特化したアンガーマネジメント研修を通じて、現場に広がる“怒りの連鎖”を構造から整えます。',
  worryParagraphs: [
    '介護・医療・接客・教育など、常に対人対応が求められる職場では、抑え込まれた怒りや価値観の衝突が、対立やハラスメントの火種となることがあります。',
    '私たちは、感情労働の特性と現場のリアルを踏まえ、怒りを否定するのではなく、適切に扱い、伝える力を育てます。',
    '感情に振り回されない冷静な判断と、安心して対話できる職場環境を支援します。',
  ],
  trailingSections: [
    { key: 'feature', label: 'FEATURE', title: 'アンガーマネジメント研修の特徴', whiteBackground: true },
    { key: 'voice', label: 'VOICE', title: '研修を受講したお客様の声', whiteBackground: false },
    { key: 'plan', label: 'PLAN', title: '研修ラインナップ・料金', whiteBackground: true },
    { key: 'instructor', label: 'INSTRUCTOR', title: '講師紹介', whiteBackground: false },
    { key: 'flow', label: 'FLOW', title: '導入までの流れ', whiteBackground: true },
  ],
};

export const mentalHealthServicePageBody: ServicePageBodyData = {
  idPrefix: 'mental',
  aboutTitle: '感情労働特化型のメンタルヘルス研修とは',
  aboutIntroParagraphs: [
    '感情を扱うことが業務の一部となっている職場では、責任感や我慢強さゆえに不調が見えにくく、気づいたときには限界を超えていることも少なくありません。メンタルヘルス不調は、早期の気づきと適切な関わりによって予防することが可能です。',
    '本研修では、本人のセルフケアだけでなく、管理職や周囲の支え方にも焦点を当て、「気づく力」と「支える力」を育て、休職や離職を防ぎながら安心して働き続けられる職場づくりを支援します。',
  ],
  aboutSyllabus: [
    {
      tag: '基礎理解',
      subheads: ['不調のサインを知る', 'セルフケアの土台をつくる'],
      bullets: ['ストレス反応とメンタルヘルスの基礎', '感情労働の現場で起きやすい負荷', '法令・配慮のポイント（押しつけない理解）'],
    },
    {
      tag: 'ケーススタディ',
      subheads: ['あなたならどう対応するか'],
      bullets: ['部下の変化に気づく場面', '相談を受けた直後の対応', 'NG例（放置・決めつけ・一人で抱え込む）'],
    },
    {
      tag: 'コミュニケーション',
      subheads: ['トラブルを未然に防ぐために'],
      bullets: ['声かけと傾聴のコツ', 'ラインケアの役割整理', '職場風土を整える対話'],
    },
  ],
  worries: [
    '休職や離職が続いている',
    '不調に気づいた時にはすでに限界を超えている',
    '部下への声かけや初期対応に迷ってしまう',
    '相談しにくい職場風土になっている',
  ],
  worryLead:
    'アテンドサロンRは、感情労働に特化したメンタルヘルス研修を通じて、現場で静かに進行する“不調の芽”を早期に整えます。',
  worryParagraphs: [
    '介護・医療・接客・教育など、感情を扱い続ける職場では、責任感の強さや我慢強さゆえに、不調が見えにくくなりがちです。私たちは、感情労働の特性と現場のリアルを踏まえ、セルフケアとラインケアの両面から「気づく力」と「支える力」を育てます。',
    '休職や離職を防ぎ、安心して働き続けられる組織づくりを支援します。',
  ],
  trailingSections: [
    { key: 'feature', label: 'FEATURE', title: 'メンタルヘルス研修の特徴', whiteBackground: true },
    { key: 'voice', label: 'VOICE', title: '研修を受講したお客様の声', whiteBackground: false },
    { key: 'plan', label: 'PLAN', title: '研修ラインナップ・料金', whiteBackground: true },
    { key: 'instructor', label: 'INSTRUCTOR', title: '講師紹介', whiteBackground: false },
    { key: 'flow', label: 'FLOW', title: '導入までの流れ', whiteBackground: true },
  ],
};
