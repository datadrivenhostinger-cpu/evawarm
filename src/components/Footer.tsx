import { useState } from 'react'
import Logo from '@/components/Logo'
import { Mail } from 'lucide-react'

interface FooterProps {
  navigate: (page: string) => void
}

export default function Footer({ navigate }: FooterProps) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer style={{ background: '#0b1324', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: '72px 28px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1.6fr', gap: 48, marginBottom: 56 }} className="footer-cols">

          {/* Brand */}
          <div>
            <button onClick={() => navigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 16, display: 'block' }}>
              <Logo height={28} />
            </button>
            <p style={{ color: '#5a6a86', fontSize: 14, fontFamily: 'Inter', lineHeight: 1.75, maxWidth: 270, marginBottom: 22 }}>
              Your partner for exceptional email warmup and deliverability. We help businesses land in the inbox and stay there.
            </p>
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
              {([
                { href: 'https://www.linkedin.com/company/eva-email-warm-up/', label: 'LinkedIn', d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
                { href: 'https://twitter.com/eva_warm', label: 'X / Twitter', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { href: 'https://www.facebook.com/people/EvaWarm/61561260804473/', label: 'Facebook', d: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { href: 'https://www.instagram.com/evawarm_consulting/', label: 'Instagram', d: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.55 3h8.9A4.55 4.55 0 0121 7.55v8.9A4.55 4.55 0 0116.45 21H7.55A4.55 4.55 0 013 16.45V7.55A4.55 4.55 0 017.55 3z' },
                { href: 'https://www.youtube.com/channel/UCVYM3Uqo4y5Yl9kCWwvl2LQ', label: 'YouTube', d: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
              ] as { href: string; label: string; d: string }[]).map(({ href, label, d }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3a4762', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)'; (e.currentTarget as HTMLElement).style.color = '#06b6d4' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.currentTarget as HTMLElement).style.color = '#3a4762' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 12, color: '#edf0ff', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 18 }}>Services</h4>
            {['Manual Email Warmup', 'Email Deliverability', 'Outbound Marketing', 'Deliverability Audit'].map(s => (
              <button key={s} onClick={() => navigate('services')} style={{ display: 'block', background: 'none', border: 'none', color: '#5a6a86', fontFamily: 'Inter', fontSize: 14, marginBottom: 11, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#edf0ff')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#5a6a86')}
              >{s}</button>
            ))}
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 12, color: '#edf0ff', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 18 }}>Company</h4>
            {[
              ['About', 'about'],
              ['Pricing', 'pricing'],
              ['FAQ', 'faq'],
              ['Contact', 'contact'],
              ['Results', 'results'],
            ].map(([label, page]) => (
              <button key={page} onClick={() => navigate(page)} style={{ display: 'block', background: 'none', border: 'none', color: '#5a6a86', fontFamily: 'Inter', fontSize: 14, marginBottom: 11, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#edf0ff')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#5a6a86')}
              >{label}</button>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 12, color: '#edf0ff', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Newsletter</h4>
            <p style={{ color: '#5a6a86', fontFamily: 'Inter', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
              Deliverability insights straight to your inbox.
            </p>
            {!done ? (
              <div style={{ display: 'flex' }}>
                <input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', background: '#0a1428', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', borderRadius: '9px 0 0 9px', color: '#c4d0ee', fontFamily: 'Inter', fontSize: 13, outline: 'none', minWidth: 0 }}
                />
                <button onClick={() => email && setDone(true)} style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #0891b2, #0e7490)', border: 'none', borderRadius: '0 9px 9px 0', color: '#fff', fontFamily: 'Sora', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Subscribe
                </button>
              </div>
            ) : (
              <div style={{ padding: '10px 14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 9, color: '#4ade80', fontFamily: 'Inter', fontSize: 13 }}>
                ✓ Subscribed! Check your inbox.
              </div>
            )}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=karthiks@datadriven-services.com" style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 16, color: '#5a6a86', fontFamily: 'Inter', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#06b6d4')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#5a6a86')}
            >
              <Mail size={14} />
              karthiks@datadriven-services.com
            </a>
          </div>
        </div>

        <div className="divider-glow" style={{ marginBottom: 24 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ color: '#3a4560', fontFamily: 'Inter', fontSize: 13 }}>
            © 2024 EvaWarm. All rights reserved.{' '}
            <span style={{ color: '#3a4560' }}>Owned by DataDriven Services.</span>
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ color: '#3a4560', fontFamily: 'Inter', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#6e7e9e')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#3a4560')}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-cols { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .footer-cols { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
