import json,sys,urllib.request,urllib.parse
UA={'User-Agent':'BonjourFranceLogoBot/1.0 (fan project; contact jean.claude.myai@gmail.com)'}
def get(url):
    return json.load(urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=30))
def search(q):
    u='https://www.wikidata.org/w/api.php?'+urllib.parse.urlencode(dict(action='wbsearchentities',search=q,language='fr',uselang='fr',format='json',limit=3))
    return get(u)['search']
def logos(qid):
    u='https://www.wikidata.org/w/api.php?'+urllib.parse.urlencode(dict(action='wbgetclaims',entity=qid,property='P154',format='json'))
    out=[]
    for c in get(u).get('claims',{}).get('P154',[]):
        v=c['mainsnak'].get('datavalue',{}).get('value')
        q=c.get('qualifiers',{})
        def qv(p):
            try: return q[p][0]['datavalue']['value']['time'][:11]
            except: return ''
        out.append((c['rank'],v,qv('P580'),qv('P582')))
    return out
if __name__=='__main__':
    for line in sys.stdin:
        line=line.strip()
        if not line: continue
        key,q=line.split('|',1)
        if q.startswith('Q'):
            res=[{'id':q,'label':'','description':''}]
        else: res=search(q)
        for r in res[:1 if q.startswith('Q') else 2]:
            print(f"{key}\t{r['id']}\t{r.get('label','')}\t{r.get('description','')[:60]}")
            for l in logos(r['id']): print('\t\t',l)
