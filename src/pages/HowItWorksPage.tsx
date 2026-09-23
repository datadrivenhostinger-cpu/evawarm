import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { ArrowLeft, Calendar, Mail, BarChart3, Users, TrendingUp, CheckCircle2, ShieldCheck, Eye, Heart, Plus, Minus } from 'lucide-react'

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
      minHeight: '58vh', display: 'flex', alignItems: 'center', paddingTop: 70,
      background:
        'radial-gradient(ellipse 70% 65% at 12% 30%, rgba(6,182,212,0.13) 0%, transparent 58%), radial-gradient(ellipse 55% 50% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), radial-gradient(ellipse 50% 50% at 55% 92%, rgba(245,158,11,0.06) 0%, transparent 50%), #060b17',
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
        <div style={{ maxWidth: 780 }}>
          <span className="chip" style={{ marginBottom: 18, display: 'inline-flex' }}>Email Warmup Service</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(34px, 5.2vw, 70px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.05, marginBottom: 22, animation: 'hero-up 0.8s ease both' }}>
            How It Works
          </h1>
          <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.4, marginBottom: 16, animation: 'hero-up 0.8s ease both', animationDelay: '0.1s' }} className="g-text">
            Improve Your Email Deliverability with Our Warmup Service
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', lineHeight: 1.78, maxWidth: 600, marginBottom: 36, animation: 'hero-up 0.8s ease both', animationDelay: '0.2s' }}>
            Boost your sender score and ensure your emails land in inboxes rather than spam. Our manual warmup approach improves deliverability, builds reputation, and increases engagement — through real human interaction, not bots.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'hero-up 0.8s ease both', animationDelay: '0.32s' }}>
            <a href="https://calendar.app.google/gt6J1J4rvFomHMgi8" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Meeting
              <Calendar size={14} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" className="btn-ghost">
              Get Your Free Audit Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Why Email Warmup Is Crucial ─────────────────────────────────────────────

const whyFeatures = [
  { color: '#06b6d4', Icon: Mail,         title: 'Improves Deliverability',    desc: 'Emails are far more likely to reach inboxes rather than land in the spam folder when your domain has been properly warmed up.' },
  { color: '#8b5cf6', Icon: ShieldCheck,  title: 'Builds Domain Reputation',   desc: 'Gradual, consistent warmup builds sustained trust with email service providers — establishing your domain as a credible sender.' },
  { color: '#f59e0b', Icon: Users,        title: 'Natural Engagement',          desc: "Our warmup mimics real human behavior — emails opened, replied to, forwarded — sending ISPs the right trust signals about your domain." },
  { color: '#10b981', Icon: TrendingUp,   title: 'High-Volume Sending',         desc: 'Once a strong reputation is established, you can safely scale to high sending volumes without triggering spam filters or throttling.' },
  { color: '#06b6d4', Icon: CheckCircle2, title: 'Enhances Email Success',      desc: "Consistent, authentic email engagement builds ESP credibility over time — directly improving your campaign open rates and conversions." },
  { color: '#8b5cf6', Icon: ShieldCheck,  title: 'Avoids Blacklisting',         desc: 'Proper warmup significantly reduces the risk of your domain being flagged or blacklisted by major ISPs and email service providers.' },
]

