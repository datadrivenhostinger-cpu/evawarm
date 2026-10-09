import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from 'lucide-react'
import { blogPosts, formatBlogDate } from '@/data/blog'
import PageFAQ from '@/components/FAQ'

interface BlogPostPageProps {
  slug: string
  navigate: (page: string) => void
}

// ── Paragraph-level smart renderer ────────────────────────────────────────────
// Receives the raw paragraphs[] array for one section and returns an array of
// React nodes, tables, ordered/unordered lists, or plain paragraphs, without
// ever mutating source content.

type RenderedBlock =
  | { kind: 'p';    text: string }
  | { kind: 'ul';   items: string[] }
  | { kind: 'ol';   items: string[] }
  | { kind: 'table'; rows: string[][] }
  | { kind: 'url';  href: string; text: string }

/** Detect a pipe-separated row: at least one ` | ` separator and 2+ cells. */
function isPipeRow(line: string): boolean {
  return line.includes('|') && line.split('|').length >= 3
}

/** Return true when every cell is `---` or `===` (markdown separator row). */
function isSeparatorRow(line: string): boolean {
  return line.split('|').every((cell) => /^[-= ]+$/.test(cell.trim()))
}

/** Parse a pipe-row into trimmed cell strings. */
function parsePipeRow(line: string): string[] {
  return line.split('|').map((c) => c.trim()).filter((c, i, a) =>
    // strip empty leading/trailing cells from `| col1 | col2 |` syntax
    !(c === '' && (i === 0 || i === a.length - 1))
  )
}

/** Is this paragraph a bare URL? */
function isUrl(text: string): boolean {
  return /^https?:\/\/\S+$/.test(text.trim())
}

/** Is this paragraph a short bullet-like item (starts with `-`, `*`, `•`)? */
function isBulletItem(text: string): boolean {
  return /^[-*•]\s+/.test(text.trim())
}

/** Is this paragraph a numbered item: `1.`, `1)`, `(1)` etc? */
function isNumberedItem(text: string): boolean {
  return /^(\d+[.)]\s+|\(\d+\)\s+)/.test(text.trim())
}

/** Strip the leading bullet marker from a paragraph. */
function stripBullet(text: string): string {
  return text.trim().replace(/^[-*•]\s+/, '')
}

/** Strip the leading number marker from a paragraph. */
function stripNumber(text: string): string {
  return text.trim().replace(/^(\d+[.)]\s+|\(\d+\)\s+)/, '')
}

function renderParagraphs(paragraphs: string[]): RenderedBlock[] {
  const blocks: RenderedBlock[] = []
  let i = 0
  while (i < paragraphs.length) {
    const p = paragraphs[i].trim()
    if (!p) { i++; continue }

    // ── 1. Pipe table: consume contiguous pipe rows ────────────────────────
    if (isPipeRow(p)) {
      const tableRows: string[][] = []
      while (i < paragraphs.length && isPipeRow(paragraphs[i].trim())) {
        const row = paragraphs[i].trim()
        if (!isSeparatorRow(row)) {
          tableRows.push(parsePipeRow(row))
        }
        i++
      }
      if (tableRows.length > 0) blocks.push({ kind: 'table', rows: tableRows })
      continue
    }

    // ── 2. Bullet list: consume contiguous bullet items ────────────────────
    if (isBulletItem(p)) {
      const items: string[] = []
      while (i < paragraphs.length && isBulletItem(paragraphs[i].trim())) {
        items.push(stripBullet(paragraphs[i].trim()))
        i++
      }
      blocks.push({ kind: 'ul', items })
      continue
    }

    // ── 3. Numbered list: consume contiguous numbered items ────────────────
    if (isNumberedItem(p)) {
      const items: string[] = []
      while (i < paragraphs.length && isNumberedItem(paragraphs[i].trim())) {
        items.push(stripNumber(paragraphs[i].trim()))
        i++
      }
      blocks.push({ kind: 'ol', items })
      continue
    }

    // ── 4. Bare URL ────────────────────────────────────────────────────────
    if (isUrl(p)) {
      const url = p.trim()
      blocks.push({ kind: 'url', href: url, text: url })
      i++
      continue
    }

    // ── 5. Plain paragraph ─────────────────────────────────────────────────
    blocks.push({ kind: 'p', text: p })
    i++
  }
  return blocks
}

