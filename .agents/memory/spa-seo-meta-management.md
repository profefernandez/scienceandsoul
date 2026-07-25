---
name: SPA SEO meta management
description: Why per-page meta is managed by DOM upsert instead of react-helmet-async, and the SPA social-crawler limitation
---

## Rule
Per-page SEO meta (title, description, canonical, og/twitter) is managed by a single `Seo` component that upserts the existing static `index.html` tags via DOM, not react-helmet-async.

**Why:** react-helmet-async appends its own meta tags alongside the static `index.html` defaults instead of replacing them, producing duplicate description/og tags in the DOM (first-match wins for crawlers, so page-specific tags were ignored). Marking static tags with `data-rh="true"` did NOT make Helmet take them over on client-only render.

**How to apply:** Keep one metadata authority per tag: static `index.html` provides crawler-visible defaults (social scrapers don't run JS); the `Seo` component mutates those same tags at runtime. Don't reintroduce Helmet `<title>`/meta in pages — Helmet remains only for `<html>` attributes and JSON-LD script tags.

## Caveat
Client-rendered SPA means deep links (/privacy etc.) show only the index.html defaults to non-JS social scrapers. True per-route share cards would need prerendering/SSR or static per-route HTML snapshots.
