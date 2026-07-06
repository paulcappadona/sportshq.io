# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & development

**Always use Docker — do not run `bundle` or `jekyll` commands directly on the host.**

```bash
# Start dev server with live reload at http://localhost:8800
docker-compose up

# Build only (no server)
docker-compose run --rm jekyll jekyll build

# Stop
docker-compose down
```

First run pulls the Ruby image and installs gems into a named volume (takes a few minutes). Subsequent starts are fast.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds Jekyll and deploys to GitHub Pages automatically. No manual steps needed.

## Architecture

### Localisation system

The site serves 25 locales. The root `/` is canonical en-US; the other 24 live at `/{locale}/` (e.g. `/fr/`, `/zh-Hant/`).

**Single source of truth:** `_data/locales.yml` — one entry per locale with every translated UI string (`hero_badge`, `nav_features`, `footer_privacy`, etc.) plus metadata (`id`, `hreflang`, `path`, `lang`, `dir`, `screenshot_count`).

**Locale page pattern** — each locale has a minimal stub:
```yaml
# fr/index.html
---
layout: locale
locale_id: fr
---
```
The `locale` layout (`_layouts/locale.html`) pulls all content from `site.data.locales` via `page.locale_id` and renders every section. The `default` layout detects `page.locale_id` and sets `_loc` for nav/footer localisation.

**Locale redirect** — an inline script in `default.html` runs on the root page load, reads `navigator.languages`, maps to a locale path, and redirects. The choice is persisted in `localStorage` as `shq_locale`.

**hreflang** — `default.html` emits hreflang alternates conditionally:
- Home/locale pages → all 24 locale home paths
- `legal_type: pp` pages → all 24 locale `/pp.html` paths
- `legal_type: tos` pages → all 24 locale `/tos.html` paths

### Layouts

| Layout | Used by |
|---|---|
| `default` | All pages — provides `<head>`, nav, footer, scripts |
| `locale` | `/{locale}/index.html` stubs — inherits `default`, renders locale hero/sections from data |

### Legal pages

Legal content lives in `_includes/legal/content/{lang}/pp.html` and `tos.html` (18 language variants). The dispatcher includes `_includes/legal/pp-body.html` and `tos-body.html` route to the correct translation via `page.locale_id`. The canonical English pages are at `/about/pp.html` and `/about/tos.html`; locale pages are at `/{locale}/pp.html` and `/{locale}/tos.html`.

Front matter for legal pages:
```yaml
legal_type: pp   # or tos — controls hreflang output in default.html
extra_css: /css/legal.css
toc: true        # enables sticky TOC scroll-highlight script
sitemap: false   # canonical English versions excluded; locale versions included
```

### Nav scroll behaviour

The nav is transparent at the top of pages with a dark hero (index, locale home, legal pages) and transitions to opaque after 40 px scroll. The `nav--scrolled` class is toggled by `js/main.js`. **Do not add `nav_solid: true`** to pages that have a dark `.legal-hero` or `.hero` section — that class is only for pages with a light/no hero.

### Homepage sections

`_includes/sections/` contains the reusable section partials (hero is inlined in `locale.html`):
`proof-strip`, `features`, `how-it-works`, `sports`, `venues`, `global`, `download`

Both `/index.html` (en-US) and every `/{locale}/index.html` render these via the `locale` layout.

### Adding a new locale

1. Add an entry to `_data/locales.yml` with all required string keys.
2. Create `/{locale}/index.html` with `layout: locale` and `locale_id: {id}`.
3. Create `/{locale}/pp.html` and `/{locale}/tos.html` (see existing locale legal stubs).
4. Add the locale to the path map in `js/locale.js` and the redirect map in `default.html`.
5. Add translated legal content to `_includes/legal/content/{lang}/pp.html` and `tos.html`.
6. Update the dispatcher in `_includes/legal/pp-body.html` and `tos-body.html`.
