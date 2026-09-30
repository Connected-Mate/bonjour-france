"""Round medallions (america.gov seal grammar: metal rim, beaded edge, text ring with stars,
engraved central field with generic pictogram) for French public bodies. Pure vector: all text
is outlined with fontTools, so SVG masters render identically everywhere."""
import sys, math, io, os
import resvg_py
from PIL import Image
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/lead')
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/badges')
from badges import PICTOS as _P
import glyphs as G
from bodies import BODIES

RING_FONT = 'Newsreader600'
SANS = 'Geist600'

PICTOS = dict(_P)
PICTOS.update({
 'euro': '<circle cx="100" cy="100" r="80" fill="none" stroke="{c}" stroke-width="12"/><text x="104" y="136" font-family="Geist700" font-size="104" fill="{c}" text-anchor="middle">€</text>',
 'impots': '<path d="M50 20 h70 l40 40 v120 h-110 z" fill="none" stroke="{c}" stroke-width="12" stroke-linejoin="round"/><path d="M120 20 v40 h40" fill="none" stroke="{c}" stroke-width="10" stroke-linejoin="round"/><text x="104" y="152" font-family="Geist700" font-size="74" fill="{c}" text-anchor="middle">€</text>',
 'identite': '<rect x="14" y="40" width="172" height="120" rx="14" fill="{c}"/><circle cx="62" cy="88" r="20" fill="#fff"/><path d="M32 140 a30 26 0 0 1 60 0 z" fill="#fff"/><rect x="108" y="74" width="60" height="10" rx="5" fill="#fff"/><rect x="108" y="96" width="48" height="10" rx="5" fill="#fff" fill-opacity=".75"/><rect x="108" y="118" width="56" height="10" rx="5" fill="#fff" fill-opacity=".75"/>',
 'sablier': '<rect x="40" y="18" width="120" height="16" rx="6" fill="{c}"/><rect x="40" y="166" width="120" height="16" rx="6" fill="{c}"/><path d="M56 34 H144 C144 70 112 86 112 100 C112 114 144 130 144 166 H56 C56 130 88 114 88 100 C88 86 56 70 56 34 Z" fill="none" stroke="{c}" stroke-width="10" stroke-linejoin="round"/><path d="M72 58 H128 C122 76 104 86 100 96 C96 86 78 76 72 58 Z M100 124 C112 134 130 146 134 160 H66 C70 146 88 134 100 124 Z" fill="{c}"/>',
 'info': '<circle cx="100" cy="100" r="80" fill="{c}"/><circle cx="100" cy="58" r="13" fill="#fff"/><rect x="88" y="84" width="24" height="72" rx="8" fill="#fff"/><rect x="76" y="148" width="48" height="12" rx="5" fill="#fff"/><rect x="76" y="84" width="30" height="12" rx="5" fill="#fff"/>',
 'bulle_i': '<path d="M30 40 a20 20 0 0 1 20 -20 h100 a20 20 0 0 1 20 20 v80 a20 20 0 0 1 -20 20 h-60 l-35 35 v-35 h-5 a20 20 0 0 1 -20 -20 z" fill="{c}"/><circle cx="100" cy="48" r="11" fill="#fff"/><rect x="90" y="68" width="20" height="56" rx="7" fill="#fff"/>',
 'valise': '<path d="M74 52 v-18 a10 10 0 0 1 10 -10 h32 a10 10 0 0 1 10 10 v18" fill="none" stroke="{c}" stroke-width="11"/><rect x="22" y="52" width="156" height="118" rx="16" fill="{c}"/><rect x="58" y="52" width="12" height="118" fill="#fff" fill-opacity=".55"/><rect x="130" y="52" width="12" height="118" fill="#fff" fill-opacity=".55"/><circle cx="60" cy="178" r="8" fill="{c}"/><circle cx="140" cy="178" r="8" fill="{c}"/>',
 'rails': '<path d="M70 20 L30 180 M130 20 L170 180" stroke="{c}" stroke-width="12" stroke-linecap="round"/>' + ''.join(f'<rect x="{62 - i*8}" y="{36 + i*30}" width="{76 + i*16}" height="11" rx="4" fill="{{c}}"/>' for i in range(5)),
})


