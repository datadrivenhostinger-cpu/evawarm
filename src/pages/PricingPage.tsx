import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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
      minHeight: '50vh', display: 'flex', alignItems: 'center', paddingTop: 68,
      background: 'radial-gradient(ellipse 75% 70% at 50% 20%, rgba(6,182,212,0.11) 0%, transparent 58%), radial-gradient(ellipse 60% 55% at 5% 90%, rgba(139,92,246,0.08) 0%, transparent 52%), #060b17',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 32px', width: '100%', position: 'relative', textAlign: 'center' }}>
        <div style={{ animation: 'hero-up 0.8s ease both' }}>
          <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}>Transparent Pricing</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#edf0ff', letterSpacing: -2.5, lineHeight: 1.03, marginBottom: 22 }}>
            Simple, Honest Pricing
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 'clamp(16px, 1.8vw, 19px)', color: '#6e7e9e', lineHeight: 1.75, maxWidth: 540, margin: '0 auto' }}>
            No hidden fees. No long-term lock-ins. Choose the plan that matches your sending needs and grow from there.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing Cards ────────────────────────────────────────────────────────────

const plans = [
  {
    name: 'Starter',
    chip: null,
    price: 'Custom',
    desc: 'Perfect for solo founders and early-stage startups getting started with email outreach.',
    color: '#06b6d4',
    features: [
      '1 domain warmup',
      'Manual warmup process',
      'Up to 500 emails/day',
      'Basic reputation monitoring',
      'Weekly progress reports',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    chip: 'Most Popular',
    price: 'Custom',
    desc: 'For growing businesses running active outbound campaigns and needing reliable inbox placement.',
    color: '#22d3ee',
    features: [
      'Up to 3 domain warmups',
      'Advanced manual warmup',
      'Up to 2,000 emails/day',
      'Full deliverability audit',
      'Bi-weekly strategy calls',
      'Priority Slack support',
      'Blacklist monitoring',
      'SPF / DKIM / DMARC setup',
    ],
    cta: 'Book a Call',
    popular: true,
  },
  {
    name: 'Enterprise',
    chip: null,
    price: 'Custom',
    desc: 'For agencies, large teams, and enterprises with complex multi-domain infrastructure needs.',
    color: '#8b5cf6',
    features: [
      'Unlimited domain warmups',
      'Full deliverability management',
      'High-volume sending support',
      'Dedicated account manager',
      'Weekly strategy calls',
      'White-label reporting',
      'IP pool management',
      'ESP migration support',
      '24/7 dedicated support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

function PricingCards() {
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 32px 100px', background: '#0b1324' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#6e7e9e', maxWidth: 480, margin: '0 auto' }}>
            All plans include a free consultation to understand your needs before any commitment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }} className="pricing-grid">
          {plans.map(plan => (
            <div
              key={plan.name}
              className="card"
              style={{
                padding: '40px 36px',
                position: 'relative',
                overflow: 'hidden',
                border: plan.popular ? `1px solid ${plan.color}30` : '1px solid rgba(255,255,255,0.07)',
                boxShadow: plan.popular ? `0 8px 40px rgba(0,0,0,0.3), 0 0 40px ${plan.color}0a` : '0 2px 16px rgba(0,0,0,0.2)',
                transform: plan.popular ? 'scale(1.03)' : 'none',
              }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }} />
              )}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: `radial-gradient(circle, ${plan.color}0c 0%, transparent 70%)`, pointerEvents: 'none' }} />

              {plan.chip && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${plan.color}12`, border: `1px solid ${plan.color}28`, borderRadius: 20, padding: '4px 12px', marginBottom: 18 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: plan.color }} />
                  <span style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: plan.color, letterSpacing: 0.7, textTransform: 'uppercase' }}>{plan.chip}</span>
                </div>
              )}
              {!plan.chip && <div style={{ height: 28, marginBottom: 18 }} />}

              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: '#edf0ff', marginBottom: 8 }}>{plan.name}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', lineHeight: 1.65, marginBottom: 28, minHeight: 56 }}>{plan.desc}</p>

              <div style={{ marginBottom: 32 }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 40, color: '#edf0ff', letterSpacing: -1.5 }}>{plan.price}</span>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#6e7e9e', marginTop: 4 }}>Tailored to your volume and needs</p>
              </div>

              <a
  href={
    plan.name === 'Growth'
      ? 'https://calendar.app.google/gt6J1J4rvFomHMgi8'
      : plan.name === 'Enterprise'
        ? '#/contact?plan=enterprise'
        : '#/contact?plan=starter'
  }
  target={plan.name === 'Growth' ? '_blank' : undefined}
  rel={plan.name === 'Growth' ? 'noopener noreferrer' : undefined}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '13px 24px',
    borderRadius: 12,
    fontFamily: 'Sora',
    fontWeight: 600,
    fontSize: 14.5,
    textDecoration: 'none',
    width: '100%',
    background: plan.popular
      ? `linear-gradient(135deg, ${plan.color}cc, ${plan.color}88)`
      : 'rgba(255,255,255,0.06)',
    border: plan.popular
      ? 'none'
      : '1px solid rgba(255,255,255,0.1)',
    color: plan.popular ? '#fff' : '#c4d0ee',
    cursor: 'pointer',
    marginBottom: 32,
    transition: 'all 0.2s ease',
  }}
>
  {plan.cta}
  <ArrowRight size={12} />
</a>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28 }}>
                <p style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 16 }}>What is included</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
                        <circle cx="8" cy="8" r="8" fill={`${plan.color}18`} />
                        <path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#c4d0ee', lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 14, color: '#3a4762', marginTop: 48 }}>
          All prices are custom-quoted based on your volume, domain history, and specific needs. No contracts required.
        </p>
      </div>
      <style>{`@media(max-width:900px){ .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; } .pricing-grid > * { transform: none !important; } }`}</style>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const pricingFaqs = [
  { q: 'How is pricing determined?', a: 'We tailor pricing to your specific situation — number of domains, sending volume, current reputation, and the scope of work. Book a free consultation and we will give you a clear quote.' },
  { q: 'Is there a contract or minimum commitment?', a: 'No long-term contracts required. We work on a flexible basis, and most clients stay with us because they see results — not because they are locked in.' },
  { q: 'Do you offer a free trial or consultation?', a: 'Yes. Every engagement starts with a free deliverability consultation where we assess your current setup, identify issues, and recommend a path forward.' },
  { q: 'What is included in the warmup service?', a: 'Manual warmup of your domain, reputation monitoring, progress reports, and direct access to your deliverability expert. We handle the execution end-to-end.' },
  { q: 'How quickly can you start?', a: "Typically within 24–48 hours of an initial consultation. We move fast because we know delayed warmup means delayed results for you." },
]

function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const headRef = useReveal<HTMLDivElement>()
  return (
    <section style={{ padding: '80px 32px', background: '#060b17' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="chip chip-violet" style={{ marginBottom: 18, display: 'inline-flex' }}>FAQ</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.5, lineHeight: 1.1 }}>
            Pricing Questions
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pricingFaqs.map((faq, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', gap: 16 }}
                aria-expanded={open === i}
              >
                <span style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 15, color: '#edf0ff', textAlign: 'left' }}>{faq.q}</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, transition: 'transform 0.3s', transform: open === i ? 'rotate(180deg)' : 'none' }}>
                  <path d="M4 7l5 5 5-5" stroke="#6e7e9e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`faq-answer${open === i ? ' open' : ''}`}>
                <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#6e7e9e', lineHeight: 1.8, padding: '0 24px 22px' }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PricingPage ──────────────────────────────────────────────────────────────

export default function PricingPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div>
      <PageHero navigate={navigate} />
      <PricingCards />
      <PricingFAQ />
    </div>
  )
}
