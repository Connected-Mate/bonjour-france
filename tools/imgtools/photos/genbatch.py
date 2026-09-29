import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
G = os.path.dirname(os.path.abspath(__file__)) + '/gen'
jobs = json.load(open(sys.argv[1]))
STYLE = json.load(open(os.path.dirname(os.path.abspath(__file__)) + '/style.json'))
def run(j):
    out = f"{G}/{j['name']}.png"
    if os.path.exists(out): return f"skip {j['name']}"
    p = j['prompt'].replace('{FILM}', STYLE['film']).replace('{EXCL}', STYLE['excl'])
    cmd = ['node', 'src/gen.js', '-q', 'high', '-s', j.get('size', '1536x1024'), '-o', out, '-p', p]
    for r in j.get('refs', []): cmd += ['--ref', r]
    for t in range(3):
        r = subprocess.run(cmd, cwd=os.path.expanduser('~/Documents/gptimage'), capture_output=True, text=True, timeout=400)
        if r.returncode == 0 and os.path.exists(out): return f"ok {j['name']}"
        err = (r.stderr or r.stdout)[-300:]
    return f"FAIL {j['name']}: {err}"
with ThreadPoolExecutor(int(os.environ.get('P', 4))) as ex:
    for m in ex.map(run, jobs): print(m, flush=True)
