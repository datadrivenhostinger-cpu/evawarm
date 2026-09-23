import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, ChevronRight, Clock3, MailCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { blogPosts, formatBlogDate, type BlogPost } from '@/data/blog'

const categories = ['All', 'Email Deliverability', 'Email Warmup', 'Email Verification', 'Outbound Marketing']

const categoryIcons = {
  'Email Deliverability': MailCheck,
  'Email Warmup': Sparkles,
  'Email Verification': ShieldCheck,
  'Outbound Marketing': MailCheck,
} as const

interface BlogPageProps {
  navigate: (page: string) => void
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#6e7e9e', fontSize: 12.5, flexWrap: 'wrap' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><CalendarDays size={13} />{formatBlogDate(post.date)}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock3 size={13} />{post.readTime}</span>
    </div>
  )
}

export default function BlogPage({ navigate }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts
    return blogPosts.filter((post) => post.category === activeCategory)
  }, [activeCategory])

  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0]
  const latestPosts = featuredPost ? filteredPosts.filter((post) => post.slug !== featuredPost.slug) : []

  return (
    <main>
      <section className="mesh-hero page-texture" style={{ padding: '150px 32px 80px' }}>
        <div style={{ maxWidth: 1020, margin: '0 auto', textAlign: 'center' }}>
          <div className="chip" style={{ display: 'inline-flex', marginBottom: 24 }}>
            <Sparkles size={14} /> EvaWarm Resources
          </div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(42px, 7vw, 76px)', lineHeight: 1.04, letterSpacing: '-3px', color: '#edf0ff', fontWeight: 700, marginBottom: 22 }}>
            Insights for <span className="g-text">better email.</span>
          </h1>
          <p style={{ maxWidth: 700, margin: '0 auto', color: '#9aabc9', fontSize: 18, lineHeight: 1.8 }}>
            Practical guides on email deliverability, warmup, verification, and outbound marketing to help your messages reach the inbox.
          </p>
        </div>
      </section>

      <section className="mesh-alt" style={{ padding: '24px 32px 110px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? 'btn-outline' : 'btn-ghost'}
                style={{ fontSize: 13, padding: '9px 16px' }}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {featuredPost ? (
          <article className="card-glass" style={{ overflow: 'hidden', marginBottom: 54 }}>
            <div className="blog-feature-grid">
              <div style={{ minHeight: 360, padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'radial-gradient(circle at 15% 20%, rgba(34,211,238,0.16), transparent 42%), radial-gradient(circle at 85% 80%, rgba(139,92,246,0.14), transparent 40%), #0a1426' }}>
                <div>
                  <div className="chip" style={{ marginBottom: 20 }}>Featured article</div>
                  <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 45px)', lineHeight: 1.12, color: '#edf0ff', letterSpacing: '-1.6px', marginBottom: 18 }}>
                    {featuredPost.title}
                  </h2>
                  <p style={{ color: '#9aabc9', fontSize: 15.5, lineHeight: 1.75, maxWidth: 640 }}>
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div style={{ marginTop: 30 }}>
                  <Meta post={featuredPost} />
                  <button className="btn-primary btn-sm" style={{ marginTop: 22 }} onClick={() => navigate(`blog/${featuredPost.slug}`)}>
                    Read article <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              <div style={{ minHeight: 360, padding: 24, display: 'flex', alignItems: 'stretch', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))' }}>
                {featuredPost.image ? (
                  <div style={{ width: '100%', minHeight: 320, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#0f1b30' }}>
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      style={{ width: '100%', height: '100%', minHeight: 320, display: 'block', objectFit: 'cover', objectPosition: featuredPost.imagePosition || 'center' }}
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div style={{ width: '100%', maxWidth: 430, alignSelf: 'center', aspectRatio: '1.25', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, background: 'rgba(6,11,23,0.66)', boxShadow: '0 24px 70px rgba(0,0,0,0.35)', padding: 26, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: 'rgba(34,211,238,0.10)', filter: 'blur(20px)', top: -100, right: -60 }} />
                    <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                    </div>
                    <div style={{ width: '54%', height: 11, borderRadius: 6, background: 'rgba(255,255,255,0.10)', marginBottom: 12 }} />
                    <div style={{ width: '78%', height: 10, borderRadius: 6, background: 'rgba(255,255,255,0.06)', marginBottom: 22 }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {[94, 87, 91, 96].map((value, i) => (
                        <div key={i} style={{ padding: 14, borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>
                          <div style={{ color: '#6e7e9e', fontSize: 10, marginBottom: 8 }}>Inbox health</div>
                          <div style={{ color: '#edf0ff', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 20 }}>{value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
          ) : (
            <div className="card-glass" style={{ padding: 44, marginBottom: 54, color: '#9aabc9' }}>No blog posts found in this category.</div>
          )}

          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 20, marginBottom: 22 }}>
            <div>
              <div style={{ color: '#22d3ee', fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 9 }}>Latest articles</div>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 34, color: '#edf0ff', letterSpacing: '-1px' }}>Learn. Improve. Send smarter.</h2>
            </div>
          </div>

          <div className="blog-grid">
            {latestPosts.map((post) => {
              const Icon = categoryIcons[post.category as keyof typeof categoryIcons] ?? MailCheck
              return (
                <article key={post.slug} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', minHeight: 320 }}>
                  <div style={{ height: 145, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'radial-gradient(circle at 20% 20%, rgba(34,211,238,0.12), transparent 48%), linear-gradient(135deg, #101c31, #0c1426)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    {post.image ? (
                      <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: post.imagePosition || 'center' }} loading="lazy" />
                    ) : (
                      <div style={{ width: 58, height: 58, borderRadius: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(34,211,238,0.16)' }}>
                        <Icon size={25} color="#22d3ee" />
                      </div>
                    )}
                  </div>
                  <div style={{ color: '#22d3ee', fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>{post.category}</div>
                  <h3 style={{ fontFamily: 'Sora, sans-serif', color: '#edf0ff', fontSize: 19, lineHeight: 1.4, letterSpacing: '-0.5px', marginBottom: 10 }}>{post.title}</h3>
                  <p style={{ color: '#8191af', fontSize: 13.5, lineHeight: 1.65, marginBottom: 18 }}>{post.excerpt}</p>
                  <div style={{ marginTop: 'auto' }}>
                    <Meta post={post} />
                    <button
                      onClick={() => navigate(`blog/${post.slug}`)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#c4d0ee', background: 'none', border: 'none', padding: 0, marginTop: 16, fontFamily: 'Sora, sans-serif', fontSize: 13, cursor: 'pointer' }}
                    >
                      Read article <ChevronRight size={14} color="#22d3ee" />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
