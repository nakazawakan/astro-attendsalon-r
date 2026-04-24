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
      tokens.css
      reset.css
      base.css
    layout/
      page-shell.css
    components/
      button.css
      section-heading.css
      link.css
    utilities/
      visually-hidden.css
  components/
    ...
```

## レイヤーの責務

### Foundation

- `tokens.css`: 色、幅、余白、角丸、影、フォントなどの設計値
- `reset.css`: `box-sizing: border-box`、画像や見出しの初期化など
- `base.css`: `body`、リンク、見出し、本文の基本ルール

### Layout

- `.l-page-shell`、`.l-page-inner` のような、サイト横断のレイアウト骨格だけを置く
- 見た目の装飾やコンポーネント固有の色は持たせない

### Component

- `.c-button`、`.c-section-heading`、`.c-link` のような、複数箇所で再利用する UI 部品
- 汎用性がないものはここに入れない

### Project

- サイト固有のセクションやブロック
- 原則として **各 `.astro` ファイル内の scoped CSS** に置く
- ルートクラスは `p-hero`、`p-service-section` のように命名する

### Utility

- `u-visually-hidden` など、アクセシビリティや例外的な補助だけ
- レイアウトや装飾の主役にしない

## 命名規則

- Layout: `l-*`
- Component: `c-*`
- Project: `p-*`
- Utility: `u-*`
- State: `is-*`
- 要素と修飾は BEM 風に `__` と `--` を使う

例:

```html
<section class="p-hero">
  <div class="l-page-shell">
    <div class="l-page-inner">
      <div class="p-hero__content">
        <a class="c-button c-button--primary" href="/contact/">資料請求</a>
      </div>
    </div>
  </div>
</section>
```

## レイアウト標準

本文シェルは次を正とします。

```css
:root {
  --page-max-width: 960px;
  --page-gutter: 24px;
  --page-shell-max-width: 1008px;
}

.l-page-shell {
  width: 100%;
  max-width: var(--page-shell-max-width);
  margin-inline: auto;
  padding-inline: var(--page-gutter);
}

.l-page-inner {
  width: 100%;
  max-width: var(--page-max-width);
  min-width: 0;
  margin-inline: auto;
}
```

標準マークアップ:

```html
<div class="l-page-shell">
  <div class="l-page-inner">
    <!-- heading / body / grid / cards -->
  </div>
</div>
```

## 実装の優先順位

1. `BaseLayout.astro` で foundation / layout / shared component CSS を読み込める状態を作る
2. `SectionHeading`、ボタン、リンク、本文シェルのような共通部品を先に抽出する
3. `Header` / `Footer` を custom CSS 化する
4. `HeroSection` 以降を、**1 コンポーネントずつ完結した単位で** 移行する
5. 移行完了後、`tailwind.config.mjs` および `package.json` から `@astrojs/tailwind` / `tailwindcss` を削除する（**本リポジトリでは撤去済み**）

## コンポーネント単位の移行ルール

- 触るコンポーネントには、まずルートクラスを 1 つ定義する
- 旧 utility 風の指定は **意味 class** に読み替える
- セクション固有の CSS は、その `.astro` ファイルの `<style>` に移す
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
- `AGENTS.md` の本文シェル仕様と矛盾していない

## 補足

- デザインそのものを変える場合は、先に `~/AI/companies/ararat/sites/attendsalon-r.com/DESIGN.md` を更新する
- 今回のスタイリング方針変更は **実装方式の変更** なので、見た目を変えない限り repo 側 docs の更新を優先する
- 困ったら、class 断片の温存より **人間が読める class 名に落とし直す** 方を優先する
