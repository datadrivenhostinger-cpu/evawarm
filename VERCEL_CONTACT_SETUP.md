# EvaWarm contact form setup

## How it works

The contact form POSTs to `/api/contact` (a Vercel Serverless Function at `api/contact.ts`).

The function authenticates with Google using a **Service Account** and **Domain-Wide Delegation**, then sends the enquiry email via the **Gmail API** from your Google Workspace address.

### Email routing

| Header    | Value                                          |
|-----------|------------------------------------------------|
| From      | `GOOGLE_IMPERSONATE_USER` (your Workspace address) |
| To        | `CONTACT_EMAIL`                                |
| Cc        | `CONTACT_CC` (optional)                        |
| Reply-To  | Visitor's submitted email address              |

---

## Required environment variables

Set these in the Vercel dashboard: open the **`evawarm_web`** project → **Settings → Environment Variables**.

| Variable                      | Description                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The `client_email` from your Google Service Account JSON key file.                             |
| `GOOGLE_PRIVATE_KEY_B64`       | The `private_key` from the Service Account JSON, **base64-encoded** (removes newline issues). |
| `GOOGLE_IMPERSONATE_USER`      | The Google Workspace email address the Service Account impersonates to send mail (e.g. `hello@evawarm.com`). |
| `CONTACT_EMAIL`                | The recipient address where enquiries are delivered.                                           |
| `CONTACT_CC`                   | *(Optional)* A CC address to include on every enquiry email.                                   |

> **Never commit these values to Git.** They are listed in `.gitignore` and must only be set via the Vercel dashboard or CLI.

---

## Google Cloud setup checklist

1. **Create a Service Account** in [Google Cloud Console](https://console.cloud.google.com/) for your project.
2. **Generate a JSON key** for the Service Account and download it.
3. **Enable the Gmail API** for the project.
4. **Grant Domain-Wide Delegation** to the Service Account:
   - In Google Cloud Console → Service Account → *Show Advanced Settings* → enable *Domain-wide delegation*.
   - In [Google Workspace Admin](https://admin.google.com/) → Security → API Controls → *Manage Domain-wide Delegation* → add the Service Account's Client ID with the scope:
     ```
     https://www.googleapis.com/auth/gmail.send
     ```
5. **Base64-encode the private key** before setting `GOOGLE_PRIVATE_KEY_B64`:
   ```bash
   # On macOS/Linux
   echo -n "-----BEGIN RSA PRIVATE KEY-----\n..." | base64

   # On Windows PowerShell
   [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content private-key.txt -Raw)))
   ```
6. Set all five environment variables in the **`evawarm_web`** Vercel project and redeploy.

---

## Local development

The Vite dev server (`npm run dev`) cannot execute Vercel Serverless Functions directly. When the contact form is submitted locally, the browser falls back to opening the visitor's default mail client with the enquiry pre-filled.

After deploying to Vercel, `/api/contact` runs as a real serverless function and sends the email through the Gmail API.

---

## Blog images

Each blog post has a **Hero / Featured Image**. The **Hero Image Position** field in the CMS controls the visible crop area using CSS `object-position` (`center`, `top`, `bottom`, `left`, `right`).
