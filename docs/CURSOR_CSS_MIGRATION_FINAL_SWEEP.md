# Cursor CSS Migration — Final Sweep

> **補足（2026-04）:** 当時の作業指示書。現行は `@astrojs/tailwind` / `tailwindcss` 撤去済み。

最初に以下を読んでください。

- `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md`
- `AGENTS.md`
- `docs/CODEX_HANDOFF_CSS_MIGRATION_BATCH_03.md`
- `docs/CODEX_HANDOFF_CSS_MIGRATION_BOTTOM_CTA.md`
- `docs/CODEX_HANDOFF_CSS_MIGRATION_VOICE.md`

## 前提

- このリポジトリでは `custom CSS + FLOCSS + Astro scoped CSS` を正とする（**現行も同じ**）
- 当時: **新規 utility は追加しない** 方針で、最終的にパッケージ撤去（完了。`docs/CODEX_FEEDBACK_TAILWIND_REMOVAL.md` 参照）
- **見た目は変えない**
- **文言・コピー・ラベル・alt・リンク先・配列内文字列は、明示的な指示がない限り変更しない**
- 既存の未コミット差分は壊さず、必要なら取り込みながら進める

## 目的

- リポジトリ内の **残っている Tailwind 主体の実装をすべて洗い出し、custom CSS + FLOCSS + Astro scoped CSS へ移行する**
- 既存の見た目・文言・挙動・アクセシビリティを維持したまま、最終的に Tailwind 撤去へ近づける

## 作業対象

1. `src/components/`
2. `src/pages/`

ただし、すでに移行済みのコンポーネントは再設計せず、必要最小限の整合調整だけにとどめること。

## 最初にやること

1. まだ Tailwind utility が残っているファイルを洗い出す
2. 対象ファイルを一覧化する
3. 依存関係の強いものはセットで進める
4. 影響範囲の小さいものから順に移行する

## 推奨順

1. `src/pages/*.astro`
   - `about/index.astro`
   - `contact/index.astro`
   - `faq/index.astro`
   - `instructor/index.astro`
   - `kanjorodou/index.astro`
2. 残っている legacy component
   - もし未移行があれば、その一覧を自分で追加して処理する

## 実装方針

1. 各ファイルにルート class を定義する
2. レイアウトは `l-container` を使う
3. セクション固有スタイルは原則その `.astro` 内の scoped CSS に閉じる
4. 共通化が必要なものだけ既存 shared CSS に寄せる
5. 触ったファイルでは Tailwind utility を除去する
6. Tailwind と custom CSS の長期併用状態は作らない
7. `prose` を使っているページは、ページ専用 class で本文スタイルを明示する

## ページ系の注意

### `src/pages/kanjorodou/index.astro`

- `prose` 依存をなくす
- 本文の段落間、リンク装飾、CTA ボタンを custom CSS に置き換える

### `src/pages/about/index.astro`

- テーブル構造は維持する
- `th` / `td` の余白、背景、境界線、列幅を custom CSS 化する

### `src/pages/contact/index.astro`

- カード 2 列のブレークポイント、見出し、説明文、リンク装飾を維持する

### `src/pages/faq/index.astro`

- FAQ のカード見た目と CTA を維持する

### `src/pages/instructor/index.astro`

- `InstructorSection` の `embedded` 利用前提と見た目を壊さない

## 禁止事項

- 文言変更
- alt 文の変更
- リンク先の変更
- DOM 構造を不必要に崩すこと
- 新規 Tailwind utility の追加
- 触ったファイルに Tailwind utility を残すこと
- CSS 移行とコピー改修を同じ差分に混ぜること

## 完了条件

- `src/components/` と `src/pages/` に残っている Tailwind utility を洗い出し、対象範囲をすべて移行している
- 見た目が維持されている
- 文言が変わっていない
- `npm run build` が成功する

## 完了時に必ず作成するファイル

完了後、以下のフィードバック用 md を **必ず新規作成** してください。

- `docs/CODEX_FEEDBACK_CSS_FINAL_SWEEP.md`

この md には必ず以下を含めること。

1. 今回移行したファイル一覧
2. まだ Tailwind が残っている箇所があればその一覧
3. なぜ残したか
4. build 結果
5. 目視確認が必要なポイント
6. Tailwind 依存パッケージを安全に削除できる段階かどうか
7. Codex / 人間に渡したい注意点

## 完了時に報告してほしいこと

- 更新したファイル
- 作成した `docs/CODEX_FEEDBACK_CSS_FINAL_SWEEP.md`
- build 結果
- Tailwind の完全撤去に進めるかどうか
