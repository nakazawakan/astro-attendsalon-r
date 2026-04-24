# Cursor / Codex 向け修正指示

## 正本

- `/Users/nakazawakan/sites/astro-attendsalon-r/docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md`
- `/Users/nakazawakan/sites/astro-attendsalon-r/AGENTS.md`

## 前提

- 正は本番 `https://astro-attendsalon-r.pages.dev`
- ローカル preview と本番を比較した結果、**現時点で明確に崩れているのは `FeatureSection`** です
- **文言・コピー・ラベル・alt・リンク先・配列内文字列は変更しない**
- Tailwind は再導入しない
- custom CSS + FLOCSS + Astro scoped CSS の方針を維持する

## 対象ファイル

- `/Users/nakazawakan/sites/astro-attendsalon-r/src/components/FeatureSection.astro`
- 必要なら `/Users/nakazawakan/sites/astro-attendsalon-r/src/components/NoImagePlaceholder.astro`

## 確認された差分

### 1. SP で特徴カード上部のプレースホルダが潰れている

- 本番:
  - 各カード上部に十分な高さの `NO IMAGE` プレースホルダがあり、その下に本文カードが続く
- ローカル:
  - プレースホルダが**細い灰色バー**のように潰れている

### 2. PC で特徴セクションの 2 カラム構成が崩れている

- 本番:
  - 画像プレースホルダと本文カードが、左右交互のバランスした 2 カラムで並ぶ
- ローカル:
  - 画像側が**異常に大きく伸び**、本文側が**細い縦長のカラム**になっている

## 原因の見立て

`FeatureSection.astro` では `NoImagePlaceholder` に `class="p-feature__placeholder"` を渡しているが、  
親コンポーネント側の scoped CSS で定義した `.p-feature__placeholder` が、**子コンポーネントの root 要素に期待どおり効いていない可能性が高い**です。

Astro の scoped CSS では、**親から渡した class 名だけでは子コンポーネント root に対するスタイルが漏れない**ケースがあります。  
そのため、`min-height` / `width` / `max-width` が実際には当たらず、プレースホルダのサイズが崩れている可能性が高いです。

## 修正方針

次のどちらかで直してください。

### 推奨案

`NoImagePlaceholder` を直接レイアウト要素にせず、`FeatureSection.astro` 側で**ラッパー要素**を持つ

例:

- `div.p-feature__media` を作る
- その中に `<NoImagePlaceholder />` を置く
- 高さ・幅・並び順は **ラッパー側** に持たせる

この形なら Astro scoped CSS の責務が明確で、再発しにくいです。

### 代替案

`FeatureSection.astro` 側で `:global(.p-feature__placeholder)` を使って、子 root に確実に当てる

ただし、今回の用途はレイアウト責務なので、ラッパー案の方が自然です。

## 完了条件

- SP で `FeatureSection` の各カード上部に、本番同等の高さの `NO IMAGE` プレースホルダが表示される
- PC で、本番同等の左右交互 2 カラムレイアウトになる
- `FeatureSection` 以外の見た目を変えない
- `npm run build` が成功する

## 修正後の確認観点

- `390px` 前後:
  - `NO IMAGE` プレースホルダの高さ
  - カード本文との接続
  - セクション間余白
- `1440px` 前後:
  - 画像と本文カードの横幅バランス
  - `image-left` / `image-right` の交互レイアウト
  - 数字見出しと本文の位置

## 完了時に報告してほしいこと

- 変更ファイル
- 採用した修正方式
  - ラッパー化
  - あるいは `:global(...)`
- `npm run build` の結果
- 本番との差分が解消したか
