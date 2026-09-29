"""Neutral medallion family replacing US seals/emblems/agency logos.
Never imitates a real French state emblem: no Marianne, no RF monogram, no fasces,
no oak/olive wreath, no cockerel, no tricolour. Pictograms are generic service icons."""
import sys, math, json
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/lead')
from lib import render, write, esc, OUT, ROOT
import place as P

# ring, ring text, metal (rim), inner disc, pictogram
PALS = {
    'navy':   ('#1b2f5b', '#f4ead0', '#c9a24a', '#f7f2e4', '#1b2f5b'),
    'green':  ('#1f4d3a', '#f1ecd8', '#c9a24a', '#eef2e6', '#1f4d3a'),
    'wine':   ('#5e1f2c', '#f6e9d6', '#c9a24a', '#f8efe6', '#5e1f2c'),
    'blue':   ('#1d5fae', '#ffffff', '#b9c6da', '#ffffff', '#1d5fae'),
    'teal':   ('#0f5c5a', '#eaf4ef', '#c9a24a', '#f3f7f2', '#0f5c5a'),
    'slate':  ('#2d3b4e', '#eef1f5', '#aeb8c6', '#f5f6f8', '#2d3b4e'),
    'rust':   ('#8c3b1f', '#f7ecdc', '#d1a45a', '#faf3e8', '#8c3b1f'),
    'ocean':  ('#0b4f7c', '#e8f4fb', '#c9a24a', '#f2f8fb', '#0b4f7c'),
    'ink':    ('#101828', '#f2f4f7', '#9aa4b2', '#f7f8fa', '#101828'),
    'gold':   ('#a8792a', '#fff4d6', '#d8b25e', '#f3dfa8', '#8a5f17'),
}

