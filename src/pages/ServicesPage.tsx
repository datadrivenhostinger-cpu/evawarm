import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, BarChart3, Headphones, Plus, Minus, Heart } from 'lucide-react'

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

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const faqs = [
  { q: 'How long does manual email warmup take?', a: 'Typically 3–6 weeks depending on your current domain age, sending history, and target volume. New domains require a full 4–6 week warmup while aged domains with minor reputation issues can recover in 2–3 weeks.' },
  { q: "What's the difference between manual and automated warmup?", a: "Automated warmup tools send emails between pools of fake accounts — ISPs are aware of this and largely discount these signals. Manual warmup uses real human interaction, real inbox engagement, and real sending patterns that ISPs actually trust and reward." },
  { q: 'Do I need warmup if I already have an established domain?', a: "Yes — if you're switching ESPs, scaling volume significantly, introducing a new sending domain, or recovering from blocklisting/deliverability issues, a warmup is essential regardless of domain age." },
  { q: 'How do I know if my deliverability is suffering?', a: 'Key indicators: declining open rates over multiple campaigns, high bounce rates (>3%), spam complaint rate above 0.1%, presence on blocklists, or inbox placement testing showing promotions/spam folder landing.' },
  { q: 'What authentication do I need before warmup begins?', a: 'At minimum: SPF record published, DKIM signatures active, DMARC policy set (even at p=none initially). We conduct a full authentication audit in the first consultation and remediate any gaps before warmup starts.' },
  { q: 'Can you work with our existing ESP/CRM?', a: 'Yes. We work with all major ESPs (HubSpot, Salesforce, Mailchimp, Instantly, Smartlead, Apollo, Outreach, Salesloft) and custom infrastructure. Our process is ESP-agnostic — we work within your existing setup.' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', textAlign: 'left', background: open ? 'rgba(6,182,212,0.05)' : '#0f1b30', border: 'none', padding: '20px 22px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, transition: 'background 0.25s' }}>
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#edf0ff' }}>{q}</span>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: open ? 'rgba(6,182,212,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${open ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.09)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s' }}>
          {open ? <Minus size={12} color="#06b6d4" /> : <Plus size={12} color="#6e7e9e" />}
        </div>
      </button>
      <div className={`faq-answer${open ? ' open' : ''}`}>
        <div style={{ padding: '0 22px 20px', color: '#6e7e9e', fontFamily: 'Inter', fontSize: 14, lineHeight: 1.8 }}>{a}</div>
      </div>
    </div>
  )
}

// ─── Service detail data ──────────────────────────────────────────────────────

