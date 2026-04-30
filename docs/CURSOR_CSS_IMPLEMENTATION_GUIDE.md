# Cursor CSS Implementation Guide

このファイルは、`astro-attendsalon-r` の CSS 実装を Cursor / Codex / Claude Code に依頼するときの指示書です。

目的は 1 つです。**見た目を変えずに、CSS の運用コストを下げること。**

## 今回の意思決定

- スタイリングの主役は **Tailwind ではなくオリジナル CSS** にする。
- CSS の整理原則は **FLOCSS** を採用する。
- ただし実装単位の主役は **Astro コンポーネント** とし、FLOCSS は CSS の交通整理として使う。
- セクション固有の見た目は、原則として **各 `.astro` ファイル内の scoped CSS** に閉じる。
- 共通 UI と共通レイアウトだけを、`src/styles/` 配下のグローバル CSS に置く。
- 本リポジトリに **`@astrojs/tailwind` / `tailwindcss` は含めない**（撤去済み）。旧 utility 風のクラス列を新規に増やさない。
- SCSS / Sass には移行しない。標準 CSS（CSS カスタムプロパティ、cascade layers、container queries、必要最小限の native nesting）を正とする。
- cascade layers は **グローバル CSS の整理**に使う。`.astro` の scoped CSS は原則 layer 外に置き、コンポーネント固有の最終表現として扱う。

## 最重要ルール

- 既存の見た目は変えない。今回の主眼はリデザインではなく実装方式の変更。
- **文言・コピー・ラベル・alt・配列中の文字列は、明示的な指示がない限り変更しない。**
- 触るコンポーネントでは、**意図のない class の羅列と custom CSS を無秩序に混在させない**。
- 共通化できるものだけをグローバルに出す。1 セクション専用の見た目はそのコンポーネントに閉じる。
- 長い utility 列で意図を表現しない。**意味のある class 名** を使う。
- 色・余白・幅・フォントは **CSS カスタムプロパティ** に寄せる。
- `style=""` のインライン指定は避ける。例外は、JS 連動でどうしても必要な一時的な値だけ。

## ゴール

- 人間が `.astro` を開いたときに、HTML から構造と意図が読めること。
- CSS の修正箇所を、クラス名とファイル配置から推測できること。
- 共通部品の見た目変更が、局所的かつ安全に行えること。
- 専用の utility フレームワークに頼らず、通常の HTML/CSS の読解だけで改修できること。

## 推奨ディレクトリ構成

移行後の標準形は次です。まだ存在しないファイルは、この構成で追加してください。

```text
src/
  styles/
    foundation/
      layers.css
      tokens.css
      reset.css
      base.css
    layout/
      container.css
      section.css
    components/
      button.css
      section-heading.css
      link.css
    utilities/
      visually-hidden.css
      motion.css
      visibility-bp.css
  components/
    ...
```

## Cascade Layers

グローバル CSS は次の layer order を正とする。

```css
@layer foundation, layout, components, utilities;
```

- `foundation`: token、reset、base。サイト全体の土台だけを置く
- `layout`: `.l-*`。横幅・余白・セクション間隔など、装飾を持たない骨格だけを置く
- `components`: `.c-*`。複数箇所で再利用する UI 部品だけを置く
- `utilities`: `.u-*` と挙動補助。アクセシビリティ、表示切替、軽い motion hook に限定する

`.astro` 内の scoped CSS は layer に入れない。Astro が付与する scoped selector と layer の優先順位が混ざると、上書き関係が読みにくくなるため、コンポーネント固有 CSS はそのコンポーネント内で完結させる。

## FLOCSS レイヤーの責務

### Foundation

- `layers.css`: グローバル CSS の cascade layer order
- `tokens.css`: 色、幅、余白、角丸、影、フォントなどの設計値
- `reset.css`: `box-sizing: border-box`、画像や見出しの初期化など
- `base.css`: `body`、リンク、見出し、本文の基本ルール

### Layout

- `.l-container` のような、サイト横断のレイアウト骨格だけを置く
- 見た目の装飾やコンポーネント固有の色は持たせない
- `.l-section` はセクション間の `padding-block` 専用とする。背景色・装飾・個別配置は `p-*-section` 側へ置く

### Component

- `.c-button`、`.c-section-heading`、`.c-link` のような、複数箇所で再利用する UI 部品
- 汎用性がないものはここに入れない

### Project

- サイト固有のセクションやブロック
- 原則として **各 `.astro` ファイル内の scoped CSS** に置く
- セクション root は `p-about-section`、`p-service-section`、`p-faq-section` のように `p-*-section` で命名する

### Utility

- `u-visually-hidden` など、アクセシビリティや例外的な補助だけ
- レイアウトや装飾の主役にしない
- `motion.css` は `[data-reveal]`、`is-visible`、ヒーロー初回入場などの軽い挙動補助だけを扱う。特定コンポーネント専用の大きな装飾アニメは、その `.astro` の scoped CSS へ置く
- **`data-reveal` はオプトイン**（付けない＝スクロール入場なし）。トップ LP のセクション単位など、意図があるときだけ付与する。フッター・サブページ全体ラッパー・記事レイアウト全体には付けない（`AGENTS.md` 実装ルール 11 参照）

