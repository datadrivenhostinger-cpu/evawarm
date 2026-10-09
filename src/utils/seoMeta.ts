/**
 * seoMeta.ts — Static SEO metadata for every indexable public page.
 *
 * Blog posts are handled dynamically in App.tsx using the blog JSON
 * title + excerpt fields, so they do NOT appear here.
 *
 * Keys match the Page type in App.tsx.
 * `null` canonical = non-indexable route (no canonical tag emitted).
 */

export interface SeoEntry {
  title: string
  description: string
  canonical: string | null   // pathname, e.g. '/services' — null = non-indexable
}

export const SEO_META: Record<string, SeoEntry> = {

  // ── Core pages ─────────────────────────────────────────────────────────────

  home: {
    title: 'EvaWarm | Email Deliverability & Email Warmup Experts',
    description: 'Improve email deliverability, sender reputation, and inbox placement with EvaWarm\'s expert email warmup and deliverability services.',
    canonical: '/',
  },
  services: {
    title: 'Email Deliverability Services | EvaWarm',
    description: 'Explore EvaWarm\'s email warmup, deliverability consulting, and outbound email services designed to improve inbox placement and sender reputation.',
    canonical: '/services',
  },
  'how-it-works': {
    title: 'How Email Warmup & Deliverability Works | EvaWarm',
    description: 'See how EvaWarm builds sender reputation, improves inbox placement, and helps businesses achieve reliable email deliverability.',
    canonical: '/how-it-works',
  },
  results: {
    title: 'Email Deliverability Results & Client Reviews | EvaWarm',
    description: 'See real email deliverability results, client experiences, open-rate improvements, and outcomes achieved with EvaWarm.',
    canonical: '/results',
  },
  testimonials: {
    title: 'EvaWarm Client Testimonials | Email Deliverability Reviews',
    description: 'Read client testimonials and experiences from businesses using EvaWarm for email warmup and deliverability improvement.',
    canonical: '/testimonials',
  },
  about: {
    title: 'About EvaWarm | Email Deliverability Experts',
    description: 'Learn about EvaWarm, our team, and our approach to email warmup, sender reputation, and long-term inbox deliverability.',
    canonical: '/about',
  },
  pricing: {
    title: 'Email Warmup & Deliverability Pricing | EvaWarm',
    description: 'Explore EvaWarm pricing for email warmup, deliverability support, and outbound email services built for reliable inbox placement.',
    canonical: '/pricing',
  },
  faq: {
    title: 'Email Deliverability FAQ | EvaWarm',
    description: 'Find answers to common questions about email warmup, deliverability, sender reputation, inbox placement, and outbound email.',
    canonical: '/faq',
  },
  contact: {
    title: 'Contact EvaWarm | Email Deliverability Experts',
    description: 'Contact EvaWarm to discuss email warmup, deliverability challenges, sender reputation, and outbound email requirements.',
    canonical: '/contact',
  },

  // ── Blog ──────────────────────────────────────────────────────────────────

  blog: {
    title: 'Email Deliverability & Email Warmup Blog | EvaWarm',
    description: 'Read EvaWarm\'s latest guides and insights on email deliverability, email warmup, sender reputation, cold email, and inbox placement.',
    canonical: '/blog',
  },
  // 'blog-post' is resolved dynamically in App.tsx

  // ── Service landing pages ─────────────────────────────────────────────────

  'services/manual-email-warmup': {
    title: 'Manual Email Warmup Services | EvaWarm',
    description: 'Build authentic sender reputation with EvaWarm\'s manual email warmup service designed to improve inbox placement and email deliverability.',
    canonical: '/services/manual-email-warmup',
  },
  'services/email-deliverability-consulting': {
    title: 'Email Deliverability Consulting Services | EvaWarm',
    description: 'Get expert email deliverability consulting to diagnose inbox placement issues, improve sender reputation, and strengthen email performance.',
    canonical: '/services/email-deliverability-consulting',
  },
  'services/outbound-email-marketing': {
    title: 'Outbound Email Marketing Services | EvaWarm',
    description: 'Build reliable outbound email campaigns with EvaWarm\'s deliverability-focused strategy, warmup, and inbox placement support.',
    canonical: '/services/outbound-email-marketing',
  },
  'services/deliverability-audit': {
    title: 'Email Deliverability Audit Services | EvaWarm',
    description: 'Identify email deliverability problems with a detailed audit covering sender reputation, authentication, inbox placement, and campaign performance.',
    canonical: '/services/deliverability-audit',
  },

  // ── Other service / resource pages ────────────────────────────────────────

  'email-warmup': {
    title: 'Email Warmup Services | EvaWarm',
    description: 'Improve sender reputation and inbox placement with EvaWarm email warmup strategies built for reliable outbound email performance.',
    canonical: '/email-warmup',
  },
  'services/bulk-email-warmup': {
    title: 'Bulk Email Warmup Services | EvaWarm',
    description: 'Warm multiple email accounts and domains with a structured bulk email warmup approach focused on sender reputation and inbox placement.',
    canonical: '/services/bulk-email-warmup',
  },
  'services/email-verification-services': {
    title: 'Email Verification Services | EvaWarm',
    description: 'Improve list quality and protect sender reputation with email verification and validation services from EvaWarm.',
    canonical: '/services/email-verification-services',
  },
  'resources/email-deliverability-assets': {
    title: 'Email Deliverability Resources & Assets | EvaWarm',
    description: 'Explore EvaWarm\'s email deliverability resources, guides, and assets to improve sender reputation and inbox placement.',
    canonical: '/resources/email-deliverability-assets',
  },
  'resources/case-study-emaildeliverability': {
    title: 'Email Deliverability Case Study | EvaWarm',
    description: 'See how EvaWarm helped improve email open rates, sender reputation, and revenue through a structured manual email warmup strategy.',
    canonical: '/resources/case-study-emaildeliverability',
  },

  // ── Legal pages ────────────────────────────────────────────────────────────

  'privacy-policy': {
    title: 'Privacy Policy | EvaWarm',
    description: 'Read EvaWarm\'s privacy policy to understand how information is collected, used, protected, and handled when using our website.',
    canonical: '/privacy-policy',
  },
  'terms-conditions': {
    title: 'Terms & Conditions | EvaWarm',
    description: 'Read EvaWarm\'s terms and conditions governing the use of our website, services, and related resources.',
    canonical: '/terms-conditions',
  },

  // ── Non-indexable / fallback (no canonical) ────────────────────────────────
  '404': {
    title: 'Page Not Found | EvaWarm',
    description: '',
    canonical: null,
  },
}
