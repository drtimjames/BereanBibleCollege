#!/usr/bin/env python3
"""Read-only inventory for planning a smaller GitHub Pages deployment.

The site currently deploys directly from main/(root), with .nojekyll enabled.
Do not remove or exclude site files without checking references first.
"""
from pathlib import Path
from collections import defaultdict

root = Path(".")
ignored = {".git", "node_modules", ".cache", ".venv", "venv"}
files = []
for p in root.rglob("*"):
    if not p.is_file() or any(part in ignored for part in p.parts):
        continue
    try:
        files.append((p.stat().st_size, p))
    except OSError:
        pass

by_top = defaultdict(lambda: [0, 0])
for size, path in files:
    key = path.parts[0] if len(path.parts) > 1 else "(root files)"
    by_top[key][0] += size
    by_top[key][1] += 1

def mb(n):
    return f"{n / (1024 * 1024):,.2f} MiB"

lines = [
    "GitHub Pages publishing footprint — READ ONLY",
    "Current deployment source: main / (root); .nojekyll present",
    f"Repository working tree total: {mb(sum(n for n, _ in files))}",
    f"File count: {len(files):,}",
    "",
    "Top-level directory/file groups by size:",
]
for group, (size, count) in sorted(by_top.items(), key=lambda kv: kv[1][0], reverse=True):
    lines.append(f"{mb(size):>12}  {count:>7} files  {group}")
lines += ["", "Largest 60 individual files:"]
for size, path in sorted(files, reverse=True)[:60]:
    lines.append(f"{mb(size):>12}  {path}")
lines += ["", "Files over 20 MiB (candidates for reference audit, NOT automatic deletion):"]
for size, path in sorted(files, reverse=True):
    if size > 20 * 1024 * 1024:
        lines.append(f"{mb(size):>12}  {path}")
text = "\n".join(lines) + "\n"
Path("pages-footprint-report.txt").write_text(text, encoding="utf-8")
print(text)
