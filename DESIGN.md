---
name: Luminauts
description: Plataforma educativa espacial gamificada para enseñar matemáticas y ciencias.
colors:
  primary: "#3b6290"
  secondary: "#51759c"
  tertiary: "#9059c8"
  accent: "#d48d08"
  neutral-bg: "#141923"
  purple-magic: "#e0b0ff"
  blue-[#6B8BB4]: "#6b8bb4"
  blue-[#8DA9C4]: "#8da9c4"
typography:
  display:
    fontFamily: "Quicksand, system-ui, sans-serif"
  body:
    fontFamily: "Nunito, system-ui, sans-serif"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
---

# Design System: Luminauts

## 1. Overview

**Creative North Star: "El Espacio Educativo Suave"**

Luminauts es una plataforma inmersiva que balancea la estética gamificada y espacial con la claridad educativa. Su diseño se aleja de los neones estridentes o de los "grises SaaS" aburridos para adoptar curvas orgánicas, sombras de tipo nebulosa, y una sensación de gravedad cero. Es un espacio amigable tanto para niños (Ludonáuticos) como para educadores (Comandantes).

**Key Characteristics:**
- Gravedad cero y bordes redondeados (`rounded-[2rem]`).
- Paleta cósmica suave.
- Interfaces fluidas sin líneas duras o bordes de 1px con sombras pesadas.

---

## 2. Color Tokens & Palette

La paleta es espacial y profunda, intencionalmente suave y amigable.

### Primary & Core
- **Cosmic Blue** (`#3B6290`): Elementos interactivos principales y CTA.
- **Nebula Blue** (`#51759C`): Acentos secundarios y elementos estructurales.
- **Stellar Purple** (`#9059C8`): Componentes mágicos o gamificados.
- **Solar Gold** (`#D48D08`): Recompensas, estrellas o alertas de progreso.
- **Cosmic Lavender** (`#E0B0FF`): Highlights y acentos estelares premium.
- **Interactive Blue** (`#8DA9C4` / `#6B8BB4`): Interacciones, estados hover y badges.

### Neutrals
- **Void Space** (`#141923` / `bg-zinc-950`): Fondo espacial profundo. Evitar negro puro.
- **Glass Panel Surface** (`bg-zinc-900/35` a `bg-zinc-900/60`): Paneles translúcidos.

### Named Rules
**The Soft Contrast Rule:** Nunca usar negro puro (`#000000`) o blanco puro continuo (`#ffffff`) para fondos. Usar tintes cósmicos y texto `zinc-300`/`zinc-400` para cuerpo.

---

## 3. Typography & Hierarchy

- **Display Font:** Quicksand (with system-ui)
- **Body Font:** Nunito (with system-ui)

### Text Scales & Hierarchy
- **Display / Hero Headings:** `text-4xl` a `text-5xl`, `font-black`, `tracking-tight`.
- **Section Titles:** `text-3xl` a `text-4xl`, `font-black`.
- **Subtitles & Descriptions:** `text-sm` a `text-base`, `font-medium`, `text-zinc-400`.
- **Badges & Labels:** `text-[10px]` a `text-xs`, `font-bold` / `font-black`, `uppercase`, `tracking-wider`.

---

## 4. Elevation, Shadows, Glows & Blurs

### Shadows & Elevation
- **Nebula Ambient:** `0 10px 45px rgba(0, 0, 0, 0.35)` para elevación de tarjetas.
- **The Zero-Gravity Rule:** Las tarjetas deben sentirse flotantes. Sombras amplias y difusas, nunca duras.

### Glows & Performance Standard
- **Glow con Radial Gradient:** Usar `background: radial-gradient(circle at center, rgba(X,X,X,0.15) 0%, transparent 70%)`.
- **REGLA CRÍTICA DE RENDIMIENTO:** PROHIBIDO usar `filter: blur(45px)` u otros filtros CSS blur pesados en glows dinámicos. Causa jank masivo en GPU.

### Blurs & Glassmorphism
- **Paneles Estáticos:** Permitido `backdrop-blur-lg` / `backdrop-blur-md` en modales o tarjetas estáticas.
- **Paneles Animados / Hover:** PROHIBIDO usar `backdrop-blur` en overlays animados o en hover sobre elementos 3D. Usar fondos translúcidos sólidos (ej: `bg-zinc-950/80`).

---

## 5. Rendering & Hardware Acceleration

- **Capas 3D / Hover Tilt:** Todo componente con transformaciones 3D (`rotateX`, `rotateY`, `scale`) DEBE incluir `will-change: transform` o la clase `transform-gpu` para forzar composición en GPU.
- **Entradas en Scroll:** `ScrollReveal` no debe animar `filter: blur(...)`. Limitar animaciones a `opacity` y `transform`.
- **Imágenes:** Todo `<img>` debe incluir `loading="lazy"`, `decoding="async"`, y dimensiones reservadas (`width`/`height` o `aspect-ratio`) para prevenir Cumulative Layout Shift (CLS).

---

## 6. Components & Structural Debugging

### Cards
- **Forma:** `rounded-[2rem]`, `border border-zinc-800/40`.
- **Efectos:** Hover 3D tilt tracking con foco radial (`mix-blend-mode: screen`).

### Buttons
- **Forma:** `rounded-xl` o `rounded-2xl`.
- **Feedback:** `active:scale-[0.97]`.

### Identification & Debugging Standard
- Toda sección principal DEBE tener `id="section-waitlist-[nombre]"` y clase descriptiva `waitlist-section-[nombre]` para fácil depuración e inspección visual.

---

## 7. Design Critique Framework (/design-critique)

Toda revisión visual del proyecto debe seguir la metodología **Observación → Impacto → Sugerencia**:

1. **I Like...**: Resaltar qué funciona (ej. "Me gusta la fluidez del contador dinámico").
2. **I Wish...**: Identificar problemas accionables (ej. "El contraste en el botón secundario es de 2.5:1, violando WCAG AA").
3. **What If...**: Proponer optimizaciones técnicas o visuales (ej. "Reemplazar el backdrop-blur por un fondo plano mantendrá los 60fps").

### Criterios de Evaluación
- **Actionable > Preferential:** Todo feedback debe sustentarse en rendimiento, accesibilidad o jerarquía visual.
- **Performance Budget:** Máximo 2ms por frame de animación visual. Sin repintados de layout causados por blurs CSS.

---

## 8. Do's and Don'ts

### Do:
- Usar bordes altamente redondeados (`rounded-[2rem]`) y sombras de nebulosa.
- Aplicar `will-change: transform` en elementos interactivos 3D.
- Mantener la jerarquía con tipografías redondeadas (Quicksand / Nunito).

### Don't:
- No usar diseño SaaS monocromático con grises aburridos.
- No mezclar bordes de 1px con sombras duras de 20px (ghost-card defect).
- No aplicar `filter: blur()` o `backdrop-blur` en animaciones dinámicas o transiciones de scroll.
