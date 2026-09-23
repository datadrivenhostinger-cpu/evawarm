// Vercel Routing Middleware — runs on the Edge runtime before any static
// asset or serverless function is served.
//
// Protects /admin and all its sub-paths with HTTP Basic Authentication.
// Credentials are read exclusively from Vercel environment variables:
//   ADMIN_USERNAME
//   ADMIN_PASSWORD
//
// All other routes (/,  /api/contact, /blog, etc.) are passed through
// without any authentication check.
//
// Local development (npm run dev) is not affected — this middleware only
// runs on Vercel's platform.

export const config = { runtime: 'edge' }

export default function middleware(request: Request): Response | null {
  const url = new URL(request.url)

  // ── 1. Only protect /admin and everything beneath it ──────────────────
  if (!url.pathname.startsWith('/admin')) return null

  // ── 2. Read credentials from environment variables ────────────────────
  //       Fail closed if either variable is missing so the admin area is
  //       never accidentally left open.
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD

  if (!expectedUser || !expectedPass) {
    return new Response(
      'Admin auth is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD in Vercel environment variables.',
      { status: 500 },
    )
  }

  // ── 3. Parse the Authorization header ────────────────────────────────
  const authHeader = request.headers.get('authorization') ?? ''

  if (authHeader.startsWith('Basic ')) {
    const base64 = authHeader.slice('Basic '.length)

    try {
      const decoded = atob(base64)        // Web API — available on Edge runtime
      const colonIndex = decoded.indexOf(':')

      if (colonIndex !== -1) {
        const submittedUser = decoded.slice(0, colonIndex)
        const submittedPass = decoded.slice(colonIndex + 1)

        // ── 4. Constant-time comparison to prevent timing attacks ─────
        const userMatch = timingSafeEqual(submittedUser, expectedUser)
        const passMatch = timingSafeEqual(submittedPass, expectedPass)

        if (userMatch && passMatch) return null   // ✓ authenticated — pass through
      }
    } catch {
      // atob() throws on invalid base64 — treat as failed auth
    }
  }

  // ── 5. Not authenticated — send 401 to trigger the browser login dialog
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="EvaWarm Admin"',
      'Content-Type': 'text/plain',
    },
  })
}

// ---------------------------------------------------------------------------
// Constant-time string comparison.
// Returns false immediately if lengths differ (length is not a secret),
// then XORs every character pair so the loop always runs the same number
// of iterations regardless of where the first mismatch occurs.
// ---------------------------------------------------------------------------
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}
