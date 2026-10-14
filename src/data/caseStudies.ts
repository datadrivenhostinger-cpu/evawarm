export type CaseStudyStat  = { value: string; label: string; sub: string }
export type CaseStudySolution = { title: string; desc: string }

export type CaseStudy = {
  slug: string
  client: string
  title: string
  tagline: string
  industry: string
  heroStats: [string, string][]      // quick [value, label] pairs shown in hero
  about: string
  objective: string
  challenges: string[]
  solutions: CaseStudySolution[]
  stats: CaseStudyStat[]
  takeaway: string
  conclusion: string
  accent: string                     // hex accent colour for this study
}

export const caseStudies: CaseStudy[] = [
  // ──────────────────────────────────────────────────────────────────
  // 1. Brysa
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'brysa',
    client: 'Brysa',
    title: 'Email Deliverability',
    tagline: 'How EvaWarm helped Brysa, a certified Salesforce partner in the UK, achieve a 94% inbox placement rate and recover from spam-folder exile within 6 weeks of manual email warmup.',
    industry: 'B2B SaaS / Salesforce Partner',
    accent: '#06b6d4',
    heroStats: [
      ['94%', 'Inbox Placement'],
      ['6 wks', 'To Results'],
      ['4.1%', 'Reply Rate'],
    ],
    about:
      'Brysa is a certified Salesforce partner based in the United Kingdom, specialising in Salesforce management services. Their outbound email programme is a critical driver of lead generation, making inbox placement and open rates central to their revenue pipeline.',
    objective:
      'Recover inbox placement after a deliverability collapse caused by rapid volume scaling, and establish a sustainable sending infrastructure that could grow without repeat incidents.',
    challenges: [
      'Inbox placement collapsed from 70%+ to below 30% after a rapid volume scale-up',
      'Single sending domain with no warmup, authentication gaps, and high complaint rates',
      'DMARC policy set to "none" — failed authentications silently ignored',
      'Contact list contained 34%+ stale, unverified, or catch-all addresses',
      'Transactional and outreach email sharing the same domain, creating cross-contamination risk',
      'Sales pipeline dried up with open rates below 8% for two consecutive weeks',
    ],
    solutions: [
      {
        title: 'Full Deliverability Audit',
        desc: 'Audited DNS authentication (SPF, DKIM, DMARC), infrastructure, list hygiene, and historical complaint rates to identify all root causes before starting warmup.',
      },
      {
        title: 'DMARC Hardening',
        desc: 'Moved DMARC policy from "none" to monitored "quarantine" with reporting enabled, preventing future authentication failures from going undetected.',
      },
      {
        title: 'List Verification & Hygiene',
        desc: 'Ran the full contact list through the EvaWarm verification pipeline, removing 34% of addresses that were invalid, role-based, or catch-all.',
      },
      {
        title: 'Domain Isolation',
        desc: 'Separated cold outreach and transactional sending onto isolated subdomains so that future outreach complaints could never damage transactional reputation.',
      },
      {
        title: 'Manual Warmup Programme',
        desc: 'Six-week manual warmup using real human inboxes — not automated seed networks — scaling from 20 to 300+ emails per day per domain with engagement at every step.',
      },
      {
        title: 'Volume Strategy & Monitoring',
        desc: 'Daily deliverability checks via seed inbox placement tests, A/B subject line testing, and engagement monitoring ensured no regression before production launch.',
      },
    ],
    stats: [
      { value: '94%', label: 'Inbox Placement',     sub: 'across Gmail, Outlook & Yahoo' },
      { value: '6 wks', label: 'Time to Results',   sub: 'from audit to full production' },
      { value: '4.1%',  label: 'Reply Rate',        sub: 'exceeding pre-crisis baseline' },
      { value: '<2%',   label: 'Complaint Rate',    sub: 'down from problem-level highs' },
      { value: '0',     label: 'Domains Abandoned', sub: 'clean rebuild, no throwaway domains' },
    ],
    takeaway:
      'Warmup is not a one-time event. The protocol EvaWarm established became Brysa\'s standard operating procedure for every new domain they spin up — meaning deliverability problems at scale are now a solved problem for their business.',
    conclusion:
      'Brysa\'s turnaround demonstrates that even severely damaged sender reputation can be restored with the right sequence of infrastructure fixes and disciplined, manual warmup. The investment paid back within the first recovered campaign cycle.',
  },

  // ──────────────────────────────────────────────────────────────────
  // 2. Attentive
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'attentive',
    client: 'Attentive',
    title: 'Outbound Scaling',
    tagline: 'How EvaWarm helped Attentive scale from 500 to 8,000 emails per day across 12 domains with zero deliverability incidents over four consecutive months.',
    industry: 'MarTech / E-commerce',
    accent: '#8b5cf6',
    heroStats: [
      ['8k/day', 'Peak Volume'],
      ['0', 'Incidents'],
      ['96%', 'Peak Inbox Rate'],
    ],
    about:
      'Attentive is a marketing technology company serving mid-market and enterprise e-commerce brands. As they expanded their outbound sales motion, they needed to scale cold email from 500 to 8,000 emails per day across multiple domains without triggering spam filters.',
    objective:
      'Design a multi-domain sending architecture that could grow safely from 500 to 8,000 emails per day, maintain separate identities for different outreach personas, and sustain "High" Google Postmaster Tool reputation throughout.',
    challenges: [
      'Previous scaling attempts caused Google Postmaster scores to drop to "Bad" within days, forcing domain abandonment',
      'No structured warmup — volume increases were ad hoc, triggering ISP anomaly detection',
      'Multiple outreach personas needed separate domain identities, requiring multi-domain architecture',
      'Reply routing was broken — replies from prospects did not reach the correct sales rep\'s inbox',
      'No monitoring in place — deliverability failures were discovered after revenue impact, not before',
      'ISPs flag domains that increase volume faster than 40% per day as suspicious senders',
    ],
    solutions: [
      {
        title: 'Multi-Domain Portfolio Design',
        desc: '12 sending domains purpose-built for specific outreach personas, warmed sequentially so at least 8 mature domains were always available for production sending.',
      },
      {
        title: 'Full Authentication Stack',
        desc: 'Each domain received strict SPF, 2048-bit DKIM, DMARC graduated from "none" to "reject", and BIMI records on highest-volume domains for Gmail brand trust.',
      },
      {
        title: 'Reply Routing Fix',
        desc: 'Configured separate MX routing per domain so prospect replies landed in the correct sales rep\'s inbox, maintaining the engagement loop and generating positive sender signals.',
      },
      {
        title: '21-Day Sequential Warmup',
        desc: 'Each domain followed a 21-day manual warmup protocol with a maximum 40% daily volume increase, before entering production rotation.',
      },
      {
        title: 'Continuous Monitoring',
        desc: 'Daily checks across Google Postmaster Tools, Microsoft SNDS, and Barracuda reputation data. Any anomaly triggered an automatic domain hold pending investigation.',
      },
      {
        title: 'Rotating Domain System',
        desc: 'New domains always being warmed in the background, so production capacity could grow steadily without any single domain bearing sudden volume jumps.',
      },
    ],
    stats: [
      { value: '8k/day',  label: 'Daily Send Volume',      sub: 'scaled from 500 over 4 months' },
      { value: '0',       label: 'Deliverability Incidents', sub: 'across the entire scaling period' },
      { value: '91–96%',  label: 'Inbox Placement',        sub: 'consistent across Gmail & Outlook' },
      { value: '4 mo',    label: 'Scaling Duration',       sub: 'no domain abandoned in that period' },
      { value: 'High',    label: 'Postmaster Reputation',  sub: 'all domains maintained this rating' },
    ],
    takeaway:
      'The infrastructure Attentive built with EvaWarm is now a competitive advantage. While peers periodically lose days or weeks to deliverability crises, Attentive\'s outbound programme runs without interruption — and scales on demand.',
    conclusion:
      'Scaling email volume safely is an engineering problem as much as a marketing one. Attentive\'s success came from treating it that way — systematic design, disciplined protocols, and daily measurement rather than ad-hoc volume pushes.',
  },

  // ──────────────────────────────────────────────────────────────────
  // 3. IDM Pharma
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'idm-pharma',
    client: 'IDM (Pharma)',
    title: 'Compliant Outreach',
    tagline: 'How EvaWarm helped IDM Pharma achieve 89% inbox placement reaching healthcare professionals across NHS and private hospital domains — in a fully regulated environment.',
    industry: 'Pharmaceutical / Healthcare',
    accent: '#10b981',
    heroStats: [
      ['89%', 'Inbox Placement'],
      ['10 wks', 'Warmup Programme'],
      ['30%', 'Faster Approvals'],
    ],
    about:
      'IDM is a pharmaceutical company that uses email outreach to communicate with healthcare professionals (HCPs) — a highly regulated audience with strict compliance requirements under GDPR, HIPAA-adjacent guidelines, and industry codes of practice.',
    objective:
      'Achieve strong inbox placement reaching NHS and private hospital email domains while satisfying medical-legal content approval requirements, GDPR compliance, and internal data-governance audit obligations.',
    challenges: [
      'HCP email addresses hosted on NHS and hospital domains apply aggressive content filtering for pharmaceutical terminology',
      'Content required medical and legal review before sending, creating long approval cycles that limited copy iteration',
      'DMARC policy was absent — authenticated and unauthenticated sends were indistinguishable to receiving servers',
      'No audit trail for send-time metadata, blocking internal data-governance sign-off on the programme',
      'Standard seed warmup networks are ineffective for NHS mail environments that operate outside major ISP reputation systems',
      'Regulatory exposure: incorrect sender identity or unapproved content in a single send creates legal risk',
    ],
    solutions: [
      {
        title: 'Compliance-First Infrastructure',
        desc: 'Worked with legal and medical affairs upfront to define approved sender names, domain formats, and content guardrails — embedding compliance by design, not review.',
      },
      {
        title: 'Full Authentication at "Reject"',
        desc: 'Dedicated sending domains with strict SPF, DKIM, and DMARC at "reject" policy from day one — maximising trust with NHS servers that apply extra scrutiny to pharma senders.',
      },
      {
        title: 'Audit-Compliant Logging',
        desc: 'Integrated a logging layer recording full send-time metadata (recipient, timestamp, message hash) to an audit-compliant store, satisfying internal governance without impacting deliverability.',
      },
      {
        title: 'HCP-Domain Warmup',
        desc: 'Built warmup using IDM\'s own internal NHS and hospital contacts — generating domain-specific positive signals that standard seed networks cannot provide.',
      },
      {
        title: 'Conservative Volume Strategy',
        desc: 'Low, consistent volume rather than aggressive ramps — HCP domains reward reliability over time rather than raw engagement rates or rapid volume growth.',
      },
      {
        title: 'Custom Bounce Monitoring',
        desc: 'NHS mail servers return custom bounce codes requiring manual interpretation. We monitored and categorised every bounce to distinguish temporary blocks from permanent failures.',
      },
    ],
    stats: [
      { value: '89%',  label: 'Inbox Placement',    sub: 'across NHS, private & commercial domains' },
      { value: '10 wks', label: 'Programme Length', sub: 'warmup + infrastructure setup' },
      { value: '30%',  label: 'Faster Approvals',   sub: 'reduction in campaign approval time' },
      { value: '1st',  label: 'Audit Submission',   sub: 'data governance review passed first time' },
      { value: '0',    label: 'Compliance Breaches', sub: 'across the entire programme' },
    ],
    takeaway:
      'Compliance and deliverability are not in opposition. The discipline required to meet pharma\'s regulatory standards — consistent sender identity, documented processes, controlled volume — is also exactly what builds durable inbox trust.',
    conclusion:
      'IDM Pharma\'s programme shows that even the most regulated outreach contexts can achieve strong inbox performance when compliance requirements are treated as engineering specifications rather than obstacles to work around.',
  },
]
