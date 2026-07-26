---
target: src/pages/WaitlistLanding.jsx
total_score: 36
p0_count: 0
p1_count: 0
timestamp: 2026-07-26T20-12-25Z
slug: src-pages-waitlistlanding-jsx
---
# Critique: src/pages/WaitlistLanding.jsx

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Excelente feedback del contador de suscriptores y toasts de actividad. |
| 2 | Match System / Real World | 4 | La metáfora espacial pedagógica es muy inmersiva. |
| 3 | User Control and Freedom | 4 | Permite navegar libremente, salir del demo modal y volver de las páginas legales. |
| 4 | Consistency and Standards | 4 | Consistente con el sistema de diseño de Luminauts de "Espacio Suave". |
| 5 | Error Prevention | 3 | La entrada de email no valida dominios mal escritos antes de enviar. |
| 6 | Recognition Rather Than Recall | 4 | Menú y botones principales claros sin sobrecarga de memoria de trabajo. |
| 7 | Flexibility and Efficiency | 3 | Faltan atajos de teclado o aceleradores para la exploración rápida de secciones. |
| 8 | Aesthetic and Minimalist Design | 4 | Layout balanceado. El fondo y las transiciones de órbita son estéticos. |
| 9 | Error Recovery | 3 | Mensajes de error simples, podrían sugerir reintentos específicos en problemas de red. |
| 10 | Help and Documentation | 3 | Modal de contacto integrado pero sin centro de ayuda o FAQ estructurado para educadores. |
| **Total** | | **36/40** | **Excelente (Minor polish only)** |

## Anti-Patterns Verdict

**LLM assessment**: La interfaz está muy bien optimizada y no muestra los típicos clichés de diseño generado por IA (como kicker eyebrows en cada sección o glassmorphism decorativo excesivo). La asimetría de dos columnas en el hero en PC le otorga una personalidad premium alineada con la marca.

**Deterministic scan**: El scanner determinista de impeccable reportó **0 hallazgos**, validando la ausencia de antipatrones estructurales o de estilo en el archivo de la landing.

## Overall Impression
Un flujo de waitlist extremadamente interactivo y pulido. El modelo 3D de la Tierra y la integración de GSAP hacen que el scroll se sientan como un viaje espacial. La única oportunidad de mejora radica en robustecer las validaciones del formulario y pulir pequeñas transiciones.

## What's Working
- **Transición de Órbita 3D**: La sincronización paso a paso de la rotación de la Tierra con el Scroll de GSAP.
- **Layout de Dos Columnas**: La asimetría en PC que deja espacio para la interacción del modelo 3D y el contenido textual sin saturar el espacio de lectura.

## Priority Issues

### [P2] Validación Proactiva de Email
- **Why it matters**: Permite que correos con dominios erróneos pasen el formulario sin alertar al usuario antes de enviar, causando pérdida de leads.
- **Fix**: Añadir validación sintáctica de dominios comunes (ej: gamil.com en vez de gmail.com) antes del envío.
- **Suggested command**: `$impeccable harden`

### [P2] Aceleradores de Navegación
- **Why it matters**: Usuarios avanzados o con lectores de pantalla que navegan mediante teclado tienen que scrollear todo el timeline de GSAP secuencialmente.
- **Fix**: Soporte para atajos de teclado básicos de panel a panel (ej. flecha abajo / flecha arriba) en el Hero.
- **Suggested command**: `$impeccable adapt`

### [P3] FAQ para Educadores (Comandantes)
- **Why it matters**: Los educadores/profesores pueden tener dudas pedagógicas específicas que no se resuelven en la landing general.
- **Fix**: Añadir una pequeña sección o acordeón de FAQ al final de la landing.
- **Suggested command**: `$impeccable onboard`

## Persona Red Flags

**Jordan (First-Timer)**: El formulario de registro solicita correo de "papá, mamá o profesor". Jordan se registrará sin problemas, pero el demo modal podría requerir explicaciones pedagógicas de 1 frase para no intimidarle con mecánicas de juego espaciales.

**Riley (Stress Tester)**: Si Riley intenta mandar caracteres especiales o correos extremadamente largos, el input del formulario se expande de manera extraña.
