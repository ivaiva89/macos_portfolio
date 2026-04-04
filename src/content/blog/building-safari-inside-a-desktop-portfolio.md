---
title: Building a Safari window inside a desktop portfolio
slug: building-safari-inside-a-desktop-portfolio
excerpt: How I approached turning a portfolio into a small operating-system illusion without losing clarity or performance.
publishedAt: 2026-03-10
updatedAt: 2026-03-10
tags:
  - React
  - UX
  - Architecture
coverImage: /images/blog1.png
draft: false
---

The portfolio is intentionally not a generic landing page. It behaves more like a familiar workspace, where the content lives behind apps, folders, and windows.

## Why the desktop metaphor works

The desktop framing gives visitors context before they read anything. They immediately understand:

- where projects live
- how to open supporting material
- what kind of interaction model the site wants

> A strong metaphor only helps if it reduces explanation rather than adding novelty for its own sake.

## The implementation rule

I kept one constraint through the whole build: every new surface should feel like it belongs to the same operating system.

That affects routing, motion, spacing, and copy. A blog page should not suddenly become a conventional marketing page. It should feel like Safari was opened on the same machine.

## A practical React pattern

The window system is stateful, but the URLs still matter for direct linking:

```ts
const isBlogPath = (pathname: string) => pathname.startsWith('/blog')

if (isBlogPath(window.location.pathname)) {
  openWindow('safari')
}
```

That small rule keeps the visual metaphor and the browser model aligned.

## What I optimize for

1. Fast orientation
2. Native-feeling interactions
3. Content that is easy to maintain locally

The result is a portfolio that is opinionated without being hard to navigate.
