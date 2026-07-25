import React, { useState, useEffect, useRef, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Rocket, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

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
import WaitlistDemoModal from '../components/waitlist/WaitlistDemoModal';
import WaitlistActivityToast from '../components/waitlist/WaitlistActivityToast';

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
  const modelViewerRef = useRef(null);
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

  const handleSubmit = (e) => {
    e?.preventDefault();
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

  const handleModalSubmitEmail = ({ email: submittedEmail, isTeacher: submittedIsTeacher }) => {
    setEmail(submittedEmail);
    setIsTeacher(submittedIsTeacher);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      localStorage.setItem('eduplay_subscribed_email', submittedEmail);
      localStorage.setItem('eduplay_is_teacher', submittedIsTeacher ? 'true' : 'false');
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
        .to(".panel-1", { autoAlpha: 0, scale: 0.9, duration: 1.2 })
        .to(".panel-2", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".hero-img-left", { x: "-100vw", rotation: -45, ease: "power2.out", duration: 1.5 }, "<")
        .from(".hero-img-right", { x: "100vw", rotation: 45, ease: "power2.out", duration: 1.5 }, "<")
        .from(".hero-img-center", { y: "100vh", rotation: 0, ease: "power2.out", duration: 1.5 }, "<")
        .to(".panel-2", { autoAlpha: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
        .to(".ep-orbit-wrapper", { scale: 1, duration: 1.5 }, "<")
        .to(".panel-3", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".hero-stat-card", { y: 60, opacity: 0, stagger: 0.2, ease: "back.out(1.7)", duration: 1.2 }, "<")
        .to(".panel-3", { autoAlpha: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
        .to(".panel-4", { autoAlpha: 1, pointerEvents: "auto", duration: 1.2 }, "<")
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
      if (lenis) {
        lenis.destroy();
      }
      if (handleMouseDown) {
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [isSplashActive]);

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

      {/* Pinned Scroll Hero Section */}
      <WaitlistHeroSection
        modelViewerRef={modelViewerRef}
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

      {/* INTERACTIVE DEMO MODAL */}
      <WaitlistDemoModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        status={status}
        onSubmitEmail={handleModalSubmitEmail}
        loading={loading}
        setShowPassport={setShowPassport}
      />

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
