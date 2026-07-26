#!/usr/bin/env python3
"""Deterministic gate for strict generated blog articles."""
from __future__ import annotations

import argparse
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

WORD_RE = re.compile(r"\b[\w’'-]+\b", re.UNICODE)
SENTENCE_RE = re.compile(r"[.!?](?=(?:[\"']?\s)|[\"']?$)")
RESTRICTED_RE = re.compile(r"(?i)\b(?:pricing|prices?|rates?|tiers?)\b|/pricing")


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_article = False
        self.article_depth = 0
        self.skip_depth = 0
        self.text: list[str] = []
        self.narrative_depth = 0
        self.narrative_buffer: list[str] = []
        self.narratives: list[str] = []
        self.banner_slots: list[str] = []
        self.visual_types: list[str] = []
        self.blockquotes = 0
        self.links: list[str] = []
        self.source_depth = 0
        self.source_ol_depth = 0
        self.source_items = 0
        self.tables = 0
        self.svgs = 0
        self.h1: list[str] = []
        self.h1_depth = 0
        self.schemas: list[str] = []
        self.schema_depth = 0
        self.schema_buffer: list[str] = []
        self.article_attrs: dict[str, str] = {}
        self.revision_notes = 0

    @staticmethod
    def attrs_dict(attrs: list[tuple[str, str | None]]) -> dict[str, str]:
        return {key: value or "" for key, value in attrs}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = self.attrs_dict(attrs)
        if tag == "script" and data.get("type") == "application/ld+json":
            self.schema_depth += 1
            self.schema_buffer = []
        elif tag in {"script", "style", "noscript"}:
            self.skip_depth += 1

        if tag == "article" and not self.in_article:
            self.in_article = True
            self.article_depth = 1
            self.article_attrs = data
        elif self.in_article:
            self.article_depth += 1

        if not self.in_article or self.skip_depth:
            return
        if tag == "p" and data.get("data-narrative") == "true":
            self.narrative_depth = 1
            self.narrative_buffer = []
        elif self.narrative_depth:
            self.narrative_depth += 1
        if "data-article-banner" in data:
            self.banner_slots.append(data["data-article-banner"])
        if "data-visual-type" in data:
            self.visual_types.append(data["data-visual-type"])
        if "data-revision-note" in data:
            self.revision_notes += 1
        if tag == "blockquote":
            self.blockquotes += 1
        if tag == "a":
            self.links.append(data.get("href", ""))
        if tag == "table":
            self.tables += 1
        if tag == "svg":
            self.svgs += 1
        if tag == "h1":
            self.h1_depth = 1
        elif self.h1_depth:
            self.h1_depth += 1
        if "data-source-list" in data:
            self.source_depth = 1
        elif self.source_depth:
            self.source_depth += 1
        if self.source_depth and tag == "ol":
            self.source_ol_depth = 1
        elif self.source_ol_depth:
            self.source_ol_depth += 1
        if self.source_ol_depth and tag == "li":
            self.source_items += 1

    def handle_endtag(self, tag: str) -> None:
        if self.schema_depth and tag == "script":
            self.schemas.append("".join(self.schema_buffer))
            self.schema_depth -= 1
            self.schema_buffer = []
        elif self.skip_depth and tag in {"script", "style", "noscript"}:
            self.skip_depth -= 1

        if self.in_article and not self.skip_depth:
            if self.narrative_depth:
                self.narrative_depth -= 1
                if self.narrative_depth == 0:
                    self.narratives.append(" ".join(self.narrative_buffer))
                    self.narrative_buffer = []
            if self.h1_depth:
                self.h1_depth -= 1
            if self.source_ol_depth:
                self.source_ol_depth -= 1
            if self.source_depth:
                self.source_depth -= 1

        if self.in_article:
            self.article_depth -= 1
            if self.article_depth == 0:
                self.in_article = False

    def handle_data(self, data: str) -> None:
        if self.schema_depth:
            self.schema_buffer.append(data)
        if self.in_article and not self.skip_depth and data.strip():
            clean = " ".join(data.split())
            self.text.append(clean)
            if self.narrative_depth:
                self.narrative_buffer.append(clean)
            if self.h1_depth:
                self.h1.append(clean)


