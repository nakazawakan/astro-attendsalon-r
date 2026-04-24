# astro-attendsalon-r

アテンドサロンR（`attendsalon-r.com`）の Astro 実装リポジトリです。  
静的サイトとしてビルドし、Cloudflare Pages へデプロイします。

## セットアップ

```sh
npm ci
npm run dev
```

開発サーバーは通常 `http://localhost:4321/` で起動します。

## 主要コマンド

| Command | Action |
| --- | --- |
| `npm run dev` | ローカル開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run preview` | ビルド結果のローカル確認 |
| `npm run deploy` | `dist/` を Cloudflare Pages に直接デプロイ |

## スタイル運用方針

- **現時点の正** は `custom CSS + FLOCSS + Astro scoped CSS`
- `tailwindcss` / `@astrojs/tailwind` は本リポジトリに含めない（撤去済み）
- 共通 UI と共通レイアウトだけを `src/styles/` に置き、セクション固有の見た目は各 `.astro` に閉じる
- 詳細な実装指示は [docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md](/Users/nakazawakan/sites/astro-attendsalon-r/docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md) を参照

## 主要ドキュメント

- 運用ルール: [AGENTS.md](/Users/nakazawakan/sites/astro-attendsalon-r/AGENTS.md)
- CSS 実装指示: [docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md](/Users/nakazawakan/sites/astro-attendsalon-r/docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md)
- 作業メモ: [AGENTS_TASKS.md](/Users/nakazawakan/sites/astro-attendsalon-r/AGENTS_TASKS.md)
- イラスト仕様: [docs/ILLUSTRATION_MEDIA_SPEC.md](/Users/nakazawakan/sites/astro-attendsalon-r/docs/ILLUSTRATION_MEDIA_SPEC.md)
- デザイン正本: `~/AI/companies/ararat/sites/attendsalon-r.com/DESIGN.md`

## デプロイ

- GitHub Actions で `main` を Cloudflare Pages に反映
- 検証用 URL: [https://astro-attendsalon-r.pages.dev/](https://astro-attendsalon-r.pages.dev/)
- 公開 URL: [https://attendsalon-r.com](https://attendsalon-r.com)

本番反映やキャッシュ確認の詳しい手順は [AGENTS.md](/Users/nakazawakan/sites/astro-attendsalon-r/AGENTS.md) を参照してください。
