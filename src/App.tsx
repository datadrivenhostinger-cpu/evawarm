import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  Hero,
  Marquee,
  VideoSection,
  WhyPartner,
  WhoBenefits,
  Stats,
  HowWeWork,
  ServicesPreview,
  Testimonials,
  HomeFAQ,
  FinalCTA,
} from '@/pages/Home'
import ServicesPage from '@/pages/ServicesPage'
import HowItWorksPage from '@/pages/HowItWorksPage'
import ResultsPage from '@/pages/ResultsPage'
import TestimonialsPage from '@/pages/TestimonialsPage'
import AboutPage from '@/pages/AboutPage'
import PricingPage from '@/pages/PricingPage'
import FAQPage from '@/pages/FAQPage'
import ContactPage from '@/pages/ContactPage'
import BlogPage from '@/pages/BlogPage'
import BlogPostPage from '@/pages/BlogPostPage'
import NotFoundPage from '@/pages/NotFoundPage'
import EmailWarmupPage from '@/pages/EmailWarmupPage'
import EmailVerificationPage from '@/pages/EmailVerificationPage'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import EmailDeliverabilityAssets from '@/pages/EmailDeliverabilityAssets'
import TermsAndConditions from '@/pages/TermsAndConditions'
import BulkEmailWarmupPage from '@/pages/BulkEmailWarmupPage'
import ServiceLandingPage from '@/pages/ServiceLandingPage'
import CaseStudyEmailDeliverabilityPage from '@/pages/CaseStudyEmailDeliverabilityPage'
import { serviceLandings } from '@/data/serviceLandings'
import { setSeo } from '@/utils/seo'
import { SEO_META } from '@/utils/seoMeta'
import { blogPosts } from '@/data/blog'

type Page =
  | 'home' | 'services' | 'how-it-works' | 'results' | 'testimonials'
  | 'about' | 'pricing' | 'faq' | 'contact' | 'blog' | 'blog-post'
  | 'email-warmup' | `services/${string}`
  | 'resources/email-deliverability-assets'
  | 'resources/case-study-emaildeliverability'
  | 'terms-conditions' | 'privacy-policy' | '404'

// ── Derive the active Page from the current pathname ────────────────────────
function pageFromPath(p: string): Page {
  if (p === '/' || p === '') return 'home'
  if (p === '/services') return 'services'
  if (p === '/how-it-works') return 'how-it-works'
  if (p === '/results') return 'results'
  if (p === '/testimonials') return 'testimonials'
  if (p === '/about') return 'about'
  if (p === '/pricing') return 'pricing'
  if (p === '/faq') return 'faq'
  if (p === '/contact') return 'contact'
  if (p === '/blog') return 'blog'
  if (p.startsWith('/blog/')) return 'blog-post'
  if (p === '/email-warmup') return 'email-warmup'
  if (p === '/services/bulk-email-warmup') return 'services/bulk-email-warmup'
  if (p === '/services/email-verification-services') return 'services/email-verification-services'
  if (p === '/resources/email-deliverability-assets') return 'resources/email-deliverability-assets'
  if (p === '/resources/case-study-emaildeliverability') return 'resources/case-study-emaildeliverability'
  if (p === '/terms-conditions') return 'terms-conditions'
  if (p === '/privacy-policy') return 'privacy-policy'
  const sl = serviceLandings.find(x => p === `/services/${x.slug}`)
  if (sl) return `services/${sl.slug}` as Page
  return '404'
}

