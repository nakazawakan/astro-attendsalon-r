/**
 * CSS/JS で共通利用するブレークポイント定義。
 * CSS 側の custom media と同じ境界値を維持すること。
 */
export const BREAKPOINTS = {
  spMax: 767,
  md: 768,
  lg: 1024,
} as const;

export const MEDIA_QUERY_SP_DOWN = `(max-width: ${BREAKPOINTS.spMax}px)`;
export const MEDIA_QUERY_MD_UP = `(min-width: ${BREAKPOINTS.md}px)`;
export const MEDIA_QUERY_LG_UP = `(min-width: ${BREAKPOINTS.lg}px)`;
