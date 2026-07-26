import React, { useState, useEffect, useRef, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Rocket, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const TwitterIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Base UI components
import PageSkeleton from '../components/ui/PageSkeleton';
import Grainient from '../components/ui/Grainient';
import StarsBg from '../components/ui/StarsBg';
import GitHubStarButton from '../components/ui/GitHubStarButton';
const CommanderPassport = React.lazy(() => import('../components/ui/CommanderPassport'));

// Modular Waitlist components
import WaitlistHeroSection from '../components/waitlist/WaitlistHeroSection';
import WaitlistFeaturesSection from '../components/waitlist/WaitlistFeaturesSection';
import WaitlistGamesSection from '../components/waitlist/WaitlistGamesSection';
import WaitlistCollectionSection from '../components/waitlist/WaitlistCollectionSection';
import WaitlistParentsSection from '../components/waitlist/WaitlistParentsSection';
import WaitlistCTASection from '../components/waitlist/WaitlistCTASection';
import WaitlistActivityToast from '../components/waitlist/WaitlistActivityToast';
import WaitlistLegalPage from '../components/waitlist/WaitlistLegalPage';
import WaitlistFAQSection from '../components/waitlist/WaitlistFAQSection';
import CosmicParticleExplosion from '../components/ui/CosmicParticleExplosion';
import { validateEmailSyntax } from '../utils/emailValidator';

const WaitlistDemoModal = React.lazy(() => import('../components/waitlist/WaitlistDemoModal'));
const LegalInfoModal = React.lazy(() => import('../components/ui/LegalInfoModal'));

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
  const [legalModalType, setLegalModalType] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [activeNotification, setActiveNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [activeView, setActiveView] = useState('landing');
  
  const emailInputRef = useRef(null);

  // Hash Navigation Handler for Privacy & Terms Pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') {
        setActiveView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#terms') {
        setActiveView('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveView('landing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard Navigation for Hero Panels & Accessibility ($impeccable adapt)
  useEffect(() => {
    if (activeView !== 'landing') return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        window.scrollBy({ top: -window.innerHeight * 0.75, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView]);
  const [modelViewerElement, setModelViewerElement] = useState(null);
  const lenisRef = useRef(null);

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
      setSubscriberCount(prev => prev + (Math.random() > 0.5 ? 1 : 2));
    }, 12000 + Math.random() * 8000);

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

  const [celebrationBursts, setCelebrationBursts] = useState([]);

  const triggerCelebration = () => {
    const coords = [
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.35 },
      { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.6 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.55 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.25 }
    ];

    coords.forEach((coord, idx) => {
      setTimeout(() => {
        setCelebrationBursts(prev => [...prev, { id: `burst-${Date.now()}-${idx}-${Math.random()}`, ...coord }]);
      }, idx * 140);
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!email) return;

    if (!validateEmailSyntax(email)) {
      const emailInput = e?.target?.querySelector('input[type="email"]');
      if (emailInput) {
        emailInput.setCustomValidity("Por favor, ingresa una dirección de correo válida (ejemplo: usuario@dominio.com).");
        emailInput.reportValidity();
      }
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      localStorage.setItem('eduplay_subscribed_email', email);
      localStorage.setItem('eduplay_is_teacher', isTeacher ? 'true' : 'false');
      triggerCelebration();
      setTimeout(() => {
        setShowPassport(true);
      }, 800);
    }, 1200);
  };

  const handleModalSubmitEmail = ({ email: submittedEmail, isTeacher: submittedIsTeacher }) => {
    if (!validateEmailSyntax(submittedEmail)) {
      // Si viene del modal y falla la validación, ignoramos o podríamos manejarlo. 
      // Pero el modal mismo ya lo validará en su UI.
      return;
    }

    setEmail(submittedEmail);
    setIsTeacher(submittedIsTeacher);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      localStorage.setItem('eduplay_subscribed_email', submittedEmail);
      localStorage.setItem('eduplay_is_teacher', submittedIsTeacher ? 'true' : 'false');
      triggerCelebration();
      setTimeout(() => {
        setShowPassport(true);
      }, 800);
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

      const mm = gsap.matchMedia();
      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Mobile/Tablet: Centered, scale up to 1.6
      mm.add("(max-width: 1023px)", () => {
        gsap.set(".panel-2, .panel-3, .panel-4", { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(".panel-1", { autoAlpha: 1, pointerEvents: "auto" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });

        if (modelViewerElement && !hasReducedMotion) {
          gsap.set(modelViewerElement, { attr: { "camera-orbit": "0deg 75deg 105%" } });
        }

        tl.fromTo(".ep-orbit-wrapper", 
          { scale: 1, y: "20%", opacity: 0.5 }, 
          { scale: 1, y: "0%", opacity: 1, duration: 2.2, ease: "power2.out" }
        )
          .to(".panel-1", { autoAlpha: 0, pointerEvents: "none", scale: 1, duration: 1.2 })
          .to(".panel-2", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<");

        if (modelViewerElement && !hasReducedMotion) {
          tl.to(modelViewerElement, { attr: { "camera-orbit": "160deg 180deg 105%" }, duration: 1.2, ease: "power1.inOut" }, "<");
        }

        tl.to(".panel-2", { autoAlpha: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
          .to(".ep-orbit-wrapper", { scale: 1, duration: 1.5 }, "<")
          .to(".panel-3", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<");

        if (modelViewerElement && !hasReducedMotion) {
          tl.to(modelViewerElement, { attr: { "camera-orbit": "520deg 0deg 105%" }, duration: 1.2, ease: "power1.inOut" }, "<");
        }

        tl.from(".hero-stat-card", { y: 60, opacity: 0, stagger: 0.2, ease: "back.out(1.7)", duration: 1.2 }, "<")
          .to(".panel-3", { autoAlpha: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
          .to(".panel-4", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<");

        if (modelViewerElement && !hasReducedMotion) {
          tl.to(modelViewerElement, { attr: { "camera-orbit": "780deg 75deg 105%" }, duration: 1.2, ease: "power1.inOut" }, "<");
        }

        tl.from(".panel-4 h2, .panel-4 p, .panel-4 .flex-container", { y: 40, opacity: 0, stagger: 0.15, ease: "power3.out", duration: 1.2 }, "<")
          .to(".ep-orbit-wrapper", { scale: 1, opacity: 1, duration: 1.5, ease: "power1.inOut" }, "<");
      });

      // Desktop/PC: Split layout on right side, scale limited to 1.05
      mm.add("(min-width: 1024px)", () => {
        gsap.set(".panel-2, .panel-3, .panel-4", { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(".panel-1", { autoAlpha: 1, pointerEvents: "auto" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });

        if (modelViewerElement && !hasReducedMotion) {
          gsap.set(modelViewerElement, { attr: { "camera-orbit": "0deg 75deg 105%" } });
        }

        tl.fromTo(".ep-orbit-wrapper", 
          { scale: 1, y: "10%", opacity: 0.5 }, 
          { scale: 1, y: "0%", opacity: 1, duration: 2.2, ease: "power2.out" }
        )
          .to(".panel-1", { autoAlpha: 0, pointerEvents: "none", scale: 1, duration: 1.2 })
          .to(".panel-2", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<");

        if (modelViewerElement && !hasReducedMotion) {
          tl.to(modelViewerElement, { attr: { "camera-orbit": "160deg 180deg 105%" }, duration: 1.2, ease: "power1.inOut" }, "<");
        }

        tl.to(".panel-2", { autoAlpha: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
          .to(".ep-orbit-wrapper", { scale: 1, duration: 1.5 }, "<")
          .to(".panel-3", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<");

        if (modelViewerElement && !hasReducedMotion) {
          tl.to(modelViewerElement, { attr: { "camera-orbit": "520deg 0deg 105%" }, duration: 1.2, ease: "power1.inOut" }, "<");
        }

        tl.from(".hero-stat-card", { y: 40, opacity: 0, stagger: 0.2, ease: "power2.out", duration: 1.2 }, "<")
          .to(".panel-3", { autoAlpha: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
          .to(".panel-4", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<");

        if (modelViewerElement && !hasReducedMotion) {
          tl.to(modelViewerElement, { attr: { "camera-orbit": "780deg 75deg 105%" }, duration: 1.2, ease: "power1.inOut" }, "<");
        }

        tl.from(".panel-4 h2, .panel-4 p, .panel-4 .flex-container", { y: 30, opacity: 0, stagger: 0.15, ease: "power3.out", duration: 1.2 }, "<")
          .to(".ep-orbit-wrapper", { scale: 1, opacity: 1, duration: 1.5, ease: "power1.inOut" }, "<");
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      if (lenis) {
        lenis.destroy();
      }
      if (handleMouseDown) {
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [isSplashActive, modelViewerElement]);

  if (isLoading) {
    return <PageSkeleton view="landing" />;
  }

  return (
    <div className={`min-h-screen bg-zinc-950 text-white transition-all duration-700 relative ${isLoading ? 'blur-md opacity-40 pointer-events-none' : 'blur-none opacity-100'}`}>
      
      {/* Global Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Grainient scrollSpeed={0.3} />
        <StarsBg className="opacity-100" />
      </div>

      {/* Main Content Area: Landing or Full Legal Page View */}
      <main id="main-content" className="relative z-10">
        {activeView !== 'landing' ? (
          <WaitlistLegalPage
            view={activeView}
            onBack={() => {
              setActiveView('landing');
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            <WaitlistHeroSection
              modelViewerRef={setModelViewerElement}
              subscriberCount={subscriberCount}
              isSplashActive={isSplashActive}
              status={status}
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              loading={loading}
              setShowPassport={setShowPassport}
              setShowDemoModal={setShowDemoModal}
            />

            {/* Feature / Category Highlights */}
            <WaitlistFeaturesSection onShowDemoModal={() => setShowDemoModal(true)} />

            {/* Misiones de Muestra (Catalog Highlight) */}
            <WaitlistGamesSection games={games} onShowDemoModal={() => setShowDemoModal(true)} />
            
            {/* Cartas de Colección Section & Pricing */}
            <WaitlistCollectionSection onWaitlistClick={scrollToWaitlist} />
            
            {/* Loyalty Perks & Testimonials */}
            <WaitlistParentsSection />

            {/* Preguntas Frecuentes (FAQ) */}
            <WaitlistFAQSection />

            {/* Final CTA Section */}
            <WaitlistCTASection
              status={status}
              setShowPassport={setShowPassport}
              handleSubmit={handleSubmit}
              emailInputRef={emailInputRef}
              email={email}
              setEmail={setEmail}
              loading={loading}
              isTeacher={isTeacher}
              setIsTeacher={setIsTeacher}
            />
          </>
        )}
      </main>

      {/* Render active celebration starbursts */}
      {celebrationBursts.map(burst => (
        <CosmicParticleExplosion
          key={burst.id}
          active={true}
          x={burst.x}
          y={burst.y}
          onComplete={() => {
            setCelebrationBursts(prev => prev.filter(item => item.id !== burst.id));
          }}
        />
      ))}

      {/* Redesigned Footer (Inspired by GhostPoly & Cooldock) */}
      <footer className="relative z-10 bg-transparent border-t border-zinc-900/80 pt-20 pb-12 px-6 lg:px-8 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto">
          {/* Top Multi-column Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Col 1: Brand & Bio (Cooldock style) */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-white">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#9059C8]/30 to-[#6B8BB4]/30 border border-white/10 flex items-center justify-center text-[#E0B0FF]">
                    <Rocket size={22} />
                  </div>
                  <span className="font-extrabold text-2xl tracking-tight">LumiNauts</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-[#8DA9C4]">
                    Beta 2026
                  </span>
                </div>
                <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-6 font-medium">
                  La estación estelar interactiva donde la ciencia, las matemáticas y el aprendizaje gamificado convergen para inspirar a la nueva generación de exploradores.
                </p>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub LumiNauts" className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors">
                  <GithubIcon size={16} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" title="X / Twitter" className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#8DA9C4] hover:border-zinc-700 transition-colors">
                  <TwitterIcon size={16} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-zinc-700 transition-colors">
                  <YoutubeIcon size={16} />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3">
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
                Exploración Estelar
              </h3>
              <ul className="space-y-3.5 text-zinc-500 font-medium flex flex-col items-start">
                <li>
                  <button 
                    onClick={() => {
                      if (activeView !== 'landing') {
                        setActiveView('landing');
                        window.location.hash = '';
                        setTimeout(() => scrollToSection('section-waitlist-games'), 200);
                      } else {
                        scrollToSection('section-waitlist-games');
                      }
                    }} 
                    className="hover:text-[#E0B0FF] transition-colors text-left cursor-pointer flex items-center gap-2"
                  >
                    Misiones y Juegos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      if (activeView !== 'landing') {
                        setActiveView('landing');
                        window.location.hash = '';
                        setTimeout(() => scrollToSection('section-waitlist-collection'), 200);
                      } else {
                        scrollToSection('section-waitlist-collection');
                      }
                    }} 
                    className="hover:text-[#8DA9C4] transition-colors text-left cursor-pointer flex items-center gap-2"
                  >
                    Holocards de Colección
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      if (activeView !== 'landing') {
                        setActiveView('landing');
                        window.location.hash = '';
                        setTimeout(() => scrollToSection('section-waitlist-future-perks'), 200);
                      } else {
                        scrollToSection('section-waitlist-future-perks');
                      }
                    }} 
                    className="hover:text-[#8DA9C4] transition-colors text-left cursor-pointer"
                  >
                    Beneficios Comandante
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      if (activeView !== 'landing') {
                        setActiveView('landing');
                        window.location.hash = '';
                        setTimeout(() => scrollToSection('section-waitlist-pricing'), 200);
                      } else {
                        scrollToSection('section-waitlist-pricing');
                      }
                    }} 
                    className="hover:text-[#8DA9C4] transition-colors text-left cursor-pointer"
                  >
                    Suscripciones Beta
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal & Support (GhostPoly style) */}
            <div className="md:col-span-4">
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">
                Legal & Soporte
              </h3>
              <ul className="space-y-3.5 text-zinc-500 font-medium flex flex-col items-start mb-6">
                <li>
                  <button 
                    onClick={() => {
                      setActiveView('privacy');
                      window.location.hash = 'privacy';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className={`hover:text-[#8DA9C4] transition-colors text-left cursor-pointer ${activeView === 'privacy' ? 'text-[#8DA9C4] font-bold' : ''}`}
                  >
                    Política de Privacidad (COPPA/GDPR-K)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setActiveView('terms');
                      window.location.hash = 'terms';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className={`hover:text-[#E0B0FF] transition-colors text-left cursor-pointer ${activeView === 'terms' ? 'text-[#E0B0FF] font-bold' : ''}`}
                  >
                    Términos de Servicio del Portal
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalType('cookies')} 
                    className="hover:text-[#8DA9C4] transition-colors text-left cursor-pointer"
                  >
                    Declaración de Cookies
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalType('contact')} 
                    className="hover:text-[#8DA9C4] transition-colors text-left cursor-pointer"
                  >
                    Contacto con Control de Misión
                  </button>
                </li>
              </ul>

              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] text-zinc-500">
                <span className="font-bold text-zinc-300 block mb-0.5">🛡️ Entorno Protegido para Cadetes</span>
                Plataforma 100% libre de anuncios, rastreo comercial y microtransacciones no supervisadas.
              </div>
            </div>

          </div>

          {/* Sub-footer / Legal Copyright Bar (GhostPoly style) */}
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 font-medium">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left text-[11px]">
              <p>© 2026 LumiNauts Educational Tech. Todos los derechos reservados.</p>
              <span className="hidden sm:inline text-zinc-700">•</span>
              <span className="text-zinc-600">Registro Beta Abierto</span>
            </div>
            <div className="flex items-center gap-4">
              <GitHubStarButton />
              <div 
                onClick={() => setLegalModalType('privacy')} 
                title="Seguridad e Idioma Estelar"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#6B8BB4]/10 hover:text-[#8DA9C4] transition-colors cursor-pointer text-zinc-400"
              >
                <Globe size={16}/>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE DEMO MODAL */}
      <Suspense fallback={null}>
        {showDemoModal && (
          <WaitlistDemoModal
            isOpen={showDemoModal}
            onClose={() => setShowDemoModal(false)}
            status={status}
            onSubmitEmail={handleModalSubmitEmail}
            loading={loading}
            setShowPassport={setShowPassport}
          />
        )}

        {/* LEGAL & CONTACT MODAL */}
        {legalModalType && (
          <LegalInfoModal
            type={legalModalType}
            isOpen={!!legalModalType}
            onClose={() => setLegalModalType(null)}
          />
        )}
      </Suspense>

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
      <WaitlistActivityToast show={showNotification} text={activeNotification} />

    </div>
  );
};

export default WaitlistLanding;
