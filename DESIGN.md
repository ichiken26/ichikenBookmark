---
version: "alpha"
name: Bookmark Library
description: A calm editorial index for a growing personal knowledge library.
colors:
  primary: "#185C45"
  primary-dark: "#0E4533"
  ink: "#17201D"
  muted: "#5A6661"
  canvas: "#F7F8F4"
  surface: "#FFFFFF"
  line: "#D8DED9"
  error: "#A1262F"
typography:
  display:
    fontFamily: Georgia
    fontSize: 6rem
    fontWeight: 500
    lineHeight: 1.13
    letterSpacing: -0.045em
  heading:
    fontFamily: Georgia
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: Inter
    fontSize: 0.76rem
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: 0.16em
rounded:
  sm: 8px
  md: 14px
spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  navigation-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: 12px
  bookmark-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 18px
  focus-ring:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
  navigation-link-hover:
    backgroundColor: "{colors.line}"
    textColor: "{colors.primary-dark}"
    typography: "{typography.body}"
  metadata:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
---

## Overview

Bookmark Library is an editorial index, not a dashboard. Generous space, restrained borders, and readable typography make a large collection feel calm and navigable.

## Colors

Warm canvas and white surfaces support long reading sessions. Deep green is reserved for navigation, focus, and meaningful interaction. Ink is used for primary copy and muted green-gray only for metadata.

## Typography

Georgia gives headings a library-like editorial voice. Inter, Noto Sans JP, or the system sans-serif stack keeps interface text compact and legible. Display sizes must remain fluid on narrow screens.

## Layout

Content uses a centered 1120px maximum width. Spacing follows the 8px-based scale. Dividers establish hierarchy before containers or shadows are introduced.

## Elevation & Depth

The main page is flat. Elevation is limited to the modal side menu, where it communicates an overlay above the document.

## Shapes

Small radii keep controls approachable without turning every section into a floating card. Circular forms are reserved for the brand mark and expand indicators.

## Components

Interactive targets are at least 44px high. Categories use native buttons with `aria-expanded`; outbound links expose a clear title and URL. Keyboard focus is always visible.

## Do's and Don'ts

Do use whitespace, rules, and typography for structure. Do keep every category closed initially and load its links only on demand. Do not add an admin link, decorative gradients, excessive shadows, or low-contrast metadata.
