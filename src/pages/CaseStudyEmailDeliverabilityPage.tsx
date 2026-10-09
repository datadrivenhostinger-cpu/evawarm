import { useEffect } from 'react'
import { Target, Lightbulb, TrendingUp, AlertTriangle, CheckCircle2, Building2 } from 'lucide-react'

// ── Colour accent for this page ────────────────────────────────────────────
const ACCENT = '#06b6d4'

// ── Section data ─────────────────────────────────────────────────────────
const challenges = [
  'Difficulty reaching and sustaining a 30%+ open rate on outbound campaigns',
  'Improving domain reputation across multiple sending domains',
  'Handling catch-all email addresses that inflated bounce metrics',
  'Purchasing additional domains to spread sending volume',
  'Generating approximately 15 qualified leads per month at a sustainable cost',
]

const solutions = [
  {
    title: 'Custom Manual Warm-Up',
    desc: 'Designed a tailored manual warmup schedule based on Brysa\'s domain history, audience, and volume targets, building genuine sender reputation without automated tools.',
  },
  {
    title: 'Domain Reputation Improvement',
    desc: 'Audited and improved authentication (SPF, DKIM, DMARC), removed blocklist entries, and established consistent sending patterns to recover and strengthen domain reputation.',
  },
  {
    title: 'Promotional Content Whitelisting',
    desc: 'Worked to whitelist Brysa\'s promotional email content with ISPs, reducing spam flag rates and improving inbox placement for their outbound sequences.',
  },
  {
    title: 'Volume Strategy',
    desc: 'Implemented a structured progressive volume strategy, scaling daily send counts in alignment with inbox placement improvements to prevent ISP anomaly detection.',
  },
  {
    title: 'Audience Targeting Refinement',
    desc: 'Refined the target audience segmentation to improve engagement signal quality, reducing low-engagement sends that drag down sender score.',
  },
  {
    title: 'Catch-All Domain Validation',
    desc: 'Deployed a catch-all domain validation and volume strategy, identifying and safely handling catch-all addresses to reduce bounce rate below the 2% threshold.',
  },
]

const results = [
  { value: '70%+', label: 'Average open rate', sub: 'after 6 weeks of manual warmup' },
  { value: '6 wks', label: 'Time to results', sub: 'from campaign start to target open rate' },
  { value: '<2%', label: 'Bounce rate', sub: 'down from previous catch-all-inflated rate' },
  { value: '15/mo', label: 'Leads per month', sub: 'achieved with fewer sending domains' },
  { value: '20%', label: 'Revenue increase', sub: 'attributable to improved email program' },
]

