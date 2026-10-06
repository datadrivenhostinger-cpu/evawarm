import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight, Calendar, CheckCircle2, Plus, Minus, Mail, MailCheck, Inbox, Layers, TrendingUp,
  Award, Headset, Target, BarChart3, MousePointerClick, Gauge, Rocket, Megaphone, Building2, Handshake,
  Quote, MapPin, Globe,
} from 'lucide-react'
import Logo from '@/components/Logo'

const CALENDLY = 'https://calendar.app.google/gt6J1J4rvFomHMgi8'
const LIGHT = '#0b1324'
const CARD = '#0f1b30'
const LINE = 'rgba(255,255,255,0.07)'
const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981']
const DARK_INK = '#0b1324'

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>
}

function Section({ light, children, id }: { light?: boolean; children: ReactNode; id?: string }) {
  return (
    <section id={id} style={{ padding: '100px 32px', background: light ? LIGHT : '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>{children}</div>
    </section>
  )
}

function Heading({ chip, title, sub }: { chip?: string; title: string; sub?: string; light?: boolean; accent?: boolean; label?: string }) {
  const w = title.split(' ')
  const k = w.length > 3 ? 2 : 1
  return (
    <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
      {chip && <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>{chip}</span>}
      <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, maxWidth: 860, margin: '0 auto' }}>
        {w.slice(0, -k).join(' ')} <span className="g-text">{w.slice(-k).join(' ')}</span>
      </h2>
      {sub && <p style={{ fontFamily: 'Inter', fontSize: 17, lineHeight: 1.7, color: '#6e7e9e', maxWidth: 560, margin: '16px auto 0' }}>{sub}</p>}
    </Reveal>
  )
}

