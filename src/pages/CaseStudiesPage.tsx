import { ArrowRight, BarChart3, Building2, ChevronRight, Star } from 'lucide-react'
import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import Breadcrumb from '@/components/Breadcrumb'

interface CaseStudiesPageProps {
  navigate: (page: string) => void
}

function StatBadge({ text }: { text: string }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'rgba(34,211,238,0.08)',
      border: '1px solid rgba(34,211,238,0.2)',
      borderRadius: 20,
      padding: '5px 12px',
      color: '#22d3ee',
      fontFamily: 'Sora, sans-serif',
      fontSize: 12,
      fontWeight: 600,
    }}>
      <BarChart3 size={12} />
      {text}
    </div>
  )
}

function CaseCard({ cs, navigate }: { cs: CaseStudy; navigate: (p: string) => void }) {
  return (
    <article
      className="card-glass"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Card header accent bar */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)' }} />

      <div style={{ padding: '32px 32px 28px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
        {/* Client + industry row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={18} color="#a78bfa" />
            </div>
            <div>
              <div style={{ color: '#edf0ff', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15 }}>{cs.client}</div>
              <div style={{ color: '#566278', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>{cs.industry}</div>
            </div>
          </div>
          <StatBadge text={`${cs.heroStats[0][0]} ${cs.heroStats[0][1]}`} />
        </div>

        {/* Title */}
        <div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', color: '#edf0ff', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.35, letterSpacing: '-0.5px', marginBottom: 10 }}>
            {cs.title}
          </h2>
          <p style={{ color: '#8191af', fontFamily: 'Inter, sans-serif', fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
            {cs.tagline}
          </p>
        </div>

        {/* Challenge / result highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ color: '#566278', fontFamily: 'Sora, sans-serif', fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Challenge</div>
            <div style={{ color: '#b9c6e0', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>{cs.challenges[0]}</div>
          </div>
          <div style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.1)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ color: '#566278', fontFamily: 'Sora, sans-serif', fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Key Outcome</div>
            <div style={{ color: '#22d3ee', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600 }}>{cs.heroStats[0][0]} {cs.heroStats[0][1]}</div>
          </div>
        </div>

        {/* Intro excerpt */}
        <p style={{ color: '#7a8da8', fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>
          {cs.about.slice(0, 180).trim()}…
        </p>

        {/* CTA */}
        <div style={{ marginTop: 'auto', paddingTop: 4 }}>
          <button
            onClick={() => navigate(`case-studies/${cs.slug}`)}
            className="btn-primary btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Read case study <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}

const stats = [
  { value: '94%', label: 'Peak inbox placement' },
  { value: '3', label: 'Industries served' },
  { value: '6 wks', label: 'Fastest turnaround' },
  { value: '0', label: 'Deliverability incidents for Attentive' },
]

const csPageFaqs = [
  { q: 'How long does a typical EvaWarm engagement take?', a: 'Most clients see measurable inbox placement improvement within 3–6 weeks. The exact timeline depends on starting reputation health, list quality, and target send volume.' },
  { q: 'Can you help us if our domain is already blacklisted?', a: 'Yes. We start with a full deliverability audit that includes blacklist status, authentication gaps, and list hygiene. In most cases, a combination of infrastructure fixes and disciplined warmup resolves blacklisting within weeks.' },
  { q: 'Do you work with regulated industries?', a: 'We do. Our engagement with IDM Pharma demonstrates our ability to design compliant outreach infrastructure that satisfies legal and data-governance requirements without compromising inbox performance.' },
  { q: 'What results can I realistically expect?', a: 'Clients with healthy infrastructure and clean lists typically reach 85–95% inbox placement within six weeks. Starting conditions vary, so we always conduct an audit before committing to specific targets.' },
]

export default function CaseStudiesPage({ navigate }: CaseStudiesPageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="mesh-hero page-texture" style={{ padding: '150px 32px 80px' }}>
        <div style={{ maxWidth: 1020, margin: '0 auto', textAlign: 'center' }}>
          <div className="chip" style={{ display: 'inline-flex', marginBottom: 24 }}>
            <Star size={14} /> EvaWarm Results
          </div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(38px, 6vw, 68px)', lineHeight: 1.05, letterSpacing: '-2.5px', color: '#edf0ff', fontWeight: 700, marginBottom: 22 }}>
            Real results, <span className="g-text">real clients.</span>
          </h1>
          <p style={{ maxWidth: 680, margin: '0 auto', color: '#9aabc9', fontSize: 18, lineHeight: 1.8 }}>
            Detailed breakdowns of how we fixed deliverability, scaled sending, and protected sender reputation for businesses across industries.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: 'rgba(6,11,23,0.9)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '28px 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }}>
          {stats.map(s => (
            <div key={s.value} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 800, color: '#22d3ee', letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#566278', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Case study cards */}
      <section className="mesh-alt" style={{ padding: '72px 32px 110px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ color: '#22d3ee', fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Client stories</div>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(26px, 3.5vw, 38px)', color: '#edf0ff', letterSpacing: '-1px', margin: 0 }}>
              From the field — how EvaWarm delivers.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
            {caseStudies.map(cs => (
              <CaseCard key={cs.slug} cs={cs} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#0b1324', padding: '80px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ color: '#22d3ee', fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Common questions</div>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(24px, 3vw, 34px)', color: '#edf0ff', letterSpacing: '-1px' }}>Questions about our work</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {csPageFaqs.map((faq) => (
              <details key={faq.q} className="card-glass" style={{ padding: '18px 22px', borderRadius: 14, cursor: 'pointer' }}>
                <summary style={{ fontFamily: 'Sora, sans-serif', color: '#edf0ff', fontSize: 15.5, fontWeight: 600, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  {faq.q}
                  <ChevronRight size={16} color="#22d3ee" style={{ flexShrink: 0 }} />
                </summary>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#8191af', fontSize: 14.5, lineHeight: 1.75, marginTop: 12, marginBottom: 0 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(24px, 3.2vw, 36px)', color: '#edf0ff', letterSpacing: '-1px', marginBottom: 16 }}>
            Want results like these?
          </h2>
          <p style={{ color: '#6e7e9e', fontFamily: 'Inter, sans-serif', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
            Book a free deliverability audit and we will show you exactly what is holding your emails back.
          </p>
          <button onClick={() => navigate('contact')} className="btn-primary btn-lg">
            Book a free audit <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  )
}
