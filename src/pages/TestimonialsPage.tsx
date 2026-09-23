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
        'radial-gradient(ellipse 70% 65% at 10% 35%, rgba(139,92,246,0.12) 0%, transparent 58%), radial-gradient(ellipse 55% 50% at 92% 12%, rgba(6,182,212,0.09) 0%, transparent 52%), radial-gradient(ellipse 50% 50% at 55% 95%, rgba(245,158,11,0.06) 0%, transparent 50%), #060b17',
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
        <div style={{ maxWidth: 720, animation: 'hero-up 0.8s ease both' }}>
          <span className="chip chip-violet" style={{ marginBottom: 18, display: 'inline-flex' }}>Client Stories</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(34px, 5.2vw, 70px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.05, marginBottom: 22 }}>
            Testimonials
          </h1>
          <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 'clamp(18px, 2.2vw, 24px)', lineHeight: 1.35, marginBottom: 0 }} className="g-text">
            Loved By Our Clients Around the World
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Natarajan',
    title: 'Co-Founder',
    company: 'LeadWalut',
    initials: 'NT',
    color: '#8b5cf6',
    quote: 'With consultation from EvaWarm, we elevate our email marketing to the next level, resulting in improved open and response rates compared to previous campaigns.',
    highlight: null,
  },
  {
    name: 'Ankur',
    title: 'Growth Marketer',
    company: 'Attentive',
    initials: 'AK',
    color: '#06b6d4',
    quote: 'For an extended period, we had poor open rates...but now we are seeing a good open rate of 65% thanks to EvaWarm\'s warm-up service.',
    highlight: { v: '65%', l: 'Open Rate Achieved' },
  },
  {
    name: 'Jonathan Rodger',
    title: 'Founder',
    company: 'Datyle',
    initials: 'JR',
    color: '#f59e0b',
    quote: 'Sundar has worked tirelessly to generate quality contacts and new leads for Email Verify. I have always enjoyed working with him and have done so for years. I would recommend his services to anyone in the B2B space.',
    highlight: null,
  },
]

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useReveal<HTMLDivElement>()
  const isFeature = index === 1

  return (
    <div
      ref={ref}
      className="card reveal"
      style={{
        padding: isFeature ? '48px 40px' : '36px 30px',
        position: 'relative',
        overflow: 'hidden',
        gridRow: isFeature ? 'span 1' : undefined,
        border: isFeature ? `1px solid ${t.color}28` : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isFeature ? `0 0 60px ${t.color}0c, 0 2px 16px rgba(0,0,0,0.25)` : '0 2px 16px rgba(0,0,0,0.25)',
      }}
    >
      {/* Glow */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: `radial-gradient(circle, ${t.color}0d 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Opening quote mark */}
      <div style={{ fontFamily: 'Georgia, serif', fontSize: isFeature ? 80 : 64, lineHeight: 0.55, color: `${t.color}22`, marginBottom: 22, userSelect: 'none' }}>"</div>

      {/* Quote */}
      <p style={{ fontFamily: 'Inter', fontSize: isFeature ? 17 : 15, color: '#c4d0ee', lineHeight: 1.85, marginBottom: 24, position: 'relative', zIndex: 1 }}>
        {t.quote}
      </p>

      {/* Highlight stat */}
      {t.highlight && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: `${t.color}0c`, border: `1px solid ${t.color}22`, borderRadius: 12, padding: '12px 18px', marginBottom: 24 }}>
          <span style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 32, color: t.color }}>{t.highlight.v}</span>
          <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e' }}>{t.highlight.l}</span>
        </div>
      )}

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}24, ${t.color}0a)`, border: `1.5px solid ${t.color}38`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: 14, color: t.color, flexShrink: 0 }}>
          {t.initials}
        </div>
        <div>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#edf0ff' }}>{t.name}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#3a4762' }}>{t.title}, {t.company}</div>
        </div>
      </div>
    </div>
  )
}

function TestimonialsGrid() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 28px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%,-50%)', width: 900, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>What Our Clients Have to Say</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Real Clients,<br /><span className="g-text">Real Results</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testi-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .testi-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 901px) and (max-width: 1100px) { .testi-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Stats Band ───────────────────────────────────────────────────────────────

function StatsSection() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section className="stats-band" style={{ padding: '80px 28px' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex', borderColor: 'rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.1)', color: '#c4b5fd' }}>By The Numbers</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Numbers That Speak<br /><span className="g-text">For Themselves</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="testi-stats">
          {[
            { v: '5M',   label: 'Emails Delivered in Inbox', sub: 'Successfully landed, not spam'       },
            { v: '500+', label: 'Subscriptions',             sub: 'Senders trust EvaWarm'               },
            { v: '2.5M', label: 'Marked Not Spam',           sub: 'Positive engagement signals sent'    },
          ].map(({ v, label, sub }, i) => (
            <div key={label} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', textAlign: 'center', padding: '36px 20px', position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: -2, lineHeight: 1 }} className="g-text-cyan">{v}</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginTop: 10, marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){ .testi-stats { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Meet Our Clients CTA ─────────────────────────────────────────────────────

function MeetClientsCTA({ navigate }: { navigate: (p: string) => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 28px', background: '#060b17' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div ref={ref} className="reveal gradient-border" style={{ background: '#0f1b30', borderRadius: 26, padding: 'clamp(36px, 5vw, 64px)', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <span className="chip chip-violet" style={{ marginBottom: 18, display: 'inline-flex', position: 'relative' }}>They Believe In Us</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16, position: 'relative' }}>
            Meet Our Clients
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', lineHeight: 1.72, maxWidth: 460, margin: '0 auto 32px', position: 'relative' }}>
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

// ─── TestimonialsPage ─────────────────────────────────────────────────────────

export default function TestimonialsPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div>
      <PageHero navigate={navigate} />
      <TestimonialsGrid />
      <StatsSection />
      <MeetClientsCTA navigate={navigate} />
    </div>
  )
}
