# Cursor CSS Migration Review

> **補足（2026-04）:** 当時のレビュー記録。`tailwind` パッケージは撤去済み。指摘内の class は「当時点の HTML」の引用。

対象:

- `src/components/HeroSection.astro`
- `src/components/AboutSection.astro`
- `src/components/FeatureSection.astro`
- 関連:
  - `src/components/HeroEmotionalRipple.astro`
  - `src/components/NoImagePlaceholder.astro`

前提:

- 正本は `docs/CURSOR_CSS_IMPLEMENTATION_GUIDE.md` と `AGENTS.md`
- 当時の前提は「見た目を変えない」「**新規** utility 列を足さない」「触ったコンポーネントでは utility 風 class と custom CSS を混在させない」

## Findings

### 1. Must fix: 子コンポーネント経由で Tailwind utility 依存が残っている

- `src/components/HeroSection.astro` は `HeroEmotionalRipple.astro` を使用している
- `src/components/HeroEmotionalRipple.astro:8-9`
  - `class="hero-emotional-root mx-auto max-w-full aspect-[420/360] min-h-[180px]"`
- `src/components/FeatureSection.astro` は `NoImagePlaceholder.astro` を使用している
- `src/components/NoImagePlaceholder.astro:11-18`
  - `pointer-events-none`
  - `relative`
  - `isolate`
  - `flex`
  - `w-full`
  - `items-center`
  - `justify-center`
  - `rounded-t-lg`
  - `border`
  - `border-dashed`
  - `border-border-soft`
  - `bg-stone-300`
  - `md:rounded-lg`
  - `select-none`
  - `font-zen`
  - `text-sm`
  - `font-bold`
  - `uppercase`
  - `tracking-[0.22em]`
  - `text-black-05`

影響:

- 対象3ファイルの直下から utility は消えていても、実際には子コンポーネント経由で Tailwind に依存している
- 「触ったコンポーネントでは utility を混在させない」という運用ルールを満たしていない
- Tailwind preflight / Tailwind 依存の最終撤去時に、このままでは崩れる

対応:

- `NoImagePlaceholder.astro` を semantic class + scoped CSS 化する
- `HeroEmotionalRipple.astro` も utility を除去する
- `HeroSection` / `FeatureSection` の完了条件は、その依存コンポーネントまで含めて判定する

### 2. Must fix: CSS 移行に文言変更が混ざっている

今回の作業は「見た目を変えない」「実装方式の変更」が前提だが、実際にはコピー差分が入っている。

- `src/components/HeroSection.astro:4`
  - 旧: `['ストレスケア', '接客対応', 'ハラスメント対応']`
  - 新: `['ストレスケア', 'アンガーマネジメント', 'ハラスメント対策']`
- `src/components/AboutSection.astro:52-55`
  - 旧文言から `実践型マネジメント研修` → `実効性のある(現場で本当に使える）研修` へ変更
- `src/components/AboutSection.astro:57-59`
  - `つなぐことで` → `つなぎ` に変更
- `src/components/FeatureSection.astro:13-16`
  - `02` の本文が旧実装から別文言へ変更

影響:

- CSS 移行レビューとコピー改修レビューが混ざり、差分確認コストが上がる
- 見た目維持の前提で進めると、意図しない変更として扱われる

対応:

- 文言変更が意図的でないなら旧文言へ戻す
- 意図的なら CSS 移行とは別 commit / 別レビューに分ける

### 3. Recommended: Hero のタグ列は文言変更により SP で溢れるリスクがある

- `src/components/HeroSection.astro:45-50`
- `src/components/HeroSection.astro:132-149`
  - `.p-hero__tags { flex-wrap: nowrap; }`
  - `.p-hero__tag { white-space: nowrap; }`

今回の新文言は旧文言より長いものを含むため、狭い画面幅では右側が詰まる可能性がある。

対応:

- 文言を旧実装に戻す
- もしくは、文言変更を維持するなら SP 実機幅で確認する

## Notes

- `HeroSection.astro` / `AboutSection.astro` / `FeatureSection.astro` 本体には、確認した範囲では直接の Tailwind utility は残っていない
- `p-*` 命名 + scoped CSS の責務分離は概ね妥当
- `l-container` の利用も揃っている
- preflight 除去リスクは、今回の3ファイル本体より `NoImagePlaceholder.astro` と `HeroEmotionalRipple.astro` に集中している

## Recommended next action

1. `NoImagePlaceholder.astro` を custom CSS 化
2. `HeroEmotionalRipple.astro` を custom CSS 化
3. 今回混入した文言変更を戻すか、別タスクへ分離
4. その後に `HeroSection` / `FeatureSection` を再レビュー
