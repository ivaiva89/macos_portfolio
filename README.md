# macOS Portfolio

Personal portfolio built with `React`, `TypeScript`, `Vite`, `Tailwind CSS v4`, `GSAP`, and `Zustand`. The site behaves like a small macOS desktop, with apps and windows rendered inside a single-page experience.

## Development

```bash
npm install
npm run dev
```

## Blog authoring

Blog posts live in `src/content/blog/`.

Each post is a local markdown file with frontmatter:

```md
---
title: Example title
slug: example-title
excerpt: Short summary for list and metadata.
publishedAt: 2026-04-05
updatedAt: 2026-04-05
tags:
  - React
  - Architecture
coverImage: /images/blog1.png
draft: false
---
```

### How to add a post

1. Create a new `.md` file in `src/content/blog`.
2. Add the required frontmatter fields.
3. Write the article body in markdown.
4. Use an image from `public/images` for `coverImage`, or add a new optimized asset there.

### Drafts

- Set `draft: true` to keep a post available in development while excluding it from production output.
- Production builds exclude draft posts from the Safari list, direct article resolution, RSS, and sitemap generation.

### Publishing

- `npm run build` automatically generates `public/rss.xml` and `public/sitemap.xml`.
- Direct routes such as `/blog` and `/blog/my-post` are supported through the Vercel rewrite config in `vercel.json`.

## Commands

```bash
npm run dev
npm run lint
npm run generate:content
npm run build
```
