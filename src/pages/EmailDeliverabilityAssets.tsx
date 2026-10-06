import { PlayCircle, FileText, BarChart3, ArrowRight } from 'lucide-react'

const MESH =
  'radial-gradient(ellipse 80% 70% at 10% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), #060b17'

const cards = [
  { Icon: PlayCircle, title: 'Video Guides', text: 'Step-by-step video tutorials on email warmup and deliverability.' },
  { Icon: FileText, title: 'Guides & Checklists', text: 'Downloadable checklists and setup guides for your email campaigns.' },
  { Icon: BarChart3, title: 'Case Studies', text: 'Real results from businesses who improved deliverability with EvaWarm.', link: true },
]

export default function EmailDeliverabilityAssets({ navigate }: { navigate: (p: string) => void }) {
  return (
    <main>
      <section style={{ paddingTop: 68, position: 'relative', overflow: 'hidden', background: MESH }}>
        <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '100px 32px 125px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(34px, 5.5vw, 64px)', letterSpacing: -2, lineHeight: 1.06, color: '#edf0ff' }}>
            Email Deliverability <span className="g-text">Assets</span>
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#6e7e9e', marginTop: 18 }}>
            Free resources to help you master email deliverability and inbox placement.
          </p>
        </div>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', height: 70, display: 'block' }} aria-hidden="true">
          <path d="M0,40 C240,90 480,0 720,36 C960,72 1200,10 1440,44 L1440,80 L0,80 Z" fill="#060b17" />
        </svg>
      </section>

      <section style={{ background: '#060b17', padding: '70px 24px 90px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>Featured Resource</span>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 44px)', letterSpacing: -1.5, color: '#edf0ff', marginBottom: 16 }}>
            Email Deliverability <span className="g-text">Masterclass</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16.5, lineHeight: 1.8, color: '#94a3b8', maxWidth: 600, margin: '0 auto 40px' }}>
            Watch this in-depth guide on email deliverability — covering sender reputation, inbox placement strategies, and how to avoid spam filters for your cold email campaigns.
          </p>
          <div style={{ background: '#0d1424', border: '1px solid #1e293b', borderRadius: 16, padding: 16, maxWidth: 860, margin: '0 auto' }}>
            <iframe
              width="100%"
              style={{ aspectRatio: '16 / 9', borderRadius: 12, border: '1px solid #1e293b', display: 'block' }}
              src="https://www.youtube.com/embed/eeYbgx1LiEQ"
              title="Email Deliverability Assets"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section style={{ background: '#0b1324', padding: '90px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 44px)', letterSpacing: -1.5, color: '#edf0ff', marginBottom: 14 }}>
              More Resources <span className="g-text">Coming Soon</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16.5, lineHeight: 1.8, color: '#94a3b8', maxWidth: 640, margin: '0 auto' }}>
              We are constantly adding new guides, videos, and tools to help you improve your email deliverability.
            </p>
          </div>
          <div className="eda-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {cards.map(({ Icon, title, text, link }) => (
              <div key={title} style={{ background: '#0d1424', border: '1px solid #1e293b', borderRadius: 20, padding: '36px 28px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={26} color="#22d3ee" />
                </div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 19, color: '#edf0ff', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14.5, lineHeight: 1.75, color: '#6e7e9e', flex: 1 }}>{text}</p>
                {link && (
                  <button onClick={() => navigate('results')} style={{ marginTop: 20, background: 'none', border: 'none', cursor: 'pointer', color: '#22d3ee', fontFamily: 'Sora', fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    View Case Studies <ArrowRight size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#060b17', padding: '90px 24px 100px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: '#0d1424', border: '1px solid #1e293b', borderRadius: 20, padding: '48px 32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, color: '#edf0ff', marginBottom: 10 }}>Want a Free Email Deliverability Audit?</h3>
          <p style={{ fontFamily: 'Inter', fontSize: 15.5, lineHeight: 1.75, color: '#6e7e9e', marginBottom: 26 }}>
            Our experts will review your setup and give you a personalised action plan to improve inbox placement.
          </p>
          <a href="https://calendly.com/karthik-datadriven/30min" target="_blank" rel="noopener noreferrer" style={{ background: '#22d3ee', color: '#060b17', borderRadius: 999, padding: '13px 30px', fontFamily: 'Sora', fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Book a Free Audit <ArrowRight size={15} />
          </a>
        </div>
      </section>
      <style>{`@media (max-width: 900px) { .eda-grid { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  )
}
