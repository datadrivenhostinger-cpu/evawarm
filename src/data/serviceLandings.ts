export interface ServiceLanding {
  slug: string
  navLabel: string
  title: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  heroSub: string
  highlight: string
  intro: string
  stats: { v: string; l: string }[]
  included: { t: string; d: string }[]
  steps: { t: string; d: string }[]
  audience: { t: string; d: string }[]
  quote: { q: string; n: string; r: string }
  faqs: { q: string; a: string }[]
}

export const serviceLandings: ServiceLanding[] = [
  {
    slug: 'manual-email-warmup',
    navLabel: 'Manual Email Warmup',
    title: 'Manual Email Warmup',
    metaTitle: 'Manual Email Warmup Service | Human-Driven Sender Reputation | EvaWarm',
    metaDescription: 'Build genuine sender reputation with EvaWarm manual email warmup. Real human engagement and progressive volume scaling for reliable inbox placement.',
    eyebrow: 'Service 01',
    heroSub: 'Real people, real inbox activity. The warmup ISPs actually trust.',
    highlight: 'Manual',
    intro: 'Automated warmup tools trade emails between pools of fake accounts, and ISPs discount those signals. Our team opens, replies to, and rescues your emails by hand so your reputation grows on genuine engagement.',
    stats: [{ v: '94%', l: 'Avg inbox placement after warmup' }, { v: '3-6 wks', l: 'Typical warmup duration' }, { v: '0.1%', l: 'Target spam complaint rate' }],
    included: [
      { t: 'Full Infrastructure Audit', d: 'SPF, DKIM, DMARC, IP reputation and ESP configuration reviewed before a single warmup email is sent.' },
      { t: 'Volume Scaling Protocol', d: 'Daily increments calibrated to your domain history so ISP anomaly detection is never triggered.' },
      { t: 'Engagement Signal Seeding', d: 'Real opens, replies and saves in healthy ratios that teach ISPs your mail is wanted.' },
      { t: 'Real-Time ISP Monitoring', d: 'Google Postmaster, Microsoft SNDS and blocklist feeds watched continuously.' },
      { t: 'Weekly Progress Reports', d: 'Plain-language reports on placement, reputation and milestones.' },
      { t: 'Post-Warmup Handoff', d: 'Safe sending volumes, list hygiene rules and maintenance guidance when we finish.' },
    ],
    steps: [
      { t: 'Audit', d: 'We review authentication, domain age and sending history.' },
      { t: 'Plan', d: 'A custom volume schedule is built around your target send size.' },
      { t: 'Warm', d: 'Our team runs human engagement on every warmup batch.' },
      { t: 'Monitor', d: 'Reputation and spam signals are tracked daily.' },
      { t: 'Scale', d: 'Volume rises gradually until you reach launch-ready levels.' },
    ],
    audience: [
      { t: 'New domains', d: 'Start with a clean reputation from day one.' },
      { t: 'Switching ESPs', d: 'Move providers without losing inbox placement.' },
      { t: 'Recovering senders', d: 'Rebuild after blocklisting or a spam-folder slump.' },
    ],
    quote: { q: 'After their warmup, we went from 22% to 65% open rates. That is not incremental, that is transformational.', n: 'Ankur', r: 'Growth Marketer, Attentive' },
    faqs: [
      { q: 'How long does manual warmup take?', a: 'Typically 3 to 6 weeks depending on domain age, sending history and target volume.' },
      { q: 'How is manual different from automated warmup?', a: 'Automated tools exchange mail between fake account pools. Manual warmup uses real human interaction that ISPs reward.' },
      { q: 'Which platforms do you support?', a: 'Gmail, Outlook, SMTP-based platforms and major ESPs including Mailchimp, SendGrid and Instantly.' },
      { q: 'How many emails per day will you send during warmup?', a: 'We start at a low daily volume matched to your domain history and raise it gradually, so your sending pattern always looks natural to mailbox providers.' },
      { q: 'Do I need to stop my normal sending during warmup?', a: 'Not necessarily. We agree a safe plan with you, and many clients keep light, high-quality sending running alongside the warmup.' },
      { q: 'Will I be able to see progress?', a: 'Yes. We track inbox placement, engagement and reputation signals and share regular updates so you know where your domain stands.' },
    ],
  },
  {
    slug: 'email-deliverability-consulting',
    navLabel: 'Deliverability Consulting',
    title: 'Email Deliverability Consulting',
    metaTitle: 'Email Deliverability Consulting | Fix Spam Folder & Bounce Issues | EvaWarm',
    metaDescription: 'Expert email deliverability consulting from EvaWarm. Fix spam folder issues, authentication gaps, and blocklists to restore inbox placement for your domain.',
    eyebrow: 'Service 02',
    heroSub: 'Fix the root cause, not just the symptom.',
    highlight: 'Deliverability',
    intro: 'Falling open rates, mystery bounces and spam-folder landings are symptoms. We diagnose authentication gaps, blocklists, reputation damage and infrastructure problems, then fix them systematically.',
    stats: [{ v: '100K+', l: 'Spam emails resolved' }, { v: '48 hrs', l: 'Avg blocklist removal time' }, { v: '2.1%', l: 'Target avg bounce rate' }],
    included: [
      { t: 'Authentication Audit & Remediation', d: 'Complete SPF, DKIM and DMARC review with step-by-step fixes.' },
      { t: 'Blocklist Identification & Removal', d: 'Scans across 50+ blocklists with removal requests handled for you.' },
      { t: 'Inbox Placement Testing', d: 'Seed tests across Gmail, Outlook, Yahoo and corporate servers.' },
      { t: 'ISP Feedback Loop Setup', d: 'Postmaster Tools, SNDS and FBL enrollment for ISP-level visibility.' },
      { t: 'List Hygiene & Validation', d: 'Validation, bounce cleanup and engagement segmentation.' },
      { t: 'Ongoing Reputation Monitoring', d: 'Monthly health reports with actionable recommendations.' },
    ],
    steps: [
      { t: 'Diagnose', d: 'We pinpoint where and why mail is failing.' },
      { t: 'Repair', d: 'Authentication, DNS and list issues are corrected.' },
      { t: 'Recover', d: 'Blocklist removals and reputation rebuilding begin.' },
      { t: 'Verify', d: 'Placement tests confirm the fixes worked.' },
      { t: 'Maintain', d: 'Ongoing monitoring keeps problems from returning.' },
    ],
    audience: [
      { t: 'Marketing teams', d: 'Get campaigns out of the promotions and spam tabs.' },
      { t: 'SaaS companies', d: 'Protect transactional and lifecycle email delivery.' },
      { t: 'Agencies', d: 'Resolve client deliverability problems with expert backup.' },
    ],
    quote: { q: 'Our new domain was trusted from day one. Their understanding of ISP behavior is genuinely unmatched.', n: 'Natarajan', r: 'Co-Founder, LeadWalut' },
    faqs: [
      { q: 'How do I know if deliverability is my problem?', a: 'Declining open rates, bounce rates above 3%, spam complaints above 0.1% or blocklist presence are the usual signs.' },
      { q: 'Can you work with our existing ESP or CRM?', a: 'Yes. We work with HubSpot, Salesforce, Mailchimp, Instantly, Smartlead and custom infrastructure.' },
      { q: 'What authentication is required?', a: 'At minimum SPF, DKIM and a DMARC policy. We audit and remediate any gaps first.' },
      { q: 'What does deliverability consulting include?', a: 'Authentication setup (SPF, DKIM, DMARC), reputation and blocklist review, list and content guidance, and a clear action plan for your sending setup.' },
      { q: 'How quickly can you fix a deliverability problem?', a: 'It depends on the cause. Authentication and configuration issues can often be corrected quickly, while reputation recovery takes consistent sending over several weeks.' },
      { q: 'Do you work with my existing email platform?', a: 'Yes. We work with Gmail, Outlook, SMTP-based setups and major email service providers, with no platform migration needed.' },
    ],
  },
  {
    slug: 'outbound-email-marketing',
    navLabel: 'Outbound Email Marketing',
    title: 'Outbound Email Marketing',
    metaTitle: 'Outbound Email Marketing Service | Cold Email Campaigns That Convert | EvaWarm',
    metaDescription: 'Run outbound email campaigns that reach the inbox with EvaWarm. Deliverability-first setup, proven cold email sequences, and sender reputation management.',
    eyebrow: 'Service 03',
    heroSub: 'Sequences that start conversations, not delete-fests.',
    highlight: 'Outbound',
    intro: 'Great outbound is strategy, copy and deliverability working together. We fix the infrastructure first, then layer on proven messaging so your emails are seen, read and answered.',
    stats: [{ v: '65%', l: 'Avg open rate achieved' }, { v: '3×', l: 'Avg pipeline growth' }, { v: '12%', l: 'Avg reply rate on optimized sequences' }],
    included: [
      { t: 'Cold Email Strategy', d: 'ICP definition, message-market fit and send strategy before any copy is written.' },
      { t: 'Sequence Copywriting', d: 'Direct, specific, value-forward emails written for humans.' },
      { t: 'Multi-Touch Cadence Design', d: 'The right number of touches, spacing and exit conditions.' },
      { t: 'A/B Testing & Optimization', d: 'Systematic tests of subject lines, openers and CTAs.' },
      { t: 'Deliverability-First Execution', d: 'Volume pacing, spam-trigger avoidance and bounce management built in.' },
      { t: 'Campaign Reporting', d: 'Open, click, reply and conversion rates by sequence step.' },
    ],
    steps: [
      { t: 'Define', d: 'Pin down your ideal customer and offer.' },
      { t: 'Build', d: 'Warm domains and write the sequences.' },
      { t: 'Launch', d: 'Send at safe, paced volumes.' },
      { t: 'Test', d: 'Iterate on copy and targeting with real data.' },
      { t: 'Scale', d: 'Expand what works into more pipeline.' },
    ],
    audience: [
      { t: 'Sales teams', d: 'Fill the pipeline with qualified conversations.' },
      { t: 'Founders', d: 'Get early customers without hiring an SDR team.' },
      { t: 'Agencies', d: 'Run outbound for clients on a healthy sending base.' },
    ],
    quote: { q: 'Within 3 weeks we were hitting 85%+ inbox placement and open rates we had not seen in years.', n: 'Jonathan Rodger', r: 'Founder, Datyle' },
    faqs: [
      { q: 'Do you write the emails?', a: 'Yes. We handle strategy, sequence copy, cadence design and ongoing optimization.' },
      { q: 'Will my domain be safe?', a: 'Every campaign is built deliverability-first, with warmup, pacing and bounce control.' },
      { q: 'How soon will I see replies?', a: 'Most clients see meaningful reply data within the first two to three weeks of sending.' },
      { q: 'What does outbound email marketing support cover?', a: 'Campaign strategy, list and audience guidance, sequence and copy review, and deliverability checks so your messages reach the inbox.' },
      { q: 'Do you send the campaigns for me?', a: 'We advise and support your outreach process. Tell us how hands-on you want us to be and we will agree a scope that fits.' },
      { q: 'How do you keep cold outreach compliant?', a: 'We guide you on consent, clear opt-outs and sending practices that follow applicable email regulations and provider guidelines.' },
    ],
  },
  {
    slug: 'deliverability-audit',
    navLabel: 'Deliverability Audit',
    title: 'Email Deliverability Audit',
    metaTitle: 'Email Deliverability Audit | Free Inbox Placement & Sender Health Check | EvaWarm',
    metaDescription: 'Get an email deliverability audit from EvaWarm covering authentication, blocklists, sender reputation, and inbox placement, with a prioritised action plan.',
    eyebrow: 'Service 04',
    heroSub: 'An honest look at why your emails are or are not reaching the inbox.',
    highlight: 'Audit',
    intro: 'Our audit checks authentication, blocklists, reputation and inbox placement, then hands you a prioritised action plan written in plain language.',
    stats: [{ v: '50+', l: 'Blocklists checked' }, { v: '3', l: 'Major ISPs placement-tested' }, { v: '48 hrs', l: 'Typical report turnaround' }],
    included: [
      { t: 'Authentication Check', d: 'SPF, DKIM, DMARC and alignment verified end to end.' },
      { t: 'Blocklist Scan', d: 'Domain and IP checked against 50+ major lists.' },
      { t: 'Inbox Placement Test', d: 'Seed tests show where your mail lands at each ISP.' },
      { t: 'Reputation Review', d: 'Domain and IP reputation assessed with ISP tools.' },
      { t: 'List Quality Review', d: 'Bounce and engagement patterns flagged for cleanup.' },
      { t: 'Action Plan', d: 'A prioritised, plain-language fix list with a walkthrough call.' },
    ],
    steps: [
      { t: 'Request', d: 'Share your sending domain and platform.' },
      { t: 'Scan', d: 'We run technical and placement checks.' },
      { t: 'Analyse', d: 'Findings are ranked by impact.' },
      { t: 'Report', d: 'You receive the audit and action plan.' },
      { t: 'Walkthrough', d: 'We talk through the fixes on a call.' },
    ],
    audience: [
      { t: 'Before a launch', d: 'Confirm your setup is safe before a big campaign.' },
      { t: 'After a drop', d: 'Find out why open rates suddenly fell.' },
      { t: 'Choosing a fix', d: 'Learn whether you need warmup, consulting or both.' },
    ],
    quote: { q: 'They found problems three other vendors missed, and gave us a clear list of what to fix first.', n: 'EvaWarm client', r: 'B2B sender' },
    faqs: [
      { q: 'Is the audit free?', a: 'Submit the form for a free initial audit. Deeper remediation work is scoped separately.' },
      { q: 'What do you need from me?', a: 'Your sending domain and the platform you send from. No passwords are required.' },
      { q: 'What happens after the audit?', a: 'You get a prioritised plan and can fix things yourself or have us do it.' },
      { q: 'What will the audit report tell me?', a: 'It shows how your authentication, reputation, blocklist status and inbox placement look today, with prioritised recommendations to fix any issues.' },
      { q: 'Do I need to give you access to my email accounts?', a: 'No. We work from your domain configuration and test sends, and we do not need access to your mailbox contents.' },
      { q: 'Can you help me fix the issues the audit finds?', a: 'Yes. You get a step-by-step plan, and we can help you implement it or you can use it with your own team.' },
    ],
  },
]
