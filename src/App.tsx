import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  Hero,
  Marquee,
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
import { serviceLandings } from '@/data/serviceLandings'

type Page = 'home' | 'services' | 'how-it-works' | 'results' | 'testimonials' | 'about' | 'pricing' | 'faq' | 'contact' | 'blog' | 'blog-post' | 'email-warmup' | `services/${string}` | 'email-deliverability-assets' | 'terms-conditions' | 'privacy-policy' | '404'

function getInitialPage(): Page {
  const h = window.location.hash
  if (h === '#/services') return 'services'
  if (h === '#/how-it-works') return 'how-it-works'
  if (h === '#/results') return 'results'
  if (h === '#/testimonials') return 'testimonials'
  if (h === '#/about') return 'about'
  if (h === '#/pricing') return 'pricing'
  if (h === '#/faq') return 'faq'
  if (h === '#/contact') return 'contact'
  if (h === '#/blog') return 'blog'
  if (h.startsWith('#/blog/')) return 'blog-post'
  if (h === '#/email-warmup') return 'email-warmup'
  if (h === '#/services/bulk-email-warmup') return 'services/bulk-email-warmup'
  if (h === '#/services/email-verification-services') return 'services/email-verification-services'
  if (h === '#/email-deliverability-assets') return 'email-deliverability-assets'
  if (h === '#/terms-conditions') return 'terms-conditions'
  if (h === '#/privacy-policy') return 'privacy-policy'
  const sl = serviceLandings.find(x => h === `#/services/${x.slug}`)
  if (sl) return `services/${sl.slug}`
  return 'home'
}

export default function App() {
  const [page, setPage] = useState<Page>(getInitialPage)

  const navigate = (p: string) => {
    setPage(p as Page)
    window.location.hash = `#/${p}`
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash
      if (h === '#/services') setPage('services')
      else if (h === '#/how-it-works') setPage('how-it-works')
      else if (h === '#/results') setPage('results')
      else if (h === '#/testimonials') setPage('testimonials')
      else if (h === '#/about') setPage('about')
      else if (h === '#/pricing') setPage('pricing')
      else if (h === '#/faq') setPage('faq')
      else if (h === '#/contact') setPage('contact')
      else if (h === '#/blog') setPage('blog')
      else if (h.startsWith('#/blog/')) setPage('blog-post')
      else if (h === '#/email-warmup') setPage('email-warmup')
      else if (h === '#/services/bulk-email-warmup') setPage('services/bulk-email-warmup')
      else if (h === '#/services/email-verification-services') setPage('services/email-verification-services')
      else if (h === '#/email-deliverability-assets') setPage('email-deliverability-assets')
      else if (h === '#/terms-conditions') setPage('terms-conditions')
      else if (h === '#/privacy-policy') setPage('privacy-policy')
      else if (serviceLandings.some(x => h === `#/services/${x.slug}`)) setPage(h.slice(2) as Page)
      else setPage('home')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const landing = serviceLandings.find(x => page === `services/${x.slug}`)
  const showFooter = page !== '404'

  return (
    <div style={{ minHeight: '100vh', background: '#060b17', color: '#c4d0ee', overflowX: 'hidden' }}>
      {page !== '404' && <Nav currentPage={page} navigate={navigate} />}

      {page === 'home' ? (
        <>
          <Hero navigate={navigate} />
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
        <BlogPostPage slug={window.location.hash.slice('#/blog/'.length)} navigate={navigate} />
      ) : page === 'email-warmup' ? (
        <EmailWarmupPage navigate={navigate} />
      ) : page === 'services/bulk-email-warmup' ? (
        <BulkEmailWarmupPage />
      ) : page === 'services/email-verification-services' ? (
        <EmailVerificationPage navigate={navigate} />
      ) : page === 'email-deliverability-assets' ? (
        <EmailDeliverabilityAssets navigate={navigate} />
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
