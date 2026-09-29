"""Invented, simplified French maps (procedural relief + hand-placed features). No map-provider data,
no attribution marks, no real map tiles. Place names only as plain labels.
 - camping-map (646x1398): valley near Chamonix, relief style of the original (HERE attribution removed)
 - wichita-map (1541x966): Lyon-like city map, same grey/green/blue city style, alpha of original kept
 - pharmacy-map (1790x1104): Lyon-like area, no labels (pins overlaid by the page)
 - map_panel(): Nantes-like map reused inside roadmap-desktop"""
import math
import numpy as np
from lib import *

M = '/Users/0104389S/Projects/hello-france/_mirror/_astro/'


def noise(h, w, seed, octaves=6, base=4, persistence=0.55):
    rng = np.random.default_rng(seed)
    out = np.zeros((h, w), np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        n = base * 2 ** o
        g = rng.random((max(2, int(n * h / max(h, w)) + 2), n + 2)).astype(np.float32)
        im = Image.fromarray(g, 'F').resize((w, h), Image.BICUBIC)
        out += amp * np.array(im)
        tot += amp
        amp *= persistence
    return out / tot


def hillshade(z, az=315, alt=45, zscale=1.0):
    gy, gx = np.gradient(z * zscale)
    slope = np.pi / 2 - np.arctan(np.hypot(gx, gy))
    aspect = np.arctan2(-gx, gy)
    a, al = math.radians(az), math.radians(alt)
    return np.clip(np.sin(al) * np.sin(slope) + np.cos(al) * np.cos(slope) * np.cos(a - aspect), 0, 1)


def cr_path(pts, closed=False):
    """Catmull-Rom -> cubic Bezier SVG path."""
    p = list(pts)
    if closed:
        p = [p[-1]] + p + [p[0], p[1]]
    else:
        p = [p[0]] + p + [p[-1]]
    d = f'M{p[1][0]:.1f},{p[1][1]:.1f}'
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f' C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}'
    return d + (' Z' if closed else '')


def stroke(pts, color, w, extra=''):
    return f'<path d="{cr_path(pts)}" fill="none" stroke="{color}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'


def blob(cx, cy, r, seed, color, n=9, jitter=0.35, extra=''):
    rng = np.random.default_rng(seed)
    pts = []
    for i in range(n):
        t = 2 * math.pi * i / n
        rr = r * (1 + jitter * (rng.random() - 0.5) * 2)
        pts.append((cx + rr * math.cos(t), cy + rr * 0.8 * math.sin(t)))
    return f'<path d="{cr_path(pts, True)}" fill="{color}" {extra}/>'


def meander(p0, p1, n, amp, seed, wobble=2):
    rng = np.random.default_rng(seed)
    pts = []
    dx, dy = p1[0] - p0[0], p1[1] - p0[1]
    L = math.hypot(dx, dy)
    nx, ny = -dy / L, dx / L
    for i in range(n + 1):
        t = i / n
        off = amp * math.sin(t * math.pi * wobble + rng.random() * 0.6) + amp * 0.35 * (rng.random() - 0.5)
        if i in (0, n):
            off = 0
        pts.append((p0[0] + dx * t + nx * off, p0[1] + dy * t + ny * off))
    return pts


def to_png_href(arr):
    return png_href(Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)))


def shield(x, y, label, w=None):
    w = w or (14 + 9.2 * len(label))
    return (f'<g transform="translate({x} {y})"><path d="M{-w / 2},-11 h{w} v14 q0,6 -{w / 2},9 q-{w / 2},-3 -{w / 2},-9 Z" '
            f'fill="#fff" stroke="#3c3f48" stroke-width="1.6"/>'
            f'<text x="0" y="3.2" text-anchor="middle" font-family="Geist600" font-size="13" fill="#3c3f48">{label}</text></g>')