C = '{c}'  # pictogram colour placeholder; pictos drawn in a 200x200 box
PICTOS = {
 'sante': '<rect x="70" y="30" width="60" height="140" rx="14" fill="{c}"/><rect x="30" y="70" width="140" height="60" rx="14" fill="{c}"/>',
 'impots': '<path d="M50 20 h70 l40 40 v120 h-110 z" fill="none" stroke="{c}" stroke-width="12" stroke-linejoin="round"/><path d="M120 20 v40 h40" fill="none" stroke="{c}" stroke-width="10"/><text x="100" y="150" font-family="Geist700" font-size="78" fill="{c}" text-anchor="middle">€</text>',
 'logement': '<path d="M20 100 L100 30 L180 100" fill="none" stroke="{c}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/><path d="M45 95 v80 h110 v-80" fill="none" stroke="{c}" stroke-width="12" stroke-linejoin="round"/><rect x="85" y="120" width="30" height="55" fill="{c}"/>',
 'emploi': '<rect x="25" y="65" width="150" height="105" rx="14" fill="{c}"/><path d="M72 65 v-22 a10 10 0 0 1 10 -10 h36 a10 10 0 0 1 10 10 v22" fill="none" stroke="{c}" stroke-width="12"/><rect x="25" y="105" width="150" height="8" fill="#fff" fill-opacity=".55"/>',
 'famille': '<circle cx="60" cy="55" r="22" fill="{c}"/><circle cx="140" cy="55" r="22" fill="{c}"/><circle cx="100" cy="105" r="16" fill="{c}"/><path d="M28 175 v-60 a32 32 0 0 1 64 0 v60 z" fill="{c}"/><path d="M108 175 v-60 a32 32 0 0 1 64 0 v60 z" fill="{c}"/><path d="M80 178 v-30 a20 20 0 0 1 40 0 v30 z" fill="{c}" stroke="#fff" stroke-opacity=".6" stroke-width="5"/>',
 'transport': '<rect x="45" y="20" width="110" height="130" rx="26" fill="{c}"/><rect x="62" y="40" width="76" height="45" rx="8" fill="#fff" fill-opacity=".85"/><circle cx="72" cy="118" r="10" fill="#fff"/><circle cx="128" cy="118" r="10" fill="#fff"/><path d="M60 150 l-25 35 M140 150 l25 35" stroke="{c}" stroke-width="12" stroke-linecap="round"/>',
 'nature': '<path d="M100 18 L150 92 H125 L165 150 H35 L75 92 H50 Z" fill="{c}"/><rect x="90" y="148" width="20" height="35" fill="{c}"/>',
 'culture': '<path d="M100 55 C75 38 45 36 20 42 V160 C45 154 75 156 100 172 C125 156 155 154 180 160 V42 C155 36 125 38 100 55 Z" fill="none" stroke="{c}" stroke-width="12" stroke-linejoin="round"/><path d="M100 55 V170" stroke="{c}" stroke-width="10"/>',
 'justice': '<path d="M100 25 V170 M60 175 H140 M35 55 H165" stroke="{c}" stroke-width="10" stroke-linecap="round"/><circle cx="100" cy="30" r="10" fill="{c}"/><path d="M35 55 L12 115 H58 Z M165 55 L142 115 H188 Z" fill="none" stroke="{c}" stroke-width="7" stroke-linejoin="round"/><path d="M12 115 a23 16 0 0 0 46 0 Z M142 115 a23 16 0 0 0 46 0 Z" fill="{c}"/>',
 'climat': '<circle cx="75" cy="75" r="32" fill="{c}"/><g stroke="{c}" stroke-width="9" stroke-linecap="round"><path d="M75 18 v14 M75 118 v14 M18 75 h14 M118 75 h14 M35 35 l10 10 M105 105 l10 10 M35 115 l10 -10 M105 45 l10 -10"/></g><path d="M70 175 h90 a28 28 0 0 0 0 -56 a40 40 0 0 0 -76 8 a24 24 0 0 0 -14 48 z" fill="{c}" stroke="#fff" stroke-width="6"/>',
 'energie': '<path d="M115 15 L45 110 H95 L80 185 L155 85 H105 Z" fill="{c}"/>',
 'eau': '<path d="M100 18 C130 65 150 90 150 118 a50 50 0 0 1 -100 0 C50 90 70 65 100 18 Z" fill="{c}"/><path d="M78 125 a24 24 0 0 0 22 24" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>',
 'sciences': '<g fill="none" stroke="{c}" stroke-width="9"><ellipse cx="100" cy="100" rx="80" ry="30"/><ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)"/><ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)"/></g><circle cx="100" cy="100" r="15" fill="{c}"/>',
 'securite': '<path d="M100 18 L165 42 V95 C165 140 135 168 100 182 C65 168 35 140 35 95 V42 Z" fill="{c}"/><path d="M70 100 L92 122 L135 78" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>',
 'mer': '<path d="M100 20 V130 H40 Z" fill="{c}"/><path d="M110 45 L160 130 H110 Z" fill="{c}"/><path d="M20 150 q20 -14 40 0 t40 0 t40 0 t40 0" fill="none" stroke="{c}" stroke-width="10" stroke-linecap="round"/><path d="M40 178 q20 -14 40 0 t40 0 t40 0" fill="none" stroke="{c}" stroke-width="10" stroke-linecap="round"/>',
 'agriculture': '<path d="M100 185 V40" stroke="{c}" stroke-width="9" stroke-linecap="round"/>' + ''.join(f'<ellipse cx="{100+s*22}" cy="{60+i*28}" rx="12" ry="24" fill="{{c}}" transform="rotate({s*35} {100+s*22} {60+i*28})"/>' for i in range(4) for s in (-1, 1)) + '<ellipse cx="100" cy="30" rx="11" ry="22" fill="{c}"/>',
 'courrier': '<rect x="20" y="45" width="160" height="110" rx="12" fill="{c}"/><path d="M28 55 L100 110 L172 55" fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round"/>',
 'numerique': '<rect x="20" y="30" width="160" height="110" rx="12" fill="none" stroke="{c}" stroke-width="12"/><path d="M70 175 H130 M100 140 V175" stroke="{c}" stroke-width="12" stroke-linecap="round"/><path d="M70 72 l-20 16 l20 16 M130 72 l20 16 l-20 16" fill="none" stroke="{c}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>',
 'archives': '<rect x="25" y="30" width="150" height="40" rx="8" fill="{c}"/><path d="M38 78 H162 V170 H38 Z" fill="none" stroke="{c}" stroke-width="12" stroke-linejoin="round"/><rect x="75" y="100" width="50" height="14" rx="7" fill="{c}"/>',
 'monnaie': '<g fill="{c}"><ellipse cx="100" cy="150" rx="70" ry="22"/><rect x="30" y="118" width="140" height="32"/><ellipse cx="100" cy="118" rx="70" ry="22" stroke="#fff" stroke-width="5"/><rect x="30" y="80" width="140" height="38"/><ellipse cx="100" cy="80" rx="70" ry="22" stroke="#fff" stroke-width="5"/><rect x="30" y="45" width="140" height="35"/><ellipse cx="100" cy="45" rx="70" ry="22" stroke="#fff" stroke-width="5"/></g>',
 'voyage': '<path d="M100 15 c10 0 14 12 14 22 v45 l66 38 v20 l-66 -20 v40 l20 16 v16 l-34 -10 l-34 10 v-16 l20 -16 v-40 l-66 20 v-20 l66 -38 v-45 c0 -10 4 -22 14 -22 z" fill="{c}"/>',
 'montagne': '<path d="M10 170 L75 55 L105 105 L130 70 L190 170 Z" fill="{c}"/><path d="M75 55 L92 85 L80 80 L68 92 L60 82 Z M130 70 L142 90 L132 88 L122 96 Z" fill="#fff"/>',
 'batiment': '<path d="M100 18 L180 60 H20 Z" fill="{c}"/><rect x="25" y="68" width="150" height="12" fill="{c}"/>' + ''.join(f'<rect x="{38+i*34}" y="88" width="18" height="70" fill="{{c}}"/>' for i in range(5)) + '<rect x="15" y="164" width="170" height="18" fill="{c}"/>',
 'ampoule': '<path d="M100 20 a55 55 0 0 1 32 100 c-6 5 -9 12 -9 20 v8 h-46 v-8 c0 -8 -3 -15 -9 -20 A55 55 0 0 1 100 20 Z" fill="{c}"/><rect x="77" y="155" width="46" height="10" rx="5" fill="{c}"/><rect x="82" y="170" width="36" height="10" rx="5" fill="{c}"/><path d="M85 110 l15 -30 l15 30" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>',
 'globe': '<circle cx="100" cy="100" r="78" fill="none" stroke="{c}" stroke-width="11"/><ellipse cx="100" cy="100" rx="34" ry="78" fill="none" stroke="{c}" stroke-width="9"/><path d="M26 75 H174 M26 125 H174 M100 22 V178" stroke="{c}" stroke-width="9"/>',
 'industrie': '<path d="M20 180 V95 L65 120 V95 L110 120 V95 L155 120 V40 H180 V180 Z" fill="{c}"/><rect x="45" y="140" width="22" height="18" fill="#fff"/><rect x="90" y="140" width="22" height="18" fill="#fff"/><rect x="135" y="140" width="22" height="18" fill="#fff"/>',
 'carte': '<path d="M100 20 a55 55 0 0 1 55 55 c0 45 -55 105 -55 105 s-55 -60 -55 -105 a55 55 0 0 1 55 -55 z" fill="{c}"/><circle cx="100" cy="75" r="22" fill="#fff"/>',
 'ruban': '<path d="M70 20 H130 L118 80 H82 Z" fill="{c}"/><path d="M82 20 V80 M118 20 V80" stroke="#fff" stroke-width="6" stroke-opacity=".6"/><circle cx="100" cy="128" r="50" fill="{c}"/><circle cx="100" cy="128" r="34" fill="none" stroke="#fff" stroke-width="6"/><path d="M100 104 l7 15 l16 2 l-12 11 l3 16 l-14 -8 l-14 8 l3 -16 l-12 -11 l16 -2 z" fill="#fff"/>',
 'planete': '<circle cx="100" cy="100" r="55" fill="{c}"/><ellipse cx="100" cy="100" rx="92" ry="26" fill="none" stroke="{c}" stroke-width="10" transform="rotate(-20 100 100)"/><circle cx="160" cy="40" r="7" fill="{c}"/><circle cx="35" cy="160" r="5" fill="{c}"/>',
 'mairie': '<rect x="85" y="20" width="30" height="40" fill="{c}"/><circle cx="100" cy="42" r="9" fill="#fff"/><path d="M100 10 L122 22 H78 Z" fill="{c}"/><path d="M30 95 L100 58 L170 95 Z" fill="{c}"/><rect x="38" y="100" width="124" height="70" fill="{c}"/>' + ''.join(f'<rect x="{52+i*30}" y="115" width="16" height="26" rx="8" fill="#fff"/>' for i in range(4)) + '<rect x="88" y="145" width="24" height="25" rx="4" fill="#fff"/><rect x="25" y="170" width="150" height="12" fill="{c}"/>',
 'vote': '<rect x="30" y="85" width="140" height="95" rx="12" fill="{c}"/><rect x="60" y="85" width="80" height="10" fill="#fff"/><path d="M70 90 V25 H130 V90" fill="#fff" stroke="{c}" stroke-width="9" stroke-linejoin="round"/><path d="M85 55 l12 12 l20 -24" fill="none" stroke="{c}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>',
 'stats': '<rect x="25" y="110" width="30" height="65" rx="5" fill="{c}"/><rect x="68" y="75" width="30" height="100" rx="5" fill="{c}"/><rect x="111" y="95" width="30" height="80" rx="5" fill="{c}"/><rect x="154" y="40" width="30" height="135" rx="5" fill="{c}"/><path d="M40 90 L83 50 L126 70 L169 20" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
 'education': '<path d="M100 30 L190 75 L100 120 L10 75 Z" fill="{c}"/><path d="M50 98 V140 C75 165 125 165 150 140 V98 L100 123 Z" fill="{c}"/><path d="M178 80 V135" stroke="{c}" stroke-width="7"/><circle cx="178" cy="140" r="9" fill="{c}"/>',
 'cadenas': '<rect x="35" y="85" width="130" height="95" rx="16" fill="{c}"/><path d="M60 85 V60 a40 40 0 0 1 80 0 V85" fill="none" stroke="{c}" stroke-width="16"/><circle cx="100" cy="125" r="13" fill="#fff"/><rect x="94" y="130" width="12" height="28" rx="6" fill="#fff"/>',
 'accessibilite': '<circle cx="100" cy="35" r="17" fill="{c}"/><path d="M100 58 V110 H145 L160 165" fill="none" stroke="{c}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M70 90 a55 55 0 1 0 80 70" fill="none" stroke="{c}" stroke-width="12" stroke-linecap="round"/>',
 'bulle': '<path d="M30 40 a20 20 0 0 1 20 -20 h100 a20 20 0 0 1 20 20 v80 a20 20 0 0 1 -20 20 h-60 l-35 35 v-35 h-5 a20 20 0 0 1 -20 -20 z" fill="{c}"/><text x="100" y="112" font-family="Newsreader600" font-size="92" fill="#fff" text-anchor="middle">B</text>',
}