function WhyWarmup() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 28px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>Why Manual Warmup?</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 18 }}>
            Why Email Warmup<br /><span className="g-text">Is Crucial</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', maxWidth: 560, margin: '0 auto', lineHeight: 1.72 }}>
            AI algorithms are highly intelligent — manual warmup signals human behavior, improving sender reputation. It is an implicit way to boost email deliverability and raise open rates.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {whyFeatures.map(({ color, Icon, title, desc }) => (
            <div key={title} className="card" style={{ padding: '32px 26px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 110, height: 110, background: `radial-gradient(circle at top right, ${color}10, transparent)`, pointerEvents: 'none' }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}10`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Icon size={24} color={color} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: '#edf0ff', marginBottom: 9 }}>{title}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7-Step Process ───────────────────────────────────────────────────────────

const steps = [
  { num: '01', color: '#06b6d4', Icon: Mail,         title: 'Personalized Email Interactions',  desc: 'We send and reply to emails through real, verified accounts — genuine human interaction that ISPs recognize and trust, not automated bot activity.' },
  { num: '02', color: '#8b5cf6', Icon: BarChart3,    title: 'Controlled Volume Increase',       desc: 'Sending volume scales gradually day by day — carefully calibrated to your domain history and target volume to avoid triggering spam detection spikes.' },
  { num: '03', color: '#f59e0b', Icon: Heart,        title: 'Engagement Simulation',            desc: 'Emails are opened, marked as important, and replied to with natural conversational responses — teaching ISPs that your emails are wanted and valued.' },
  { num: '04', color: '#10b981', Icon: ShieldCheck,  title: 'Domain Reputation Enhancement',   desc: 'Consistent, human-driven interactions steadily improve your domain reputation with all major ISPs — building the trust that ensures inbox delivery.' },
  { num: '05', color: '#06b6d4', Icon: Eye,          title: 'Continuous SPAM Monitoring',      desc: 'We actively monitor your domain health throughout the warmup — maintaining a low spam score and catching any issues before they affect deliverability.' },
  { num: '06', color: '#8b5cf6', Icon: BarChart3,    title: 'Real-Time Analytics',              desc: 'You receive regular updates on deliverability rates, engagement scores, and sender reputation — clear visibility into the progress of your warmup.' },
  { num: '07', color: '#f59e0b', Icon: CheckCircle2, title: 'Ensuring Compliance & Credibility', desc: 'Our manual approach avoids automation red flags entirely — keeping your sending practices compliant, credible, and trusted by ESPs long term.' },
]

function ProcessSteps() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section id="process" style={{ padding: '100px 28px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -60, right: -60, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>The Process</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 18 }}>
            How Our Manual Email<br /><span className="g-text">Warmup Service Works</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', maxWidth: 540, margin: '0 auto', lineHeight: 1.72 }}>
            A structured 7-step process built around real human interaction — the only warmup method ISPs genuinely trust.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {steps.map(({ num, color, title, desc, Icon }, i) => {
            const isEven = i % 2 === 1
            return (
              <StepRow key={num} num={num} color={color} title={title} desc={desc} Icon={Icon} reverse={isEven} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StepRow({ num, color, title, desc, Icon, reverse }: {
  num: string; color: string; title: string; desc: string; Icon: React.ElementType; reverse: boolean
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="reveal step-row" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 64px 1fr',
      gap: 0,
      alignItems: 'center',
    }}>
      {/* Left slot */}
      <div style={{ padding: reverse ? '0 0 0 32px' : '0 32px 0 0', order: reverse ? 3 : 1 }}>
        {!reverse && (
          <div className="card" style={{ padding: '32px 28px' }}>
            <StepContent num={num} color={color} title={title} desc={desc} Icon={Icon} />
          </div>
        )}
      </div>

      {/* Center spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', order: 2, position: 'relative' }}>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, transparent, ${color}40)`, marginBottom: 0 }} />
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${color}14`, border: `2px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 24px ${color}20`, zIndex: 1, position: 'relative' }}>
          <span style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 16, color }}>{num}</span>
        </div>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${color}40, transparent)`, marginTop: 0 }} />
      </div>

      {/* Right slot */}
      <div style={{ padding: reverse ? '0 32px 0 0' : '0 0 0 32px', order: reverse ? 1 : 3 }}>
        {reverse && (
          <div className="card" style={{ padding: '32px 28px' }}>
            <StepContent num={num} color={color} title={title} desc={desc} Icon={Icon} />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .step-row { grid-template-columns: 48px 1fr !important; }
          .step-row > div:nth-child(1) { display: none !important; }
          .step-row > div:nth-child(2) { order: 1 !important; }
          .step-row > div:nth-child(3) { order: 2 !important; padding: 0 0 0 16px !important; }
          .step-row > div:nth-child(3) > div { display: block !important; }
        }
      `}</style>
    </div>
  )
}

function StepContent({ num: _num, color, title, desc, Icon }: {
  num: string; color: string; title: string; desc: string; Icon: React.ElementType
}) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ width: 46, height: 46, borderRadius: 13, background: `${color}12`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={22} color={color} strokeWidth={1.8} />
      </div>
      <div>
        <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: '#edf0ff', marginBottom: 8, letterSpacing: -0.3 }}>{title}</h3>
        <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Results You Can Expect ───────────────────────────────────────────────────

const results = [
  { color: '#06b6d4', v: 'Up to 95%', label: 'Inbox Placement', desc: 'Achieve up to 95% inbox placement — your emails consistently reaching the primary inbox, not promotions or spam.' },
  { color: '#8b5cf6', v: 'Consistent', label: 'Cold Email Delivery', desc: 'Ensure consistent cold email delivery across every campaign — no more mysterious bounce spikes or disappearing open rates.' },
  { color: '#f59e0b', v: 'Boosted', label: 'Open & Engagement Rates', desc: 'Boost open and engagement rates across your campaigns as your domain reputation grows and ISP trust solidifies.' },
  { color: '#10b981', v: 'Improved', label: 'Sender Scores Across ISPs', desc: 'Improve sender scores across all major ISPs simultaneously — Gmail, Outlook, Yahoo, and corporate mail servers.' },
]

function ResultsSection() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 28px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex' }}>Outcomes</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Results You Can<br /><span className="g-text">Expect</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {results.map(({ color, v, label, desc }) => {
            const ref = useReveal<HTMLDivElement>()
            return (
              <div key={label} ref={ref} className="card reveal" style={{ padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 130, height: 130, background: `radial-gradient(circle, ${color}0c 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 3vw, 38px)', letterSpacing: -1.5, marginBottom: 8, lineHeight: 1 }} className="g-text">{v}</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color, marginBottom: 12 }}>{label}</div>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Who We Serve ─────────────────────────────────────────────────────────────

const audiences = [
  {
    color: '#06b6d4',
    emoji: '🚀',
    title: 'Startups',
    benefit: 'Build trusted sender reputation from day one',
    desc: "Starting fresh means building your sending reputation from zero. We give startups a fast, trustworthy foundation — so your first campaigns land in inboxes, not spam.",
  },
  {
    color: '#f59e0b',
    emoji: '📣',
    title: 'Marketers',
    benefit: 'Avoid spam filters; improve deliverability while expanding outreach',
    desc: "Marketers running high-volume campaigns need reliable inbox placement at scale. We handle deliverability so you can focus on copy, segmentation, and results.",
  },
  {
    color: '#8b5cf6',
    emoji: '🏢',
    title: 'Businesses',
    benefit: 'Recover from spam issues; restore domain health',
    desc: "If your domain has been flagged, bounced, or blocklisted, we diagnose and fix the root cause — then rebuild your reputation systematically to prevent recurrence.",
  },
  {
    color: '#10b981',
    emoji: '🎯',
    title: 'Sales Teams',
    benefit: "Increase response rates; land in prospects' primary inbox",
    desc: "Cold outreach only works when it's seen. We ensure your sales sequences reach decision-makers' primary inboxes — giving your SDRs the best possible chance to connect.",
  },
]

function WhoWeServe() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 28px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, left: -80, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>Who We Serve</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Built for Every<br /><span className="g-text">Email Sender</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {audiences.map(({ color, emoji, title, benefit, desc }) => {
            const ref = useReveal<HTMLDivElement>()
            return (
              <div key={title} ref={ref} className="card reveal" style={{ padding: '36px 28px' }}>
                <div style={{ fontSize: 36, marginBottom: 18 }}>{emoji}</div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 14, color, marginBottom: 12, lineHeight: 1.45 }}>{benefit}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Stats Band ───────────────────────────────────────────────────────────────

function AchievementsStats() {
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
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex', borderColor: 'rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.1)', color: '#c4b5fd' }}>Achievements</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            The Numbers<br /><span className="g-text">Behind Our Work</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="achv-grid">
          {stats.map(({ v, label, sub }, i) => (
            <div key={label} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', textAlign: 'center', padding: '36px 20px', position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: -2, lineHeight: 1 }} className="g-text-cyan">{v}</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginTop: 10, marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){ .achv-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What is email warmup?',
    a: 'Email warmup is the process of gradually increasing sending volume from a new or inactive email account to build sender reputation with email service providers. Done correctly, it prevents spam flagging and establishes your domain as a trusted sender.',
  },
  {
    q: 'How long does the process take?',
    a: 'Typically 2 to 8 weeks, depending on your ESP, domain history, and daily sending limits. New domains require longer warmup periods, while domains with existing reputation can reach target volumes faster.',
  },
  {
    q: 'Can I use my existing email platform?',
    a: 'Yes — our warmup service is compatible with Gmail, Outlook, and all SMTP-based services. We work within your existing email setup without requiring any platform migration.',
  },
  {
    q: 'How is progress monitored?',
    a: 'We track four key metrics throughout your warmup: open rates, reply rates, spam complaints, and bounce rates. You receive regular updates with full visibility into these metrics as your reputation builds.',
  },
  {
    q: 'What is the primary benefit of email warm-up?',
    a: 'The primary benefits are better deliverability, higher sender reputation, improved open and engagement rates, and compliance with ESP policies — all of which protect your domain from blacklisting and ensure your campaigns actually reach your audience.',
  },
  {
    q: "What happens if I don't warm up my email?",
    a: "Without warmup, you risk high bounce rates, poor deliverability, account suspension, or domain blacklisting. Your engagement metrics suffer, your marketing spend is wasted, and recovering from a damaged sender reputation takes far longer than building it correctly from the start.",
  },
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

function HowFAQ() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '90px 28px', background: '#0b1324' }}>
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

// ─── Final CTA ────────────────────────────────────────────────────────────────

function HowCTA() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 28px', background: '#060b17' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div ref={ref} className="reveal gradient-border" style={{ background: '#0f1b30', borderRadius: 26, padding: 'clamp(36px, 5vw, 64px)', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <span className="chip" style={{ marginBottom: 18, display: 'inline-flex', position: 'relative' }}>Ready to Start?</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16, position: 'relative' }}>
            Do You Want to Improve<br /><span className="g-text">Your Email Open Rate?</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px', position: 'relative' }}>
            Experts run your campaign and your deliverability will keep improving over time. Get in touch to start your warmup today.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href="https://calendar.app.google/gt6J1J4rvFomHMgi8" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
              Book a Meeting
              <Calendar size={14} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" className="btn-ghost btn-lg">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HowItWorksPage ───────────────────────────────────────────────────────────

export default function HowItWorksPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div>
      <PageHero navigate={navigate} />
      <WhyWarmup />
      <ProcessSteps />
      <ResultsSection />
      <WhoWeServe />
      <AchievementsStats />
      <HowFAQ />
      <HowCTA />
    </div>
  )
}
