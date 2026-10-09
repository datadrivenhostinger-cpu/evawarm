import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { serviceLandings } from '@/data/serviceLandings'

interface NavProps {
  currentPage: string
  navigate: (page: string) => void
}

// Pages that belong to the Resources group
const RESOURCE_PAGES = new Set([
  'resources/email-deliverability-assets',
  'resources/case-study-emaildeliverability',
])

export default function Nav({ currentPage, navigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddClosed, setDdClosed] = useState(false)
  // Mobile: track which expandable group is open
  const [mobileExpanded, setMobileExpanded] = useState<'services' | 'resources' | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close everything on nav
  const go = (p: string) => {
    navigate(p)
    setMenuOpen(false)
    setDdClosed(true)
    setMobileExpanded(null)
  }

  const mainLinks: [string, string][] = [
    ['Services', 'services'],
    ['How It Works', 'how-it-works'],
    ['Results', 'results'],
    ['About', 'about'],
    ['Pricing', 'pricing'],
    ['Blog', 'blog'],
  ]

  const isActive = (p: string) => currentPage === p

  // Resources group is "active" when on either resource page
  const resourcesActive = RESOURCE_PAGES.has(currentPage)

  // Shared mobile button style
  const mobileBtn = (active: boolean): React.CSSProperties => ({
    textAlign: 'left',
    background: active ? 'rgba(6,182,212,0.07)' : 'none',
    border: 'none',
    borderRadius: 9,
    color: active ? '#22d3ee' : '#c4d0ee',
    fontFamily: 'Sora, sans-serif',
    fontSize: 15,
    fontWeight: 500,
    padding: '12px 14px',
    cursor: 'pointer',
    width: '100%',
  })

  // Mobile child button (indented)
  const mobileChildBtn = (active: boolean): React.CSSProperties => ({
    ...mobileBtn(active),
    paddingLeft: 28,
    fontSize: 14,
    color: active ? '#22d3ee' : '#94a3b8',
  })

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        background: scrolled ? 'rgba(6, 11, 23, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 32px rgba(0,0,0,0.35)' : 'none',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <button
          onClick={() => go('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 10 }}
          aria-label="EvaWarm — go to homepage"
        >
          <Logo height={32} />
        </button>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {/* Regular nav links */}
          {mainLinks.map(([label, page]) => (
            <div
              key={page}
              style={{ position: 'relative' }}
              onMouseLeave={() => setDdClosed(false)}
              className={page === 'services' ? `nav-dd${ddClosed ? ' closed' : ''}` : undefined}
            >
              <button
                onClick={() => go(page)}
                style={{
                  background: isActive(page) ? 'rgba(6, 182, 212, 0.08)' : 'none',
                  border: isActive(page) ? '1px solid rgba(6,182,212,0.18)' : '1px solid transparent',
                  borderRadius: 10,
                  color: isActive(page) ? '#22d3ee' : '#6e7e9e',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 500,
                  fontSize: 13.5,
                  padding: '7px 13px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  letterSpacing: -0.1,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive(page)) {
                    (e.currentTarget as HTMLElement).style.color = '#edf0ff'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(page)) {
                    (e.currentTarget as HTMLElement).style.color = '#6e7e9e'
                    ;(e.currentTarget as HTMLElement).style.background = 'none'
                  }
                }}
              >
                {label}
              </button>
              {/* Services dropdown */}
              {page === 'services' && (
                <div className="nav-dd-menu">
                  <button onClick={() => go('services')}>All Services</button>
                  <button onClick={() => go('email-warmup')}>Warmup Service</button>
                  <button onClick={() => go('services/bulk-email-warmup')}>Bulk Email Warmup</button>
                  <button onClick={() => go('services/email-verification-services')}>Email Verification Services</button>
                  {serviceLandings.map(x => <button key={x.slug} onClick={() => go(`services/${x.slug}`)}>{x.navLabel}</button>)}
                </div>
              )}
            </div>
          ))}

          {/* Resources — dropdown parent only, no navigation destination */}
          <div
            className={`nav-dd${ddClosed ? ' closed' : ''}`}
            style={{ position: 'relative' }}
            onMouseLeave={() => setDdClosed(false)}
          >
            {/* Button intentionally has no onClick navigate — it is a dropdown trigger only */}
            <button
              style={{
                background: resourcesActive ? 'rgba(6, 182, 212, 0.08)' : 'none',
                border: resourcesActive ? '1px solid rgba(6,182,212,0.18)' : '1px solid transparent',
                borderRadius: 10,
                color: resourcesActive ? '#22d3ee' : '#6e7e9e',
                fontFamily: 'Sora, sans-serif',
                fontWeight: 500,
                fontSize: 13.5,
                padding: '7px 13px',
                cursor: 'default',
                transition: 'all 0.18s ease',
                letterSpacing: -0.1,
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
              aria-haspopup="true"
              tabIndex={0}
            >
              Resources
              <ChevronDown size={12} style={{ opacity: 0.6 }} />
            </button>
            <div className="nav-dd-menu">
              <button onClick={() => go('resources/email-deliverability-assets')}>Email Deliverability Assets</button>
              <button onClick={() => go('resources/case-study-emaildeliverability')}>Case Study</button>
            </div>
          </div>

          <style>{`
            .nav-dd-menu { display: none; position: absolute; top: 100%; left: 0; min-width: 220px; padding: 6px; margin-top: 4px; background: rgba(6,11,23,0.97); border: 1px solid rgba(255,255,255,0.09); border-radius: 12px; box-shadow: 0 16px 40px rgba(0,0,0,0.5); flex-direction: column; }
            .nav-dd:hover .nav-dd-menu, .nav-dd:focus-within .nav-dd-menu { display: flex; }
            .nav-dd.closed .nav-dd-menu { display: none !important; }
            .nav-dd-menu button { background: none; border: none; text-align: left; color: #c4d0ee; font-family: Sora, sans-serif; font-size: 13.5px; font-weight: 500; padding: 10px 12px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
            .nav-dd-menu button:hover { background: rgba(6,182,212,0.08); color: #22d3ee; }
          `}</style>
        </div>

        {/* CTA */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => go('contact')}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#6e7e9e',
              fontFamily: 'Sora, sans-serif',
              fontWeight: 500,
              fontSize: 13.5,
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#edf0ff'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = '#6e7e9e'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          >
            Contact
          </button>
          <button
            onClick={() => go('services')}
            className="btn-primary btn-sm"
          >
            Get Started
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="hide-desktop"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            background: menuOpen ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${menuOpen ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 9,
            padding: '8px 10px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {menuOpen ? <X size={18} color="#c4d0ee" /> : <Menu size={18} color="#c4d0ee" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(6,11,23,0.97)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '16px 24px 28px',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 20 }}>
            {/* Home */}
            <button onClick={() => go('home')} style={mobileBtn(currentPage === 'home')}>
              Home
            </button>

            {/* Standard links (excluding Resources — handled separately) */}
            {mainLinks.map(([label, page]) => (
              <button key={page} onClick={() => go(page)} style={mobileBtn(isActive(page))}>
                {label}
              </button>
            ))}

            {/* Service sub-links */}
            <button onClick={() => go('email-warmup')} style={mobileChildBtn(isActive('email-warmup'))}>Warmup Service</button>
            <button onClick={() => go('services/bulk-email-warmup')} style={mobileChildBtn(isActive('services/bulk-email-warmup'))}>Bulk Email Warmup</button>
            <button onClick={() => go('services/email-verification-services')} style={mobileChildBtn(isActive('services/email-verification-services'))}>Email Verification Services</button>
            {serviceLandings.map(x => (
              <button key={x.slug} onClick={() => go(`services/${x.slug}`)} style={mobileChildBtn(isActive(`services/${x.slug}`))}>{x.navLabel}</button>
            ))}

            {/* Resources — collapsible group */}
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'resources' ? null : 'resources')}
              style={{
                ...mobileBtn(resourcesActive),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              aria-expanded={mobileExpanded === 'resources'}
            >
              <span>Resources</span>
              <ChevronDown
                size={14}
                style={{
                  transition: 'transform 0.2s',
                  transform: mobileExpanded === 'resources' ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: resourcesActive ? '#22d3ee' : '#6e7e9e',
                }}
              />
            </button>
            {mobileExpanded === 'resources' && (
              <>
                <button
                  onClick={() => go('resources/email-deliverability-assets')}
                  style={mobileChildBtn(currentPage === 'resources/email-deliverability-assets')}
                >
                  Email Deliverability Assets
                </button>
                <button
                  onClick={() => go('resources/case-study-emaildeliverability')}
                  style={mobileChildBtn(currentPage === 'resources/case-study-emaildeliverability')}
                >
                  Case Study
                </button>
              </>
            )}

            {/* Contact */}
            <button onClick={() => go('contact')} style={mobileBtn(isActive('contact'))}>
              Contact
            </button>
          </div>
          <button
            onClick={() => go('services')}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  )
}
