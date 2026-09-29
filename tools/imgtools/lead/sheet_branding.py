import resvg_py,io,glob
from PIL import Image
O='/Users/0104389S/Projects/hello-france/tools/overrides/'
def sv(p,w): return Image.open(io.BytesIO(bytes(resvg_py.svg_to_bytes(svg_path=O+p,width=w)))).convert('RGBA')
im=Image.new('RGBA',(1400,1000),(200,205,215,255))
im.alpha_composite(Image.open(O+'images/social/america-og.png').convert('RGBA').resize((600,315)),(0,0))
im.alpha_composite(sv('favicon.svg',128),(620,0))
im.alpha_composite(Image.open(O+'favicon.ico').convert('RGBA').resize((96,96)),(760,0))
im.alpha_composite(sv('images/home/footer/gsa.svg',128),(870,0))
im.alpha_composite(sv('_astro/artwork.BCa8CIsq.svg',480),(900,150))
im.alpha_composite(sv(glob.glob(O+'_astro/fox-news*')[0].replace(O,''),64),(1300,0))
x=0
for p in ['images/press/logos/cnn.webp','images/press/logos/new-york-times.webp','images/press/logos/techcrunch.webp','images/press/logos/the-atlantic.webp','images/press/logos/wired.webp']:
  t=Image.open(O+p).convert('RGBA');t.thumbnail((260,200));im.alpha_composite(t,(x,420));x+=275
t=Image.open(O+'_astro/cms-logo.kbGr0XxF.webp').convert('RGBA');t.thumbnail((500,250));im.alpha_composite(t,(0,650))
t=Image.open(O+'_astro/webclip.cHzrx8dU.webp').convert('RGBA');im.alpha_composite(t,(520,650))
t=Image.open(O+'images/america-wordmark.webp').convert('RGBA');t.thumbnail((600,120));im.alpha_composite(t,(790,700))
im.save('/Users/0104389S/Projects/hello-france/compare/images-branding.png')
