// Vercel Routing Middleware — Edge runtime.
//
// Replaces HTTP Basic Auth with an HMAC-signed session cookie.
//
// Protected: /admin and /admin/** (except /admin/login and /admin/login.html)
// Session cookie name: ew_admin_session
//
// Token format  →  <issuedAt>:<expiresAt>.<HMAC-SHA256-hex(issuedAt:expiresAt, ADMIN_SESSION_SECRET)>
//   issuedAt  : Unix timestamp (seconds) when the session was minted
//   expiresAt : Unix timestamp (seconds) = issuedAt + 8 h
//   signature : HMAC-SHA256 of the "<issuedAt>:<expiresAt>" payload, as lowercase hex
//
// Validation (both conditions must pass):
//   (a) The HMAC signature is cryptographically correct.
//   (b) The current time is strictly before expiresAt.
//
// Unauthenticated or expired sessions → 302 redirect to /admin/login.
// All other routes (public site, /api/contact) → pass through untouched.
//
// Local development (npm run dev) is not affected — middleware only
// runs on Vercel's platform.

export const config = { runtime: 'edge' }

const SESSION_COOKIE = 'ew_admin_session'
const LOGIN_PAGE     = '/admin/login'
const LOGIN_PAGE_HTML = '/admin/login.html'  // direct file access

export default async function middleware(request: Request): Promise<Response | null> {
  const url = new URL(request.url)
  const { pathname } = url

  // ── 1. Not an /admin route — pass through immediately ─────────────────
  //       Covers the public site, /api/contact, and all other paths.
  if (!pathname.startsWith('/admin')) return null

  // ── 2. The login page itself must be reachable without a session ───────
  //       Both the clean URL (/admin/login) and the file path (/admin/login.html)
  //       are allowed so that Vercel's rewrite can serve the static file.
  if (pathname === LOGIN_PAGE || pathname === LOGIN_PAGE_HTML) return null

  // ── 3. Fail closed if the session secret is not configured ────────────
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    return new Response(
      'Admin auth is not configured. Set ADMIN_SESSION_SECRET in Vercel environment variables.',
      { status: 500 },
    )
  }

  // ── 4. Read and verify the session cookie ─────────────────────────────
  const cookieHeader = request.headers.get('cookie') ?? ''
  const token = parseCookie(cookieHeader, SESSION_COOKIE)

  if (token) {
    const valid = await verifyToken(token, secret)
    if (valid) return null  // ✓ authenticated and not expired — pass through
  }

  // ── 5. Not authenticated (no cookie, bad signature, or expired) ────────
  //       Redirect to the branded login page.
  const loginUrl = new URL(LOGIN_PAGE, request.url)
  return Response.redirect(loginUrl.toString(), 302)
}

// ---------------------------------------------------------------------------
// Parse a named cookie from the Cookie header string.
// Returns the cookie value, or null if not found.
// ---------------------------------------------------------------------------
function parseCookie(header: string, name: string): string | null {
  for (const segment of header.split(';')) {
    const trimmed = segment.trim()
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    if (key === name) return trimmed.slice(eq + 1).trim()
  }
  return null
}

// ---------------------------------------------------------------------------
// Verify a session token.
//
// Steps:
//   1. Split on the last '.' to separate payload from HMAC hex signature.
//   2. Import ADMIN_SESSION_SECRET as an HMAC-SHA256 key (Web Crypto API).
//   3. Verify the signature against the payload — constant-time via SubtleCrypto.
//   4. Parse expiresAt from the payload and compare against the current time.
//
// Returns true only when BOTH the signature is valid AND the token is
// not yet expired. Any malformed token returns false without throwing.
// ---------------------------------------------------------------------------
async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    // ── Split token into payload and signature ───────────────────────────
    const dotIndex = token.lastIndexOf('.')
    if (dotIndex === -1) return false

    const payload = token.slice(0, dotIndex)   // "issuedAt:expiresAt"
    const hexSig  = token.slice(dotIndex + 1)  // lowercase hex HMAC

    if (!payload || !hexSig) return false

    // ── Import secret as HMAC-SHA256 verification key ───────────────────
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,       // not extractable
      ['verify'],
    )

    // ── Verify signature (constant-time, no early exit on mismatch) ──────
    const sigBytes     = hexToBytes(hexSig)
    const payloadBytes = new TextEncoder().encode(payload)
    const signatureValid = await crypto.subtle.verify('HMAC', key, sigBytes, payloadBytes)

    if (!signatureValid) return false

    // ── Check expiry — only after the signature is confirmed valid ────────
    //   Payload format: "<issuedAt>:<expiresAt>"
    const colonIndex = payload.indexOf(':')
    if (colonIndex === -1) return false

    const expiresAt = parseInt(payload.slice(colonIndex + 1), 10)
    if (Number.isNaN(expiresAt)) return false

    const nowSeconds = Math.floor(Date.now() / 1000)
    return nowSeconds < expiresAt   // false when expired

  } catch {
    // Any parse error, bad base16, or crypto failure → reject token
    return false
  }
}

// ---------------------------------------------------------------------------
// Decode a lowercase hexadecimal string to a Uint8Array.
// Returns an empty array for any malformed input.
// ---------------------------------------------------------------------------
function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) return new Uint8Array(0)
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    const byte = parseInt(hex.slice(i, i + 2), 16)
    if (Number.isNaN(byte)) return new Uint8Array(0)
    bytes[i / 2] = byte
  }
  return bytes
}
