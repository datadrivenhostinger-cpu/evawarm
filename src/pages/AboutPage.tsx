import { ArrowLeft, Zap, Target, Users, Search, Shield, Activity } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import PageFAQ from '@/components/FAQ'

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
      minHeight: '56vh', display: 'flex', alignItems: 'center', paddingTop: 68,
      background: 'radial-gradient(ellipse 75% 70% at 12% 30%, rgba(139,92,246,0.12) 0%, transparent 56%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(6,182,212,0.09) 0%, transparent 52%), #060b17',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 32px', width: '100%', position: 'relative' }}>
        <button onClick={() => navigate('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '7px 14px', color: '#6e7e9e', fontFamily: 'Sora', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 32, transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#edf0ff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6e7e9e' }}
        >
          <ArrowLeft size={13} />
          Back to Home
        </button>
        <div style={{ maxWidth: 780, animation: 'hero-up 0.8s ease both' }}>
          <span className="chip chip-violet" style={{ marginBottom: 20, display: 'inline-flex' }}>Our Story</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#edf0ff', letterSpacing: -2.5, lineHeight: 1.03, marginBottom: 24 }}>
            About EvaWarm
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 'clamp(16px, 1.8vw, 20px)', color: '#6e7e9e', lineHeight: 1.75, maxWidth: 600 }}>
            We are a team of email deliverability experts dedicated to helping businesses land in the inbox, every single time.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Mission ──────────────────────────────────────────────────────────────────