/* ── 1. Hero ─────────────────────────────────────────── */
function Hero() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: (form.phone ? `Phone: ${form.phone}\n\n` : '') + (form.message || 'Bulk Email Warmup enquiry'),
          services: 'Bulk Email Warmup',
        }),
      })
      setStatus(r.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 6 }
  const inp: React.CSSProperties = {}

  return (
    <section style={{ paddingTop: 68, position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 80% 70% at 10% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), #060b17' }}>
      <div style={{ display: 'none', position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', background: 'linear-gradient(135deg, rgba(6,182,212,0.0) 0%, rgba(8,145,178,0.16) 55%, rgba(34,211,238,0.22) 100%)', clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0 100%)', pointerEvents: 'none' }} />
      <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div className="bew-hero" style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px 96px', display: 'grid', gridTemplateColumns: '1fr 440px', gap: 72, alignItems: 'center', position: 'relative' }}>
        <div style={{ animation: 'hero-up 0.8s ease both' }}>
          <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 6px #06b6d4' }} />Welcome To EvaWarm</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(32px, 4.5vw, 60px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.06, marginBottom: 22 }}>Bulk Email <span className="g-text">Warm Up Services</span></h1>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', lineHeight: 1.8, maxWidth: 520, marginBottom: 38 }}>
            Begin your email marketing campaign with the <span style={{ color: '#22d3ee', fontWeight: 600 }}>Bulk</span> warmup solution from Evawarm, the premier cold email deliverability consultant.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg"><Calendar size={17} /> Book A Meeting</a>
        </div>

        <div className="card" style={{ padding: '36px 32px', animation: 'hero-up 0.8s ease both', animationDelay: '0.15s' }}>
          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 21, color: '#edf0ff', marginBottom: 8 }}>Request Sent!</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e' }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 22 }}>Get Your Free Audit Now!</h2>
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div><label style={lbl} htmlFor="bew-name">Your Name</label><input id="bew-name" required className="input-field" value={form.name} onChange={set('name')} placeholder="Jane Cooper" /></div>
                <div><label style={lbl} htmlFor="bew-email">Your Email</label><input id="bew-email" required type="email" className="input-field" value={form.email} onChange={set('email')} placeholder="jane@company.com" /></div>
                <div><label style={lbl} htmlFor="bew-phone">Your Phone</label><input id="bew-phone" type="tel" className="input-field" value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" /></div>
                <div><label style={lbl} htmlFor="bew-msg">Your Message</label><textarea id="bew-msg" rows={5} className="input-field" style={{ resize: 'vertical' }} value={form.message} onChange={set('message')} placeholder="Tell us about your sending volume and goals" /></div>
                {status === 'error' && <p role="alert" style={{ fontFamily: 'Inter', fontSize: 13, color: '#f87171' }}>Something went wrong. Please try again or use the Email Us link on our Contact page.</p>}
                <button type="submit" disabled={status === 'sending'} className="btn-primary" style={{ justifyContent: 'center', width: '100%', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? 'Sending…' : 'Send Me A Quote'} <ArrowRight size={15} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── 2. What can we do ───────────────────────────────── */
function WhatWeDo() {
  const cards = [
    { Icon: Mail, title: 'Bulk Email Warmup', desc: 'Bulk email warmup is a process of gradually sending large volumes of emails to build sender reputation and ensure mass email campaigns land in the inbox instead of spam folders.' },
    { Icon: MailCheck, title: 'Email Deliverability Consulting', desc: 'Email deliverability consulting helps improve email inbox placement, sender reputation, and overall email marketing performance through technical optimizations and best practices.' },
  ]
  return (
    <Section light>
      <Heading chip="We Solve Real Problems" title="What Can We Do For You?" />
      <div className="bew-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {cards.map(({ Icon, title, desc }) => (
          <Reveal key={title}>
            <div className="card" style={{ padding: '44px 40px', height: '100%' }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}><Icon size={28} color="#0891b2" /></div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 24, color: '#edf0ff', letterSpacing: -0.5, marginBottom: 12 }}>{title}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ── 3. How it works ─────────────────────────────────── */
const steps = [
  ['Domain & Email Setup', 'We configure your sending domain with proper SPF, DKIM, and DMARC records to ensure authentication before beginning the warmup.'],
  ['Low Volume Sending', 'We begin sending small batches of emails to a curated list of engaged recipients to establish initial trust with email providers.'],
  ['Engagement Simulation', 'Emails are manually opened, marked as important, and replied to in a conversational manner to build trust with email providers.'],
  ['Domain Reputation Enhancement', 'By maintaining consistent, human-driven interactions, we improve your sender reputation, increasing email deliverability.'],
  ['Continuous SPAM Monitoring', 'Our team monitors your email health, ensuring that your domain maintains a low spam score and stays out of spam folders.'],
  ['Volume Scaling', 'Once reputation is established, we gradually scale your sending volume to handle bulk campaign sizes without triggering spam filters.'],
  ['Real-Time Analytics', 'You receive regular updates on email deliverability, engagement rates, and reputation score improvements.'],
]

function HowItWorks() {
  return (
    <Section>
      <Heading chip="Step-by-Step" title="How It Works" sub="Our step-by-step manual bulk email warmup process ensures your emails are trusted by ISPs." />
      <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 27, top: 10, bottom: 10, width: 2, background: 'linear-gradient(180deg, #06b6d4, #8b5cf6 70%, transparent)', opacity: 0.4 }} />
        {steps.map(([t, d], i) => (
          <Reveal key={t} style={{ display: 'flex', gap: 28, marginBottom: 20, position: 'relative' }}>
            <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: '50%', background: '#0b1324', border: '2px solid #06b6d4', color: '#22d3ee', fontFamily: 'Sora', fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(6,182,212,0.25)' }}>{i + 1}</div>
            <div className="card" style={{ padding: '22px 26px', flex: 1 }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: '#edf0ff', marginBottom: 6 }}>{t}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#6e7e9e', lineHeight: 1.7 }}>{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ── 4. About ────────────────────────────────────────── */
function About() {
  const paras = [
    'EvaWarm offers specialized services that are designed to enhance the reputation of your email account while also preventing your messages from being marked as spam.',
    "Our manual bulk warmup service is tailored to your specific needs, and it involves real human interaction with your emails. This kind of genuine activity is recognized by ISPs and can help to boost your email account's credibility.",
    'Moreover, we provide expert consulting services to both B2B and B2C businesses, helping them to improve their email deliverability. Our team of professionals can guide you through the intricacies of email marketing.',
    "Ensuring that your messages reach their intended audience and aren't blocked by spam filters. With our comprehensive approach, you can trust EvaWarm to help you achieve your bulk email marketing goals.",
  ]
  return (
    <Section light>
      <div className="bew-2" style={{ display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 72, alignItems: 'center' }}>
        <Reveal>
          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: '58% 42% 55% 45% / 48% 55% 45% 52%', overflow: 'hidden', aspectRatio: '1 / 1', boxShadow: '0 30px 70px rgba(0,0,0,0.4)' }}>
            <img src="https://evawarm.com/wp-content/uploads/2023/03/UIUX-13-1024x1024.png" alt="EvaWarm team in a business meeting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Reveal>
        <Reveal>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 40px)', color: '#0891b2', letterSpacing: -1, marginBottom: 22 }}>About Us</h3>
          {paras.map(p => <p key={p.slice(0, 20)} style={{ fontFamily: 'Inter', fontSize: 16.5, lineHeight: 1.8, color: '#6e7e9e', marginBottom: 16 }}>{p}</p>)}
        </Reveal>
      </div>
    </Section>
  )
}

