# sportshq.io

Sports HQ marketing site, built with Jekyll and deployed to GitHub Pages via GitHub Actions.

## Project structure

```
/
├── _includes/        # Reusable HTML components
│   ├── nav.html      # Site navigation
│   └── footer.html   # Site footer
├── _layouts/
│   └── default.html  # Base HTML shell (head, nav, footer, scripts)
├── _config.yml       # Jekyll configuration
├── index.html        # Home page (front matter + content only)
├── about/
│   ├── pp.html       # Privacy Policy
│   └── tos.html      # Terms of Service
├── css/              # Stylesheets
│   ├── style.css     # Main design system
│   └── legal.css     # Legal page styles
├── js/
│   └── main.js       # Theme toggle, nav scroll, animations
└── .github/
    └── workflows/
        └── pages.yml # CI/CD: build Jekyll → deploy to Pages
```

Pages with Jekyll front matter use `layout: default` and get the nav/footer automatically. Pages without front matter pass through as static files.

## Local development

### Option A — Docker (recommended, no Ruby setup required)

Uses the official `ruby:3.3` image, which supports Apple Silicon (arm64) natively.

```bash
docker-compose up
```

The site will be available at **http://localhost:8800** with live reload on file changes. Stop with `Ctrl+C`, then `docker-compose down`.

On first run Docker pulls the Ruby image and installs gems into a named volume — this takes a couple of minutes. Subsequent starts are fast.

### Option B — Native Ruby

Requires Ruby 3.x. Check your version with `ruby --version`; use [rbenv](https://github.com/rbenv/rbenv) or [mise](https://mise.jdx.dev) to manage versions if needed.

```bash
gem install bundler
bundle install
bundle exec jekyll serve --livereload
```

Site runs at **http://localhost:4000**.

### Build only (no server)

```bash
# Docker
docker-compose run --rm jekyll jekyll build

# Native
bundle exec jekyll build
```

Output goes to `_site/`. This directory is gitignored — it's generated on every deploy.

## Creating a new page

Add front matter to any `.html` file and it will inherit the nav, footer, and full `<head>`:

```yaml
---
layout: default
title: "Page Title — Sports HQ"
description: "Page description for SEO."
---

<!-- your page content here -->
```

Additional front matter options:

| Key | Effect |
|---|---|
| `nav_solid: true` | Nav renders with solid background from the top (use on pages without a dark hero section) |
| `extra_css: /css/legal.css` | Injects an extra stylesheet into `<head>` |
| `toc: true` | Activates the sticky sidebar TOC scroll-highlight script (legal pages) |

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/pages.yml`), which builds Jekyll and deploys directly to GitHub Pages. No manual build or `docs/` commit needed.

