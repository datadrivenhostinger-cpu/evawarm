// Vercel Serverless Function — Node.js runtime.
//
// GET /api/auth
//
// Initiates the GitHub OAuth flow for Decap CMS.
// Generates a cryptographically signed, timestamped state token to prevent CSRF,
// sets an HttpOnly Secure cookie with the state for double-submit verification,
// and redirects the browser popup to GitHub's OAuth authorization endpoint.

import { randomBytes, createHmac } from 'node:crypto'

export const PRODUCTION_CALLBACK_URL = 'https://evawarmweb.vercel.app/api/callback'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const secret = process.env.GITHUB_CLIENT_SECRET || process.env.ADMIN_SESSION_SECRET

  if (!clientId || !secret) {
    console.error('[auth] Missing required environment variables: GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET')
    return res.status(500).send('OAuth is not configured. Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in Vercel environment variables.')
  }

  // 1. Generate cryptographically secure state
  // Payload: <16-byte random hex nonce>:<unix timestamp in seconds>
  const nonce = randomBytes(16).toString('hex')
  const nowSeconds = Math.floor(Date.now() / 1000)
  const payload = `${nonce}:${nowSeconds}`

  // 2. Sign state payload with HMAC-SHA256
  const sig = createHmac('sha256', secret).update(payload).digest('hex')
  const state = `${payload}.${sig}`

  // 3. Set HttpOnly, Secure, SameSite=Lax cookie for double-submit validation (valid for 10 minutes)
  const maxAge = 10 * 60 // 600 seconds
  res.setHeader(
    'Set-Cookie',
    `decap_oauth_state=${state}; Path=/api/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`,
  )

  // 4. Construct GitHub OAuth authorization URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: PRODUCTION_CALLBACK_URL,
    scope: 'repo,user',
    state: state,
  })

  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`

  res.setHeader('Location', githubAuthUrl)
  return res.status(302).end()
}
