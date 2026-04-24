# AGENTS_TASKS.md — 作業メモ・指示書

このファイルは **人間が書くメモ・AI への依頼メモ** 用です。  
Cursor / Claude などに「まずこれを読んで」と渡すときの下書きに使ってください。

- 正本のデザイン・運用ルールは **`AGENTS.md`** を参照すること。
- CSS / レイアウト変更を含む依頼では、必ず **`docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md`** も先に読ませること。
- `tailwindcss` / `@astrojs/tailwind` は導入しない（撤去済み）。**旧 utility 風の class 列を新規に増やさない**。
- スタイリングを触るときは、可能な限り **触ったコンポーネント単位で custom CSS 化して閉じる**。
- 見た目を変える依頼か、実装方式だけを変える依頼かをメモ内で明示すること。
- ここに書いた内容の実装は、都度コミット・`main` へ push して本番反映すること（未 push だと本番に出ません）。

---

## 依頼テンプレート

```md
## Task
- 何を直すか

## Scope
- 対象ページ / 対象コンポーネント

## Constraints
- 見た目は変えない / 変える
- custom CSS + FLOCSS + Astro scoped CSS を使う
- 未整理の utility 風クラスは増やさない

## Verify
- npm run build
- 主要ページの見た目確認
```

## メモ

（以下に自由に追記）
