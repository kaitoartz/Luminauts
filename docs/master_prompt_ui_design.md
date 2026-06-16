# Master Prompt: UI/UX & Frontend Redesign (Eduplay)

## Contexto y Rol

Actúa como un Ingeniero de Diseño UI/UX de clase mundial y un experto Frontend, con un enfoque y estilo similares a los de Emil Kowalski. Tu objetivo es llevar la interfaz de usuario de este proyecto al siguiente nivel, creando experiencias fluidas, deleitables ("delightful") y visualmente extraordinarias.

## 1. Fase de Investigación (Análisis del Sistema)

**OBLIGATORIO antes de escribir código:**
Debes revisar y analizar detenidamente los documentos en la carpeta `docs/` para entender de qué va el proyecto y cuáles son los componentes del sistema de diseño actual.

- Lee `docs/DESIGN.md`, `docs/brand-spec.md` y cualquier archivo relevante.
- Explora el contenido del directorio `docs/Kit UI/` para conocer los estilos, colores, tipografías y el kit de componentes base.

## 2. Herramientas, MCP y Skills a tu disposición

Se te requiere hacer uso activo de las siguientes integraciones que ya tienes disponibles:

- **MCP Servers:** Utiliza `21st-dev/magic` (para buscar e insertar componentes modernos/delightful) y `codepen` (para probar o buscar snippets interactivos).
- **Skills de Agente:**
  - `impeccable`: Usa esta skill para diseñar, pulir, iterar y optimizar drásticamente la jerarquía visual, las animaciones, las tipografías y las interacciones (micro-interacciones, motion, layout).
  - `emil-design-eng`: Para implementar interacciones de alta gama, fluidas y con un enfoque muy refinado en la física de las animaciones.
  - `taste` (si está disponible): Para asegurar una estética moderna, limpia y "premium".

## 3. Fuentes de Inspiración

Por favor, visita o toma como referencia mental los siguientes sitios web para alinear el estilo de las interacciones y el "feel" general:

- [Motion Sites](https://motionsites.ai/) - (Especialmente para efectos GSAP, animaciones de scroll y micro-interacciones avanzadas).
- [Flutter Tilt Demo](https://amoshuke.github.io/flutter_tilt_book/en/v4/docs/examples/demo/) - (Para los efectos de hover interactivos y físicas de inclinación en tarjetas).

## 4. Requerimientos Funcionales y de Diseño a Implementar

### A. Catálogo de Juegos y Tarjetas (Cards)

- **Efecto Hover Mask con el Mouse:** Implementa una máscara que siga el cursor sobre las tarjetas del catálogo.
- **Fondo Galáctico/Estrellado:** Al hacer hover, la máscara debe revelar un fondo animado del espacio (como una galaxia o espacio estrellado) en el interior de la tarjeta, logrando un efecto muy profundo y envolvente, además de un sutil efecto "tilt" 3D.

### B. Hero Section

- **GSAP Scroll Animation:** El hero section debe contar con animaciones basadas en el scroll impresionantes y fluidas.
- **Revelación de Contenido Dinámica:** Al hacer scroll down, diferentes `divs` deben ir revelando su contenido en sincronía.
- **Aparición de Imágenes:** Las imágenes deben aparecer desde los bordes de la pantalla hacia el centro conforme el usuario scrollea.
  - _Nota sobre imágenes:_ Si necesitas imágenes para esto, puedes usar herramientas generativas como _nano banana_, invocar otras librerías/skills para generarlas, o bien indicarme claramente los requerimientos (dimensiones, temáticas) para que yo las proporcione.

### C. Otras Pantallas, Botones y Componentes

- **Componentes Mejorados:** Mejora botones, sliders de contenido y transiciones entre pantallas.
- **Micro-interacciones:** Agrega interactividad a los botones (por ejemplo, efectos magnéticos o de expansión de color al hover).
- **Sliders Geniales:** Reemplaza los sliders o carruseles convencionales por algo más inmersivo (con arrastre fluido, efecto parallax, etc.).

## 5. Plan de Ejecución Sugerido

1. **Analiza** el sistema en `docs/`.
2. **Propón un plan de implementación** (usa el modelo de Planning Mode de tu sistema si es necesario), detallando las tecnologías a usar (GSAP, Framer Motion, CSS moderno).
3. Busca inspiración e importa componentes con el MCP de `21st magic` si es adecuado.
4. Desarrolla y refactoriza la estructura actual del Hero y el Catálogo para integrar los efectos solicitados.
5. Utiliza las skills `emil-design-eng` e `impeccable` para repasar y perfeccionar el pulido visual antes de finalizar.
