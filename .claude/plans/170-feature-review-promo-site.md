# Plan: Promo site feature review & additions (task 170)

Source: review of sportshq.io vs. app v1.5–1.7 (Play listing text in `sportshub/android/fastlane/metadata/android/en-US/full_description.txt`).

## Findings (gap summary)
Site does not mention: reliability/no-show tracking, smart activity alerts ("need one more"), availability/spontaneous play, chat, safety contacts + live location (only on safe-group-runs page), venue ratings, sanctioned venue events. Home page still shows the original six feature cards. Structured data is homepage-only and minimal.

## In scope (approved)
1. **Home-page features rework** (`_includes/sections/features.html`)
   - Add cards: Reliability & Trust, Fill Every Spot (smart alerts), Chat
   - Update Safety card (safety contacts, live location, guardian accounts)
   - Counter `01–06` -> `01–09`; new `feature_*` keys in `_data/locales.yml` for all 20 translated locales (en-* variants use defaults)
3. **Structured data** (`_layouts/default.html`)
   - Enrich `MobileApplication` (featureList, store URLs, inLanguage) and emit on locale home pages
   - Add `WebSite`, `FAQPage` + `BreadcrumbList` on the FAQ page, `ItemList` on use-case hub
4. **Two new use-case pages** (pattern from PR #21): 
   - `youth-sports` (guardian accounts, junior membership approvals, private events, team colours)
   - `fill-the-last-spot` (waitlists, need-one-more alerts, reminders, reliability, availability)
   - body include, hub card, related-use-case links, `default.html` title/desc case, 25 locale stubs, `use_cases.yml` + `locales.yml` copy for 20 locales, FAQ + JSON-LD

## Deferred (not approved yet)
- Sport-specific landing pages (pickleball/padel/5-a-side), comparison section, social proof, new-in-town / women-only / pickleball-padel / university / coach use cases
- App-side ideas: reliability badge, venue analytics, public event pages, calendar sync, payments, weather reminders, year-in-sport recap

## Image assets needed (user to generate via screenshot scripts)
Per locale under `assets/screenshots/{locale}/`:
- `youth-sports/01–04.webp`: guardian managing a junior profile; membership request awaiting approval; private event with team colours; activity attendance list
- `fill-the-last-spot/01–04.webp`: "need one more player" alert; waitlist promotion notification; reminder to non-responders; reliability summary on a profile
- `home/05–07.webp` (optional): chat, reliability profile, activity alerts for the new feature cards
Until generated, pages reference existing screenshots so nothing 404s.

## Trend hooks (for copy / future blog)
Strava 2025: clubs quadrupled to 1M, run clubs 3.5x; Adidas runner-safety survey; SFIA pickleball 24.3M / padel 1.07M (US).

## Status
Items 1, 3 and both new use cases implemented (uncommitted) and verified with a Docker Jekyll build: all JSON-LD parses, no English leakage in locale pages. es-419/es-MX reuse the `es` copy and zh-HK reuses `zh-Hant`. New use-case pages use placeholder screenshots until the images above exist.

## Review follow-up (2026-10-23)
- Safer Group Runs: FAQ, intro and FAQPage JSON-LD now describe activity-scoped live location sharing (confirmed participants or accepted safety contacts, from 1h before start until end, stoppable) and keep the no-emergency-service / no-guarantee limits. All 20 locales updated.
- New pages: truthful, localised alt text (keys `alt1–4`); hero CTA -> `#download`; "always reaches its numbers" / "never a player short" replaced with "help ... reach its numbers"; youth copy rewritten to match verified guardian behaviour (event memberships, attendance, alerts; minors visible only where a guardian adds them).
- Still open: real screenshots (placeholders in use; alt keys must be updated when they land), other use-case pages' hero CTAs and hardcoded English alts (pre-existing), native review of translations.
- Translations: use the `translator` agent going forward (site-adapted definition at `.claude/agents/translator.md`).

## Youth sports page parked (2026-11-09)
Needs app updates before it makes sense. Page and locale stubs kept but unlisted: removed from the use-cases hub (card + ItemList JSON-LD) and from fill-the-last-spot's related cards (replaced by office-sports-organizer); front matter `noindex: true` + `sitemap: false` on all 26 stubs (new `noindex` support in `default.html`). To relaunch: delete those two front-matter lines, restore the hub card and related card, and swap in real screenshots (`youth-sports/01–04`) and alts.
