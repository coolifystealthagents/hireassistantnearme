#!/usr/bin/env python3
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = json.loads((Path(__file__).with_name('manifest.json')).read_text())
FONT_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
FONT_REGULAR = '/System/Library/Fonts/Supplemental/Arial.ttf'
PALETTES = [
    ('#102A43','#1F7A8C','#F4D35E'),('#1B263B','#415A77','#FF7F51'),
    ('#2D1E2F','#6C4AB6','#F7B801'),('#12372A','#436850','#FBFADA'),
    ('#312244','#815AC0','#F9C74F'),('#0B3954','#087E8B','#FF5A5F'),
    ('#3D405B','#81B29A','#F2CC8F'),('#1D3557','#457B9D','#E9C46A'),
    ('#231942','#5E548E','#E0B1CB'),('#264653','#2A9D8F','#E9C46A'),
    ('#2B2D42','#8D99AE','#EF8354'),('#283618','#606C38','#DDA15E'),
    ('#14213D','#31572C','#FCA311'),('#22223B','#4A4E69','#F2E9E4'),
    ('#003049','#669BBC','#F77F00'),('#1F2041','#4B3F72','#FFC857'),
    ('#172A3A','#508991','#F6AE2D'),
]

def wrap(draw, text, font, max_width):
    words, lines, current = text.split(), [], ''
    for word in words:
        trial = f'{current} {word}'.strip()
        if draw.textbbox((0,0), trial, font=font)[2] <= max_width:
            current = trial
        else:
            if current: lines.append(current)
            current = word
    if current: lines.append(current)
    return lines

items = [(x, 'BLOG') for x in MANIFEST['blog']] + [(x, 'RESEARCH') for x in MANIFEST['research']]
out = ROOT / 'public' / 'images'
out.mkdir(parents=True, exist_ok=True)
for index, (item, section) in enumerate(items):
    bg, mid, accent = PALETTES[index]
    image = Image.new('RGB', (1200,630), bg)
    draw = ImageDraw.Draw(image)
    # Unique, deterministic geometric motif for each article.
    for ring in range(5):
        radius = 95 + ring * 52 + (index % 4) * 8
        cx, cy = 1010 - index % 3 * 24, 118 + index % 5 * 21
        box = (cx-radius, cy-radius, cx+radius, cy+radius)
        draw.arc(box, 18 + index*11, 245 + index*7, fill=accent if ring % 2 else mid, width=14)
    draw.rounded_rectangle((66,62,257,108), radius=20, fill=accent)
    label_font = ImageFont.truetype(FONT_BOLD, 24)
    draw.text((89,75), section, font=label_font, fill=bg)
    title_font = ImageFont.truetype(FONT_BOLD, 54 if len(item['title']) < 67 else 48)
    lines = wrap(draw, item['title'], title_font, 820)
    line_height = 64 if title_font.size >= 54 else 57
    y = 156
    for line in lines:
        draw.text((66,y), line, font=title_font, fill='#FFFFFF')
        y += line_height
    draw.line((66,522,1134,522), fill=mid, width=4)
    brand_font = ImageFont.truetype(FONT_REGULAR, 25)
    draw.text((66,554), 'HIRE ASSISTANT NEAR ME', font=brand_font, fill='#FFFFFF')
    draw.text((954,554), 'GUIDE 12·10', font=brand_font, fill=accent)
    target = ROOT / 'public' / item['thumbnail'].lstrip('/')
    image.save(target, 'PNG', optimize=True)
    with Image.open(target) as check:
        assert check.size == (1200,630)
print(f'Rendered {len(items)} unique 1200x630 thumbnails')
