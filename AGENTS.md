# AGENTS.md — astro-attendsalon-r

AI ツール（Cursor / Claude Code / Codex）向けの参照インデックスです。

## 正本ドキュメント

| ドキュメント | パス | 内容 |
|------------|------|------|
| **DESIGN.md**（正本） | `~/AI/companies/ararat/sites/attendsalon-r.com/DESIGN.md` | デザインシステム・カラー・レイアウト・コンテンツ |
| Figma | https://www.figma.com/design/mVJaZra8kGkMaIlwF14ZAs/HP_attendsalon-r.com | デザイン原本 |

## リポジトリ内ドキュメント

| ドキュメント | パス | 内容 |
|------------|------|------|
| CSS 実装指示書 | `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` | custom CSS + FLOCSS + Astro scoped CSS への移行方針 |
| 作業メモ | `AGENTS_TASKS.md` | 人間用メモ・AI へ渡す下書き |

## リポジトリ概要

```
~/sites/astro-attendsalon-r/   （Cursor ワークスペース例: /Users/.../sites/astro-attendsalon-r と同じリポジトリ）
  src/
    components/    各セクションのAstroコンポーネント
    layouts/       BaseLayout.astro
    lib/           ユーティリティ（必要時）
    pages/         index.astro, /trainer, /faq, /company, /contact, …
    styles/        foundation / layout / components / utilities と各 .astro scoped CSS へ整理
  public/
    images/        画像（Figmaからエクスポートして配置）
  astro.config.mjs     static output（`@astrojs/tailwind` なし）
```

## スタック

- Astro 4.x（static output）
- オリジナル CSS + FLOCSS + Astro scoped CSS（**現時点の運用の正**）
- **`@astrojs/tailwind` / `tailwindcss` は本リポジトリから撤去済み**（ビルドに含めない）
- デプロイ: Cloudflare Pages（プロジェクト名 `astro-attendsalon-r`）

## スタイリング運用方針（現時点の正）

- スタイリングの主役は **Tailwind ではなくオリジナル CSS**。
- CSS の整理原則は **FLOCSS**。ただし実装単位の主役は **Astro コンポーネント**。
- セクション固有の見た目は、原則として **各 `.astro` ファイル内の scoped CSS** に閉じる。
- 共通 UI と共通レイアウトだけを `src/styles/` 配下のグローバル CSS に置く。
- 新規のスタイリング変更は **`docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` を正** として実装する。
- **フレームワーク付きの utility 列（旧 Tailwind 風）を新規に足さない。** 意図は **意味のある class 名** と `tokens.css` に寄せる。
- 触るコンポーネントで **未整理の併用**（名のない断片 + scoped CSS）を作らない。

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

トークン名自体は維持し、実装は CSS カスタムプロパティへ寄せること。文書上の旧 utility 名との対応は下表を参照。実装の正本は `src/styles/foundation/tokens.css` 。

```
pink-01  = #FB6B6A  // CTAボタン・アクセント（コーラル rgb(251,107,106)）
blue-01  = #7F9AA8  // タグ・アクセントライン
bg-warm  = #FAF6EF  // クリームベージュ背景
black-03 = #45423E  // 本文（暖チャコール）
border-soft / surface-*  // 定義は tokens.css 参照
```

## レイアウト仕様書（本文コンテナ）

### 目的

ビューポート幅が**本文カラム幅（960px）付近**でも、テキストやカードが**画面端に張り付かない**ようにする。Figma デスクトップ（1440px）でも、本文は中央の固定カラム＋左右ガターで読みやすく保つ。

### 数値（単一の正）

| 名前 | CSS トークン / class | 参考（移行前の utility 名） | CSS 相当 | 意味 |
|------|------------------------|-----------------------------|----------|------|
| 本文コンテナ幅 | `--container-max-width` / `.l-container` | 旧: 1008px 幅 utility | `1008px` | **960 + 24 + 24**。ガター込みのコンテナ上限 |
| 左右ガター | `--page-gutter` / `.l-container` | 旧: `px-6` | `24px` × 左右 | **全ブレークポイントで常時**（`md:px-0` 等で消さない） |
| 有効本文幅 | `.l-container` の内側 | 旧: 960px 幅 utility | `960px` | `box-sizing: border-box` 前提で `1008px - 24px * 2` |

式: **`container = content + gutter×2`** → `1008 = 960 + 24 + 24`。

### ボックスモデル（重要）

`Foundation reset` により要素は原則 **`box-sizing: border-box`** とする。本文コンテナは次を正とする。

```css
:root {
  --container-max-width: 1008px;
  --page-gutter: 24px;
}

.l-container {
  width: 100%;
  max-width: var(--container-max-width);
  min-width: 0;
  margin-inline: auto;
  padding-inline: var(--page-gutter);
}
```

- `.l-container` … ブロック全体の幅の上限 + 左右ガター
- `min-width: 0` … flex 子孫での横はみ出し防止

