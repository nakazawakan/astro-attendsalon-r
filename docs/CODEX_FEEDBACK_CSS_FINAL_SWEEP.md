# Codex 向け: CSS 最終スイープ（FINAL SWEEP）完了報告

**正本:** `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` / `AGENTS.md`  
**依頼:** `docs/CURSOR_CSS_MIGRATION_FINAL_SWEEP.md`

---

## 1. 今回移行・追加したファイル一覧

| パス | 内容 |
|------|------|
| `src/styles/components/link.css` | **新規** — 旧 `text-link` + `underline` 相当の `.c-link`（`var(--color-link)` + underline） |
| `src/layouts/BaseLayout.astro` | 上記 `link.css` を import 追加 |
| `src/pages/about/index.astro` | `p-about-subpage` + `l-container`、テーブルは scoped CSS（罫線・`th`/`td` 余白・1列目幅 140/768+ で 180 等、旧 Tailwind 相当） |
| `src/pages/contact/index.astro` | `p-contact-subpage`、2 列グリッド（768px ～）、カード枠色（ピンク枠 / 通常枠）を維持、`.c-link` 利用 |
| `src/pages/faq/index.astro` | `p-faq-subpage`、`prose` 除去、FAQ カード・補足リンク（ピンク下線+offset）・下部 CTA ピルを scoped CSS 化 |
| `src/pages/kanjorodou/index.astro` | `p-kanjorodou-subpage`、`prose` 除去、段落スペース・行高・CTA ピルを custom CSS 化、`.c-link` 利用 |

**前スプリントで既に非 Tailwind 化済み（本スイープの対象外だが整合確認）**

- `src/pages/instructor/index.astro` — `p-instructor-subpage` + `l-container` 済み
- `src/components/IconChevronCtaPink.astro` — `c-icon-chevron-cta-pink` 済み

**文言・コピー・ラベル・リンク先は変更していません。**

---

## 2. まだ Tailwind / utility っぽい表記が残っている箇所

**`src/components/`・`src/pages/` 内のマークアップ上の Tailwind utility クラスは、当時の grep 範囲では検出なしでした。**

**追記（Tailwind パッケージ撤去後）:** `@astrojs/tailwind` / `tailwindcss` / `tailwind.config.mjs` はリポジトリから除去済み。実装の正本は `AGENTS.md` および `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` に従う。

---

## 3. なぜ残したか（当時のメモ。現状は §8 参照）

- 当時は **Astro + Tailwind 統合**を外すとビルドパイプラインの全確認が必要と判断し、**マークアップ上の utility 先撤去 → パッケージは別コミット**とした。
- その後、統合と依存の撤去を実施。詳細は `docs/CODEX_FEEDBACK_TAILWIND_REMOVAL.md` を参照。

---

## 4. build 結果

- **日時（ローカル）:** 実行時点で `npm run build` **成功**（Astro static、`6 page(s) built`）
- エラーなし

---

## 5. 目視確認が必要なポイント

1. **サブページ（about / contact / faq / kanjorodou / instructor）**  
   - 上余白 130px / 下 80px、`l-container` ガター 24px、内側有効幅 960 相当が Figma/本番意図と一致するか
2. **about テーブル**  
   - 最下行の下枠なし（旧 `tr` 最後に `border-b` なし）を再現 — `.p-about-subpage__tr:last-child { border-bottom: none; }` 済み
3. **contact**  
   - 2 列化が 768px ～か、カード内 `p-6` / `md:p-8` 相当のパディング
4. **faq**  
   - 補足リンクの `text-decoration-color` + `underline-offset-4`、ホバー `opacity-0.85` 前後
5. **kanjorodou**  
   - 旧 `prose` + `space-y-4` に近い段落マージン（1rem 間）と `leading-relaxed`（1.625）

---

## 6. Tailwind 依存パッケージを安全に削除できる段階か

**完了。** 手順の記録は `docs/CODEX_FEEDBACK_TAILWIND_REMOVAL.md` に集約した。

---

## 7. Codex / 人間に渡したい注意点

- **`.c-link`** はグローバル（`BaseLayout` 経由）。新規の本文リンクは `c-link` を使い、**`text-link` 相当の意味を、未整理の class 列で足さない**こと。
- **サブページのルート**は `p-*-subpage` で揃えてあり、**レイアウト骨格**は `l-container` に集約。今後同様の下層ページを足す場合は同パターン推奨。
- **`InstructorSection embedded`:** instructor ページの構造は維持。`InstructorSection` 側の大きな DOM 変更は本スイープ未実施（必要なら別タスク）。

---

## 8. 追記: パッケージ撤去（実施後）

- `astro.config.mjs` から `@astrojs/tailwind` 統合を削除し、`package.json` / `package-lock.json` から `tailwindcss` と `@astrojs/tailwind` を削除。`tailwind.config.mjs` をリポジトリから削除。`npm run build` 成功。詳細は `docs/CODEX_FEEDBACK_TAILWIND_REMOVAL.md`。
