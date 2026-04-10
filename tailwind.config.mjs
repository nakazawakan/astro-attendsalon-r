/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // アテンドサロンR デザインシステム
        'pink-01': '#FB6B6A',   // CTA・アクセント
        'pink-03': '#FFC0C0',   // ボタンボーダー
        'blue-01': '#6C8DA6',   // タグ・アクセント
        'black-03': '#333333',  // 本文テキスト
        'black-05': '#555555',  // サブテキスト
        'link': '#3574E1',      // リンクカラー
        'bg-warm': '#FDF7EC',   // 温かみあるベージュ背景
      },
      fontFamily: {
        'zen': ['"Zen Kaku Gothic New"', 'sans-serif'],
        'noto': ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
