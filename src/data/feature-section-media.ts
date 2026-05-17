/** トップ `FeatureSection` とサービス下位ページ FEATURE で共通のイラスト */
export const featureSectionMediaByNum = {
  "01": {
    imageSrc: "/images/feature-01-professional-watercolor-transparent.png",
    imageAlt:
      "青いジャケットとスカーフの制服姿の人物の水彩風イラスト。胸に手を当てた丁寧な姿勢。",
  },
  "02": {
    imageSrc: "/images/feature-02-organization-building-watercolor-transparent.png",
    imageAlt:
      "大小二つの歯車が噛み合った水彩風イラスト。左は紫〜ピンク、右はピンク〜オレンジのグラデーション。",
  },
  "03": {
    imageSrc: "/images/feature-03-national-qualification-transparent.png",
    imageAlt:
      "「国家資格」の文字と署名欄線、上部の金色の装飾、右下の金封印と薄い青色のリボンが描かれた、賞状風の水彩タッチのイラスト。",
  },
} as const;

export type FeatureSectionMediaNum = keyof typeof featureSectionMediaByNum;

export function withFeatureSectionMedia<T extends { num: string }>(
  items: T[],
): (T & (typeof featureSectionMediaByNum)[FeatureSectionMediaNum])[] {
  return items.map((item) => ({
    ...item,
    ...featureSectionMediaByNum[item.num as FeatureSectionMediaNum],
  }));
}
