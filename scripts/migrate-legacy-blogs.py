#!/usr/bin/env python3
"""
migrate-legacy-blogs.py
-----------------------
Bulk-migrates legacy EvaWarm WordPress/Elementor blog posts into the
Decap CMS JSON schema used by content/blog/*.json.

Usage
-----
# Dry-run: process only the first N URLs (default 2)
python scripts/migrate-legacy-blogs.py --dry-run --limit 2

# Full run (all 23 URLs)
python scripts/migrate-legacy-blogs.py

Output (never touches content/blog or public/uploads directly)
-------
migration-output/content/blog/<slug>.json
migration-output/public/uploads/<image-files>
migration-output/migration-report.json

Schema reference: content/blog/*.json
  {
    "slug":         string,
    "title":        string,
    "excerpt":      string,
    "category":     string,
    "date":         ISO-8601 string,
    "readTime":     string,          e.g. "8 min read"
    "image":        string,          e.g. "/uploads/filename.webp"  (optional)
    "featured":     bool,            (optional)
    "introduction": string,
    "sections": [
      {
        "id":         string,        url-safe slug of title
        "title":      string,
        "paragraphs": [string, ...]
      }
    ],
    "takeaway":    string,           (optional)
    "conclusion":  string            (optional)
  }
"""

import argparse
import hashlib
import html
import io
import json
import os
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# Force UTF-8 output on Windows consoles
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
if sys.stderr.encoding and sys.stderr.encoding.lower() != "utf-8":
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# ---------------------------------------------------------------------------
# Dependency check – only stdlib + beautifulsoup4 / lxml (optional fallback)
# ---------------------------------------------------------------------------
try:
    from bs4 import BeautifulSoup, NavigableString, Tag
except ImportError:
    print(
        "ERROR: beautifulsoup4 is required.\n"
        "  pip install beautifulsoup4 lxml\n"
        "or\n"
        "  pip install beautifulsoup4",
        file=sys.stderr,
    )
    sys.exit(1)

# ---------------------------------------------------------------------------
# Paths (all relative to repo root, two levels above this script)
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent

URL_FILE = REPO_ROOT / "legacy-blog-urls.txt"
EXISTING_BLOG_DIR = REPO_ROOT / "content" / "blog"
EXISTING_UPLOADS_DIR = REPO_ROOT / "public" / "uploads"

OUTPUT_ROOT = REPO_ROOT / "migration-output"
OUTPUT_BLOG_DIR = OUTPUT_ROOT / "content" / "blog"
OUTPUT_UPLOADS_DIR = OUTPUT_ROOT / "public" / "uploads"
REPORT_FILE = OUTPUT_ROOT / "migration-report.json"

