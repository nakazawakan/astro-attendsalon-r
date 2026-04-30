# リリース可否メモ（CSS / アイコン整備）

**日付:** 2026-04-24  
**正本:** `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` / `AGENTS.md`  
**きっかけ:** `IconChatConsult` / `IconDocumentRequest` から旧 Tailwind 風デフォルト class（`w-4 h-4 shrink-0`）を撤去し、共通 `c-icon--inline-16` へ置換。

---

## 修正ファイル

| パス | 内容 |
|------|------|
| `src/styles/components/icon.css` | **新規** — `.c-icon--inline-16`（16×16px 相当、flex 行で縮まない） |
| `src/layouts/BaseLayout.astro` | `icon.css` を import |
| `src/components/IconChatConsult.astro` | デフォルト class を `c-icon--inline-16` + `class:list` へ |
| `src/components/IconDocumentRequest.astro` | 同上 |
| `src/components/Header.astro` | `.c-site-header__cta-icon` を `color: #fff` のみに整理（寸法は共通クラスへ集約） |

---

## 確認したページ（`npm run build` 後 `astro preview` 相当の HTTP）

以下パスを `curl` で **HTTP 200** を確認（`http://127.0.0.1:4321`）。

- `/`（トップ）
- `/about/`
- `/contact/`
- `/faq/`
- `/instructor/`
- `/kanjorodou/`

---

## 確認した幅（375 / 768 / 1024）

本セッションでは **ブラウザの DevTools レスポンシブ相当の手動目視は未実施**（静的ビルドと `curl` による到達性・HTML/CSS バンドル確認のみ）。  
`Header` / `Hero` / `Service` / `Voice` / `Bottom CTA` のレイアウトは **既存のメディアクエリ＋従来DOM** 前提で変更していないが、**各ブレークポイントでの最終目視**はデプロイ前の人間確認を推奨。

---

## 残リスク

- **ビューポート別のピクセル目視**（375 / 768 / 1024）をこちらで完了していない。見た目の回帰は低リスク（CTAアイコンの class のみの意味的置換＋`w-4 h-4 shrink-0` と同等の CSS）だが、**実機 / DevTools での最終確認**を推奨。
- `BaseLayout` の reset で `svg { display: block }` がある。`.c-icon--inline-16` が `display: inline-block` を指定し、**ボタン内アイコンの意図したサイズ**（`1rem` 四方）を維持（ビルド済み CSS で確認済み）。

---

## 今すぐ `main` に入れてよいか

**可（条件付き）**

- ローカルで `npm run build` が成功していること（本リポジトリでは **exit 0**）。
- マージ前に **人間が `npm run preview` で上記6ページ＋重要セクション**を、可能なら **375 / 768 / 1024** で目視する。
- 問題なければ `AGENTS.md` の手順どおり `main` へ push / CI 成功を確認する。

**結論:** 変更範囲は限定的でビルドは通過している。**プレビュー上の最終目視**が取れれば `main` 取り込みでよい水準。取れない場合は **low-risk だが** デプロイ直後の軽い本番スモークを推奨。
