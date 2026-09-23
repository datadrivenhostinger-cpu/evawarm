# EvaWarm contact form setup

## Production
The contact form posts to `/api/contact` on Vercel. The function sends mail through Resend to `karthiks@datadriven-services.com`.

Set these Vercel environment variables:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (must be a sender/domain verified in Resend, for example `EvaWarm <hello@evawarm.com>`).

Resend can be connected from the Vercel Marketplace, which can provision the API key and assist with DNS/domain setup.

## Local preview
The Vite preview cannot execute the Vercel Function directly. In local development, submitting the form opens the visitor's default mail client with the enquiry pre-filled. After deployment to Vercel, `/api/contact` sends through Resend.

## Blog images
Each blog has a `Featured Image`/hero image. The `Hero Image Position` field controls the visible crop using CSS `object-position` (`center`, `top`, `bottom`, `left`, `right`).
