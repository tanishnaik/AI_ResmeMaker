---
name: Cognitive Clarity 2.0
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cac3d8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#948ea1'
  outline-variant: '#494455'
  surface-tint: '#cdbdff'
  primary: '#cdbdff'
  on-primary: '#370096'
  primary-container: '#7c4dff'
  on-primary-container: '#fcf6ff'
  inverse-primary: '#6833ea'
  secondary: '#bdf4ff'
  on-secondary: '#00363d'
  secondary-container: '#00e3fd'
  on-secondary-container: '#00616d'
  tertiary: '#ffb688'
  on-tertiary: '#512400'
  tertiary-container: '#b55800'
  on-tertiary-container: '#fff7f4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e8deff'
  primary-fixed-dim: '#cdbdff'
  on-primary-fixed: '#20005f'
  on-primary-fixed-variant: '#4f00d0'
  secondary-fixed: '#9cf0ff'
  secondary-fixed-dim: '#00daf3'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004f58'
  tertiary-fixed: '#ffdbc7'
  tertiary-fixed-dim: '#ffb688'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#733600'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-code:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system is engineered for high-performance cognitive environments, specifically optimized for OLED displays. The brand personality is technical, precise, and hyper-focused, catering to developers, researchers, and power users who operate in low-light conditions. 

The style leans into **Minimalism** with a touch of **Glassmorphism** for depth. By utilizing true black as the foundational canvas, the system eliminates light bleed and maximizes the inherent contrast ratios of OLED panels. The emotional response is one of absolute control and visual calm, reducing eye strain while highlighting critical data through vibrant, high-energy accents.

## Colors
The palette is centered on a "Pure Dark" philosophy. The primary background uses true black (#000000) to ensure pixels are completely powered off on OLED screens.

- **Primary Indigo (#7C4DFF):** Used exclusively for primary actions, active states, and critical paths. It provides a sharp, vibrant contrast against the black void.
- **Secondary Cyan (#00E5FF):** Reserved for data visualization, progress indicators, and secondary highlights.
- **Surface Tiers:** Containers utilize deep greys (#121212 and #1E1E1E) to create a clear visual hierarchy above the true black background without introducing significant glow.
- **Text:** High-purity white (#FFFFFF) for headlines, with reduced-opacity greys for secondary information to manage visual weight.

## Typography
The design system utilizes **Geist** across all levels to leverage its technical, developer-centric aesthetic and exceptional legibility at small sizes. 

- **Headlines:** Use Bold weights with tight letter spacing for a compact, authoritative look.
- **Body:** Standard weights are used for maximum readability. Line heights are generous to ensure text doesn't feel cramped against the high-contrast background.
- **Data/Labels:** Use the "label-caps" style for metadata and section headers to provide structural clarity without overwhelming the content.
- **Contrast:** Always ensure body text maintains at least a 7:1 contrast ratio against surface colors.

## Layout & Spacing
The layout follows a strict **8px grid system** (Round Eight) to ensure mathematical alignment and visual logic. 

- **Grid:** A 12-column fluid grid is used for desktop, collapsing to 4 columns for mobile. 
- **Consistency:** All margins, paddings, and component heights must be multiples of 8px.
- **Negative Space:** On OLED screens, "empty" black space is a functional element that reduces visual noise. Use the `xl` spacing tier to separate major content groups.
- **Reflow:** On mobile, horizontal margins shrink to 16px to maximize the narrow viewport while maintaining a clear safety gutter.

## Elevation & Depth
In an OLED-first system, traditional soft shadows are often lost or create muddy transitions. Instead, this design system uses **Tonal Layering** and **Low-Contrast Outlines**.

- **Level 0 (Background):** True Black (#000000).
- **Level 1 (Card/Surface):** Dark Grey (#121212) with a subtle 1px border (#2A2A2A) to define the edge.
- **Level 2 (Popovers/Modals):** Lighter Grey (#1E1E1E) with a faint Indigo tint in the border to indicate focus.
- **Glow:** For primary elements like active buttons or status pips, a very subtle outer glow using the primary Indigo color (15% opacity, 12px blur) is permitted to simulate a "neon" indicator that feels native to the dark environment.

## Shapes
The shape language is defined by the **Round Eight** principle, utilizing an 8px (0.5rem) base radius to mirror the spacing logic.

- **Standard Elements:** Buttons, input fields, and small cards use the base 8px radius.
- **Large Containers:** Section containers and large cards use `rounded-lg` (16px) to create a softer, more sophisticated framing.
- **Interactive States:** Avoid changing border-radius on hover; instead, use stroke weight or color transitions to indicate interactivity.

## Components
- **Buttons:** Primary buttons are solid Indigo (#7C4DFF) with white text. Secondary buttons use a ghost style (1px border) to minimize light output.
- **Inputs:** Fields are true black backgrounds with a #2A2A2A border. On focus, the border transitions to Indigo and the stroke width increases to 2px.
- **Chips:** Small, pill-shaped indicators for tags. Use deep indigo backgrounds with 30% opacity and bright indigo text for a "lit" effect.
- **Lists:** Items are separated by subtle 1px lines (#1A1A1A) rather than full-width cards to maintain a lean, data-dense vertical flow.
- **Cards:** No heavy shadows. Use a subtle inner-glow or top-border highlight in Indigo to signify high-priority cards.
- **Checkboxes/Radios:** Use Indigo for the checked state. When unchecked, they should be a simple #333333 outline to remain unobtrusive.