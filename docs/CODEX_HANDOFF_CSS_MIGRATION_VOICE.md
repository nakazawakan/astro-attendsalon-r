# Codex 向けメモ — VoiceSection CSS 移行

> **補足（2026-04）:** `@astrojs/tailwind` / `tailwindcss` は本リポジトリから撤去済み。以下は**移行作業当時**の記録。

このファイルは、Cursor 側で実施した **`VoiceSection.astro` の Tailwind → custom CSS（FLOCSS + Astro scoped CSS）** 移行を Codex に共有するための要約です。

## 正本（実装判断の根拠）

- `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md`
- `AGENTS.md`（本文コンテナ: `l-container`、数値の正）
- 前提: Batch 03 handoff および上記正本に従う

## 今回のスコープ

| ファイル | ルート class | 備考 |
|---------|----------------|------|
| `src/components/VoiceSection.astro` | `p-voice` | `SectionHeading` は既存 shared を利用。セクション固有の画像2枚、企業情報テーブル、感想ブロック、比較カード2枚を **コンポーネント内 `<style>`（scoped）** に集約。旧 1008px 幅 + `px-6` / 960px 幅指定は **`l-container`** に置き換え |

## 守った制約

- **文言・コピー・ラベル・alt・リンク先・配列内文字列は変更していない。**
- **新規 Tailwind utility は追加していない。** 当該コンポーネントから **Tailwind class は除去済み。**
- 見た目維持を意図し、ブレークポイントは **`sm=640 / md=768 / lg=1024`** を使用。
- 上段の「写真2枚 + テーブル」は **`lg=1024` から横並び**。
- 下段の比較カード2枚は **`md=768` から2カラム**。
- 画像はデータ駆動の `object-[…]` などは使わず、**2 枚固定 + `object-fit: cover`** を従来どおり維持。
- 狭幅時のテーブル横スクロールは **`.p-voice__table-wrap { overflow-x: auto; }`** で吸収。
- 見出し内の **`<br />` はそのまま維持**。

## 追加したグローバル CSS ファイル

- **なし**（セクション固有は `VoiceSection.astro` の `<style>` のみ）。

## ビルド

- 最終確認時点で `npm run build` は **成功**。

## 当時、未移行候補として挙がっていた箇所（参考・履歴）

`VoiceSection` は当時完了。**以降の移行候補の例（当時）:**

- `src/pages/*.astro`（各サブページのラッパー・`prose` など）
- `src/components/FlowSection.astro`
- `src/components/AboutSection.astro` など、まだ legacy class を含む箇所

## Codex に確認してほしい観点（任意）

1. テーブル周りの `overflow-x: auto` が、旧 `overflow-x-auto` の見た目と運用上十分一致しているか。
2. 上段 `lg=1024`、下段 `md=768` というブレーク分離が、旧 `lg / md` の意図を正しく保てているか。
3. `p-voice__panel`, `p-voice__quote`, `p-voice__compare-card` の角丸・影・余白が、他の移行済みセクションとの一貫性を保てているか。

## 差分の見方

```bash
git diff -- src/components/VoiceSection.astro
```

---

*作成意図: Codex CLI / 別セッションでのレビュー・続きの移行タスクに文脈を渡すため。*
