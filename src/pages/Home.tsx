import { useState, useEffect, useRef, type ReactNode } from 'react'
import React from 'react'
import { ArrowRight, CheckCircle2, SlidersHorizontal, BarChart3, Headphones, Mail, ShieldCheck, TrendingUp, Calendar, ChevronRight, ChevronLeft } from 'lucide-react'

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>(threshold = 0.14) {
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

function useCounter(target: number, suffix: string) {
  const [val, setVal] = useState('0' + suffix)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) { setStarted(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])
  useEffect(() => {
    if (!started) return
    const dur = 2200
    const t0 = performance.now()
    const raf = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target) + suffix)
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [started, target, suffix])
  return { val, ref }
}

// ─── Dashboard Mock ───────────────────────────────────────────────────────────

const CIRC = 2 * Math.PI * 48 // ≈ 301.59 for r=48 in 120×120 viewBox
const SCORE_OFFSET = CIRC * (1 - 0.943) // ≈ 17.2 — leaves 94.3% arc visible

const activity = [
  { time: '2m ago',  text: '3 warmup emails delivered to Gmail',     dot: '#4ade80' },
  { time: '18m ago', text: 'Inbox rate improved from 91% → 94.3%',  dot: '#22d3ee' },
  { time: '1h ago',  text: 'Domain reputation flagged as Trusted',   dot: '#a78bfa' },
]

