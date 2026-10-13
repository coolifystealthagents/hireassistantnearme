#!/usr/bin/env python3
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, PngImagePlugin

ROOT = Path(__file__).resolve().parents[2]
PUB = ROOT / "publishing" / "2026-10-13"
FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"

def wrap(draw, text, font, width):
    words, lines, current = text.split(), [], ""
    for word in words:
        trial = f"{current} {word}".strip()
        if draw.textbbox((0, 0), trial, font=font)[2] <= width:
            current = trial
        else:
            if current: lines.append(current)
            current = word
    if current: lines.append(current)
    return lines

def render(item, kind, index):
    palettes = [
        ("#102f47", "#42c4ce", "#ffd45c"), ("#173650", "#61d3bb", "#f7a74b"),
        ("#153044", "#77b8ff", "#efcb57"), ("#102b42", "#4bc0a7", "#ff9c70"),
        ("#183248", "#58bfd1", "#f3d468"), ("#112c43", "#77ca9f", "#f6ad55"),
    ]
    bg, accent, accent2 = palettes[index % len(palettes)]
    image = Image.new("RGB", (1200, 630), bg)
    draw = ImageDraw.Draw(image)
    # A distinct, deterministic signal pattern for each release card.
    cx, cy = 1015 - (index % 3) * 18, 95 + (index % 4) * 11
    for ring in range(4):
        radius = 78 + ring * 54 + (index % 5) * 4
        start = 14 + index * 17 + ring * 13
        draw.arc((cx-radius, cy-radius, cx+radius, cy+radius), start, start+235-ring*9,
                 fill=accent2 if (ring+index) % 2 else accent, width=14)
    draw.rounded_rectangle((66, 62, 270 if kind == "BLOG" else 330, 112), radius=20, fill=accent2)
    draw.text((89, 74), kind, font=ImageFont.truetype(FONT, 25), fill="#0d2940")
    title_font = ImageFont.truetype(FONT, 49)
    lines = wrap(draw, item["title"], title_font, 785)
    if len(lines) > 4:
        title_font = ImageFont.truetype(FONT, 43)
        lines = wrap(draw, item["title"], title_font, 790)
    y = 155
    for line in lines[:5]:
        draw.text((66, y), line, font=title_font, fill="#ffffff")
        y += title_font.size + 13
    draw.line((66, 522, 1135, 522), fill=accent, width=4)
    draw.text((66, 557), "HIRE ASSISTANT NEAR ME", font=ImageFont.truetype(REGULAR, 26), fill="#ffffff")
    marker = f"OCT 13  |  {index+1:02d}"
    w = draw.textbbox((0,0), marker, font=ImageFont.truetype(FONT, 24))[2]
    draw.text((1135-w, 557), marker, font=ImageFont.truetype(FONT, 24), fill=accent2)
    out = ROOT / "public" / item["image"].removeprefix("/")
    out.parent.mkdir(parents=True, exist_ok=True)
    meta = PngImagePlugin.PngInfo()
    meta.add_text("Title", item["title"])
    meta.add_text("Content-Type", kind)
    image.save(out, "PNG", optimize=True, pnginfo=meta)

blogs = json.loads((PUB / "blog-records.json").read_text())
research = json.loads((PUB / "research-records.json").read_text())
for i, item in enumerate(blogs + research):
    render(item, "BLOG" if i < len(blogs) else "RESEARCH", i)
print(f"Rendered {len(blogs) + len(research)} exact-title thumbnails")
