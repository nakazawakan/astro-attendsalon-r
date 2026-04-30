# Codex 向けメモ — BottomCtaSection CSS 移行

> **補足（2026-04）:** `@astrojs/tailwind` / `tailwindcss` は本リポジトリから撤去済み。以下は**移行作業当時**の記録。

このファイルは、Cursor 側で実施した **`BottomCtaSection.astro` の Tailwind → custom CSS（FLOCSS + Astro scoped CSS）** 移行を Codex に共有するための要約です。  
（Batch 03 完了後の追加分。Batch 03 自体の要約は `docs/CODEX_HANDOFF_CSS_MIGRATION_BATCH_03.md` を参照。）

## 正本（実装判断の根拠）

- `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md`
- `AGENTS.md`（本文コンテナ: `l-container`、数値の正）
- 前提: Batch 03 handoff および上記正本に従う

## 今回のスコープ

| ファイル | ルート class | 備考 |
|---------|----------------|------|
| `src/components/BottomCtaSection.astro` | `p-bottom-cta` | 背景ブロブ・アクセント帯・カード枠・コーナー装飾・CTA ボタンを **コンポーネント内 `<style>`（scoped）** に集約。旧 1008px 幅 + `px-6` / 960px 幅指定を **`l-container`** に置き換え |

## 守った制約

- **文言・コピー・ラベル・alt・リンク先・配列内文字列は変更していない。**
- **新規 Tailwind utility は追加していない。** 当該コンポーネントから **Tailwind class は除去済み。**
- 見た目維持を意図（例: カード影 `0 12px 40px -12px rgba(69,66,62,0.08)`、CTA の `shadow-sm` 相当、ブロブ位置・`md` 相当は `min-width: 768px`）。
- **モバイル専用改行**は旧 `br.md:hidden` を **`p-bottom-cta__br--mobile`**（SP のみ `display: block`、768px 以上で非表示）に読み替え。テキスト内容は不変。

## 追加したグローバル CSS ファイル

- **なし**（セクション固有は `BottomCtaSection.astro` の `<style>` のみ）。`.c-button` は本セクションの CTA 寸法と合わないため、従来どおり **scoped の `.p-bottom-cta__cta`** で完結（ServiceCard 方針に近い）。

## ビルド

- 最終確認時点で `npm run build` は **成功**。

## 当時、未移行候補として挙がっていた箇所（参考・履歴）

`BottomCtaSection` は当時完了。**以降の移行候補の例（当時）:**

- `src/components/FlowSection.astro`, `VoiceSection.astro`, `InstructorSection.astro`, `InstructorCardsRow.astro` など
- `src/components/AboutSection.astro` 等、部分的に未移行の箇所
- `src/pages/*.astro`（各サブページのラッパー・`prose` など）

## Codex に確認してほしい観点（任意）

1. **CTA** を将来 `c-button c-button--solid-pink` に統一する場合、本セクション用に **モディファイア**（`min-height` / `max-width` / `padding`）をグローバルに足すか、**scoped のまま**がよいか。
2. **ブロブ装飾**の `position` / `opacity` をデザイントークン化する価値があるか、セクション専用の **マジックナンバー**のままか。

## 差分の見方

```bash
git diff -- src/components/BottomCtaSection.astro
```

---

*作成意図: Codex CLI / 別セッションでのレビュー・続きの移行タスクに文脈を渡すため。*
