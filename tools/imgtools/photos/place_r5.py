# Round 5 (iconic French scenes): write every variant of each base from its real Commons photo
# (photos/real/r5-*.jpg, licences in real/meta.json), then regenerate carousel backdrops + missing srcset sizes.
import subprocess, sys
D = '/Users/0104389S/Projects/hello-france/tools/imgtools/photos/'
PY = sys.executable
JOBS = [  # base, master, focus x,y, extra args
 ('new-business', 'r5-new-business', '0.5,0.5', []),
 ('address-change', 'r5-address-change', '0.5,0.4', []),
 ('child-passport', 'r5-child-passport', '0.6,0.5', []),
 ('military-service', 'r5-military-service', '0.5,0.5', []),
 ('child-future', 'r5-child-future', '0.5,0.5', []),
 ('social-security', 'r5-social-security', '0.36,0.5', []),
 ('national-park', 'r5-national-park', '0.5,0.5', []),
 ('veteran-care', 'r5-veteran-care', '0.5,0.5', []),
 ('name-change', 'r5-name-change', '0.75,0.5', []),
 ('medicare', 'r5-medicare', '0.5,0.5', ['--only', 'DqRXMPkA']),
 ('new-job', 'r5-new-job', '0.55,0.5', []),
 ('passport', 'r5-passport', '0.5,0.5', []),
 ('family', 'r5-family', '0.5,0.5', []),
 ('privacy', 'r5-privacy', '0.6,0.5', []),
 ('housing', 'r5-housing', '0.5,0.5', []),
 ('grandstaff', 'national-park', '0.5,0.5', []),  # round-3 real Verdon photo (already credited)
 # same photos, unhashed copies served from /images/... (separate inventory keys)
 ('images/home/features/passport', 'r5-passport', '0.5,0.5', []),
 ('images/home/features/privacy', 'r5-privacy', '0.6,0.5', []),
 ('images/home/manifesto/family', 'r5-family', '0.5,0.5', []),
 ('images/home/roadmap/demo/grandstaff', 'national-park', '0.5,0.5', []),
]
only = sys.argv[1:]
CAROUSEL = [j[0] for j in JOBS[:11]]
for base, m, f, extra in JOBS:
    if only and base not in only: continue
    subprocess.run([PY, D + 'place2.py', base, D + 'real/' + m + '.jpg', '--focus', f, '--q', '85'] + extra, check=True)
cb = [b for b in CAROUSEL if not only or b in only]
if cb:
    for s in ('backdrop.py', 'backdrop64.py', 'srcset_fill.py'):
        subprocess.run([PY, D + s] + cb, check=True)