# ------------------------------------------------------------------ camping-map
def camping():
    W, H = 646, 1398
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    # valley axis: road from (40,380) to (640,1120) roughly, same as original composition
    ax0, ay0, ax1, ay1 = 30.0, 360.0, 646.0, 1150.0
    L = math.hypot(ax1 - ax0, ay1 - ay0)
    nx, ny = -(ay1 - ay0) / L, (ax1 - ax0) / L
    dist = (xx - ax0) * nx + (yy - ay0) * ny
    ridged = 1 - np.abs(noise(H, W, 11, octaves=6, base=3) * 2 - 1)
    z = np.clip(np.abs(dist) / 260, 0, 1.4) ** 1.3 * 160 + ridged * 70 + noise(H, W, 5, octaves=7, base=6) * 45
    sh = hillshade(z, zscale=1.0)
    base = np.stack([246 + 0 * sh, 248 + 0 * sh, 251 + 0 * sh], -1)
    shadow = np.array([204, 210, 222], np.float32)
    k = np.clip((0.74 - sh) * 1.05, 0, 1)[..., None]
    rgb = base * (1 - k) + shadow * k
    # protected area tint (mint) top-left, like the original park zone
    mint = np.array([214, 238, 229], np.float32)
    zone = ((yy < 340 - 0.35 * xx + 60 * noise(H, W, 9, 3, 2)) & (xx < 420)).astype(np.float32)
    zone = np.array(Image.fromarray((zone * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2))) / 255.0
    rgb = rgb * (1 - zone[..., None] * 0.55) + (mint * (0.9 + 0.1 * sh[..., None])) * zone[..., None] * 0.55
    # forests on slopes
    f = noise(H, W, 21, octaves=5, base=5)
    forest = ((f > 0.6) & (np.abs(dist) > 70) & (np.abs(dist) < 420)).astype(np.float32)
    forest = np.array(Image.fromarray((forest * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5))) / 255.0
    green = np.array([196, 229, 205], np.float32)
    rgb = rgb * (1 - forest[..., None] * 0.6) + green * forest[..., None] * 0.6
    s = f'<image href="{to_png_href(rgb)}" x="0" y="0" width="{W}" height="{H}"/>'
    # river (Arve-like) following the valley, plus a tributary at the top
    river = [(0, 700), (60, 610), (85, 520), (70, 440), (110, 380), (175, 345), (260, 330), (330, 300),
             (400, 250), (455, 205), (470, 175), (430, 150), (440, 100), (520, 60), (600, 40), (646, 32)]
    s += stroke(river, '#8fd0ef', 7.5)
    s += stroke([(0, 720), (40, 680), (80, 600)], '#8fd0ef', 6)
    s += stroke([(646, 1200), (600, 1260), (570, 1330), (560, 1398)], '#8fd0ef', 4)
    for (cx, cy, r) in [(122, 470, 8), (130, 485, 5), (632, 936, 6)]:
        s += blob(cx, cy, r, int(cx), '#8fd0ef')
    # main road (grey-lavender) along the valley
    road = [(0, 350), (40, 382), (110, 385), (170, 440), (215, 520), (235, 585), (300, 630), (360, 700),
            (410, 760), (470, 830), (520, 900), (560, 980), (600, 1050), (646, 1130)]
    s += stroke(road, '#ffffff', 6.5) + stroke(road, '#98a1c9', 3)
    s += stroke([(646, 1170), (610, 1230), (580, 1300), (555, 1398)], '#98a1c9', 2.2)
    s += stroke([(215, 520), (260, 560), (300, 600), (310, 640)], '#a9b0cf', 1.6)
    # town fabric
    s += blob(215, 520, 58, 3, '#e9ebf1', n=10)
    s += blob(560, 885, 34, 8, '#eceef3', n=8)
    s += txt(215, 538, 'Chamonix', 24, '#3f434c')
    s += txt(550, 876, 'Argentière', 21, '#3f434c')
    s += shield(112, 382, 'N205') + shield(413, 772, 'N205') + shield(392, 132, 'D506') + shield(606, 1068, 'D1506')
    im = svg(s, W, H, scale=2).resize((W, H), Image.LANCZOS)
    return im


