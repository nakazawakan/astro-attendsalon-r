# AGENTS_TASKS.md — Cursor 実装指示書

> **Cursor への指示**: このファイルを読んで、下記タスクを順番に実装してください。
> デザイン正本: `~/AI/companies/ararat/sites/attendsalon-r.com/DESIGN.md`
> Figma URL: https://www.figma.com/design/mVJaZra8kGkMaIlwF14ZAs/HP_attendsalon-r.com?node-id=279-1517

---

## 前提・共通ルール

- フレームワーク: Astro 4.x + Tailwind CSS 3.x
- すべてのコンポーネントは `src/components/` に `.astro` で作成
- 画像はまだ仮（`/public/images/placeholder.jpg`）でよい。構造優先
- モバイル対応必須（`md:` ブレークポイントでデスクトップ幅切替）
- Tailwind カラートークン使用（`tailwind.config.mjs` 参照）
- フォントクラス: ベースは `font-zen`（Zen Kaku Gothic New）。数字の装飾のみ例外可
- デスクトップ基準: **本文 960px** — `max-w-page` + `px-6 md:px-0` + `mx-auto`（SP は左右 24px、PC は 960px カラム内いっぱい。`box-content` は横スクロール原因のため禁止）

---

## タスク一覧

### Task 01 — BaseLayout 確認・調整 ✅（Claude 完了）

`src/layouts/BaseLayout.astro` は作成済み。Google Fonts 読み込み済み。
変更不要。

---

### Task 02 — Header / Navigation コンポーネント

**ファイル**: `src/components/Header.astro`

**仕様**:
- ロゴ（左）: 画像 `/images/logo.png` + テキスト「イキイキと自分らしく働くための / ウェルビーイング経営支援」（12px, 2行）
- ナビリンク（中央寄せ右）: 選ばれる理由 / 感情労働とは / 研修サービス（15px, font-zen bold）
- CTAボタン 2つ:
  - 「無料相談」: アウトラインボタン（`bg-white border border-[#ffc0c0] text-[#fb6b6a]`）
  - 「資料請求」: 塗りつぶしボタン（`bg-[#fb6b6a] text-white`）
  - 両方とも `rounded-full px-6 py-[10px]` アイコン付き（無料相談＝吹き出し、資料請求＝資料）
- モバイル: ハンバーガーメニュー
- fixed/sticky 上部固定

---

### Task 03 — Hero セクション

**ファイル**: `src/components/HeroSection.astro`

**仕様**:
- 背景色: `bg-[#fdf7ec]`
- 高さ: **固定 `h-[797px]` は使わず**、`<section>` の **`pt` / `pb`（例: `md:pt-28 md:pb-32`）** で縦の余白を確保。内側 `max-w` ラッパーには **縦 padding なし**（横 `px` のみ）
- 左エリア:
  - タグバッジ 3個横並び（ストレスケア/接客対応/ハラスメント対応）
    → `bg-white border border-[#6c8da6] text-[#6c8da6] text-[16px] px-2 py-1 rounded-sm`
  - 「感情労働」4文字: blob背景 + `text-[#fb6b6a] text-[54px] font-zen font-bold`
  - 「の職場向け研修支援」: `text-[#333] text-[40px] font-zen font-bold`
  - サブキャッチ 3行（Figma `279:1557`）: `text-[#333] text-[30px] font-zen font-bold leading-[1.5]`  
    「アテンドサロンRは、」／「感情労働のフィールドで」／「イキイキ働く組織づくりを支援します」
- 右エリア: `HeroEmotionalRipple.astro`（SVG + CSS 揺らぎ・ラスタ不使用。仕様は **`docs/ILLUSTRATION_MEDIA_SPEC.md`**）
- 背景デコレーション: 左上の大文字「R」（Figma `279:1526`、Ruika 09 / 800px / 白 / leading 0.8・軽い回転。Web は Rubik 900 正体＋ラッパーで位置調整）

---

### Task 04 — About セクション（アテンドサロンRは）

**ファイル**: `src/components/AboutSection.astro`

