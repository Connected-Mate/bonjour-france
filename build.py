#!/usr/bin/env python3
"""Assemble the static pages from src/pages + src/partials into the site root.

No dependencies. Run: python3 build.py
Each page starts with a front-matter comment:
<!--
title: ...
description: ...
options: dock vote footer
body_class: ...
scripts: home.js
-->
"""
import pathlib
import re
import time

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
SITE = "https://connected-mate.github.io/hello-france/"
VERSION = time.strftime("%Y%m%d%H%M")

HINT = '<div class="ask-hint" aria-hidden="true" data-hint><span></span></div>'


def partial(name):
    return (SRC / "partials" / f"{name}.html").read_text(encoding="utf-8")


def ask(id_, placeholder="", hint=False):
    return (
        partial("ask")
        .replace("{{id}}", id_)
        .replace("{{placeholder}}", placeholder)
        .replace("{{hint}}", HINT if hint else "")
    )


def parse(text):
    m = re.match(r"<!--\n(.*?)\n-->\n", text, re.S)
    if not m:
        raise SystemExit("missing front matter")
    meta = {}
    for line in m.group(1).splitlines():
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip()
    return meta, text[m.end():]


def build(page):
    meta, body = parse(page.read_text(encoding="utf-8"))
    out_name = page.name
    path = "" if out_name == "index.html" else out_name
    options = meta.get("options", "").split()

    body = body.replace("{{ASK_HERO}}", ask("q-hero", "", hint=True))
    body = body.replace("{{ASK_CHAT}}", ask("q-chat", "Posez votre question…"))

    parts = [partial("head"), f'<body class="{meta.get("body_class", "")}">', partial("header"), body]
    if "vote" in options:
        parts.append(partial("vote"))
    if "footer" in options:
        parts.append(partial("footer"))
    if "dock" in options:
        hidden = "true" if "dock-hidden" in options else "false"
        parts.append(f'<div class="ask-dock" data-dock data-hidden="{hidden}">{ask("q-dock", "Posez votre question…")}</div>')
    for s in (meta.get("scripts") or "common.js").split():
        parts.append(f'<script type="module" src="{{{{root}}}}assets/js/{s}"></script>')
    parts.append("</body>\n</html>\n")
    html = "\n".join(parts)

    html = (
        html.replace("{{title}}", meta["title"])
        .replace("{{description}}", meta["description"])
        .replace("{{extra_head}}", meta.get("extra_head", ""))
        .replace("{{site}}", SITE)
        .replace("{{path}}", path)
        .replace("{{root}}", "/hello-france/" if out_name == "404.html" else "./")
        .replace("{{version}}", VERSION)
    )
    # mark current page in navigation
    if path:
        html = html.replace(f'<a href="./{path}">', f'<a href="./{path}" aria-current="page">')
    leftover = re.findall(r"\{\{[^}]+\}\}", html)
    if leftover:
        raise SystemExit(f"{page.name}: unresolved placeholders {leftover}")
    (ROOT / out_name).write_text(html, encoding="utf-8")
    return out_name


if __name__ == "__main__":
    built = [build(p) for p in sorted((SRC / "pages").glob("*.html"))]
    print("built:", ", ".join(built))