## 命名規則

- Layout: `l-*`
- Component: `c-*`
- Project: `p-*`
- Utility: `u-*`
- State: `is-*`
- 要素と修飾は BEM 風に `__` と `--` を使う
- `data-*` は JS/挙動フックとして許可する（例: `[data-reveal]`）。見た目の主役にはしない
- `id` はアンカー、アクセシビリティ、JS 参照に限定し、CSS セレクタの主役にしない
- 外部ライブラリ由来の名前を残す場合は、該当 CSS の近くに理由コメントを置く

例:

```html
<section class="l-section p-hero-section">
  <div class="l-container">
    <div class="p-hero-section__content">
      <a class="c-button c-button--primary" href="/contact/">資料請求</a>
    </div>
  </div>
</section>
```

## レイアウト標準

本文コンテナは次を正とします。

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

標準マークアップ:

```html
<div class="l-container">
  <!-- heading / body / grid / cards -->
</div>
```

## ブレークポイント運用標準

- 幅ブレークポイントは `767/768` 境界を主軸にし、`1024` を補助で使う
- CSS のメディアクエリは **直書き禁止**。`src/styles/foundation/custom-media.css` の定義名のみ利用する
  - `--bp-sp-down` = `(max-width: 767px)`
  - `--bp-md-up` = `(min-width: 768px)`
  - `--bp-lg-up` = `(min-width: 1024px)`
- 記法は `min/max` を許容するが、必ず上記 custom media 名を経由する
- モバイルファーストを基本とし、メディア外を SP、必要差分を `@media (--bp-md-up)` / `@media (--bp-lg-up)` で上書きする
- CSS と JS で境界値を二重管理しない。JS の `matchMedia` は `src/lib/breakpoints.ts` の定数を参照する
- 新しいブレークポイントを追加する場合は、実装より先に `custom-media.css` / 本ガイド / `tokens.css` を更新する
- 直書き再発チェックは `npm run check:breakpoints` を使う

## 実装の優先順位

1. `BaseLayout.astro` で foundation / layout / shared component CSS を読み込める状態を作る
2. `SectionHeading`、ボタン、リンク、本文コンテナのような共通部品を先に抽出する
3. `Header` / `Footer` を custom CSS 化する
4. `HeroSection` 以降を、**1 コンポーネントずつ完結した単位で** 移行する
5. 移行完了後、`tailwind.config.mjs` および `package.json` から `@astrojs/tailwind` / `tailwindcss` を削除する（**本リポジトリでは撤去済み**）

## コンポーネント単位の移行ルール

- 触るコンポーネントには、まずルートクラスを 1 つ定義する
- 旧 utility 風の指定は **意味 class** に読み替える
- セクション固有の CSS は、その `.astro` ファイルの `<style>` に移す
- `<style is:global>` は原則使わない。slotted content は scoped CSS 内の `:global()` で最小限に扱う
- `:global()` は slot 内の素要素、または子コンポーネントの既知の `c-*` ルート調整に限定する
- native nesting は浅く使う。BEM の class 名が追えなくなる深いネストは禁止する
- container queries はコンポーネントの利用幅に応じた調整に使う。本文シェル外へのフルブリードや `100vw` の代替にはしない
- 複数コンポーネントで重複したら、その時点で `src/styles/components/` へ昇格させる
- `max-width`, `padding`, `gap`, `color` のような値が 2 回以上出たら token 化を検討する

## 共通化の判断基準

- 3 箇所以上で使う見込みがあるなら shared component 候補
- 1 ページ専用なら project scoped CSS に閉じる
- 「汎用ボタン」「見出し」「タグ」「カード」などは shared component 化してよい
- 「ヒーロー専用の R 装飾」「サービスカルーセル専用の寸法」などは共通化しない

## やってはいけないこと

- `@astrojs/tailwind` や `tailwindcss` を再導入すること、またはそれに相当する **utility 列だけで見た目を積み上げる**こと
- 1 つのコンポーネントで、整理されていない class 断片と custom CSS を半々で持ち続けること
- 巨大なグローバル `project.css` を作ってセクション固有 CSS を集約すること
- 任意値だらけの CSS を書いて token 化を避けること
- FLOCSS の prefix だけ導入して、実際の責務分離をしないこと
- CSS 移行タスクの中で、依頼されていない文言変更を混ぜること

## 最低限の受け入れ条件

- 見た目が現行と一致している
- `npm run build` が通る
- 触ったコンポーネントに、**未整理の旧 utility 風クラス**が残っていない
- 共通部品の変更点が、対応する CSS ファイルまたはコンポーネント内 style を見れば追える
- `AGENTS.md` の本文コンテナ仕様と矛盾していない

## 補足

- デザインそのものを変える場合は、先に `~/AI/companies/ararat/sites/attendsalon-r.com/DESIGN.md` を更新する
- 今回のスタイリング方針変更は **実装方式の変更** なので、見た目を変えない限り repo 側 docs の更新を優先する
- 困ったら、class 断片の温存より **人間が読める class 名に落とし直す** 方を優先する
