import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Gamepad2, Brain, FlaskConical, Shield, BookOpen, Star, 
  ArrowRight, Globe, Zap, CheckCircle2, Play, Music, Code, Compass, Heart, Palette, Rocket, X, Award, Users, Share2, Copy
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
const CommanderPassport = React.lazy(() => import('../components/ui/CommanderPassport'));
import HoloCard from '../components/ui/HoloCard';
import PackOpening from '../components/ui/PackOpening';

gsap.registerPlugin(ScrollTrigger);

const SIMULATED_NOTIFICATIONS = [
  "El Comandante Mateo R. se ha unido a la tripulación.",
  "La Comandante Sofía V. aseguró su Pase Estelar.",
  "El Comandante Tomás G. completó su pasaporte de fundador.",
  "La Comandante Laura S. se ha registrado desde CDMX.",
  "El Comandante Alejandro P. activó su acceso anticipado.",
  "La Comandante Valentina D. se unió al waitlist docente."
];

const WaitlistLanding = ({ onNavigate, theme, isLoading, isSplashActive, games = [] }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem('eduplay_subscribed_email');
    return saved ? 'success' : 'idle';
  });
  const [loading, setLoading] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showPassport, setShowPassport] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [activeNotification, setActiveNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  
  const emailInputRef = useRef(null);

  const scrollToWaitlist = () => {
    if (emailInputRef.current) {
      emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        emailInputRef.current.focus();
      }, 850);
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

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

  // Social Proof Simulation Loop
  useEffect(() => {
    let index = 0;
    const triggerNotification = () => {
      setActiveNotification(SIMULATED_NOTIFICATIONS[index]);
      setShowNotification(true);
      
      const hideTimeout = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      
      index = (index + 1) % SIMULATED_NOTIFICATIONS.length;
      return hideTimeout;
    };

    const initialTimeout = setTimeout(() => {
      let hideTimeout = triggerNotification();
      
      const interval = setInterval(() => {
        hideTimeout = triggerNotification();
      }, 15000);

      return () => {
        clearInterval(interval);
        clearTimeout(hideTimeout);
      };
    }, 5000);

    return () => {
      clearTimeout(initialTimeout);
    };
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
      localStorage.setItem('eduplay_is_teacher', isTeacher ? 'true' : 'false');
      setShowPassport(true);
    }, 1200);
  };

  useEffect(() => {
    const isTouchDevice = 
      window.matchMedia('(hover: none) and (pointer: coarse)').matches || 
      (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(hover: hover)').matches);
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
    if (isSplashActive || showPassport) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isSplashActive, showPassport]);

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
    { id: "g1", title: "Aventura Matemática", subject: "Matemáticas", level: "8-10", duration: "10 min", points: 150, color: "from-[#3B6290] to-[#6B8BB4]", bg: "bg-blue-900/10", icon: Zap, image: "g1", description: "Resuelve acertijos matemáticos y sube de nivel entrenando tu cerebro.", tag: "En Desarrollo" },
    { id: "g2", title: "Memoria Espacial", subject: "Memoria", level: "5-7", duration: "5 min", points: 100, color: "from-[#9059C8] to-[#E0B0FF]", bg: "bg-purple-900/10", icon: Brain, image: "g2", description: "Pon a prueba tu retención visual y memoriza los patrones en el espacio.", tag: "En Desarrollo" },
    { id: "g3", title: "Laboratorio Químico", subject: "Ciencias", level: "11-13", duration: "15 min", points: 200, color: "from-[#51759C] to-[#8DA9C4]", bg: "bg-green-900/10", icon: FlaskConical, image: "g3", description: "Combina elementos y experimenta en nuestro laboratorio virtual interactivo.", locked: true }
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
        <div className="sticky top-0 h-100dvh w-full overflow-hidden flex flex-col justify-center items-center bg-transparent text-white z-10 transition-colors duration-300">

          {/* 3D Line Globe Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-5">
            <div className="ep-orbit-wrapper">
              <div className="ep-model-container">
                <model-viewer
                  ref={modelViewerRef}
                  src="/low_poly_earth.glb"
                  class="ep-earth-viewer pointer-events-none"
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
              className="mb-6 flex items-center gap-2 bg-[#6B8BB4]/10 border border-[#6B8BB4]/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#8DA9C4]"
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
              <BlurReveal trigger={!isSplashActive} className="bg-clip-text text-transparent bg-linear-to-r from-[#6B8BB4] to-[#E0B0FF]" delay={0.35}>educativa&nbsp;</BlurReveal>
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
                <Button 
                  type="button"
                  onClick={() => setShowPassport(true)}
                  className="w-full py-3.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/10 active:scale-[0.97]"
                >
                  Ver mi Pasaporte de Comandante 💳
                </Button>
              ) : (<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-[#141923]/60 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-800/60 shadow-md">
                  <input 
                    type="email" 
                    required 
                    aria-label="Correo electrónico"
                    placeholder="Correo de papá, mamá o profesor..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl font-bold text-xs whitespace-nowrap w-full sm:w-auto">
                    {loading ? 'Registrando...' : 'Asegurar mi cupo de Fundador'}
                  </Button>
                </form>
              )}
            </div>

            <div className="flex justify-center gap-6 mt-6 z-25 pointer-events-auto">
              <ShineButton onClick={() => setShowDemoModal(true)} className="text-xs py-2.5 px-5 flex items-center gap-2 bg-transparent border border-[#6B8BB4]/30 text-[#8DA9C4] hover:bg-[#6B8BB4]/10">
                <Play size={14} fill="currentColor"/> Probar Demo Estelar
              </ShineButton>
            </div>
          </div>

          {/* Panel 2: Video/Image Showcase placeholder */}
          <div className="panel-2 absolute inset-0 flex justify-center items-center z-10 pointer-events-none opacity-0">
            <div className="relative w-full max-w-6xl h-full flex flex-col justify-center items-center px-6 pointer-events-auto">
              <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-4 md:p-8 backdrop-blur-md max-w-3xl text-center">
                <Rocket size={48} className="mx-auto mb-4 text-[#E0B0FF] animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-black mb-2 text-white">Órbita del Aprendizaje</h3>
                <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-6">
                  Juegos interactivos donde los cadetes tripulan naves espaciales y resuelven acertijos analíticos alineando estrellas para avanzar.
                </p>
                <div className="w-full aspect-video bg-zinc-950 border border-zinc-800/50 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-lg">
                  {/* Falsa interfaz de juego como video */}
                  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnBub3J5MTV1dTA2c3kzeHJ6azIwYXdoaXRlMjNjZmdpMnpiaGU3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/71fMwwGrFRszyoHhUy/giphy.gif" alt="Demo gameplay" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-400 z-10 bg-zinc-900/80 px-3 py-2 rounded-xl border border-zinc-800">
                    <span className="flex items-center gap-1.5"><Zap size={12} className="text-yellow-400"/> Misión: Ecuaciones Planetarias</span>
                    <span className="font-mono text-[#8DA9C4]">FPS: 60/60</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Premium Features & Stats */}
          <div className="panel-3 absolute inset-0 flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-0 pointer-events-none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-white">
              Aprendizaje que <span className="bg-clip-text text-transparent bg-linear-to-r from-[#8DA9C4] to-[#FDF9E2]">engancha de verdad.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
              <div className="hero-stat-card bg-zinc-900/40 border border-zinc-800/30 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-black text-[#8DA9C4] mb-1">+50</div>
                <div className="font-bold text-white text-base mb-1">Misiones Activas</div>
                <div className="text-zinc-400 text-xs">Desarrolladas por pedagogos y expertos en lógica.</div>
              </div>
              <div className="hero-stat-card bg-zinc-900/40 border border-zinc-800/30 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-black text-[#E0B0FF] mb-1">98%</div>
                <div className="font-bold text-white text-base mb-1">Interés y Enfoque</div>
                <div className="text-zinc-400 text-xs">Asegurado mediante rachas estelares y misiones narrativas.</div>
              </div>
              <div className="hero-stat-card bg-zinc-900/40 border border-zinc-800/30 p-6 rounded-2xl backdrop-blur-sm col-span-1 sm:col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl font-black text-[#FDF9E2] mb-1">100%</div>
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
                <Button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassport(true);
                  }}
                  className="w-full py-3.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/10 active:scale-[0.97]"
                >
                  Ver mi Pasaporte de Comandante 💳
                </Button>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200/20 shadow-md">
                  <input 
                    type="email" 
                    required 
                    aria-label="Correo electrónico"
                    placeholder="Correo de papá, mamá o profesor..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl font-bold text-xs whitespace-nowrap">
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
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal origin="bottom" reset={true}>
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                Exploración que <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8DA9C4] to-[#E0B0FF]">fascina.</span>
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
                  <button onClick={() => setShowDemoModal(true)} className="text-xs font-semibold text-[#8DA9C4] hover:text-blue-300 flex items-center gap-1 mt-2 text-left self-start">
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
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <ScrollReveal origin="bottom" distance={30} reset={true}>
          <FeatureSection onNavigate={(view) => { if (onNavigate && import.meta.env.VITE_WAITLIST_ONLY !== 'true') { onNavigate(view); } else { setShowDemoModal(true); } }} />
        </ScrollReveal>
      </div>

      {/* Misiones de Muestra (Catalog Highlight) */}
      <section className="py-20 md:py-36 relative bg-transparent text-white">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
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
                    <span className="bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5">
                      <Zap size={12} fill="currentColor"/> Probar Demo
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      
      {/* Cartas de Colección Section */}
      <section className="py-20 md:py-36 relative bg-transparent text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal origin="bottom" reset={true}>
              <h2 className="text-4xl lg:text-5xl font-black mb-6">
                ¡Desbloquea y colecciona <br/><span className="text-transparent bg-clip-text bg-linear-to-r from-[#8DA9C4] to-[#E0B0FF]">cartas exclusivas!</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal origin="bottom" delay={0.15} reset={true}>
              <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">
                Cumple con los desafíos educativos en matemáticas, ciencias y lógica para ganar XP. Descubre datos reales del cosmos y obtén cartas de distintos niveles de rareza: <strong>Nauta, Estelar, SuperEstelar, Cosmos y SuperNova</strong>. <br/><br/>
                <span className="text-[#E0B0FF] font-bold px-4 py-2 bg-[#E0B0FF]/10 rounded-full border border-[#E0B0FF]/20 inline-block mt-2 shadow-[0_0_15px_rgba(224,176,255,0.2)]">
                  ✨ ¡Suscríbete a la beta y asegura tu carta edición exclusiva de Fundador Luminauts!
                </span>
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal origin="bottom" delay={0.3} reset={true}>
            {/* Contenedor para @pokemon-cads-holo-effect-v2 */}
            <div className="w-full flex items-center justify-center p-4">
              <div id="pokemon-cards-holo-effect-v2-container" className="w-full flex flex-wrap justify-center gap-6 xl:gap-8 py-8">
                  <PackOpening />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Pricing Teaser section - Zeigarnik / Commitment */}
      <section className="py-20 bg-transparent text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <h2 className="text-3xl font-black mb-4">Membresías Estelares</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <p className="text-sm text-zinc-400 mb-12">Acceso completo para toda la tripulación escolar o familiar (Precios informativos al lanzamiento).</p>
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
                <Button onClick={scrollToWaitlist} variant="secondary" className="w-full text-xs">Unirse al Waitlist</Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal origin="right" distance={40} delay={0.15} reset={true} className="h-full">
              <div className="bg-zinc-900/60 border border-blue-500/30 p-6 rounded-3xl text-left relative flex flex-col justify-between ring-1 ring-blue-500/20 h-full">
                <span className="absolute -top-3 right-4 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-[10px] font-black text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">Fundador</span>
                <div>
                  <h3 className="text-lg font-bold text-[#8DA9C4]">Pase Estelar (Anual)</h3>
                  <div className="text-3xl font-black my-3 text-white">$69<span className="text-xs text-zinc-500 font-normal"> / año</span></div>
                  <ul className="text-xs text-zinc-400 space-y-2 mb-6">
                    <li>• Todo el contenido de por vida</li>
                    <li>• Hasta 3 cuentas de cadetes</li>
                    <li>• Reporte estelar diario en tiempo real</li>
                    <li>• Insignias exclusivas de fundador</li>
                  </ul>
                </div>
                <Button onClick={scrollToWaitlist} className="w-full text-xs bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white">Asegurar Pase de Fundador</Button>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Sección de Características Futuras: Reclutamiento & Lealtad */}
      <section className="py-20 md:py-32 bg-transparent text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#e0b0ff] text-[10px] font-bold uppercase tracking-wider mb-4">
              <Sparkles size={12} className="text-yellow-400" /> Próximamente en el Lanzamiento
            </span>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white tracking-tight">
              Sistemas de Crecimiento & <span className="text-[#e0b0ff]">Fidelización Estelar</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.2} reset={true}>
            <p className="text-sm text-zinc-400 max-w-2xl mx-auto mb-16 font-semibold">
              Cuando despeguemos de forma oficial, los comandantes tendrán acceso a herramientas avanzadas para desbloquear juegos y reducir tarifas.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Card 1: Reclutamiento Estelar */}
            <ScrollReveal origin="bottom" distance={40} delay={0.25} reset={true} className="h-full">
              <div className="bg-zinc-900/30 border border-zinc-850/40 p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-md flex flex-col justify-between h-full group hover:border-[#6B8BB4]/30 transition-all duration-500">
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-[#6b8bb4]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#6b8bb4]/10 transition-colors duration-500" />
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-[#8da9c4]">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Reclutamiento Estelar (Referidos)</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    Invita a otros Comandantes (padres o profesores) a unirse a la tripulación mediante tu enlace de recomendación oficial.
                  </p>
                  
                  {/* Milestones */}
                  <div className="space-y-3 pt-4 border-t border-zinc-850/60 text-xs font-semibold text-zinc-400">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-900/50">
                      <span className="flex items-center gap-2">👤 1 Cadete Invitado</span>
                      <span className="text-zinc-300">Cofre de Avatares Exclusivos</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-900/50">
                      <span className="flex items-center gap-2">👥 3 Cadetes Invitados</span>
                      <span className="text-blue-400">1 Mes Gratis de Pase Estelar</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">🚀 5 Cadetes Invitados</span>
                      <span className="text-[#e0b0ff]">2 Meses Gratis + Credencial Oro</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Rangos de Lealtad */}
            <ScrollReveal origin="bottom" distance={40} delay={0.35} reset={true} className="h-full">
              <div className="bg-zinc-900/30 border border-zinc-850/40 p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-md flex flex-col justify-between h-full group hover:border-[#E0B0FF]/30 transition-all duration-500">
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-[#e0b0ff]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#e0b0ff]/10 transition-colors duration-500" />
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-[#e0b0ff]">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Rangos de Lealtad (Fidelidad)</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    Premiaremos la constancia de tu viaje de aprendizaje. Cada mes que tu suscripción permanezca activa, tu rango aumentará.
                  </p>
                  
                  {/* Loyalty perks list */}
                  <div className="space-y-3 pt-4 border-t border-zinc-850/60 text-xs font-semibold text-zinc-400">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-[10px] font-bold">1</span>
                      <span>Descuentos acumulativos de hasta el 30% mensual.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-[10px] font-bold">2</span>
                      <span>Avatares y coleccionables legendarios de fundador.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-[10px] font-bold">3</span>
                      <span>Acceso anticipado prioritario a nuevos portales de juegos.</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-36 bg-transparent text-white px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
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

      {/* Final CTA Section */}
      <section className="py-36 md:py-48 bg-transparent px-6 lg:px-8 text-center overflow-hidden relative text-zinc-900 dark:text-white">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6B8BB4]/5 dark:bg-[#6B8BB4]/10 rounded-full blur-[160px] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10 text-zinc-900 dark:text-white">
          <ScrollReveal origin="top" distance={30} reset={true}>
            <Rocket size={64} className="mx-auto mb-8 text-[#51759C] dark:text-[#8DA9C4] filter drop-shadow-[0_0_15px_rgba(141,169,196,0.3)]" />
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-zinc-900 dark:text-white">Asegura tu carta de Fundador</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.2} reset={true}>
            <p className="text-xl text-zinc-650 dark:text-zinc-350 mb-10 leading-relaxed font-medium">
              Únete al waitlist oficial hoy. Obtén acceso prioritario al despegue y asegura tus beneficios exclusivos para la primera generación de cadetes.
            </p>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.3} reset={true}>
            <div className="flex-container w-full max-w-lg mx-auto z-20 pointer-events-auto">
              {status === 'success' ? (
                <div className="w-full max-w-md mx-auto flex flex-col gap-6 text-left bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#6B8BB4]/10 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="text-center space-y-2">
                    <span className="bg-blue-500/15 text-blue-400 border border-blue-500/25 text-[10px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase">
                      ESTATUS: REGISTRADO 🟢
                    </span>
                    <h3 className="text-xl font-black text-white">¡Misión de Registro Iniciada!</h3>
                  </div>

                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPassport(true);
                    }}
                    className="w-full py-3.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/10 active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    <span>Ver mi Pasaporte de Comandante 💳</span>
                  </Button>

                  <div className="w-full h-px bg-zinc-800 my-1" />

                  {/* Share/Referral code block directly on page */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                      <Share2 size={14} className="text-[#8DA9C4]" />
                      Invita a otros Comandantes
                    </h4>
                    <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
                      Comparte tu invitación para desbloquear beneficios exclusivos de fundador cuando abramos la estación:
                    </p>
                    
                    <button
                      onClick={async () => {
                        const shareText = `🚀 ¡Acabo de registrarme como Comandante en LumiNauts! Obtén tu credencial estelar para la estación educativa del futuro. Únete a la tripulación aquí: ${window.location.origin}`;
                        try {
                          await navigator.clipboard.writeText(shareText);
                          alert('¡Enlace de invitación copiado al portapapeles!');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="w-full py-3 rounded-xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Copy size={14} />
                      <span>Copiar Enlace de Invitación</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="w-full flex flex-col gap-3 items-center">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-zinc-900/40 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200/20 shadow-md">
                    <input 
                      ref={emailInputRef}
                      type="email" 
                      required 
                      aria-label="Correo electrónico"
                      placeholder="Correo de papá, mamá o profesor..." 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm"
                      disabled={loading}
                    />
                    <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl font-bold text-xs whitespace-nowrap">
                      {loading ? 'Registrando...' : 'Unirse al Waitlist'}
                    </Button>
                  </form>
                  <label className="flex items-center gap-2 text-xs text-zinc-400 font-bold cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={isTeacher} 
                      onChange={(e) => setIsTeacher(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-blue-500 accent-[#6B8BB4] focus:ring-0 focus:ring-offset-0"
                    />
                    <span>¿Eres docente? (Activar para pilotos de aula)</span>
                  </label>
                </div>
              )}
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
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center hover:bg-[#6B8BB4]/10 hover:text-[#8DA9C4] transition-colors cursor-pointer text-zinc-400 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700"><Globe size={18}/></div>
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
                aria-label="Cerrar demo"
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1"
              >
                <X size={18}/>
              </button>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6B8BB4]/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Step 1: Welcome & Mission briefing */}
              {demoStep === 1 && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/15 border border-blue-500/25 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                    <Rocket className="text-[#8DA9C4]" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">Misión: Aventura Estelar</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      ¡Bienvenido Cadete! Estás a punto de pilotar tu primera prueba orbital. Resuelve la coordenada estelar para completar la misión piloto.
                    </p>
                  </div>
                  <Button 
                    onClick={() => setDemoStep(2)}
                    className="w-full py-3 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl text-sm font-bold shadow-lg"
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
                    <span className="font-mono text-[#E0B0FF]">Misión 1/1</span>
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
                        <button onClick={handleRestartDemo} className="block mt-2 text-[#8DA9C4] font-bold hover:underline">Reiniciar Misión</button>
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
                        className="bg-linear-to-r from-blue-500 to-green-400 h-full rounded-full"
                      />
                      <span className="absolute right-2 top-0 text-[8px] font-mono text-zinc-500 leading-none">Nivel 1 (35%)</span>
                    </div>

                    <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-2xl text-left space-y-3">
                      <p className="text-[11px] font-semibold text-zinc-300">
                        🔒 Misiones de Lógica, Memoria y Programación bloqueadas en esta demo de prueba.
                      </p>
                      
              {status === 'success' ? (
                <Button 
                  type="button"
                  onClick={() => setShowPassport(true)}
                  className="w-full py-3.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/10 active:scale-[0.97]"
                >
                  Ver mi Pasaporte de Comandante 💳
                </Button>) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                          <input 
                            type="email" 
                            required
                            aria-label="Correo electrónico"
                            placeholder="Email para guardar racha y notificar..." 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-blue-500 text-xs text-white"
                          />
                          <label className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={isTeacher} 
                              onChange={(e) => setIsTeacher(e.target.checked)}
                              className="w-3.5 h-3.5 rounded border-zinc-800 bg-zinc-900 text-blue-500 accent-[#6B8BB4] focus:ring-0 focus:ring-offset-0"
                            />
                            <span>¿Eres docente? (Activar para pilotos de aula)</span>
                          </label>
                          <Button type="submit" disabled={loading} className="w-full py-2.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl text-xs font-bold">
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

      <AnimatePresence>
        {showPassport && (
          <Suspense fallback={null}>
            <CommanderPassport
              email={email || localStorage.getItem('eduplay_subscribed_email')}
              onClose={() => setShowPassport(false)}
            />
          </Suspense>
        )}
      </AnimatePresence>
      
      {/* Floating Social Proof Notifications */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-6 z-[99] max-w-xs bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md text-left"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Rocket size={14} />
            </div>
            <div className="text-[11px] font-semibold text-zinc-300">
              <span className="text-[10px] font-extrabold text-[#8da9c4] uppercase tracking-wider block mb-0.5">Actividad Reciente</span>
              {activeNotification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default WaitlistLanding;
