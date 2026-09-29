# re-blur carousel backdrop variants to match original blur strength
import re, json, numpy as np, sys
from PIL import Image, ImageFilter
R='/Users/0104389S/Projects/hello-france/'
t=open(R+'_mirror/index.html').read()
files=sorted(set(re.findall(r'/_astro/([\w.-]+\.webp) (?:64|128)w', ' '.join(re.findall(r'backdropSrcSet&quot;:\[0,&quot;([^&]*)&quot;', t)))))
bases=sys.argv[1:]
d=json.load(open(R+'tools/image-inventory.json'))
for f in files:
    b=f.split('.')[0]
    if bases and b not in bases: continue
    p='_astro/'+f
    import os
    if not os.path.exists(R+'_mirror/'+p): print('missing in mirror',f); continue
    o=Image.open(R+'_mirror/'+p).convert('RGB')
    big=max((x for x in d[b] if x[1]!='svg'), key=lambda x:int(x[1].split('x')[0]))
    B=Image.open(R+'_mirror/'+big[0]).convert('RGB')
    def cov(im):
        w,h=o.size; sc=max(w/im.width,h/im.height); r=im.resize((max(w,round(im.width*sc)),max(h,round(im.height*sc))),Image.LANCZOS)
        x=(r.width-w)//2; y=(r.height-h)//2; return r.crop((x,y,x+w,y+h))
    base=cov(B); best=None
    for rad in [x*0.5 for x in range(0,40)]:
        e=np.abs(np.asarray(base.filter(ImageFilter.GaussianBlur(rad)),float)-np.asarray(o,float)).mean()
        if best is None or e<best[0]: best=(e,rad)
    rad=best[1]*o.width/o.width
    mine=Image.open(R+'tools/overrides/'+p).convert('RGB')
    # rebuild from a fresh unblurred crop of the override's largest same-base variant to avoid double blur
    src=Image.open(R+'tools/overrides/'+big[0]).convert('RGB')
    out=cov(src).filter(ImageFilter.GaussianBlur(rad))
    out.save(R+'tools/overrides/'+p,'WEBP',quality=85,method=6)
    print(f, o.size, 'blur', rad, 'fit err', round(best[0],1))
