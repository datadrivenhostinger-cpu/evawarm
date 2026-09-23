import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef } from 'react'

function useReveal<T extends HTMLElement>(threshold = 0.13) {
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
      minHeight: '52vh', display: 'flex', alignItems: 'center', paddingTop: 70,
      background:
        'radial-gradient(ellipse 70% 65% at 10% 35%, rgba(6,182,212,0.13) 0%, transparent 58%), radial-gradient(ellipse 55% 50% at 92% 12%, rgba(139,92,246,0.09) 0%, transparent 52%), radial-gradient(ellipse 50% 50% at 55% 95%, rgba(245,158,11,0.06) 0%, transparent 50%), #060b17',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '64px 64px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: '80px 28px', width: '100%', position: 'relative' }}>
        <button onClick={() => navigate('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 14px', color: '#6e7e9e', fontFamily: 'Inter', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 32, transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#edf0ff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.25)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6e7e9e'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
        >
          <ArrowLeft size={13} />
          Back to Home
        </button>
        <div style={{ maxWidth: 760 }}>
          <span className="chip" style={{ marginBottom: 18, display: 'inline-flex' }}>Case Studies</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(34px, 5.2vw, 70px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.05, marginBottom: 22, animation: 'hero-up 0.8s ease both' }}>
            Results
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 18, color: '#6e7e9e', lineHeight: 1.78, maxWidth: 580, marginBottom: 0, animation: 'hero-up 0.8s ease both', animationDelay: '0.15s' }}>
            Real clients, real outcomes. See exactly how EvaWarm's warmup and deliverability consulting has transformed email performance for businesses across industries.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Brysa Case Study ─────────────────────────────────────────────────────────

