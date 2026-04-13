/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      /**
       * 本文シェル: `max-w-pageShell`（1008px = 960 + 左右 24px）+ 常時 `px-6` + `mx-auto`。
       * 数式・禁止パターン・例外は AGENTS.md「レイアウト仕様書（本文シェル）」を正とする。
       */
      maxWidth: {
        page: '960px',
        pageShell: '1008px',
      },
      colors: {
        // アテンドサロンR デザインシステム（柔らかい彩度・暖色ニュートラル寄り）
        'pink-01': '#FB6B6A',   // CTA・アクセント（Figma ベースのコーラル rgb(251,107,106)）
        'pink-03': '#E2C5C4',   // ボタンボーダー
        'blue-01': '#7F9AA8',   // タグ・アクセント（ダスティブルー）
        'black-03': '#45423E',  // 本文テキスト（暖みのあるチャコール）
        'black-05': '#6B6762',  // サブテキスト
        'link': '#5F87C0',      // リンクカラー
        'bg-warm': '#FAF6EF',   // ページ地・クリームベージュ
        // 枠・区画（任意値の #e0e0e0 系を置き換え用）
        'border-soft': '#E0D8CE',
        'surface-01': '#F5F0E8',
        'surface-02': '#EDE8DF',
        'surface-hover': '#E4DFD4',
        'marker-warm': '#F0E4D4',
      },
      fontFamily: {
        /** 本文ベース（特別な数字装飾以外は Zen に統一） */
        sans: ['"Zen Kaku Gothic New"', 'sans-serif'],
        zen: ['"Zen Kaku Gothic New"', 'sans-serif'],
        noto: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
