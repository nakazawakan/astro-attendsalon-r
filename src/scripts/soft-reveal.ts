/**
 * オプトイン: `[data-reveal]` が付いたノードだけをビューポート進入で `.is-visible` にする（軽量・静的サイト向け）
 */
export function initSoftReveal(): void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (nodes.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // BaseLayout の inline script が try/catch で失敗した場合に二重障害を防ぐガード
  if (!document.documentElement.classList.contains('is-reveal-active')) return;

  const observeMap = new Map<HTMLElement, HTMLElement[]>();
  for (const el of nodes) {
    // `l-section` は背景装飾の当たり判定が先行しやすいため、実コンテンツ側で可視判定する
    // 互換性のため `:scope` は使わず直下 children から `.l-container` を探す
    const container = el.classList.contains('l-section')
      ? Array.from(el.children).find(
          (child): child is HTMLElement =>
            child instanceof HTMLElement && child.classList.contains('l-container'),
        ) ?? null
      : null;
    const observeTarget = container ?? el;
    const revealTargets = observeMap.get(observeTarget);
    if (revealTargets) revealTargets.push(el);
    else observeMap.set(observeTarget, [el]);
  }

  // threshold は 0 のみ。高さがビューポートを大きく超えるラッパーでは
  // 交差率の上限が (可視高さ/要素高さ) に抑えられ、0.22 だと isIntersecting が真にならず本文が永久非表示になる。
  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const observeTarget = entry.target as HTMLElement;
        const revealTargets = observeMap.get(observeTarget);
        if (!revealTargets) continue;
        revealTargets.forEach((target) => target.classList.add('is-visible'));
        obs.unobserve(observeTarget);
      }
    },
    { root: null, rootMargin: '0px 0px -2% 0px', threshold: 0 },
  );

  observeMap.forEach((_, target) => io.observe(target));
}
