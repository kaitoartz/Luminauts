# System Architecture & Design Patterns

## Backgrounds and Layering
- **Waitlist Landing Background Layering**:
  - The landing page uses a global `fixed inset-0` background layer containing the WebGL-based `<Grainient />` component and the GSAP-driven `<StarsBg />` on top of it.
  - Stacking order (z-index): `Grainient` (lowest z-index inside fixed container) -> `StarsBg` -> Page content.
  - Viewport-linked backgrounds should have transparent parent sections (`bg-transparent`) so they can show through the content flow seamlessly.

## Performance Optimization
- **WebGL Uniform Animation**:
  - To achieve maximum performance during scroll-linked shader animations, updates to `uCenterOffset` (the vertical/horizontal offset in `<Grainient />`) are bound to native window scroll listeners and written directly to the program uniforms via refs.
  - This design pattern completely avoids React re-render cycles during user scroll, maintaining a smooth 60fps frame rate.
