import { useEffect, useRef, useState } from 'react'

const CONTACT_EMAIL = 'karthiks@datadriven-services.com'
const serviceOptions = [
  { value: 'Email Warmup', label: 'Email Warmup' },
  { value: 'Email Deliverability', label: 'Email Deliverability' },
  { value: 'Outbound Marketing', label: 'Outbound Marketing' },
  { value: 'Deliverability Audit', label: 'Deliverability Audit' },
  { value: 'Email Verification', label: 'Email Verification' },
  { value: 'Other', label: 'Other' },
]

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

function PageHero({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section style={{
      minHeight: '44vh', display: 'flex', alignItems: 'center', paddingTop: 68,
      background: 'radial-gradient(ellipse 70% 65% at 50% 20%, rgba(6,182,212,0.1) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 90% 80%, rgba(139,92,246,0.07) 0%, transparent 50%), #060b17',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 32px', width: '100%', position: 'relative', textAlign: 'center' }}>
        <div style={{ animation: 'hero-up 0.8s ease both' }}>
          <span className="chip" style={{ marginBottom: 20, display: 'inline-flex' }}>Get In Touch</span>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(34px, 5vw, 66px)', color: '#edf0ff', letterSpacing: -2.5, lineHeight: 1.03, marginBottom: 20 }}>
            Contact EvaWarm
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 'clamp(15px, 1.7vw, 18px)', color: '#6e7e9e', lineHeight: 1.75, maxWidth: 500, margin: '0 auto' }}>
            Ready to improve your email deliverability? Reach out and we will get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactContent() {
  const formRef = useReveal<HTMLDivElement>()
  const infoRef = useReveal<HTMLDivElement>()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', services: [] as string[], message: '', website: '' })

  const toggleService = (service: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }))
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')

  if (form.services.length === 0) {
    setError('Please select at least one service.')
    return
  }

  setSending(true)

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: form.name,
        workEmail: form.email,
        company: form.company,
        services: form.services,
        message: form.message,
        website: form.website,
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        result.error ||
          "We couldn't send your enquiry right now. Please try again in a moment."
      )
    }

    setSent(true)
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : 'Something went wrong while sending your enquiry. Please check your connection and try again.'
    )
  } finally {
    setSending(false)
  }
}
  const infoItems = [
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      label: 'Email',
      value: CONTACT_EMAIL,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`,
      color: '#06b6d4',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
      color: '#f59e0b',
    },
  ]

  return (
    <section style={{ padding: '80px 32px 100px', background: '#0b1324' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'start' }} className="contact-grid">
        <div ref={formRef} className="reveal">
          {sent ? (
            <div className="card" style={{ padding: '64px 48px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 14l6 6L23 8" /></svg>
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: '#edf0ff', marginBottom: 12 }}>Message Sent!</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#6e7e9e', lineHeight: 1.7 }}>
                Thank you for reaching out. We will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="card" style={{ padding: '40px 36px' }}>
              <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: '#edf0ff', marginBottom: 8 }}>Send a Message</h2>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', marginBottom: 32 }}>Fill in the form below and we will be in touch shortly.</p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <input
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Sora', fontSize: 12.5, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 8 }}>Full Name *</label>
                    <input required className="input-field" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Sora', fontSize: 12.5, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 8 }}>Work Email *</label>
                    <input required type="email" className="input-field" placeholder="jane@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Sora', fontSize: 12.5, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 8 }}>Company</label>
                  <input className="input-field" placeholder="Your company name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                </div>

                <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                  <legend style={{ display: 'block', fontFamily: 'Sora', fontSize: 12.5, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 10 }}>Services Interested In *</legend>
                  <div className="service-checkbox-grid">
                    {serviceOptions.map((service) => {
                      const checked = form.services.includes(service.value)
                      return (
                        <label key={service.value} className={`service-checkbox${checked ? ' selected' : ''}`}>
                          <input type="checkbox" checked={checked} onChange={() => toggleService(service.value)} />
                          <span className="service-checkbox-box" aria-hidden="true">{checked ? '✓' : ''}</span>
                          <span>{service.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Sora', fontSize: 12.5, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.5, marginBottom: 8 }}>Message *</label>
                  <textarea required className="input-field" placeholder="Tell us about your current email setup and what you're looking to achieve..." rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ resize: 'vertical' }} />
                </div>

                {error && (
                  <div role="alert" style={{ padding: '12px 14px', borderRadius: 10, color: '#fda4af', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', fontSize: 13 }}>{error}</div>
                )}

                <button disabled={sending} type="submit" className="btn-primary btn-lg" style={{ justifyContent: 'center', marginTop: 4, opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Sending...' : 'Send Message'}
                  {!sending && <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>}
                </button>
              </form>
            </div>
          )}
        </div>

        <div ref={infoRef} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {infoItems.map(item => (
            <div key={item.label} className="card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: `${item.color}12`, border: `1px solid ${item.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" fill="none" stroke={item.color} strokeWidth="1.7" viewBox="0 0 24 24">{item.icon}</svg>
              </div>
              <div>
                <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#6e7e9e', letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                {item.href ? (
                  <a href={item.href} style={{ fontFamily: 'Inter', fontSize: 15, color: '#edf0ff', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = item.color}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#edf0ff'}
                  >{item.value}</a>
                ) : <div style={{ fontFamily: 'Inter', fontSize: 15, color: '#edf0ff' }}>{item.value}</div>}
              </div>
            </div>
          ))}

        </div>
      </div>
      <style>{`
        .service-checkbox-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .service-checkbox { display:flex; align-items:center; gap:10px; padding:12px 14px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.025); border-radius:12px; color:#aebbd3; font-family:'Inter'; font-size:13px; cursor:pointer; transition:all .2s ease; }
        .service-checkbox input { position:absolute; opacity:0; pointer-events:none; }
        .service-checkbox-box { width:18px; height:18px; border-radius:5px; border:1px solid rgba(255,255,255,0.18); display:flex; align-items:center; justify-content:center; font-size:12px; color:#fff; flex-shrink:0; }
        .service-checkbox.selected { border-color:rgba(34,211,238,0.32); background:rgba(34,211,238,0.08); color:#edf0ff; }
        .service-checkbox.selected .service-checkbox-box { background:#06b6d4; border-color:#06b6d4; }
        @media(max-width:900px){ .contact-grid { grid-template-columns:1fr !important; } .form-row { grid-template-columns:1fr !important; } }
        @media(max-width:620px){ .service-checkbox-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>
  )
}

export default function ContactPage({ navigate: _navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return <div><PageHero navigate={_navigate} /><ContactContent /></div>
}