const serviceDetails = [
  {
    id: 'svc-warmup', color: '#06b6d4', chip: 'Service 01',
    title: 'Manual Email Warmup',
    tagline: 'The Only Warmup That ISPs Actually Trust',
    description: "Automated warmup tools send emails between pools of fake accounts. ISPs know this, and they discount those signals. Manual warmup — real people, real engagement, real inbox activity — is what actually moves the needle on your sender reputation.",
    longDesc: "Our process begins with a deep audit of your current sending infrastructure, domain history, and target use case. We then execute a structured, progressive warmup schedule: starting at low volumes, seeding genuine opens and replies, avoiding spam triggers, and scaling systematically over 3–6 weeks.",
    stats: [{ v: '94%', l: 'Avg inbox placement after warmup' }, { v: '3–6 wks', l: 'Typical warmup duration' }, { v: '0.1%', l: 'Target spam complaint rate' }],
    features: [
      { t: 'Full Infrastructure Audit', d: 'Authentication checks (SPF, DKIM, DMARC), IP reputation, domain age assessment, and ESP configuration review before warmup begins.' },
      { t: 'Volume Scaling Protocol', d: 'Structured daily volume increments calibrated to your domain history and target sending volume, preventing ISP anomaly detection.' },
      { t: 'Engagement Signal Seeding', d: 'Real opens, replies, saves, and unsubscribes in the right ratios — teaching ISPs that your emails are wanted.' },
      { t: 'Real-Time ISP Monitoring', d: 'Continuous monitoring of Google Postmaster, Microsoft SNDS, and major blocklist feeds. Issues are caught before they escalate.' },
      { t: 'Weekly Progress Reports', d: 'Clear, non-technical reporting on inbox placement rates, reputation scores, and warmup milestones — every week, without asking.' },
      { t: 'Post-Warmup Guidance', d: 'After warmup completes, we provide a detailed handoff: safe sending volumes, list hygiene protocols, and ongoing maintenance recommendations.' },
    ],
    result: { name: 'Ankur', company: 'Attentive', quote: "After their warmup, we went from 22% to 65% open rates. That's not incremental — that's transformational.", stat: '65% open rate' },
  },
  {
    id: 'svc-deliverability', color: '#f59e0b', chip: 'Service 02',
    title: 'Email Deliverability Consulting',
    tagline: 'Fix the Root Cause. Not Just the Symptom.',
    description: "Declining open rates, mysterious bounces, spam folder landing — these are symptoms of underlying deliverability issues. We diagnose the root cause and fix it systematically: authentication gaps, blocklist presence, reputation damage, or infrastructure misconfiguration.",
    longDesc: "Email deliverability is an infrastructure problem before it's a content problem. Most teams focus on subject lines while their SPF records are broken, DMARC policy is missing, and their IP is on five blocklists. We start where the real issues live.",
    stats: [{ v: '100K+', l: 'Spam emails resolved' }, { v: '48 hrs', l: 'Avg blocklist removal time' }, { v: '2.1%', l: 'Target avg bounce rate' }],
    features: [
      { t: 'Authentication Audit & Remediation', d: 'Complete SPF, DKIM, and DMARC review. We identify gaps, misconfigurations, and alignment issues — then fix them with step-by-step implementation.' },
      { t: 'Blocklist Identification & Removal', d: 'Systematic scan across 50+ major blocklists. Direct outreach and removal requests handled on your behalf.' },
      { t: 'Inbox Placement Testing', d: 'Multi-ISP inbox placement tests across Gmail, Outlook, Yahoo, and corporate mail servers using seed account networks.' },
      { t: 'ISP Feedback Loop Setup', d: 'Google Postmaster Tools, Microsoft SNDS, and major FBL enrollment to give you visibility into your reputation at the ISP level.' },
      { t: 'List Hygiene & Validation', d: 'Email validation, bounce cleanup, and engagement-based segmentation to remove toxic contacts dragging down your sender score.' },
      { t: 'Ongoing Reputation Monitoring', d: 'Monthly deliverability health reports with actionable recommendations. We monitor so issues are caught before campaigns are affected.' },
    ],
    result: { name: 'Natarajan', company: 'LeadWalut', quote: "Our new domain was trusted from day one. Their understanding of ISP behavior is genuinely unmatched.", stat: '85%+ inbox rate' },
  },
  {
    id: 'svc-outbound', color: '#8b5cf6', chip: 'Service 03',
    title: 'Outbound Email Marketing',
    tagline: 'Sequences That Start Conversations, Not Delete-Fests.',
    description: "Great outbound email is equal parts strategy, copy, and deliverability. We bring all three. From cold outreach sequences to drip campaigns, we build programs that reach your audience and compel them to respond.",
    longDesc: "Most outbound fails not because the product is bad — but because the email never gets read. We solve the infrastructure problem first (warmup, authentication, deliverability), then layer in proven messaging strategy.",
    stats: [{ v: '65%', l: 'Avg open rate achieved' }, { v: '3×', l: 'Avg pipeline growth' }, { v: '12%', l: 'Avg reply rate on optimized sequences' }],
    features: [
      { t: 'Cold Email Strategy', d: 'ICP definition, message-market fit analysis, and send strategy design. We identify what to say, to whom, and in what sequence before writing a word.' },
      { t: 'Sequence Copywriting', d: "Emails written for humans, not algorithms. Direct, specific, value-forward copy that respects the reader's time and earns a reply." },
      { t: 'Multi-Touch Cadence Design', d: 'Follow-up sequences engineered for conversion — the right number of touches, right spacing, right escalation logic, and clean exit conditions.' },
      { t: 'A/B Testing & Optimization', d: 'Systematic testing of subject lines, openers, value props, and CTAs. Continuous improvement cycles based on real send data.' },
      { t: 'Deliverability-First Execution', d: 'Every sequence built with deliverability baked in: volume pacing, spam-trigger avoidance, bounce rate management, and unsubscribe handling.' },
      { t: 'Campaign Reporting & Analysis', d: 'Weekly campaign performance reports: open, click, reply, and conversion rates by sequence step. No vanity metrics — only what drives decisions.' },
    ],
    result: { name: 'Jonathan Rodger', company: 'Datyle', quote: "Within 3 weeks we were hitting 85%+ inbox placement and open rates we hadn't seen in years.", stat: '3× pipeline growth' },
  },
]

