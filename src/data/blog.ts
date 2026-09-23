export type BlogSection = {
  id?: string
  title: string
  paragraphs: string[]
}

export type BlogPost = {
  slug?: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  featured?: boolean
  image?: string
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right'
  introduction: string
  sections: BlogSection[]
  takeaway: string
  conclusion: string
}

type RawBlogSection = {
  id?: string
  title?: string
  paragraphs?: string[]
  content?: string | string[]
}

type RawBlogPost = Partial<BlogPost> & {
  description?: string
  intro?: string
  sections?: RawBlogSection[]
}

const modules = import.meta.glob<RawBlogPost>('../../content/blog/*.json', {
  eager: true,
  import: 'default',
})

function toTimestamp(date: string) {
  const value = new Date(date).getTime()
  return Number.isNaN(value) ? 0 : value
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function normalizeParagraphs(section: RawBlogSection) {
  if (Array.isArray(section.paragraphs)) return section.paragraphs.filter(Boolean)
  if (Array.isArray(section.content)) return section.content.filter(Boolean)
  if (typeof section.content === 'string' && section.content.trim()) return [section.content.trim()]
  return []
}

function normalizePost(path: string, raw: RawBlogPost): BlogPost {
  const sections = Array.isArray(raw.sections)
    ? raw.sections
        .filter((section) => section && section.title)
        .map((section) => ({
          id: section.id || slugify(section.title || ''),
          title: section.title || '',
          paragraphs: normalizeParagraphs(section),
        }))
    : []

  return {
    slug: raw.slug || path.split('/').pop()?.replace(/\.json$/, '') || '',
    title: raw.title || 'Untitled blog post',
    excerpt: raw.excerpt || raw.description || '',
    category: raw.category || 'Email Deliverability',
    date: raw.date || '',
    readTime: raw.readTime || '',
    featured: Boolean(raw.featured),
    image: raw.image,
    imagePosition: raw.imagePosition || 'center',
    introduction: raw.introduction || raw.intro || '',
    sections,
    takeaway: raw.takeaway || '',
    conclusion: raw.conclusion || '',
  }
}

export function formatBlogDate(date: string) {
  const value = new Date(date)
  if (Number.isNaN(value.getTime())) return date
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(value)
}

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, post]) => normalizePost(path, post))
  .sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1
    return toTimestamp(b.date) - toTimestamp(a.date)
  })
