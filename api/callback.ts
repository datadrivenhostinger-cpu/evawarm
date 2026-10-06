// Vercel Serverless Function — Node.js runtime.
//
// GET /api/callback
//
// Handles the OAuth callback from GitHub.
// Validates the cryptographically signed state token (and double-submit cookie),
// exchanges the authorization code for an access token with GitHub server-to-server,
// and sends the token back to Decap CMS via window.opener.postMessage.

import { createHmac, timingSafeEqual } from 'node:crypto'

export const PRODUCTION_CALLBACK_URL = 'https://evawarmweb.vercel.app/api/callback'
const STATE_MAX_AGE_SECONDS = 10 * 60 // 10 minutes

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  const signingSecret = clientSecret || process.env.ADMIN_SESSION_SECRET

  if (!clientId || !clientSecret || !signingSecret) {
    console.error('[callback] Missing required environment variables: GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET')
    return sendResponse(res, 500, 'error', 'OAuth server is not configured. Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET.')
  }

  // Parse query parameters
  const query = req.query || {}
  const code = query.code ? String(query.code) : null
  const state = query.state ? String(query.state) : null
  const error = query.error ? String(query.error) : null
  const errorDescription = query.error_description ? String(query.error_description) : null

  // 1. Handle GitHub error parameter
  if (error) {
    console.warn(`[callback] GitHub returned error: ${error} - ${errorDescription}`)
    return sendResponse(res, 400, 'error', errorDescription || error)
  }

  if (!code || !state) {
    console.warn('[callback] Missing code or state parameter')
    return sendResponse(res, 400, 'error', 'Missing code or state parameter from GitHub OAuth.')
  }

  // 2. Validate the state cryptographically
  const cookieHeader = req.headers.cookie || ''
  const cookieState = parseCookie(cookieHeader, 'decap_oauth_state')

  const isStateValid = validateState(state, signingSecret, cookieState)
  if (!isStateValid) {
    console.warn('[callback] Invalid or expired OAuth state token')
    return sendResponse(res, 400, 'error', 'Invalid or expired OAuth state parameter. Please try logging in again.')
  }

  // 3. Exchange code for GitHub access token (server-to-server)
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: PRODUCTION_CALLBACK_URL,
      }),
    })

    if (!tokenResponse.ok) {
      console.error(`[callback] GitHub token exchange HTTP error: ${tokenResponse.status}`)
      return sendResponse(res, 502, 'error', 'Failed to exchange authorization code with GitHub.')
    }

    const data: any = await tokenResponse.json()

    if (data.error) {
      console.error(`[callback] GitHub token error: ${data.error} - ${data.error_description}`)
      return sendResponse(res, 400, 'error', data.error_description || data.error)
    }

    const accessToken = data.access_token
    if (!accessToken) {
      console.error('[callback] No access_token returned by GitHub')
      return sendResponse(res, 502, 'error', 'No access token returned by GitHub.')
    }

    // 4. Clear the state cookie and send success response to Decap CMS
    res.setHeader('Set-Cookie', 'decap_oauth_state=; Path=/api/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=0')
    return sendResponse(res, 200, 'success', accessToken)

  } catch (err: any) {
    console.error('[callback] Unexpected error during token exchange:', err)
    return sendResponse(res, 500, 'error', 'An unexpected error occurred during GitHub authorization.')
  }
}

// ---------------------------------------------------------------------------
// Cryptographically validate state token.
// ---------------------------------------------------------------------------
function validateState(state: string, secret: string, cookieState: string | null): boolean {
  try {
    const dotIndex = state.lastIndexOf('.')
    if (dotIndex === -1) return false

    const payload = state.slice(0, dotIndex) // "<nonce>:<timestamp>"
    const sig = state.slice(dotIndex + 1)
    if (!payload || !sig) return false

    // Check HMAC signature
    const expectedSig = createHmac('sha256', secret).update(payload).digest('hex')
    if (!safeCompare(sig, expectedSig)) return false

    // Check expiry
    const colonIndex = payload.lastIndexOf(':')
    if (colonIndex === -1) return false

    const timestamp = parseInt(payload.slice(colonIndex + 1), 10)
    if (Number.isNaN(timestamp)) return false

    const nowSeconds = Math.floor(Date.now() / 1000)
    // Must not be expired (10 mins) and must not be from future (allow 30s clock drift)
    if (nowSeconds - timestamp > STATE_MAX_AGE_SECONDS || timestamp - nowSeconds > 30) {
      return false
    }

    // If cookie state is provided, double-check that it matches
    if (cookieState && !safeCompare(state, cookieState)) {
      return false
    }

    return true
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// Constant-time string comparison using Node.js crypto.timingSafeEqual.
// ---------------------------------------------------------------------------
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  const maxLen = Math.max(bufA.length, bufB.length)

  const padA = Buffer.concat([bufA, Buffer.alloc(maxLen - bufA.length)])
  const padB = Buffer.concat([bufB, Buffer.alloc(maxLen - bufB.length)])

  return timingSafeEqual(padA, padB) && bufA.length === bufB.length
}

// ---------------------------------------------------------------------------
// Parse a named cookie from the Cookie header string.
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
// Render the HTML/JS response for Decap CMS popup handshake.
// ---------------------------------------------------------------------------
function sendResponse(res: any, status: number, type: 'success' | 'error', messageOrToken: string) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(status)

  const payload = JSON.stringify(
    type === 'success'
      ? { token: messageOrToken, provider: 'github' }
      : { message: messageOrToken, provider: 'github' }
  )

  const messageType = `authorization:github:${type}`

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${type === 'success' ? 'Authorizing...' : 'Authorization Error'}</title>
</head>
<body>
  <p>${type === 'success' ? 'Connecting with GitHub, please wait...' : 'Authorization failed: ' + escapeHtml(messageOrToken)}</p>
  <script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          '${messageType}:' + ${JSON.stringify(payload)},
          e.origin
        );
      }

      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>`

  return res.send(html)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