def flatten_schema_types(value: object) -> list[str]:
    found: list[str] = []
    if isinstance(value, dict):
        kind = value.get("@type")
        if isinstance(kind, str):
            found.append(kind)
        elif isinstance(kind, list):
            found.extend(str(item) for item in kind)
        for item in value.values():
            found.extend(flatten_schema_types(item))
    elif isinstance(value, list):
        for item in value:
            found.extend(flatten_schema_types(item))
    return found


def main() -> int:
    argp = argparse.ArgumentParser()
    argp.add_argument("html", type=Path)
    argp.add_argument("--slug", required=True)
    argp.add_argument("--build-root", type=Path)
    args = argp.parse_args()

    parser = AuditParser()
    parser.feed(args.html.read_text(encoding="utf-8"))
    article_text = " ".join(parser.text)
    words = len(WORD_RE.findall(article_text))
    failures: list[str] = []

    if not 1500 <= words <= 2000:
        failures.append(f"article words {words} outside 1500-2000")
    expected_h1 = "virtual assistant security checklist"
    h1 = " ".join(parser.h1).strip().lower()
    if not h1.startswith(expected_h1):
        failures.append(f"H1 does not start with {expected_h1!r}: {h1!r}")
    if parser.banner_slots != ["top", "middle", "bottom"]:
        failures.append(f"banner slots were {parser.banner_slots!r}")
    if parser.tables < 2:
        failures.append(f"expected at least 2 tables, found {parser.tables}")
    if parser.svgs != 2:
        failures.append(f"expected 2 SVGs, found {parser.svgs}")
    if set(parser.visual_types) != {"labeled-data-chart", "security-process-diagram"}:
        failures.append(f"visual types were {parser.visual_types!r}")
    if parser.blockquotes < 1:
        failures.append("expert blockquote missing")
    if parser.source_items < 4:
        failures.append(f"numbered sources found {parser.source_items}")
    if parser.revision_notes != 1:
        failures.append(f"revision notes found {parser.revision_notes}")

    bad_paragraphs: list[tuple[int, int, str]] = []
    for index, paragraph in enumerate(parser.narratives, start=1):
        count = len(SENTENCE_RE.findall(paragraph))
        if count not in {2, 3}:
            bad_paragraphs.append((index, count, paragraph[:120]))
    if bad_paragraphs:
        failures.append(f"narrative sentence failures: {bad_paragraphs}")

    internal = sorted({href for href in parser.links if href.startswith("/")})
    external = sorted({href for href in parser.links if urlparse(href).scheme in {"http", "https"}})
    if len(internal) < 3:
        failures.append(f"internal links found {len(internal)}")
    if len(external) < 4:
        failures.append(f"external links found {len(external)}")
    if RESTRICTED_RE.search(article_text) or any(RESTRICTED_RE.search(href) for href in parser.links):
        failures.append("restricted commercial term or path found inside article")

    if args.build_root:
        for href in internal:
            route = href.split("?", 1)[0].split("#", 1)[0].strip("/")
            candidates = [
                args.build_root / f"{route}.html",
                args.build_root / route / "index.html",
                args.build_root / route / "page.html",
            ]
            if route and not any(path.exists() for path in candidates):
                failures.append(f"internal route artifact missing: {href}")

    schema_types: list[str] = []
    for raw in parser.schemas:
        try:
            schema_types.extend(flatten_schema_types(json.loads(raw)))
        except json.JSONDecodeError as exc:
            failures.append(f"invalid JSON-LD: {exc}")
    for needed in ("BlogPosting", "FAQPage", "BreadcrumbList"):
        if needed not in schema_types:
            failures.append(f"schema type missing: {needed}")

    result = {
        "slug": args.slug,
        "article_words": words,
        "narrative_paragraphs": len(parser.narratives),
        "banner_slots": parser.banner_slots,
        "tables": parser.tables,
        "svgs": parser.svgs,
        "visual_types": parser.visual_types,
        "blockquotes": parser.blockquotes,
        "numbered_sources": parser.source_items,
        "internal_links": len(internal),
        "external_links": len(external),
        "schema_types": sorted(set(schema_types)),
        "restricted_scan": "clear" if not any("restricted" in item for item in failures) else "failed",
        "status": "PASS" if not failures else "FAIL",
        "failures": failures,
    }
    print(json.dumps(result, indent=2))
    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())
