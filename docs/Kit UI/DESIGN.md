---
name: EduPlay Lumina
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#0051d5'
  on-primary: '#ffffff'
  primary-container: '#316bf3'
  on-primary-container: '#fefcff'
  inverse-primary: '#b4c5ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#6b38d4'
  on-tertiary: '#ffffff'
  tertiary-container: '#8455ef'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
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
    lineHeight: '1.6'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1200px
---

## Brand & Style
The brand personality is energetic, encouraging, and highly accessible. It is designed to bridge the gap between high-fidelity educational gaming and functional academic tracking. The target audience includes primary-level students who crave immediate visual feedback and rewards, as well as educators who require a clean, distraction-free environment for data review.

The design system adopts a **Modern Corporate** style infused with **Playful Tactility**. It utilizes generous white space and a "soft-UI" approach to ensure the interface feels safe and inviting. By combining high-legibility geometric sans-serif typefaces with friendly, oversized interactive elements, the system maintains a professional standard while remaining deeply engaging for younger users.

## Colors
The palette is anchored by **Vivid Blue (#2563EB)** to represent the technological and reliable core of the platform. **Electric Cyan (#06B6D4)** provides a vibrant secondary tone for utility actions, while **Vivid Violet (#8B5CF6)** is reserved for high-impact game-related triggers and achievement highlights.

- **Primary:** Navigation, branding, and active states.
- **Secondary:** Supporting interactive elements and UI controls.
- **Tertiary:** "Play" buttons and celebratory achievement triggers.
- **Background:** A clean, airy foundation (#F8FAFC used for surface-tint and accents) with soft off-white surfaces to reduce eye strain.
- **Accounts:** Use `star-yellow` specifically for the gamified "Star Counter" and `success-green` for progress completion feedback.

## Typography
The system uses **Plus Jakarta Sans** for headlines to provide a friendly, geometric character that appeals to children. **Inter** is used for body text and labels to ensure maximum legibility for instructors and parents when viewing data-heavy dashboards.

Typography should follow a clear hierarchy. Large headlines are used for game titles and high-level sections, while labels and body text are used for instructional content and progress metrics. On mobile devices, headline sizes are scaled down slightly to maintain context without overwhelming the viewport.

## Layout & Spacing
The system utilizes a **12-column fluid grid** for desktop environments and a **4-column grid** for mobile. A consistent 8px base unit (linear scale) governs all padding and margins to create a predictable visual rhythm.

- **Student Dashboard:** Features a responsive grid of "Game Cards." On mobile, these stack in a single column; on tablet, two columns; and on desktop, they scale from 3 to 4 columns.
- **Game View:** Centered layout with a maximum width container to prevent visual distortion. The "Back to Lobby" button is always pinned to the top left or bottom center for easy thumb-reach on mobile.
- **Gutters:** A generous 24px gutter ensures that interactive elements have enough physical separation to prevent accidental taps.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Ambient Shadows**. The design avoids harsh blacks in shadows, opting instead for low-opacity tints of the primary blue or neutral slate grays to keep the interface feeling "light."

- **Level 0 (Surface):** Background color (#F8FAFC).
- **Level 1 (Cards/Inputs):** White surface (#FFFFFF) with a 2px soft blur shadow (offset 0, 4px).
- **Level 2 (Hover/Active):** Slightly higher elevation with a 12px blur shadow to indicate interactivity.
- **Level 3 (Modals/Overlays):** 24px blur with a 10% opacity primary color tint to draw focus away from the background.

## Shapes
The shape language is defined by **rounded containers** (16px / 1rem). This high degree of roundedness removes "visual threat" and makes the platform feel like a safe, playful environment.

- **Primary Containers/Cards:** 16px corner radius.
- **Buttons & Input Fields:** 12px corner radius for a slightly more structured look within cards.
- **Interactive Tags/Chips:** Full pill-shape (100px) for star counters and status indicators.

## Components
### Game Cards
Cards feature a large thumbnail image (16:9 ratio) at the top, followed by a title in `headline-md` and a "Play" button in `tertiary_color_hex`. The bottom of the card includes a small star-icon indicator showing the user's personal high score.

### Star Counter
A floating or header-pinned component. It uses a pill-shaped background (`surface-white`), a `star-yellow` SVG icon, and bold `label-lg` typography for the count. It should animate (scale up/down) when a new star is earned.

### Buttons
- **Primary:** `primary_color_hex` (#2563EB) background with white text. Used for main navigation and branding.
- **Call-to-Action (Play):** `tertiary_color_hex` (#8B5CF6) with white text. These should be larger than standard buttons to draw focus.
- **Secondary:** `secondary_color_hex` (#06B6D4) for utility actions like "View Progress" or settings.

### Input Fields
Clean white backgrounds with a subtle neutral border. On focus, the border transitions to `primary_color_hex` with a soft glow effect.

### Skeleton Loaders
Used during Unity WebGL initialization. Skeletons should mimic the 16px roundedness of the game cards and headers to maintain structural integrity during loading.