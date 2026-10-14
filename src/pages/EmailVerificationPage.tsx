import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, MonitorCheck, TrendingUp, Target, Headset, Zap, CopyMinus } from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'

const CALENDLY = 'https://calendar.app.google/gt6J1J4rvFomHMgi8'
const CARD = '#0f1b30'
const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981']
const MESH = 'radial-gradient(ellipse 80% 70% at 10% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), #060b17'

function useIntersect() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  const ref = useIntersect()
  return <div ref={ref} className="reveal" style={style}>{children}</div>
}

function Section({ children, alt }: { children: ReactNode; alt?: boolean }) {
  return (
    <section style={{ padding: '100px 32px', background: alt ? '#0b1324' : '#060b17' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

function SectionHead({ chip, title, accent }: { chip: string; title: string; accent: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 64 }}>
      <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>{chip}</span>
      <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', letterSpacing: -1.5, lineHeight: 1.08, color: '#edf0ff' }}>
        {title} <span className="g-text">{accent}</span>
      </h2>
    </div>
  )
}

function LeadForm() {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }))

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, message: f.message, services: 'Email Verification Services' }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 16px' }} />
      <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 21, color: '#edf0ff', marginBottom: 8 }}>Request Sent!</h3>
      <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e' }}>We will get back to you within 24 hours.</p>
    </div>
  )

  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 6 }
  return (
    <>
      <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 22 }}>Get Your Free Audit Now!</h2>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div><label style={lbl} htmlFor="ev-name">Your Name</label><input id="ev-name" required className="input-field" placeholder="Jane Smith" value={f.name} onChange={set('name')} /></div>
        <div><label style={lbl} htmlFor="ev-email">Your Email</label><input id="ev-email" required type="email" className="input-field" placeholder="jane@company.com" value={f.email} onChange={set('email')} /></div>
        <div><label style={lbl} htmlFor="ev-msg">Your Message</label><textarea id="ev-msg" rows={4} className="input-field" style={{ resize: 'vertical' }} placeholder="Tell us about your list size and goals..." value={f.message} onChange={set('message')} /></div>
        {status === 'error' && <p role="alert" style={{ fontFamily: 'Inter', fontSize: 13, color: '#f87171' }}>Something went wrong. Please try again.</p>}
        <button type="submit" disabled={status === 'sending'} className="btn-primary" style={{ justifyContent: 'center', width: '100%', opacity: status === 'sending' ? 0.7 : 1 }}>
          {status === 'sending' ? 'Sending...' : 'Send Me A Quote'} <ArrowRight size={15} />
        </button>
      </form>
    </>
  )
}

const STATS = [
  { v: '2.6 B+', l: 'Emails Verified' },
  { v: '95%',    l: 'Accuracy Rate' },
  { v: '12 K+',  l: 'Trusted Users' },
]

const FEATURES = [
  { Icon: MonitorCheck, color: '#06b6d4', title: 'High Accuracy',          text: 'Guarantee dependable results with a 95% accuracy rate using multiple real-time checks.' },
  { Icon: TrendingUp,   color: '#8b5cf6', title: 'Bulk List Verification', text: 'Real-time bulk email verification that is highly accurate, efficient, and built for scale.' },
  { Icon: Target,       color: '#f59e0b', title: 'Catch-All Checkup',      text: 'Identify whether an email is valid, invalid, or catch-all with high or low risk classification.' },
  { Icon: Headset,      color: '#10b981', title: '24x7 Support',           text: 'Reach us any time by chat, email, or phone. Our engineers are always available.' },
  { Icon: Zap,          color: '#06b6d4', title: 'Fast Verification',       text: 'Millions of parallel validations completed within a single hour.' },
  { Icon: CopyMinus,    color: '#8b5cf6', title: 'Email Deduplication',    text: 'Remove duplicate addresses so the same person is never emailed twice.' },
]

const STEPS = [
  { t: 'Upload',   d: 'Submit your email list via our secure portal or API.' },
  { t: 'Verify',   d: 'We run syntax, MX, SMTP, and catch-all checks in parallel.' },
  { t: 'Classify', d: 'Every address is labelled valid, invalid, or catch-all with risk level.' },
  { t: 'Download', d: 'Receive your cleaned list with a full verification report.' },
  { t: 'Send',     d: 'Launch campaigns on a healthy, bounce-proof list.' },
]

const AUDIENCE = [
  { t: 'Cold email senders', d: 'Protect your sender reputation before every campaign.' },
  { t: 'Email marketers',    d: 'Cut bounce rates and keep your ESP account in good standing.' },
  { t: 'Data teams',         d: 'Clean CRM or imported lists before they reach production.' },
]

const FAQS = [
  { q: 'What is email verification?',        a: 'Email verification checks whether an email address is valid, invalid, or catch-all before you send to it, so you avoid bounces and protect your sender reputation.' },
  { q: 'How accurate is the verification?',  a: 'Our service combines multiple real-time checks to deliver results with an accuracy rate of 95%.' },
  { q: 'What is a catch-all email address?', a: 'A catch-all domain accepts mail for any address. We identify catch-all addresses and tell you whether they are high or low risk.' },
  { q: 'Can I verify a large list at once?', a: 'Yes. Bulk list verification is built for scale, and millions of validations can run in parallel within a single hour.' },
  { q: 'Do you remove duplicate emails?',    a: 'Yes. Our deduplication option removes repeated addresses so the same person is not emailed more than once.' },
  { q: 'Is there a free trial?',             a: 'Yes. Contact us to try the service for free and see the results on your own list.' },
]

