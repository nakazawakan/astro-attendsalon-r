# Cursor CSS Migration Batch 03

> **補足（2026-04）:** 当時の作業指示書。現行は `@astrojs/tailwind` / `tailwindcss` 撤去済み。

最初に以下を読んでください。

- `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md`
- `AGENTS.md`
- `docs/CURSOR_CSS_MIGRATION_REVIEW.md`

## 前提

- このリポジトリでは `custom CSS + FLOCSS + Astro scoped CSS` を正とする（**現行も同じ**）
- 当時: Tailwind パッケージは残っていても **新規 utility は追加しない** 方針
- **見た目は変えない**
- **文言・コピー・ラベル・alt・配列中の文字列は、明示的な指示がない限り変更しない**
- 既存の未コミット差分は壊さず、必要なら取り込みながら進める

## 今回の作業対象

- `src/components/ServiceCard.astro`
- `src/components/ServiceSection.astro`
- `src/components/FaqSection.astro`

必要に応じて参照:

- `src/components/SectionHeading.astro`
- `src/components/NoImagePlaceholder.astro`
- `src/styles/foundation/tokens.css`
- `src/styles/layout/container.css`
- `src/styles/components/button.css`

## 目的

- 上記3コンポーネントを Tailwind 主体の実装から `custom CSS + FLOCSS + Astro scoped CSS` に移行する
- 既存の見た目・文言・挙動を維持したまま、意味のある class 名へ置き換える

## 実装方針

1. 各コンポーネントにルート class を定義する
   - 例: `p-service-section`, `p-service-card`, `p-faq`
2. セクション固有スタイルは原則その `.astro` 内の scoped CSS に閉じる
3. 共通化が必要なものだけ `src/styles/components/` に出す
4. レイアウトは既存の `l-container` を使う
5. 触ったコンポーネントでは Tailwind utility を除去する
6. Tailwind と custom CSS の長期併用状態は作らない

## 個別の注意

### ServiceCard.astro

- CTA ボタンは既存の shared button と整合するか確認する
- ただし、見た目差が出るなら無理に共通化せず scoped CSS に残してよい
- `bodyTone` の分岐は class modifier で表現する

### ServiceSection.astro

- SP カルーセルの挙動を壊さない
- Embla 用の DOM id / script 挙動は維持する
- `-mx-6` 相当だった表現を custom CSS 化する場合も、SP 限定であることが分かるようにする
- セクションのコンテナは既存の `l-container` を使う

### FaqSection.astro

- `details` / `summary` の開閉 UI とアクセシビリティを維持する
- 見出し、本文、ボーダー、余白、矢印アイコンの見た目を変えない

## 禁止事項

- 文言変更
- alt 文の変更
- リンク先の変更
- DOM 構造を不必要に崩すこと
- 新規 Tailwind utility の追加
- 触ったコンポーネントに Tailwind utility を残すこと
- 1 回の移行作業の中で CSS 移行とコピー改修を混ぜること

## 完了条件

- 対象3コンポーネントで Tailwind utility 依存がなくなっている
- 見た目が維持されている
- 文言が変わっていない
- `npm run build` が成功する

## 完了時に報告してほしいこと

- 更新したファイル
- 新しく追加した shared CSS があればその理由
- まだ Tailwind が残っている箇所
- build 結果
- 次に移行すべき候補