def _mix(a, b, t):
    a = [int(a[i:i + 2], 16) for i in (1, 3, 5)]; b = [int(b[i:i + 2], 16) for i in (1, 3, 5)]
    return '#' + ''.join(f'{round(x + (y - x) * t):02x}' for x, y in zip(a, b))


def _lum(h):
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


METALS = {
    'gold': ('#f6e2a4', '#d2ad57', '#9a7426', '#6e5018'),
    'silver': ('#f4f6f9', '#c3cad4', '#8a94a3', '#5d6675'),
}


def picto(name, color, cx, cy, size, knock='#fff'):
    s = size / 200
    body = PICTOS[name].replace('{c}', color).replace('"#fff"', f'"{knock}"')
    body = G.outline_text_tags(body)
    return f'<g transform="translate({cx - size / 2:.2f} {cy - size / 2:.2f}) scale({s:.4f})">' + body + '</g>'


def star(cx, cy, r, fill, rot=-90):
    pts = []
    for i in range(10):
        rr = r if i % 2 == 0 else r * 0.42
        a = math.radians(rot + i * 36)
        pts.append(f'{cx + rr * math.cos(a):.2f},{cy + rr * math.sin(a):.2f}')
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'


def _fit_arc(text, r, fs, track, maxdeg, mindeg=None, maxgrow=1.4):
    """Shrink font to fit max span; short names grow (then track a little) so the ring stays balanced."""
    deg = lambda: math.degrees(G.width(RING_FONT, text, fs, track) / r)
    d = deg()
    if d > maxdeg:
        k = maxdeg / d
        fs *= k; track *= k
    elif mindeg and d < mindeg and len(text) > 1:
        g = min(maxgrow, mindeg / d)
        fs *= g; track *= g
        d = deg()
        if d < mindeg:
            extra = (math.radians(mindeg) * r - G.width(RING_FONT, text, fs, track)) / (len(text) - 1)
            track += min(extra, fs * 0.32)
    return fs, track