**仕様**（Figma `279:1574`）:
- 背景: `bg-[#fdf7ec]`
- 左: **写真 2×2**（`about-grid-1.jpg`〜`4.jpg`、角丸 5px、約 194×148）
- 右テキスト:
  - 「アテンドサロンR」（34px font-zen bold）+ マーカー `#ffe3bc`（高さ 12px 相当）／「は」（22px bold）
  - リード 2 行（20px bold）・本文（16px medium `#555`）は Figma 原稿の文言に合わせる
  - CTA 2 行＋左に小さな三角（`about-chevron-cta.svg`）
- 「感情労働とは？」カード（白・角丸・枠線）:
  - 1 行目: 青ライン 6×32px 相当＋見出し 17px
  - 2 列: 左に説明 15px＋リンク（青・下線＋`about-chevron-link.svg`）、右に業種 6 件（白枠 `#e5e5e5`、高さ 50px、`about-icon-*.svg` ＋ラベル 14px）

---

### Task 05 — 研修サービスセクション

**ファイル**: `src/components/ServiceSection.astro`

**仕様**（Figma `279:1629`）:
- 背景: `bg-white`、上余白多め（デスクトップ `pt-[116px]` 目安）
- 見出し: 共通 `SectionHeading.astro`（`SERVICE` + `section-heading-deco.svg` +「研修サービス一覧」32px zen）+ リード 2 行（16px medium）
- カード行: `gap-[27px]`、各 `w-[300px]` `bg-bg-warm` `rounded-[16px]` `p-[24px]`、縦 `gap-[18px]` 中央揃え
- 各カード: タイトル 20px bold → 白円 79px 内に Figma アイコン SVG（`service-icon-heart|fire|prohibited.svg`）→ 説明 14px medium（1枚目 `#333`、2・3枚目 `#555`）→ 下ピンク CTA（幅 240px 相当・白三角＋文言）

---

### Task 06 — 特徴セクション（アテンドサロンRの特徴）

**ファイル**: `src/components/FeatureSection.astro`

**仕様**（Figma `294:675`）:
- 背景: `bg-bg-warm`（区切りボーダーなし）
- 見出し: 共通 `SectionHeading`（`FEATURE` + 装飾 + 32px zen）
- 3 ブロックは **横一列グリッドではなく**、**写真エリア（420×275 相当）＋白カード**の行を **左右交互**（1・3 行目: 写真左／2 行目: 写真右）
- 白カード: `rounded-lg`（8px）、`p-10`（40px）、**box-shadow なし**、枠線なし。上段 **タイトル（24px zen bold pink）と番号（40px Lato Black）を両端配置**、本文 14px Noto medium `#333` `leading-[1.8]`（Figma 原稿の文言）
- 写真側は現状プレースホルダー（グラデ＋内側シャドウ）。Figma から画像が出たら `<img>` に差し替え

---

### Task 07 — お客様の声セクション

**ファイル**: `src/components/VoiceSection.astro`

**仕様**:
- 背景: `bg-white border-t border-[#ddd]`
- セクション見出し: 共通 `SectionHeading`（`VOICE` + 装飾 +「お客様の声」32px zen、左寄せ）
- 事例カード（`border border-[#b8b8b8] p-6`）:
  - 上部: 写真 2枚 + 導入情報（導入企業/研修名/従業員数/業種）テーブル
  - 中部: `bg-[#f0f0f0] p-6` - 研修タイトル（24px）+ お客様の声（16px）
  - 下部: 課題カード + 研修後カード（2分割、`border border-[#d8d8d8]`）

---

### Task 08 — 講師紹介セクション

**ファイル**: `src/components/InstructorSection.astro`

**仕様**（Figma `294:719` 準拠）:
- 背景: `bg-bg-warm`（白＋上罫線は廃止）
- トップページ（`embedded` なし）: 共通 `SectionHeading`（`FACILITATOR` +「講師紹介」）+ リード 3 行（16px font-zen medium）
- 講師 2 名横並び（各 `md:w-[460px]`、**左＝佐藤 亮子、右＝舘野 理香**）:
  - 写真 `h-[300px] rounded-lg object-cover`（PNG）
  - 氏名（18px / 14px font-zen bold）、タグは白背景・角丸・14px bold（佐藤 2 タグ、舘野 1 タグ）
  - カード下の長文 bio はなし（Figma に個別説明なし）
