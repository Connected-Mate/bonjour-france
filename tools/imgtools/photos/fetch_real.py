#!/usr/bin/env python3
"""Round 3: download real, freely-licensed photos from Wikimedia Commons and record their licence metadata.

usage: fetch_real.py picks.tsv      (lines: key<TAB>File:Title.jpg ; key = master name, e.g. new-business)
Writes photos/real/<key>.<ext> (original file) and photos/real/meta.json {key: {...licence metadata...}}.
The licence is read from the file page's machine-readable metadata (Commons API extmetadata) and the raw
File: page HTML is also fetched to double-check the licence template is present on the page itself."""
import json, os, re, sys, time, html, subprocess, urllib.request, urllib.parse
D = os.path.dirname(os.path.abspath(__file__)) + '/real/'
UA = {'User-Agent': 'HelloFranceCredits/1.0 (non-commercial demo site)'}
def get(u, k=0):
    try:
        return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=120).read()
    except urllib.error.HTTPError as e:
        e.__traceback__ = None
        if e.code == 429 and k < 6: time.sleep(15 * (k + 1)); return get(u, k + 1)
        raise
def clean(s): return re.sub(r'\s+', ' ', re.sub('<[^>]+>', '', html.unescape(s or ''))).strip()
meta = json.load(open(D + 'meta.json')) if os.path.exists(D + 'meta.json') else {}
for line in open(sys.argv[1]):
    if not line.strip() or line.startswith('#'): continue
    key, title = line.rstrip('\n').split('\t')[:2]
    p = {'action': 'query', 'titles': title, 'prop': 'imageinfo', 'iiprop': 'url|size|extmetadata|mime', 'iiurlwidth': 2560, 'format': 'json'}
    pg = next(iter(json.loads(get('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(p)))['query']['pages'].values()))
    ii = pg['imageinfo'][0]; m = ii['extmetadata']
    ext = ii['url'].split('?')[0].rsplit('.', 1)[1].lower().replace('jpeg', 'jpg')
    dst = D + key + '.' + ext
    if not os.path.exists(dst) or meta.get(key, {}).get('file_title') != pg['title']:
        src = ii.get('thumburl') if ii['width'] > 2560 else ii['url']
        for k in range(8):  # curl: upload/thumb servers rate-limit hard; back off politely
            time.sleep(8 + 20 * k)
            r = subprocess.run(['curl', '-s', '-o', dst, '-w', '%{http_code}', '-A', UA['User-Agent'], src], capture_output=True, text=True)
            if r.stdout == '200': break
        else: raise SystemExit('download failed ' + src)
    page = get(ii['descriptionurl']).decode('utf8', 'replace')
    lic = clean(m.get('LicenseShortName', {}).get('value'))
    # confirm the licence on the File: page itself (licence template link or text)
    lurl = clean(m.get('LicenseUrl', {}).get('value'))
    onpage = bool((lurl and lurl.split('//')[-1].rstrip('/') in page) or re.search(re.escape(lic), page, re.I)
                  or (lic.lower().startswith('public domain') and re.search(r'public domain', page, re.I)))
    meta[key] = dict(file_title=pg['title'], title=clean(m.get('ObjectName', {}).get('value')) or pg['title'][5:],
                     author=clean(m.get('Artist', {}).get('value')), credit=clean(m.get('Credit', {}).get('value'))[:300],
                     licence=lic, licence_url=lurl or ('https://creativecommons.org/publicdomain/zero/1.0/' if 'CC0' in lic else ''),
                     source_url=ii['descriptionurl'], original_url=ii['url'], size=f"{ii['width']}x{ii['height']}",
                     local=os.path.basename(dst), licence_on_page=onpage, attribution_required=clean(m.get('AttributionRequired', {}).get('value')))
    print(key, meta[key]['size'], lic, '| on page:', onpage, '|', meta[key]['author'][:60])
    json.dump(meta, open(D + 'meta.json', 'w'), indent=1, ensure_ascii=False)
