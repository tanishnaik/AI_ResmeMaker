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
  tertiary: '#414546'
  on-tertiary: '#ffffff'
  tertiary-container: '#595c5e'
  on-tertiary-container: '#d2d4d6'
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
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  unit-base: 8px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system focuses on "Cognitive Clarity"—a philosophy that prioritizes the reduction of decision fatigue for job seekers. The brand personality is professional, authoritative, and technologically advanced, yet deeply supportive. 

The aesthetic leverages a **Modern Corporate** style with hints of **Glassmorphism** to signify "Intelligence." It uses high-quality whitespace to create a calm environment for data entry. By combining precise technical layouts with soft, organic shapes, the UI evokes a sense of "Human-Centric AI"—sophisticated technology that feels approachable and high-trust.

## Colors

This design system utilizes a high-contrast, high-trust palette:

- **Primary (Electric Indigo):** Used for the "AI" moments—actions like 'Generate with AI', progress indicators, and active states. It represents the spark of intelligence.
- **Secondary (Deep Slate):** Applied to primary text and navigation elements to provide a grounded, professional foundation.
- **Surface (Crisp White / Slate 50):** The primary canvas. Using subtle off-white backgrounds for the "editor" area helps distinguish the document from the UI.
- **Semantic Colors:** Success (Emerald), Error (Rose), and Warning (Amber) are used sparingly with low saturation to maintain the sophisticated atmosphere.

## Typography

Typography is the core of a resume builder. This system pairs **Geist** for structural elements and headings with **Inter** for long-form body text. 

**Geist** provides a technical, precise feel for the "Builder" interface, while **Inter** ensures maximum legibility for the actual resume content. All headings use tighter letter-spacing to appear more modern. For labels and metadata, we use Geist Medium with a slight tracking increase to ensure clarity at small sizes.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the central workspace to mimic the constraints of a physical document, while the surrounding tools utilize a fluid, responsive container.

- **The Document Stage:** A centered 800px column for the resume itself.
- **The Intelligence Sidebar:** A 320px contextual panel that appears when AI features are triggered.
- **Spacing Rhythm:** Based on an 8px linear scale. We use "Generous Padding" (24px+) within cards to prevent the UI from feeling cluttered during the intensive data-entry phase.

## Elevation & Depth

To convey a sense of "intelligence" and "layers of thought," the design system employs **Ambient Shadows** and **Tonal Layers**.

- **Z-Index 0 (Background):** Surface-tier colors (Slate 50) to distinguish the app background from the document.
- **Z-Index 1 (The Document):** A crisp white surface with a very soft, diffused shadow (`0 4px 24px rgba(15, 23, 42, 0.04)`).
- **Z-Index 2 (Modals & AI Floating Panels):** These use a backdrop blur (12px) and a slightly more pronounced shadow to appear as if they are floating "above" the logic of the page.
- **Interactive Elements:** Buttons use a subtle "lift" on hover, increasing shadow depth rather than changing color significantly.

## Shapes

The shape language is "Rounded" to soften the professional tone and make the platform feel helpful. 

- **Primary Containers:** 0.5rem (8px) for standard inputs and small cards.
- **The Document:** 0.25rem (4px) to maintain a realistic "paper" feel while staying modern.
- **AI Action Components:** These use "rounded-xl" (1.5rem) to differentiate them from standard CRUD operations, signaling a more "magical" or automated experience.

## Components

### Buttons
- **Primary:** Deep Indigo background with white text. High-radius corners.
- **AI-Secondary:** Ghost style with an Indigo border and a subtle background blur.
- **Tertiary:** Slate text, no background, used for low-priority actions like "Cancel."

### Input Fields
- Floating labels with Geist 12px for the active state. 
- Border-bottom only or very light slate outlines to keep the form-heavy interface looking clean. 
- Focus state uses a 2px Indigo glow.

### Cards (The "Experience" Block)
- Used for individual resume sections. 
- Features a "drag handle" icon on the left to indicate re-orderability.
- Hover state triggers a subtle background color shift to Slate 50.

### AI Suggestions (The "Spark" Chip)
- Small, pill-shaped chips used to suggest skills or keywords.
- Background: Very faint Indigo (5% opacity).
- Border: Indigo (20% opacity).
- Icon: A small sparkle (Geist Mono character or SVG).

### Progress Indicators
- Thin, 4px linear bars at the top of the viewport. Indigo for "AI Analysis" progress and Slate for "Resume Completion" progress.