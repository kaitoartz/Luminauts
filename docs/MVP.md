# LumiNauts: Documento de Producto Mínimo Viable (MVP)

## 1. MVP (Propuesta de Valor)

Plataformas actuales aburren y pesan. **LumiNauts** soluciona esto con "Estación Espacial" de juegos. Fusiona universo y pedagogía. 60fps fluidos en navegadores básicos. Aprendizaje = aventura espacial voluntaria.

## 2. Personas (User Personas)

### Perfil 1: El Comandante (Profesor/Apoderado)

- **Perfil:** Educador o padre.
- **Objetivos:** Validar tiempo con métricas en entorno seguro.
- **Patrones:** Prefiere paneles limpios, resúmenes rápidos de progreso de cadetes.

### Perfil 2: El Luminauta (Ludonáutico / Estudiante)

- **Perfil:** Explorador (6-14 años).
- **Objetivos:** Divertirse, explorar planetas, ganar estrellas y rangos espaciales.
- **Patrones:** Busca naves, estética suave, controles fáciles. Sin esperas.

## 3. Benchmark

- **EdTech Tradicional:** Archivos aburridos, UI rígida, carga lenta.
- **Ventaja LumiNauts:** Carga rápida en PC modesto. Visuales gaming, tema espacio suave, alta retención.

## 4. Arquitectura de la Información (Sitemap)

1. **Puerto Espacial (Landing):** Introducción LumiNauts.
2. **Abordaje (Auth):** Acceso cadetes o invitados.
3. **Bitácora (Dashboard):** Métricas, constelaciones, estrellas.
4. **Mapa Estelar (Lobby):** Planetas (juegos) filtrables.
5. **Simulador (Game View):** Contenedor WebGL con controles de nave.

## 5. Userflow (Luminauta)

1. **Ingreso:** Elige traje espacial.
2. **Navegación:** Explora Mapa Estelar.
3. **Selección:** Elige planeta (ej: "Kepler-Mat").
4. **Misión:** Juega módulo.
5. **Finalización:** Sincroniza datos con Control de Misión.
6. **Recompensa:** Vuelve a Bitácora, ve estrellas.

## 6. Guión (Elevator Pitch)

"LumiNauts hace del aula academia espacial. Mapa estelar fluido en PC escolar. Cada minuto jugado = salto hiperespacial en aprendizaje. Motivación optimizada. Aprender fascina igual que descubrir planetas."

## 7. Kit UI (Propuesta Visual)

- **Paleta de Colores (Lumina Space - Suave):**
  - **Primario (Azul Polvo Espacial):** `#6B8BB4` - Calma, vastedad.
  - **Secundario (Crema Lunar):** `#FDF9E2` - Contraste suave.
  - **Fondo (Cielo Nocturno Suave):** `#1A202C` a `#2D3748` - Profundidad amigable.
  - **Acentos:** `#8DA9C4` (Celeste) y `#E0B0FF` (Lavanda). Cero neón.
- **Tipografía:**
  - **Principal:** _Quicksand_ o _Nunito_. Redondeada, suave, legible.
- **Iconografía & Formas:**
  - **Estilo:** "Soft Space". Naves curvas, planetas sin bordes duros.
  - **Componentes:** Cards `border-radius: 24px`. Sombras `soft ambient` tipo nebulosa.
