import { useEffect } from 'react'

export default function NotFoundPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(139,92,246,0.09) 0%, transparent 55%), #060b17',
      padding: '32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid texture */}
      <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', maxWidth: 520, position: 'relative', animation: 'hero-up 0.7s ease both' }}>
        {/* 404 number */}
        <div style={{
          fontFamily: 'Sora',
          fontWeight: 800,
          fontSize: 'clamp(96px, 18vw, 160px)',
          lineHeight: 1,
          letterSpacing: -6,
          background: 'linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(139,92,246,0.25) 60%, rgba(245,158,11,0.15) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 8,
          userSelect: 'none',
        }}>
          404
        </div>

        <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 'clamp(22px, 3.5vw, 32px)', color: '#edf0ff', letterSpacing: -1, marginBottom: 16 }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.75, marginBottom: 40 }}>
          The page you are looking for does not exist or has been moved. Let us help you find your way back.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('home')} className="btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M7.07 1.48a.65.65 0 01.86 0l6.5 5.95a.65.65 0 01-.86.98L13 7.89V13a.65.65 0 01-.65.65H9.5a.65.65 0 01-.65-.65v-3H6.15V13a.65.65 0 01-.65.65H2.65A.65.65 0 012 13V7.89l-.57.52a.65.65 0 01-.86-.98l6.5-5.95z" /></svg>
            Go to Home
          </button>
          <button onClick={() => navigate('contact')} className="btn-ghost" style={{ fontSize: 15, padding: '13px 28px' }}>
            Contact Support
          </button>
        </div>

        {/* Quick links */}
        <div style={{ marginTop: 52, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#3a4762', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 18 }}>Quick Links</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              ['Services', 'services'],
              ['How It Works', 'how-it-works'],
              ['Results', 'results'],
              ['Pricing', 'pricing'],
              ['FAQ', 'faq'],
            ].map(([label, page]) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9, padding: '8px 16px', fontFamily: 'Sora', fontSize: 13, fontWeight: 500, color: '#6e7e9e', cursor: 'pointer', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#edf0ff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6e7e9e'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