def picto(name, color, cx, cy, size):
    s = size / 200
    return f'<g transform="translate({cx - size/2:.2f} {cy - size/2:.2f}) scale({s:.4f})">' + PICTOS[name].replace('{c}', color) + '</g>'


def ring_paths(cx, cy, r):
    # top: left->right over the top (clockwise); bottom: left->right under (counter-clockwise)
    return (f'<path id="top" d="M {cx-r} {cy} A {r} {r} 0 0 1 {cx+r} {cy}" fill="none"/>'
            f'<path id="bot" d="M {cx-r} {cy} A {r} {r} 0 0 0 {cx+r} {cy}" fill="none"/>')


def medal(theme, pal, top='SERVICES PUBLICS', bottom='', style='medal', S=512, gid='a'):
    ring, rtext, metal, inner, pc = PALS[pal]
    cx = cy = S / 2
    R = S / 2 - 4
    s = f'''<defs>
<radialGradient id="rim{gid}" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".45" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
<radialGradient id="in{gid}" cx=".5" cy=".42" r=".6"><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>
{ring_paths(cx, cy + 0, R * 0.745)}</defs>'''
    # outer metal rim
    s += f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{metal}"/><circle cx="{cx}" cy="{cy}" r="{R}" fill="url(#rim{gid})"/>'
    # rope/bead ring (engraved dots)
    for i in range(72):
        a = i / 72 * 2 * math.pi
        s += f'<circle cx="{cx + math.cos(a)*R*0.955:.1f}" cy="{cy + math.sin(a)*R*0.955:.1f}" r="{R*0.016:.1f}" fill="#000" fill-opacity=".22"/>'
    s += f'<circle cx="{cx}" cy="{cy}" r="{R*0.92}" fill="{ring}"/>'
    s += f'<circle cx="{cx}" cy="{cy}" r="{R*0.895}" fill="none" stroke="{metal}" stroke-width="{R*0.012}"/>'
    if style == 'medal':
        fs = R * 0.125
        s += (f'<text font-family="Geist600" font-size="{fs:.1f}" letter-spacing="{fs*0.14:.1f}" fill="{rtext}">'
              f'<textPath href="#top" startOffset="50%" text-anchor="middle">{esc(top)}</textPath></text>')
        # bottom text sits on arc below: use slightly larger radius path so glyph tops face centre
        s += f'<path id="bot2{gid}" d="M {cx-R*0.8} {cy} A {R*0.8} {R*0.8} 0 0 0 {cx+R*0.8} {cy}" fill="none"/>'
        s += (f'<text font-family="Geist600" font-size="{fs:.1f}" letter-spacing="{fs*0.14:.1f}" fill="{rtext}">'
              f'<textPath href="#bot2{gid}" startOffset="50%" text-anchor="middle">{esc(bottom)}</textPath></text>')
        for sgn in (-1, 1):  # separators at 9 and 3 o'clock
            x = cx + sgn * R * 0.775
            s += f'<path d="M{x} {cy-R*0.045} L{x+R*0.03} {cy} L{x} {cy+R*0.045} L{x-R*0.03} {cy} Z" fill="{rtext}"/>'
        ir = R * 0.6
    elif style == 'tiny':
        s = f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{metal}"/><circle cx="{cx}" cy="{cy}" r="{R*0.88}" fill="{ring}"/>'
        return s + picto(theme, '#ffffff' if theme != 'bulle' else inner, cx, cy, R * 1.2).replace('fill="#fff"', f'fill="{ring}"').replace('stroke="#fff"', f'stroke="{ring}"')
    else:
        ir = R * 0.74
    s = s.replace('id="top"', f'id="top{gid}"').replace('href="#top"', f'href="#top{gid}"').replace('id="bot"', f'id="bot{gid}"')
    s += f'<circle cx="{cx}" cy="{cy}" r="{ir + R*0.035}" fill="{metal}"/>'
    s += f'<circle cx="{cx}" cy="{cy}" r="{ir}" fill="{inner}"/>'
    # engraved guilloche: fine concentric + radial ticks
    for k in range(1, 5):
        s += f'<circle cx="{cx}" cy="{cy}" r="{ir*(0.62+k*0.08):.1f}" fill="none" stroke="{pc}" stroke-opacity=".10" stroke-width="{R*0.006:.2f}"/>'
    for i in range(48):
        a = i / 48 * 2 * math.pi
        s += (f'<line x1="{cx+math.cos(a)*ir*0.9:.1f}" y1="{cy+math.sin(a)*ir*0.9:.1f}" x2="{cx+math.cos(a)*ir*0.97:.1f}" '
              f'y2="{cy+math.sin(a)*ir*0.97:.1f}" stroke="{pc}" stroke-opacity=".35" stroke-width="{R*0.008:.2f}"/>')
    s += f'<circle cx="{cx}" cy="{cy}" r="{ir}" fill="url(#in{gid})"/>'
    s += picto(theme, pc, cx, cy, ir * 1.12)
    return s


def shield(theme, pal, top, bottom, S=512, H=566):
    ring, rtext, metal, inner, pc = PALS[pal]
    w = S
    path = f'M{w*0.04} {H*0.05} H{w*0.96} V{H*0.5} C{w*0.96} {H*0.78} {w*0.72} {H*0.9} {w*0.5} {H*0.985} C{w*0.28} {H*0.9} {w*0.04} {H*0.78} {w*0.04} {H*0.5} Z'
    ipath = f'M{w*0.1} {H*0.1} H{w*0.9} V{H*0.49} C{w*0.9} {H*0.73} {w*0.69} {H*0.85} {w*0.5} {H*0.925} C{w*0.31} {H*0.85} {w*0.1} {H*0.73} {w*0.1} {H*0.49} Z'
    s = f'<path d="{path}" fill="{metal}"/><path d="{ipath}" fill="{ring}"/>'
    s += f'<text x="{w/2}" y="{H*0.2}" font-family="Geist700" font-size="{w*0.075}" letter-spacing="3" fill="{rtext}" text-anchor="middle">{esc(top)}</text>'
    s += f'<text x="{w/2}" y="{H*0.78}" font-family="Geist700" font-size="{w*0.07}" letter-spacing="3" fill="{rtext}" text-anchor="middle">{esc(bottom)}</text>'
    s += f'<circle cx="{w/2}" cy="{H*0.47}" r="{w*0.2}" fill="{inner}"/>' + picto(theme, pc, w / 2, H * 0.47, w * 0.28)
    return render(s, w, H)


def lockup(theme, pal, name, sub, w, h, bg=None):
    """Horizontal logo: small medal + wordmark, drawn at 4x the target size."""
    k = 4
    W, Hh = w * k, h * k
    ring, rtext, metal, inner, pc = PALS[pal]
    d = Hh * 0.9
    s = ''
    if bg:
        s += f'<rect width="{W}" height="{Hh}" fill="{bg}"/>'
    s += f'<g transform="translate({Hh*0.05} {Hh*0.05}) scale({d/512})">' + medal(theme, pal, style='simple', gid='L') + '</g>'
    tx = Hh * 1.05
    fg = '#ffffff' if bg else ring
    size = Hh * (0.36 if sub else 0.5)
    if w / h > 4.6:
        size = Hh * 0.42 if sub else Hh * 0.5
    # shrink to fit
    avail = W - tx - Hh * 0.1
    est = len(name) * size * 0.56
    if est > avail:
        size *= avail / est
    if sub:
        s += f'<text x="{tx}" y="{Hh*0.47}" font-family="Geist700" font-size="{size:.1f}" fill="{fg}" letter-spacing="-0.5">{esc(name)}</text>'
        ss = min(size * 0.62, (avail) / (len(sub) * 0.6 + 1))
        s += f'<text x="{tx}" y="{Hh*0.47 + size*1.05:.1f}" font-family="Geist500" font-size="{ss:.1f}" fill="{fg}" fill-opacity=".8" letter-spacing="1">{esc(sub)}</text>'
    else:
        s += f'<text x="{tx}" y="{Hh*0.5 + size*0.36:.1f}" font-family="Geist700" font-size="{size:.1f}" fill="{fg}" letter-spacing="-0.5">{esc(name)}</text>'
    return render(s, W, Hh)


def medal_img(theme, pal, top='SERVICES PUBLICS', bottom='', style='medal', px=1024):
    return render(medal(theme, pal, top, bottom, style), 512, 512, out_w=px)


def medal_svg_file(theme, pal, top, bottom, style='medal'):
    """Standalone SVG (text converted? no: resvg-free consumers render fonts). Use outlined text via font? keep text, font-family fallback)."""
    body = medal(theme, pal, top, bottom, style)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">' + body + '</svg>')
