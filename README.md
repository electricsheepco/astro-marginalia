# Astro Marginalia

A literary Astro theme for glossaries, dictionaries, field guides, annotated archives, cultural notebooks, and research indexes.

Marginalia is designed for projects where each entry is both a beautiful page and a structured record: a hero display form, a short essay, marginal notes, lineage/timeline summaries, related entries, sources, RSS, Pagefind search, and social metadata.

**Live demo:** [astro-marginalia-theme.vercel.app](https://astro-marginalia-theme.vercel.app)  
**Repository:** [github.com/electricsheepco/astro-marginalia](https://github.com/electricsheepco/astro-marginalia)

## See It In Action

- [Tamizh Lexicon](https://tamizhlexicon.in) — the original editorial dictionary whose layout system became this theme.

## Features

- Astro 4 static site
- TypeScript + Zod typed content collections
- Pagefind full-text search
- Entry pages with hero display, marginalia, sticky TOC, share links, timeline, related links, and sources
- Homepage with search and paginated entry grid
- RSS feed
- Open Graph / Twitter metadata
- Plain CSS design tokens, no component library

## Quick Start

```bash
npm install
npm run dev
npm run build
npm run preview
```

Local ports are configured above 18000 by default.

## Add an Entry

Copy `templates/entry.md` into `src/content/entries/my-entry.md` and edit the frontmatter.

Minimum viable entry:

```yaml
---
title: "harbor"
display: "harbor"
category: "water"
status: "draft"
layers:
  modern:
    colloquial: "harbor"
    notes: "How the entry lives now."
marginalia: "A short interpretive note."
---

Write the essay here.
```

## Content Fields

- `title`: plain title used for URLs, cards, RSS, and metadata
- `display`: the large hero form shown on entry pages
- `transliteration`: optional secondary reading
- `category`: any string; category pages are generated automatically
- `status`: `draft`, `sourced`, or `complete`
- `layers.origin`, `layers.classical`, `layers.contact`, `layers.other`, `layers.modern`: structured timeline data
- `marginalia`: short editorial note displayed beside the hero
- `sources`: optional structured bibliography
- `image`: optional hero image block

## Customize

Edit `src/styles/global.css` for colors, fonts, spacing, and layout tokens. The main tokens live at the top of the file.

Update `src/layouts/Base.astro` with your site origin, title, footer links, and metadata defaults before publishing.

## Submission Notes

This repo is structured as a standalone Astro theme. Before submitting to astro.build/themes, add final screenshots and any marketplace-specific metadata requested by the Astro theme directory.