# ---------------------------------------------------------------------------
# Category keyword map (best-effort detection from URL slug / article sections)
# ---------------------------------------------------------------------------
CATEGORY_KEYWORDS: list[tuple[list[str], str]] = [
    (["email-warmup", "warm-up", "warmup", "warm_up"], "Email Warmup"),
    (["deliverability", "deliver"], "Email Deliverability"),
    (["cold-email", "cold_email"], "Cold Email"),
    (["email-marketing", "email_marketing"], "Email Marketing"),
    (["email-finder", "email_finder", "email-verification", "email_verification"], "Email Verification"),
    (["spam", "open-rate", "open_rate"], "Email Deliverability"),
    (["sender-reputation", "sender_reputation", "domain-reputation"], "Email Deliverability"),
    (["outreach", "outbound"], "Cold Email"),
    (["automation"], "Cold Email"),
    (["small-business", "ecommerce"], "Email Marketing"),
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(text: str) -> str:
    """Convert arbitrary text into a URL-safe slug."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-{2,}", "-", text)
    return text.strip("-")


def html_to_plain(html_fragment: str) -> str:
    """Strip HTML tags and decode entities from a fragment, returning plain text."""
    soup = BeautifulSoup(html_fragment, "html.parser")
    return html.unescape(soup.get_text(separator=" ", strip=True))


def estimate_read_time(text: str) -> str:
    """Estimate reading time at 200 wpm and return e.g. '8 min read'."""
    words = len(text.split())
    minutes = max(1, round(words / 200))
    return f"{minutes} min read"


def detect_category(slug: str, sections: list[dict]) -> str:
    """Best-effort category detection from slug + section titles."""
    combined = (slug + " " + " ".join(s.get("title", "") for s in sections)).lower()
    for keywords, category in CATEGORY_KEYWORDS:
        if any(kw in combined for kw in keywords):
            return category
    return "Email Deliverability"  # default


def safe_filename(url: str) -> str:
    """
    Derive a filesystem-safe filename from a URL.
    Preserves the original basename, lowercases it, replaces spaces/special chars.
    Appends a 6-char hash of the full URL to avoid collisions.
    """
    parsed = urllib.parse.urlparse(url)
    basename = parsed.path.split("/")[-1] or "image"
    # Keep extension
    name, _, ext = basename.rpartition(".")
    if not name:
        name, ext = basename, "jpg"
    safe_name = re.sub(r"[^a-z0-9._-]", "-", name.lower())
    safe_name = re.sub(r"-{2,}", "-", safe_name).strip("-")
    url_hash = hashlib.md5(url.encode()).hexdigest()[:6]
    return f"{safe_name}-{url_hash}.{ext.lower()}"


def fetch_url(url: str, retries: int = 3, delay: float = 2.0) -> str:
    """Fetch a URL and return the response body as a string."""
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    }
    req = urllib.request.Request(url, headers=headers)
    last_error: Exception | None = None
    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as exc:
            last_error = exc
            print(f"    [WARN] Attempt {attempt}/{retries} failed for {url}: {exc}")
            if attempt < retries:
                time.sleep(delay)
    raise RuntimeError(f"Failed to fetch {url} after {retries} attempts: {last_error}")


def download_image(img_url: str, dest_dir: Path, warnings: list[str]) -> str | None:
    """
    Download an image to dest_dir. Returns the local /uploads/<filename> path,
    or None on failure. Skips if already downloaded.
    """
    if not img_url or not img_url.startswith("http"):
        return None
    filename = safe_filename(img_url)
    dest_path = dest_dir / filename
    if dest_path.exists():
        return f"/uploads/{filename}"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0 Safari/537.36"
        ),
    }
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as resp:
            dest_path.write_bytes(resp.read())
        return f"/uploads/{filename}"
    except Exception as exc:
        warnings.append(f"Image download failed [{img_url}]: {exc}")
        return None


# ---------------------------------------------------------------------------
# Structured-data / JSON-LD extraction helpers
# ---------------------------------------------------------------------------

def extract_jsonld_data(soup: BeautifulSoup) -> dict:
    """
    Parse the Yoast JSON-LD graph to extract headline, datePublished,
    thumbnailUrl, description, articleSection.
    """
    result: dict = {}
    for script in soup.find_all("script", {"type": "application/ld+json"}):
        try:
            data = json.loads(script.string or "")
        except Exception:
            continue
        graph = data.get("@graph", []) if isinstance(data, dict) else []
        for node in graph:
            if not isinstance(node, dict):
                continue
            node_type = node.get("@type", "")
            if node_type == "Article":
                result.setdefault("headline", node.get("headline", ""))
                result.setdefault("datePublished", node.get("datePublished", ""))
                result.setdefault("thumbnailUrl", node.get("thumbnailUrl", ""))
                sections = node.get("articleSection", [])
                if isinstance(sections, list) and sections:
                    result.setdefault("articleSection", sections)
            elif node_type == "WebPage":
                result.setdefault("description", node.get("description", ""))
                if not result.get("datePublished"):
                    result["datePublished"] = node.get("datePublished", "")
            elif node_type == "ImageObject":
                if "primaryimage" in str(node.get("@id", "")):
                    result.setdefault("thumbnailUrl", node.get("url", ""))
    return result


def extract_og_data(soup: BeautifulSoup) -> dict:
    """Extract Open Graph / meta fallback data."""
    result: dict = {}
    for meta in soup.find_all("meta"):
        prop = meta.get("property", "") or meta.get("name", "")
        content = meta.get("content", "")
        if prop == "og:title":
            result["og_title"] = content
        elif prop == "og:description":
            result["og_description"] = content
        elif prop == "og:image":
            result.setdefault("og_image", content)
        elif prop == "article:published_time":
            result["published_time"] = content
        elif prop == "twitter:data2":  # "Est. reading time"
            result["twitter_read_time"] = content
        elif meta.get("name") == "description":
            result.setdefault("meta_description", content)
    return result


def normalize_date(raw: str) -> str:
    """Convert any ISO-8601-ish date to 'YYYY-MM-DDT00:00:00.000Z'."""
    if not raw:
        return datetime.now(timezone.utc).strftime("%Y-%m-%dT00:00:00.000Z")
    # Accept e.g. "2026-09-02T13:17:04+00:00"
    for fmt in (
        "%Y-%m-%dT%H:%M:%S+00:00",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%d",
    ):
        try:
            dt = datetime.strptime(raw[:19], fmt[:len(raw[:19])])
            return dt.strftime("%Y-%m-%dT00:00:00.000Z")
        except ValueError:
            continue
    # fallback – just strip time zone suffix
    m = re.match(r"(\d{4}-\d{2}-\d{2})", raw)
    if m:
        return f"{m.group(1)}T00:00:00.000Z"
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT00:00:00.000Z")


def twitter_read_time_to_str(raw: str) -> str | None:
    """Convert '11 minutes' → '11 min read'."""
    m = re.search(r"(\d+)\s+minute", raw or "", re.IGNORECASE)
    if m:
        return f"{m.group(1)} min read"
    return None


# ---------------------------------------------------------------------------
# Core article content extraction
# ---------------------------------------------------------------------------

def get_article_html(soup: BeautifulSoup) -> str:
    """
    Locate the main article content HTML in the Elementor page.
    Priority order:
    1. elementor-widget-theme-post-content  → inner elementor-widget-text-editor(s)
    2. Any .elementor-widget-text-editor inside .elementor-5\d+ (post-specific CSS)
    3. .entry-content
    4. article tag
    """
    # 1. Elementor post-content widget (wraps the WP post blocks)
    post_content_widget = soup.find(
        "div",
        attrs={"data-widget_type": "theme-post-content.default"},
    )
    if post_content_widget:
        # Sub-case A: newer posts wrap content in text-editor.default child widgets
        editors = post_content_widget.find_all(
            "div",
            attrs={"data-widget_type": "text-editor.default"},
        )
        if editors:
            combined = ""
            for ed in editors:
                container = ed.find("div", class_="elementor-widget-container")
                if container:
                    combined += str(container)
            return combined

        # Sub-case B: older Gutenberg posts place wp-block-* markup directly
        # inside the elementor-widget-container of theme-post-content
        direct_container = post_content_widget.find(
            "div", class_="elementor-widget-container"
        )
        if direct_container:
            # Verify it has actual block content (not just whitespace)
            inner_text = direct_container.get_text(strip=True)
            if inner_text:
                return str(direct_container)

    # 2. Fallback: any text-editor widget on the page
    editors = soup.find_all(
        "div",
        attrs={"data-widget_type": "text-editor.default"},
    )
    if editors:
        combined = ""
        for ed in editors:
            container = ed.find("div", class_="elementor-widget-container")
            if container:
                combined += str(container)
        return combined

    # 3. Standard WordPress entry-content
    entry = soup.find(class_="entry-content")
    if entry:
        return str(entry)

    # 4. article tag
    article = soup.find("article")
    if article:
        return str(article)

    return ""


def parse_article_content(article_html: str, slug: str) -> dict:
    """
    Parse raw article HTML into structured fields:
      introduction, sections, takeaway, conclusion

    Strategy
    --------
    - Walk all top-level block elements (p, h1..h6, ul, ol, table, blockquote).
    - Collect paragraphs before the first heading → introduction.
    - Each heading starts a new section; subsequent paragraphs belong to it.
    - Look for "takeaway" / "key takeaways" / "conclusion" headings as special
      sections and promote their content to top-level fields.
    - Lists and table rows are flattened into paragraph strings.
    - Inline HTML (links, bold, etc.) is stripped to plain text.
    """
    soup = BeautifulSoup(article_html, "html.parser")

    # Flatten the soup into a sequence of (tag_name, plain_text) pairs
    blocks: list[tuple[str, str]] = []

    HEADING_TAGS = {"h1", "h2", "h3", "h4", "h5", "h6"}
    BLOCK_TAGS = HEADING_TAGS | {"p", "ul", "ol", "blockquote", "table"}

    # Elements that should be silently skipped (no text content wanted)
    SKIP_TAGS = {"figure", "img", "svg", "style", "script", "noscript", "iframe",
                 "form", "button", "input", "select", "textarea"}

    def collect_text(el: Tag) -> str:
        return html.unescape(el.get_text(separator=" ", strip=True))

    def is_spacer(el) -> bool:
        """Detect Gutenberg wp-block-spacer divs (aria-hidden spacers)."""
        if el.name != "div":
            return False
        classes = el.get("class", [])
        aria = el.get("aria-hidden", "")
        style = el.get("style", "")
        if "wp-block-spacer" in classes:
            return True
        if aria == "true" and ("height" in style or "width" in style):
            return True
        return False

    def process_element(el) -> None:
        if isinstance(el, NavigableString):
            txt = str(el).strip()
            # Skip bare nbsp / whitespace-only strings
            if txt and txt != "\xa0":
                blocks.append(("p", txt))
            return
        name = el.name if el.name else ""
        # Hard skip for non-text nodes
        if name in SKIP_TAGS:
            return
        # Skip Gutenberg spacer divs
        if is_spacer(el):
            return
        if name in HEADING_TAGS:
            txt = collect_text(el)
            if txt:
                blocks.append((name, txt))
        elif name == "p":
            txt = collect_text(el)
            # Skip &nbsp;-only paragraphs
            if txt and txt != "\xa0" and txt.strip():
                blocks.append(("p", txt))
        elif name in ("ul", "ol"):
            # Each <li> becomes its own paragraph string
            for li in el.find_all("li", recursive=False):
                txt = collect_text(li)
                if txt:
                    blocks.append(("p", txt))
        elif name == "table":
            # Flatten table rows into paragraph strings
            for row in el.find_all("tr"):
                cells = [collect_text(td) for td in row.find_all(["td", "th"])]
                txt = " | ".join(c for c in cells if c)
                if txt:
                    blocks.append(("p", txt))
        elif name == "blockquote":
            txt = collect_text(el)
            if txt:
                blocks.append(("p", txt))
        else:
            # Recurse into unknown container elements (div, section, article, etc.)
            for child in el.children:
                process_element(child)

    for top_el in soup.children:
        process_element(top_el)

    # ------------------------------------------------------------------
    # Now structure blocks into introduction / sections / special fields
    # ------------------------------------------------------------------
    introduction_parts: list[str] = []
    raw_sections: list[dict] = []  # {title, paragraphs: [str]}
    current_section: dict | None = None

    TAKEAWAY_RE = re.compile(r"\btakeaway\b", re.IGNORECASE)
    CONCLUSION_RE = re.compile(r"\bconclusion\b", re.IGNORECASE)
    # Patterns that mark "boilerplate" headings we can skip
    SKIP_HEADING_RE = re.compile(
        r"(subscribe|newsletter|frequently asked|faq|ready to|explore|contact|"
        r"get updates|learn from|related post|written by|tags|categories)",
        re.IGNORECASE,
    )
    # Patterns for "key takeaways" style headings used as intro bullets
    KEY_TAKEAWAYS_RE = re.compile(r"key\s+takeaway", re.IGNORECASE)

    first_heading_seen = False

    for tag, text in blocks:
        if not text.strip():
            continue

        is_heading = tag in HEADING_TAGS

        if is_heading:
            # Skip boilerplate headings (newsletter subscribe, FAQ wrapper, etc.)
            if SKIP_HEADING_RE.search(text):
                current_section = None  # detach so following paragraphs are dropped
                continue

            first_heading_seen = True

            if KEY_TAKEAWAYS_RE.search(text):
                # Treat "Key Takeaways" as a normal section (its bullets will be
                # collected as paragraphs in the section)
                current_section = {"title": text, "paragraphs": []}
                raw_sections.append(current_section)
                continue

            if TAKEAWAY_RE.search(text):
                current_section = {"title": "__takeaway__", "paragraphs": []}
                raw_sections.append(current_section)
                continue

            if CONCLUSION_RE.search(text):
                current_section = {"title": "__conclusion__", "paragraphs": []}
                raw_sections.append(current_section)
                continue

            current_section = {"title": text, "paragraphs": []}
            raw_sections.append(current_section)

        else:
            # paragraph / list item
            if not first_heading_seen:
                introduction_parts.append(text)
            elif current_section is not None:
                current_section["paragraphs"].append(text)
            # else: orphan paragraph after boilerplate heading – drop it

    # ------------------------------------------------------------------
    # Extract takeaway / conclusion from raw_sections
    # ------------------------------------------------------------------
    takeaway = ""
    conclusion = ""
    normal_sections: list[dict] = []

    for sec in raw_sections:
        if sec["title"] == "__takeaway__":
            takeaway = " ".join(sec["paragraphs"])
        elif sec["title"] == "__conclusion__":
            conclusion = " ".join(sec["paragraphs"])
        else:
            # Drop sections with no paragraphs (pure heading, no body)
            if sec["paragraphs"]:
                normal_sections.append(sec)

    # ------------------------------------------------------------------
    # Build final sections list with IDs
    # ------------------------------------------------------------------
    used_ids: set[str] = set()
    sections: list[dict] = []
    for sec in normal_sections:
        base_id = slugify(sec["title"])[:60] or "section"
        sec_id = base_id
        counter = 2
        while sec_id in used_ids:
            sec_id = f"{base_id}-{counter}"
            counter += 1
        used_ids.add(sec_id)
        sections.append(
            {
                "id": sec_id,
                "title": sec["title"],
                "paragraphs": sec["paragraphs"],
            }
        )

    introduction = " ".join(introduction_parts).strip()

    return {
        "introduction": introduction,
        "sections": sections,
        "takeaway": takeaway,
        "conclusion": conclusion,
    }


# ---------------------------------------------------------------------------
# Per-article extractor
# ---------------------------------------------------------------------------

def extract_article(url: str, dry_run: bool, warnings: list[str]) -> dict:
    """
    Fetch a URL, extract all fields, download hero image.
    Returns a dict matching the blog JSON schema, plus '_meta' for reporting.
    """
    slug = url.rstrip("/").split("/")[-1]

    print(f"  Fetching: {url}")
    raw_html = fetch_url(url)

    soup = BeautifulSoup(raw_html, "html.parser")

    # ---- Structured-data extraction ----
    ld = extract_jsonld_data(soup)
    og = extract_og_data(soup)

    # ---- Title ----
    title = (
        ld.get("headline")
        or og.get("og_title")
        or (soup.title.string.strip() if soup.title else "")
        or slug
    )
    title = html_to_plain(title)

    # ---- Excerpt ----
    excerpt = (
        og.get("meta_description")
        or og.get("og_description")
        or ld.get("description")
        or ""
    )
    excerpt = html_to_plain(excerpt)

    # ---- Date ----
    raw_date = (
        ld.get("datePublished")
        or og.get("published_time")
        or ""
    )
    date = normalize_date(raw_date)

    # ---- Hero image ----
    hero_url = (
        ld.get("thumbnailUrl")
        or og.get("og_image")
        or ""
    )
    image_local: str | None = None
    if hero_url:
        if not dry_run:
            image_local = download_image(hero_url, OUTPUT_UPLOADS_DIR, warnings)
        else:
            # In dry-run still download so we can report
            image_local = download_image(hero_url, OUTPUT_UPLOADS_DIR, warnings)

    # ---- Article body ----
    article_html = get_article_html(soup)
    if not article_html:
        warnings.append(f"[{slug}] Could not locate article body HTML.")

    content = parse_article_content(article_html, slug)

    # ---- Category ----
    ld_sections = ld.get("articleSection", [])
    if ld_sections:
        # Map WordPress categories to our schema categories
        category = detect_category(
            " ".join(ld_sections).lower().replace(" ", "-"),
            content["sections"],
        )
    else:
        category = detect_category(slug, content["sections"])

    # ---- Read time ----
    # Prefer Twitter meta "Est. reading time" if available
    twitter_rt = twitter_read_time_to_str(og.get("twitter_read_time", ""))
    if twitter_rt:
        read_time = twitter_rt
    else:
        all_text = (
            content["introduction"]
            + " ".join(
                p
                for s in content["sections"]
                for p in s["paragraphs"]
            )
            + content["takeaway"]
            + content["conclusion"]
        )
        read_time = estimate_read_time(all_text)

    # ---- Build output record ----
    record: dict = {
        "slug": slug,
        "title": title,
        "excerpt": excerpt,
        "category": category,
        "date": date,
        "readTime": read_time,
    }
    if image_local:
        record["image"] = image_local

    record["introduction"] = content["introduction"]
    record["sections"] = content["sections"]

    if content["takeaway"]:
        record["takeaway"] = content["takeaway"]
    if content["conclusion"]:
        record["conclusion"] = content["conclusion"]

    # ---- Meta for report ----
    record["_meta"] = {
        "source_url": url,
        "hero_image_url": hero_url,
        "hero_image_local": image_local,
        "num_sections": len(content["sections"]),
        "num_paragraphs": sum(len(s["paragraphs"]) for s in content["sections"]),
        "warnings": list(warnings),
    }

    return record


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Migrate legacy EvaWarm blog posts to Decap CMS JSON."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        default=False,
        help="Process only --limit URLs (default: 2). Does NOT copy to content/blog.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=2,
        help="Number of URLs to process (only used with --dry-run). Default: 2.",
    )
    parser.add_argument(
        "--url-file",
        type=Path,
        default=URL_FILE,
        help=f"Path to URL list file. Default: {URL_FILE}",
    )
    args = parser.parse_args()

    # ------------------------------------------------------------------
    # Load URLs
    # ------------------------------------------------------------------
    if not args.url_file.exists():
        print(f"ERROR: URL file not found: {args.url_file}", file=sys.stderr)
        sys.exit(1)

    urls = [
        line.strip()
        for line in args.url_file.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.startswith("#")
    ]
    if not urls:
        print("ERROR: No URLs found in URL file.", file=sys.stderr)
        sys.exit(1)

    if args.dry_run:
        urls = urls[: args.limit]
        print(
            f"\n{'='*60}\n"
            f"DRY RUN - processing first {len(urls)} URL(s)\n"
            f"{'='*60}\n"
        )
    else:
        print(f"\nProcessing all {len(urls)} URLs.\n")

    # ------------------------------------------------------------------
    # Load existing slugs to detect duplicates
    # ------------------------------------------------------------------
    existing_slugs: set[str] = set()
    if EXISTING_BLOG_DIR.exists():
        for jf in EXISTING_BLOG_DIR.glob("*.json"):
            try:
                data = json.loads(jf.read_text(encoding="utf-8"))
                s = data.get("slug") or jf.stem
                existing_slugs.add(s)
            except Exception:
                existing_slugs.add(jf.stem)

    # Also check migration output dir (already-processed in this run)
    if OUTPUT_BLOG_DIR.exists():
        for jf in OUTPUT_BLOG_DIR.glob("*.json"):
            existing_slugs.add(jf.stem)

    # ------------------------------------------------------------------
    # Create output directories
    # ------------------------------------------------------------------
    OUTPUT_BLOG_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

    # ------------------------------------------------------------------
    # Process each URL
    # ------------------------------------------------------------------
    report: dict = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "dry_run": args.dry_run,
        "total_urls": len(urls),
        "processed": [],
        "skipped": [],
        "errors": [],
    }

    for url in urls:
        slug = url.rstrip("/").split("/")[-1]
        print(f"\n[{urls.index(url)+1}/{len(urls)}] {slug}")

        # Check for duplicate
        if slug in existing_slugs:
            msg = f"SKIPPED — slug '{slug}' already exists in content/blog or migration output."
            print(f"  {msg}")
            report["skipped"].append({"slug": slug, "url": url, "reason": msg})
            continue

        warnings: list[str] = []
        try:
            record = extract_article(url, dry_run=args.dry_run, warnings=warnings)
        except Exception as exc:
            err = f"ERROR extracting {url}: {exc}"
            print(f"  {err}")
            report["errors"].append({"slug": slug, "url": url, "error": str(exc)})
            continue

        # Strip _meta before writing JSON
        meta = record.pop("_meta", {})
        meta["slug"] = slug

        # Write JSON
        out_json = OUTPUT_BLOG_DIR / f"{slug}.json"
        out_json.write_text(
            json.dumps(record, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        existing_slugs.add(slug)

        # Report entry
        entry = {
            "slug": slug,
            "url": url,
            "title": record.get("title", ""),
            "category": record.get("category", ""),
            "date": record.get("date", ""),
            "readTime": record.get("readTime", ""),
            "hero_image_url": meta.get("hero_image_url", ""),
            "hero_image_local": meta.get("hero_image_local", ""),
            "num_sections": meta.get("num_sections", 0),
            "num_paragraphs": meta.get("num_paragraphs", 0),
            "warnings": warnings,
            "output_file": str(out_json.relative_to(REPO_ROOT)),
        }
        report["processed"].append(entry)

        # Summary to console
        print(f"  [OK] title       : {record.get('title', '')}")
        print(f"       category    : {record.get('category', '')}")
        print(f"       date        : {record.get('date', '')}")
        print(f"       readTime    : {record.get('readTime', '')}")
        print(f"       hero image  : {meta.get('hero_image_local') or '(none)'}")
        print(f"       sections    : {meta.get('num_sections', 0)}")
        print(f"       paragraphs  : {meta.get('num_paragraphs', 0)}")
        if warnings:
            for w in warnings:
                print(f"       [WARN] {w}")

        # Small polite delay between requests
        time.sleep(1.5)

    # ------------------------------------------------------------------
    # Write report
    # ------------------------------------------------------------------
    REPORT_FILE.write_text(
        json.dumps(report, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    # ------------------------------------------------------------------
    # Final summary
    # ------------------------------------------------------------------
    print(
        f"\n{'='*60}\n"
        f"DONE\n"
        f"  Processed : {len(report['processed'])}\n"
        f"  Skipped   : {len(report['skipped'])}\n"
        f"  Errors    : {len(report['errors'])}\n"
        f"  Output    : {OUTPUT_ROOT}\n"
        f"  Report    : {REPORT_FILE}\n"
        f"{'='*60}\n"
    )

    if args.dry_run:
        print(
            "DRY RUN complete — files written to migration-output/\n"
            "Review them, then run without --dry-run to process all 23 URLs.\n"
            "When satisfied, manually copy:\n"
            "  migration-output/content/blog/*.json  →  content/blog/\n"
            "  migration-output/public/uploads/*     →  public/uploads/\n"
        )


if __name__ == "__main__":
    main()
