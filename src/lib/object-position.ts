/** 旧 Tailwind 任意 `object-[x_y]` を object-position 用 CSS 値へ変換 */
export function objectPositionValue(twClass: string): string {
  const matched = twClass.match(/^object-\[([^\]]+)\]$/);
  if (!matched) return '50% 50%';
  return matched[1].replace(/_/g, ' ');
}
