# Cursor CSS Migration — VoiceSection

> **補足（2026-04）:** 当時の作業指示書。現行は `@astrojs/tailwind` / `tailwindcss` 撤去済み。

最初に以下を読んでください。

- `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md`
- `AGENTS.md`
- `docs/CODEX_HANDOFF_CSS_MIGRATION_BATCH_03.md`
- `docs/CODEX_HANDOFF_CSS_MIGRATION_BOTTOM_CTA.md`

## 前提

- このリポジトリでは `custom CSS + FLOCSS + Astro scoped CSS` を正とする（**現行も同じ**）
- 当時: **新規 utility は追加しない** 方針
- **見た目は変えない**
- **文言・コピー・ラベル・alt・リンク先・配列内文字列は、明示的な指示がない限り変更しない**
- 既存の未コミット差分は壊さず、必要なら取り込みながら進める

## 今回の作業対象

- `src/components/VoiceSection.astro`

必要に応じて参照:

- `src/components/SectionHeading.astro`
- `src/styles/foundation/tokens.css`
- `src/styles/layout/container.css`

## 目的

- `VoiceSection.astro` を Tailwind 主体の実装から `custom CSS + FLOCSS + Astro scoped CSS` に移行する
- 既存の見た目・文言・表構造・アクセシビリティを維持したまま、意味のある class 名へ置き換える

## 実装方針

1. ルート class を定義する
   - 例: `p-voice`
2. セクション固有スタイルは原則その `.astro` 内の scoped CSS に閉じる
3. 共通化が必要なものだけ既存 shared CSS を使う
4. レイアウトは既存の `l-container` を使う
5. 触ったコンポーネントでは Tailwind utility を除去する
6. Tailwind と custom CSS の長期併用状態は作らない

## VoiceSection 固有の注意

### 1. セクション構造

- `SectionHeading` はそのまま使ってよい
- 外側は `l-container` に置き換える
- ルートの `section`、内側の `article`、各ブロックに意味 class を付ける

### 2. 上段レイアウト

- 画像2枚 + 右側テーブルの2カラム構成を維持する
- SP では縦積み、`lg` 相当で横並びになる現状の見た目を維持する
- 画像ブロックは、2枚が同じ比率・同じ高さで並ぶこと
- 画像は `object-fit: cover` を維持する

### 3. テーブル

- `table`, `tbody`, `tr`, `th`, `td` の意味構造は維持する
- 横幅が狭い環境で `overflow-x-auto` 相当の横スクロールが必要な場合は、ラッパーに custom CSS で持たせる
- 行ボーダー、`th` の淡い文字色、`whitespace-nowrap` 相当の見た目を維持する

### 4. 中段の感想ブロック

- `bg-surface-01`
- `p-4 md:p-6`
- `rounded-sm`
- 見出し 2 行のサイズ感
- 箇条書きの行間

上記を custom CSS で写す

### 5. 下段の before / after カード

- SP では縦並び、`md` 相当で2カラム
- ボーダー・角丸・見出し中央・本文左寄せを維持する
- 本文は `14px / md 15px` 相当を維持する

## 禁止事項

- 文言変更
- alt 文の変更
- リンク先の変更
- テーブル構造の改変
- DOM 構造を不必要に崩すこと
- 新規 Tailwind utility の追加
- 触ったコンポーネントに Tailwind utility を残すこと
- 1 回の移行作業の中で CSS 移行とコピー改修を混ぜること

## 完了条件

- `VoiceSection.astro` で Tailwind utility 依存がなくなっている
- 見た目が維持されている
- 文言が変わっていない
- `npm run build` が成功する

## 完了時に報告してほしいこと

- 更新したファイル
- 新しく追加した shared CSS があればその理由
- `VoiceSection.astro` にまだ Tailwind が残っている箇所
- build 結果
- handoff 用に Codex へ伝えるべき注意点
