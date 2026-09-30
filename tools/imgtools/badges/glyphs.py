"""Text -> SVG path outlines (fontTools), straight or along a circle. No font needed at render time."""
import math, re
from functools import lru_cache
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

FONTDIR = '/Users/0104389S/Projects/hello-france/tools/imgtools/fonts/'


def _n(x):
    s = f'{x:.2f}'.rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


class Font:
    def __init__(self, name):
        f = TTFont(FONTDIR + name + '.ttf')
        self.gs = f.getGlyphSet()
        self.cmap = f.getBestCmap()
        self.upm = f['head'].unitsPerEm
        self.hmtx = f['hmtx']
        self.cap = f['OS/2'].sCapHeight / self.upm
        self._kern = {}
        try:  # simple pair kerning from GPOS PairPos format 1 (enough for caps)
            for lk in f['GPOS'].table.LookupList.Lookup:
                for st in lk.SubTable:
                    st = getattr(st, 'ExtSubTable', st)
                    if getattr(st, 'Format', None) == 1 and hasattr(st, 'PairSet'):
                        for g1, ps in zip(st.Coverage.glyphs, st.PairSet):
                            for pvr in ps.PairValueRecord:
                                v = getattr(pvr.Value1, 'XAdvance', 0) if pvr.Value1 else 0
                                if v:
                                    self._kern[(g1, pvr.SecondGlyph)] = v
        except Exception:
            pass

    def gname(self, ch):
        c = self.cmap.get(ord(ch))
        if c is None:
            raise KeyError(f'glyph missing for {ch!r}')
        return c

    def adv(self, ch):
        return self.hmtx[self.gname(ch)][0] / self.upm

    def kern(self, a, b):
        return self._kern.get((self.gname(a), self.gname(b)), 0) / self.upm

    def draw(self, ch, tr):
        pen = SVGPathPen(self.gs, ntos=_n)
        self.gs[self.gname(ch)].draw(TransformPen(pen, tr))
        return pen.getCommands()


@lru_cache(None)
def font(name):
    return Font(name)


def advances(f, text, fs, track):
    """Per-glyph (advance_px) including tracking + kerning."""
    out = []
    for i, ch in enumerate(text):
        a = f.adv(ch) * fs
        if i + 1 < len(text):
            a += f.kern(ch, text[i + 1]) * fs + track
        out.append(a)
    return out


def width(fname, text, fs, track=0):
    return sum(advances(font(fname), text, fs, track))


def line(fname, text, x, y, fs, track=0, anchor='start'):
    """Straight text as one path d. (x,y) = baseline point."""
    f = font(fname)
    adv = advances(f, text, fs, track)
    L = sum(adv)
    x0 = x - (L / 2 if anchor == 'middle' else L if anchor == 'end' else 0)
    d = []
    for ch, a in zip(text, adv):
        if ch != ' ':
            d.append(f.draw(ch, Transform(fs / f.upm, 0, 0, -fs / f.upm, x0, y)))
        x0 += a
    return ''.join(d)


def arc(fname, text, cx, cy, r, fs, track=0, side='top'):
    """Text centred on top (reads clockwise, glyphs point outward) or bottom (reads left->right,
    glyphs point inward) of circle radius r (baseline). Returns (d, span_degrees)."""
    f = font(fname)
    adv = advances(f, text, fs, track)
    L = sum(adv)
    s = -L / 2
    d = []
    k = fs / f.upm
    for ch, a in zip(text, adv):
        gw = f.adv(ch) * fs
        mid = s + gw / 2
        if side == 'top':
            th = -math.pi / 2 + mid / r
            phi = th + math.pi / 2
        else:
            th = math.pi / 2 - mid / r
            phi = th - math.pi / 2
        px, py = cx + r * math.cos(th), cy + r * math.sin(th)
        t = Transform().translate(px, py).rotate(phi).translate(-gw / 2, 0).scale(k, -k)
        if ch != ' ':
            d.append(f.draw(ch, t))
        s += a
    return ''.join(d), math.degrees(L / r)


_TEXT = re.compile(r'<text x="([\d.]+)" y="([\d.]+)" font-family="(\w+)" font-size="([\d.]+)" fill="([^"]+)" text-anchor="middle">([^<]+)</text>')


def outline_text_tags(svg):
    """Replace simple <text> tags (as used in pictograms) by outlined paths."""
    return _TEXT.sub(lambda m: f'<path fill="{m.group(5)}" d="{line(m.group(3), m.group(6), float(m.group(1)), float(m.group(2)), float(m.group(4)), anchor="middle")}"/>', svg)
