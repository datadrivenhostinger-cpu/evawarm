import { AlertTriangle, Building2, Lightbulb, Target, TrendingUp } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'

const LINE = 'rgba(255,255,255,0.07)'
const DARK_INK = '#0b1324'

interface CaseStudyPageProps {
  slug: string
  navigate: (page: string) => void
}

export default function CaseStudyPage({ slug, navigate }: CaseStudyPageProps) {
  const cs = caseStudies.find(c => c.slug === slug)

  if (!cs) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '120px 32px' }}>
        <h1 style={{ fontFamily: 'Sora, sans-serif', color: '#edf0ff', fontSize: 32 }}>Case study not found</h1>
        <button className="btn-primary" onClick={() => navigate('case-studies')}>
          ← Back to case studies
        </button>
      </main>
    )
  }

  const others = caseStudies.filter(c => c.slug !== slug)
  const ACCENT = cs.accent

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 68, position: 'relative', overflow: 'hidden',
        background: `radial-gradient(ellipse 70% 60% at 15% 30%, ${ACCENT}20 0%, transparent 55%), radial-gradient(ellipse 55% 55% at 88% 10%, rgba(139,92,246,0.08) 0%, transparent 50%), #060b17`,
      }}>
        <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '64px 64px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 1220, margin: '0 auto', padding: '72px 28px 88px' }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
            <ol style={{ listStyle: 'none', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, fontFamily: 'Sora, sans-serif', fontSize: 12.5, fontWeight: 500, color: '#6e7e9e', padding: 0, margin: 0 }}>
              {[{ label: 'Home', page: 'home' }, { label: 'Case Studies', page: 'case-studies' }, { label: cs.client }].map((crumb, i, arr) => {
                const isLast = i === arr.length - 1
                return (
                  <li key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {i > 0 && <span style={{ color: '#3a4a65', fontSize: 13, margin: '0 2px' }}>›</span>}
                    {!isLast && crumb.page ? (
                      <button onClick={() => navigate(crumb.page!)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontSize: 12.5, fontWeight: 500, color: '#6e7e9e', padding: '2px 4px', borderRadius: 4, transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = '#6e7e9e')}>
                        {crumb.label}
                      </button>
                    ) : (
                      <span style={{ color: isLast ? ACCENT : '#6e7e9e', padding: '2px 4px' }}>{crumb.label}</span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="cs-hero-grid">
            {/* Left: text */}
            <div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
                <span className="chip" style={{ display: 'inline-flex' }}>Case Study</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${ACCENT}14`, border: `1px solid ${ACCENT}28`, borderRadius: 20, padding: '5px 12px', color: ACCENT, fontFamily: 'Sora, sans-serif', fontSize: 11.5, fontWeight: 600 }}>{cs.industry}</span>
              </div>
              <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 58px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
                {cs.client}<br /><span className="g-text">{cs.title}</span>
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#8896b3', lineHeight: 1.75, marginBottom: 28, maxWidth: 480 }}>
                {cs.tagline}
              </p>
              {/* Quick stats strip */}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {cs.heroStats.map(([v, l]) => (
                  <div key={l} style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}22`, borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 22, color: ACCENT, letterSpacing: -0.8 }}>{v}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5a6a86', marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: accent visual */}
            <div style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${ACCENT}28`, boxShadow: '0 8px 48px rgba(0,0,0,0.4)', background: `radial-gradient(ellipse at 40% 40%, ${ACCENT}18, transparent 60%), #0f1b30`, minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${ACCENT}14`, border: `1px solid ${ACCENT}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={34} color={ACCENT} strokeWidth={1.4} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 28, color: '#edf0ff', letterSpacing: -1 }}>{cs.client}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#566278', marginTop: 6 }}>{cs.industry}</div>
              </div>
              <div style={{ width: '100%', height: 1, background: LINE }} />
              <div style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#4a5a7a', lineHeight: 1.6, maxWidth: 280 }}>
                Key outcome: <span style={{ color: ACCENT, fontWeight: 600 }}>{cs.heroStats[0][0]} {cs.heroStats[0][1]}</span>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:860px){ .cs-hero-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── About & Objective ─────────────────────────────────────────────── */}
      <section style={{ background: '#0b1324', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="cs-two-col">

          {/* About */}
          <div style={{ background: '#0f1b30', border: `1px solid ${LINE}`, borderRadius: 20, padding: '36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ACCENT}10`, border: `1px solid ${ACCENT}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Building2 size={22} color={ACCENT} strokeWidth={1.8} />
              </div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 18, color: '#edf0ff' }}>About the Client</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#8896b3', lineHeight: 1.8, margin: 0 }}>
              <strong style={{ color: '#edf0ff' }}>{cs.client}</strong> — {cs.about}
            </p>
          </div>

          {/* Objective */}
          <div style={{ background: '#0f1b30', border: `1px solid ${LINE}`, borderRadius: 20, padding: '36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Target size={22} color="#f59e0b" strokeWidth={1.8} />
              </div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 18, color: '#edf0ff' }}>Objective</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#8896b3', lineHeight: 1.8, margin: 0 }}>
              {cs.objective}
            </p>
          </div>

        </div>
        <style>{`@media(max-width:760px){ .cs-two-col { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── Business Challenges ───────────────────────────────────────────── */}
      <section style={{ background: '#060b17', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="chip chip-orange" style={{ marginBottom: 14, display: 'inline-flex' }}>Business Challenge</span>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.3, lineHeight: 1.1, marginBottom: 14 }}>
              What {cs.client} Was<br /><span className="g-text">Struggling With</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6e7e9e', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              Before working with EvaWarm, {cs.client}'s email programme faced several compounding deliverability obstacles.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 820, margin: '0 auto' }}>
            {cs.challenges.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: '#0f1b30', border: `1px solid ${LINE}`, borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.18)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <AlertTriangle size={13} color="#f59e0b" strokeWidth={2} />
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: '#8896b3', lineHeight: 1.7 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#0b1324', padding: '90px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, borderRadius: '50%', background: `radial-gradient(ellipse, ${ACCENT}05 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="chip chip-violet" style={{ marginBottom: 14, display: 'inline-flex' }}>Solution</span>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.3, lineHeight: 1.1, marginBottom: 14 }}>
              The EvaWarm<br /><span className="g-text">Approach</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6e7e9e', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              EvaWarm designed a multi-layer deliverability solution specific to {cs.client}'s infrastructure, audience, and goals.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {cs.solutions.map(({ title, desc }, i) => (
              <div key={i}
                style={{ background: '#0f1b30', border: `1px solid ${LINE}`, borderRadius: 16, padding: '24px 22px', transition: 'border-color 0.22s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${ACCENT}28`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = LINE)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15, color: '#edf0ff' }}>{title}</div>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#6a7a96', lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ───────────────────────────────────────────────────────── */}
      <section style={{ background: '#060b17', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="chip" style={{ marginBottom: 14, display: 'inline-flex' }}>Results</span>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.3, lineHeight: 1.1, marginBottom: 14 }}>
              Measurable Outcomes<br /><span className="g-text">From the Programme</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6e7e9e', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
              After EvaWarm's programme, {cs.client}'s email metrics transformed.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 56 }}>
            {cs.stats.map(({ value, label, sub }) => (
              <div key={label} style={{ background: '#0f1b30', border: `1px solid ${ACCENT}18`, borderRadius: 18, padding: '28px 22px', textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 42px)', color: ACCENT, letterSpacing: -1.5, lineHeight: 1 }}>{value}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13, color: '#edf0ff', margin: '10px 0 6px', letterSpacing: -0.2 }}>{label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#4a5a7a', lineHeight: 1.5 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Key Takeaway callout */}
          <div style={{ background: '#0f1b30', border: `1px solid ${ACCENT}20`, borderRadius: 20, padding: '32px 36px', maxWidth: 820, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${ACCENT}06 0%, transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ACCENT}10`, border: `1px solid ${ACCENT}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <TrendingUp size={22} color={ACCENT} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginBottom: 8 }}>Key Takeaway</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: '#8896b3', lineHeight: 1.8, margin: 0 }}>{cs.takeaway}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Case Studies ────────────────────────────────────────────── */}
      {others.length > 0 && (
        <section style={{ padding: '80px 28px', background: DARK_INK }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="chip" style={{ marginBottom: 14, display: 'inline-flex' }}>More Case Studies</span>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.2vw, 40px)', color: '#edf0ff', letterSpacing: -1.2, lineHeight: 1.1 }}>
                More Client <span className="g-text">Wins</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }} className="cs-others-grid">
              {others.map(other => (
                <div key={other.slug} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 5, background: `linear-gradient(90deg, ${other.accent}, ${other.accent}88)` }} />
                  <div style={{ padding: '28px 26px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 12, background: `${other.accent}14`, border: `1px solid ${other.accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Building2 size={22} color={other.accent} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 10.5, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: other.accent, marginBottom: 3 }}>Case Study</div>
                        <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 18, color: '#edf0ff', letterSpacing: -0.4 }}>{other.client}</h3>
                      </div>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#8896b3', lineHeight: 1.7, margin: 0 }}>
                      {other.tagline.slice(0, 140)}…
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {other.heroStats.map(([v, l]) => (
                        <div key={l} style={{ background: `${other.accent}0c`, border: `1px solid ${other.accent}20`, borderRadius: 8, padding: '6px 12px', display: 'flex', gap: 7, alignItems: 'center' }}>
                          <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 14, color: other.accent }}>{v}</span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#6e7e9e' }}>{l}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => navigate(`case-studies/${other.slug}`)} className="btn-primary btn-sm" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                      Read case study →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:820px){.cs-others-grid{grid-template-columns:1fr!important}}`}</style>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ background: '#0b1324', padding: '80px 28px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div className="gradient-border" style={{ background: '#0f1b30', borderRadius: 26, padding: 'clamp(36px, 5vw, 64px)', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${ACCENT}05 0%, transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', background: `${ACCENT}10`, border: `1px solid ${ACCENT}22`, marginBottom: 20, position: 'relative' }}>
              <Lightbulb size={26} color={ACCENT} strokeWidth={1.8} />
            </div>
            <span className="chip" style={{ marginBottom: 18, display: 'inline-flex', position: 'relative' }}>See What's Possible</span>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 44px)', color: '#edf0ff', letterSpacing: -1.4, lineHeight: 1.1, marginBottom: 14, position: 'relative' }}>
              Ready to Improve<br /><span className="g-text">Your Deliverability?</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6e7e9e', lineHeight: 1.7, maxWidth: 460, margin: '0 auto 32px', position: 'relative' }}>
              Book a free deliverability audit and see how EvaWarm can help your business reach the inbox.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <button onClick={() => navigate('contact')} className="btn-primary btn-lg">
                Book a Free Audit
              </button>
              <button onClick={() => navigate('case-studies')} className="btn-ghost btn-lg">
                All Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