function Dashboard() {
  return (
    <div className="animate-float" style={{ position: 'relative', width: '100%', maxWidth: 460 }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: -70, background: 'radial-gradient(ellipse 80% 80% at 40% 35%, rgba(6,182,212,0.13) 0%, rgba(139,92,246,0.07) 55%, transparent 75%)', pointerEvents: 'none' }} />

      {/* Main panel */}
      <div className="dash-panel">

        {/* App header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #0891b2 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BarChart3 size={14} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 12.5, color: '#edf0ff', lineHeight: 1.2 }}>Campaign Overview</div>
              <div style={{ fontFamily: 'Inter', fontSize: 10.5, color: '#3a4762', lineHeight: 1 }}>evawarm-demo.com</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(74,222,128,0.09)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 20, padding: '4px 11px' }}>
            <div className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ color: '#4ade80', fontSize: 11, fontFamily: 'Sora', fontWeight: 600, letterSpacing: 0.2 }}>Live</span>
          </div>
        </div>

        {/* Gauge + distribution */}
        <div style={{ display: 'grid', gridTemplateColumns: '116px 1fr', gap: 18, marginBottom: 18, alignItems: 'center' }}>
          {/* Circular gauge */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="112" height="112" viewBox="0 0 120 120" aria-label="Inbox score 94.3%">
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {/* Track */}
              <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              {/* Score arc */}
              <circle
                cx="60" cy="60" r="48" fill="none"
                stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${CIRC}`}
                strokeDashoffset={`${SCORE_OFFSET}`}
                transform="rotate(-90 60 60)"
                className="dash-arc"
              />
              <text x="60" y="54" textAnchor="middle" fill="#edf0ff" fontFamily="Sora" fontWeight="800" fontSize="21">94.3</text>
              <text x="60" y="67" textAnchor="middle" fill="#22d3ee" fontFamily="Sora" fontWeight="700" fontSize="10">%</text>
              <text x="60" y="80" textAnchor="middle" fill="#3a4762" fontFamily="Inter" fontSize="8" letterSpacing="1">INBOX</text>
            </svg>
          </div>

          {/* Distribution bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Primary Inbox', pct: 94, color: '#22d3ee', count: '189/201' },
              { label: 'Promotions',    pct: 4,  color: '#a78bfa', count: '8/201'   },
              { label: 'Spam',          pct: 2,  color: '#f87171', count: '4/201'   },
            ].map(({ label, pct, color, count }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#5a6a82', fontSize: 11, fontFamily: 'Inter', fontWeight: 500 }}>{label}</span>
                  <span style={{ color: '#c4d0ee', fontSize: 11, fontFamily: 'Sora', fontWeight: 600 }}>{count}</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, boxShadow: `0 0 6px ${color}55`, transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider-glow" style={{ margin: '16px 0' }} />

        {/* Warmup progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: '#5a6a82', fontSize: 11.5, fontFamily: 'Inter', fontWeight: 500 }}>Warmup Progress</span>
            <span style={{ color: '#22d3ee', fontSize: 11.5, fontFamily: 'Sora', fontWeight: 700 }}>Day 14 / 30</span>
          </div>
          <div style={{ height: 7, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
            <div className="prog-bar" style={{ width: '46%', height: '100%', borderRadius: 4 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ color: '#2a3550', fontSize: 9.5, fontFamily: 'Inter' }}>Day 1</span>
            <span style={{ color: '#2a3550', fontSize: 9.5, fontFamily: 'Inter' }}>Day 30</span>
          </div>
        </div>

        {/* Mini stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { l: 'Open Rate', v: '+31%',   color: '#4ade80' },
            { l: 'Bounce',    v: '0.8%',   color: '#f87171' },
            { l: 'Rep Score', v: '9.2/10', color: '#22d3ee' },
          ].map(({ l, v, color }) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '9px 10px' }}>
              <div style={{ color: '#3a4560', fontSize: 9.5, fontFamily: 'Inter', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 5 }}>{l}</div>
              <div style={{ color, fontSize: 14, fontFamily: 'Sora', fontWeight: 800 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: '11px 13px' }}>
          <div style={{ fontSize: 9.5, fontFamily: 'Sora', fontWeight: 700, color: '#2e3f58', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 9 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.dot, flexShrink: 0, boxShadow: `0 0 5px ${a.dot}80` }} />
                <span style={{ color: '#5a6a82', fontSize: 11, fontFamily: 'Inter', flex: 1, lineHeight: 1.3 }}>{a.text}</span>
                <span style={{ color: '#2a3550', fontSize: 10, fontFamily: 'Sora', fontWeight: 600, flexShrink: 0 }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <div style={{ position: 'absolute', top: -16, right: -12, background: 'linear-gradient(135deg, #0891b2, #7c3aed)', borderRadius: 12, padding: '7px 14px', fontFamily: 'Sora', fontWeight: 800, fontSize: 12, color: '#fff', boxShadow: '0 8px 24px rgba(6,182,212,0.38)', zIndex: 2, whiteSpace: 'nowrap' }}>
        +40% Open Rate
      </div>

      {/* Floating badge — bottom left */}
      <div style={{ position: 'absolute', bottom: 56, left: -18, background: 'rgba(10,20,40,0.92)', border: '1px solid rgba(16,185,129,0.28)', borderRadius: 11, padding: '7px 13px', fontFamily: 'Sora', fontWeight: 700, fontSize: 11, color: '#34d399', boxShadow: '0 8px 24px rgba(0,0,0,0.35)', zIndex: 2, backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
        <TrendingUp size={11} color="#34d399" />
        Sender Trust: Excellent
      </div>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export function Hero({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section className="mesh-hero page-texture" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 70, overflow: 'hidden', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">

          {/* Copy */}
          <div>
            <div className="h1-line-1" style={{ marginBottom: 28 }}>
              <span className="chip">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', display: 'inline-block', boxShadow: '0 0 6px #06b6d4' }} />
                500+ Senders Trust EvaWarm
              </span>
            </div>

            <h1 className="h1-line-2" style={{ fontFamily: 'Sora', fontWeight: 900, lineHeight: 1.04, letterSpacing: -2.5, marginBottom: 24 }}>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 4.8vw, 68px)', color: '#edf0ff' }}>Improve Email</span>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 4.8vw, 68px)' }} className="g-text">Deliverability</span>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 4.8vw, 68px)', color: '#edf0ff' }}>with Manual Warmup</span>
            </h1>

            <p className="hero-sub" style={{ color: '#6e7e9e', fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.78, fontFamily: 'Inter', maxWidth: 480, marginBottom: 36 }}>
              Ensure your emails land in inboxes, not spam folders. Increase deliverability, reduce bounces, and improve open rates with expert warmup services.
            </p>

            <div className="hero-cta" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="https://calendar.app.google/gt6J1J4rvFomHMgi8" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
                <Calendar size={15} />
                Schedule a Meeting
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" className="btn-ghost btn-lg">
                <Mail size={15} />
                karthiks@datadriven-services.com
              </a>
            </div>

            {/* Proof strip */}
            <div className="hero-cta" style={{ display: 'flex', gap: 32, marginTop: 40, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[
                ['500+', 'Happy Clients'],
                ['20M+', 'Emails Warmed'],
                ['40%',  'Spam Reduction'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ color: '#06b6d4', fontFamily: 'Sora', fontWeight: 900, fontSize: 24, letterSpacing: -0.5, lineHeight: 1.1 }}>{n}</div>
                  <div style={{ color: '#3a4762', fontFamily: 'Inter', fontSize: 12, marginTop: 3, letterSpacing: 0.2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard */}
          <div className="hero-dash" style={{ display: 'flex', justifyContent: 'center', paddingRight: 8 }}>
            <Dashboard />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { gap: 48px !important; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-dash { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-grid { gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Marquee ─────────────────────────────────────────────────────────────────

const clientLogos = [
  { name: 'StoryXpress',    src: '/logos/storyxpress.webp',    size: 48 },
  { name: 'Emailable',      src: '/logos/emailable.webp',      size: 48 },
  { name: 'TCL',            src: '/logos/tcl.webp',            size: 48 },
  { name: 'Increff',        src: '/logos/increff.webp',        size: 48 },
  { name: 'Maarga',         src: '/logos/maarga.webp',         size: 48 },
  { name: 'Nife',           src: '/logos/nife.webp',           size: 48 },
  { name: 'Demand Science', src: '/logos/demand-science.webp', size: 48 },
  { name: 'Studio 31',      src: '/logos/studio-31.webp',      size: 48 },
  { name: 'Connect',        src: '/logos/connect.webp',        size: 48 },
]

const LogoTag = ({ name, src, size = 36 }: { name: string; src: string; size?: number }) => (
  <div
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      marginRight: 20, flexShrink: 0,
      background: '#ffffff',
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: 12,
      padding: '12px 28px',
      height: 72,
      minWidth: 140,
      maxWidth: 200,
      transition: 'box-shadow 0.2s',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.boxShadow = 'none'
    }}
  >
    <img
      src={src}
      alt={name}
      loading="lazy"
      style={{ height: size, width: 'auto', maxWidth: 160, objectFit: 'contain', display: 'block' }}
    />
  </div>
)

export function Marquee() {
  return (
    <section style={{ background: '#0b1324', padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <p style={{ textAlign: 'center', color: '#3a4560', fontFamily: 'Inter', fontSize: 11.5, fontWeight: 600, letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 24 }}>
        Over 500+ Senders Trust EvaWarm
      </p>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg, #0b1324, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(-90deg, #0b1324, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div className="animate-marquee" style={{ display: 'flex', alignItems: 'center', width: 'max-content', padding: '4px 0' }}>
          {[...clientLogos, ...clientLogos].map((c, i) => <LogoTag key={i} name={c.name} src={c.src} size={c.size} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Why Partner ─────────────────────────────────────────────────────────────

const whyItems = [
  {
    color: '#06b6d4',
    Icon: CheckCircle2,
    title: 'Unmatched Expertise',
    desc: "Years of hands-on experience across email infrastructure, ISP relationships, and warmup protocols — distilled into a proven process.",
  },
  {
    color: '#f59e0b',
    Icon: SlidersHorizontal,
    title: 'Customized Solutions',
    desc: 'No cookie-cutter playbooks. Every warmup strategy is built around your domain history, sending volume, audience, and business goals.',
  },
  {
    color: '#8b5cf6',
    Icon: BarChart3,
    title: 'Transparent Results',
    desc: "Real-time dashboards and weekly reports so you always know exactly what's happening with your sender reputation and inbox placement.",
  },
  {
    color: '#06b6d4',
    Icon: Headphones,
    title: 'Dedicated Support',
    desc: "A dedicated deliverability expert — not a ticketing queue. Direct communication, fast turnaround, and a partner invested in your results.",
  },
]

function WhyCard({ color, Icon, title, desc }: { color: string; Icon: React.ElementType; title: string; desc: string }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="card reveal" style={{ padding: '32px 28px', position: 'relative', overflow: 'hidden', cursor: 'default' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 140, height: 140, background: `radial-gradient(circle at top right, ${color}10, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${color}20, transparent)`, pointerEvents: 'none' }} />
      <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}10`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'background 0.3s, box-shadow 0.3s' }}>
        <Icon size={24} color={color} strokeWidth={1.8} />
      </div>
      <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: '#edf0ff', marginBottom: 10, letterSpacing: -0.3 }}>{title}</h3>
      <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.78 }}>{desc}</p>
    </div>
  )
}