/* ── 5. Why EvaWarm ──────────────────────────────────── */
function WhyEvaWarm() {
  const cols = [
    { Icon: Layers, t: 'Deliverability', d: 'We offer tailored suggestions to enhance your email deliverability, including techniques to improve inbox placement and sender reputation.' },
    { Icon: TrendingUp, t: 'Scalability', d: 'Our exceptional service for bulk email warmup can double your sender reputation, leading to improved email deliverability and better engagement with your audience.' },
    { Icon: Award, t: 'Expertise', d: 'Our team of experts can assist you in analyzing your mailing strategy and tools, providing valuable insights to optimize your email marketing campaigns.' },
    { Icon: Headset, t: '24/7 Support', d: 'Our team of experts is available 24/7 to guide and support you through every step of the way, ensuring you receive assistance whenever needed.' },
  ]
  return (
    <Section>
      <Heading chip="Why Us" title="Why EvaWarm" />
      <div className="bew-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {cols.map(({ Icon, t, d }, i) => { const c = COLORS[i % 4]; return (
          <Reveal key={t}>
            <div className="card" style={{ padding: '32px 26px', height: '100%' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${c}12`, border: `1px solid ${c}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><Icon size={24} color={c} /></div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 19, color: '#edf0ff', marginBottom: 10 }}>{t}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.7 }}>{d}</p>
            </div>
          </Reveal>
        )})}
      </div>
    </Section>
  )
}

