"""login / trusted-traveler / camp icons: keep original white chip + shadow, swap glyph."""
from lib import *
from PIL import ImageDraw
M = '/Users/0104389S/Projects/hello-france/_mirror/'
NAVY = '#16254f'

def chip(orig, cx, cy, r, glyph_svg, scale=4):
    im = Image.open(orig).convert('RGBA')
    W, H = im.size
    # clear glyph area: paint white disc (anti-aliased via supersampling)
    big = Image.new('L', (W * scale, H * scale), 0)
    ImageDraw.Draw(big).ellipse([(cx - r) * scale, (cy - r) * scale, (cx + r) * scale, (cy + r) * scale], fill=255)
    mask = big.resize((W, H), Image.LANCZOS)
    white = Image.new('RGBA', (W, H), (255, 255, 255, 255))
    im = Image.composite(white, im, mask)
    g = svg(glyph_svg, W, H, scale=scale).resize((W, H), Image.LANCZOS)
    im.alpha_composite(g)
    return im

# login 252: chip centre (125.5,105.5) r~43 ; glyph ~36x46
lock = f'''<g transform="translate(125.5 106)">
 <path d="M-10 -6 v-7 a10 10 0 0 1 20 0 v7" fill="none" stroke="{NAVY}" stroke-width="5" stroke-linecap="round"/>
 <rect x="-16" y="-7" width="32" height="27" rx="6" fill="{NAVY}"/>
 <circle cx="0" cy="4" r="4.2" fill="#fff"/><rect x="-1.8" y="5" width="3.6" height="8" rx="1.8" fill="#fff"/>
</g>'''
login = chip(M + '_astro/login.yCZbSHPB.png', 125.5, 105.5, 41, lock)
write('login', login)

# trusted-traveler 470: chip centre (234,197.5) r~84 ; badge: two arcs + check shield
tt = f'''<g transform="translate(234 197.5)">
 <path d="M-58 -22 A62 62 0 0 1 22 -58" fill="none" stroke="#9aa3b2" stroke-width="7" stroke-linecap="round"/>
 <path d="M58 22 A62 62 0 0 1 -22 58" fill="none" stroke="#c0392b" stroke-width="7" stroke-linecap="round"/>
 <path d="M-40 -8 A42 42 0 0 1 8 -41" fill="none" stroke="#c9ced6" stroke-width="5" stroke-linecap="round"/>
 <path d="M40 8 A42 42 0 0 1 -8 41" fill="none" stroke="#9aa3b2" stroke-width="5" stroke-linecap="round"/>
 <path d="M0 -30 L26 -20 V2 C26 18 14 28 0 34 C-14 28 -26 18 -26 2 V-20 Z" fill="{NAVY}"/>
 <path d="M-11 1 L-3 9 L12 -7" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</g>'''
t = chip(M + '_astro/trusted-traveler.CMvo7gfe.webp', 234, 197.5, 84, tt)
write('trusted-traveler', t)
write('images/home/roadmap/demo/trusted-traveler', t)

# camp 53x53 transparent: simple dome/ridge tent + ground line, navy
def camp(W):
    s = W / 53
    body = f'''<g transform="scale({s})" fill="none" stroke="#05091f" stroke-width="4.2" stroke-linejoin="round" stroke-linecap="round">
 <path d="M26.5 9 L45 43 H8 Z"/>
 <path d="M26.5 25 L20.5 43 M26.5 25 L32.5 43"/>
 <path d="M22.5 9 L26.5 13 L30.5 9"/>
</g>'''
    return svg(body, W, W, scale=4).resize((W, W), Image.LANCZOS)
c = camp(53)
write('camp', c, only=['camp.iXEW0tbG'])
write('images/home/roadmap/demo/camp', c)
# 32px variant: original has glyph smaller (padding) -> mimic: glyph at 28/32 like original bbox
o32 = Image.open(M + '_astro/camp.frpDhR4i.webp').convert('RGBA'); print('camp32 bbox', o32.getchannel('A').getbbox())
write('camp', c, only=['camp.frpDhR4i'])
