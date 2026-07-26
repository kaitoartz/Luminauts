# Luminauts Design System

Esta especificación documenta el sistema de diseño central de la estación educativa de **Luminauts** (Estilo "Espacio Educativo Suave").

## Tokens de Diseño (CSS Variables)

Definidos en [tokens.css](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/Luminauts/src/styles/tokens.css):

### Colores Cósmicos (Cosmic Palette)
* **Fondo Cósmico Oscuro (`--color-cosmic-bg`)**: `#0B0F17` (Fondo espacial primario).
* **Azul Estelar (`--color-stellar-blue`)**: `#6B8BB4` (Color de botones principales, acentos de marca y bordes suaves).
* **Azul Suave (`--color-muted-blue`)**: `#8DA9C4` (Textos secundarios destacados y sombras nebulosas).
* **Púrpura Luz de Estrella (`--color-starlight-purple`)**: `#E0B0FF` (Acentos mágicos y textos estelares).
* **Púrpura Cósmico (`--color-cosmic-purple`)**: `#9059C8` (Bordes de inputs activos y badges interactivos).
* **Oro Estelar (`--color-star-gold`)**: `#FFE885` (Estrellas coleccionables y destellos de celebración).

### Bordes Redondeados (Border Radiuses)
* **Tarjetas Estándar (`--radius-card`)**: `2rem` (Bordes suaves característicos de Luminauts).
* **Tarjetas Grandes/Hero (`--radius-card-large`)**: `2.5rem` (Usados en contenedores inmersivos).
* **Botones e Inputs (`--radius-button`, `--radius-input`)**: `1rem` (Bordes agradables al tacto en móvil y web).

### Sombras y Resplandores (Nebula Shadows)
* **Brillo Azul Nebulosa (`--shadow-nebula-blue`)**: `0 0 35px rgba(107, 139, 180, 0.15)`
* **Brillo Púrpura Estelar (`--shadow-starlight-purple`)**: `0 0 25px rgba(224, 176, 255, 0.15)`

### Curvas de Animación (Easing Curves)
* **Desaceleración Exponencial Decidida (`--ease-out-expo`)**: `cubic-bezier(0.16, 1, 0.3, 1)` (Perfecto para transiciones de estado, modals y toasts).
* **Suave Estándar (`--ease-out-quart`)**: `cubic-bezier(0.25, 1, 0.5, 1)`