export default function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname))
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname)

  // ── Navigate: update state + push clean URL ────────────────────────────────
  const navigate = (p: string) => {
    // Blog post calls arrive as "blog/slug" — map to the 'blog-post' page state
    // but push the full clean path so the slug is in the URL.
    let pageName: Page = p as Page
    if (p.startsWith('blog/')) pageName = 'blog-post'

    setPage(pageName)
    const path = p === 'home' ? '/' : `/${p}`
    window.history.pushState(null, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // ── Handle browser back/forward ────────────────────────────────────────────
  useEffect(() => {
    const onPop = () => {
      const pathname = window.location.pathname
      setPage(pageFromPath(pathname))
      setCurrentPath(pathname)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // ── SEO metadata — title, description, canonical ───────────────────────────
  useEffect(() => {
    // Blog posts: look up from the already-bundled blogPosts array
    if (page === 'blog-post') {
      const slug = currentPath.slice('/blog/'.length)
      const post = blogPosts.find(b => b.slug === slug)
      if (post) {
        const rawTitle = (post.title ?? '').trim()
        const title = rawTitle.toLowerCase().includes('evawarm')
          ? `${rawTitle} | Blog`
          : `${rawTitle} | EvaWarm`
        const description = (post.excerpt ?? '').trim().slice(0, 160)
        setSeo(title, description, `/blog/${slug}`)
      } else {
        setSeo('Blog | EvaWarm', 'Expert email deliverability and warmup insights from EvaWarm.', `/blog/${slug}`)
      }
      return
    }

    // Service landing pages: use dedicated metaTitle + metaDescription
    const landing = serviceLandings.find(x => page === `services/${x.slug}`)
    if (landing) {
      setSeo(
        landing.metaTitle,
        landing.metaDescription,
        `/services/${landing.slug}`,
      )
      return
    }

    // All other static pages
    const meta = SEO_META[page as string]
    if (meta) {
      setSeo(meta.title, meta.description, meta.canonical)
    }
  }, [page, currentPath])

  const landing = serviceLandings.find(x => page === `services/${x.slug}`)
  const showFooter = page !== '404'

  return (
    <div style={{ minHeight: '100vh', background: '#060b17', color: '#c4d0ee', overflowX: 'hidden' }}>
      {page !== '404' && <Nav currentPage={page} navigate={navigate} />}

      {page === 'home' ? (
        <>
          <Hero navigate={navigate} />
          <VideoSection />
          <Marquee />
          <WhyPartner />
          <WhoBenefits />
          <Stats />
          <HowWeWork />
          <ServicesPreview navigate={navigate} />
          <Testimonials />
          <HomeFAQ />
          <FinalCTA navigate={navigate} />
        </>
      ) : page === 'services' ? (
        <ServicesPage navigate={navigate} />
      ) : page === 'how-it-works' ? (
        <HowItWorksPage navigate={navigate} />
      ) : page === 'results' ? (
        <ResultsPage navigate={navigate} />
      ) : page === 'testimonials' ? (
        <TestimonialsPage navigate={navigate} />
      ) : page === 'about' ? (
        <AboutPage navigate={navigate} />
      ) : page === 'pricing' ? (
        <PricingPage navigate={navigate} />
      ) : page === 'faq' ? (
        <FAQPage navigate={navigate} />
      ) : page === 'contact' ? (
        <ContactPage navigate={navigate} />
      ) : page === 'blog' ? (
        <BlogPage navigate={navigate} />
      ) : page === 'blog-post' ? (
        <BlogPostPage slug={currentPath.slice('/blog/'.length)} navigate={navigate} />
      ) : page === 'email-warmup' ? (
        <EmailWarmupPage navigate={navigate} />
      ) : page === 'services/bulk-email-warmup' ? (
        <BulkEmailWarmupPage />
      ) : page === 'services/email-verification-services' ? (
        <EmailVerificationPage navigate={navigate} />
      ) : page === 'resources/email-deliverability-assets' ? (
        <EmailDeliverabilityAssets navigate={navigate} />
      ) : page === 'resources/case-study-emaildeliverability' ? (
        <CaseStudyEmailDeliverabilityPage navigate={navigate} />
      ) : page === 'terms-conditions' ? (
        <TermsAndConditions navigate={navigate} />
      ) : page === 'privacy-policy' ? (
        <PrivacyPolicy navigate={navigate} />
      ) : landing ? (
        <ServiceLandingPage key={landing.slug} service={landing} navigate={navigate} />
      ) : (
        <NotFoundPage navigate={navigate} />
      )}

      {showFooter && <Footer navigate={navigate} />}
    </div>
  )
}
