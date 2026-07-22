---
title: Turning a desktop portfolio into an iPhone
slug: turning-a-desktop-portfolio-into-an-iphone
excerpt: Adding an iOS shell to a macOS-style portfolio with one route tree, one window store, and two chromes, plus a Tailwind v4 gotcha that cost an hour.
publishedAt: 2026-07-22
updatedAt: 2026-07-22
tags:
  - React
  - CSS
  - Architecture
coverImage: /images/covers/turning-a-desktop-portfolio-into-an-iphone.jpg
draft: false
---

A macOS-style portfolio has an obvious problem on phones: there is no desktop. For months my mobile visitors got a wallpaper, a greeting, and a notice that the site was designed for larger screens. Most people opening a portfolio link from LinkedIn are on a phone, so the most common visitor saw the least content.

## The wrong fix

The tempting fix is a generic responsive fallback: stack the content, add a hamburger, call it done. But the desktop metaphor is the whole identity of the site. A page that behaves like macOS on one screen size and like a template on another has lost its argument.

The right fix was staring at me from my pocket. Small screens get an iPhone: a springboard grid of app icons, a status bar, a dock, a home indicator. Same apps, same content, same metaphor, different hardware.

## One store, two chromes

The whole feature hangs on a single decision: the window state does not know what it looks like. Every app on the site (Finder for projects, Safari for articles, Terminal for the tech stack) already went through one Zustand store that tracks `isOpen` and `zIndex` per window. That store stayed untouched.

What changed is who renders around it:

```tsx
const isMobile = useIsMobile() // matchMedia('(max-width: 767px)')

{isMobile ? (
  <MobileShell />          // status bar, springboard, iOS dock
) : (
  <>
    <Navbar />
    <Welcome />
    <Dock />
    <Home />
  </>
)}
```

The window components render in both branches. On desktop they are draggable windows with traffic-light controls. On mobile the same components become full-screen sheets that slide up from the bottom. Opening the Articles app on a phone and opening the Safari window on desktop dispatch the same action.

Because the store and routes are shared, features I never planned for came free. Deep links already worked: `/blog/some-post` opens the Safari window on desktop, so on a phone it boots straight into the Safari app, full screen, no extra code.

## The seam is the window wrapper

Every window is wrapped in one HOC that handles open animation and dragging. That made it the natural seam: the mobile branch skips `Draggable`, pins the section to the viewport, and animates `y` from `100%` to `0`. One file decides which physics apply.

## The bug worth writing down

The first mobile build rendered every sheet half off-screen. The CSS said `inset: 0`. The element disagreed.

The cause: on desktop, windows center themselves with Tailwind's `-translate-x-1/2`. In Tailwind v4, translate utilities compile to the CSS `translate` property, not a `transform`. GSAP animates `transform`, so resetting `x` in the animation did nothing; the old `translate: -50%` sat underneath it, untouched, shifting every sheet half a viewport left.

```css
section.mobile-app {
  inset: 0 !important;
  /* Tailwind v4 translate lives outside transform; GSAP can't clear it */
  translate: none !important;
}
```

Two properties, both moving the element, owned by different tools. Worth knowing before it costs you an hour in a device emulator.

## Where it landed

No new routes, no forked components, no second codebase. The mobile shell is three small components plus one branch in the window wrapper, and hover-only effects (dock magnification, variable-font tricks) are gated behind `(hover)` and `prefers-reduced-motion` so touch devices never pay for them. The phone experience went from an apology to a feature.
