---
name: Fabio Secci Portfolio Visual Identity
version: 1.0.0
description: A high-fidelity, noir-brutalist design system for Fabio Secci's professional portfolio.
colors:
  primary: "#050505"
  secondary: "#ffffff"
  tertiary: "#E84E0F"
  background: "#050505"
  foreground: "#ffffff"
  accent: "#E84E0F"
  muted: "#333333"
  glass-bg: "#111111"
  glass-border: "#222222"

typography:
  display:
    fontFamily: "Libre Franklin"
    fontWeight: 900
    letterSpacing: "-0.05em"
    textTransform: "uppercase"
  sans:
    fontFamily: "Poppins"
    fontWeight: 400
  inter:
    fontFamily: "Inter"
    fontWeight: 400
  brand:
    fontFamily: "Dongle"
    fontWeight: 700

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 64px

rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px

components:
  card:
    backgroundColor: "{colors.glass-bg}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    padding: "{spacing.md}"
  badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs} {spacing.sm}"
  skeleton:
    backgroundColor: "{colors.glass-bg}"
    borderColor: "{colors.glass-border}"
    rounded: "{rounded.md}"
  list-item:
    borderColor: "{colors.muted}"
    padding: "{spacing.xl}"
  tool-badge:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.sm}"
  brand-identity:
    primaryColor: "{colors.primary}"
    secondaryColor: "{colors.secondary}"
    accentColor: "{colors.tertiary}"
---

## Overview
Noir-Brutalist Minimalism. The design is characterized by deep blacks, high-contrast typography, and fluid cinematic transitions. It prioritizes content (projects and AI experiments) through massive display type and subtle glassmorphism.

## Colors
The palette is strictly monochromatic with a single high-saturation accent color.
- **Primary (#050505):** Deep noir foundation to create depth.
- **Secondary (#ffffff):** Crisp white for maximum legibility on dark backgrounds.
- **Tertiary (#E84E0F):** Vibrant orange used sparingly for critical calls to action and branding.
- **Glassmorphism:** Simulated with deep greys (`#111111`) and subtle borders (`#222222`) on the noir background.

## Typography
- **Libre Franklin (Display):** Used for headlines (`8vw` to `6vw`). Always black/900 weight and uppercase for a brutalist feel.
- **Poppins (Sans):** Default typeface for body copy and general UI.
- **Inter:** Secondary sans-serif for metadata and technical details.
- **Dongle:** Reserved for specific brand elements requiring a unique, high-impact personality.

## Motion & Depth
- **Aperture Effect:** Sections reveal with a blur-to-clear transition and a scale reveal (1.2 to 1.0).
- **Z-Index Strategy:** Clear layering between video backgrounds (z-10), overlays (z-20), and global UI like the Custom Cursor (z-100).
- **Transitions:** 1.2s duration with custom cubic-beziers `[0.22, 1, 0.36, 1]` for a premium, heavy feel.
