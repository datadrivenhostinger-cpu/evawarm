import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck, Users, TrendingUp, BarChart3, Eye, Calendar, Plus, Minus, Star } from 'lucide-react'

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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ navigate }: { navigate: (p: string) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState(false)
  return (
    <section style={{
      paddingTop: 68, background:
        'radial-gradient(ellipse 80% 70% at 10% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), #060b17',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 32px 80px', width: '100%', position: 'relative' }}>
        <button onClick={() => navigate('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '7px 14px', color: '#6e7e9e', fontFamily: 'Sora', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 40, transition: 'all 0.2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#edf0ff'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6e7e9e'}
        >
          <ArrowLeft size={13} /> Back to Home
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'start' }} className="ew-hero-grid">
          {/* Left copy */}
          <div style={{ animation: 'hero-up 0.8s ease both' }}>
            <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', display: 'inline-block', boxShadow: '0 0 6px #06b6d4' }} />
              Welcome To EvaWarm
            </span>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(32px, 4.5vw, 60px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.06, marginBottom: 22 }}>
              Improve Your Email<br />
              <span className="g-text">Deliverability</span> with<br />
              Our Warmup Service
            </h1>
            <p style={{ fontFamily: 'Inter', fontSize: 'clamp(15px, 1.6vw, 17px)', color: '#6e7e9e', lineHeight: 1.8, maxWidth: 520, marginBottom: 36 }}>
              Boost your email sender score and ensure your emails land in inboxes, not spam. EvaWarm's automated email warmup service improves deliverability, reputation, and engagement seamlessly. Start warming up your domain today!
            </p>
            <a href="https://calendar.app.google/gt6J1J4rvFomHMgi8" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
              <Calendar size={16} /> Book a Meeting
            </a>

            {/* Trust strip */}
            <div style={{ display: 'flex', gap: 32, marginTop: 44, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap' }}>
              {[['500+', 'Senders Served'], ['95%', 'Avg Inbox Rate'], ['5M+', 'Emails Delivered']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: '#edf0ff', letterSpacing: -0.5 }}>{v}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 12.5, color: '#3a4762', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="card" style={{ padding: '36px 32px', animation: 'hero-up 0.8s ease both', animationDelay: '0.15s' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={26} color="#10b981" />
                </div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 10 }}>Request Sent!</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e' }}>We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 6 }}>Get Your Free Audit Now!</h2>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', marginBottom: 24 }}>No commitment required, just an honest look at your setup.</p>
                <form onSubmit={async (e) => { e.preventDefault(); setSendError(false); try { const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, message: (form.phone ? `Phone: ${form.phone}\n\n` : '') + (form.message || 'Warmup service enquiry'), services: 'Email Warmup Service' }) }); if (r.ok) setSent(true); else setSendError(true); } catch { setSendError(true); } }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 6 }}>Name</label>
                    <input className="input-field" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 6 }}>Email *</label>
                    <input required type="email" className="input-field" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 6 }}>Phone *</label>
                    <input required type="tel" className="input-field" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 6 }}>Message</label>
                    <textarea className="input-field" placeholder="Tell us about your email setup..." rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ resize: 'vertical' }} />
                  </div>
                  {sendError && <p role="alert" style={{ fontFamily: 'Inter', fontSize: 13, color: '#f87171' }}>Something went wrong. Please try again or <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthik@datadriven-services.com" target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee' }}>Email Us</a>.</p>}
                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>
                    Send Me A Quote <ArrowRight size={14} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .ew-hero-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Why Warmup ───────────────────────────────────────────────────────────────

const whyItems = [
  { Icon: Mail,         color: '#06b6d4', title: 'Improves Deliverability',  desc: "Email warmup ensures that your emails are more likely to land in recipients' inboxes rather than being flagged as spam." },
  { Icon: ShieldCheck,  color: '#8b5cf6', title: 'Builds Domain Reputation', desc: 'Gradual and consistent warmup builds trust with email service providers, enhancing the credibility of your domain.' },
  { Icon: Users,        color: '#f59e0b', title: 'Natural Engagement',       desc: 'By mimicking real-world interactions like email opens, replies, and forwards, email warmup helps establish authenticity.' },
  { Icon: TrendingUp,   color: '#10b981', title: 'High-Volume Sending',      desc: 'Scaling up email campaigns becomes easier and safer when warmup has already established a strong sender reputation.' },
  { Icon: CheckCircle2, color: '#06b6d4', title: 'Enhances Email Success',   desc: 'Gradual and consistent warmup builds trust with email service providers, enhancing the credibility of your domain.' },
  { Icon: BarChart3,    color: '#8b5cf6', title: 'Avoids Blacklisting',      desc: 'Proper warmup reduces the risk of your domain or email address being flagged or blacklisted.' },
]

function WhyWarmup() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 32px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 400, background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex' }}>Why It Matters</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 18 }}>
            Why Email Warmup is Crucial for<br /><span className="g-text">Cold Email Marketing Success</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            AI algorithms are highly intelligent, manual warmup signals human behavior, improving sender reputation and boosting inbox delivery.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {whyItems.map(({ Icon, color, title, desc }) => {
            const ref = useReveal<HTMLDivElement>()
            return (
              <div key={title} ref={ref} className="card reveal" style={{ padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${color}0e, transparent)`, pointerEvents: 'none' }} />
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}10`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={24} color={color} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: '#edf0ff', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const steps = [
  { num: '01', color: '#06b6d4', Icon: Mail,         title: 'Personalized Email Interactions',   desc: 'Our team manually sends and replies to emails using real, verified accounts, ensuring natural engagement and human-like activity.' },
  { num: '02', color: '#8b5cf6', Icon: TrendingUp,   title: 'Controlled Volume Increase',        desc: 'We gradually scale up the number of emails sent per day, preventing sudden spikes that might trigger spam filters.' },
  { num: '03', color: '#f59e0b', Icon: Users,        title: 'Engagement Simulation',             desc: 'Emails are manually opened, marked as important, and replied to in a conversational manner to build trust with email providers.' },
  { num: '04', color: '#10b981', Icon: ShieldCheck,  title: 'Domain Reputation Enhancement',    desc: 'By maintaining consistent, human-driven interactions, we improve your sender reputation, increasing email deliverability.' },
  { num: '05', color: '#06b6d4', Icon: Eye,          title: 'Continuous SPAM Monitoring',       desc: 'Our team monitors your email health, ensuring that your domain maintains a low spam score and stays out of spam folders.' },
  { num: '06', color: '#8b5cf6', Icon: BarChart3,    title: 'Real-Time Analytics',              desc: 'You receive regular updates on email deliverability, engagement rates, and reputation score improvements.' },
  { num: '07', color: '#f59e0b', Icon: CheckCircle2, title: 'Ensuring Compliance & Credibility', desc: 'Since all interactions are handled manually, our approach remains compliant with email provider guidelines and avoids automation red flags.' },
]

function HowItWorks() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 32px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', right: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>Step-by-Step</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 18 }}>
            How Our Manual Email<br /><span className="g-text">Warmup Service Works</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            A structured 7-step process built around real human interaction, the only warmup method ISPs genuinely trust.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {steps.map(({ num, color, Icon, title, desc }) => {
            const ref = useReveal<HTMLDivElement>()
            return (
              <div key={num} ref={ref} className="card reveal" style={{ padding: '28px 26px', display: 'flex', gap: 18, alignItems: 'flex-start', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right, ${color}0a, transparent)`, pointerEvents: 'none' }} />
                <div style={{ width: 48, height: 48, borderRadius: 13, background: `${color}12`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={22} color={color} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: 700, color, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>Step {num}</div>
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 15, color: '#edf0ff', marginBottom: 8, letterSpacing: -0.2 }}>{title}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: 13.5, color: '#6e7e9e', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── About Us ─────────────────────────────────────────────────────────────────

function AboutUs({ navigate }: { navigate: (p: string) => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="About" style={{ padding: '100px 32px', background: '#0b1324' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div ref={ref} className="ew-about-grid reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          {/* Text */}
          <div>
            <span className="chip chip-violet" style={{ marginBottom: 20, display: 'inline-flex' }}>About Us</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#edf0ff', letterSpacing: -1.8, lineHeight: 1.08, marginBottom: 28 }}>
              Making Email Work<br /><span className="g-text">For Every Sender</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                "EvaWarm offers specialized services that are designed to enhance the reputation of your email account while also preventing your messages from being marked as spam.",
                "Our manual warmup service is tailored to your specific needs, and it involves real human interaction with your emails. This kind of genuine activity is recognized by ISPs and can help to boost your email account's credibility.",
                "Moreover, we provide expert consulting services to both B2B and B2C businesses, helping them to improve their email deliverability. Our team of professionals can guide you through the intricacies of email marketing.",
                "Ensuring that your messages reach their intended audience and aren't blocked by spam filters. With our comprehensive approach, you can trust EvaWarm to help you achieve your email marketing goals.",
              ].map((p, i) => (
                <p key={i} style={{ fontFamily: 'Inter', fontSize: 15.5, color: '#6e7e9e', lineHeight: 1.82 }}>{p}</p>
              ))}
            </div>
            <button onClick={() => navigate('about')} className="btn-primary" style={{ marginTop: 32 }}>
              Learn More About Us <ArrowRight size={14} />
            </button>
          </div>

          {/* Stats panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { v: '500+', l: 'Senders Served', c: '#06b6d4' },
              { v: '5M+', l: 'Emails Delivered', c: '#8b5cf6' },
              { v: '95%', l: 'Avg Inbox Rate', c: '#f59e0b' },
              { v: '2.5M', l: 'Marked Not Spam', c: '#10b981' },
            ].map(({ v, l, c }) => (
              <div key={l} className="card" style={{ padding: '32px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80, background: `radial-gradient(circle, ${c}15, transparent)`, pointerEvents: 'none' }} />
                <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 36, color: c, letterSpacing: -1.5, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', marginTop: 8, lineHeight: 1.4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:800px){ .ew-about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  )
}

// ─── Results You Can Expect ───────────────────────────────────────────────────

const results = [
  { Icon: CheckCircle2, color: '#06b6d4', text: 'Achieve up to 95% inbox placement' },
  { Icon: Mail,         color: '#8b5cf6', text: 'Ensure consistent cold email delivery' },
  { Icon: TrendingUp,   color: '#f59e0b', text: 'Boost open and engagement rates' },
  { Icon: ShieldCheck,  color: '#10b981', text: 'Improve sender scores across ISPs' },
]

function ResultsExpect() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 32px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>What You Get</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Results You Can Expect from<br /><span className="g-text">Email Warmup</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {results.map(({ Icon, color, text }) => {
            const ref = useReveal<HTMLDivElement>()
            return (
              <div key={text} ref={ref} className="card reveal" style={{ padding: '36px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${color}07, transparent)`, pointerEvents: 'none' }} />
                <div style={{ width: 64, height: 64, borderRadius: 18, background: `${color}12`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={28} color={color} strokeWidth={1.7} />
                </div>
                <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', lineHeight: 1.45 }}>{text}</p>
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
  { color: '#06b6d4', title: 'Startups',    desc: 'Build a trusted sender reputation and ensure high inbox placement from day one.' },
  { color: '#8b5cf6', title: 'Marketers',   desc: 'Avoid spam filters and improve email deliverability while expanding your outreach efforts.' },
  { color: '#f59e0b', title: 'Businesses',  desc: 'Recover from spam issues, boost open rates, and restore domain health with manual warming.' },
  { color: '#10b981', title: 'Sales Teams', desc: "Increase response rates by ensuring sales outreach lands in prospects' primary inbox." },
]

function WhoWeServe() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 32px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>Who We Help</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 16 }}>
            To Whom Do We Provide<br /><span className="g-text">Email Warming Services?</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            No matter your industry, if email outreach is part of your strategy, EvaWarm is your trusted partner.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {audiences.map(({ color, title, desc }) => {
            const ref = useReveal<HTMLDivElement>()
            return (
              <div key={title} ref={ref} className="card reveal" style={{ padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, ${color}44)`, borderRadius: '22px 22px 0 0' }} />
                <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, background: `radial-gradient(circle at top right, ${color}10, transparent)`, pointerEvents: 'none' }} />
                <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, color: '#edf0ff', marginBottom: 14 }}>{title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.78 }}>{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function Achievements() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 32px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div ref={ref} className="reveal gradient-border" style={{ maxWidth: 960, margin: '0 auto', background: '#0f1b30', borderRadius: 28, padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.05), transparent)', pointerEvents: 'none' }} />
        <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}>Our Achievement</span>
        <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 48px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 48 }}>
          Numbers That<br /><span className="g-text">Speak for Themselves</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.07)' }} className="ew-stats-grid">
          {[
            { v: '5M', sub: 'Emails', l: 'Delivered in Inbox', c: '#06b6d4' },
            { v: '500+', sub: null, l: 'Subscriptions', c: '#8b5cf6' },
            { v: '2.5M', sub: null, l: 'Marked Not Spam', c: '#f59e0b' },
          ].map(({ v, sub, l, c }, i) => (
            <div key={l} style={{ padding: '40px 20px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(32px, 4vw, 52px)', color: c, letterSpacing: -2, lineHeight: 1 }}>
                {v}{sub && <span style={{ fontSize: '0.6em', marginLeft: 4, color: '#6e7e9e', fontWeight: 600 }}>{sub}</span>}
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', marginTop: 10 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:600px){ .ew-stats-grid { grid-template-columns: 1fr !important; } .ew-stats-grid > *:not(:first-child) { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07) !important; } }`}</style>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Natarajan', role: 'Co-Founder, LeadWalut', initials: 'N', color: '#06b6d4',
    quote: 'With consultation from EvaWarm, we elevate our email marketing to the next level, resulting in improved open and response rates compared to previous campaigns.',
  },
  {
    name: 'Ankur', role: 'Growth Marketer, Attentive', initials: 'A', color: '#8b5cf6',
    quote: 'For an extended period, we had poor open rates, even with utilizing some email warming services, but now we are seeing a good open rate of 65% thanks to EvaWarm\'s warm-up service.',
  },
  {
    name: 'Jonathan Rodger', role: 'Founder, Datyle', initials: 'JR', color: '#f59e0b',
    quote: 'Sundar has worked tirelessly to generate quality contacts and new leads for Email Verify. I have always enjoyed working with him and have done so for years. I would recommend his services to anyone in the B2B space.',
  },
]

function TestimonialsSection() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 32px', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex' }}>Client Stories</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 50px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Loved By Our Clients<br /><span className="g-text">Around the World</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {testimonials.map(({ name, role, initials, color, quote }) => {
            const ref = useReveal<HTMLDivElement>()
            return (
              <div key={name} ref={ref} className="card reveal" style={{ padding: '36px 32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }} />
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />)}
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#c4d0ee', lineHeight: 1.82, marginBottom: 28, fontStyle: 'italic' }}>"{quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${color}30, ${color}18)`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: 14, color, flexShrink: 0 }}>{initials}</div>
                  <div>
                    <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: '#edf0ff' }}>{name}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 12.5, color: '#6e7e9e', marginTop: 2 }}>{role}</div>
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

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What is email warmup?',
    a: 'Email warmup is the process of gradually increasing the volume of emails sent from a new or inactive email account to establish a good sender reputation with email service providers (ESPs). This helps prevent emails from being flagged as spam and improves deliverability.',
  },
  {
    q: 'How long does the process take?',
    a: 'The duration of email warmup depends on the email service provider, the domain\'s history, and the daily email sending limits. Typically, email warmup takes between 2 to 8 weeks, gradually increasing the number of emails sent per day to build a positive sender reputation.',
  },
  {
    q: 'Can I use my existing email platform?',
    a: 'Yes, most email warmup tools are compatible with existing email platforms like Gmail, Outlook, and SMTP-based email services. Some warmup services even integrate with your email provider to automate the process.',
  },
  {
    q: 'How is progress monitored?',
    a: 'Email warmup progress is tracked by monitoring key metrics such as: Open rates (percentage of emails opened), Reply rates (responses from recipients), Spam complaints (emails marked as spam), Bounce rates (emails that fail to deliver). Many warmup tools provide dashboards with real-time analytics to track progress.',
  },
  {
    q: 'What is the primary benefit of email warm-up?',
    a: 'The main benefits of email warmup include: Better email deliverability (reduces chances of emails landing in spam), Higher sender reputation (ensures emails reach inboxes), Improved open and engagement rates (increases user interaction), Compliance with ESP policies (prevents being blacklisted).',
  },
  {
    q: "What happens if I don't warm up email?",
    a: "If you don't warm up your email, ESPs might classify your emails as spam, leading to: High bounce rates, Poor email deliverability, Email account suspension or domain blacklisting, Lower engagement and wasted marketing efforts.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', gap: 16 }} aria-expanded={open}>
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#edf0ff', textAlign: 'left', lineHeight: 1.4 }}>{q}</span>
        {open ? <Minus size={16} color="#06b6d4" /> : <Plus size={16} color="#6e7e9e" />}
      </button>
      <div className={`faq-answer${open ? ' open' : ''}`}>
        <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.85, padding: '0 24px 22px' }}>{a}</p>
      </div>
    </div>
  )
}

function FAQSection({ navigate }: { navigate: (p: string) => void }) {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '100px 32px', background: '#060b17', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip" style={{ marginBottom: 18, display: 'inline-flex' }}>FAQ</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.1 }}>
            Frequently Asked<br /><span className="g-text">Questions</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', marginBottom: 24 }}>Still have questions? We're here to help.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://calendly.com/karthiks26/121" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
              <Calendar size={15} /> Book a Free Call
            </a>
            <button onClick={() => navigate('contact')} className="btn-ghost btn-lg">
              Contact Us <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmailWarmupPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div>
      <Hero navigate={navigate} />
      <WhyWarmup />
      <HowItWorks />
      <AboutUs navigate={navigate} />
      <ResultsExpect />
      <WhoWeServe />
      <Achievements />
      <TestimonialsSection />
      <FAQSection navigate={navigate} />
    </div>
  )
}
