# AGENTS.md — astro-attendsalon-r

AI ツール（Cursor / Claude Code / Codex）向けの参照インデックスです。

## 正本ドキュメント

| ドキュメント | パス | 内容 |
|------------|------|------|
| **DESIGN.md**（正本） | `~/AI/companies/ararat/sites/attendsalon-r.com/DESIGN.md` | デザインシステム・カラー・レイアウト・コンテンツ |
| Figma | https://www.figma.com/design/mVJaZra8kGkMaIlwF14ZAs/HP_attendsalon-r.com | デザイン原本 |

## リポジトリ概要

```
~/sites/astro-attendsalon-r/   （Cursor ワークスペース例: /Users/.../sites/astro-attendsalon-r と同じリポジトリ）
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

- **Pages（`main` のビルドが乗る URL・検証用）:** `https://astro-attendsalon-r.pages.dev/`  
  - `functions/_middleware.js` により **`*.pages.dev` は `noindex`**（検索には載せない）。**外部の人に「いまの main の見た目」を見せる**用途にはこれでよい。
- **対外公開の正（canonical・`astro.config` の `site`）:** `https://attendsalon-r.com`  
  - ドメインが Pages に向いていてデプロイ済みなら、**一般向けリンクはこちら**を使う。
- **ローカル:** `npm run dev` → 既定は `http://localhost:4321/`（本番 URL とは別。ここが最新ソースの即時反映）。
- **`main` へ push** → GitHub Actions（`.github/workflows/deploy-cloudflare-pages.yml`）が `npm ci` → `npm run build` → `wrangler pages deploy` を実行し、**成功時のみ**上記 Pages URL が更新される。
- **リポジトリ Secrets（必須）:** GitHub リポジトリ → Settings → Secrets and variables → Actions に次を登録する。
  - `CLOUDFLARE_API_TOKEN` … API トークン（権限例: **Account** → **Cloudflare Pages** → **Edit**）
  - `CLOUDFLARE_ACCOUNT_ID` … Cloudflare ダッシュボード右サイドバー等の **アカウント ID**
- **ローカルから直接アップロード:** `npm run deploy`（Wrangler ログイン済みの端末向け。CI と併用可）
- **AI 作業時:** 本番へ載せる変更は、原則 **`main` にコミットして `origin/main` へ push** し Actions を通す。push できない／急ぎの場合のみ `npm run deploy` を実行する。
- **push した ≠ 本番更新。** Actions が `completed / success` になって初めて本番に反映される。「旧デザインに見える」場合は先に Actions の成否を確認する。
- **キャッシュ（`public/_headers`）:** `index.html` は `max-age=0` で常に検証。**CSS/JS は `/_astro/*` のファイル名ハッシュ**がデプロイごとに変わるため長期 `immutable` でよい。**`/images/*` は `max-age=600` + `stale-while-revalidate`**（画像差し替えは数分〜で伝播。毎回 `must-revalidate` はしない）。

### push 後の30秒確認手順

```bash
# 1. Actions の成否を確認
gh run list --repo nakazawakan/astro-attendsalon-r --limit=1

# 2. 本番 HTML にキーワードが含まれるか確認（いずれかがヒットすれば新ビルド寄り）
curl -sS "https://astro-attendsalon-r.pages.dev/" | grep -oE "NO IMAGE|voice-01\\.png|bg-bg-warm" | sort -u
```

### 作業完了時にまとめて実行する手順（ビルド〜本番確認・キャッシュ含む）

セッションや PR の**最後に一度**まとめて行う想定のチェックリスト。`_headers` の方針は上記「キャッシュ（`public/_headers`）」と [public/_headers](public/_headers) を参照。

