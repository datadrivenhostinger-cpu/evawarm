import type { ReactNode } from 'react'

const MESH =
  'radial-gradient(ellipse 80% 70% at 10% 30%, rgba(6,182,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139,92,246,0.09) 0%, transparent 52%), #060b17'

const P: React.CSSProperties = { fontFamily: 'Inter', fontSize: 16, lineHeight: 1.8, color: '#94a3b8', margin: '0 0 16px' }

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="pp-link">{children}</a>
}

function H2({ children }: { children: string }) {
  return <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 24, color: '#edf0ff', borderLeft: '4px solid #22d3ee', paddingLeft: 16, margin: '0 0 20px' }}>{children}</h2>
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((b, i) => (
        <li key={i} style={{ ...P, margin: 0, display: 'flex', gap: 14 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', marginTop: 12 }} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <hr style={{ border: 'none', borderTop: '1px solid #1e293b', margin: '48px 0 0' }} />
      <div style={{ marginTop: 48 }}>
        <H2>{title}</H2>
        {children}
      </div>
    </>
  )
}

export default function PrivacyPolicy({ navigate }: { navigate: (p: string) => void }) {
  return (
    <main>
      <style>{`.pp-link{color:#22d3ee;text-decoration:none}.pp-link:hover{text-decoration:underline}`}</style>
      <section style={{ paddingTop: 68, position: 'relative', overflow: 'hidden', background: MESH }}>
        <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '72px 72px', position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '90px 32px 120px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 'clamp(34px, 5.5vw, 62px)', letterSpacing: -2, lineHeight: 1.06, color: '#edf0ff' }}>
            Privacy Policy <span className="g-text">For EvaWarm</span>
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#6e7e9e', marginTop: 18 }}>Just say the word, we can do it ALL!!</p>
        </div>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', height: 70, display: 'block' }} aria-hidden="true">
          <path d="M0,40 C240,90 480,0 720,36 C960,72 1200,10 1440,44 L1440,80 L0,80 Z" fill="#060b17" />
        </svg>
      </section>

      <section style={{ background: '#060b17', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={P}>
            At EvaWarm, accessible from <Ext href="https://datadriven-services.com/easemedicalservices/">https://datadriven-services.com/easemedicalservices/</Ext>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EvaWarm and how we use it.
          </p>
          <p style={P}>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. Our Privacy Policy was generated with the help of GDPR Privacy Policy Generator.
          </p>

          <Block title="General Data Protection Regulation (GDPR)">
            <p style={P}>We are a Data Controller of your information.</p>
            <p style={P}>EvaWarm legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:</p>
            <List items={[
              'EvaWarm needs to perform a contract with you',
              'You have given EvaWarm permission to do so',
              'Processing your personal information is in EvaWarm legitimate interests',
              'EvaWarm needs to comply with the law',
            ]} />
            <p style={P}>EvaWarm will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
            <p style={P}>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you wish to be informed what Personal Information we hold about you and if you want it to be removed from our systems, please contact us.</p>
            <p style={P}>In certain circumstances, you have the following data protection rights:</p>
            <List items={[
              'The right to access, update or to delete the information we have on you.',
              'The right of rectification.',
              'The right to object.',
              'The right of restriction.',
              'The right to data portability.',
              'The right to withdraw consent.',
            ]} />
          </Block>

          <Block title="Log Files">
            <p style={P}>EvaWarm follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
          </Block>

          <Block title="Cookies and Web Beacons">
            <p style={P}>Like any other website, EvaWarm uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
          </Block>

          <Block title="Our Advertising Partners">
            <p style={P}>Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>
            <List items={[<>Google — <Ext href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</Ext></>]} />
          </Block>

          <Block title="Privacy Policies">
            <p style={P}>You may consult this list to find the Privacy Policy for each of the advertising partners of EvaWarm.</p>
            <p style={P}>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on EvaWarm, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
            <p style={P}>Note that EvaWarm has no access to or control over these cookies that are used by third-party advertisers.</p>
          </Block>

          <Block title="Third Party Privacy Policies">
            <p style={P}>EvaWarm's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
            <p style={P}>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
          </Block>

          <Block title="Children's Information">
            <p style={P}>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
            <p style={P}>EvaWarm does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
          </Block>

          <Block title="Online Privacy Policy Only">
            <p style={P}>Our Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in EvaWarm. This policy is not applicable to any information collected offline or via channels other than this website.</p>
          </Block>

          <Block title="Consent">
            <p style={P}>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
          </Block>
        </div>
      </section>

      <section style={{ background: '#060b17', padding: '20px 24px 100px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: '#0d1424', border: '1px solid #1e293b', borderRadius: 20, padding: '48px 32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, color: '#edf0ff', margin: '0 0 10px' }}>Have questions about our privacy policy?</h3>
          <p style={{ ...P, color: '#6e7e9e', marginBottom: 26 }}>We're happy to help. Reach out to us anytime.</p>
          <button onClick={() => navigate('contact')} style={{ background: '#22d3ee', color: '#060b17', border: 'none', borderRadius: 999, padding: '12px 30px', fontFamily: 'Sora', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Contact Us
          </button>
        </div>
      </section>
    </main>
  )
}
