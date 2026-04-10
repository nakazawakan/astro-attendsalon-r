# AGENTS.md — astro-attendsalon-r

AI ツール（Cursor / Claude Code / Codex）向けの参照インデックスです。

## 正本ドキュメント

| ドキュメント | パス | 内容 |
|------------|------|------|
| **DESIGN.md**（正本） | `~/AI/companies/ararat/sites/attendsalon-r.com/DESIGN.md` | デザインシステム・カラー・レイアウト・コンテンツ |
| Figma | https://www.figma.com/design/mVJaZra8kGkMaIlwF14ZAs/HP_attendsalon-r.com | デザイン原本 |

## リポジトリ概要

```
~/sites/astro-attendsalon-r/
  src/
    components/    各セクションのAstroコンポーネント
    layouts/       BaseLayout.astro
    lib/           ユーティリティ（必要時）
    pages/         index.astro, /kanjorodou, /instructor, /faq, /about, /contact
  public/
    images/        画像（Figmaからエクスポートして配置）
  tailwind.config.mjs  カラートークン定義済み
  astro.config.mjs     static output, sitemap統合
```

## スタック

- Astro 4.x（static output）
- Tailwind CSS 3.x
- デプロイ: Cloudflare Pages（`npm run deploy`）

## カラークイックリファレンス

```
pink-01  = #FB6B6A  // CTAボタン・アクセント
blue-01  = #6C8DA6  // タグ・アクセントライン
bg-warm  = #FDF7EC  // ベージュ背景
black-03 = #333333  // 本文
```

## 実装ルール

1. **デザイン変更は必ず DESIGN.md（正本）を先に更新**してから実装する
2. コンポーネントファイルは `src/components/` に置く（例: `HeroSection.astro`）
3. Tailwind のカラートークンを優先使用（`text-pink-01` 等）、任意値は最小限に
4. フォントは `font-zen`（Zen Kaku Gothic New）/ `font-noto`（Noto Sans JP）を使う
5. 画像は `public/images/` に配置、alt 属性は日本語で記述
6. モバイル対応: `md:` breakpoint を基準に設計（デスクトップは 1440px 基準）

## 禁止事項

- DESIGN.md を site repo 側に置くこと（正本は `~/AI/` 側のみ）
- インラインスタイルの多用
- コンポーネント外でのビジネスロジック記述