- `/instructor`（`embedded`）: カード行のみ（見出し・装飾・リードなし）

---

### Task 09 — 研修導入の流れセクション

**ファイル**: `src/components/FlowSection.astro`

**仕様**:
- 背景: `bg-white border-t border-[#e9e9e9]`
- セクション見出し: 共通 `SectionHeading`（`FLOW` +「研修の導入までの流れ」、左寄せ）
- ステップ 4つ縦並び（各 `bg-[#f9f9f9] p-6 rounded-[4px]` 幅 `w-[740px]`）:
  1. 現状把握 — ヒアリングテキスト
  2. 研修設計 — カスタマイズテキスト
  3. 研修実施 — 双方向参加型テキスト
  4. 効果測定 — アンケート+フォロー

---

### Task 10 — サイト案内セクション + Footer

**ファイル**: `src/components/SiteLinksSection.astro`, `src/components/Footer.astro`

**SiteLinksSection**:
- セクション見出し: 共通 `SectionHeading`（`LINK` + タイトル文言、左寄せ）
- `bg-[#f4f4f4]` の 3カード横並び（各 `flex-1 py-16 text-center`）:
  - 運営者情報 / 講師紹介 / よくある質問

**Footer**:
- `bg-black text-white`
- リンク集（テキスト中央）

---

### Task 11 — サブページ作成

以下のページを `src/pages/` に作成（共通 BaseLayout 使用）:

| ファイル | タイトル |
|---------|---------|
| `kanjorodou/index.astro` | 感情労働とは｜アテンドサロンR |
| `instructor/index.astro` | 講師紹介｜アテンドサロンR |
| `faq/index.astro` | よくある質問｜アテンドサロンR |
| `about/index.astro` | 運営者情報｜アテンドサロンR |
| `contact/index.astro` | 無料相談・資料請求｜アテンドサロンR |

各ページ: Header + 簡単なページ内コンテンツ + Footer

---

### Task 12 — 画像アセット配置

`public/images/` に以下を配置（Figma からエクスポートまたはプレースホルダー）:
- `logo.png` — ロゴ（60x60px）
- `hero-figma-311-117.png` — 旧ヒーロー右ラスタ（参照用・現行は `HeroEmotionalRipple.astro`）
- `about-grid-1.jpg`〜`4.jpg` — About 左 2×2 写真
- `about-icon-*.svg`, `about-chevron-*.svg` — About 業種アイコン・リンク／CTA 矢印
- `section-heading-deco.svg` — セクション見出し左装飾（全セクション共通・旧 `*-heading-deco.svg` と同一図形）
- `service-icon-heart.svg`, `service-icon-fire.svg`, `service-icon-prohibited.svg` — 研修サービスカードアイコン
- `voice-01.png`, `voice-02.png` — お客様の声写真（`VoiceSection`）
- `instructor-tateno.png`, `instructor-sato.png` — 講師写真（佐藤は Figma `294:732`。API 更新は `npm run figma:export:sato` ＋ `FIGMA_ACCESS_TOKEN`）
- `blob-kan.svg`, `blob-jo.svg`, `blob-ro.svg`, `blob-do.svg` — 感情労働blobs

---

### Task 13 — ビルド確認・最終チェック

```bash
npm run build
# エラーがないことを確認
npm run preview
# http://localhost:4321 で目視確認
```

チェックリスト:
- [ ] Google Fonts が正しく読み込まれている
- [ ] カラートークンが全セクションで正しく適用されている
- [ ] モバイル表示（375px）でレイアウト崩れなし
- [ ] 全リンクが正しく動作している
- [ ] `npm run build` がエラーなしで完了する

---

## 完了後

タスク完了後、以下を実行:
```bash
git add -A
git commit -m "feat: implement attendsalon-r HP from Figma design"
git push origin main
```
