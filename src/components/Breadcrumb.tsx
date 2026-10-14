import { ChevronRight } from 'lucide-react'

interface Crumb { label: string; page?: string }
interface BreadcrumbProps { crumbs: Crumb[]; navigate: (page: string) => void }

export default function Breadcrumb({ crumbs, navigate }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" style={{ padding: '14px 32px 0', maxWidth: 1240, margin: '0 auto' }}>
      <ol style={{ listStyle: 'none', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, fontFamily: 'Sora', fontSize: 12.5, fontWeight: 500, color: '#6e7e9e' }}>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {i > 0 && <ChevronRight size={13} style={{ color: '#3a4a65', flexShrink: 0 }} />}
              {!isLast && crumb.page ? (
                <button onClick={() => navigate(crumb.page!)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Sora', fontSize: 12.5, fontWeight: 500, color: '#6e7e9e', padding: '2px 4px', borderRadius: 4, transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={e => (e.currentTarget.style.color = '#6e7e9e')}>
                  {crumb.label}
                </button>
              ) : (
                <span style={{ color: isLast ? '#22d3ee' : '#6e7e9e', padding: '2px 4px' }}>{crumb.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

