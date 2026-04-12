#!/usr/bin/env python3
"""
ヒーロー用ピンク水彩だまり画像の前処理:
1) 周辺の平坦な白を flood fill で透過
2) 顔の線: 元画像で「ほぼ白〜無彩色の明るいピクセル」をコアにし、大きく膨張 → 中央値インペイント
3) 顔付近ゾーンのみ、外側の水彩色からの中央値で再度平滑化（ピンクの残り線対策）

入力: scripts/_source/hero-blobs-source.png
出力: public/images/hero-watercolor-blobs.png
"""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts/_source/hero-blobs-source.png"
DST = ROOT / "public/images/hero-watercolor-blobs.png"


def near_white(r: int, g: int, b: int, t: int = 248) -> bool:
    return r >= t and g >= t and b >= t and (r + g + b) > 740


def flood_background_mask(w: int, h: int, px) -> set[tuple[int, int]]:
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if near_white(*px[x, y][:3]):
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if near_white(*px[x, y][:3]):
                q.append((x, y))

    bg: set[tuple[int, int]] = set()
    while q:
        x, y = q.popleft()
        if (x, y) in bg:
            continue
        if not (0 <= x < w and 0 <= y < h):
            continue
        if not near_white(*px[x, y][:3]):
            continue
        bg.add((x, y))
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if (nx, ny) not in bg and 0 <= nx < w and 0 <= ny < h and near_white(*px[nx, ny][:3]):
                q.append((nx, ny))
    return bg


def dilate_mask(
    mask: set[tuple[int, int]],
    w: int,
    h: int,
    radius_sq: int,
) -> set[tuple[int, int]]:
    out = set(mask)
    r = int(radius_sq**0.5) + 2
    for x, y in mask:
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1):
                if dx * dx + dy * dy > radius_sq:
                    continue
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h:
                    out.add((nx, ny))
    return out


def median_rgb(samples: list[tuple[int, int, int]]) -> tuple[int, int, int]:
    if not samples:
        return (0, 0, 0)
    rs = sorted(s[0] for s in samples)
    gs = sorted(s[1] for s in samples)
    bs = sorted(s[2] for s in samples)
    mid = len(samples) // 2
    return (rs[mid], gs[mid], bs[mid])


def is_face_line_pixel(r: int, g: int, b: int) -> bool:
    """白チョーク線本体＋すぐ脇の無彩色ハイライト。"""
    mx, mn = max(r, g, b), min(r, g, b)
    if mx >= 246 and mn >= 246:
        return True
    if mx - mn > 22:
        return False
    if mn < 232:
        return False
    if mx < 248:
        return False
    return True


def inpaint_mask(
    im: Image.Image,
    px,
    w: int,
    h: int,
    bg: set[tuple[int, int]],
    paint: set[tuple[int, int]],
    radius: int,
) -> None:
    for x, y in paint:
        if (x, y) in bg:
            continue
        acc: list[tuple[int, int, int]] = []
        for dy in range(-radius, radius + 1):
            for dx in range(-radius, radius + 1):
                if dx * dx + dy * dy > radius * radius:
                    continue
                nx, ny = x + dx, y + dy
                if not (0 <= nx < w and 0 <= ny < h):
                    continue
                if (nx, ny) in paint:
                    continue
                if (nx, ny) in bg:
                    continue
                r, g, b, a = px[nx, ny]
                if a < 30:
                    continue
                acc.append((r, g, b))
        if len(acc) < 5:
            continue
        px[x, y] = (*median_rgb(acc), 255)


def infill_from_outside_ring(
    im: Image.Image,
    px,
    w: int,
    h: int,
    bg: set[tuple[int, int]],
    region: set[tuple[int, int]],
    sample_radius: int,
) -> None:
    """
    region 内の各ピクセルを、region の外側（かつ背景白でない）から見つけた色の中央値で置く。
    """
    for x, y in region:
        if (x, y) in bg:
            continue
        acc: list[tuple[int, int, int]] = []
        for dy in range(-sample_radius, sample_radius + 1):
            for dx in range(-sample_radius, sample_radius + 1):
                if dx * dx + dy * dy > sample_radius * sample_radius:
                    continue
                nx, ny = x + dx, y + dy
                if not (0 <= nx < w and 0 <= ny < h):
                    continue
                if (nx, ny) in region:
                    continue
                if (nx, ny) in bg:
                    continue
                r, g, b, a = px[nx, ny]
                if a < 30:
                    continue
                acc.append((r, g, b))
        if len(acc) < 8:
            continue
        px[x, y] = (*median_rgb(acc), 255)


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"missing source: {SRC}")
    DST.parent.mkdir(parents=True, exist_ok=True)

    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    px = im.load()

    bg = flood_background_mask(w, h, px)

    core: set[tuple[int, int]] = set()
    for y in range(h):
        for x in range(w):
            if (x, y) in bg:
                continue
            r, g, b, _ = px[x, y]
            if is_face_line_pixel(r, g, b):
                core.add((x, y))

    # 線＋その周辺のピンクがかった縁まで広く覆う（半径 ~15px）
    paint = dilate_mask(core, w, h, radius_sq=240)
    paint -= bg

    inpaint_mask(im, px, w, h, bg, paint, radius=24)

    # 顔があった周辺ブロックだけ、外側の「きれいな水彩」から色を取り直す
    face_zone = dilate_mask(core, w, h, radius_sq=360)
    face_zone -= bg
    infill_from_outside_ring(im, px, w, h, bg, face_zone, sample_radius=24)

    for x, y in bg:
        px[x, y] = (0, 0, 0, 0)

    r, g, b, a = im.split()
    base = Image.merge("RGB", (r, g, b))
    smooth = base.filter(ImageFilter.MedianFilter(size=3))
    im2 = Image.merge("RGBA", (*smooth.split(), a))
    im2.save(DST, optimize=True)
    print("wrote", DST.relative_to(ROOT), DST.stat().st_size, "bytes", "core_pixels", len(core))


if __name__ == "__main__":
    main()
