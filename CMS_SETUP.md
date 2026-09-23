# EvaWarm Blog Admin (Decap CMS)

The blog is now content-driven. Each article lives as a small JSON file under `content/blog/`. Decap CMS provides the `/admin/` editor for creating, editing, and deleting those posts.

## Local admin panel

The local CMS uses the Decap proxy backend, so you do not need a GitHub token just to work on the local project.

1. If this project is not already a Git repository, run `git init` once in the project root.
2. Install dependencies:

```bash
npm install
```

3. Start the CMS proxy in one terminal:

```bash
npm run cms
```

4. Start the EvaWarm website in a second terminal:

```bash
npm run dev
```

5. Open:

```text
http://localhost:8443/admin/
```

Create, edit, or delete a post from the **Blog Posts** collection. The saved files are written to `content/blog/`.

## How the website gets the posts

The Vite app imports every `content/blog/*.json` file at build time. A normal site deployment therefore picks up any posts committed to the repository. After the CMS makes a content change, the hosting provider must rebuild/deploy the project for that change to appear on the live site.

## Production authentication

The included local config deliberately uses the local `proxy` backend. Do not expose that configuration as the production authentication method.

For a Netlify-hosted site, the simplest production setup is Decap's `git-gateway` backend with Netlify Identity/Git Gateway. For a GitHub-hosted repository on another hosting provider, use the Decap GitHub backend with a supported OAuth server/proxy. The repository owner/name and production auth details must be supplied before switching `public/admin/config.yml` to production.

Do not put a GitHub personal access token in frontend source code.


## Local URLs
- Website: http://localhost:8443/
- Decap CMS: http://localhost:8443/admin/
- Decap proxy: http://localhost:8081/