function Mission() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '96px 32px', background: '#0b1324' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div ref={ref} className="about-grid reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Text */}
          <div>
            <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}>Our Mission</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#edf0ff', letterSpacing: -1.8, lineHeight: 1.08, marginBottom: 24 }}>
              Making Email Work<br /><span className="g-text">For Every Sender</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.85, marginBottom: 20 }}>
              EvaWarm was born out of a simple frustration: great emails going unseen. Too many businesses were losing revenue not because their offer was wrong, but because their emails landed in spam.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.85, marginBottom: 20 }}>
              We built EvaWarm to fix that. Our manual warmup and deliverability services are built around one principle: your emails deserve to be seen.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.85 }}>
              Today, we help over 500 senders, from solo founders to enterprise teams, consistently land in the primary inbox.
            </p>
          </div>
          {/* Stats panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { v: '500+', l: 'Senders Served', c: '#06b6d4' },
              { v: '5M+', l: 'Emails Delivered', c: '#8b5cf6' },
              { v: '95%', l: 'Avg Inbox Rate', c: '#f59e0b' },
              { v: '2.5M', l: 'Marked Not Spam', c: '#10b981' },
            ].map(({ v, l, c }) => (
              <div key={l} className="card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 34, color: c, letterSpacing: -1.5, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:800px){ .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  )
}

// ─── Values ───────────────────────────────────────────────────────────────────

const values: { icon: React.ElementType; title: string; desc: string; color: string }[] = [
  { icon: Zap,      title: 'Speed with Precision',   desc: 'We move fast without cutting corners. Every warmup campaign is executed with meticulous attention to detail, ISP guidelines, and your specific sending context.', color: '#f59e0b' },
  { icon: Target,   title: 'Results-Obsessed',        desc: "We don't celebrate activity, we celebrate outcomes. Inbox placement, open rates, and ROI are the only metrics that matter to us.", color: '#06b6d4' },
  { icon: Users,    title: 'True Partnership',         desc: "You get a dedicated expert, not a support queue. We embed ourselves in your email strategy and stay accountable to your goals every step of the way.", color: '#8b5cf6' },
  { icon: Search,   title: 'Radical Transparency',    desc: 'Real-time reporting, honest assessments, and clear communication. You always know exactly what we are doing and why.', color: '#10b981' },
  { icon: Shield,   title: 'Long-Term Thinking',      desc: "Quick fixes that damage your domain health are never an option. We build lasting sender reputation that compounds over time.", color: '#06b6d4' },
  { icon: Activity, title: 'Proven Process',           desc: 'Everything we do is grounded in ISP behavior data, years of warmup experience, and continuous refinement. No guesswork.', color: '#f59e0b' },
]

function Values() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '96px 32px', background: '#060b17' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-orange" style={{ marginBottom: 18, display: 'inline-flex' }}>Our Values</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#edf0ff', letterSpacing: -1.8, lineHeight: 1.08 }}>
            What We Stand For
          </h2>
        </div>
        <div ref={gridRef} className="vals-grid reveal stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {values.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card" style={{ padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right, ${color}10, transparent)`, pointerEvents: 'none' }} />
              <div style={{ width: 50, height: 50, borderRadius: 14, background: `${color}12`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Icon size={22} color={color} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .vals-grid { grid-template-columns: 1fr 1fr !important; } } @media(max-width:600px){ .vals-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Team ──────────────────────────────────────────────────────────────────────

function Team() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '96px 32px', background: '#0b1324' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip" style={{ marginBottom: 18, display: 'inline-flex' }}>The Team</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#edf0ff', letterSpacing: -1.8, lineHeight: 1.08, marginBottom: 16 }}>
            Experts Behind<br /><span className="g-text">Every Campaign</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Our team brings deep expertise in email infrastructure, ISP relationships, and deliverability science.
          </p>
        </div>

        {/* 4-member team grid */}
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>

          {/* Karthik, Founder */}
          <a href="https://www.linkedin.com/in/karthik-subramanian-55548349" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="card gradient-border" style={{ padding: '36px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', height: '100%', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(6,182,212,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(6,182,212,0.35)', margin: '0 auto 16px', position: 'relative', overflow: 'hidden', boxShadow: '0 0 0 4px rgba(6,182,212,0.08)' }}>
                <img src="/karthik.webp" alt="Karthik" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: '#edf0ff', marginBottom: 4 }}>Karthik</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: '#22d3ee', marginBottom: 12 }}>Founder & Lead Deliverability Expert</p>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', lineHeight: 1.7 }}>Years of hands-on expertise across email infrastructure, ISP relationships, and warmup protocols.</p>
              <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 5, color: '#0a66c2', fontFamily: 'Sora', fontSize: 11.5, fontWeight: 600 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </div>
            </div>
          </a>

          {/* Suganya */}
          <a href="https://www.linkedin.com/in/suganya-arumugam-b20a27121" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '36px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', height: '100%', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(139,92,246,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(139,92,246,0.35)', margin: '0 auto 16px', background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(6,182,212,0.12))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 4px rgba(139,92,246,0.07)' }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, color: '#a78bfa' }}>S</span>
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: '#edf0ff', marginBottom: 4 }}>Suganya</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: '#a78bfa', marginBottom: 12 }}>Email Warmup Strategist</p>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', lineHeight: 1.7 }}>Expert in email authentication, reputation monitoring, and inbox placement strategies.</p>
              <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 5, color: '#0a66c2', fontFamily: 'Sora', fontSize: 11.5, fontWeight: 600 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </div>
            </div>
          </a>

          {/* Dhana */}
          <a href="https://www.linkedin.com/in/dhanalakshmi-b-6986141a9/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '36px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', height: '100%', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(245,158,11,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(245,158,11,0.35)', margin: '0 auto 16px', background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(251,191,36,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 4px rgba(245,158,11,0.07)' }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, color: '#fbbf24' }}>D</span>
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: '#edf0ff', marginBottom: 4 }}>Dhana</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: '#fbbf24', marginBottom: 12 }}>Operations Lead</p>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', lineHeight: 1.7 }}>Focused on sender reputation growth, engagement simulation, and scalable warmup execution.</p>
              <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 5, color: '#0a66c2', fontFamily: 'Sora', fontSize: 11.5, fontWeight: 600 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </div>
            </div>
          </a>

          {/* Deepika */}
          <a href="https://www.linkedin.com/in/deepika-moorthi-0ab03b239" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '36px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', height: '100%', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(16,185,129,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(16,185,129,0.35)', margin: '0 auto 16px', background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(52,211,153,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 4px rgba(16,185,129,0.07)' }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, color: '#34d399' }}>D</span>
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: '#edf0ff', marginBottom: 4 }}>Deepika</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: '#34d399', marginBottom: 12 }}>Email Marketing Specialist</p>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', lineHeight: 1.7 }}>Ensures every client gets measurable results through clear communication and strategic follow-through.</p>
              <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 5, color: '#0a66c2', fontFamily: 'Sora', fontSize: 11.5, fontWeight: 600 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </div>
            </div>
          </a>

        </div>
        <style>{`
          @media(max-width:1100px){ .team-grid { grid-template-columns: 1fr 1fr !important; } }
          @media(max-width:600px){ .team-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function AboutCTA({ navigate }: { navigate: (p: string) => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 32px', background: '#060b17' }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 780, margin: '0 auto' }}>
        <div className="gradient-border" style={{ background: '#0f1b30', borderRadius: 24, padding: 'clamp(40px, 5vw, 72px)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.35)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <span className="chip" style={{ marginBottom: 20, display: 'inline-flex', position: 'relative' }}>Work With Us</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#edf0ff', letterSpacing: -1.8, lineHeight: 1.1, marginBottom: 18, position: 'relative' }}>
            Ready to Improve Your<br /><span className="g-text">Email Deliverability?</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', lineHeight: 1.72, maxWidth: 420, margin: '0 auto 36px', position: 'relative' }}>
            Let us show you what landing in the primary inbox can do for your business.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href="https://calendar.app.google/gt6J1J4rvFomHMgi8" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
              Schedule a Call
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

// ─── About FAQ ────────────────────────────────────────────────────────────────

const aboutFaqs = [
  { q: 'Who founded EvaWarm?', a: 'EvaWarm was founded by Karthik Subramanian, a veteran email deliverability expert with years of hands-on experience across ISP relationships, email infrastructure, and warmup protocols. The team has since grown with senior specialists across deliverability, outbound strategy, and client success.' },
  { q: 'What industries do you work with?', a: 'We work across B2B SaaS, e-commerce, agencies, financial services, healthcare, and enterprise sales teams. Any business that relies on email for pipeline, revenue, or communication can benefit from our services.' },
  { q: 'How is EvaWarm different from other deliverability services?', a: 'EvaWarm focuses exclusively on manual warmup and deliverability, it is not a side feature of a broader platform. Every engagement is handled by senior experts, not automated scripts, and we maintain direct accountability for your inbox placement outcomes.' },
  { q: 'Do you sign NDAs?', a: 'Yes. We are happy to sign NDAs before sharing any information about your email infrastructure or campaign strategy. Client confidentiality is a core operating principle.' },
  { q: 'What is your typical engagement process?', a: 'We start with a free consultation to assess your current setup. After that, we send a clear proposal with scope, timeline, and deliverables. Once aligned, we begin the warmup or deliverability work within 24-48 hours of kickoff.' },
]

// ─── AboutPage ────────────────────────────────────────────────────────────────

export default function AboutPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div>
      <PageHero navigate={navigate} />
      <Mission />
      <Values />
      <Team />
      <PageFAQ faqs={aboutFaqs} heading={'Questions About\nEvaWarm'} bg="#060b17" />
      <AboutCTA navigate={navigate} />
    </div>
  )
}
