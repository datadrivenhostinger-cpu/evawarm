import { useState, useRef, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FAQEntry {
  q: string
  a: string
}

// ─── useReveal (local copy — avoids cross-file hook import complexity) ─────────

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

// ─── FAQItem (accordion row) ──────────────────────────────────────────────────

function FAQItem({ q, a }: FAQEntry) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left',
          background: open ? 'rgba(6,182,212,0.05)' : '#0f1b30',
          border: 'none', padding: '20px 22px', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 16, transition: 'background 0.25s',
        }}
        aria-expanded={open}
      >
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#edf0ff', lineHeight: 1.45 }}>{q}</span>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: open ? 'rgba(6,182,212,0.12)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${open ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.09)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.25s',
        }}>
          {open ? <Minus size={12} color="#06b6d4" /> : <Plus size={12} color="#6e7e9e" />}
        </div>
      </button>
      <div className={`faq-answer${open ? ' open' : ''}`}>
        <div style={{ padding: '0 22px 20px', color: '#6e7e9e', fontFamily: 'Inter', fontSize: 14, lineHeight: 1.8 }}>{a}</div>
      </div>
    </div>
  )
}

// ─── PageFAQ (full section) ───────────────────────────────────────────────────

interface PageFAQProps {
  faqs: FAQEntry[]
  /** Section heading displayed below the chip. Defaults to "Common Questions, Straight Answers" */
  heading?: string
  /** Chip label. Defaults to "FAQ" */
  chip?: string
  /** Background colour for the outer section. Defaults to alternating dark bg. */
  bg?: string
}

export default function PageFAQ({
  faqs,
  heading = 'Common Questions,\nStraight Answers',
  chip = 'FAQ',
  bg = '#0b1324',
}: PageFAQProps) {
  const headRef = useReveal<HTMLDivElement>()
  const [title, subtitle] = heading.split('\n')
  return (
    <section style={{ padding: '90px 28px', background: bg }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex' }}>{chip}</span>
          <h2 style={{
            fontFamily: 'Sora', fontWeight: 900,
            fontSize: 'clamp(24px, 3.5vw, 44px)',
            color: '#edf0ff', letterSpacing: -1.2, lineHeight: 1.1,
          }}>
            {title}
            {subtitle && <><br /><span className="g-text">{subtitle}</span></>}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  )
}