export function WhyPartner() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '110px 28px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>Why Partner With Us</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 16 }}>
            Built for Results,<br /><span className="g-text">Not Promises</span>
          </h2>
          <p style={{ color: '#6e7e9e', fontFamily: 'Inter', fontSize: 17, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Deep technical expertise + relentless focus on inbox placement, reputation, and ROI.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {whyItems.map(({ color, Icon, title, desc }) => <WhyCard key={title} color={color} Icon={Icon} title={title} desc={desc} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Who Benefits ────────────────────────────────────────────────────────────

const tabs = [
  {
    label: 'B2B Companies', icon: '🏢',
    heading: 'Fuel Your B2B Pipeline',
    body: "Cold outreach is the lifeblood of B2B growth. A compromised sender reputation kills pipeline before it starts. We ensure your prospecting sequences, SDR campaigns, and nurture flows consistently reach decision-makers' primary inboxes.",
    points: ['Domain warmup for new sending infrastructure', 'Outreach volume scaling without reputation loss', 'Sales sequence deliverability audits'],
    stat: { v: '3×', l: 'Avg pipeline growth' },
  },
  {
    label: 'Agencies & Startups', icon: '🚀',
    heading: 'Ship Fast, Land Reliably',
    body: 'Agencies managing multiple client domains and startups launching their first campaigns face the same challenge: establishing sender trust quickly. We build that trust systematically so you focus on growth, not firefighting.',
    points: ['Multi-domain warmup management', 'Rapid reputation building for new domains', 'White-label deliverability reporting'],
    stat: { v: '2 wks', l: 'Avg time to inbox-ready' },
  },
  {
    label: 'B2C Companies', icon: '🛍️',
    heading: 'Drive Revenue from Every Send',
    body: 'For B2C brands, email is still the highest-ROI channel — but only if it lands. Promotional, transactional, and lifecycle emails all require maintained sender reputation. We keep your list healthy and your inbox placement strong.',
    points: ['Promotional campaign deliverability tuning', 'Transactional email infrastructure audit', 'List hygiene and bounce reduction'],
    stat: { v: '65%', l: 'Avg open rate achieved' },
  },
  {
    label: 'Enterprises', icon: '🏛️',
    heading: 'Enterprise-Grade Reliability',
    body: 'Large-scale sending at enterprise volumes demands precision. Whether managing IP warming, migrating ESPs, or resolving ISP-level blocks, we operate at the complexity your business demands with senior-level expertise.',
    points: ['IP pool warming and management', 'ESP migration deliverability continuity', 'Postmaster and FBL monitoring'],
    stat: { v: '99.2%', l: 'Uptime / inbox placement' },
  },
]

export function WhoBenefits() {
  const [active, setActive] = useState(0)
  const headRef = useReveal<HTMLDivElement>()
  const t = tabs[active]

  return (
    <section className="mesh-alt" style={{ padding: '110px 28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip chip-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>Who Benefits</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Trusted Across Every<br /><span className="g-text">Business Model</span>
          </h2>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {tabs.map((tab, i) => (
            <button key={tab.label} onClick={() => setActive(i)} className={`tab-btn${i === active ? ' active' : ''}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, animation: 'hero-up 0.45s ease both' }} className="tab-content">
          <div style={{ background: '#0f1b30', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '8px 14px', marginBottom: 20 }}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span style={{ color: '#22d3ee', fontFamily: 'Sora', fontWeight: 700, fontSize: 14 }}>{t.label}</span>
            </div>
            <h3 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 26, color: '#edf0ff', marginBottom: 14, letterSpacing: -0.5 }}>{t.heading}</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#6e7e9e', lineHeight: 1.8, marginBottom: 26 }}>{t.body}</p>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <div style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 12, padding: '14px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 28, color: '#06b6d4' }}>{t.stat.v}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#3a4762' }}>{t.stat.l}</div>
              </div>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" style={{ flex: 1, justifyContent: 'center' }}>
                Talk to an Expert
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
            {t.points.map((pt, i) => (
              <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: '#0f1b30', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.2)', animation: `hero-up 0.5s ease both`, animationDelay: `${i * 0.1}s` }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#8896b3', lineHeight: 1.6 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .tab-content { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Stats (intentionally distinguished band) ─────────────────────────────────

const statItems = [
  { target: 500, suffix: '+',  label: 'Happy Clients',    sub: 'Across industries worldwide' },
  { target: 10,  suffix: 'K+', label: 'Inbox Warmups',    sub: 'Completed successfully'      },
  { target: 100, suffix: 'K+', label: 'Spam Resolved',    sub: 'Emails rescued from filters' },
  { target: 20,  suffix: 'M+', label: 'Emails Warmed',    sub: 'Total volume processed'      },
  { target: 40,  suffix: '%',  label: 'Spam Reduction',   sub: 'Average across all clients'  },
]

function StatItem({ target, suffix, label, sub }: typeof statItems[0]) {
  const { val, ref } = useCounter(target, suffix)
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 16px', position: 'relative', zIndex: 1 }}>
      <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(32px, 4vw, 54px)', letterSpacing: -2, lineHeight: 1 }} className="g-text-cyan">{val}</div>
      <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginTop: 8, marginBottom: 5 }}>{label}</div>
      <div style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>{sub}</div>
    </div>
  )
}

export function Stats() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section id="results" className="stats-band" style={{ padding: '90px 28px' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex', borderColor: 'rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.1)', color: '#c4b5fd' }}>Real Results</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Numbers That Speak<br /><span className="g-text">For Themselves</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {statItems.map((s, i) => (
            <div key={s.label} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <StatItem {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How We Work ─────────────────────────────────────────────────────────────

const steps = [
  { num: '01', color: '#06b6d4', title: 'Initial Consultation',    desc: 'We audit your email infrastructure, domain history, and sending patterns to understand where you stand and what your warmup strategy must achieve.' },
  { num: '02', color: '#8b5cf6', title: 'Warmup & Optimization',   desc: 'Structured manual warmup: progressively increasing volume, seeding positive engagement signals, and adjusting in real time based on ISP feedback.' },
  { num: '03', color: '#f59e0b', title: 'Performance Monitoring',  desc: 'Continuous monitoring across inbox placement, bounce rates, spam complaints, and sender score. We catch issues before they compound.' },
  { num: '04', color: '#10b981', title: 'Support & Iteration',     desc: 'Monthly reviews, proactive recommendations, and on-demand expertise. Your email program evolves — so does our support.' },
]

export function HowWeWork() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()
  return (
    <section id="how-we-work" style={{ padding: '110px 28px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="chip chip-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>How We Work</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            A Proven Process for<br /><span className="g-text">Lasting Deliverability</span>
          </h2>
        </div>
        <div ref={gridRef} className="reveal stagger steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 38, left: '12%', right: '12%', height: 1, background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #f59e0b, #10b981)', opacity: 0.22, pointerEvents: 'none', zIndex: 0 }} className="step-connector" />
          {steps.map(({ num, color, title, desc }) => (
            <div key={num} className="card" style={{ padding: '32px 22px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${color}12`, border: `1.5px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: `0 4px 18px ${color}18` }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 20, color }}>{num}</span>
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 16, color: '#edf0ff', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .steps-grid { grid-template-columns: 1fr 1fr !important; } .step-connector { display: none; } }
        @media (max-width: 540px) { .steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Services Preview ─────────────────────────────────────────────────────────

const svcPreview = [
  {
    color: '#06b6d4',
    Icon: Mail,
    title: 'Manual Email Warmup',
    desc: 'Human-driven warmup that mimics organic sending — not bots. We build genuine sender reputation with ISPs through real engagement.',
    stat: '94% inbox placement',
  },
  {
    color: '#f59e0b',
    Icon: ShieldCheck,
    title: 'Email Deliverability',
    desc: 'End-to-end deliverability consulting: authentication audits (SPF, DKIM, DMARC), blocklist removal, ISP feedback loop setup.',
    stat: '100K+ spam resolved',
  },
  {
    color: '#8b5cf6',
    Icon: TrendingUp,
    title: 'Outbound Email Marketing',
    desc: 'Strategy, sequences, and execution for outbound campaigns. From cold outreach to drip sequences, we ensure your message drives action.',
    stat: '65% avg open rate',
  },
]

function SvcCard({ color, Icon, title, desc, stat, navigate }: typeof svcPreview[0] & { navigate: (p: string) => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="card reveal"
      style={{ padding: '36px 28px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      onClick={() => navigate('services')}
      tabIndex={0}
      role="button"
      aria-label={`Learn about ${title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('services') }}
    >
      <div style={{ position: 'absolute', top: -20, right: -20, width: 150, height: 150, background: `radial-gradient(circle at top right, ${color}08, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}22, transparent)`, opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} className="svc-bottom-glow" />
      <div style={{ width: 56, height: 56, borderRadius: 14, background: `${color}10`, border: `1px solid ${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'background 0.25s, box-shadow 0.25s' }}>
        <Icon size={26} color={color} strokeWidth={1.8} />
      </div>
      <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 10, letterSpacing: -0.4 }}>{title}</h3>
      <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.78, marginBottom: 24 }}>{desc}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ background: `${color}10`, border: `1px solid ${color}25`, borderRadius: 20, padding: '5px 13px', color, fontFamily: 'Sora', fontWeight: 700, fontSize: 12 }}>{stat}</span>
        <span style={{ color: '#3a4762', fontFamily: 'Inter', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}>
          Learn more
          <ArrowRight size={12} />
        </span>
      </div>
    </div>
  )
}

export function ServicesPreview({ navigate }: { navigate: (p: string) => void }) {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section id="services" className="mesh-alt" style={{ padding: '110px 28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>Our Services</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 16 }}>
            Everything You Need to<br /><span className="g-text">Win the Inbox</span>
          </h2>
          <button onClick={() => navigate('services')} className="btn-ghost" style={{ display: 'inline-flex', marginTop: 8 }}>
            Explore All Services →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
          {svcPreview.map(s => <SvcCard key={s.title} {...s} navigate={navigate} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  { name: 'Jonathan Rodger', title: 'Founder', company: 'Datyle', initials: 'JR', color: '#06b6d4',
    quote: 'EvaWarm completely transformed our cold outreach. Before working with them, our emails were consistently landing in spam. Within 3 weeks of their manual warmup process, we were hitting 85%+ inbox placement. The transparency and communication throughout was excellent.', highlight: null },
  { name: 'Natarajan', title: 'Co-Founder', company: 'LeadWalut', initials: 'NT', color: '#8b5cf6',
    quote: "As a startup, we couldn't afford to waste budget on campaigns that never got seen. EvaWarm's customized approach meant our new domain was trusted from day one. Their understanding of ISP behavior and warmup timing is genuinely unmatched.", highlight: null },
  { name: 'Ankur', title: 'Growth Marketer', company: 'Attentive', initials: 'AK', color: '#f59e0b',
    quote: "After EvaWarm's full deliverability overhaul — warmup, authentication cleanup, and sequence optimization — we went from 22% to 65% open rates on our outbound campaigns. That's not incremental. That's a business transformation.", highlight: { v: '65%', l: 'Open Rate Achieved' } },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const headRef = useReveal<HTMLDivElement>()
  const t = testimonials[active]

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % testimonials.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="testimonials" style={{ padding: '110px 28px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 350, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip chip-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>Client Stories</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Results Our Clients<br /><span className="g-text">Actually Achieved</span>
          </h2>
        </div>

        <div key={active} style={{ background: '#0f1b30', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 'clamp(28px, 5vw, 48px)', boxShadow: '0 8px 40px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden', animation: 'hero-up 0.45s ease both' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, background: `radial-gradient(circle, ${t.color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div style={{ fontFamily: 'Georgia, serif', fontSize: 72, lineHeight: 0.5, color: `${t.color}22`, marginBottom: 20, userSelect: 'none' }}>"</div>

          <p style={{ fontFamily: 'Inter', fontSize: 'clamp(15px, 1.8vw, 18px)', color: '#c4d0ee', lineHeight: 1.82, marginBottom: 24, position: 'relative', zIndex: 1 }}>
            {t.quote}
          </p>

          {t.highlight && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: `${t.color}0a`, border: `1px solid ${t.color}22`, borderRadius: 12, padding: '14px 20px', marginBottom: 24 }}>
              <span style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 36, color: t.color }}>{t.highlight.v}</span>
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e' }}>{t.highlight.l}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}22, ${t.color}0a)`, border: `1.5px solid ${t.color}38`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: 14, color: t.color, flexShrink: 0 }}>
              {t.initials}
            </div>
            <div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#edf0ff' }}>{t.name}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#3a4762' }}>{t.title}, {t.company}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? '#06b6d4' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: i === active ? '0 0 8px rgba(6,182,212,0.4)' : 'none' }} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

export function FinalCTA({ navigate }: { navigate: (p: string) => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 28px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(6,182,212,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
        <div ref={ref} className="reveal gradient-border" style={{ background: '#0f1b30', borderRadius: 28, padding: 'clamp(40px, 6vw, 72px)', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.3)' }}>
          <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}>Ready to Scale?</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 4.5vw, 56px)', color: '#edf0ff', letterSpacing: -1.8, lineHeight: 1.06, marginBottom: 18 }}>
            Do You Want To Improve<br /><span className="g-text animate-gradient">Your Email Open Rate?</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 36px' }}>
            Join 500+ companies who stopped leaving inbox placement to chance. Let&apos;s build your deliverability together.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('contact')} className="btn-primary btn-lg">
              Contact Us
              <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate('services')} className="btn-ghost btn-lg">
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