1. **ビルド** — `npm run build` がエラーなく完了すること。
2. **差分** — `git status` / `git diff` で意図しない変更が混ざっていないか。
3. **コミット** — メッセージは **1 行・ASCII 主体**（下記「コミットメッセージ規約」。改行入りは Pages API で失敗することがある）。
4. **push** — `git push origin main`（原則 CI 経由で Pages 更新）。
5. **CI 成功まで待つ** — 直近のワークフロー run ID を取り `gh run watch`（非対話では **run ID 必須**）。例: `RID=$(gh run list --repo nakazawakan/astro-attendsalon-r --limit 1 --json databaseId -q '.[0].databaseId')` のあと `gh run watch "$RID" --repo nakazawakan/astro-attendsalon-r --exit-status`。**success になるまで本番 HTML は古いまま**のことがある。
6. **本番の軽確認** — 上記「push 後の30秒確認手順」の `gh run list` + `curl` + `grep`。
7. **キャッシュと見た目のズレ** — HTML は毎回検証されるため、**マークアップ・CSS・JS（`/_astro/*`）はデプロイ後すぐ新しい参照になりやすい**。`/images/*` は **最大約 10 分程度**エッジに古い応答が残る可能性がある（`max-age=600` + `stale-while-revalidate`）。**同一ファイル名で PNG だけ差し替え**で即時を必須にする場合は、**ファイル名を変える**か、**一時的にクエリ**（例: `?v=3`）を付けるなど運用で対処。

**コピペ用（リポジトリルートで実行・リポジトリ名は環境に合わせて変更可）:**

```bash
npm run build
git status
# 問題なければ add / commit（メッセージは1行ASCII）
git add -A
git commit -m "type(scope): one line ascii message"
git push origin main
RID=$(gh run list --repo nakazawakan/astro-attendsalon-r --limit 1 --json databaseId -q '.[0].databaseId')
gh run watch "$RID" --repo nakazawakan/astro-attendsalon-r --exit-status
curl -sS "https://astro-attendsalon-r.pages.dev/" | grep -oE "NO IMAGE|voice-01\\.png|bg-bg-warm" | sort -u
```

### コミットメッセージ規約

- **1 行のみ**（本文に改行を入れない）— Cloudflare Pages API が改行入りを拒否することがある（`Invalid commit message` / code: 8000111）
- `type(scope): description` 形式を推奨（例: `feat(hero): add placeholder image`）。**ASCII 主体が安全**。
- `git commit -m "$(cat <<'EOF'...)"` のヒアドキュメント形式は**使わない**。
- **`--amend` + `force-push`:** 共有ブランチでは**原則避ける**。例外として、上記 API エラーでデプロイだけが落ちているときに **1 行 ASCII に直す**目的なら `git commit --amend -m "..."` のあと **`git push --force-with-lease origin main`** は可。その場合はチームへ周知する。

## カラークイックリファレンス

```
pink-01  = #FB6B6A  // CTAボタン・アクセント（コーラル rgb(251,107,106)）
blue-01  = #7F9AA8  // タグ・アクセントライン
bg-warm  = #FAF6EF  // クリームベージュ背景
black-03 = #45423E  // 本文（暖チャコール）
border-soft / surface-*  // tailwind.config 参照（枠・区画のニュートラル）
```

## 実装ルール

1. **デザイン変更は必ず DESIGN.md（正本）を先に更新**してから実装する
2. コンポーネントファイルは `src/components/` に置く（例: `HeroSection.astro`）。**セクション見出し**（英字ラベル＋装飾＋32px Zen）は `SectionHeading.astro` と `public/images/section-heading-deco.svg` で統一（Figma `294:720` 系）
3. Tailwind のカラートークンを優先使用（`text-pink-01` 等）、任意値は最小限に
4. フォントは **Zen Kaku Gothic New をベース**（`font-zen` または `font-sans`）。特別な数字装飾のみ `font-['Lato',sans-serif]` 等（例: `FeatureSection` の番号、`FlowSection` のステップ番号）。Noto は読み込みのみ残し、本文では原則使わない
5. 画像は `public/images/` に配置、alt 属性は日本語で記述。**描画イラスト・装飾画像**のトーン・線・色だまり・透過ルールは `docs/ILLUSTRATION_MEDIA_SPEC.md`（厚労省こころ系イメージに準拠）に従う
6. モバイル対応: `md:` breakpoint を基準に設計（デスクトップは 1440px 基準）。**本文シェル**は `mx-auto w-full min-w-0 max-w-page px-6 md:px-0`（`max-w-page`＝960px。SP は `px-6` で左右 24px、PC は `md:px-0` で 960px カラム内いっぱい。`box-content`+`w-full`+横paddingは親より広がり横スクロールの原因になるため使わない）。`BaseLayout` の `body` に `overflow-x-clip` あり

## 禁止事項

- DESIGN.md を site repo 側に置くこと（正本は `~/AI/` 側のみ）
- インラインスタイルの多用
- コンポーネント外でのビジネスロジック記述
