import json,sys,urllib.request,urllib.parse
UA={'User-Agent':'BonjourFranceLogoBot/1.0 (fan project; contact jean.claude.myai@gmail.com)'}
def get(url): return json.load(urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=30))
for line in sys.stdin:
    line=line.strip()
    if not line: continue
    key,q=line.split('|',1)
    for site in ['commons.wikimedia.org','fr.wikipedia.org']:
        u=f'https://{site}/w/api.php?'+urllib.parse.urlencode(dict(action='query',list='search',srsearch=q,srnamespace=6,format='json',srlimit=8))
        try: r=[x['title'] for x in get(u)['query']['search']]
        except Exception as e: r=[str(e)]
        print(key,site[:2],' | '.join(r))
