import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Gamepad2, Brain, FlaskConical, Shield, BookOpen, Star, 
  ArrowRight, Globe, Zap, CheckCircle2, Play, Music, Code, Compass, Heart, Palette, Rocket, X, Award
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Button from '../components/ui/Button';
import ShineButton from '../components/ui/ShineButton';
import PremiumGameCard from '../components/ui/PremiumGameCard';
import GitHubStarButton from '../components/ui/GitHubStarButton';
import StarsBg from '../components/ui/StarsBg';
import PageSkeleton from '../components/ui/PageSkeleton';
import Grainient from '../components/ui/Grainient';
import { BlurReveal } from '../components/ui/blur-reveal';
import ScrollReveal from '../components/ui/ScrollReveal';
import FeatureSection from '../components/ui/stack-feature-section';

gsap.registerPlugin(ScrollTrigger);

const WaitlistLanding = ({ onNavigate, theme, isLoading, isSplashActive, games = [] }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem('eduplay_subscribed_email');
    return saved ? 'success' : 'idle';
  });
  const [loading, setLoading] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  
  // Demo Game States
  const [demoStep, setDemoStep] = useState(1); // 1: Welcome, 2: Trivia, 3: Success
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Real-Time Simulator for Subscribers
  const [subscriberCount, setSubscriberCount] = useState(() => {
    const savedCount = localStorage.getItem('luminauts_simulated_subscribers');
    return savedCount ? parseInt(savedCount, 10) : 1482;
  });

  useEffect(() => {
    localStorage.setItem('luminauts_simulated_subscribers', subscriberCount);
  }, [subscriberCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Incrementar aleatoriamente entre 1 y 2 registrados
      setSubscriberCount(prev => prev + (Math.random() > 0.5 ? 1 : 2));
    }, 12000 + Math.random() * 8000); // Cada 12 a 20 segundos

    return () => clearInterval(interval);
  }, []);

  const modelViewerRef = useRef(null);
  const lenisRef = useRef(null);

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
    const isTouchDevice = 
      window.matchMedia('(pointer: coarse)').matches || 
      ('ontouchstart' in window) || 
      (navigator.maxTouchPoints > 0);
    let lenis = null;
    let handleMouseDown = null;
    let handleMouseMove = null;
    let handleMouseUp = null;

    if (!isTouchDevice) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisRef.current = lenis;
      if (isSplashActive) lenis.stop();
      lenis.on('scroll', ScrollTrigger.update);

      let isMiddleDragging = false;
      let startY = 0;

      handleMouseDown = (e) => {
        if (e.button === 1) {
          e.preventDefault();
          isMiddleDragging = true;
          startY = e.clientY;
        }
      };

      handleMouseMove = (e) => {
        if (isMiddleDragging && lenisRef.current) {
          const deltaY = e.clientY - startY;
          if (Math.abs(deltaY) > 5) {
            const scrollSpeed = deltaY * 0.15;
            lenisRef.current.scrollTo(window.scrollY + scrollSpeed, {
              immediate: false,
            });
          }
        }
      };

      handleMouseUp = (e) => {
        if (e.button === 1) {
          isMiddleDragging = false;
        }
      };

      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    const tickerCallback = (time) => {
      if (lenis) {
        lenis.raf(time * 1000);
      }
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      tl.fromTo(".ep-orbit-wrapper", 
        { scale: 0.15, y: "20%", opacity: 0.5 }, 
        { scale: 0.6, y: "0%", opacity: 1, duration: 2.2, ease: "power2.out" }
      )
        .to(".panel-1", { opacity: 0, scale: 0.9, duration: 1.2 })
        .to(".panel-2", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".hero-img-left", { x: "-100vw", rotation: -45, ease: "power2.out", duration: 1.5 }, "<")
        .from(".hero-img-right", { x: "100vw", rotation: 45, ease: "power2.out", duration: 1.5 }, "<")
        .from(".hero-img-center", { y: "100vh", rotation: 0, ease: "power2.out", duration: 1.5 }, "<")
        .to(".panel-2", { opacity: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
        .to(".ep-orbit-wrapper", { scale: 1, duration: 1.5 }, "<")
        .to(".panel-3", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".hero-stat-card", { y: 60, opacity: 0, stagger: 0.2, ease: "back.out(1.7)", duration: 1.2 }, "<")
        .to(".panel-3", { opacity: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
        .to(".panel-4", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".panel-4 h2, .panel-4 p, .panel-4 .flex-container", { y: 40, opacity: 0, stagger: 0.15, ease: "power3.out", duration: 1.2 }, "<")
        .to(".ep-orbit-wrapper", { scale: 1.6, opacity: 1, duration: 1.5, ease: "power1.inOut" }, "<");

      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!hasReducedMotion) {
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
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      if (handleMouseDown) {
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
      if (lenis) {
        lenisRef.current = null;
        lenis.destroy();
      }
    };
  }, [games]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (isSplashActive) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isSplashActive]);

  useEffect(() => {
    if (isSplashActive) return;
    if (document.querySelector('script[src*="model-viewer"]')) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
    script.async = true;
    document.head.appendChild(script);
  }, [isSplashActive]);

  useEffect(() => {
    // Forzar el tema oscuro
    const wasDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.add('dark');
    return () => {
      if (!wasDark && import.meta.env.VITE_WAITLIST_ONLY !== 'true') {
        document.documentElement.classList.remove('dark');
      }
    };
  }, []);

  const handleOptionClick = (idx) => {
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === 1) { // 15 es la respuesta correcta en MOCK_QUIZ (id:1)
      setTimeout(() => {
        setDemoStep(3); // Ir a éxito
      }, 1500);
    }
  };

  const handleRestartDemo = () => {
    setDemoStep(1);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  if (isLoading) {
    return <PageSkeleton view="landing" />;
  }

  // Mock catalog para visualización
  const sampleGames = games && games.length > 0 ? games.slice(0, 3) : [
    { id: "g1", title: "Aventura Matemática", subject: "Matemáticas", level: "8-10", duration: "10 min", points: 150, color: "from-blue-500 to-cyan-400", bg: "bg-blue-900/10", icon: Zap, image: "g1", description: "Resuelve acertijos matemáticos y sube de nivel entrenando tu cerebro.", tag: "En Desarrollo" },
    { id: "g2", title: "Memoria Espacial", subject: "Memoria", level: "5-7", duration: "5 min", points: 100, color: "from-purple-500 to-pink-400", bg: "bg-purple-900/10", icon: Brain, image: "g2", description: "Pon a prueba tu retención visual y memoriza los patrones en el espacio.", tag: "En Desarrollo" },
    { id: "g3", title: "Laboratorio Químico", subject: "Ciencias", level: "11-13", duration: "15 min", points: 200, color: "from-green-500 to-emerald-400", bg: "bg-green-900/10", icon: FlaskConical, image: "g3", description: "Combina elementos y experimenta en nuestro laboratorio virtual interactivo.", locked: true }
  ];

  return (
    <div className={`min-h-screen bg-zinc-950 text-white transition-all duration-700 relative ${isLoading ? 'blur-md opacity-40 pointer-events-none' : 'blur-none opacity-100'}`}>
      
      {/* Global Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Grainient
          scrollSpeed={0.3}
        />
        <StarsBg className="opacity-100" />
      </div>

      {/* Pinned Scroll Hero Section */}
      <div className="relative h-[400vh] w-full hero-scroll-container">
        
        {/* Sticky Stage */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center bg-transparent text-white z-10 transition-colors duration-300">

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
                  exposure="0.5"
                ></model-viewer>
              </div>
            </div>
          </div>
          
          {/* Panel 1: Main Title & Initial Form */}
          <div className="panel-1 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
            
            {/* Real-time Simulated Counter */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-400"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              Únete a <span className="font-extrabold text-white text-sm">{subscriberCount.toLocaleString()}</span> cadetes y educadores registrados
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mb-6 text-white">
              <BlurReveal trigger={!isSplashActive} delay={0.15}>La&nbsp;</BlurReveal>
              <BlurReveal trigger={!isSplashActive} delay={0.25}>estación&nbsp;</BlurReveal>
              <BlurReveal trigger={!isSplashActive} className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500" delay={0.35}>educativa&nbsp;</BlurReveal>
              <BlurReveal trigger={!isSplashActive} delay={0.45}>del&nbsp;</BlurReveal>
              <BlurReveal trigger={!isSplashActive} delay={0.55}>futuro.</BlurReveal>
            </h1>
            
            <BlurReveal trigger={!isSplashActive} delay={0.7} duration={1.2}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-medium leading-relaxed mb-8">
                LumiNauts combina ciencia, matemáticas y juego estelar. Registra tu correo hoy y asegura tu boleto de acceso anticipado al lanzamiento oficial.
              </p>
            </BlurReveal>

            {/* Quick Hero Subscription Form */}
            <div className="flex-container w-full max-w-md z-20 pointer-events-auto px-2">
              {status === 'success' ? (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-950/20 border border-green-800/30 text-green-200 p-4 rounded-2xl w-full text-center"
                >
                  <p className="text-sm font-bold">🚀 ¡Registrado con éxito! Te mantendremos informado.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-[#141923]/60 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-800/60 shadow-md">
                  <input 
                    type="email" 
                    required 
                    placeholder="Correo de papá, mamá o profesor..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-blue-600 text-white rounded-xl font-bold text-xs whitespace-nowrap w-full sm:w-auto">
                    {loading ? 'Registrando...' : 'Unirse al Lanzamiento'}
                  </Button>
                </form>
              )}
            </div>

            <div className="flex justify-center gap-6 mt-6 z-25 pointer-events-auto">
              <ShineButton onClick={() => setShowDemoModal(true)} className="text-xs py-2.5 px-5 flex items-center gap-2">
                <Play size={14} fill="currentColor"/> Probar Demo Estelar
              </ShineButton>
            </div>
          </div>

          {/* Panel 2: Video/Image Showcase placeholder */}
          <div className="panel-2 absolute inset-0 flex justify-center items-center z-10 pointer-events-none opacity-0">
            <div className="relative w-full max-w-6xl h-full flex flex-col justify-center items-center px-6 pointer-events-auto">
              <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-4 md:p-8 backdrop-blur-md max-w-3xl text-center">
                <Rocket size={48} className="mx-auto mb-4 text-purple-400 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-black mb-2 text-white">Órbita del Aprendizaje</h3>
                <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-6">
                  Juegos interactivos donde los cadetes tripulan naves espaciales y resuelven acertijos analíticos alineando estrellas para avanzar.
                </p>
                <div className="w-full aspect-video bg-zinc-950 border border-zinc-800/50 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-lg">
                  {/* Falsa interfaz de juego como video */}
                  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnBub3J5MTV1dTA2c3kzeHJ6azIwYXdoaXRlMjNjZmdpMnpiaGU3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/71fMwwGrFRszyoHhUy/giphy.gif" alt="Demo gameplay" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-400 z-10 bg-zinc-900/80 px-3 py-2 rounded-xl border border-zinc-800">
                    <span className="flex items-center gap-1.5"><Zap size={12} className="text-yellow-400"/> Misión: Ecuaciones Planetarias</span>
                    <span className="font-mono text-blue-400">FPS: 60/60</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Premium Features & Stats */}
          <div className="panel-3 absolute inset-0 flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-0 pointer-events-none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-white">
              Aprendizaje que <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">engancha de verdad.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
              <div className="hero-stat-card bg-zinc-900/40 border border-zinc-800/30 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-black text-blue-400 mb-1">+50</div>
                <div className="font-bold text-white text-base mb-1">Misiones Activas</div>
                <div className="text-zinc-400 text-xs">Desarrolladas por pedagogos y expertos en lógica.</div>
              </div>
              <div className="hero-stat-card bg-zinc-900/40 border border-zinc-800/30 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-black text-purple-400 mb-1">98%</div>
                <div className="font-bold text-white text-base mb-1">Interés y Enfoque</div>
                <div className="text-zinc-400 text-xs">Asegurado mediante rachas estelares y misiones narrativas.</div>
              </div>
              <div className="hero-stat-card bg-zinc-900/40 border border-zinc-800/30 p-6 rounded-2xl backdrop-blur-sm col-span-1 sm:col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-1">100%</div>
                <div className="font-bold text-white text-base mb-1">Seguro para Niños</div>
                <div className="text-zinc-400 text-xs">Sin anuncios, sin microtransacciones, con control parental.</div>
              </div>
            </div>
          </div>

          {/* Panel 4: Final CTA Form */}
          <div className="panel-4 absolute inset-0 flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-0 pointer-events-none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight text-white">¿Listo para tripular?</h2>
            <p className="text-sm md:text-base text-zinc-400 mb-6 max-w-xl">
              Únete hoy al waitlist oficial. Los usuarios registrados recibirán insignias de fundadores exclusivas y acceso prioritario una semana antes del despegue.
            </p>
            <div className="flex-container w-full max-w-lg z-20 pointer-events-auto px-2">
              {status === 'success' ? (
                <motion.div 
                  className="bg-green-950/30 border border-green-800/40 text-green-200 p-6 rounded-2xl w-full text-center"
                >
                  <CheckCircle2 className="mx-auto text-green-400 mb-2" size={32} />
                  <h3 className="font-bold text-lg mb-1">¡Suscrito con éxito!</h3>
                  <p className="text-xs text-green-300 mb-4">Te enviaremos actualizaciones a medida que el lanzamiento se acerque.</p>
                  <Button size="md" onClick={() => setShowDemoModal(true)} className="w-full">
                    Probar Demo Gratuita <Play size={12} className="ml-1"/>
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200/20 shadow-md">
                  <input 
                    type="email" 
                    required 
                    placeholder="Correo de papá, mamá o profesor..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-blue-600 text-white rounded-xl font-bold text-xs whitespace-nowrap">
                    {loading ? 'Registrando...' : 'Notificar Lanzamiento'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feature / Category Highlights */}
      <section className="py-20 md:py-36 bg-transparent text-white px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal origin="bottom" reset={true}>
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                Exploración que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DA9C4] to-[#E0B0FF]">fascina.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal origin="bottom" delay={0.15} reset={true}>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base">Un entorno gamificado para despertar el ingenio natural de los Luminautas.</p>
            </ScrollReveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Navegación Lúdica", desc: "Ganancia de XP, rangos estelares y constelaciones que se completan al avanzar en los retos.", icon: Rocket, color: "text-[#E0B0FF]" },
              { title: "Control de Misión", desc: "Reportes automáticos para padres/profesores. Mapeo de áreas pedagógicas en tiempo real.", icon: Shield, color: "text-[#8DA9C4]" },
              { title: "Plan pedagógico", desc: "Misiones estructuradas basadas en currículos académicos internacionales de lógica y cálculo.", icon: BookOpen, color: "text-[#6B8BB4]" }
            ].map((b, i) => (
              <ScrollReveal key={i} origin="bottom" distance={30} delay={i * 0.15} reset={true}>
                <div className="bg-zinc-900/40 border border-zinc-800/30 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 text-lg font-bold mb-4">
                      <b.icon size={22} className={b.color} />
                      <span>{b.title}</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{b.desc}</p>
                  </div>
                  <button onClick={() => setShowDemoModal(true)} className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-2 text-left self-start">
                    Probar demo <ArrowRight size={12}/>
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories / Feature Section */}
      <div className="feature-section-wrapper bg-transparent text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <ScrollReveal origin="bottom" distance={30} reset={true}>
          <FeatureSection onNavigate={(view) => { if (onNavigate && import.meta.env.VITE_WAITLIST_ONLY !== 'true') { onNavigate(view); } else { setShowDemoModal(true); } }} />
        </ScrollReveal>
      </div>

      {/* Misiones de Muestra (Catalog Highlight) */}
      <section className="py-20 md:py-36 relative bg-transparent text-white">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <ScrollReveal origin="left" distance={30} reset={true} className="flex-1">
            <div>
              <h2 className="text-3xl font-black mb-2">Misiones en Desarrollo</h2>
              <p className="text-sm text-zinc-400">Una vista previa del mapa de aprendizaje que estamos armando.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal origin="right" distance={30} delay={0.1} reset={true}>
            <Button variant="secondary" onClick={() => setShowDemoModal(true)} className="gap-1.5 bg-zinc-900 border-zinc-850 text-white rounded-xl text-xs py-2 px-4">
              Probar Demo Interactiva <ArrowRight size={12}/>
            </Button>
          </ScrollReveal>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleGames.map((game, i) => (
              <ScrollReveal key={game.id} origin="bottom" distance={40} delay={i * 0.15} reset={true}>
                <div className="relative group cursor-pointer" onClick={() => setShowDemoModal(true)}>
                  <PremiumGameCard 
                    {...game} 
                    isDark={true}
                    onClick={() => setShowDemoModal(true)} 
                  />
                  <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl backdrop-blur-[2px]">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5">
                      <Zap size={12} fill="currentColor"/> Probar Demo
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* Pricing Teaser section - Zeigarnik / Commitment */}
      <section className="py-20 bg-transparent text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <h2 className="text-3xl font-black mb-4">Membresías Estelares</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <p className="text-sm text-zinc-400 mb-12">Acceso completo para toda la tripulación escolar o familiar.</p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <ScrollReveal origin="left" distance={40} reset={true} className="h-full">
              <div className="bg-zinc-900/40 border border-zinc-850/40 p-6 rounded-3xl text-left flex flex-col justify-between opacity-80 h-full">
                <div>
                  <h3 className="text-lg font-bold text-zinc-400">Plan Cadete (Mensual)</h3>
                  <div className="text-3xl font-black my-3 text-white">$9<span className="text-xs text-zinc-500 font-normal"> / mes</span></div>
                  <ul className="text-xs text-zinc-400 space-y-2 mb-6">
                    <li>• Acceso a todas las misiones (+50)</li>
                    <li>• 1 cuenta de Luminauta</li>
                    <li>• Reporte básico mensual</li>
                  </ul>
                </div>
                <Button onClick={() => setShowDemoModal(true)} variant="secondary" className="w-full text-xs">Reservar en Lanzamiento</Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal origin="right" distance={40} delay={0.15} reset={true} className="h-full">
              <div className="bg-zinc-900/60 border border-blue-500/30 p-6 rounded-3xl text-left relative flex flex-col justify-between ring-1 ring-blue-500/20 h-full">
                <span className="absolute -top-3 right-4 bg-blue-600 text-[10px] font-black text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">Fundador</span>
                <div>
                  <h3 className="text-lg font-bold text-blue-400">Pase Estelar (Anual)</h3>
                  <div className="text-3xl font-black my-3 text-white">$69<span className="text-xs text-zinc-500 font-normal"> / año</span></div>
                  <ul className="text-xs text-zinc-400 space-y-2 mb-6">
                    <li>• Todo el contenido de por vida</li>
                    <li>• Hasta 3 cuentas de cadetes</li>
                    <li>• Reporte estelar diario en tiempo real</li>
                    <li>• Insignias exclusivas de fundador</li>
                  </ul>
                </div>
                <Button onClick={() => setShowDemoModal(true)} className="w-full text-xs bg-blue-600 hover:bg-blue-500 text-white">Reservar Oferta Lanzamiento</Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-36 bg-transparent text-white px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <h2 className="text-3xl font-black text-white mb-2">Comentarios de Comandantes</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <p className="text-sm text-zinc-400">Padres y profesores que ya han probado nuestros builds de prueba.</p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { text: "Mi hijo por fin disfruta hacer sumas mentales. Se conecta voluntariamente a hacer sus misiones diarias.", author: "María P.", role: "Madre de Leo (9 años)" },
            { text: "El panel de control me permite ver exactamente dónde tienen dificultades en lógica. Útil para el aula.", author: "Prof. Carlos R.", role: "Docente de Primaria" },
            { text: "Los acertijos del laboratorio químico tienen una estética increíble y son muy fáciles de comprender.", author: "Sofi P.", role: "Cadete (10 años)" }
          ].map((test, i) => (
            <ScrollReveal key={i} origin="bottom" distance={30} delay={i * 0.15} reset={true}>
              <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between h-full">
                <p className="text-zinc-300 text-sm italic leading-relaxed mb-6">"{test.text}"</p>
                <div>
                  <div className="font-bold text-sm text-white">{test.author}</div>
                  <div className="text-[11px] text-zinc-550 font-semibold">{test.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Parents/Teachers CTA */}
      <section className="py-36 md:py-48 bg-transparent px-6 lg:px-8 text-center overflow-hidden relative text-zinc-900 dark:text-white">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6B8BB4]/5 dark:bg-[#6B8BB4]/10 rounded-full blur-[160px] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10 text-zinc-900 dark:text-white">
          <ScrollReveal origin="top" distance={30} reset={true}>
            <Shield size={64} className="mx-auto mb-8 text-[#51759C] dark:text-[#8DA9C4] filter drop-shadow-[0_0_15px_rgba(141,169,196,0.3)]" />
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-zinc-900 dark:text-white">¿Eres un Comandante de Misión?</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.2} reset={true}>
            <p className="text-xl text-zinc-650 dark:text-zinc-350 mb-10 leading-relaxed font-medium">
              Descubre el Control de Misión. Supervisa el progreso orbital de tus cadetes, detecta desvíos de rumbo y asigna misiones personalizadas en tiempo real.
            </p>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.3} reset={true}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShineButton onClick={() => setShowDemoModal(true)} className="bg-[#3B6290] dark:bg-[#6B8BB4] hover:bg-[#2C4A75] dark:hover:bg-[#8DA9C4] border-white/20 text-white py-4 px-8 rounded-full">
                Reservar Acceso al Control de Misión
              </ShineButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-transparent border-t border-zinc-900 pt-20 pb-10 px-6 lg:px-8 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white">
                <Rocket size={28} className="text-[#8DA9C4]"/> <span className="font-extrabold text-2xl tracking-tight">LumiNauts</span>
              </div>
              <p className="text-zinc-500 text-sm max-w-sm mb-6">La estación estelar donde el conocimiento y la aventura espacial convergen para inspirar a los Luminautas.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Plataforma</h3>
              <ul className="space-y-4 text-zinc-500 font-medium flex flex-col items-start">
                <li><button onClick={() => setShowDemoModal(true)} className="hover:text-[#8DA9C4] transition-colors text-left">Mapa Estelar</button></li>
                <li><button onClick={() => setShowDemoModal(true)} className="hover:text-[#8DA9C4] transition-colors text-left">Comandantes</button></li>
                <li><button onClick={() => setShowDemoModal(true)} className="hover:text-[#8DA9C4] transition-colors text-left">Suscripciones</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Legal</h3>
              <ul className="space-y-4 text-zinc-500 font-medium">
                <li><a href="#" className="hover:text-[#8DA9C4] transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-[#8DA9C4] transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-[#8DA9C4] transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-555 font-medium text-zinc-500">
            <p>© 2026 LumiNauts. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <GitHubStarButton />
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-400 transition-colors cursor-pointer text-zinc-400 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700"><Globe size={18}/></div>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE DEMO MODAL (Zeigarnik + IKEA + Reciprocity Hook) */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 max-w-md w-full rounded-3xl p-6 relative overflow-hidden"
            >
              {/* Close button */}
              <button 
                onClick={() => { setShowDemoModal(false); handleRestartDemo(); }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1"
              >
                <X size={18}/>
              </button>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Step 1: Welcome & Mission briefing */}
              {demoStep === 1 && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/15 border border-blue-500/25 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                    <Rocket className="text-blue-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">Misión: Aventura Estelar</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      ¡Bienvenido Cadete! Estás a punto de pilotar tu primera prueba orbital. Resuelve la coordenada estelar para completar la misión piloto.
                    </p>
                  </div>
                  <Button 
                    onClick={() => setDemoStep(2)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    Comenzar Misión Piloto
                  </Button>
                </div>
              )}

              {/* Step 2: Interactive Trivia */}
              {demoStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-800 pb-3">
                    <span className="flex items-center gap-1"><FlaskConical size={12}/> Sistema: Álgebra Orbital</span>
                    <span className="font-mono text-purple-400">Misión 1/1</span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Pregunta de Misión</h4>
                    <p className="text-base font-extrabold text-white leading-relaxed">
                      ¿Cuánto es 7 + 8?
                    </p>
                  </div>

                  <div className="grid gap-2.5">
                    {["14", "15", "16", "13"].map((opt, idx) => {
                      const isCorrect = idx === 1;
                      const isSelected = selectedOption === idx;
                      let btnStyle = "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300";
                      
                      if (isSelected) {
                        btnStyle = isCorrect 
                          ? "bg-green-950/20 border-green-500/50 text-green-300"
                          : "bg-red-950/20 border-red-500/50 text-red-300";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={selectedOption !== null}
                          onClick={() => handleOptionClick(idx)}
                          className={`w-full py-3.5 px-4 rounded-xl border text-left text-sm font-semibold transition-all flex justify-between items-center ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isSelected && isCorrect && <span className="text-xs text-green-400 font-bold">¡Correcto! +50 XP</span>}
                          {isSelected && !isCorrect && <span className="text-xs text-red-400 font-bold">Desviación orbital</span>}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-zinc-950/40 border border-zinc-850 rounded-xl text-xs text-zinc-400"
                    >
                      {selectedOption === 1 
                        ? "Excelente cálculo. Al alinear estas coordenadas, la nave acelera con precisión hacia la próxima estrella."
                        : "Cálculo orbital incorrecto. El resultado adecuado era 15. ¡Intenta de nuevo para realinear!"
                      }
                      {selectedOption !== 1 && (
                        <button onClick={handleRestartDemo} className="block mt-2 text-blue-400 font-bold hover:underline">Reiniciar Misión</button>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 3: Success Screen & Waitlist Capture */}
              {demoStep === 3 && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-green-500/15 border border-green-500/25 rounded-2xl flex items-center justify-center mx-auto">
                    <Award className="text-green-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">¡Racha Estelar Iniciada!</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Has completado tu misión inicial y ganado <span className="text-green-400 font-bold">+50 XP</span>. Tu perfil de Cadete está listo.
                    </p>
                    
                    {/* Visual progress bar */}
                    <div className="w-full bg-zinc-950 h-3 rounded-full border border-zinc-800 overflow-hidden mb-6 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "35%" }}
                        transition={{ duration: 1 }}
                        className="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full"
                      />
                      <span className="absolute right-2 top-0 text-[8px] font-mono text-zinc-500 leading-none">Nivel 1 (35%)</span>
                    </div>

                    <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-2xl text-left space-y-3">
                      <p className="text-[11px] font-semibold text-zinc-300">
                        🔒 Misiones de Lógica, Memoria y Programación bloqueadas en esta demo de prueba.
                      </p>
                      
                      {status === 'success' ? (
                        <div className="bg-green-950/20 border border-green-900/30 text-green-300 p-2.5 rounded-xl text-center text-xs font-bold">
                          ¡Listo! Guardaremos tu progreso para el lanzamiento oficial.
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-2">
                          <input 
                            type="email" 
                            required
                            placeholder="Email para guardar racha y notificar..." 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-blue-500 text-xs text-white"
                          />
                          <Button type="submit" disabled={loading} className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold">
                            {loading ? 'Guardando...' : 'Guardar Racha y Notificarme'}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default WaitlistLanding;
