"""passport-visa: payment-method mark in the passport payment step. Original = VISA trademark ->
neutral generic 'CARTE' wordmark, same blue, same box (960x312, transparent)."""
from lib import *
body = '''<g transform="translate(452 300) skewX(-12)"><text x="0" y="0" text-anchor="middle" font-family="Geist700"
 font-size="372" letter-spacing="-12" fill="#1434cb" textLength="965" lengthAdjust="spacingAndGlyphs">CARTE</text></g>'''
im = svg(body, 960, 312, scale=2).resize((960, 312), Image.LANCZOS)
print(im.getchannel('A').getbbox())
write('passport-visa', im)
