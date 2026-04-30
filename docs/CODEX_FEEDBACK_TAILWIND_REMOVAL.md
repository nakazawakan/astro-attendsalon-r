# Codex 向け: Tailwind 統合・依存の撤去

**正本:** `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` / `AGENTS.md`  
**きっかけ:** `docs/CODEX_FEEDBACK_CSS_FINAL_SWEEP.md` §6 の推奨手順（マークアップ上の utility 撤去後のパッケージ整理）

---

## 変更ファイル一覧

### ビルド・設定

| 操作 | パス |
|------|------|
| 更新 | `astro.config.mjs` — `@astrojs/tailwind` の import / `integrations` から `tailwind()` を削除 |
| 更新 | `package.json` — 依存から `@astrojs/tailwind` / `tailwindcss` を削除 |
| 更新 | `package-lock.json` — 上記に伴う再解決（`npm install`） |
| 削除 | `tailwind.config.mjs` |

### ドキュメント（撤去済み前提へ更新）

| パス |
|------|
| `AGENTS.md` |
| `README.md` |
| `AGENTS_TASKS.md` |
| `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` |
| `docs/ILLUSTRATION_MEDIA_SPEC.md` |
| `docs/CODEX_FEEDBACK_CSS_FINAL_SWEEP.md` |
| `docs/CURSOR_CSS_MIGRATION_BATCH_03.md` |
| `docs/CURSOR_CSS_MIGRATION_FINAL_SWEEP.md` |
| `docs/CURSOR_CSS_MIGRATION_VOICE.md` |
| `docs/CURSOR_CSS_MIGRATION_REVIEW.md` |
| `docs/CODEX_HANDOFF_CSS_MIGRATION_BATCH_03.md` |
| `docs/CODEX_HANDOFF_CSS_MIGRATION_VOICE.md` |
| `docs/CODEX_HANDOFF_CSS_MIGRATION_BOTTOM_CTA.md` |
| `docs/CODEX_FEEDBACK_TAILWIND_REMOVAL.md`（本ファイル） |

**ソース（`src/`）のマークアップ・コピーは変更していない。** 見た目を変えない方針のまま、設定と文書のみ整理した。

---

## 削除した依存

- `@astrojs/tailwind`（`package.json` の `dependencies` から除去）
- `tailwindcss`（同上）
- 付随: `npm install` により **48 パッケージ**がロックファイル上で間接依存ごと整理された（`npm` 報告参照）

再導入は **禁止**（`AGENTS.md` の禁止事項に合わせる）。

---

## build 結果

- **コマンド:** `npm run build`
- **結果:** 成功（exit code 0）
- **出力抜粋:** Astro 4、static output、`6 page(s) built`、Vite クライアントバンドル完了、エラーなし

（ローカル実行時点の記録。CI 上でも `npm ci` → `npm run build` の前提は同じ。）

---

## 目視確認ポイント

Tailwind 統合除去により **Preflight 等、ビルド時に付いていたグローバルスタイル**は入らない。本プロジェクトは既に `src/styles/foundation/reset.css` 等で整えている想定。次を確認する。

1. **全ページ**（`/`, `/about/`, `/contact/`, `/faq/`, `/instructor/`, `/kanjorodou/`）で、改行・余白・見出し・リンク色が以前と practical に同じか
2. **サブページ** — `l-container` 周りの左右ガター・最大幅
3. **CTA / ボタン / カード** — 影・角丸・ホバーが意図どおりか
4. **カルーセル（Service 等）** — Embla 周りのレイアウト

---

## まだ残課題があるか

- **パッケージ撤去**は完了。`src/components/InstructorCardsRow.astro` 等に **コメント**で「旧 Tailwind 任意…」とある箇所は、**挙動メモ**として残しているだけで、ビルドは Tailwind に依存していない。
- 移行当時の handoff 文書（`docs/CODEX_HANDOFF_*` / `docs/CURSOR_CSS_MIGRATION_*`）は、**作業当時の記録**として残し、先頭に「撤去済み」補足を入れた。将来、履歴と現行方針を二重管理したくなければ別途アーカイブ化を検討可（必須ではない）。

---

## デプロイ前に人間が確認すべきこと

1. `npm run build` が**自分の環境**で成功していること（本記録に沿って再現できるか）
2. **preview** — `npm run preview` で `dist` を触って主要セクションの見た目（特に本文コンテナ・表・リンク）
3. **Cloudflare Pages** — デプロイ後、本番/検証 URL でキャッシュ（`AGENTS.md` の `_headers` 節）を意識し、HTML/CSS の参照が新しいか
4. **CI** — `main` へ取り込む場合、GitHub Actions の build が通るか（`npm ci` 前提）