// ── Table styles ─────────────────────────────────────────────────────────────
const TABLE_WRAPPER: React.CSSProperties = {
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch',
  margin: '24px 0',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.1)',
}
const TABLE: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  color: '#b9c6e0',
  minWidth: 480,
}
const TH: React.CSSProperties = {
  background: 'rgba(6,182,212,0.10)',
  color: '#22d3ee',
  fontFamily: 'Sora, sans-serif',
  fontWeight: 700,
  fontSize: 13,
  padding: '11px 14px',
  textAlign: 'left',
  borderBottom: '1px solid rgba(6,182,212,0.18)',
  whiteSpace: 'nowrap',
}
const TD: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  verticalAlign: 'top',
  lineHeight: 1.6,
}
const TD_ALT: React.CSSProperties = {
  ...TD,
  background: 'rgba(255,255,255,0.02)',
}

// ── Block renderer component ─────────────────────────────────────────────────

/** Section titles that typically contain short bullet-like list paragraphs. */
const IMPLICIT_LIST_TITLES = /^(pros|cons|key features|features|advantages|key advantages|benefits|disadvantages|limitations|includes|what['']s included|requirements|prerequisites|checklist|steps|tips|rules)/i

/** Return true when ALL paragraphs in the section are short and have no pipe separators.
 *  Used to detect implicit list sections (e.g. Pros/Cons without bullet markers). */
function isImplicitListSection(title: string, paragraphs: string[]): boolean {
  if (!IMPLICIT_LIST_TITLES.test(title.trim())) return false
  if (paragraphs.length < 2) return false
  return paragraphs.every((p) => p.trim().length <= 150 && !isPipeRow(p))
}

