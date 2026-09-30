#!/usr/bin/env python3
"""Remove white backgrounds via edge flood-fill (preserves key/product pixels)."""

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image


def is_background(r: int, g: int, b: int, threshold: int) -> bool:
    brightness = (r + g + b) / 3
    spread = max(r, g, b) - min(r, g, b)
    return brightness >= threshold and spread <= 32


def remove_white_background(path: Path, *, threshold: int = 245) -> None:
    img = Image.open(path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    visited: set[tuple[int, int]] = set()
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited:
            continue
        if x < 0 or x >= width or y < 0 or y >= height:
            continue

        visited.add((x, y))
        r, g, b, _ = pixels[x, y]

        if not is_background(r, g, b, threshold):
            continue

        pixels[x, y] = (r, g, b, 0)
        queue.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    img.save(path, optimize=True)


def main() -> None:
    root = Path(__file__).resolve().parents[1] / "public" / "images"
    only_keys = "--keys-only" in sys.argv

    if only_keys:
        paths = sorted((root / "keys").glob("*.png"))
    else:
        paths = sorted((root / "keys").glob("*.png"))
        paths.extend(sorted((root / "products").glob("*.png")))

    if not paths:
        print("No images found.", file=sys.stderr)
        sys.exit(1)

    for path in paths:
        remove_white_background(path)
        print(f"Processed {path.relative_to(root.parent.parent)}")


if __name__ == "__main__":
    main()
