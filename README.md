# Graphics & Development Portfolio

A dark-mode Astro portfolio for graphics and development work. Portfolio entries are MDX content files, so you can edit project metadata and long-form case studies without a CMS.

## Local Development

```bash
npm install
npm run dev
```

Build and validate the static site:

```bash
npm run build
npm run preview
```

## Editing Profile Links

Update `src/data/site.ts` with your real name, bio, location, email, LinkedIn URL, and Instagram URL.

## Adding Portfolio Items

Create a new `.mdx` file in `src/content/work/`. Use the existing files as templates.

Required frontmatter:

```yaml
title: "Project Title"
category: "graphics" # or "development"
summary: "Short card description."
year: "2026"
role: "Your role"
tools: ["Astro", "Figma"]
tags: ["Tag", "Tag"]
show: true
featured: true
```

Optional fields include `subtitle`, `show`, `liveUrl`, `repoUrl`, `caseStudyUrl`, `thumbnail`, and `gallery`.

Set `show: false` to keep an entry in the repo and content collection without rendering it on the homepage.

Available placeholder visual classes:

- `visual-slate`
- `visual-ember`
- `visual-grid`
- `visual-code`
- `visual-lab`
- `visual-violet`

To use real images later, replace `VisualPanel.astro` with an image-aware component or add image fields to the content schema.

## GitHub Actions + AWS Lightsail Deployment

The site builds to static files in `dist/`, which can be served by Nginx or Apache on a Lightsail instance.

Recommended GitHub repository secrets:

- `LIGHTSAIL_HOST`: public IP or DNS name for the instance
- `LIGHTSAIL_USER`: SSH user, often `ubuntu` or `bitnami`
- `LIGHTSAIL_SSH_KEY`: private SSH key with access to the instance
- `LIGHTSAIL_WEB_ROOT`: deploy target such as `/var/www/html`

Example workflow to add later at `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Configure SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.LIGHTSAIL_SSH_KEY }}" > ~/.ssh/lightsail
          chmod 600 ~/.ssh/lightsail
          ssh-keyscan -H "${{ secrets.LIGHTSAIL_HOST }}" >> ~/.ssh/known_hosts
      - name: Upload static files
        run: |
          rsync -az --delete -e "ssh -i ~/.ssh/lightsail" dist/ \
            "${{ secrets.LIGHTSAIL_USER }}@${{ secrets.LIGHTSAIL_HOST }}:${{ secrets.LIGHTSAIL_WEB_ROOT }}/"
```

Keep credentials in GitHub Secrets only. Do not commit private keys, server IPs that should stay private, or `.env` files.
