/**
 * [data-reveal] をビューポート進入で .is-visible にする（軽量・静的サイト向け）
 */
export function initSoftReveal(): void {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!nodes.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');
        obs.unobserve(el);
      }
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
  );

  nodes.forEach((el) => io.observe(el));
}
