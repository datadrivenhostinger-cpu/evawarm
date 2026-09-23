import { google } from 'googleapis'

type ContactBody = {
  name?: string
  fullName?: string

  email?: string
  workEmail?: string

  company?: string

  services?: string[] | string

  message?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function base64UrlEncode(value: string): string {
  return Buffer.from(value, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  try {
    const body = req.body as ContactBody

    // --------------------------------------------------
    // GET FORM VALUES
    // Supports both:
    // name / email
    // OR
    // fullName / workEmail
    // --------------------------------------------------

    const name =
      body.name?.trim() ||
      body.fullName?.trim() ||
      ''

    const email =
      body.email?.trim() ||
      body.workEmail?.trim() ||
      ''

    const company =
      body.company?.trim() ||
      ''

    const message =
      body.message?.trim() ||
      ''

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!name || !email || !message) {
      return res.status(400).json({
        error:
          'Full name, work email, and message are required.',
      })
    }

    // --------------------------------------------------
    // GOOGLE ENVIRONMENT VARIABLES
    // --------------------------------------------------

    const serviceAccountEmail =
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL

    const privateKeyBase64 = process.env.GOOGLE_PRIVATE_KEY_B64

const privateKey = privateKeyBase64
  ? Buffer.from(privateKeyBase64, 'base64').toString('utf8')
  : undefined

    const impersonateUser =
      process.env.GOOGLE_IMPERSONATE_USER

    const contactEmail =
      process.env.CONTACT_EMAIL
    const ccEmail = process.env.CONTACT_CC?.trim()

    // --------------------------------------------------
    // CHECK ENVIRONMENT VARIABLES
    // --------------------------------------------------

    if (
      !serviceAccountEmail ||
      !privateKey ||
      !impersonateUser ||
      !contactEmail
    ) {
      console.error(
        'Missing Google email environment variables'
      )

      return res.status(500).json({
        error: 'Email service is not configured yet.',
      })
    }

    // --------------------------------------------------
    // SERVICES
    // --------------------------------------------------

    let selectedServices = 'Not specified'

    if (Array.isArray(body.services)) {
      selectedServices =
        body.services.length > 0
          ? body.services.join(', ')
          : 'Not specified'
    } else if (typeof body.services === 'string') {
      selectedServices =
        body.services.trim() || 'Not specified'
    }

    // --------------------------------------------------
    // ESCAPE DATA FOR HTML EMAIL
    // --------------------------------------------------

    const safeName = escapeHtml(name)

    const safeEmail = escapeHtml(email)

    const safeCompany = escapeHtml(
      company || 'Not provided'
    )

    const safeServices = escapeHtml(
      selectedServices
    )

    const safeMessage = escapeHtml(
      message
    ).replace(/\n/g, '<br>')

    // --------------------------------------------------
    // EMAIL SUBJECT
    // --------------------------------------------------

    const subject =
      `New EvaWarm enquiry from ${name}`

    // --------------------------------------------------
    // EMAIL HTML
    // --------------------------------------------------

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New EvaWarm Enquiry</title>
</head>

<body
  style="
    margin: 0;
    padding: 30px;
    background: #f5f7fb;
    font-family: Arial, Helvetica, sans-serif;
    color: #222;
  "
>

  <div
    style="
      max-width: 700px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    "
  >

    <h2
      style="
        margin-top: 0;
        color: #111827;
      "
    >
      New EvaWarm Contact Form Enquiry
    </h2>

    <hr
      style="
        border: none;
        border-top: 1px solid #e5e7eb;
        margin: 20px 0;
      "
    />

    <p>
      <strong>Full Name:</strong><br />
      ${safeName}
    </p>

    <p>
      <strong>Work Email:</strong><br />
      ${safeEmail}
    </p>

    <p>
      <strong>Company:</strong><br />
      ${safeCompany}
    </p>

    <p>
      <strong>Services Interested In:</strong><br />
      ${safeServices}
    </p>

    <p>
      <strong>Message:</strong><br />
      ${safeMessage}
    </p>

    <hr
      style="
        border: none;
        border-top: 1px solid #e5e7eb;
        margin: 20px 0;
      "
    />

    <p
      style="
        font-size: 12px;
        color: #6b7280;
      "
    >
      This enquiry was submitted through the EvaWarm website.
    </p>

  </div>

</body>
</html>
`

    // --------------------------------------------------
    // GOOGLE AUTHENTICATION
    // SERVICE ACCOUNT + DOMAIN-WIDE DELEGATION
    // --------------------------------------------------

    const auth = new google.auth.JWT({
      email: serviceAccountEmail,

      key: privateKey,

      scopes: [
        'https://www.googleapis.com/auth/gmail.send',
      ],

      // Google Workspace user that the
      // service account is allowed to impersonate
      subject: impersonateUser,
    })

    // --------------------------------------------------
    // GMAIL API
    // --------------------------------------------------

    const gmail = google.gmail({
  version: 'v1',
  auth: auth as any,
})

    // --------------------------------------------------
    // CREATE EMAIL
    // --------------------------------------------------
    //
    // From:
    //   karthiks@datadriven-services.co.in
    //
    // To:
    //   karthiks@datadriven-services.com
    //
    // Reply-To:
    //   visitor's email
    //
    // --------------------------------------------------

    const rawMessage = [
  `From: ${impersonateUser}`,
  `To: ${contactEmail}`,
  ...(ccEmail ? [`Cc: ${ccEmail}`] : []),
  `Reply-To: ${email}`,
  `Subject: ${subject}`,
  'MIME-Version: 1.0',
  'Content-Type: text/html; charset=UTF-8',
  '',
  html,
].join('\r\n')

    // Gmail API requires base64url format
    const encodedMessage =
      base64UrlEncode(rawMessage)

    // --------------------------------------------------
    // SEND EMAIL
    // --------------------------------------------------

    await gmail.users.messages.send({
      userId: 'me',

      requestBody: {
        raw: encodedMessage,
      },
    })

    console.log(
      `EvaWarm enquiry sent successfully to ${contactEmail}`
    )

    // --------------------------------------------------
    // SUCCESS RESPONSE
    // --------------------------------------------------

    return res.status(200).json({
      message: 'Email sent successfully',
    })

  } catch (error: any) {

    console.error(
      'Gmail API error:',
      error?.response?.data ||
        error?.message ||
        error
    )

    return res.status(500).json({
      error:
        'Unable to send your enquiry right now.',
    })
  }
}