const MESH =
  'radial-gradient(ellipse 80% 70% at 10% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), #060b17'

const P: React.CSSProperties = { fontFamily: 'Inter', fontSize: 16, lineHeight: 1.85, color: '#94a3b8', margin: 0 }

const bullets = [
  'The content of the pages of this website is for your general information and use only. It is subject to change without notice.',
  'Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.',
  'Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.',
  'This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.',
  'All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.',
  'Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.',
  'From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information.',
  "You may not create a link to this website from another website or document without EvaWarm's prior written consent.",
  'Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.',
]

const Divider = () => <hr style={{ border: 'none', borderTop: '1px solid #1e293b', margin: '36px 0' }} />

export default function TermsAndConditions({ navigate }: { navigate: (p: string) => void }) {
  return (
    <main>
      <section style={{ paddingTop: 68, position: 'relative', overflow: 'hidden', background: MESH }}>
        <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '90px 32px 120px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: -2, lineHeight: 1.06, color: '#edf0ff' }}>
            Terms <span className="g-text">&amp; Conditions</span>
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#6e7e9e', marginTop: 18 }}>Last updated on Nov 22nd 2022</p>
        </div>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', height: 70, display: 'block' }} aria-hidden="true">
          <path d="M0,40 C240,90 480,0 720,36 C960,72 1200,10 1440,44 L1440,80 L0,80 Z" fill="#060b17" />
        </svg>
      </section>

      <section style={{ background: '#060b17', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={P}>
            The Website Owner, including subsidiaries and affiliates ("Website" or "Website Owner" or "we" or "us" or "our") provides the information contained on the website or any of the pages comprising the website ("website") to visitors ("visitors") (cumulatively referred to as "you" or "your" hereinafter) subject to the terms and conditions set out in these website terms and conditions, the privacy policy and any other relevant terms and conditions, policies and notices which may be applicable to a specific section or module of the website.
          </p>
          <Divider />
          <p style={P}>
            Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern EvaWarm's relationship with you in relation to this website.
          </p>
          <Divider />
          <p style={P}>
            The term 'EvaWarm' or 'us' or 'we' refers to the owner of the website whose registered/operational office is 17/17, Nagavalli Amman Koil St, Gandhi Nagar, Avadi Tiruvallur TAMIL NADU 600054. The term 'you' refers to the user or viewer of our website.
          </p>
          <Divider />
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, color: '#edf0ff', margin: '0 0 20px' }}>
            The use of this website is subject to the following terms of use:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {bullets.map(b => (
              <li key={b} style={{ ...P, display: 'flex', gap: 14 }}>
                <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', marginTop: 12 }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p style={{ ...P, marginTop: 32 }}>
            We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
          </p>
        </div>
      </section>

      <section style={{ background: '#060b17', padding: '20px 24px 100px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: '#0d1424', border: '1px solid #1e293b', borderRadius: 20, padding: '48px 32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, color: '#edf0ff', margin: '0 0 10px' }}>Have questions about our terms?</h3>
          <p style={{ ...P, color: '#6e7e9e', marginBottom: 26 }}>Feel free to reach out to us at any time.</p>
          <button onClick={() => navigate('contact')} style={{ background: '#22d3ee', color: '#060b17', border: 'none', borderRadius: 10, padding: '12px 28px', fontFamily: 'Sora', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Contact Us
          </button>
        </div>
      </section>
    </main>
  )
}
