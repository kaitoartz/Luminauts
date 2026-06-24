# LumiNauts Redesign Backup

Este archivo contiene el código completo de los tres archivos modificados para el rediseño y rebranding de LumiNauts, en caso de problemas con conflictos de Git.

## 1. index.html (`c:\Users\Carlos.Ortiz\Documents\GitHub\EduPlay\index.html`)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LumiNauts - Exploración Educativa Estelar</title>

    <!-- Google Fonts: Nunito & Quicksand -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@500;700&display=swap"
      rel="stylesheet"
    />

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            fontFamily: {
              sans: ["Nunito", "system-ui", "sans-serif"],
              display: ["Quicksand", "system-ui", "sans-serif"],
            },
            animation: {
              appear: "appear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              "appear-zoom":
                "appear-zoom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              float: "float 6s ease-in-out infinite",
              "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              shimmer: "shimmer 1.5s infinite linear",
            },
            keyframes: {
              appear: {
                "0%": { opacity: "0", transform: "translateY(20px)" },
                "100%": { opacity: "1", transform: "translateY(0)" },
              },
              "appear-zoom": {
                "0%": { opacity: "0", transform: "scale(0.95)" },
                "100%": { opacity: "1", transform: "scale(1)" },
              },
              float: {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-20px)" },
              },
              shimmer: {
                "0%": { transform: "translateX(-100%)" },
                "100%": { transform: "translateX(100%)" },
              },
            },
          },
        },
      };
    </script>

    <!-- model-viewer for 3D GLTF/GLB models -->
    <script
      type="module"
      src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
    ></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## 2. Navbar.jsx (`c:\Users\Carlos.Ortiz\Documents\GitHub\EduPlay\src\components\Navbar.jsx`)