// ─── Page Hero ────────────────────────────────────────────────────────────────

function PageHero({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section style={{
      minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: 70,
      background:
        'radial-gradient(ellipse 70% 60% at 15% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 55% 55% at 88% 10%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 50% 90%, rgba(245,158,11,0.06) 0%, transparent 50%), #060b17',
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
          <span className="chip" style={{ marginBottom: 18, display: 'inline-flex' }}>Expert Email Services</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.05, marginBottom: 22, animation: 'hero-up 0.8s ease both' }}>
            Our Services
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 18, color: '#6e7e9e', lineHeight: 1.75, maxWidth: 580, marginBottom: 12, animation: 'hero-up 0.8s ease both', animationDelay: '0.12s' }}>
            EvaWarm improves email deliverability with protective measures — directing your emails away from spam and into the inbox where they belong.
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#5a6a86', lineHeight: 1.7, maxWidth: 560, marginBottom: 36, animation: 'hero-up 0.8s ease both', animationDelay: '0.22s' }}>
            Three focused services. One goal: your emails land in the inbox, every time. From warmup to deliverability consulting to full outbound execution.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36, animation: 'hero-up 0.8s ease both', animationDelay: '0.32s' }}>
            {[['Manual Warmup', '#svc-warmup', '#06b6d4'], ['Deliverability', '#svc-deliverability', '#f59e0b'], ['Outbound', '#svc-outbound', '#8b5cf6']].map(([label, href, col]) => (
              <a key={href} href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `${col}10`, border: `1px solid ${col}25`, borderRadius: 9, padding: '9px 18px', color: col, fontFamily: 'Sora', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${col}20`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${col}10`}
              >
                {label}
              </a>
            ))}
          </div>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" className="btn-primary" style={{ animation: 'hero-up 0.8s ease both', animationDelay: '0.42s' }}>
            Request a Call Back
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Deliverability Intro ─────────────────────────────────────────────────────

