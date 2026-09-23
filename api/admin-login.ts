// Vercel Serverless Function — Node.js runtime.
//
// POST /api/admin-login
//
// Validates submitted credentials against ADMIN_USERNAME / ADMIN_PASSWORD
// environment variables. On success, mints an HMAC-SHA256 signed session
// token that includes the expiry timestamp, and sets it as an HttpOnly
// Secure cookie scoped to /admin.
//
// Token format:
//   <issuedAt>:<expiresAt>.<HMAC-SHA256-hex(issuedAt:expiresAt, ADMIN_SESSION_SECRET)>
//
// Cookie attributes:
//   HttpOnly   — not readable by JavaScript
//   Secure     — only sent over HTTPS (enforced by browsers in production)
//   SameSite=Lax — sent on same-site requests and top-level navigations
//   Path=/admin  — cookie is scoped to the admin area only
//   Max-Age=28800 — browser expires the cookie after 8 hours
//
// On failure, redirects back to /admin/login?error=1 without setting any cookie.
//
// Credentials are never logged, reflected, or included in any response body.

import { createHmac, timingSafeEqual } from 'node:crypto'

// Session lifetime: 8 hours expressed in seconds
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60   // 28 800 s

export default async function handler(req: any, res: any) {

  // ── 1. POST requests only ─────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // ── 2. Parse submitted credentials ───────────────────────────────────
  //       Vercel auto-parses JSON bodies. For application/x-www-form-urlencoded
  //       (the HTML form's default encoding), the body arrives as a string or
  //       as a pre-parsed object depending on Vercel's runtime version — both
  //       cases are handled here.
  let submittedUser = ''
  let submittedPass = ''

  if (typeof req.body === 'object' && req.body !== null) {
    submittedUser = String(req.body.username ?? '').trim()
    submittedPass = String(req.body.password ?? '').trim()
  } else if (typeof req.body === 'string') {
    const params  = new URLSearchParams(req.body)
    submittedUser = (params.get('username') ?? '').trim()
    submittedPass = (params.get('password') ?? '').trim()
  }

  // ── 3. Read env vars — fail closed if any are missing ────────────────
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD
  const secret       = process.env.ADMIN_SESSION_SECRET

  if (!expectedUser || !expectedPass || !secret) {
    console.error('[admin-login] Missing env vars: ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SESSION_SECRET')
    return res.status(500).send('Admin auth is not configured.')
  }

  // ── 4. Constant-time credential comparison ────────────────────────────
  //       Both comparisons always run (no early return on first mismatch)
  //       to prevent timing attacks that could reveal valid usernames.
  const userMatch = safeCompare(submittedUser, expectedUser)
  const passMatch = safeCompare(submittedPass, expectedPass)

  if (userMatch && passMatch) {
    // ── 5a. Valid credentials — mint a signed, expiring session token ───

    const nowSeconds = Math.floor(Date.now() / 1000)
    const expiresAt  = nowSeconds + SESSION_MAX_AGE_SECONDS

    // Payload is "<issuedAt>:<expiresAt>" — both timestamps baked in and signed.
    const payload = `${nowSeconds}:${expiresAt}`
    const sig     = createHmac('sha256', secret).update(payload).digest('hex')
    const token   = `${payload}.${sig}`

    // Set the session cookie and redirect to the CMS.
    res.setHeader('Set-Cookie',
      `ew_admin_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/admin; Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    )
    res.setHeader('Location', '/admin/')
    return res.status(302).end()
  }

  // ── 5b. Invalid credentials — redirect back with error flag ───────────
  //        No cookie is set. The login page reads ?error=1 via vanilla JS
  //        and shows the error message without exposing any server detail.
  res.setHeader('Location', '/admin/login?error=1')
  return res.status(302).end()
}

// ---------------------------------------------------------------------------
// Constant-time string comparison using Node.js crypto.timingSafeEqual.
//
// Both buffers are padded to the same byte length before being passed to
// timingSafeEqual so that the comparison always touches the same number
// of bytes regardless of input length. The length check is performed
// separately after the constant-time comparison so that length differences
// do not create a timing side-channel shortcut.
// ---------------------------------------------------------------------------
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  const maxLen = Math.max(bufA.length, bufB.length)

  // Pad both to the same length (extra bytes are 0x00 on both sides)
  const padA = Buffer.concat([bufA, Buffer.alloc(maxLen - bufA.length)])
  const padB = Buffer.concat([bufB, Buffer.alloc(maxLen - bufB.length)])

  // timingSafeEqual compares byte-by-byte in constant time.
  // We also require identical original lengths — this check is O(1).
  return timingSafeEqual(padA, padB) && bufA.length === bufB.length
}