def txt(x, y, t, size, fill, fam='Geist500', anchor='middle'):
    return (f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{fam}" font-size="{size}" fill="{fill}" '
            f'stroke="#ffffff" stroke-width="3" paint-order="stroke" stroke-linejoin="round">{esc(t)}</text>')


# ------------------------------------------------------------------ city map (Lyon-like)
def city():
    W, H = 1541, 966
    rng = np.random.default_rng(4)
    s = f'<rect width="{W}" height="{H}" fill="#f1f2ed"/>'
    # building texture
    blocks = ''
    for _ in range(5200):
        x, y = rng.random() * W, rng.random() * H
        dc = math.hypot((x - 760) / W, (y - 480) / H)
        if rng.random() > 1.25 - dc * 1.4:
            continue
        w, h = 4 + rng.random() * 18, 4 + rng.random() * 14
        c = ['#e8e9e3', '#e4e5df', '#ecede7', '#e1e2dc'][rng.integers(4)]
        blocks += f'<rect x="{x:.0f}" y="{y:.0f}" width="{w:.0f}" height="{h:.0f}" fill="{c}"/>'
    s += blocks
    # street grid
    g = ''
    for x in range(-40, W + 60, 155):
        g += f'<line x1="{x + 30}" y1="0" x2="{x}" y2="{H}" stroke="#ece8cf" stroke-width="2"/>'
    for y in range(-30, H + 60, 158):
        g += f'<line x1="0" y1="{y}" x2="{W}" y2="{y + 18}" stroke="#ece8cf" stroke-width="2"/>'
    for x in range(0, W, 39):
        g += f'<line x1="{x + 8}" y1="0" x2="{x}" y2="{H}" stroke="#f7f7f3" stroke-width="1"/>'
    for y in range(0, H, 40):
        g += f'<line x1="0" y1="{y}" x2="{W}" y2="{y + 5}" stroke="#f7f7f3" stroke-width="1"/>'
    s += g
    # parks
    parks = [(905, 250, 95, 70), (1180, 190, 60, 40), (300, 330, 70, 90), (160, 520, 50, 40), (1060, 780, 90, 60),
             (1400, 320, 70, 50), (470, 120, 40, 28), (1300, 640, 38, 30), (640, 880, 60, 36), (80, 140, 50, 70),
             (1250, 880, 110, 70), (230, 780, 60, 90)]
    for i, (x, y, w, h) in enumerate(parks):
        s += blob(x, y, max(w, h) * 0.7, 40 + i, '#c9e1a2', n=7, jitter=0.25)
    for i in range(26):
        x, y = rng.random() * W, rng.random() * H
        s += f'<rect x="{x:.0f}" y="{y:.0f}" width="{14 + rng.random() * 26:.0f}" height="{12 + rng.random() * 22:.0f}" fill="#c9e1a2"/>'
    # rivers: Saône (meanders, west) joins Rhône (wide, east) south of centre
    saone = [(420, 0), (470, 90), (430, 180), (505, 260), (560, 300), (520, 380), (585, 450), (650, 520), (660, 600), (700, 700)]
    rhone = [(1010, 0), (960, 90), (890, 200), (830, 300), (790, 420), (750, 520), (715, 620), (700, 700), (690, 820), (705, 966)]
    s += stroke(saone, '#a0cfe8', 16) + stroke(rhone, '#a0cfe8', 26)
    s += stroke([(0, 250), (120, 300), (260, 280)], '#a0cfe8', 3)
    s += stroke([(1541, 520), (1420, 470), (1300, 480), (1200, 430)], '#a0cfe8', 2.5)
    for i, (x, y) in enumerate([(1130, 60), (1200, 110), (60, 620), (1460, 760), (1350, 150)]):
        s += blob(x, y, 14 + i * 3, 70 + i, '#a0cfe8', n=6)
    # motorways (grey, white core)
    hw = [
        [(0, 670), (260, 640), (520, 610), (700, 600), (900, 590), (1150, 588), (1541, 585)],
        [(860, 0), (850, 150), (865, 300), (880, 450), (885, 600), (888, 760), (900, 966)],
        [(0, 90), (130, 200), (260, 330), (330, 470), (380, 560), (520, 610)],
        [(1200, 966), (1300, 860), (1420, 740), (1541, 650)],
    ]
    for pts in hw:
        s += stroke(pts, '#a3a3a3', 7) + stroke(pts, '#f4f4f4', 2.2)
    s += (f'<circle cx="885" cy="598" r="22" fill="none" stroke="#a3a3a3" stroke-width="4"/>')
    s += (f'<text x="770" y="498" text-anchor="middle" font-family="Geist600" font-size="40" fill="#555555">Lyon</text>')
    im = svg(s, W, H, scale=1.5).resize((W, H), Image.LANCZOS)
    o = Image.open(M + 'wichita-map.Cgq_JKRy_Z1xWogU.webp').convert('RGBA')
    im.putalpha(o.getchannel('A'))
    return im


