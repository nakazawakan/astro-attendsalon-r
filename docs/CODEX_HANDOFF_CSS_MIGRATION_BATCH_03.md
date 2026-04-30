# Codex 向けメモ — CSS 移行 Batch 03 完了

> **補足（2026-04）:** `@astrojs/tailwind` / `tailwindcss` は本リポジトリから撤去済み。以下は**移行作業当時**の記録。現行方針は `AGENTS.md` / `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` を正とする。

このファイルは、Cursor 側で実施した **Tailwind → custom CSS（FLOCSS + Astro scoped CSS）** 移行の一部（Batch 03）を Codex に共有するための要約です。

## 正本（実装判断の根拠）

- `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md`
- `AGENTS.md`（本文コンテナ: `l-container`、数値の正）
- 作業指示: `docs/CURSOR_CSS_MIGRATION_BATCH_03.md`

## 今回のスコープ

以下 3 コンポーネントを移行済みです。

| ファイル | ルート class | 備考 |
|---------|----------------|------|
| `src/components/ServiceCard.astro` | `p-service-card` | CTA は `.c-button` と寸法が異なるため scoped のまま（`src/styles/components/button.css` は未使用） |
| `src/components/ServiceSection.astro` | `p-service-section` | Embla（`#service-embla-viewport` / `#service-embla-container` / `embla-carousel` 動的 import）は維持。SP 用の `-mx-6` 相当は `var(--page-gutter)` で相殺 |
| `src/components/FaqSection.astro` | `p-faq` | `details` / `summary`、開閉時の矢印回転、リンク装飾を scoped で再現 |

## 守った制約

- **文言・コピー・ラベル・alt・リンク先は変更していない**（Batch 指示どおり）。
- **新規 Tailwind utility は追加していない**。触ったコンポーネントから **Tailwind class は除去済み**。
- 見た目維持を意図（`shadow-sm` ≈ `0 1px 2px rgb(0 0 0 / 0.05)`、`border-black/[0.06]` 等を CSS で明示）。

## 追加したグローバル CSS ファイル

- **なし**（セクション固有は各 `.astro` の `<style>` に集約）。

## ビルド

- 最終確認時点で `npm run build` は **成功**。

## 当時、未移行候補として挙がっていた箇所（参考・履歴）

Batch 03 の時点のメモ。パッケージ撤去・追加スイープ後の現状は `docs/CODEX_FEEDBACK_TAILWIND_REMOVAL.md` 等を参照。

- `src/components/`: 例 `BottomCtaSection.astro`, `FlowSection.astro`, `VoiceSection.astro`, `InstructorSection.astro`, `InstructorCardsRow.astro` など
- `src/pages/*.astro`: 各サブページのラッパー・見出し・ `prose` など

## Codex に確認してほしい観点（任意）

1. **ServiceCard** の CTA が、将来 `c-button c-button--solid-pink` に寄せられるか、あるいは現状のまま project 固有でよいか。
2. **ServiceSection** の `p-service-section__intro` で、2 段落の余白を `p + p { margin-top: 1em }` にしている点が、元の `mb-0` + ブラウザ既定マージンの見え方と十分近いか。
3. **FaqSection** で `group` を外したこと（子に `group-hover` 等が無い前提）で問題ないか。

## 差分の見方

```bash
git diff -- src/components/ServiceCard.astro src/components/ServiceSection.astro src/components/FaqSection.astro
```

---

*作成意図: Codex CLI / 別セッションでのレビュー・続きの移行タスクに文脈を渡すため。*
