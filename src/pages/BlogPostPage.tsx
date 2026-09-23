import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from 'lucide-react'
import { blogPosts, formatBlogDate } from '@/data/blog'

interface BlogPostPageProps {
  slug: string
  navigate: (page: string) => void
}

export default function BlogPostPage({ slug, navigate }: BlogPostPageProps) {
  const post = blogPosts.find((item) => item.slug === slug) ?? blogPosts[0]
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3)
  const tocSections = [...post.sections, { id: 'final-thoughts', title: 'Final thoughts', paragraphs: [] }]

  const jumpTo = (id?: string) => {
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <section className="mesh-hero page-texture" style={{ padding: '144px 32px 88px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <button
            onClick={() => navigate('blog')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#6e7e9e', cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontSize: 13, marginBottom: 26 }}
          >
            <ArrowLeft size={15} /> Back to Blog
          </button>
          <div style={{ maxWidth: 900 }}>
            <div className="chip" style={{ marginBottom: 18 }}>{post.category}</div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', color: '#edf0ff', fontSize: 'clamp(40px, 6vw, 68px)', lineHeight: 1.08, letterSpacing: '-2.8px', marginBottom: 22 }}>{post.title}</h1>
            <p style={{ maxWidth: 780, color: '#9aabc9', fontSize: 17, lineHeight: 1.8, marginBottom: 24 }}>{post.excerpt}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', color: '#6e7e9e', fontSize: 12.5 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><CalendarDays size={13} />{formatBlogDate(post.date)}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock3 size={13} />{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mesh-alt" style={{ padding: '0 32px 110px' }}>
        <div className="blog-post-layout">
          <aside className="blog-toc" aria-label="In this article">
            <div className="blog-toc-label">In this article</div>
            <nav>
              {tocSections.map((section) => (
                <button
                  key={section.id}
                  className={section.id === tocSections[0]?.id ? 'blog-toc-link active' : 'blog-toc-link'}
                  onClick={() => jumpTo(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          <div className="blog-post-main">
            <div
              aria-label="Article type"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                padding: '7px 11px',
                borderRadius: 9,
                border: '1px solid rgba(34,211,238,0.16)',
                background: 'rgba(6,182,212,0.06)',
                color: '#22d3ee',
                fontFamily: 'Sora, sans-serif',
                fontSize: 11.5,
                fontWeight: 600,
                lineHeight: 1,
                marginBottom: 30,
              }}
            >
              EvaWarm Guide
            </div>

            {post.image && (
              <figure style={{ margin: '0 0 34px' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    display: 'block',
                    width: '100%',
                    maxHeight: 520,
                    objectFit: 'cover',
                    objectPosition: post.imagePosition || 'center',
                    borderRadius: 20,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: '#0f1b30',
                  }}
                  loading="eager"
                />
              </figure>
            )}

            <article className="blog-article" style={{ color: '#b9c6e0', fontSize: 16, lineHeight: 1.9 }}>
              <p>{post.introduction}</p>

              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="blog-article-section">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.id}-${index}`}>{paragraph}</p>
                  ))}
                </section>
              ))}

              {post.takeaway && (
                <div className="card-glass" style={{ padding: 26, margin: '36px 0' }}>
                  <div style={{ color: '#22d3ee', fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>EvaWarm takeaway</div>
                  <p style={{ margin: 0, color: '#edf0ff' }}>{post.takeaway}</p>
                </div>
              )}

              <section id="final-thoughts" className="blog-article-section">
                <h2>Final thoughts</h2>
                <p>{post.conclusion}</p>
              </section>
            </article>

            <div style={{ marginTop: 62, paddingTop: 34, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: '#6e7e9e', fontFamily: 'Sora, sans-serif', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Related articles</div>
              <div className="related-grid">
                {related.map((item) => (
                  <button key={item.slug} onClick={() => navigate(`blog/${item.slug}`)} className="card" style={{ textAlign: 'left', padding: 18, background: '#0f1b30', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}>
                    <div style={{ color: '#22d3ee', fontSize: 11, marginBottom: 8 }}>{item.category}</div>
                    <div style={{ color: '#edf0ff', fontFamily: 'Sora, sans-serif', fontSize: 15.5, lineHeight: 1.45 }}>{item.title}</div>
                    <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6, color: '#9aabc9', fontSize: 12 }}>Read article <ArrowRight size={13} /></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
