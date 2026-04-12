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
- デプロイ: Cloudflare Pages（プロジェクト名 `astro-attendsalon-r`）

### 本番 URL・反映の仕方

- **本番（Pages）:** `https://astro-attendsalon-r.pages.dev`（カスタムドメインがあればそちらが本番表示）
- **`main` へ push** → GitHub Actions（`.github/workflows/deploy-cloudflare-pages.yml`）が `npm ci` → `npm run build` → `wrangler pages deploy` を実行し、**常に本番へ反映**する。
- **リポジトリ Secrets（必須）:** GitHub リポジトリ → Settings → Secrets and variables → Actions に次を登録する。
  - `CLOUDFLARE_API_TOKEN` … API トークン（権限例: **Account** → **Cloudflare Pages** → **Edit**）
  - `CLOUDFLARE_ACCOUNT_ID` … Cloudflare ダッシュボード右サイドバー等の **アカウント ID**
- **ローカルから直接アップロード:** `npm run deploy`（Wrangler ログイン済みの端末向け。CI と併用可）
- **AI 作業時:** 本番へ載せる変更は、原則 **`main` にコミットして `origin/main` へ push** し Actions を通す。push できない／急ぎの場合のみ `npm run deploy` を実行する。

## カラークイックリファレンス

```
pink-01  = #BE7372  // CTAボタン・アクセント（柔らかいコーラル）
blue-01  = #7F9AA8  // タグ・アクセントライン
bg-warm  = #FAF6EF  // クリームベージュ背景
black-03 = #45423E  // 本文（暖チャコール）
border-soft / surface-*  // tailwind.config 参照（枠・区画のニュートラル）
```

## 実装ルール

1. **デザイン変更は必ず DESIGN.md（正本）を先に更新**してから実装する
2. コンポーネントファイルは `src/components/` に置く（例: `HeroSection.astro`）。**セクション見出し**（英字ラベル＋装飾＋32px Zen）は `SectionHeading.astro` と `public/images/section-heading-deco.svg` で統一（Figma `294:720` 系）
3. Tailwind のカラートークンを優先使用（`text-pink-01` 等）、任意値は最小限に
4. フォントは `font-zen`（Zen Kaku Gothic New）/ `font-noto`（Noto Sans JP）を使う
5. 画像は `public/images/` に配置、alt 属性は日本語で記述。**描画イラスト・装飾画像**のトーン・線・色だまり・透過ルールは `docs/ILLUSTRATION_MEDIA_SPEC.md`（厚労省こころ系イメージに準拠）に従う
6. モバイル対応: `md:` breakpoint を基準に設計（デスクトップは 1440px 基準）。**本文シェル**は `mx-auto w-full min-w-0 max-w-[min(100%,992px)] md:max-w-[min(100%,1008px)] px-6`（SP 含め左右 24px のガター＝`px-6`。border-box 内で完結。`box-content`+`w-full`+横paddingは親より広がり横スクロールの原因になるため使わない）。`BaseLayout` の `body` に `overflow-x-clip` あり

## 禁止事項

- DESIGN.md を site repo 側に置くこと（正本は `~/AI/` 側のみ）
- インラインスタイルの多用
- コンポーネント外でのビジネスロジック記述
