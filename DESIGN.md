---
name: Luminauts
description: Plataforma educativa espacial gamificada para enseñar matemáticas.
colors:
  primary: "#3b6290"
  secondary: "#51759c"
  tertiary: "#9059c8"
  accent: "#d48d08"
  neutral-bg: "#f4f7fb"
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
- Gravedad cero y bordes redondeados.
- Paleta cósmica suave.
- Interfaces fluidas sin líneas duras o bordes de 1px con sombras pesadas.

## 2. Colors

La paleta es espacial y profunda, pero intencionalmente suave y amigable.

### Primary
- **Cosmic Blue** (#3B6290): Para los elementos interactivos principales y CTA. Se adapta en modo oscuro.

### Secondary
- **Nebula Blue** (#51759C): Para acentos secundarios y elementos estructurales.

### Tertiary
- **Stellar Purple** (#9059C8): Para componentes mágicos o gamificados.

### Accent
- **Solar Gold** (#D48D08): Para recompensas, estrellas o alertas de progreso.

### Neutral
- **Soft Cosmos** (#F4F7FB): Fondo de la plataforma, emulando la luz tenue estelar.

### Named Rules
**The Soft Contrast Rule.** Nunca uses negro puro o blanco puro a menos que sea sobre un fondo contrastante. Los fondos deben tener tintes cósmicos.

## 3. Typography

**Display Font:** Quicksand (with system-ui)
**Body Font:** Nunito (with system-ui)

**Character:** Amigable, redondeada y altamente legible, diseñada para parecer un cuaderno de bitácora espacial.

### Hierarchy
- **Display**: Para títulos de misiones y pantallas de onboarding.
- **Body**: Para explicaciones y reportes a los comandantes.

## 4. Elevation

El sistema utiliza sombras tipo "nebulosa" profundas, evitando bordes duros de 1px combinados con sombras pequeñas.

### Shadow Vocabulary
- **Nebula Ambient** (`0 4px 30px rgba(0, 0, 0, 0.05)`): Usado en paneles de "glass-panel".

### Named Rules
**The Zero-Gravity Rule.** Las tarjetas deben sentirse flotantes. Sombras amplias y difusas, nunca duras.

## 5. Components

### Buttons
- **Shape:** Altamente redondeados.
- **Primary:** Cosmic Blue, texto blanco.
- **Hover / Focus:** Crecen sutilmente, con brillo o efectos de luz estelar (e.g., `ep-shine-btn`).

### Cards / Containers
- **Corner Style:** Curvas suaves.
- **Background:** Material tipo Glassmorphism con un filtro de desenfoque.
- **Shadow Strategy:** Nebula Ambient.

## 6. Do's and Don'ts

Basado en las directrices de `PRODUCT.md` y la identidad del producto.

### Do:
- **Do** usar bordes altamente redondeados y sombras de nebulosa.
- **Do** integrar micro-interacciones espaciales y brillos mágicos en las recompensas.

### Don't:
- **Don't** usar diseño SaaS monocromático con grises aburridos.
- **Don't** crear interfaces infantiles ruidosas de colores primarios muy saturados de baja calidad.
- **Don't** diseñar layouts rígidos con esquinas puntiagudas.
- **Don't** mezclar bordes de 1px con sombras duras de 20px (ghost-card codex defect).