// ── Page component ─────────────────────────────────────────────────────────
export default function CaseStudyEmailDeliverabilityPage({ navigate }: { navigate: (p: string) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = 'Email Deliverability Case Study, EvaWarm'
    return () => { document.title = 'EvaWarm' }
  }, [])

  return (
    <main>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 68, position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 70% 60% at 15% 30%, rgba(6,182,212,0.13) 0%, transparent 55%), radial-gradient(ellipse 55% 55% at 88% 10%, rgba(139,92,246,0.08) 0%, transparent 50%), #060b17',
      }}>
        <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '64px 64px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 1220, margin: '0 auto', padding: '72px 28px 88px' }}>


          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="cs-hero-grid">
            {/* Left */}
            <div>
              <span className="chip" style={{ marginBottom: 16, display: 'inline-flex' }}>Case Study</span>
              <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 58px)', color: '#edf0ff', letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
                Email<br /><span className="g-text">Deliverability</span>
              </h1>
              <p style={{ fontFamily: 'Inter', fontSize: 17, color: '#8896b3', lineHeight: 1.75, marginBottom: 28, maxWidth: 480 }}>
                How EvaWarm helped Brysa, a certified Salesforce partner in the UK, achieve a 70%+ average open rate and 20% more revenue within 6 weeks of manual email warmup.
              </p>

              {/* Quick stats strip */}
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[['70%+', 'Open Rate'], ['6 wks', 'To Results'], ['20%', 'Revenue↑']].map(([v, l]) => (
                  <div key={l} style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}22`, borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 22, color: ACCENT, letterSpacing: -0.8 }}>{v}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 11, color: '#5a6a86', marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: case-study image */}
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(6,182,212,0.15)', boxShadow: '0 8px 48px rgba(0,0,0,0.4)' }}>
              <img
                src="/uploads/case-study-open-email.jpg"
                alt="Email Deliverability Case Study, open email inbox"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:860px){ .cs-hero-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── About & Objective ────────────────────────────────────────── */}
      <section style={{ background: '#0b1324', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="cs-two-col">

          {/* About */}
          <div style={{ background: '#0f1b30', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ACCENT}10`, border: `1px solid ${ACCENT}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Building2 size={22} color={ACCENT} strokeWidth={1.8} />
              </div>
              <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 18, color: '#edf0ff' }}>About the Client</span>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#8896b3', lineHeight: 1.8 }}>
              <strong style={{ color: '#edf0ff' }}>Brysa</strong> is a certified Salesforce partner based in the United Kingdom, specializing in Salesforce management services. Their outbound email program is a critical driver of lead generation, making inbox placement and open rates central to their revenue pipeline.
            </p>
          </div>

          {/* Objective */}
          <div style={{ background: '#0f1b30', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Target size={22} color="#f59e0b" strokeWidth={1.8} />
              </div>
              <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 18, color: '#edf0ff' }}>Objective</span>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#8896b3', lineHeight: 1.8 }}>
              Achieve the highest possible open rate and generate a consistent volume of qualified leads. Additionally, reduce overall cost by decreasing the number of purchased domains and minimizing reliance on email automation software.
            </p>
          </div>

        </div>
        <style>{`@media(max-width:760px){ .cs-two-col { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── Business Challenges ──────────────────────────────────────── */}
      <section style={{ background: '#060b17', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="chip chip-orange" style={{ marginBottom: 14, display: 'inline-flex' }}>Business Challenge</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.3, lineHeight: 1.1, marginBottom: 14 }}>
              What Brysa Was<br /><span className="g-text">Struggling With</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              Before working with EvaWarm, Brysa's outbound email program faced several compounding deliverability obstacles.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 820, margin: '0 auto' }}>
            {challenges.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: '#0f1b30', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.18)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <AlertTriangle size={13} color="#f59e0b" strokeWidth={2} />
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#8896b3', lineHeight: 1.7 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ────────────────────────────────────────────────── */}
      <section style={{ background: '#0b1324', padding: '90px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, borderRadius: '50%', background: `radial-gradient(ellipse, ${ACCENT}05 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="chip chip-violet" style={{ marginBottom: 14, display: 'inline-flex' }}>Solution</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.3, lineHeight: 1.1, marginBottom: 14 }}>
              The EvaWarm<br /><span className="g-text">Approach</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              EvaWarm designed a multi-layer deliverability solution specific to Brysa's infrastructure, audience, and goals.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {solutions.map(({ title, desc }, i) => (
              <div key={i} style={{ background: '#0f1b30', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px 22px', transition: 'border-color 0.22s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${ACCENT}28`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#edf0ff' }}>{title}</div>
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 13.5, color: '#6a7a96', lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────────── */}
      <section style={{ background: '#060b17', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="chip" style={{ marginBottom: 14, display: 'inline-flex' }}>Results</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#edf0ff', letterSpacing: -1.3, lineHeight: 1.1, marginBottom: 14 }}>
              Measurable Outcomes<br /><span className="g-text">Within 6 Weeks</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
              After 6 weeks of EvaWarm's manual warm-up and deliverability program, Brysa's email metrics transformed.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 56 }}>
            {results.map(({ value, label, sub }) => (
              <div key={label} style={{ background: '#0f1b30', border: `1px solid ${ACCENT}18`, borderRadius: 18, padding: '28px 22px', textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 42px)', color: ACCENT, letterSpacing: -1.5, lineHeight: 1 }}>{value}</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 13, color: '#edf0ff', margin: '10px 0 6px', letterSpacing: -0.2 }}>{label}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#4a5a7a', lineHeight: 1.5 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Summary callout */}
          <div style={{ background: '#0f1b30', border: `1px solid ${ACCENT}20`, borderRadius: 20, padding: '32px 36px', maxWidth: 820, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${ACCENT}06 0%, transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ACCENT}10`, border: `1px solid ${ACCENT}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <TrendingUp size={22} color={ACCENT} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#edf0ff', marginBottom: 8 }}>Key Takeaway</div>
                <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: '#8896b3', lineHeight: 1.8, margin: 0 }}>
                  By combining manual warm-up with domain reputation management, catch-all validation, and audience refinement, EvaWarm enabled Brysa to achieve their target open rate, meet their lead generation goal with fewer sending domains, and increase revenue, all within a 6-week programme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0b1324', padding: '80px 28px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div className="gradient-border" style={{ background: '#0f1b30', borderRadius: 26, padding: 'clamp(36px, 5vw, 64px)', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${ACCENT}05 0%, transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', background: `${ACCENT}10`, border: `1px solid ${ACCENT}22`, marginBottom: 20, position: 'relative' }}>
              <Lightbulb size={26} color={ACCENT} strokeWidth={1.8} />
            </div>
            <span className="chip" style={{ marginBottom: 18, display: 'inline-flex', position: 'relative' }}>See What&apos;s Possible</span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 44px)', color: '#edf0ff', letterSpacing: -1.4, lineHeight: 1.1, marginBottom: 14, position: 'relative' }}>
              Ready to Improve<br /><span className="g-text">Your Open Rates?</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', lineHeight: 1.7, maxWidth: 460, margin: '0 auto 32px', position: 'relative' }}>
              See how EvaWarm can help improve your email deliverability and inbox placement.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <button onClick={() => navigate('services')} className="btn-primary btn-lg">
                View Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