function SectionBlocks({ paragraphs, sectionId, sectionTitle }: { paragraphs: string[]; sectionId: string; sectionTitle: string }) {
  // Fast-path: implicit list section (Pros, Cons, Features, etc.)
  if (isImplicitListSection(sectionTitle, paragraphs)) {
    return (
      <ul style={{ margin: '10px 0 16px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {paragraphs.map((item, ii) => (
          <li key={`${sectionId}-ili-${ii}`} style={{ color: '#b9c6e0', lineHeight: 1.75, fontSize: 15.5 }}>{item.trim()}</li>
        ))}
      </ul>
    )
  }

  const blocks = renderParagraphs(paragraphs)

  return (
    <>
      {blocks.map((block, bi) => {
        const key = `${sectionId}-blk-${bi}`
        switch (block.kind) {

          case 'table':
            return (
              <div key={key} style={TABLE_WRAPPER}>
                <table style={TABLE}>
                  <thead>
                    <tr>
                      {block.rows[0].map((cell, ci) => (
                        <th key={ci} style={TH}>{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.slice(1).map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={ri % 2 === 0 ? TD : TD_ALT}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'ul':
            return (
              <ul key={key} style={{ margin: '10px 0 16px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {block.items.map((item, ii) => (
                  <li key={ii} style={{ color: '#b9c6e0', lineHeight: 1.75, fontSize: 15.5 }}>{item}</li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={key} style={{ margin: '10px 0 16px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {block.items.map((item, ii) => (
                  <li key={ii} style={{ color: '#b9c6e0', lineHeight: 1.75, fontSize: 15.5 }}>{item}</li>
                ))}
              </ol>
            )

          case 'url':
            return (
              <p key={key} style={{ margin: '6px 0' }}>
                <a
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#22d3ee', wordBreak: 'break-all', fontSize: 14 }}
                >
                  {block.text}
                </a>
              </p>
            )

          case 'p':
          default:
            return <p key={key}>{block.text}</p>
        }
      })}
    </>
  )
}

// ── Main page component ───────────────────────────────────────────────────────

export default function BlogPostPage({ slug, navigate }: BlogPostPageProps) {
  const post = blogPosts.find((item) => item.slug === slug) ?? blogPosts[0]
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3)
  // ── TOC generation ─────────────────────────────────────────────────────
  // Positive-filter + state machine: sections appear in the sidebar ONLY if
  // they pass an explicit keep rule. No even-sampling, original order is
  // preserved so numbered lists show without gaps.
  // The article body is completely unaffected.

  const TOC_EXACT_KEEP = new Set([
    'key takeaways', 'final thoughts', 'final thought', 'conclusion',
    'wrap up', 'wrap up session', 'takeaway', 'key takeaway',
  ])
  const TOC_EXACT_EXCLUDE = new Set([
    'key features', 'best for', 'key advantages', 'pros', 'cons',
    'features', 'quick comparison', 'quick comparison:',
    'email warmup services', 'email deliverability services',
    'pricing', 'overview', 'summary', 'details', 'description',
    'subject line', 'body', 'how to use this article?',
  ])
  const TOC_SUBQ_PREFIXES = [
    'how to set up', 'how to find', 'how to send', 'how to clean',
    'how to warm up', 'how to create', 'how to follow', 'how to a/b',
    'how to avoid', 'set up your', 'picking an', 'setup of a',
    'what is your daily', 'what is the average', 'what are good',
    'when it comes to',
  ]

  function tocShouldInclude(title: string): boolean {
    const t = title.trim()
    const tl = t.toLowerCase()
    const words = t.split(/\s+/)
    const wc = words.length

    // Hard excludes
    if (t.endsWith(':') || t.endsWith(' :')) return false
    if (TOC_EXACT_EXCLUDE.has(tl)) return false
    if (/^(pros|cons)\s+(of|and)\s+/i.test(tl)) return false
    if (TOC_SUBQ_PREFIXES.some((p) => tl.startsWith(p))) return false
    if (/^\([ivxlcdm]+\)\s+/i.test(tl)) return false   // (i) (ii) (iii)

    // Keep rules (at least one must be satisfied)
    if (TOC_EXACT_KEEP.has(tl)) return true              // K1: always-keep
    if (t.endsWith('?') && wc >= 4) return true          // K2: question heading
    if (wc >= 6) return true                             // K3: 6+ word heading
    if (wc === 1 && /^[A-Z]/.test(t) && !TOC_EXACT_EXCLUDE.has(tl)) return true  // K4: proper noun
    if (/^\d+\.\s+\S+(\s+\S+)?$/.test(t)) return true  // K5: "N. Word" or "N. Two Words"

    return false
  }

  function buildTocSections(sections: typeof post.sections, minFallback = 3) {
    const result: typeof post.sections = []
    const seen = new Set<string>()
    let inNamedSection = false   // True after first major non-numbered anchor
    let numberedBeforeAnchor = 0 // numbered items seen before the anchor

    for (const s of sections) {
      const t = s.title.trim()
      const tl = t.toLowerCase()
      if (seen.has(tl)) continue
      if (!tocShouldInclude(t)) continue

      const words = t.split(/\s+/)
      const isNumbered = /^\d+\./.test(t)
      const afterNum = t.replace(/^\d+\.\s*/, '').split(/\s+/)
      // short = 1-2 words after number ("1. EvaWarm", "4. Email Industries")
      const isShortNumbered  = isNumbered && afterNum.length <= 2
      // medium = 3-5 words after number ("2. Number of Mailboxes and Domains")
      const isMediumNumbered = isNumbered && afterNum.length >= 3 && afterNum.length <= 5

      // State machine: after a major anchor, suppress sub-criterion numbered items.
      // We only suppress medium items when the article had a primary numbered list
      // before the anchor (≥3 items), otherwise these ARE the main steps.
      if (inNamedSection) {
        const hadPrimaryList = numberedBeforeAnchor >= 3
        if (isShortNumbered || (hadPrimaryList && isMediumNumbered)) continue
      }

      // Advance state: non-numbered heading that is long (6+ words) or a question
      if (!isNumbered && (words.length >= 6 || t.endsWith('?'))) {
        inNamedSection = true
      }

      if (!inNamedSection && isNumbered) numberedBeforeAnchor++

      seen.add(tl)
      result.push(s)
    }

    // Fallback: if almost nothing passed, use softer filter (keep all non-generic sections)
    if (result.length < minFallback) {
      const seen2 = new Set<string>()
      return sections.filter((s) => {
        const t = s.title.trim()
        const tl = t.toLowerCase()
        if (t.endsWith(':') || t.endsWith(' :')) return false
        if (TOC_EXACT_EXCLUDE.has(tl)) return false
        if (/^(pros|cons)\s+(of|and)\s+/i.test(tl)) return false
        if (/^\([ivxlcdm]+\)\s+/i.test(tl)) return false
        if (seen2.has(tl)) return false
        seen2.add(tl)
        return true
      })
    }

    return result
  }

  const tocSections = [
    ...buildTocSections(post.sections),
    { id: 'final-thoughts', title: 'Final thoughts', paragraphs: [] },
  ]

  const jumpTo = (id?: string) => {
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    // scrollIntoView works inside an overflow:auto parent
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <section className="mesh-hero page-texture" style={{ padding: '144px 32px 88px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <button
            onClick={() => navigate('blog')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#6e7e9e', cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontSize: 13, marginBottom: 26 }}
          >
            <ArrowLeft size={15} /> Back to Blog
          </button>
          <div style={{ maxWidth: 900 }}>
            <div className="chip" style={{ marginBottom: 18 }}>{post.category}</div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', color: '#edf0ff', fontSize: 'clamp(40px, 6vw, 68px)', lineHeight: 1.08, letterSpacing: '-2.8px', marginBottom: 22 }}>{post.title}</h1>
            <p style={{ maxWidth: 780, color: '#9aabc9', fontSize: 17, lineHeight: 1.8, marginBottom: 24 }}>{post.excerpt}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', color: '#6e7e9e', fontSize: 12.5 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><CalendarDays size={13} />{formatBlogDate(post.date)}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock3 size={13} />{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mesh-alt blog-post-section">
        <div className="blog-post-layout">
          <aside className="blog-toc" aria-label="In the article">
            <div className="blog-toc-label">In the article</div>
            <nav>
              {tocSections.map((section) => (
                <button
                  key={section.id}
                  className={section.id === tocSections[0]?.id ? 'blog-toc-link active' : 'blog-toc-link'}
                  onClick={() => jumpTo(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          <div className="blog-post-main">
            <div
              aria-label="Article type"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                padding: '7px 11px',
                borderRadius: 9,
                border: '1px solid rgba(34,211,238,0.16)',
                background: 'rgba(6,182,212,0.06)',
                color: '#22d3ee',
                fontFamily: 'Sora, sans-serif',
                fontSize: 11.5,
                fontWeight: 600,
                lineHeight: 1,
                marginBottom: 30,
              }}
            >
              EvaWarm Guide
            </div>

            {post.image && (
              <figure style={{ margin: '0 0 34px' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    display: 'block',
                    width: '100%',
                    maxHeight: 520,
                    objectFit: 'cover',
                    objectPosition: post.imagePosition || 'center',
                    borderRadius: 20,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: '#0f1b30',
                  }}
                  loading="eager"
                />
              </figure>
            )}

            <article className="blog-article" style={{ color: '#b9c6e0', fontSize: 16, lineHeight: 1.9 }}>
              <p>{post.introduction}</p>

              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="blog-article-section">
                  <h2>{section.title}</h2>
                  <SectionBlocks paragraphs={section.paragraphs} sectionId={section.id ?? section.title} sectionTitle={section.title} />
                </section>
              ))}

              {post.takeaway && (
                <div className="card-glass" style={{ padding: 26, margin: '36px 0' }}>
                  <div style={{ color: '#22d3ee', fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>EvaWarm takeaway</div>
                  <p style={{ margin: 0, color: '#edf0ff' }}>{post.takeaway}</p>
                </div>
              )}

              <section id="final-thoughts" className="blog-article-section">
                <h2>Final thoughts</h2>
                <p>{post.conclusion}</p>
              </section>
            </article>

            <div style={{ marginTop: 62, paddingTop: 34, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: '#6e7e9e', fontFamily: 'Sora, sans-serif', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Related articles</div>
              <div className="related-grid">
                {related.map((item) => (
                  <button key={item.slug} onClick={() => navigate(`blog/${item.slug}`)} className="card" style={{ textAlign: 'left', padding: 18, background: '#0f1b30', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}>
                    <div style={{ color: '#22d3ee', fontSize: 11, marginBottom: 8 }}>{item.category}</div>
                    <div style={{ color: '#edf0ff', fontFamily: 'Sora, sans-serif', fontSize: 15.5, lineHeight: 1.45 }}>{item.title}</div>
                    <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6, color: '#9aabc9', fontSize: 12 }}>Read article <ArrowRight size={13} /></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageFAQ
        faqs={blogPostFaqs}
        heading={'About This Topic\nQuick Answers'}
        bg="#0b1324"
      />
    </main>
  )
}

const blogPostFaqs = [
  { q: 'How do I apply what I have read to my own sending setup?', a: 'Start with a free EvaWarm consultation, we will map the concepts from any article directly to your domain, ESP, and current deliverability situation. Theory is only useful when it is applied correctly to your specific context.' },
  { q: 'Are the tactics in these articles still current?', a: 'Yes. Every article is written from active client work and updated when ISP behaviour or best practices change. Email deliverability evolves quickly and we keep our content aligned with what is actually working today.' },
  { q: 'Can EvaWarm implement these strategies for me?', a: 'Absolutely. If you have read about a strategy, warmup, authentication, deliverability audit, and want it done professionally, that is exactly what we do. Reach out through the contact page or book a free call.' },
  { q: 'Where can I find more in-depth resources?', a: 'Browse the full blog for topic-specific deep-dives, or visit the FAQ page for a structured overview of email warmup and deliverability. Our How It Works page explains our full process end-to-end.' },
]