function BrysaCaseStudy() {
  const headRef = useReveal<HTMLDivElement>()
  const bodyRef = useReveal<HTMLDivElement>()

  const challenges = [
    'Unable to reach 30% or more open rate',
    'Could not increase domain reputation',
    'Lacked knowledge on working with Catch domains',
    'Required purchasing extra domains due to poor open rates, just to hit 15 leads/month',
  ]

  const solutions = [
    'Provided a custom manual warm-up to boost domain reputation and whitelist promotional content',
    'Delivered a volume strategy and defined the right audience for outbound campaigns',
    'Advised on proper catch-all domain validation to reduce bounces',
  ]

  const outcomes = [
    { v: '70%+', label: 'Avg Open Rate', sub: 'Achieved in just 6 weeks', color: '#06b6d4' },
    { v: '<2%',  label: 'Bounce Rate',   sub: 'Down from dangerously high', color: '#8b5cf6' },
    { v: '15',   label: 'Leads/Month',   sub: 'Using fewer domains',        color: '#f59e0b' },
    { v: '20%',  label: 'More Revenue',  sub: 'Generated after engagement', color: '#10b981' },
  ]

  return (
    <section id="case-study-brysa" style={{ padding: '100px 28px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 600, height: 500, background: 'radial-gradient(ellipse at top right, rgba(6,182,212,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>

        {/* Label + Title */}
        <div ref={headRef} className="reveal" style={{ marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.22)', borderRadius: 24, padding: '5px 14px', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', display: 'inline-block' }} />
            <span style={{ color: '#22d3ee', fontFamily: 'Inter', fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Email Deliverability</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="cs-header-grid">
            <div>
              <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 3.8vw, 52px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.06, marginBottom: 20 }}>
                Brysa — From 15% to<br /><span className="g-text">70%+ Open Rate</span>
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.8, marginBottom: 20 }}>
                <strong style={{ color: '#c4d0ee', fontWeight: 600 }}>Brysa</strong> (<a href="https://brysa.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#06b6d4', textDecoration: 'none' }}>brysa.co.uk</a>) is a certified Salesforce partner based in the UK, focused on management services. They were struggling to improve open rates in their outbound email campaigns used for lead generation.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['Salesforce Partner', 'UK-Based', 'B2B Lead Generation', 'Outbound Campaigns'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, padding: '4px 12px', fontFamily: 'Inter', fontSize: 12, color: '#5a6a86' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Outcome stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {outcomes.map(({ v, label, sub, color }) => (
                <div key={label} style={{ background: '#0f1b30', border: `1px solid ${color}22`, borderRadius: 16, padding: '22px 18px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, width: 80, height: 80, background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3vw, 36px)', color, letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>{v}</div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: '#c4d0ee', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#3a4762' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objective + Challenges + Solution in 3 columns */}
        <div ref={bodyRef} className="reveal cs-body-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 48 }}>

          {/* Objective */}
          <div style={{ background: '#0f1b30', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '32px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="none" stroke="#06b6d4" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 16, color: '#edf0ff' }}>Objective</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Achieve the highest possible open rate',
                'Generate a solid volume of leads',
                'Reduce costs tied to domain purchasing and automation software licensing',
              ].map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="#06b6d4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#8896b3', lineHeight: 1.65 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Challenges */}
          <div style={{ background: '#0f1b30', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 16, padding: '32px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="none" stroke="#f59e0b" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 16, color: '#edf0ff' }}>Business Challenges</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {challenges.map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 2l4 4M6 2L2 6" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#8896b3', lineHeight: 1.65 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: '#0f1b30', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 16, padding: '32px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="none" stroke="#8b5cf6" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 16, color: '#edf0ff' }}>Solution</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {solutions.map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="#8b5cf6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#8896b3', lineHeight: 1.65 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results highlight banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(139,92,246,0.06) 50%, rgba(245,158,11,0.05) 100%)', border: '1px solid rgba(6,182,212,0.18)', borderRadius: 20, padding: '32px 36px', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }} className="cs-results-banner">
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 14, color: '#22d3ee', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>The Result</div>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#8896b3', lineHeight: 1.75 }}>
              EvaWarm's custom manual warm-up delivered a <strong style={{ color: '#edf0ff' }}>70%+ average open rate in just 6 weeks</strong> after engagement began. Bounce rate dropped to under 2%, Brysa achieved 15 leads/month using fewer domains, and generated <strong style={{ color: '#edf0ff' }}>20% more revenue</strong>.
            </p>
          </div>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Get Similar Results
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path fillRule="evenodd" d="M1 7a.5.5 0 01.5-.5h9.293L8.147 3.854a.5.5 0 01.708-.708l3.5 3.5a.5.5 0 010 .708l-3.5 3.5a.5.5 0 01-.708-.708L10.793 7.5H1.5A.5.5 0 011 7z" /></svg>
          </a>
        </div>

      </div>
      <style>{`
        @media (max-width: 960px) { .cs-header-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 760px) { .cs-body-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .cs-results-banner { flex-direction: column !important; } }
      `}</style>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Jonathan Rodger', title: 'Founder', company: 'Datyle',
    initials: 'JR', color: '#06b6d4',
    quote: "Sundar has worked tirelessly to generate quality contacts and new leads for Email Verify. I would recommend his services to anyone in the B2B space.",
  },
  {
    name: 'Natarajan', title: 'Co-Founder', company: 'LeadWalut',
    initials: 'NT', color: '#8b5cf6',
    quote: "With consultation from EvaWarm, we elevate our email marketing to the next level, resulting in improved open and response rates.",
  },
  {
    name: 'Ankur', title: 'Growth Marketer', company: 'Attentive',
    initials: 'AK', color: '#f59e0b',
    quote: "We are seeing a good open rate of 65% thanks to EvaWarm's warm-up service.",
    highlight: { v: '65%', l: 'Open Rate Achieved' },
  },
]

function TestimonialsSection() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 28px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>Client Stories</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            What Our Clients<br /><span className="g-text">Have to Say</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
          {testimonials.map((t) => {
            const ref = useReveal<HTMLDivElement>()
            return (
              <div key={t.name} ref={ref} className="card reveal" style={{ padding: '36px 30px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 150, height: 150, background: `radial-gradient(circle, ${t.color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 56, lineHeight: 0.6, color: `${t.color}20`, marginBottom: 18, userSelect: 'none' }}>"</div>
                <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#c4d0ee', lineHeight: 1.8, marginBottom: 20, position: 'relative', zIndex: 1 }}>
                  {t.quote}
                </p>
                {'highlight' in t && t.highlight && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: `${t.color}0a`, border: `1px solid ${t.color}20`, borderRadius: 10, padding: '10px 16px', marginBottom: 20 }}>
                    <span style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 28, color: t.color }}>{t.highlight.v}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#6e7e9e' }}>{t.highlight.l}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}22, ${t.color}08)`, border: `1.5px solid ${t.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: 13, color: t.color, flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: '#edf0ff' }}>{t.name}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#3a4762' }}>{t.title}, {t.company}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Stats Band ───────────────────────────────────────────────────────────────

function StatsSection() {
  const headRef = useReveal<HTMLDivElement>()
  const stats = [
    { v: '5M', label: 'Emails Delivered in Inbox', sub: 'Successfully landed, not spam' },
    { v: '500+', label: 'Subscriptions', sub: 'Senders trust EvaWarm' },
    { v: '2.5M', label: 'Marked Not Spam', sub: 'Positive engagement signals sent' },
  ]
  return (
    <section className="stats-band" style={{ padding: '80px 28px' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex', borderColor: 'rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.1)', color: '#c4b5fd' }}>Our Reach</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Numbers That Speak<br /><span className="g-text">For Themselves</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="stats-grid">
          {stats.map(({ v, label, sub }, i) => (
            <div key={label} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', textAlign: 'center', padding: '36px 20px', position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: -2, lineHeight: 1 }} className="g-text-cyan">{v}</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginTop: 10, marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){ .stats-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Meet Our Clients CTA ─────────────────────────────────────────────────────

function MeetClientsCTA({ navigate }: { navigate: (p: string) => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 28px', background: '#0b1324' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div ref={ref} className="reveal gradient-border" style={{ background: '#0f1b30', borderRadius: 26, padding: 'clamp(36px, 5vw, 64px)', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <span className="chip" style={{ marginBottom: 18, display: 'inline-flex', position: 'relative' }}>They Believe In Us</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16, position: 'relative' }}>
            Meet Our Clients
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', lineHeight: 1.72, maxWidth: 480, margin: '0 auto 32px', position: 'relative' }}>
            We strive to make our clients happy. So, let&apos;s be happy together.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href="https://calendar.app.google/gt6J1J4rvFomHMgi8" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
              Book a Meeting
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M11.5 1H10V0H9v1H6V0H5v1H3.5A1.5 1.5 0 002 2.5v11A1.5 1.5 0 003.5 15h8a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0011.5 1zm.5 12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5V5h9v8.5zM3 4V2.5a.5.5 0 01.5-.5H5v1h1V2h3v1h1V2h1.5a.5.5 0 01.5.5V4H3z" /></svg>
            </a>
            <button onClick={() => navigate('services')} className="btn-ghost btn-lg">
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ResultsPage ──────────────────────────────────────────────────────────────

export default function ResultsPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div>
      <PageHero navigate={navigate} />
      <BrysaCaseStudy />
      <TestimonialsSection />
      <StatsSection />
      <MeetClientsCTA navigate={navigate} />
    </div>
  )
}
