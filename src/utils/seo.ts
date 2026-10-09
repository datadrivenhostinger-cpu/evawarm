/**
 * seo.ts — Imperative helpers to update <title>, <meta name="description">,
 * and <link rel="canonical"> without a third-party library.
 *
 * All functions are idempotent: they find-or-create exactly one element of
 * each type so no duplicates can accumulate during SPA navigation.
 */

const SITE = 'https://evawarmweb.vercel.app'

/** Set (or replace) the page <title>. */
export function setTitle(title: string): void {
  document.title = title
}

/** Set (or replace) <meta name="description" content="...">. */
export function setDescription(description: string): void {
  let el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.name = 'description'
    document.head.appendChild(el)
  }
  el.content = description
}

/** Set (or replace) <link rel="canonical" href="...">. */
export function setCanonical(path: string): void {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  // Normalise: leading slash, no trailing slash (except root)
  const normalised = path === '/' ? '/' : path.replace(/\/$/, '')
  el.href = SITE + normalised
}

/** Remove <link rel="canonical"> — used for non-indexable routes. */
export function removeCanonical(): void {
  document.querySelector('link[rel="canonical"]')?.remove()
}

/** Apply all three SEO fields in one call. */
export function setSeo(title: string, description: string, canonicalPath: string | null): void {
  setTitle(title)
  setDescription(description)
  if (canonicalPath !== null) {
    setCanonical(canonicalPath)
  } else {
    removeCanonical()
  }
}