### 必須パターン（各ページ・各セクション）

1. **セクション背景を全幅にしたい**ときは二段にする: 外側 `section` / `div` は全幅（背景色・区切り）。**中身**は必ず次で包む。

```html
<div class="l-container">
  <!-- 見出し・本文・グリッド・カード -->
</div>
```

2. **`Header` / `Footer`** のナビ・コピーライト行も同じコンテナパターンで統一する。

3. **内側でさらに狭めたい**ときだけ `.l-container` の子にセクション固有 class を追加する。

### 禁止・要レビュー

- **PC（`md:` 以上）**で、親のガターを打ち消す `margin-inline: -24px` + `width: calc(100% + 48px)` などのフルブリード（コンテナ外へはみ出し）。`html` / `body` の `overflow-x-clip`（`BaseLayout`）と組み合わせると、**左だけ欠けて非対称**になることがある。
- レイアウト目的の **`100vw` / `w-screen` / `width: 100vw`**（スクロールバー有無で幅がズレる）。
- **`box-content` + `w-full` + 横 padding**（親より広がり横スクロールの典型原因）。

### 例外（コードにコメント必須）

| 例外 | 条件 |
|------|------|
| **SP 専用**のカルーセル等 | **小画面のみ**にスコープし、ガター相殺が必要な場合は「SP のみ」「理由（端までスワイプ領域）」をコメントに書く。 |
| **ヒーロー装飾**（巨大「R」SVG 等） | `absolute` + `vw`/`clamp` でファーストビュー演出。**本文ブロック自体はコンテナ内**に置く。 |
| **ドロップダウン / モーダル** | `min(100vw-3rem, …)` のビューポート基準は**オーバーレイ UI**に限る（本文コンテナの代替ではない）。 |

### トークン定義の正本

- トークン定義の正本は `src/styles/foundation/tokens.css` のみ。旧 `tailwind.config.mjs` は撤去済みのため、新規の参照・複製を増やさない。

## 実装ルール

1. **デザイン変更は必ず DESIGN.md（正本）を先に更新**してから実装する。**実装方式だけの変更**なら repo 側 docs の更新を先に行う
2. **CSS 実装は `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` に従う**。主役は custom CSS、整理原則は FLOCSS、実装単位は Astro コンポーネント
3. コンポーネントファイルは `src/components/` に置く（例: `HeroSection.astro`）。**セクション見出し**（英字ラベル＋装飾＋32px Zen）は `SectionHeading.astro` と `public/images/section-heading-deco.svg` で統一（Figma `294:720` 系）
4. 共有する見た目は `src/styles/components/`、共有するレイアウトは `src/styles/layout/`、セクション固有の見た目は各 `.astro` の scoped CSS に置く
5. 色・幅・余白・角丸・影・フォントなどの設計値は **CSS カスタムプロパティ** に寄せる。ハードコードや arbitrary 値は最小限にする
6. フォントは **Zen Kaku Gothic New をベース**。特別な数字装飾のみ `Lato` 等を使用可（例: `FeatureSection` の番号、`FlowSection` のステップ番号）。Noto は読み込みのみ残し、本文では原則使わない
7. 画像は `public/images/` に配置、alt 属性は日本語で記述。**描画イラスト・装飾画像**のトーン・線・色だまり・透過ルールは `docs/ILLUSTRATION_MEDIA_SPEC.md`（厚労省こころ系イメージに準拠）に従う
8. モバイル対応は `md = 768px` を基準に設計（デスクトップは 1440px 基準）。**本文コンテナ・ガターは上記「レイアウト仕様書（本文コンテナ）」に従う**。`BaseLayout` の `body` に `overflow-x-clip` あり
9. 触るコンポーネントでは、**名のない utility 断片と custom CSS の長期併用**を作らない。暫定ブリッジが必要な場合は、短命であることが分かるコメントを残す
10. **文言・コピー・ラベル・alt は、明示的な依頼がない限り変更しない**。CSS 移行やリファクタリングとコピー修正を同じ差分に混ぜない
11. **スクロール入場（`data-reveal`）はオプトイン**。`motion.css` + `soft-reveal.ts` は **`[data-reveal]` が付いた要素だけ**に初期非表示→`.is-visible` で表示する。**付けない**のがデフォルト。トップの LP 各セクションなど、演出が意図できる単位にだけ付ける。**フッター・サブページ丸ごとのラッパー・記事レイアウト全体**には付けない（長大ラッパーは交差判定や体感の面でも不利）。

## 禁止事項

- DESIGN.md を site repo 側に置くこと（正本は `~/AI/` 側のみ）
- 旧 Tailwind 互換の **フレームワーク付き utility 列**を新規に足すこと（`@astrojs/tailwind` / `tailwindcss` は導入しない）
- 意図のない class の羅列と custom CSS の無秩序なハイブリッド運用
- 依頼されていない文言変更
- インラインスタイルの多用
- コンポーネント外でのビジネスロジック記述