/* ── 6. Results ──────────────────────────────────────── */
function Results() {
  const items = [
    { Icon: Inbox, t: 'Achieve up to 95% inbox placement' },
    { Icon: Gauge, t: 'Ensure consistent bulk email delivery at scale' },
    { Icon: MousePointerClick, t: 'Boost open and engagement rates' },
    { Icon: BarChart3, t: 'Improve sender scores across all ISPs' },
  ]
  return (
    <Section light>
      <Heading chip="What You Get" title="Results You Can Expect from Bulk Email Warmup" />
      <div className="bew-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {items.map(({ Icon, t }, i) => { const c = COLORS[i % 4]; return (
          <Reveal key={t}>
            <div className="card" style={{ padding: '32px 26px', height: '100%', textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: `${c}12`, border: `1px solid ${c}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Icon size={26} color={c} /></div>
              <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 16.5, lineHeight: 1.45, color: '#edf0ff' }}>{t}</p>
            </div>
          </Reveal>
        )})}
      </div>
    </Section>
  )
}

/* ── 7. Who we serve ─────────────────────────────────── */
function WhoWeServe() {
  const items = [
    { Icon: Rocket, t: 'Startups', d: 'Build a trusted sender reputation and ensure high inbox placement from day one of your bulk campaigns.' },
    { Icon: Megaphone, t: 'Marketers', d: 'Avoid spam filters and improve email deliverability while expanding your bulk outreach efforts.' },
    { Icon: Building2, t: 'Businesses', d: 'Recover from spam issues, boost open rates, and restore domain health with manual bulk warming.' },
    { Icon: Handshake, t: 'Sales Teams', d: "Increase response rates by ensuring bulk sales outreach lands in prospects' primary inbox." },
  ]
  return (
    <Section>
      <Heading chip="Who We Help" title="To Whom Do We Provide Bulk Email Warmup Services?" sub="No matter your industry, if bulk email outreach is part of your strategy, EvaWarm is your trusted partner." />
      <div className="bew-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {items.map(({ Icon, t, d }, i) => { const c = COLORS[i % 4]; return (
          <Reveal key={t}>
            <div className="card" style={{ padding: '32px 26px', height: '100%' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${c}12`, border: `1px solid ${c}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><Icon size={24} color={c} /></div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 19, color: '#edf0ff', marginBottom: 10 }}>{t}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.7 }}>{d}</p>
            </div>
          </Reveal>
        )})}
      </div>
    </Section>
  )
}

/* ── 8. Stats ────────────────────────────────────────── */
function Stats() {
  const s = [['5M Emails', 'Delivered in Inbox'], ['500+', 'Subscriptions'], ['2.4M Emails', 'Marked Not Spam']]
  return (
    <section className="stats-band" style={{ padding: '80px 32px' }}>
      <div className="bew-3" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, textAlign: 'center', position: 'relative' }}>
        {s.map(([v, l]) => (
          <Reveal key={l}>
            <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(34px, 4.4vw, 56px)', letterSpacing: -1.5, color: '#22d3ee' }}>{v}</div>
            <div style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', marginTop: 8 }}>{l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── 9. Clients marquee ──────────────────────────────── */
function Clients() {
  const clients = ['SEM', 'VJ Electronix', 'ITTdigital', 'LoginRadius', 'Mobius Technologies']
  const row = [...clients, ...clients, ...clients, ...clients]
  return (
    <Section light>
      <Heading chip="Trusted By" title="Our Clients" />
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
        <div className="animate-marquee" style={{ display: 'flex', gap: 24, width: 'max-content' }}>
          {row.map((c, i) => (
            <div key={i} className="bew-logo" style={{ minWidth: 220, height: 84, borderRadius: 16, background: CARD, border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 28px', fontFamily: 'Sora', fontWeight: 700, fontSize: 19, letterSpacing: -0.4, whiteSpace: 'nowrap' }}>{c}</div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── 10. Case studies ────────────────────────────────── */
function CaseBlock({ title, children, dark }: { title: string; children: ReactNode; dark?: boolean }) {
  const body: React.CSSProperties = { fontFamily: 'Inter', fontSize: 14.5, lineHeight: 1.7, color: dark ? '#c4d0ee' : '#6e7e9e' }
  return (
    <div style={dark ? { background: '#060b17', border: `1px solid ${LINE}`, borderRadius: 14, padding: '20px 22px' } : undefined}>
      <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 12.5, letterSpacing: 1.4, textTransform: 'uppercase', color: dark ? '#22d3ee' : '#0891b2', marginBottom: 8 }}>{title}</h4>
      <div style={body}>{children}</div>
    </div>
  )
}

function List({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return <Tag style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>{items.map(i => <li key={i}>{i}</li>)}</Tag>
}

function CaseCard({ Icon, title, children }: { Icon: typeof Mail; title: string; children: ReactNode }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 150 }}>
        <div style={{ background: `linear-gradient(135deg, ${DARK_INK}, #1e1b4b)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={56} color="#22d3ee" strokeWidth={1.4} /></div>
        <div style={{ background: '#06b6d4', display: 'flex', alignItems: 'center', padding: 24 }}>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, lineHeight: 1.15, color: DARK_INK, letterSpacing: -0.6 }}>{title}</h3>
        </div>
      </div>
      <div style={{ padding: '30px 30px 26px', display: 'flex', flexDirection: 'column', gap: 22, flex: 1 }}>{children}</div>
      <div style={{ background: '#111827', borderTop: `1px solid ${LINE}`, padding: '18px 30px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Logo height={24} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e' }}><Globe size={13} /> www.evawarm.com</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e' }}><MapPin size={13} style={{ marginTop: 3, flexShrink: 0 }} /> No. 158, Gulecha Tower, 2nd Floor, Arcot Rd, Vadapalani, Chennai, Tamil Nadu 600026</div>
      </div>
    </div>
  )
}

function CaseStudies() {
  return (
    <Section>
      <Heading chip="Proof" title="Case Studies" />
      <div className="bew-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'stretch' }}>
        <Reveal style={{ display: 'flex' }}>
          <CaseCard Icon={Target} title="Attentive Case Study">
            <CaseBlock title="Objectives">To achieve the highest open rate and generate a good number of leads. Also wanted to reduce the cost involved in domain purchase and automation software licenses.</CaseBlock>
            <CaseBlock title="About">A leading company that provides sales automation software for landscaping businesses to measure, estimate and produce proposals tried generating leads in the US. They chose outbound email marketing for lead generation as it gives good ROI.</CaseBlock>
            <CaseBlock dark title="Challenges"><List items={['Struggling to get a 30% or more open rate.', 'They were unable to increase the domain reputation.', "Client didn't know how to work with Catch all domains.", "They had to buy more domains to generate 15 leads a month as the open rate wasn't good."]} /></CaseBlock>
            <CaseBlock title="Solutions"><List items={['EvaWarm helped with custom manual warmup to increase domain reputation and whitelist promotional content.', 'Gave them volume strategy and the audience to be reached.', 'Reduced bounces from catch-all domains by validating and using the right strategy.']} /></CaseBlock>
            <CaseBlock title="Benefits"><List items={['Client achieved 70%+ avg open rate in just 6 weeks.', 'Got less than 2% bounces.', 'Able to generate 15 leads/month with fewer domains.', 'Generated 20% more revenue.']} /></CaseBlock>
          </CaseCard>
        </Reveal>
        <Reveal style={{ display: 'flex' }}>
          <CaseCard Icon={Mail} title="IDM Case Study">
            <CaseBlock title="About">A leading Online pharma company based in the US doing email marketing to existing customers. They also want to reach out to dormant customers and provide them with special discounts.</CaseBlock>
            <CaseBlock title="Objectives"><List items={['Reach 100K customers with minimum 15% open rate.', 'Prevent domain burn and improve conversion rate.', 'Maintain domain score above 80.']} /></CaseBlock>
            <CaseBlock dark title="Key Metrics Challenges"><List items={['Open rate was 2% to 5% resulting in fewer conversions.', 'Frequent domain burn (open rate falls to 0%).', 'Unaware of best practices like Authentication record update, Volume strategy, etc.']} /></CaseBlock>
            <CaseBlock title="Solution"><List ordered items={['Coordinated with client for initial domain email setup.', 'Segmented customers into two groups with a volume strategy.', 'Content curation done to increase deliverability.', 'Both automated and manual warm-up to increase domain authority.', 'Regular client support on issues, doubts, and new challenges.']} /></CaseBlock>
            <CaseBlock title="Benefits"><List items={['Maintained average open rate of 35%.', 'Order rate increased to 500%.', 'Generated 5% more revenue.', 'Manual email warmup increased domain score from 60 to 90+.']} /></CaseBlock>
          </CaseCard>
        </Reveal>
      </div>
    </Section>
  )
}

/* ── 11. Testimonials ────────────────────────────────── */
function Testimonials() {
  const items = [
    { n: 'Natarajan', r: 'Co-Founder, LeadWalut', img: 'https://evawarm.com/wp-content/uploads/2023/03/UIUX-1.png', q: 'With consultation from EvaWarm, we elevate our email marketing to the next level, resulting in improved open and response rates compared to previous campaigns.' },
    { n: 'Jonathan Rodger', r: 'Founder, Datyle', img: 'https://evawarm.com/wp-content/uploads/2023/03/1646383145662-1.jpeg', q: 'Sundar has worked tirelessly to generate quality contacts and new leads for Email Verify. I have always enjoyed working with him and have done so for years. I would recommend his services to anyone in the B2B space.' },
    { n: 'Ankur', r: 'Growth Marketer, Attentive', img: 'https://evawarm.com/wp-content/uploads/2023/03/UIUX-2.png', q: "For an extended period, we had poor open rates, even with utilizing some email warming services, but now we are seeing a good open rate of 65% thanks to EvaWarm's warm-up service." },
    { n: 'Greg Jordan', r: 'VP of Email Products & Technology, DemandScience', img: '', q: 'I have found Sundar to be very motivated and professional, he sets out to achieve his goals and I would highly recommend him as a marketing professional.' },
  ]
  return (
    <Section>
      <Heading chip="Testimonials" title="Loved by our Clients around the World" />
      <div className="bew-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {items.map(t => (
          <Reveal key={t.n}>
            <figure className="card-glass" style={{ padding: '32px 30px', height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
              <Quote size={28} color="#22d3ee" style={{ opacity: 0.7 }} />
              <blockquote style={{ fontFamily: 'Inter', fontSize: 16, lineHeight: 1.75, color: '#dbe4f8', flex: 1 }}>{t.q}</blockquote>
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {t.img
                  ? <img src={t.img} alt={t.n} loading="lazy" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', background: '#0d1424', border: '2px solid rgba(34,211,238,0.4)' }} />
                  : <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', color: '#fff', fontFamily: 'Sora', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.n.split(' ').map(w => w[0]).join('')}</div>}
                <div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#edf0ff' }}>{t.n}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e' }}>{t.r}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ── 12. FAQ ─────────────────────────────────────────── */
const faqs = [
  ['What is bulk email warmup?', 'Bulk email warmup is the process of gradually increasing the volume of emails sent from a new or inactive domain to establish a good sender reputation with email service providers before launching large-scale campaigns.'],
  ['How long does bulk email warmup take?', 'Bulk email warmup typically takes 2 to 8 weeks depending on the domain history, target sending volume, and email service provider limits.'],
  ['How is progress monitored?', 'Progress is tracked through open rates, reply rates, spam complaint rates, bounce rates, and domain reputation scores. You receive regular reports with real-time analytics.'],
  ['What volume can I achieve after warmup?', 'Depending on your domain age and warmup plan, most clients achieve reliable bulk sending of 10,000 to 100,000+ emails per day after a full warmup cycle.'],
  ['Can I use my existing email platform?', "Yes. EvaWarm's bulk warmup is compatible with Gmail, Outlook, SMTP-based platforms, and major ESPs like Mailchimp, SendGrid, and Instantly."],
  ['What happens if I skip bulk email warmup?', 'Skipping warmup leads to high bounce rates, spam folder placement, domain blacklisting, and potential account suspension by your ESP.'],
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section light>
      <Heading chip="Questions" title="FAQ" />
      <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqs.map(([q, a], i) => {
          const isOpen = open === i
          return (
            <div key={q} style={{ background: CARD, border: `1px solid ${isOpen ? 'rgba(34,211,238,0.35)' : LINE}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Sora', fontWeight: 600, fontSize: 16.5, color: '#edf0ff' }}>
                {q}
                {isOpen ? <Minus size={18} color="#0891b2" /> : <Plus size={18} color="#0891b2" />}
              </button>
              <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                <p style={{ fontFamily: 'Inter', fontSize: 15.5, lineHeight: 1.75, color: '#6e7e9e', padding: '0 24px 22px' }}>{a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export default function BulkEmailWarmupPage() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <About />
      <WhyEvaWarm />
      <Results />
      <WhoWeServe />
      <Stats />
      <Clients />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <style>{`
        .bew-logo { color: #6e7e9e; filter: grayscale(1); transition: color .25s, filter .25s; }
        .bew-logo:hover { color: #0891b2; filter: none; }
        .faq-answer.open { max-height: 400px; }
        @media (max-width: 1000px) {
          .bew-hero { grid-template-columns: 1fr !important; gap: 48px !important; padding-top: 56px !important; }
          .bew-2 { grid-template-columns: 1fr !important; }
          .bew-4 { grid-template-columns: 1fr 1fr !important; }
          .bew-3 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) { .bew-4 { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
