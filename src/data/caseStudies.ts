// ── Types ────────────────────────────────────────────────────────────────────

export type CaseStudyStat     = { value: string; label: string; sub: string }
export type CaseStudySolution = { title: string; desc: string }

export type CaseStudy = {
  slug: string
  client: string
  title: string
  tagline: string
  industry: string
  /** Quick-stat pairs shown in the hero strip — e.g. [["94%", "Inbox Placement"]] */
  heroStats: [string, string][]
  about: string
  objective: string
  challenges: string[]
  solutions: CaseStudySolution[]
  stats: CaseStudyStat[]
  takeaway: string
  conclusion: string
  /** Hex accent colour, e.g. "#06b6d4" */
  accent: string
  /** ISO date string — used for ordering in the CMS */
  date?: string
  /** Optional featured image (relative /uploads/… path) */
  image?: string
}

// ── Raw shape coming from Decap CMS JSON files ───────────────────────────────
// heroStats is stored as { value, label }[] by the CMS list widget.

type RawHeroStat = { value?: string; label?: string }

type RawCaseStudy = Partial<Omit<CaseStudy, 'heroStats'>> & {
  heroStats?: RawHeroStat[]
}

// ── Glob-load all JSON files under content/case-studies/ ─────────────────────

const modules = import.meta.glob<RawCaseStudy>(
  '../../content/case-studies/*.json',
  { eager: true, import: 'default' },
)

// ── Normalise raw CMS data → strongly-typed CaseStudy ────────────────────────

function normalize(path: string, raw: RawCaseStudy): CaseStudy {
  const slug =
    raw.slug || path.split('/').pop()?.replace(/\.json$/, '') || ''

  const heroStats: [string, string][] = (raw.heroStats ?? []).map(
    (hs) => [hs.value ?? '', hs.label ?? ''] as [string, string],
  )

  return {
    slug,
    client:     raw.client     ?? '',
    title:      raw.title      ?? '',
    tagline:    raw.tagline    ?? '',
    industry:   raw.industry   ?? '',
    accent:     raw.accent     ?? '#06b6d4',
    date:       raw.date,
    image:      raw.image,
    heroStats,
    about:      raw.about      ?? '',
    objective:  raw.objective  ?? '',
    challenges: raw.challenges ?? [],
    solutions:  (raw.solutions ?? []).map((s) => ({
      title: s.title ?? '',
      desc:  s.desc  ?? '',
    })),
    stats: (raw.stats ?? []).map((s) => ({
      value: s.value ?? '',
      label: s.label ?? '',
      sub:   s.sub   ?? '',
    })),
    takeaway:   raw.takeaway   ?? '',
    conclusion: raw.conclusion ?? '',
  }
}

// ── Export sorted list (oldest date first — preserves original page order) ───

function toTimestamp(date?: string) {
  if (!date) return 0
  const v = new Date(date).getTime()
  return Number.isNaN(v) ? 0 : v
}

export const caseStudies: CaseStudy[] = Object.entries(modules)
  .map(([path, raw]) => normalize(path, raw))
  .sort((a, b) => toTimestamp(a.date) - toTimestamp(b.date))
