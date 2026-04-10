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
- フォントクラス: `font-zen` / `font-noto`
- デスクトップ基準幅: `max-w-[960px] mx-auto`

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
  - 両方とも `rounded-full px-6 py-[10px]` 左矢印アイコン付き
- モバイル: ハンバーガーメニュー
- fixed/sticky 上部固定

---

### Task 03 — Hero セクション

**ファイル**: `src/components/HeroSection.astro`

**仕様**:
- 背景色: `bg-[#fdf7ec]`
- 高さ: `h-[797px]`
- 左エリア:
  - タグバッジ 3個横並び（ストレスケア/接客対応/ハラスメント対応）
    → `bg-white border border-[#6c8da6] text-[#6c8da6] text-[16px] px-2 py-1 rounded-sm`
  - 「感情労働」4文字: blob背景 + `text-[#fb6b6a] text-[54px] font-zen font-bold`
  - 「の職場向け研修支援」: `text-[#333] text-[40px] font-zen font-bold`
  - サブキャッチ 3行: `text-[#333] text-[30px] font-zen font-bold leading-[1.5]`
- 右エリア: 写真グリッド 2×2（各 `w-[193px] h-[147px] rounded-[5px]`）
- 背景デコレーション: 大文字「R」（overflow hidden で右側に半分隠れる形）

---

### Task 04 — About セクション（アテンドサロンRは）

**ファイル**: `src/components/AboutSection.astro`

**仕様**:
- 背景: `bg-[#fdf7ec]`
- 左: 写真グリッド 2×2（Task 03 と同様）
- 右テキスト:
  - 「アテンドサロンR」（34px, Hiragino Maru Gothic or font-zen）+ 黄色アンダーライン
  - 「は」（22px）
  - サブキャッチ 2行（20px, bold）
  - 説明文（16px, medium, leading-[1.8]）
  - CTA「アテンドサロンRが選ばれる理由」（`bg-[#fb6b6a] text-white rounded-full`）
- 感情労働とは？カード（白背景・ボーダー）:
  - 左アクセントライン `bg-[#6c8da6] w-[6px] h-8 rounded-sm`
  - 説明文（15px）+ 「感情労働とは」テキストリンク（`text-[#3574e1] border-b border-[#3574e1]`）
  - 右: 6業種アイコンカード（医療・介護/お客様窓口/ホテル・飲食/教育・保育/官公庁・自治体/営業）

---

### Task 05 — 研修サービスセクション

**ファイル**: `src/components/ServiceSection.astro`

**仕様**:
- 背景: `bg-white`
- セクション見出し「研修サービス一覧」（32px, font-zen bold）+ デコレーション
- サブテキスト 2行（16px）
- カード 3枚横並び（各 `w-[300px] bg-[#fdf7ec] rounded-[16px] p-6`）:
  1. メンタルヘルス研修 + heart アイコン（白丸 `w-[79px] h-[79px] rounded-full bg-white`）
  2. アンガーマネジメント研修 + fire アイコン
  3. ハラスメント研修 + prohibited アイコン
- 各カード: タイトル（20px center bold）/ アイコン円 / 説明文（14px leading-[1.6]）

---

### Task 06 — 特徴セクション（「アテンドサロンR」の特徴）

**ファイル**: `src/components/FeatureSection.astro`

**仕様**:
- 背景: `bg-white border-t border-[#ddd]`
- セクション見出し「「アテンドサロンR」の特徴」（24px, font-noto bold）
- カード 3枚横並び（各 `w-[310px] border border-[#cfcfcf] p-[22px]`）:
  1. 特徴 01 / **現場力** — 客室乗務員経験40年以上...
  2. 特徴 02 / **組織構築実績** — 職場に日常相談スペース...
  3. 特徴 03 / **国家資格×実務経験** — 公認心理師、産業カウンセラー...
- 各カード: 特徴番号（14px）/ タイトル（18px）/ 写真プレースホルダー（`bg-[#ebebeb] h-[111px]`）/ 説明文（14px leading-[1.6]）

---

### Task 07 — お客様の声セクション

**ファイル**: `src/components/VoiceSection.astro`

**仕様**:
- 背景: `bg-white border-t border-[#ddd]`
- セクション見出し「お客様の声」（24px, font-noto bold）
- 事例カード（`border border-[#b8b8b8] p-6`）:
  - 上部: 写真 2枚 + 導入情報（導入企業/研修名/従業員数/業種）テーブル
  - 中部: `bg-[#f0f0f0] p-6` - 研修タイトル（24px）+ お客様の声（16px）
  - 下部: 課題カード + 研修後カード（2分割、`border border-[#d8d8d8]`）

---

### Task 08 — 講師紹介セクション

**ファイル**: `src/components/InstructorSection.astro`

**仕様**:
- 背景: `bg-white border-t border-[#ddd]`
- セクション見出し「講師紹介」（24px, font-noto bold）
- 講師 2名横並び（各 `w-[460px]`）:
  - 写真プレースホルダー（`bg-[#efefef] h-[186px] rounded-[8px]`）
  - 名前（18px）/ 英語名（14px）/ 経歴タグ（`bg-[#fdf7ec] px-2 py-1 rounded-sm`）
  - プロフィール（14px leading-[1.4]）
  - 舘野 理香（Tateno Rika）/ 佐藤 亮子（Sato Ryoko）

---

### Task 09 — 研修導入の流れセクション

**ファイル**: `src/components/FlowSection.astro`

**仕様**:
- 背景: `bg-white border-t border-[#e9e9e9]`
- セクション見出し「研修の導入までの流れ」（24px, center）
- ステップ 4つ縦並び（各 `bg-[#f9f9f9] p-6 rounded-[4px]` 幅 `w-[740px]`）:
  1. 現状把握 — ヒアリングテキスト
  2. 研修設計 — カスタマイズテキスト
  3. 研修実施 — 双方向参加型テキスト
  4. 効果測定 — アンケート+フォロー

---

### Task 10 — サイト案内セクション + Footer

**ファイル**: `src/components/SiteLinksSection.astro`, `src/components/Footer.astro`

**SiteLinksSection**:
- セクション見出し「「アテンドサロンR」について知る」（24px）
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
- `hero-01.jpg` ~ `hero-04.jpg` — ヒーロー写真グリッド
- `voice-01.jpg`, `voice-02.jpg` — お客様の声写真
- `instructor-tateno.jpg`, `instructor-sato.jpg` — 講師写真
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