function DeliverabilityIntro() {
  const ref = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  const howPoints = [
    'Understanding customer deliverability needs end-to-end',
    'Strategic planning in consulting to design the right warmup approach',
    'Comprehensive analysis, auditing, and monitoring of email practices',
    'Manual warmup maintenance with weekly reporting on progress',
    'Achieving strong open rates and sender reputation via in-depth metrics',
  ]

  return (
    <section style={{ padding: '90px 28px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 500, height: 400, background: 'radial-gradient(ellipse at top right, rgba(6,182,212,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={ref} className="reveal svc-intro-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span className="chip" style={{ marginBottom: 18, display: 'inline-flex' }}>Email Deliverability Consultant</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 20 }}>
              Deliverability Is<br /><span className="g-text">The Soul of Email</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.8, marginBottom: 16 }}>
              Deliverability is the soul of the mailing process — connecting inbox landing to the overall email workflow. Without it, even the most compelling message never gets read.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#5a6a86', lineHeight: 1.75 }}>
              EvaWarm improves email deliverability with protective measures, optimizing content and delivery settings to improve your inbox placement and campaign ROI.
            </p>
          </div>

          <div ref={listRef} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: '#3a4762', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>How We Solve Challenges</h3>
            {howPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, padding: '16px 18px', background: '#0f1b30', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 13, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <CheckCircle2 size={11} color="#06b6d4" strokeWidth={2} />
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#8896b3', lineHeight: 1.65 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .svc-intro-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Sticky Service Nav ───────────────────────────────────────────────────────

function ServiceNav() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = serviceDetails.map(s => s.id)
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { threshold: 0.4 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return (
    <div style={{ position: 'sticky', top: 70, zIndex: 50, background: 'rgba(7,12,24,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {serviceDetails.map(({ id, color, title }) => (
          <a key={id} href={`#${id}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '15px 22px', fontFamily: 'Sora', fontWeight: 600, fontSize: 14, color: active === id ? color : '#5a6a86', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.2s', borderBottom: `2px solid ${active === id ? color : 'transparent'}` }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, opacity: active === id ? 1 : 0.3 }} />
            {title}
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Service Section ──────────────────────────────────────────────────────────

function ServiceSection({ detail }: { detail: typeof serviceDetails[0] }) {
  const headRef = useReveal<HTMLDivElement>()
  const featRef = useReveal<HTMLDivElement>()
  const { color, chip, title, tagline, description, longDesc, stats, features, result } = detail

  return (
    <section id={detail.id} style={{ padding: '100px 28px', background: '#060b17', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 85% 25%, ${color}06 0%, transparent 55%)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>

        {/* Header + stats */}
        <div ref={headRef} className="reveal svc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginBottom: 64, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${color}10`, border: `1px solid ${color}25`, borderRadius: 24, padding: '5px 14px', marginBottom: 18 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
              <span style={{ color, fontFamily: 'Inter', fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>{chip}</span>
            </div>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(24px, 3.2vw, 44px)', color: '#edf0ff', letterSpacing: -1.2, lineHeight: 1.08, marginBottom: 12 }}>{title}</h2>
            <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 17, color, marginBottom: 16, lineHeight: 1.4 }}>{tagline}</p>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#8896b3', lineHeight: 1.8, marginBottom: 14 }}>{description}</p>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#5a6a86', lineHeight: 1.8, marginBottom: 28 }}>{longDesc}</p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" className="btn-primary" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 18px ${color}30` }}>
              Get Started with {title.split(' ')[0]}
            </a>
          </div>

          <div>
            {/* Stat row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
              {stats.map(({ v, l }) => (
                <div key={l} style={{ background: '#0f1b30', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px 14px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 22, color, letterSpacing: -1 }}>{v}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 11, color: '#3a4762', lineHeight: 1.5, marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>
            {/* Quote */}
            <div style={{ background: '#0f1b30', border: `1px solid ${color}20`, borderRadius: 16, padding: '22px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 48, lineHeight: 0.5, color: `${color}20`, marginBottom: 14, userSelect: 'none' }}>"</div>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#8896b3', lineHeight: 1.75, marginBottom: 16, fontStyle: 'italic' }}>{result.quote}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: '#edf0ff' }}>{result.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#3a4762' }}>{result.company}</div>
                </div>
                <div style={{ background: `${color}10`, border: `1px solid ${color}25`, borderRadius: 8, padding: '6px 12px' }}>
                  <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 14, color }}>{result.stat}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div ref={featRef} className="reveal">
          <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 20 }}>What&apos;s Included</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }} className="stagger">
            {features.map(({ t, d }) => (
              <div key={t} className="reveal" style={{ display: 'flex', gap: 13, padding: '18px 16px', background: '#0f1b30', border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 13, boxShadow: '0 2px 10px rgba(0,0,0,0.2)', transition: 'border-color 0.22s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}28`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
              >
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: '#edf0ff', marginBottom: 4 }}>{t}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#6a7a96', lineHeight: 1.7 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .svc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Why EvaWarm ─────────────────────────────────────────────────────────────

const whyFeatures = [
  { color: '#06b6d4', Icon: ShieldCheck,  title: 'Deliverability', desc: 'Customized recommendations for inbox placement — tailored to your domain history, sending patterns, and target audience.' },
  { color: '#f59e0b', Icon: BarChart3,    title: 'Scalability',    desc: "Our platform improves sender reputation to 2X — systematically scaling your sending volume without triggering ISP flags." },
  { color: '#8b5cf6', Icon: CheckCircle2, title: 'Expertise',      desc: 'In-depth analysis of your mailing strategy and tooling for inbox delivery — senior-level expertise, not a generic playbook.' },
  { color: '#10b981', Icon: Headphones,   title: '24/7 Support',   desc: 'Continuous expert guidance at every step — a dedicated expert, not a ticketing queue, available whenever you need us.' },
]

function WhyEvaWarm() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 28px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 450, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex' }}>Why EvaWarm</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 18 }}>
            Optimization of Content &amp;<br /><span className="g-text">Delivery Settings</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            We optimize every layer of your email program — content, sending infrastructure, and delivery settings — to improve deliverability and campaign ROI.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {whyFeatures.map(({ color, Icon, title, desc }) => (
            <div key={title} className="card" style={{ padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${color}0e, transparent)`, pointerEvents: 'none' }} />
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${color}10`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <Icon size={26} color={color} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

function ServiceFAQ() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '90px 28px', background: '#060b17' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex' }}>FAQ</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(24px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.2, lineHeight: 1.1 }}>
            Common Questions,<br /><span className="g-text">Straight Answers</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Happy Clients Closing ────────────────────────────────────────────────────

function HappyClients({ navigate }: { navigate: (p: string) => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '90px 28px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
        <div ref={ref} className="reveal" style={{ textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <Heart size={32} color="#06b6d4" strokeWidth={1.8} />
          </div>
          <span className="chip chip-orange" style={{ marginBottom: 20, display: 'inline-flex' }}>Client Happiness</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 4.5vw, 56px)', color: '#edf0ff', letterSpacing: -1.8, lineHeight: 1.06, marginBottom: 14 }}>
            We Strive to Make Our<br /><span className="g-text">Clients Happy</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 19, color: '#6e7e9e', lineHeight: 1.65, maxWidth: 440, margin: '0 auto 36px' }}>
            So, let&apos;s be happy together.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <button onClick={() => navigate('testimonials')} className="btn-primary btn-lg">
              Meet Our Clients
              <ArrowRight size={14} />
            </button>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" className="btn-ghost btn-lg">
              Contact Us
            </a>
          </div>

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }} className="happy-stats">
            {[['500+', 'Happy Clients'], ['20M+', 'Emails Warmed'], ['65%', 'Avg Open Rate']].map(([v, l], i) => (
              <div key={l} style={{ padding: '28px 20px', textAlign: 'center', background: '#0f1b30' }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 32, letterSpacing: -1.5 }} className="g-text">{v}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#5a6a86', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:600px){ .happy-stats { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function ServiceCTA() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 28px', background: '#060b17' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div ref={ref} className="reveal gradient-border" style={{ background: '#0f1b30', borderRadius: 26, padding: 'clamp(36px, 5vw, 64px)', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <span className="chip" style={{ marginBottom: 18, display: 'inline-flex', position: 'relative' }}>Start Today</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16, position: 'relative' }}>
            Ready to Land in the<br /><span className="g-text">Primary Inbox?</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px', position: 'relative' }}>
            Tell us about your current email setup and goals. We&apos;ll respond within 24 hours with a personalized assessment.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" className="btn-primary btn-lg">
              Contact karthiks@datadriven-services.com
            </a>
            <a href="https://calendar.app.google/gt6J1J4rvFomHMgi8" target="_blank" rel="noopener noreferrer" className="btn-ghost btn-lg">
              Schedule a Free Call
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ServicesPage ─────────────────────────────────────────────────────────────

export default function ServicesPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div>
      <PageHero navigate={navigate} />
      <DeliverabilityIntro />
      <ServiceNav />
      {serviceDetails.map(d => <ServiceSection key={d.id} detail={d} />)}
      <WhyEvaWarm />
      <ServiceFAQ />
      <HappyClients navigate={navigate} />
      <ServiceCTA />
    </div>
  )
}