```javascript
import React, { useState, useEffect } from "react";
import { Rocket } from "lucide-react";
import PremiumThemeToggle from "./ui/PremiumThemeToggle";
import Button from "./ui/Button";

const Navbar = ({
  currentView,
  onNavigate,
  apiStatus,
  onOpenSettings,
  theme,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navs = [
    { id: "landing", label: "Bitácora" },
    { id: "catalog", label: "Mapa Estelar" },
    { id: "pricing", label: "Suscripción" },
    { id: "dashboard", label: "Misiones" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-500 rounded-full px-6 ${scrolled ? "bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 shadow-lg py-3" : "bg-transparent py-2"}`}
        >
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate("landing")}
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-[#6B8BB4] to-[#E0B0FF] rounded-[18px] flex items-center justify-center text-white shadow-lg shadow-indigo-500/10 group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <Rocket size={24} />
            </div>
            <span className="font-black text-2xl tracking-tight text-zinc-900 dark:text-white hidden sm:block">
              LumiNauts
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navs.map((nav) => (
              <button
                key={nav.id}
                onClick={() => onNavigate(nav.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${currentView === nav.id ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md" : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800"}`}
              >
                {nav.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Indicador de Conexión de API */}
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-zinc-550/50 dark:bg-zinc-900/50 hover:bg-zinc-100/80 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 transition-all text-xs font-bold shadow-sm"
              title="Configuración de API"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${apiStatus === "connected" ? "bg-green-500 animate-pulse" : apiStatus === "connecting" ? "bg-yellow-500 animate-pulse" : "bg-red-450"}`}
              />
              <span className="text-zinc-600 dark:text-zinc-300 hidden sm:inline">
                {apiStatus === "connected"
                  ? "API Conectada"
                  : apiStatus === "connecting"
                    ? "Conectando..."
                    : "API Desconectada"}
              </span>
            </button>

            {/* Premium Theme Toggle */}
            <PremiumThemeToggle
              isDark={theme === "dark"}
              onToggle={onToggleTheme}
            />

            <div className="hidden lg:flex items-center gap-2">
              <button
                className="text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/85 dark:hover:bg-zinc-800 transition-colors px-3 py-2 rounded-lg"
                onClick={() => onNavigate("parents")}
              >
                Padres
              </button>
              <button
                className="text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/85 dark:hover:bg-zinc-800 transition-colors px-3 py-2 rounded-lg"
                onClick={() => onNavigate("profile")}
              >
                Perfil
              </button>
            </div>
            <Button
              size="md"
              className="rounded-full shadow-lg shadow-blue-500/20 px-8"
              onClick={() => onNavigate("catalog")}
            >
              Jugar Ahora
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

## 3. Landing.jsx (`c:\Users\Carlos.Ortiz\Documents\GitHub\EduPlay\src\pages\Landing.jsx`)

```javascript
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Gamepad2,
  Brain,
  FlaskConical,
  Shield,
  BookOpen,
  Star,
  ArrowRight,
  Globe,
  Zap,
  CheckCircle2,
  Play,
  Music,
  Code,
  Compass,
  Heart,
  Palette,
  Rocket,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../components/ui/SplitText";
import Button from "../components/ui/Button";
import ShineButton from "../components/ui/ShineButton";
import PremiumGameCard from "../components/ui/PremiumGameCard";
import GitHubStarButton from "../components/ui/GitHubStarButton";
import StarsBg from "../components/ui/StarsBg";
import PageSkeleton from "../components/ui/PageSkeleton";

gsap.registerPlugin(ScrollTrigger);

const Landing = ({ onNavigate, onLockClick, games = [], theme, isLoading }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem("eduplay_subscribed_email");
    return saved ? "success" : "idle";
  });
  const [loading, setLoading] = useState(false);

  const modelViewerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus("success");
      localStorage.setItem("eduplay_subscribed_email", email);
    }, 1200);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero timeline animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 3D Globe entrance & grow (Webflow + Spotify effect)
      tl.fromTo(
        ".ep-orbit-wrapper",
        { scale: 0.05, y: "20%", opacity: 0.2 },
        { scale: 0.8, y: "0%", opacity: 1, duration: 1.2, ease: "power2.out" },
      );

      // Stagger reveal character entries in Hero Scroll trigger
      tl.to(".panel-1 h1 .split-char", {
        y: "0%",
        opacity: 1,
        stagger: 0.03,
        ease: "power2.out",
        duration: 1.5,
      })
        .to(".panel-1", { opacity: 0, scale: 0.9, duration: 1.2 })

        // Panel 2: Showcase Images fly in
        .to(
          ".panel-2",
          { opacity: 1, pointerEvents: "auto", duration: 1.2 },
          "<",
        )
        .from(
          ".hero-img-left",
          { x: "-100vw", rotation: -45, ease: "power2.out", duration: 1.5 },
          "<",
        )
        .from(
          ".hero-img-right",
          { x: "100vw", rotation: 45, ease: "power2.out", duration: 1.5 },
          "<",
        )
        .from(
          ".hero-img-center",
          { y: "100vh", rotation: 0, ease: "power2.out", duration: 1.5 },
          "<",
        )

        // Panel 2: Out of view
        .to(".panel-2", {
          opacity: 0,
          pointerEvents: "none",
          duration: 1,
          delay: 0.5,
        })

        // Globe scales up in background during panel transitions
        .to(".ep-orbit-wrapper", { scale: 1.2, duration: 1.5 }, "<")

        // Panel 3: Stats appear
        .to(
          ".panel-3",
          { opacity: 1, pointerEvents: "auto", duration: 1.2 },
          "<",
        )
        .from(
          ".hero-stat-card",
          {
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)",
            duration: 1.2,
          },
          "<",
        )

        // Panel 3: Out of view
        .to(".panel-3", {
          opacity: 0,
          pointerEvents: "none",
          duration: 1,
          delay: 0.5,
        })

        // Panel 4: Final CTA appears
        .to(
          ".panel-4",
          { opacity: 1, pointerEvents: "auto", duration: 1.2 },
          "<",
        )
        .from(
          ".panel-4 h2, .panel-4 p, .panel-4 .flex-container",
          {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
            duration: 1.2,
          },
          "<",
        )

        // Final Touch: Globe scales huge and fades out into the next section
        .to(
          ".ep-orbit-wrapper",
          { scale: 2.2, opacity: 0, duration: 1.5, ease: "power1.inOut" },
          "<",
        );

      const hasReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Rotate orbital vertical lines sequentially (Staggered offset)
      if (!hasReducedMotion) {
        const orbitLines = gsap.utils.toArray(".ep-orbit-vertical-line");
        gsap.to(orbitLines, {
          rotateY: 180,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".hero-scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Rotate 3D Earth model camera-orbit continuously
        if (modelViewerRef.current) {
          gsap.fromTo(
            modelViewerRef.current,
            { attr: { "camera-orbit": "0deg 75deg 105%" } },
            {
              attr: { "camera-orbit": "1080deg 75deg 105%" },
              ease: "none",
              scrollTrigger: {
                trigger: ".hero-scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            },
          );
        }
      }

      // 2. Games Grid Entrance Animation
      const gameItems = gsap.utils.toArray(".featured-game-item");
      if (gameItems.length > 0 && !hasReducedMotion) {
        gsap.from(gameItems, {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".featured-games-section",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, [games]);

  return (
    <div
      className={`min-h-screen pt-20 bg-zinc-950 text-white transition-all duration-700 ${isLoading ? "blur-md opacity-40 pointer-events-none" : "blur-none opacity-100"}`}
    >
      {/* Scroll Container wrapper (400vh height to trigger scroll timeline) */}
      <div className="relative h-[400vh] w-full hero-scroll-container">
        {/* Sticky Stage (pinned container) */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center bg-zinc-950 text-white z-10 transition-colors duration-300">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-zinc-950 to-purple-950/20 z-0 pointer-events-none overflow-hidden">
            <StarsBg className="opacity-100" />
          </div>

          {/* 3D Line Globe Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[5]">
            <div className="ep-orbit-wrapper">
              <div className="ep-orbit-line-wrapper">
                <div
                  className="ep-orbit-vertical-line"
                  style={{ transform: "rotateY(0deg)" }}
                ></div>
                <div
                  className="ep-orbit-vertical-line"
                  style={{ transform: "rotateY(30deg)" }}
                ></div>
                <div
                  className="ep-orbit-vertical-line"
                  style={{ transform: "rotateY(60deg)" }}
                ></div>
                <div
                  className="ep-orbit-vertical-line"
                  style={{ transform: "rotateY(90deg)" }}
                ></div>
                <div
                  className="ep-orbit-vertical-line"
                  style={{ transform: "rotateY(120deg)" }}
                ></div>
                <div
                  className="ep-orbit-vertical-line"
                  style={{ transform: "rotateY(150deg)" }}
                ></div>
                <div className="ep-orbit-horizontal-line center"></div>
                <div className="ep-orbit-horizontal-line top"></div>
                <div className="ep-orbit-horizontal-line bottom"></div>
                <div className="ep-orbit-horizontal-line mid"></div>
              </div>
              <div className="ep-model-container">
                <model-viewer
                  ref={modelViewerRef}
                  src="/low_poly_earth.glb"
                  class="ep-earth-viewer"
                  camera-orbit="0deg 75deg 105%"
                  interaction-prompt="none"
                  disable-zoom
                  disable-pan
                  shadow-intensity="0"
                  exposure="1.2"
                ></model-viewer>
              </div>
            </div>
          </div>

          {/* Panel 1: Title & Eyebrow */}
          <div className="panel-1 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-bold text-sm shadow-sm mb-6 uppercase tracking-wider">
              <Sparkles size={16} className="text-indigo-300" /> Exploración
              espacial lúdica
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] max-w-5xl mb-6 text-white">
              Viaja por{" "}
              <span className="gradient-text bg-gradient-to-r from-[#8DA9C4] to-[#E0B0FF] inline-block">
                <SplitText text="constelaciones" />
              </span>{" "}
              de conocimiento.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-355 max-w-2xl font-medium leading-relaxed">
              Una estación de aprendizaje para Luminautas. Completa misiones
              estelares, desbloquea galaxias y entrena tu mente recorriendo el
              cosmos.
            </p>
          </div>

          {/* Panel 2: Showcase Cards */}
          <div className="panel-2 absolute inset-0 flex justify-center items-center z-10 pointer-events-none opacity-0">
            <div className="relative w-full max-w-6xl h-full flex justify-between items-center px-12">
              <div className="hero-img-left absolute left-10 w-72 h-[340px] generic-card rotate-[-12deg]">
                <div className="title-1 flex items-center gap-3">
                  <Zap size={24} className="text-[#8DA9C4]" />
                  <span>Cálculo Orbital</span>
                </div>
                <div className="content mt-8 text-zinc-300">
                  Resuelve ecuaciones gravitatorias para trazar tu rumbo
                  espacial.
                </div>
                <button className="btn" onClick={() => onNavigate("catalog")}>
                  Lanzamiento
                </button>
                <div className="bar">
                  <div className="emptybar" />
                  <div className="filledbar" />
                </div>
              </div>

              <div className="hero-img-center absolute bottom-12 left-1/2 -translate-x-1/2 w-80 h-[360px] generic-card z-20">
                <div className="title-1 flex items-center gap-3">
                  <Compass size={24} className="text-[#E0B0FF]" />
                  <span>Mapa Estelar</span>
                </div>
                <div className="content mt-8 text-zinc-300">
                  Reconstruye mapas estelares y alinea constelaciones antiguas.
                </div>
                <button className="btn" onClick={() => onNavigate("catalog")}>
                  Lanzamiento
                </button>
                <div className="bar">
                  <div className="emptybar" />
                  <div className="filledbar" />
                </div>
              </div>

              <div className="hero-img-right absolute right-10 w-72 h-[340px] generic-card rotate-[12deg]">
                <div className="title-1 flex items-center gap-3">
                  <FlaskConical size={24} className="text-[#6B8BB4]" />
                  <span>Fusión Nebulosa</span>
                </div>
                <div className="content mt-8 text-zinc-300">
                  Sintetiza compuestos cósmicos en reactores de plasma.
                </div>
                <button className="btn" onClick={() => onNavigate("catalog")}>
                  Lanzamiento
                </button>
                <div className="bar">
                  <div className="emptybar" />
                  <div className="filledbar" />
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Stats */}
          <div className="panel-3 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10 opacity-0 pointer-events-none">
            <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-white">
              Aventuras que{" "}
              <span className="gradient-text bg-gradient-to-r from-[#8DA9C4] to-[#E0B0FF]">
                trascienden.
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
              <div className="hero-stat-card bg-zinc-900/50 border border-zinc-800/60 p-8 rounded-[24px] backdrop-blur-sm">
                <div className="text-5xl font-black text-[#8DA9C4] mb-2">
                  +10k
                </div>
                <div className="font-bold text-white text-lg mb-1">
                  Luminautas en Órbita
                </div>
                <div className="text-zinc-400 text-sm">
                  Cadetes espaciales explorando el cosmos del saber.
                </div>
              </div>
              <div className="hero-stat-card bg-zinc-900/50 border border-zinc-800/60 p-8 rounded-[24px] backdrop-blur-sm">
                <div className="text-5xl font-black text-[#E0B0FF] mb-2">
                  98%
                </div>
                <div className="font-bold text-white text-lg mb-1">
                  Misiones Completadas
                </div>
                <div className="text-zinc-400 text-sm">
                  Tripulaciones motivadas por constelaciones de logros.
                </div>
              </div>
              <div className="hero-stat-card bg-zinc-900/50 border border-zinc-800/60 p-8 rounded-[24px] backdrop-blur-sm">
                <div className="text-5xl font-black text-[#6B8BB4] mb-2">
                  +50
                </div>
                <div className="font-bold text-white text-lg mb-1">
                  Planetas Explorados
                </div>
                <div className="text-zinc-400 text-sm">
                  Misiones interactivas creadas por pedagogos estelares.
                </div>
              </div>
            </div>
          </div>

          {/* Panel 4: Final CTA */}
          <div className="panel-4 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10 opacity-0 pointer-events-none">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
              ¿Listo para el abordaje?
            </h2>
            <p className="text-lg md:text-xl text-zinc-350 mb-8 max-w-2xl">
              Únete hoy a la tripulación estelar de LumiNauts. Misiones demo
              disponibles o regístrate para el despegue.
            </p>
            <div className="flex-container w-full max-w-lg z-20 pointer-events-auto">
              {status === "success" ? (
                <motion.div className="bg-green-950/40 border border-green-800/50 text-green-200 p-6 rounded-[24px] w-full shadow-lg text-center">
                  <CheckCircle2
                    className="mx-auto text-[#8DA9C4] mb-3"
                    size={32}
                  />
                  <h3 className="font-extrabold text-xl mb-1">
                    ¡Abordaje Confirmado!
                  </h3>
                  <p className="text-sm font-medium text-green-300 mb-4">
                    Recibirás señales de órbita cuando detectemos nuevos
                    planetas.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      size="md"
                      onClick={() => onNavigate("catalog")}
                      className="flex-1 shadow-indigo-500/10"
                    >
                      Mapa Estelar <Play size={16} className="ml-1" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => onNavigate("dashboard")}
                      className="bg-zinc-850 text-white border-zinc-800 hover:bg-zinc-800 flex-1"
                    >
                      Bitácora
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 w-full bg-zinc-900/80 backdrop-blur-md p-2 rounded-[24px] border border-zinc-800 shadow-md"
                >
                  <input
                    type="email"
                    required
                    placeholder="Bitácora de comunicación (correo)..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-5 py-3 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm sm:text-base"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="py-3 px-6 shadow-indigo-500/10 whitespace-nowrap text-sm sm:text-base rounded-2xl"
                  >
                    {loading ? "Preparando despegue..." : "Asegurar Cabina"}
                  </Button>
                </form>
              )}
              <div className="flex justify-center gap-6 mt-4">
                <ShineButton
                  onClick={() => onNavigate("catalog")}
                  className="text-sm"
                >
                  Iniciar Vuelo Demo
                </ShineButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-36 md:py-48 bg-[#141923] text-white px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        {/* Ambient gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6B8BB4]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E0B0FF]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white">
              Exploración que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DA9C4] to-[#E0B0FF]">
                fascina.
              </span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl font-medium">
              Tematizado para alimentar la curiosidad innata de los Luminautas y
              asegurar la retención activa.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Navegación Lúdica",
                desc: "Combustible de XP, insignias de tripulación y constelaciones completadas que marcan tu rango.",
                icon: Rocket,
                color: "text-[#E0B0FF]",
              },
              {
                title: "Control de Misión",
                desc: "Panel detallado para Comandantes (padres/profesores) con métricas de precisión orbital y vuelo cognitivo.",
                icon: Shield,
                color: "text-[#8DA9C4]",
              },
              {
                title: "Órbita Alta",
                desc: "Misiones construidas bajo rigurosos estándares pedagógicos, cubriendo desde cálculo hasta lógica cuántica.",
                icon: BookOpen,
                color: "text-[#6B8BB4]",
              },
            ].map((b, i) => (
              <div key={i} className="generic-card rounded-[24px]">
                <div className="title-1 flex items-center gap-3">
                  <b.icon size={24} className={b.color} />
                  <span>{b.title}</span>
                </div>
                <div className="content mt-8 text-zinc-300">{b.desc}</div>
                <button className="btn" onClick={() => onNavigate("catalog")}>
                  Explorar
                </button>
                <div className="bar">
                  <div className="emptybar" />
                  <div className="filledbar" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 lg:px-8 py-36 md:py-48 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Explora por Categorías
          </h2>
          <p className="text-xl text-zinc-400 font-medium">
            Aprende lo que más te apasiona en nuestro universo.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="ep-marquee-container">
          {/* Row 1: Forward */}
          <div className="ep-marquee-track">
            {[
              { name: "Cálculo Orbital", icon: Zap, color: "#8DA9C4" },
              { name: "Física Solar", icon: FlaskConical, color: "#10b981" },
              {
                name: "Bitácoras del Espacio",
                icon: BookOpen,
                color: "#ef4444",
              },
              { name: "Sistemas Estelares", icon: Brain, color: "#E0B0FF" },
              { name: "Código de Navegación", icon: Code, color: "#ec4899" },
              { name: "Astronomía Kepler", icon: Sparkles, color: "#f59e0b" },
              // Duplicate items for seamless loop
              { name: "Cálculo Orbital", icon: Zap, color: "#8DA9C4" },
              { name: "Física Solar", icon: FlaskConical, color: "#10b981" },
              {
                name: "Bitácoras del Espacio",
                icon: BookOpen,
                color: "#ef4444",
              },
              { name: "Sistemas Estelares", icon: Brain, color: "#E0B0FF" },
              { name: "Código de Navegación", icon: Code, color: "#ec4899" },
              { name: "Astronomía Kepler", icon: Sparkles, color: "#f59e0b" },
            ].map((cat, i) => (
              <div
                key={i}
                onClick={() => onNavigate("catalog")}
                className="ep-marquee-card group rounded-full"
              >
                <cat.icon
                  size={22}
                  style={{ color: cat.color }}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Row 2: Reverse */}
          <div className="ep-marquee-track-reverse">
            {[
              { name: "Cronología Galáctica", icon: Compass, color: "#14b8a6" },
              {
                name: "Cartografía Exoplanetaria",
                icon: Globe,
                color: "#06b6d4",
              },
              { name: "Frecuencias Cósmicas", icon: Music, color: "#f43f5e" },
              { name: "Órbitas y Nebulosas", icon: Star, color: "#eab308" },
              { name: "Fusión Artística", icon: Sparkles, color: "#a855f7" },
              { name: "Biosfera de Cabina", icon: Heart, color: "#10b981" },
              // Duplicate items for seamless loop
              { name: "Cronología Galáctica", icon: Compass, color: "#14b8a6" },
              {
                name: "Cartografía Exoplanetaria",
                icon: Globe,
                color: "#06b6d4",
              },
              { name: "Frecuencias Cósmicas", icon: Music, color: "#f43f5e" },
              { name: "Órbitas y Nebulosas", icon: Star, color: "#eab308" },
              { name: "Fusión Artística", icon: Sparkles, color: "#a855f7" },
              { name: "Biosfera de Cabina", icon: Heart, color: "#10b981" },
            ].map((cat, i) => (
              <div
                key={i}
                onClick={() => onNavigate("catalog")}
                className="ep-marquee-card group rounded-full"
              >
                <cat.icon
                  size={22}
                  style={{ color: cat.color }}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="featured-games-section py-36 md:py-48 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="absolute inset-0 bg-radial-gradient from-blue-950/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-6 z-10">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Misiones Destacadas
            </h2>
            <p className="text-xl text-zinc-400 font-medium">
              Inicia el viaje con las misiones más aclamadas de la tripulación.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => onNavigate("catalog")}
            className="gap-2 bg-zinc-900 border-zinc-850 hover:bg-zinc-800 text-white rounded-2xl"
          >
            Ver Mapa Estelar <ArrowRight size={18} />
          </Button>
        </div>

        {/* Games Grid layout */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.slice(0, 3).map((game) => (
              <div key={game.id} className="featured-game-item w-full">
                <PremiumGameCard
                  {...game}
                  isDark={true}
                  onClick={() =>
                    game.locked
                      ? onLockClick(game)
                      : onNavigate("game", { gameId: game.id })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-36 md:py-48 bg-zinc-950 text-white px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto mb-20 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Señales del Control de Misiones
          </h2>
          <p className="text-xl text-zinc-400 font-medium">
            Comentarios de las tripulaciones y comandantes de LumiNauts.
          </p>
        </div>

        {/* Sticky Stack Cards Container */}
        <div className="ep-stack-container px-4">
          {[
            {
              text: "Mi cadete por fin disfruta entrenar cálculo orbital. ¡Aprender es ahora una aventura estelar!",
              author: "María P.",
              role: "Comandante (Madre)",
              avatar: "M",
            },
            {
              text: "Excelente bitácora para asignar misiones adicionales a la tripulación. Muy intuitiva.",
              author: "Carlos R.",
              role: "Comandante (Profesor)",
              avatar: "C",
            },
            {
              text: "Me encanta alinear constelaciones y ganar estrellas cada vez que completo misiones de ciencias.",
              author: "Sofi (10 años)",
              role: "Luminauta",
              avatar: "S",
            },
          ].map((test, i) => (
            <div key={i} className="stack-card ep-stack-card">
              <div className="flex flex-col gap-6">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      fill="currentColor"
                      className="filter drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                    />
                  ))}
                </div>
                <p className="text-white text-2xl md:text-3xl font-medium italic leading-relaxed">
                  "{test.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center font-bold text-blue-400 text-xl shadow-lg">
                  {test.avatar}
                </div>
                <div>
                  <div className="font-extrabold text-white text-lg">
                    {test.author}
                  </div>
                  <div className="text-sm text-zinc-400 font-semibold">
                    {test.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parents/Teachers CTA */}
      <section className="py-36 md:py-48 bg-[#141923] px-6 lg:px-8 text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6B8BB4]/10 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10 text-white">
          <Shield
            size={64}
            className="mx-auto mb-8 text-[#8DA9C4] filter drop-shadow-[0_0_15px_rgba(141,169,196,0.3)]"
          />
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
            ¿Eres un Comandante de Misión?
          </h2>
          <p className="text-xl text-zinc-300 mb-10 leading-relaxed font-medium">
            Descubre el Control de Misión. Supervisa el progreso orbital de tus
            cadetes, detecta desvíos de rumbo y asigna misiones personalizadas
            en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShineButton
              onClick={() => onNavigate("parents")}
              className="bg-[#6B8BB4] hover:bg-[#8DA9C4] border-white/20 text-white py-4 px-8 rounded-full"
            >
              Ingresar al Control de Misión
            </ShineButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-850 pt-20 pb-10 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white">
                <Rocket size={28} className="text-[#8DA9C4]" />{" "}
                <span className="font-extrabold text-2xl tracking-tight">
                  LumiNauts
                </span>
              </div>
              <p className="text-zinc-400 text-lg max-w-sm mb-6">
                La estación estelar donde el conocimiento y la aventura espacial
                convergen para inspirar a los Luminautas.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
                Plataforma
              </h4>
              <ul className="space-y-4 text-zinc-400 font-medium flex flex-col items-start">
                <li>
                  <button
                    onClick={() => onNavigate("catalog")}
                    className="hover:text-[#8DA9C4] transition-colors text-left"
                  >
                    Mapa Estelar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("parents")}
                    className="hover:text-[#8DA9C4] transition-colors text-left"
                  >
                    Comandantes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("pricing")}
                    className="hover:text-[#8DA9C4] transition-colors text-left"
                  >
                    Suscripciones
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
                Legal
              </h4>
              <ul className="space-y-4 text-zinc-400 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#8DA9C4] transition-colors"
                  >
                    Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#8DA9C4] transition-colors"
                  >
                    Términos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#8DA9C4] transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-850 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-550 font-medium">
            <p>© 2026 LumiNauts. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <GitHubStarButton />
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-400 transition-colors cursor-pointer text-zinc-400">
                <Globe size={18} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
```
