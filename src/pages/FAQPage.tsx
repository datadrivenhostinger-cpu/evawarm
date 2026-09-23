import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

// ─── Page Hero ────────────────────────────────────────────────────────────────

function PageHero({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section style={{
      minHeight: '46vh', display: 'flex', alignItems: 'center', paddingTop: 68,
      background: 'radial-gradient(ellipse 70% 65% at 50% 20%, rgba(6,182,212,0.1) 0%, transparent 55%), #060b17',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 32px', width: '100%', position: 'relative', textAlign: 'center' }}>
        <div style={{ animation: 'hero-up 0.8s ease both' }}>
          <button onClick={() => navigate('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '7px 14px', color: '#6e7e9e', fontFamily: 'Sora', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 32, transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#edf0ff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6e7e9e' }}
          >
            <ArrowLeft size={13} />
            Back to Home
          </button>
          <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}>Knowledge Base</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(34px, 5vw, 66px)', color: '#edf0ff', letterSpacing: -2.5, lineHeight: 1.03, marginBottom: 22 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 'clamp(15px, 1.7vw, 18px)', color: '#6e7e9e', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Everything you need to know about email warmup, deliverability, and working with EvaWarm.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ Sections ─────────────────────────────────────────────────────────────

const faqSections = [
  {
    category: 'Email Warmup',
    color: '#06b6d4',
    items: [
      { q: 'What is email warmup?', a: 'Email warmup is the process of gradually increasing your sending volume from a new or dormant domain to build a positive sender reputation with ISPs and email providers. It involves sending emails in a controlled, escalating pattern that mimics natural human engagement — opens, replies, and moving emails out of spam.' },
      { q: 'Why do I need to warm up my email domain?', a: "When you start sending from a new domain or after a period of inactivity, ISPs don't know your sending patterns. High volumes from unknown senders trigger spam filters. Warmup establishes your domain as a trustworthy, legitimate sender before you ramp up to full campaign volume." },
      { q: 'How long does email warmup take?', a: 'A typical warmup takes 4–8 weeks depending on your target sending volume, current domain reputation, and the ISPs involved. EvaWarm accelerates this with manual warmup techniques that build reputation faster than automated tools.' },
      { q: 'What is manual warmup vs. automated warmup?', a: "Automated warmup tools use software to simulate email activity. Manual warmup involves real human interactions — EvaWarm uses actual inboxes and real engagement signals, which ISPs trust significantly more and which produce faster, more durable results." },
    ],
  },
  {
    category: 'Deliverability',
    color: '#8b5cf6',
    items: [
      { q: 'What is email deliverability?', a: 'Email deliverability refers to your emails actually reaching the recipient\'s inbox (not spam). It\'s determined by a combination of technical factors (authentication, infrastructure), sender reputation, and content quality.' },
      { q: 'Why are my emails going to spam?', a: 'Spam placement can be caused by poor domain reputation, missing authentication records (SPF, DKIM, DMARC), high bounce rates, spam trap hits, sending patterns that resemble bulk senders, or content that triggers spam filters. A deliverability audit can identify the root cause.' },
      { q: 'What authentication records do I need?', a: 'SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication, Reporting & Conformance) are the three essential records. EvaWarm helps you set these up correctly as part of the onboarding process.' },
      { q: 'How do I check my sender reputation?', a: "You can check your IP/domain reputation using tools like Google Postmaster Tools, Sender Score, MXToolbox, and your ESP's inbox placement reports. EvaWarm provides continuous monitoring as part of our ongoing service." },
    ],
  },
  {
    category: 'Working With EvaWarm',
    color: '#f59e0b',
    items: [
      { q: 'How does EvaWarm work?', a: "You share your domain and sending credentials with us, and we begin a structured manual warmup process. We gradually scale your sending volume using real inbox engagement, monitor your reputation metrics daily, and report back to you with full transparency on progress." },
      { q: 'What results can I expect?', a: 'Most clients see measurable improvement in inbox placement within 2–3 weeks. By the end of a full warmup, you should expect to consistently land in the primary inbox with minimal spam placement. Our clients average 95%+ inbox rates post-warmup.' },
      { q: 'Do you work with all email service providers?', a: "Yes. We work with Gmail, Outlook, Yahoo, AWS SES, Sendgrid, Mailchimp, ActiveCampaign, HubSpot, and virtually any ESP or sending infrastructure." },
      { q: 'Is my data secure?', a: "Absolutely. We follow strict data handling protocols, do not store email content, and limit access to your credentials to only the team members actively working on your campaign. We can sign NDAs on request." },
      { q: 'How do I get started?', a: "Book a free 30-minute consultation through our Calendly link. We will review your current setup, identify issues, and recommend a clear plan. No commitment required for the consultation." },
    ],
  },
]

function FAQSection({ section, index }: { section: typeof faqSections[0]; index: number }) {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="reveal" style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${section.color}14`, border: `1px solid ${section.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: 15, color: section.color }}>
          {index + 1}
        </div>
        <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 20, color: '#edf0ff' }}>{section.category}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {section.items.map((item, i) => (
          <div key={i} className={`faq-item${openItem === i ? ' open' : ''}`}>
            <button
              onClick={() => setOpenItem(openItem === i ? null : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '19px 24px', background: 'none', border: 'none', cursor: 'pointer', gap: 16 }}
              aria-expanded={openItem === i}
            >
              <span style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 15, color: '#edf0ff', textAlign: 'left', lineHeight: 1.4 }}>{item.q}</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, transition: 'transform 0.3s', transform: openItem === i ? 'rotate(180deg)' : 'none' }}>
                <path d="M4 7l5 5 5-5" stroke="#6e7e9e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`faq-answer${openItem === i ? ' open' : ''}`}>
              <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.85, padding: '0 24px 22px' }}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FAQContent() {
  return (
    <section style={{ padding: '80px 32px', background: '#0b1324' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        {faqSections.map((section, i) => (
          <FAQSection key={section.category} section={section} index={i} />
        ))}
      </div>
    </section>
  )
}

// ─── Still Have Questions CTA ──────────────────────────────────────────────────

function StillHaveQuestions({ navigate }: { navigate: (p: string) => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '64px 32px 100px', background: '#060b17' }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 680, margin: '0 auto' }}>
        <div className="gradient-border" style={{ background: '#0f1b30', borderRadius: 24, padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.7" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
            </svg>
          </div>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: '#edf0ff', letterSpacing: -1, lineHeight: 1.15, marginBottom: 14, position: 'relative' }}>
            Still Have Questions?
          </h3>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.75, maxWidth: 380, margin: '0 auto 32px', position: 'relative' }}>
            Our team is happy to walk you through anything. Book a free consultation and get direct answers.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href="https://calendar.app.google/gt6J1J4rvFomHMgi8" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Free Call
            </a>
            <button onClick={() => navigate('contact')} className="btn-ghost">
              Send a Message
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────

export default function FAQPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div>
      <PageHero navigate={navigate} />
      <FAQContent />
      <StillHaveQuestions navigate={navigate} />
    </div>
  )
}