# ------------------------------------------------------------------ road-map style (pharmacy / housing panel)
def roadmap_style(W, H, seed, relief_mask_fn, water_svg, rivers, motorways, roads, grid_box, parks_n=30):
    rng = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    ridged = 1 - np.abs(noise(H, W, seed, octaves=7, base=4) * 2 - 1)
    z = ridged * 120 + noise(H, W, seed + 1, 6, 6) * 60
    sh = hillshade(z)
    m = relief_mask_fn(xx, yy)
    m = np.array(Image.fromarray((np.clip(m, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(10))) / 255.0
    m = m * np.clip(0.55 + noise(H, W, seed + 7, 4, 3) * 0.9, 0, 1)
    base = np.array([244, 241, 242], np.float32)
    hill = np.stack([150 + 80 * sh, 180 + 58 * sh, 150 + 72 * sh], -1)
    rgb = base * (1 - m[..., None] * 0.55) + hill * m[..., None] * 0.55
    s = f'<image href="{to_png_href(rgb)}" x="0" y="0" width="{W}" height="{H}"/>'
    # street grid (white): two slightly rotated families of streets, broken into random segments
    x0, y0, x1, y1 = grid_box
    g = ''
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    diag = math.hypot(x1 - x0, y1 - y0)
    for ang, sp in ((math.radians(-9), 46), (math.radians(81), 52)):
        ux, uy = math.cos(ang), math.sin(ang)
        vx, vy = -uy, ux
        k = -diag / 2
        while k < diag / 2:
            t = -diag / 2
            while t < diag / 2:
                seg = 40 + rng.random() * 220
                if rng.random() > 0.22:
                    ax, ay = cx + vx * k + ux * t, cy + vy * k + uy * t
                    bx, by = ax + ux * seg, ay + uy * seg
                    wv = 0.8 * math.sin(k / 37.0)
                    g += f'<line x1="{ax:.0f}" y1="{ay:.0f}" x2="{bx:.0f}" y2="{by + wv:.0f}"/>'
                t += seg + (0 if rng.random() > 0.3 else 30 + rng.random() * 80)
            k += sp * (0.75 + rng.random() * 0.5)
    s += f'<clipPath id="gb"><path d="{cr_path([(x0, y0 + 60), (x0 + 120, y0), (x1, y0), (x1, y1), (x0 + 60, y1), (x0 - 30, (y0 + y1) / 2)], True)}"/></clipPath>'
    s += f'<g clip-path="url(#gb)" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round">{g}</g>'
    g = ''
    s += f'<g stroke="#ffffff" stroke-width="3" stroke-linecap="round">{g}</g>'
    for i in range(parks_n):
        x, y = x0 + rng.random() * (x1 - x0), y0 + rng.random() * (y1 - y0)
        s += blob(x, y, 10 + rng.random() * 22, seed * 100 + i, '#cfe8c6', n=6, jitter=0.3)
    s += water_svg
    for pts, w in rivers:
        s += stroke(pts, '#a6d8f5', w)
    for pts in roads:
        s += stroke(pts, '#fbfbfb', 7) + stroke(pts, '#f6d77c', 4)
    for pts in motorways:
        s += stroke(pts, '#fbfbfb', 9) + stroke(pts, '#f1a262', 5.5)
    return svg(s, W, H, scale=1.5).resize((W, H), Image.LANCZOS)


def pharmacy():
    W, H = 1790, 1104
    water = blob(1530, 190, 150, 5, '#a6d8f5', n=10, jitter=0.2) + blob(1380, 120, 70, 6, '#a6d8f5', n=7)
    water += blob(1660, 560, 60, 7, '#a6d8f5', n=7)
    rivers = [
        ([(560, 0), (600, 120), (560, 240), (640, 350), (720, 420), (700, 540), (760, 640), (830, 720), (860, 820), (880, 1104)], 22),
        ([(1790, 330), (1600, 330), (1420, 360), (1250, 450), (1080, 540), (950, 640), (872, 730), (845, 760)], 30),
        ([(0, 820), (160, 780), (300, 820), (420, 760)], 6),
    ]
    motor = [
        [(0, 300), (250, 360), (500, 430), (700, 470), (900, 520), (1100, 600), (1300, 700), (1500, 760), (1790, 790)],
        [(980, 0), (1000, 200), (1030, 400), (1050, 600), (1060, 800), (1080, 1104)],
        [(1790, 1010), (1500, 980), (1250, 940), (1060, 900), (880, 960), (700, 1104)],
        [(1230, 0), (1340, 160), (1450, 300), (1600, 420), (1790, 470)],
    ]
    roads = [
        [(300, 0), (330, 200), (310, 420), (360, 620), (420, 800), (430, 1104)],
        [(1200, 460), (1240, 640), (1250, 820), (1270, 1104)],
        [(1380, 700), (1420, 900), (1430, 1104)],
        [(700, 0), (760, 150), (820, 260), (900, 380)],
        [(1790, 640), (1600, 620), (1400, 640)],
    ]
    return roadmap_style(W, H, 12, lambda x, y: (x < 780 + 120 * np.sin(y / 180)).astype(np.float32),
                         water, rivers, motor, roads, (800, 40, 1790, 1104), parks_n=34)


def map_panel(W=1400, H=900):
    """Nantes-like map (Loire across the top) for the housing chat panel."""
    water = f'<path d="{cr_path([(0, 150), (300, 200), (600, 180), (900, 260), (1200, 230), (1400, 290), (1400, 0), (0, 0)], True)}" fill="#a6d8f5"/>'
    water += blob(1150, 110, 70, 3, '#cfe8c6', n=8) + blob(420, 80, 50, 4, '#cfe8c6', n=7)
    rivers = [([(0, 150), (300, 200), (600, 180), (900, 260), (1200, 230), (1400, 290)], 40),
              ([(820, 900), (800, 700), (840, 500), (860, 260)], 12),
              ([(1400, 520), (1250, 480), (1100, 360), (1000, 250)], 8)]
    motor = [[(0, 420), (300, 390), (600, 340), (900, 360), (1200, 450), (1400, 480)],
             [(560, 900), (620, 700), (700, 500), (760, 300), (820, 180), (900, 0)],
             [(1400, 820), (1150, 760), (950, 700), (700, 640), (400, 600), (0, 560)]]
    roads = [[(200, 900), (260, 700), (300, 480), (340, 300)],
             [(1100, 900), (1080, 700), (1120, 520), (1200, 450)],
             [(0, 640), (300, 620), (560, 600)]]
    return roadmap_style(W, H, 31, lambda x, y: ((x < 520) & (y > 330)).astype(np.float32),
                         water, rivers, motor, roads, (380, 240, 1400, 900), parks_n=26)


if __name__ == '__main__':
    import sys
    which = sys.argv[1:] or ['camping', 'city', 'pharmacy', 'panel']
    if 'camping' in which:
        c = camping()
        write('camping-map', c)
        write('images/home/roadmap/demo/camping-map', c)
    if 'city' in which:
        write('wichita-map', city())
    if 'pharmacy' in which:
        write('pharmacy-map', pharmacy())
    if 'panel' in which:
        map_panel().save(OUT + 'map_panel.png')
