import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import { ArrowRight, Menu, X } from 'lucide-react'

interface NavProps {
  currentPage: string
  navigate: (page: string) => void
}

export default function Nav({ currentPage, navigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on nav
  const go = (p: string) => {
    navigate(p)
    setMenuOpen(false)
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
          {mainLinks.map(([label, page]) => (
            <button
              key={page}
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
          ))}
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
            <button
              onClick={() => go('home')}
              style={{ textAlign: 'left', background: currentPage === 'home' ? 'rgba(6,182,212,0.07)' : 'none', border: 'none', borderRadius: 9, color: currentPage === 'home' ? '#22d3ee' : '#c4d0ee', fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 500, padding: '12px 14px', cursor: 'pointer' }}
            >
              Home
            </button>
            {mainLinks.map(([label, page]) => (
              <button
                key={page}
                onClick={() => go(page)}
                style={{ textAlign: 'left', background: isActive(page) ? 'rgba(6,182,212,0.07)' : 'none', border: 'none', borderRadius: 9, color: isActive(page) ? '#22d3ee' : '#c4d0ee', fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 500, padding: '12px 14px', cursor: 'pointer' }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              style={{ textAlign: 'left', background: isActive('contact') ? 'rgba(6,182,212,0.07)' : 'none', border: 'none', borderRadius: 9, color: isActive('contact') ? '#22d3ee' : '#c4d0ee', fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 500, padding: '12px 14px', cursor: 'pointer' }}
            >
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
