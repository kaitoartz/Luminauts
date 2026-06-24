import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Gamepad2, Brain, FlaskConical, Shield, BookOpen, Star, 
  ArrowRight, Globe, Zap, CheckCircle2, Play, Music, Code, Compass, Heart, Palette, Rocket 
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitText from '../components/ui/SplitText';
import Button from '../components/ui/Button';
import ShineButton from '../components/ui/ShineButton';
import PremiumGameCard from '../components/ui/PremiumGameCard';
import GitHubStarButton from '../components/ui/GitHubStarButton';
import StarsBg from '../components/ui/StarsBg';
import PageSkeleton from '../components/ui/PageSkeleton';

gsap.registerPlugin(ScrollTrigger);

const Landing = ({ onNavigate, onLockClick, games = [], theme, isLoading }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem('eduplay_subscribed_email');
    return saved ? 'success' : 'idle';
  });
  const [loading, setLoading] = useState(false);

  const modelViewerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      localStorage.setItem('eduplay_subscribed_email', email);
    }, 1200);
  };

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Update ScrollTrigger on Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF with GSAP Ticker
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Stars animation is managed independently inside the StarsBg component.

      // 2. Independent comet (shooting star) flight timeline
      const cometTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-scroll-container",
          start: "15% top",
          end: "55% top",
          scrub: 1,
        }
      });
      cometTl.fromTo("#fstar",
        { opacity: 0, x: 300, y: -150 },
        { opacity: 1, x: 50, y: 100, ease: "power1.out" }
      ).to("#fstar",
        { opacity: 0, x: -350, y: 400, ease: "power1.in" }
      );

      // 3. Main Hero sequencing timeline animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // 3D Globe entrance & grow (Webflow + Spotify effect)
      tl.fromTo(".ep-orbit-wrapper", 
        { scale: 0.25, y: "20%", opacity: 0.5 }, 
        { scale: 0.8, y: "0%", opacity: 1, duration: 2.2, ease: "power2.out" }
      );

      // Stagger reveal character entries in Hero Scroll trigger
      tl.to(".panel-1 h1 .split-char", { y: "0%", opacity: 1, stagger: 0.03, ease: "power2.out", duration: 1.5 })

        .to(".panel-1", { opacity: 0, scale: 0.9, duration: 1.2 })
        
        // Panel 2: Showcase Images fly in
        .to(".panel-2", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".hero-img-left", { x: "-100vw", rotation: -45, ease: "power2.out", duration: 1.5 }, "<")
        .from(".hero-img-right", { x: "100vw", rotation: 45, ease: "power2.out", duration: 1.5 }, "<")
        .from(".hero-img-center", { y: "100vh", rotation: 0, ease: "power2.out", duration: 1.5 }, "<")
        
        // Panel 2: Out of view
        .to(".panel-2", { opacity: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
        
        // Globe scales up in background during panel transitions
        .to(".ep-orbit-wrapper", { scale: 1.2, duration: 1.5 }, "<")
        
        // Panel 3: Stats appear
        .to(".panel-3", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".hero-stat-card", { y: 60, opacity: 0, stagger: 0.2, ease: "back.out(1.7)", duration: 1.2 }, "<")
        
        // Panel 3: Out of view
        .to(".panel-3", { opacity: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
        
        // Panel 4: Final CTA appears
        .to(".panel-4", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".panel-4 h2, .panel-4 p, .panel-4 .flex-container", { y: 40, opacity: 0, stagger: 0.15, ease: "power3.out", duration: 1.2 }, "<")
        
        // Final Touch: Globe scales huge and fades out into the next section
        .to(".ep-orbit-wrapper", { scale: 2.2, opacity: 1, duration: 1.5, ease: "power1.inOut" }, "<");

      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!hasReducedMotion) {
        // Rotate 3D Earth model camera-orbit continuously
        if (modelViewerRef.current) {
          gsap.fromTo(modelViewerRef.current,
            { attr: { "camera-orbit": "0deg 75deg 105%" } },
            {
              attr: { "camera-orbit": "1080deg 75deg 105%" },
              ease: "none",
              scrollTrigger: {
                trigger: ".hero-scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              }
            }
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
            toggleActions: "play none none none"
          }
        });
      }
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [games]);

  return (
    <div className={`min-h-screen pt-20 bg-zinc-950 text-white transition-all duration-700 ${isLoading ? 'blur-md opacity-40 pointer-events-none' : 'blur-none opacity-100'}`}>
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-350 font-bold text-sm shadow-sm mb-6 uppercase tracking-wider">
              <Sparkles size={16} className="text-yellow-400"/> Nueva forma de aprender
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] max-w-5xl mb-6 text-white">
              Descubre un <span className="gradient-text bg-gradient-to-r from-blue-400 to-purple-400 inline-block"><SplitText text="universo" /></span> de conocimiento.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
              Plataforma premium de aprendizaje gamificado. Retos diarios, medallas y un catálogo infinito para entrenar tu mente de forma interactiva.
            </p>
          </div>

          {/* Panel 2: Showcase Cards */}
          <div className="panel-2 absolute inset-0 flex justify-center items-center z-10 pointer-events-none opacity-0">
            <div className="relative w-full max-w-6xl h-full flex justify-between items-center px-12">
              <div className="hero-img-left absolute left-10 w-72 h-[340px] generic-card rotate-[-12deg]">
                <div className="title-1 flex items-center gap-3">
                  <Gamepad2 size={24} className="text-blue-400" />
                  <span>Aventura Matemática</span>
                </div>
                <div className="content mt-8 text-zinc-300">
                  Resuelve acertijos matemáticos y sube de nivel.
                </div>
                <button className="btn" onClick={() => onNavigate('catalog')}>Jugar</button>
                <div className="bar">
                  <div className="emptybar" />
                  <div className="filledbar" />
                </div>
              </div>
              
              <div className="hero-img-center absolute bottom-12 left-1/2 -translate-x-1/2 w-80 h-[360px] generic-card z-20">
                <div className="title-1 flex items-center gap-3">
                  <Brain size={24} className="text-purple-400" />
                  <span>Memoria Espacial</span>
                </div>
                <div className="content mt-8 text-zinc-300">
                  Pon a prueba tu retención visual y memoriza.
                </div>
                <button className="btn" onClick={() => onNavigate('catalog')}>Jugar</button>
                <div className="bar">
                  <div className="emptybar" />
                  <div className="filledbar" />
                </div>
              </div>

              <div className="hero-img-right absolute right-10 w-72 h-[340px] generic-card rotate-[12deg]">
                <div className="title-1 flex items-center gap-3">
                  <FlaskConical size={24} className="text-green-400" />
                  <span>Laboratorio Químico</span>
                </div>
                <div className="content mt-8 text-zinc-300">
                  Combina elementos en el lab virtual.
                </div>
                <button className="btn" onClick={() => onNavigate('catalog')}>Jugar</button>
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
              Aprendizaje que <span className="gradient-text bg-gradient-to-r from-blue-400 to-cyan-400">engancha.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
              <div className="hero-stat-card bg-zinc-900/50 border border-zinc-800/60 p-8 rounded-3xl backdrop-blur-sm">
                <div className="text-5xl font-black text-blue-400 mb-2">+10k</div>
                <div className="font-bold text-white text-lg mb-1">Estudiantes Activos</div>
                <div className="text-zinc-400 text-sm">Entrenando su mente a diario en todo el mundo.</div>
              </div>
              <div className="hero-stat-card bg-zinc-900/50 border border-zinc-800/60 p-8 rounded-3xl backdrop-blur-sm">
                <div className="text-5xl font-black text-purple-400 mb-2">98%</div>
                <div className="font-bold text-white text-lg mb-1">Retención Escolar</div>
                <div className="text-zinc-400 text-sm">Altamente motivados con rachas y medallas.</div>
              </div>
              <div className="hero-stat-card bg-zinc-900/50 border border-zinc-800/60 p-8 rounded-3xl backdrop-blur-sm">
                <div className="text-5xl font-black text-cyan-400 mb-2">+50</div>
                <div className="font-bold text-white text-lg mb-1">Juegos Premium</div>
                <div className="text-zinc-400 text-sm">Desarrollados por pedagogos y diseñadores.</div>
              </div>
            </div>
          </div>

          {/* Panel 4: Final CTA */}
          <div className="panel-4 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10 opacity-0 pointer-events-none">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">¿Listo para la aventura?</h2>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl">
              Únete hoy a la comunidad educativa líder. Demostrativo disponible o regístrate para obtener novedades.
            </p>
            <div className="flex-container w-full max-w-lg z-20 pointer-events-auto">
              {status === 'success' ? (
                <motion.div 
                  className="bg-green-950/40 border border-green-800/50 text-green-200 p-6 rounded-3xl w-full shadow-lg text-center"
                >
                  <CheckCircle2 className="mx-auto text-green-400 mb-3" size={32} />
                  <h3 className="font-extrabold text-xl mb-1">¡Suscrito con éxito!</h3>
                  <p className="text-sm font-medium text-green-300 mb-4">Te enviaremos actualizaciones cuando lancemos más contenido.</p>
                  <div className="flex gap-3">
                    <Button size="md" onClick={() => onNavigate('catalog')} className="flex-1 shadow-green-500/10">Probar Juegos Demo <Play size={16} className="ml-1"/></Button>
                    <Button variant="secondary" size="md" onClick={() => onNavigate('dashboard')} className="bg-zinc-850 text-white border-zinc-800 hover:bg-zinc-800 flex-1">Dashboard</Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full bg-zinc-900/80 backdrop-blur-md p-2 rounded-[22px] border border-zinc-800 shadow-md">
                  <input 
                    type="email" 
                    required 
                    placeholder="Correo de papá, mamá o profesor..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-5 py-3 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm sm:text-base"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="py-3 px-6 shadow-blue-500/10 whitespace-nowrap text-sm sm:text-base rounded-2xl">
                    {loading ? 'Registrando...' : 'Unirse a la lista'}
                  </Button>
                </form>
              )}
              <div className="flex justify-center gap-6 mt-4">
                <ShineButton onClick={() => onNavigate('catalog')} className="text-sm">
                  Probar Demo Gratuita
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
              Exploración que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DA9C4] to-[#E0B0FF]">fascina.</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl font-medium">Tematizado para alimentar la curiosidad innata de los Luminautas y asegurar la retención activa.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Navegación Lúdica", desc: "Combustible de XP, insignias de tripulación y constelaciones completadas que marcan tu rango.", icon: Rocket, color: "text-[#E0B0FF]" },
              { title: "Control de Misión", desc: "Panel detallado para Comandantes (padres/profesores) con métricas de precisión orbital y vuelo cognitivo.", icon: Shield, color: "text-[#8DA9C4]" },
              { title: "Órbita Alta", desc: "Misiones construidas bajo rigurosos estándares pedagógicos, cubriendo desde cálculo hasta lógica cuántica.", icon: BookOpen, color: "text-[#6B8BB4]" }
            ].map((b, i) => (
              <div key={i} className="generic-card rounded-[24px]">
                <div className="title-1 flex items-center gap-3">
                  <b.icon size={24} className={b.color} />
                  <span>{b.title}</span>
                </div>
                <div className="content mt-8 text-zinc-300">
                  {b.desc}
                </div>
                <button className="btn" onClick={() => onNavigate('catalog')}>Explorar</button>
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
          <h2 className="text-4xl font-black text-white mb-4">Explora por Categorías</h2>
          <p className="text-xl text-zinc-400 font-medium">Aprende lo que más te apasiona en nuestro universo.</p>
        </div>

        {/* Marquee Wrapper */}
        <div className="ep-marquee-container">
          {/* Row 1: Forward */}
          <div className="ep-marquee-track">
            {[
              { name: "Cálculo Orbital", icon: Zap, color: "#8DA9C4" },
              { name: "Física Solar", icon: FlaskConical, color: "#10b981" },
              { name: "Bitácoras del Espacio", icon: BookOpen, color: "#ef4444" },
              { name: "Sistemas Estelares", icon: Brain, color: "#E0B0FF" },
              { name: "Código de Navegación", icon: Code, color: "#ec4899" },
              { name: "Astronomía Kepler", icon: Sparkles, color: "#f59e0b" },
              // Duplicate items for seamless loop
              { name: "Cálculo Orbital", icon: Zap, color: "#8DA9C4" },
              { name: "Física Solar", icon: FlaskConical, color: "#10b981" },
              { name: "Bitácoras del Espacio", icon: BookOpen, color: "#ef4444" },
              { name: "Sistemas Estelares", icon: Brain, color: "#E0B0FF" },
              { name: "Código de Navegación", icon: Code, color: "#ec4899" },
              { name: "Astronomía Kepler", icon: Sparkles, color: "#f59e0b" },
            ].map((cat, i) => (
              <div key={i} onClick={() => onNavigate('catalog')} className="ep-marquee-card group rounded-full">
                <cat.icon size={22} style={{ color: cat.color }} className="group-hover:scale-110 transition-transform" />
                <span>{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Row 2: Reverse */}
          <div className="ep-marquee-track-reverse">
            {[
              { name: "Cronología Galáctica", icon: Compass, color: "#14b8a6" },
              { name: "Cartografía Exoplanetaria", icon: Globe, color: "#06b6d4" },
              { name: "Frecuencias Cósmicas", icon: Music, color: "#f43f5e" },
              { name: "Órbitas y Nebulosas", icon: Star, color: "#eab308" },
              { name: "Fusión Artística", icon: Sparkles, color: "#a855f7" },
              { name: "Biosfera de Cabina", icon: Heart, color: "#10b981" },
              // Duplicate items for seamless loop
              { name: "Cronología Galáctica", icon: Compass, color: "#14b8a6" },
              { name: "Cartografía Exoplanetaria", icon: Globe, color: "#06b6d4" },
              { name: "Frecuencias Cósmicas", icon: Music, color: "#f43f5e" },
              { name: "Órbitas y Nebulosas", icon: Star, color: "#eab308" },
              { name: "Fusión Artística", icon: Sparkles, color: "#a855f7" },
              { name: "Biosfera de Cabina", icon: Heart, color: "#10b981" },
            ].map((cat, i) => (
              <div key={i} onClick={() => onNavigate('catalog')} className="ep-marquee-card group rounded-full">
                <cat.icon size={22} style={{ color: cat.color }} className="group-hover:scale-110 transition-transform" />
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
            <h2 className="text-4xl font-bold text-white mb-4">Misiones Destacadas</h2>
            <p className="text-xl text-zinc-400 font-medium">Inicia el viaje con las misiones más aclamadas de la tripulación.</p>
          </div>
          <Button variant="secondary" onClick={() => onNavigate('catalog')} className="gap-2 bg-zinc-900 border-zinc-850 hover:bg-zinc-800 text-white rounded-2xl">
            Ver Mapa Estelar <ArrowRight size={18}/>
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
                  onClick={() => game.locked ? onLockClick(game) : onNavigate('game', { gameId: game.id })} 
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
          <h2 className="text-4xl font-black text-white mb-4">Señales del Control de Misiones</h2>
          <p className="text-xl text-zinc-400 font-medium">Comentarios de las tripulaciones y comandantes de LumiNauts.</p>
        </div>

        {/* Sticky Stack Cards Container */}
        <div className="ep-stack-container px-4">
          {[
            { text: "Mi cadete por fin disfruta entrenar cálculo orbital. ¡Aprender es ahora una aventura estelar!", author: "María P.", role: "Comandante (Madre)", avatar: "M" },
            { text: "Excelente bitácora para asignar misiones adicionales a la tripulación. Muy intuitiva.", author: "Carlos R.", role: "Comandante (Profesor)", avatar: "C" },
            { text: "Me encanta alinear constelaciones y ganar estrellas cada vez que completo misiones de ciencias.", author: "Sofi (10 años)", role: "Luminauta", avatar: "S" }
          ].map((test, i) => (
            <div key={i} className="stack-card ep-stack-card">
              <div className="flex flex-col gap-6">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(star => <Star key={star} size={24} fill="currentColor" className="filter drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />)}
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
                  <div className="font-extrabold text-white text-lg">{test.author}</div>
                  <div className="text-sm text-zinc-400 font-semibold">{test.role}</div>
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
          <Shield size={64} className="mx-auto mb-8 text-[#8DA9C4] filter drop-shadow-[0_0_15px_rgba(141,169,196,0.3)]" />
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">¿Eres un Comandante de Misión?</h2>
          <p className="text-xl text-zinc-350 mb-10 leading-relaxed font-medium">
            Descubre el Control de Misión. Supervisa el progreso orbital de tus cadetes, detecta desvíos de rumbo y asigna misiones personalizadas en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShineButton onClick={() => onNavigate('parents')} className="bg-[#6B8BB4] hover:bg-[#8DA9C4] border-white/20 text-white py-4 px-8 rounded-full">
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
                <Rocket size={28} className="text-[#8DA9C4]"/> <span className="font-extrabold text-2xl tracking-tight">LumiNauts</span>
              </div>
              <p className="text-zinc-400 text-lg max-w-sm mb-6">La estación estelar donde el conocimiento y la aventura espacial convergen para inspirar a los Luminautas.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Plataforma</h4>
              <ul className="space-y-4 text-zinc-400 font-medium flex flex-col items-start">
                <li><button onClick={() => onNavigate('catalog')} className="hover:text-[#8DA9C4] transition-colors text-left">Mapa Estelar</button></li>
                <li><button onClick={() => onNavigate('parents')} className="hover:text-[#8DA9C4] transition-colors text-left">Comandantes</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="hover:text-[#8DA9C4] transition-colors text-left">Suscripciones</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-4 text-zinc-400 font-medium">
                <li><a href="#" className="hover:text-[#8DA9C4] transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-[#8DA9C4] transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-[#8DA9C4] transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-850 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-550 font-medium">
            <p>© 2026 LumiNauts. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <GitHubStarButton />
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-400 transition-colors cursor-pointer text-zinc-400"><Globe size={18}/></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
