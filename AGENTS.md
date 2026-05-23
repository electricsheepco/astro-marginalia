# Astro Marginalia — AGENTS.md

This is a standalone Astro theme extracted from a production lexicon site.

## Project

A reusable literary archive theme for glossaries, dictionaries, field guides, annotated essays, and cultural knowledge projects.

## Stack

- Astro 4.x
- TypeScript strict
- Zod content collections
- Tailwind CSS available, but most styling lives in `src/styles/global.css`
- Pagefind search
- Vercel-compatible static output

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Ports are configured above 18000.

## Editing Rules

- Keep the theme generic. Do not add project-specific content, analytics, or external widgets.
- Do not install component libraries.
- Preserve the content-first model: entries are Markdown files with typed frontmatter.
- Use `templates/entry.md` as the author-facing example.
- Keep demo claims clearly marked as replaceable sample content.

## Design Intent

The visual language is manuscript-like: warm paper, grid lines, large display forms, marginal notes, compact mono labels, timelines, and source discipline.