export default function EmailVerificationPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  const [open, setOpen] = useState<number | null>(0)

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: 68, position: 'relative', overflow: 'hidden', background: MESH }}>
        <Breadcrumb crumbs={[{ label: 'Home', page: 'home' }, { label: 'Services', page: 'services' }, { label: 'Email Verification Services' }]} navigate={navigate} />
        <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div className="ev-hero" style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px 96px', display: 'grid', gridTemplateColumns: '1fr 440px', gap: 72, alignItems: 'center', position: 'relative' }}>
          <div style={{ animation: 'hero-up 0.8s ease both' }}>
            <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 6px #06b6d4' }} />&nbsp;95% Accurate Verification
            </span>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(32px, 4.5vw, 60px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.06, marginBottom: 22 }}>
              Email <span className="g-text">Verification</span> Services
            </h1>
            <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 18, color: '#c4d0ee', marginBottom: 14 }}>Clean lists. Zero bounces. 95% accuracy guaranteed.</p>
            <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', lineHeight: 1.8, maxWidth: 540, marginBottom: 36 }}>
              Our industry-first email verification solution identifies valid, invalid, and catch-all addresses in real time, reducing bounce rates, protecting sender reputation, and enhancing deliverability at any scale.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg"><Calendar size={17} /> Book A Meeting</a>
          </div>
          <div className="card" style={{ padding: '36px 32px' }}><LeadForm /></div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-band" style={{ padding: '64px 32px' }}>
        <div className="ev-3" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, textAlign: 'center' }}>
          {STATS.map(x => (
            <div key={x.l}>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: '#22d3ee', letterSpacing: -1.5 }}>{x.v}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 15, color: '#6e7e9e', marginTop: 6 }}>{x.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Included */}
      <Section>
        <SectionHead chip="What You Get" title="What's" accent="Included" />
        <div className="ev-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {FEATURES.map(({ Icon, color, title, text }) => (
            <Reveal key={title}>
              <div className="card" style={{ padding: '28px 26px', height: '100%' }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: color + '12', border: '1px solid ' + color + '28', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Icon size={22} color={color} /></div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 17, color: '#edf0ff', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.7 }}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section alt>
        <SectionHead chip="Step-by-Step" title="How It" accent="Works" />
        <div className="ev-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {STEPS.map(({ t, d }, i) => (
            <Reveal key={t}>
              <div className="card" style={{ padding: '24px 20px', height: '100%' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: COLORS[i % 4] + '12', border: '1px solid ' + COLORS[i % 4] + '28', color: COLORS[i % 4], fontFamily: 'Sora', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{i + 1}</div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginBottom: 6 }}>{t}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.65 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Audience */}
      <Section>
        <SectionHead chip="Who We Help" title="Who It's" accent="For" />
        <div className="ev-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {AUDIENCE.map(({ t, d }, i) => (
            <Reveal key={t}>
              <div className="card" style={{ padding: '28px 26px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, ' + COLORS[i % 4] + ', ' + COLORS[i % 4] + '44)' }} />
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: '#edf0ff', marginBottom: 8 }}>{t}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.7 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Quote */}
      <Section alt>
        <Reveal style={{ maxWidth: 780, margin: '0 auto' }}>
          <figure className="card-glass" style={{ padding: '40px 36px' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#22d3ee" style={{ opacity: 0.7, marginBottom: 16 }}><path d="M14.017 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            <blockquote style={{ fontFamily: 'Inter', fontSize: 19, lineHeight: 1.7, color: '#dbe4f8', marginBottom: 24 }}>
              Sundar has worked tirelessly to generate quality contacts and new leads for Email Verify. I have always enjoyed working with him and have done so for years. I would recommend his services to anyone in the B2B space.
            </blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid rgba(34,211,238,0.35)', flexShrink: 0, overflow: 'hidden', background: 'rgba(34,211,238,0.08)' }}>
                <img src="/avatars/jonathan.jpg" alt="Jonathan Rodger" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div style={{ flex: 1 }}><span style={{ fontFamily: 'Sora', fontWeight: 700, color: '#edf0ff', display: 'block' }}>Jonathan Rodger</span><span style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e' }}>Founder, Datyle</span></div>
              <a href="https://www.linkedin.com/in/jonathan-rodger-3b7851/" target="_blank" rel="noopener noreferrer" aria-label="Jonathan Rodger on LinkedIn" style={{ color: '#0a66c2', opacity: 0.8, transition: 'opacity 0.2s', flexShrink: 0 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHead chip="Questions" title="Frequently Asked" accent="Questions" />
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i
            return (
              <div key={q} className={'faq-item' + (isOpen ? ' open' : '')}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '20px 24px', background: isOpen ? 'rgba(6,182,212,0.05)' : CARD, border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Sora', fontWeight: 600, fontSize: 16, color: '#edf0ff' }}>
                  {q}<ChevronDown size={18} color="#22d3ee" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                <div className={'faq-answer' + (isOpen ? ' open' : '')}><p style={{ padding: '0 24px 22px', fontSize: 15, lineHeight: 1.8, color: '#6e7e9e' }}>{a}</p></div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section alt>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(26px, 3.4vw, 38px)', color: '#edf0ff', letterSpacing: -1, marginBottom: 16 }}>Ready to get started with Email Verification?</h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', marginBottom: 28 }}>Talk to Karthik about your list and goals.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg"><Calendar size={17} /> Book A Meeting</a>
            <button onClick={() => navigate('contact')} className="btn-ghost btn-lg">Contact Us</button>
          </div>
        </div>
      </Section>

      <style>{`
        @media (max-width: 1000px) {
          .ev-hero  { grid-template-columns: 1fr !important; gap: 48px !important; padding-top: 56px !important; }
          .ev-3     { grid-template-columns: 1fr !important; }
          .ev-steps { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) { .ev-steps { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}