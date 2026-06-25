---
name: Cognitive Clarity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#484554'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#797586'
  outline-variant: '#c9c4d7'
  surface-tint: '#6042d6'
  primary: '#451ebb'
  on-primary: '#ffffff'
  primary-container: '#5d3fd3'
  on-primary-container: '#d8ceff'
  inverse-primary: '#cabeff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#004f34'
  on-tertiary: '#ffffff'
  tertiary-container: '#006947'
  on-tertiary-container: '#5fecb0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cabeff'
  on-primary-fixed: '#1c0062'
  on-primary-fixed-variant: '#4723be'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for **ResumeIQ**, focusing on the intersection of human potential and artificial intelligence. The brand personality is **Intelligent, Precise, and Empowering**, aiming to evoke a sense of focused confidence in the user’s professional journey. 

The aesthetic blends **High-Contrast Minimalism** with **Tonal Layering**. It avoids unnecessary ornamentation, favoring mathematical precision and structural clarity. The visual language is deeply rooted in modern SaaS aesthetics—utilizing generous negative space, crisp borders, and subtle micro-interactions that provide immediate cognitive feedback. The goal is a premium, "instrument-grade" interface that feels like a powerful tool for career engineering.

## Colors

The palette is anchored by **Deep Indigo (#5D3FD3)**, representing intelligence and professional ambition. 

### Light Mode
The light theme utilizes a pristine white background (#FFFFFF) with high-contrast Slate-900 (#0F172A) for primary text. Accent colors are used sparingly to highlight AI-driven insights and calls to action.

### Dark Mode
The dark theme shifts to a **Rich Charcoal/Slate** foundation. The base surface is a deep #020617, while secondary containers use #0F172A. This prevents the "pure black" fatigue while maintaining high contrast.

### Functional Colors
- **Success:** Emerald 500 (#10B981) for resume score improvements.
- **Warning:** Amber 500 (#F59E0B) for missing keywords.
- **Error:** Rose 500 (#F43F5E) for critical formatting issues.
- **Accessibility:** All color combinations target a minimum WCAG 2.1 AA contrast ratio, specifically ensuring that Deep Indigo remains legible against both white and deep slate backgrounds.

## Typography

This design system leverages **Geist** for its technical precision and readability. The type scale is strictly mathematical, ensuring a clear information hierarchy for data-dense resume analysis.

- **Headlines:** Set with tighter letter-spacing and heavier weights to feel impactful and grounded.
- **Body Text:** Optimized for long-form reading during resume editing, with generous line heights.
- **Labels:** Used for metadata and AI tags, utilizing medium weights to maintain legibility at small sizes.
- **Geist Mono:** Reserved for specific technical data, such as ATS compatibility strings or code-related resume sections.

## Layout & Spacing

The layout philosophy follows a **Strict 8px Grid** (Round Eight geometry), ensuring all components and spacing increments are multiples of 8.

- **Grid System:** A 12-column fluid grid for desktop, transitioning to a 4-column grid for mobile.
- **Spacing Rhythm:** Use `8px`, `16px`, `24px`, `32px`, `48px`, and `64px` for all margins and padding. 
- **Content Density:** High-density layouts for the Resume Editor (compact spacing) and low-density for the Dashboard (spacious margins) to facilitate cognitive ease.
- **Alignment:** All text elements and icons must be optically aligned to the 8px baseline grid to maintain the "Precise" brand pillar.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Surface Tiers:** 
  - Level 0: Base background (#FFFFFF / #020617).
  - Level 1: Primary cards and sidebars (#F8FAFC / #0F172A).
  - Level 2: Modals and floating menus.
- **Borders:** Instead of shadows, use 1px borders (#E2E8F0 in light, #1E293B in dark) to define shapes. 
- **Active State:** Deep Indigo (#5D3FD3) is used as a 2px "focus ring" or border to denote the active interactive element.
- **Elevated States:** For modals, use a very soft, large-radius shadow with 4% opacity to create a subtle lift from the surface.

## Shapes

The shape language is **Structured and Sophisticated**. Following the 8px logic, the default border radius is 8px (0.5rem), creating a balanced look that is neither too sharp nor too playful.

- **Standard Elements (Buttons, Inputs):** 8px radius.
- **Large Elements (Cards, Modals):** 16px (1rem) radius.
- **Extra Large (Sections):** 24px (1.5rem) radius.
- **Interactive States:** On hover, shapes do not change radius; instead, they transition in border-color or background-color to maintain structural integrity.

## Components

### Buttons
- **Primary:** Solid Deep Indigo with white text. No gradient. 
- **Secondary:** Transparent background with 1px Slate border. 
- **Ghost:** No border or background until hover.
- **Sizing:** Fixed heights of 40px (Medium) and 48px (Large) to align with the 8px grid.

### Input Fields
- **Style:** 1px border with a subtle background tint (#F1F5F9 / #1E293B). 
- **Focus:** Border color shifts to Deep Indigo with a 3px soft glow (20% opacity of primary color).
- **Labels:** Always positioned above the field in `label-md` weight.

### AI Insight Chips
- **Style:** Small, pill-shaped components with a 10% opacity background of the primary color and solid primary color text.
- **Usage:** Used for "ATS Match," "Strong Verb," or "Skills Detected" tags.

### Progress Gauges (Resume Score)
- **Style:** Thick 8px stroke circular or linear bars.
- **Colors:** Dynamic color shifts from Rose (0-40) to Amber (41-70) to Emerald (71-100).

### Cards
- **Structure:** 1px border, 16px padding, 16px border-radius. 
- **Interactive Cards:** Subtle background shift on hover (+5% lightness in dark mode, -2% in light mode).

### Lists
- **Style:** Clean dividers (1px) with 16px vertical padding. Iconography used on the left to denote content type (Education, Experience, etc.).