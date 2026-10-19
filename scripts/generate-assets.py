from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

root = Path(__file__).resolve().parents[1]
source = Image.open(root / 'fb.jpg').convert('RGB')
portrait = ImageOps.fit(source, (520, 520), method=Image.Resampling.LANCZOS)
portrait.save(root / 'public' / 'profile.webp', 'WEBP', quality=82, method=6)

canvas = Image.new('RGB', (1200, 630), '#0b0f17')
draw = ImageDraw.Draw(canvas)
for x in range(0, 1200, 40):
    draw.line((x, 0, x, 630), fill='#131d2c', width=1)
for y in range(0, 630, 40):
    draw.line((0, y, 1200, y), fill='#131d2c', width=1)
draw.rounded_rectangle((50, 45, 1150, 585), radius=10, fill='#141c29', outline='#34435b', width=2)
draw.rectangle((50, 45, 61, 585), fill='#8da8ff')
bold = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 72)
regular = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 28)
small = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 18)
draw.text((105, 102), 'AXEL CORACERO / SOFTWARE', font=small, fill='#8da8ff')
draw.text((105, 183), 'Software que convierte', font=bold, fill='#f4f3ef')
draw.text((105, 270), 'procesos en progreso.', font=bold, fill='#8da8ff')
draw.text((108, 395), 'Automatización  ·  Web  ·  Experiencias interactivas', font=regular, fill='#bdc9d8')
draw.text((108, 509), 'Explora cuatro demos reales de interacción', font=small, fill='#9daec5')
photo = ImageOps.fit(source, (170, 170), method=Image.Resampling.LANCZOS)
mask = Image.new('L', (170, 170), 0)
ImageDraw.Draw(mask).ellipse((0, 0, 169, 169), fill=255)
canvas.paste(photo, (943, 370), mask)
canvas.save(root / 'public' / 'og.jpg', 'JPEG', quality=88, optimize=True)
