import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, Calendar, CheckCircle2, Minus, Plus, Quote } from 'lucide-react'
import type { ServiceLanding } from '@/data/serviceLandings'

const CALENDLY = 'https://calendar.app.google/gt6J1J4rvFomHMgi8'
const CARD = '#0f1b30'
const LINE = 'rgba(255,255,255,0.07)'
const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981']

function Reveal({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} className="reveal" style={style}>{children}</div>
}

function Section({ children, alt }: { children: ReactNode; alt?: boolean }) {
  return (
    <section style={{ padding: '100px 32px', background: alt ? '#0b1324' : '#060b17' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

function H2({ children, chip }: { children: string; chip: string }) {
  const w = children.split(' ')
  const k = w.length > 2 ? 2 : 1
  return (
    <div style={{ textAlign: 'center', marginBottom: 64 }}>
      <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>{chip}</span>
      <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', letterSpacing: -1.5, lineHeight: 1.08, color: '#edf0ff' }}>
        {w.slice(0, -k).join(' ')} <span className="g-text">{w.slice(-k).join(' ')}</span>
      </h2>
    </div>
  )
}

// ─── Lead Form wired to /api/contact (Gmail endpoint) ─────────────────────────

function LeadForm({ source }: { source: string }) {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          message: f.message,
          services: source,
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 21, color: '#edf0ff', marginBottom: 8 }}>Request Sent!</h3>
        <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e' }}>We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 6 }
  return (
    <>
      <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 22 }}>Get Your Free Audit Now!</h2>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div><label style={lbl} htmlFor="sl-name">Your Name</label><input id="sl-name" required className="input-field" placeholder="Jane Smith" value={f.name} onChange={set('name')} /></div>
        <div><label style={lbl} htmlFor="sl-email">Your Email</label><input id="sl-email" required type="email" className="input-field" placeholder="jane@company.com" value={f.email} onChange={set('email')} /></div>
        <div><label style={lbl} htmlFor="sl-msg">Your Message</label><textarea id="sl-msg" rows={4} className="input-field" style={{ resize: 'vertical' }} placeholder="Tell us about your sending setup…" value={f.message} onChange={set('message')} /></div>
        {status === 'error' && <p role="alert" style={{ fontFamily: 'Inter', fontSize: 13, color: '#f87171' }}>Something went wrong. Please try again or <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthik@datadriven-services.com" target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee' }}>Email Us</a>.</p>}
        <button type="submit" disabled={status === 'sending'} className="btn-primary" style={{ justifyContent: 'center', width: '100%', opacity: status === 'sending' ? 0.7 : 1 }}>
          {status === 'sending' ? 'Sending…' : 'Send Me A Quote'} <ArrowRight size={15} />
        </button>
      </form>
    </>
  )
}

export default function ServiceLandingPage({ service: s, navigate }: { service: ServiceLanding; navigate: (p: string) => void }) {
  const [open, setOpen] = useState<number | null>(0)
  const [before, after] = s.title.split(s.highlight)
  return (
    <main>
      <section style={{ paddingTop: 68, position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 80% 70% at 10% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), #060b17' }}>
        <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div className="sl-hero" style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px 96px', display: 'grid', gridTemplateColumns: '1fr 440px', gap: 72, alignItems: 'center', position: 'relative' }}>
          <div style={{ animation: 'hero-up 0.8s ease both' }}>
            <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 6px #06b6d4' }} />{s.eyebrow}</span>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(32px, 4.5vw, 60px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.06, marginBottom: 22 }}>
              {before}<span className="g-text">{s.highlight}</span>{after}
            </h1>
            <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 18, color: '#c4d0ee', marginBottom: 14 }}>{s.heroSub}</p>
            <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', lineHeight: 1.8, maxWidth: 540, marginBottom: 36 }}>{s.intro}</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg"><Calendar size={17} /> Book A Meeting</a>
          </div>
          <div className="card" style={{ padding: '36px 32px' }}>
            <LeadForm source={s.title} />
          </div>
        </div>
      </section>

      <section className="stats-band" style={{ padding: '64px 32px' }}>
        <div className="sl-3" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, textAlign: 'center', position: 'relative' }}>
          {s.stats.map(x => (
            <div key={x.l}>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: '#22d3ee', letterSpacing: -1.5 }}>{x.v}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 15, color: '#6e7e9e', marginTop: 6 }}>{x.l}</div>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <H2 chip="What You Get">{"What's Included"}</H2>
        <div className="sl-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {s.included.map((x, i) => (
            <Reveal key={x.t}>
              <div className="card" style={{ padding: '28px 26px', height: '100%' }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: `${COLORS[i % 4]}12`, border: `1px solid ${COLORS[i % 4]}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><CheckCircle2 size={22} color={COLORS[i % 4]} /></div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 17, color: '#edf0ff', marginBottom: 8 }}>{x.t}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.7 }}>{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <H2 chip="Step-by-Step">{"How It Works"}</H2>
        <div className="sl-steps" style={{ display: 'grid', gridTemplateColumns: `repeat(${s.steps.length}, 1fr)`, gap: 16 }}>
          {s.steps.map((x, i) => (
            <Reveal key={x.t}>
              <div className="card" style={{ padding: '24px 20px', height: '100%' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${COLORS[i % 4]}12`, border: `1px solid ${COLORS[i % 4]}28`, color: COLORS[i % 4], fontFamily: 'Sora', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{i + 1}</div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginBottom: 6 }}>{x.t}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.65 }}>{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <H2 chip="Who We Help">{"Who It's For"}</H2>
        <div className="sl-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {s.audience.map((x, i) => (
            <Reveal key={x.t}>
              <div className="card" style={{ padding: '28px 26px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${COLORS[i % 4]}, ${COLORS[i % 4]}44)` }} />
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: '#edf0ff', marginBottom: 8 }}>{x.t}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.7 }}>{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <Reveal style={{ maxWidth: 780, margin: '0 auto' }}>
          <figure className="card-glass" style={{ padding: '40px 36px' }}>
            <Quote size={30} color="#22d3ee" style={{ opacity: 0.7, marginBottom: 16 }} />
            <blockquote style={{ fontFamily: 'Inter', fontSize: 19, lineHeight: 1.7, color: '#dbe4f8', marginBottom: 20 }}>{s.quote.q}</blockquote>
            <figcaption><span style={{ fontFamily: 'Sora', fontWeight: 700, color: '#edf0ff' }}>{s.quote.n}</span> <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e' }}>· {s.quote.r}</span></figcaption>
          </figure>
        </Reveal>
      </Section>

      <Section>
        <H2 chip="Questions">{"FAQ"}</H2>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {s.faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`faq-item${isOpen ? ' open' : ''}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '20px 24px', background: isOpen ? 'rgba(6,182,212,0.05)' : CARD, border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Sora', fontWeight: 600, fontSize: 16, color: '#edf0ff' }}>
                  {f.q}{isOpen ? <Minus size={18} color="#22d3ee" /> : <Plus size={18} color="#22d3ee" />}
                </button>
                <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                  <p style={{ fontFamily: 'Inter', fontSize: 15, lineHeight: 1.75, color: '#6e7e9e', padding: '0 24px 22px' }}>{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section alt>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(26px, 3.4vw, 38px)', color: '#edf0ff', letterSpacing: -1, marginBottom: 16 }}>Ready to get started with {s.title}?</h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', marginBottom: 28 }}>Talk to Karthik about your setup and goals.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg"><Calendar size={17} /> Book A Meeting</a>
            <button onClick={() => navigate('services')} className="btn-ghost btn-lg">All Services</button>
          </div>
        </div>
      </Section>

      <style>{`
        @media (max-width: 1000px) {
          .sl-hero { grid-template-columns: 1fr !important; gap: 48px !important; padding-top: 56px !important; }
          .sl-3 { grid-template-columns: 1fr !important; }
          .sl-steps { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) { .sl-steps { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
