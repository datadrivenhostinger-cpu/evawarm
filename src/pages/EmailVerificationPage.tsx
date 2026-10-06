import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, ArrowRight, MonitorCheck, TrendingUp, Target, Headset, Zap, CopyMinus } from 'lucide-react'

const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981']
const MESH =
  'radial-gradient(ellipse 80% 70% at 10% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), #060b17'

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}

function Heading({ chip, title, accent, sub }: { chip: string; title: string; accent: string; sub?: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 56 }}>
      <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>{chip}</span>
      <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 50px)', letterSpacing: -1.5, lineHeight: 1.08, color: '#edf0ff' }}>
        {title} <span className="g-text">{accent}</span>
      </h2>
      {sub && <p style={{ maxWidth: 800, margin: '20px auto 0', fontSize: 17, lineHeight: 1.8, color: '#6e7e9e' }}>{sub}</p>}
    </div>
  )
}

function Section({ children, alt }: { children: ReactNode; alt?: boolean }) {
  return (
    <section style={{ padding: '100px 32px', background: alt ? '#0b1324' : '#060b17' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

const stats = [
  { label: 'Emails Verified', value: '2.6 B+', pct: 100 },
  { label: 'Invalid Detected', value: '829 M+', pct: 32 },
  { label: 'Trust Users', value: '12 K+', pct: 100 },
  { label: 'Accuracy Rate', value: '95%', pct: 95 },
]

const faqs = [
  ['What is email verification?', 'Email verification checks whether an email address is valid, invalid or catch-all before you send to it, so you avoid bounces and protect your sender reputation.'],
  ['How accurate is the verification?', 'Our service combines multiple real-time checks to deliver results with an accuracy rate of 95%.'],
  ['What is a catch-all email address?', 'A catch-all domain accepts mail for any address. We identify catch-all addresses and tell you whether they are high or low risk.'],
  ['Can I verify a large list at once?', 'Yes. Bulk list verification is built for scale, and millions of validations can run in parallel within a single hour.'],
  ['Do you remove duplicate emails?', 'Yes. Our deduplication option removes repeated addresses so the same person is not emailed more than once.'],
  ['Is there a free trial?', 'Yes. Contact us to try the service for free and see the results on your own list.'],
]

const features = [
  { icon: MonitorCheck, title: 'High Accuracy', text: 'It is possible to guarantee dependable results with an accuracy rate of 95% when using multiple real-time checks.' },
  { icon: TrendingUp, title: 'Bulk List Verification', text: 'We provide real-time email verification options for bulk email lists, which are highly accurate and efficient, ensuring faster verification.' },
  { icon: Target, title: 'Catch-All Checkup', text: "With EvaWarm's email verifier, you can determine whether an email is valid, invalid, or catch-all, and if it is catch-all, it identifies whether it is high or low with 100% coverage." },
  { icon: Headset, title: '24*7 Support', text: 'You can get in touch with us at any time through chat, email, or phone. Our support team and engineers are available to assist you and answer any questions you may have.' },
  { icon: Zap, title: 'Fast Verification', text: 'As a result of our scalable system, millions of parallel email validations can be completed within a single hour.' },
  { icon: CopyMinus, title: 'Email Deduplication', text: 'Our duplicate email removal options prevent sending messages to the same person repeatedly, ensuring efficient and effective communication by removing duplicates from your list.' },
]

function Photo({ src, alt, height }: { src: string; alt: string; height: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ width: '100%', height, borderRadius: '2rem', background: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(139,92,246,0.25))', border: '1px solid rgba(255,255,255,0.07)' }}
      />
    )
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} style={{ width: '100%', height: 'auto', maxHeight: height, objectFit: 'cover', borderRadius: '2rem', display: 'block' }} />
}

export default function EmailVerificationPage({ navigate }: { navigate: (p: string) => void }) {
  const [barsRef, barsSeen] = useInView<HTMLDivElement>()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: 68, position: 'relative', overflow: 'hidden', background: MESH }}>
        <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '110px 32px 130px', textAlign: 'center' }}>
          <span className="chip" style={{ marginBottom: 22, display: 'inline-flex' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 6px #06b6d4' }} />
            95% Accurate Verification
          </span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(38px, 6vw, 72px)', letterSpacing: -2.5, lineHeight: 1.04, color: '#edf0ff' }}>
            Email <span className="g-text">Verification Services</span>
          </h1>
        </div>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', height: 70, display: 'block' }} aria-hidden="true">
          <path d="M0,40 C240,90 480,0 720,36 C960,72 1200,10 1440,44 L1440,80 L0,80 Z" fill="#0b1324" />
        </svg>
      </section>

      {/* Best service */}
      <Section alt>
        <div className="ev-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>Why EvaWarm</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 3.8vw, 46px)', letterSpacing: -1.5, lineHeight: 1.1, color: '#edf0ff', marginBottom: 22 }}>
              Best Email <span className="g-text">Verification Service</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: '#6e7e9e', marginBottom: 32 }}>
              Get 95% accurate results at affordable prices from our industry-leading email verification solution. Our service helps to reduce email bounce rates, improve sender reputation, and enhance email deliverability.
            </p>
            <button className="btn-primary btn-lg" onClick={() => navigate('contact')} style={{ borderRadius: 999 }}>
              Try It For Free <ArrowRight size={16} />
            </button>
          </div>
          <Photo src="https://evawarm.com/wp-content/uploads/2023/03/email-verification.png" alt="Email verification dashboard" height={440} />
        </div>
      </Section>

      {/* Stats + why */}
      <Section>
        <div className="ev-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div ref={barsRef} style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            {stats.map((s, i) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 8 }}>{s.label}</div>
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 999, height: 40, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: barsSeen ? `${s.pct}%` : '0%',
                      minWidth: barsSeen ? 110 : 0,
                      height: '100%',
                      background: `linear-gradient(90deg, #3b82f6, ${COLORS[0]})`,
                      borderRadius: 999,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 16px',
                      color: '#fff',
                      fontFamily: 'Sora',
                      fontWeight: 700,
                      fontSize: 13,
                      whiteSpace: 'nowrap',
                      transition: `width 1.2s cubic-bezier(.2,.8,.2,1) ${i * 0.12}s`,
                    }}
                  >
                    <span>{s.value}</span>
                    <span>{s.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <span className="chip chip-violet" style={{ marginBottom: 16, display: 'inline-flex' }}>The Basics</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 3.8vw, 46px)', letterSpacing: -1.5, lineHeight: 1.1, color: '#edf0ff', marginBottom: 22 }}>
              Why Email <span className="g-text">Verification?</span>
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.85, color: '#6e7e9e' }}>
              Email verification is a crucial step in maintaining a healthy and accurate email list. When sending out email campaigns or using email marketing as a means of communication with customers or cold prospect, it's essential to ensure that the emails are delivered to the intended recipients. It is beneficial to verify email addresses in order to increase the deliverability of your email and reduce your bounce rate. By avoiding sending emails to inactive or invalid addresses, you can save time, effort, and resources.
            </p>
          </div>
        </div>
      </Section>

      {/* Validate */}
      <Section alt>
        <Heading
          chip="Validate"
          title="Validate With"
          accent="EvaWarm"
          sub="We understand the significance of every email in acquiring new leads or clients through cold email outreach. To assist with this, we have developed an industry-first solution that provides a 95% accurate email verification service. Our solution yields results of valid, invalid, and catch-all email addresses, providing valuable insight to enhance your business growth through email marketing."
        />
        <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(20px, 2.4vw, 28px)', color: '#edf0ff', textAlign: 'center', marginBottom: 40, letterSpacing: -0.5 }}>
          What Sets Us Apart From The Rest
        </h3>
        <div className="ev-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {features.map((f, i) => {
            const c = COLORS[i % 4]
            const Icon = f.icon
            return (
              <div key={f.title} className="card" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${c}12`, border: `1px solid ${c}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={24} color={c} />
                </div>
                <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: '#edf0ff', marginBottom: 10 }}>{f.title}</h4>
                <p style={{ fontSize: 14.5, lineHeight: 1.75, color: '#6e7e9e', flex: 1, marginBottom: 22 }}>{f.text}</p>
                <button
                  onClick={() => navigate('contact')}
                  style={{ alignSelf: 'flex-start', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#22d3ee', fontFamily: 'Sora', fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  Explore Now <ArrowRight size={14} />
                </button>
              </div>
            )
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Heading chip="Questions" title="Frequently Asked" accent="Questions" />
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <div key={q} className={`faq-item${isOpen ? ' open' : ''}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '20px 24px', background: isOpen ? 'rgba(6,182,212,0.05)' : '#0f1b30', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Sora', fontWeight: 600, fontSize: 16, color: '#edf0ff' }}
                >
                  {q}
                  <ChevronDown size={18} color="#22d3ee" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                <div className={`faq-answer${isOpen ? ' open' : ''}`}>
                  <p style={{ padding: '0 24px 22px', fontSize: 15, lineHeight: 1.8, color: '#6e7e9e' }}>{a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* CTA */}
      <section style={{ padding: '100px 32px', background: '#060b17' }}>
        <div
          className="ev-two"
          style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center', borderRadius: '2rem', padding: '56px 56px', overflow: 'hidden', position: 'relative', background: 'radial-gradient(ellipse 70% 90% at 0% 50%, rgba(6,182,212,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 100% 0%, rgba(139,92,246,0.14) 0%, transparent 60%), #0f1b30', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div>
            <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.4, color: '#edf0ff', marginBottom: 28 }}>
              Make an informed decision by taking advantage of our free trial offer to discover more about our <span className="g-text">email verification service.</span>
            </p>
            <button className="btn-ghost btn-lg" onClick={() => navigate('contact')} style={{ borderRadius: 999 }}>
              Contact Us <ArrowRight size={16} />
            </button>
          </div>
          <Photo src="https://evawarm.com/wp-content/uploads/2023/03/email-verify-cta.jpg" alt="EvaWarm team meeting" height={320} />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .ev-two { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ev-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .ev-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  )
}