def medal(bid, S=512, gid='m', style='medal'):
    top, bottom, pic, band, tcol, metal, _ = BODIES[bid]
    hi, mid, lo, deep = METALS[metal]
    cx = cy = S / 2
    R = S / 2 - 2
    light_band = _lum(band) > 0.5
    field = _mix(band, '#fbf8f0', 0.93)
    field2 = _mix(band, '#fbf8f0', 0.80)
    pc = tcol if light_band else band
    o = [f'''<defs>
<linearGradient id="mt{gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{hi}"/><stop offset=".45" stop-color="{mid}"/><stop offset=".8" stop-color="{lo}"/><stop offset="1" stop-color="{deep}"/></linearGradient>
<linearGradient id="mr{gid}" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="{hi}"/><stop offset=".5" stop-color="{mid}"/><stop offset="1" stop-color="{lo}"/></linearGradient>
<radialGradient id="bd{gid}" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="{_mix(band, '#ffffff', .16)}"/><stop offset=".6" stop-color="{band}"/><stop offset="1" stop-color="{_mix(band, '#000000', .28)}"/></radialGradient>
<radialGradient id="fd{gid}" cx=".42" cy=".36" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="{field}"/><stop offset="1" stop-color="{field2}"/></radialGradient>
<radialGradient id="gl{gid}" cx=".32" cy=".18" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".30"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>''']
    # outer rim + beaded edge
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="url(#mt{gid})"/>')
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{R - 0.8}" fill="none" stroke="{deep}" stroke-opacity=".55" stroke-width="1.6"/>')
    nb = 88 if style == 'medal' else 56
    for i in range(nb):
        a = (i + 0.5) / nb * 2 * math.pi
        x, y = cx + math.cos(a) * R * 0.963, cy + math.sin(a) * R * 0.963
        o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{R * 0.0205:.2f}" fill="{deep}" fill-opacity=".38"/>'
                 f'<circle cx="{x - R * 0.004:.1f}" cy="{y - R * 0.005:.1f}" r="{R * 0.012:.2f}" fill="{hi}" fill-opacity=".65"/>')
    # band
    rb_o, rb_i = R * 0.925, R * 0.64
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{rb_o}" fill="{deep}" fill-opacity=".5"/>')
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{rb_o - 1.5}" fill="url(#bd{gid})"/>')
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{R * 0.9}" fill="none" stroke="{mid}" stroke-opacity=".85" stroke-width="{R * 0.008:.2f}"/>')
    if style == 'medal':
        midr = (R * 0.9 + rb_i) / 2
        fs = R * 0.118
        capf = G.font(RING_FONT).cap
        ch = fs * capf
        # top
        rt = midr - ch / 2
        fs_t, tr_t = _fit_arc(top, rt, fs, fs * 0.14, 240, 104, 1.4)
        rt = midr - fs_t * capf / 2
        dt, at = G.arc(RING_FONT, top, cx, cy, rt, fs_t, tr_t, 'top')
        # bottom
        fs_b0 = fs * (0.9 if len(bottom) > 4 else 1.0)
        rbot = midr + fs_b0 * capf / 2
        fs_b, tr_b = _fit_arc(bottom, rbot, fs_b0, fs_b0 * 0.14, min(150, 336 - at), 56, 1.2)
        rbot = midr + fs_b * capf / 2
        db, ab = G.arc(RING_FONT, bottom, cx, cy, rbot, fs_b, tr_b, 'bottom')
        shadow = _mix(band, '#000000', .55)
        for d in (dt, db):
            o.append(f'<path d="{d}" fill="{shadow}" fill-opacity=".55" transform="translate(0 {R * 0.006:.2f})"/>')
            o.append(f'<path d="{d}" fill="{tcol}"/>')
        # stars in the two gaps
        g = (at - ab) / 4
        for ang in (g, 180 - g):
            a = math.radians(ang)
            o.append(star(cx + midr * math.cos(a), cy + midr * math.sin(a), R * 0.034, tcol))
    else:
        midr = (R * 0.9 + rb_i) / 2
        for i in range(4 if style == 'simple' else 0):
            a = math.radians(i * 90)
            o.append(star(cx + midr * math.cos(a), cy + midr * math.sin(a), R * 0.05, tcol))
    # inner metal ring + field
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{rb_i}" fill="url(#mr{gid})"/>')
    ir = rb_i - R * 0.03
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{ir}" fill="url(#fd{gid})"/>')
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{ir}" fill="none" stroke="{deep}" stroke-opacity=".35" stroke-width="{R * 0.008:.2f}"/>')
    if style == 'medal':
        # engraved sunburst + guilloche
        rays = []
        for i in range(72):
            a = i / 72 * 2 * math.pi
            r0, r1 = ir * 0.18, ir * (0.97 if i % 2 == 0 else 0.9)
            rays.append(f'M{cx + math.cos(a) * r0:.1f} {cy + math.sin(a) * r0:.1f}L{cx + math.cos(a) * r1:.1f} {cy + math.sin(a) * r1:.1f}')
        o.append(f'<path d="{"".join(rays)}" stroke="{band}" stroke-opacity=".07" stroke-width="{R * 0.006:.2f}"/>')
        for k in (0.9, 0.94):
            o.append(f'<circle cx="{cx}" cy="{cy}" r="{ir * k:.1f}" fill="none" stroke="{band}" stroke-opacity=".16" stroke-width="{R * 0.004:.2f}"/>')
        # arc of five small stars over the emblem
        for i in range(5):
            a = math.radians(-90 + (i - 2) * 17)
            o.append(star(cx + math.cos(a) * ir * 0.8, cy + math.sin(a) * ir * 0.8, R * 0.022, band))
        ps, py = ir * 1.0, cy + ir * 0.07
    else:
        ps, py = ir * 1.18, cy
    o.append(f'<g transform="translate(0 {R * 0.008:.2f})" opacity=".18">' + picto(pic, '#000', cx, py, ps, knock='#000') + '</g>')
    o.append(picto(pic, pc, cx, py, ps, knock=field if not light_band else '#fff'))
    # soft top-left gloss over the whole coin
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="url(#gl{gid})"/>')
    return ''.join(o)


def tiny(bid, S=512):
    """< 40 px: solid disc, white pictogram - legible at favicon size."""
    _, _, pic, band, tcol, metal, _ = BODIES[bid]
    hi, mid, lo, deep = METALS[metal]
    cx = cy = S / 2; R = S / 2 - 2
    light = _lum(band) > 0.5
    fg = tcol if light else '#ffffff'
    return (f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{mid}"/><circle cx="{cx}" cy="{cy}" r="{R * 0.86}" fill="{band}"/>'
            + picto(pic, fg, cx, cy, R * 1.12, knock=band))


def svg_doc(body, w, h, vb=None):
    vb = vb or f'0 0 {w} {h}'
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="{vb}">{body}</svg>'


def style_for(px):
    return 'medal' if px >= 96 else ('simple' if px >= 40 else 'tiny')


def medal_body(bid, style, gid='m'):
    return tiny(bid) if style == 'tiny' else medal(bid, gid=gid, style=style)


def raster(svg, px):
    b = resvg_py.svg_to_bytes(svg_string=svg, width=int(px))
    return Image.open(io.BytesIO(bytes(b))).convert('RGBA')


def medal_png(bid, style, px):
    return raster(svg_doc(medal_body(bid, style), 512, 512), px)


def lockup_svg(bid, w, h, dark_bg=False, gid='L'):
    """Wide slots (wordmark-shaped originals): small medallion + body name, outlined text."""
    top, bottom, pic, band, tcol, metal, short = BODIES[bid]
    k = 512.0 / h  # draw in a coordinate system of height 512
    W, H = w * k, 512.0
    o = []
    if dark_bg:
        o.append(f'<rect width="{W:.1f}" height="{H}" fill="{band}"/>')
    d = H * 0.9
    o.append(f'<g transform="translate({H * 0.05:.1f} {H * 0.05:.1f}) scale({d / 512:.4f})">' + medal(bid, gid=gid, style='simple') + '</g>')
    tx = H * 1.08
    fg = '#ffffff' if dark_bg else band
    avail = W - tx - H * 0.08
    sub = bottom if short.upper() != bottom else ''
    size = H * (0.40 if sub else 0.5)
    wn = G.width('Geist700', short, size, -size * 0.01)
    if wn > avail:
        size *= avail / wn
    if sub and W / H > 2.6:
        base = H * 0.5 + size * 0.1
        o.append(f'<path fill="{fg}" d="{G.line("Geist700", short, tx, base, size, -size * 0.01)}"/>')
        ss = size * 0.42
        ws = G.width('Geist600', sub, ss, ss * 0.08)
        if ws > avail:
            ss *= avail / ws
        o.append(f'<path fill="{fg}" fill-opacity=".78" d="{G.line("Geist600", sub, tx, base + ss * 1.55, ss, ss * 0.08)}"/>')
    else:
        o.append(f'<path fill="{fg}" d="{G.line("Geist700", short, tx, H * 0.5 + size * 0.36, size, -size * 0.01)}"/>')
    return svg_doc(''.join(o), w, h, f'0 0 {W:.1f} {H:.1f}'), (W, H)
