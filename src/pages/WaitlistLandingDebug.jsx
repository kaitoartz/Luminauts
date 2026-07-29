import React, { useState, useEffect, useRef, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Rocket, Globe, ShieldCheck, Eye, EyeOff, ShieldAlert } from 'lucide-react';

// Base UI components
import PageSkeleton from '../components/ui/PageSkeleton';
import Grainient from '../components/ui/Grainient';
import StarsBg from '../components/ui/StarsBg';
import GitHubStarButton from '../components/ui/GitHubStarButton';
const CommanderPassport = React.lazy(() => import('../components/ui/CommanderPassport'));

// Modular Waitlist components (Debug Hero)
import WaitlistHeroSectionDebug from '../components/waitlist/WaitlistHeroSectionDebug';
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

const SIMULATED_NOTIFICATIONS = [
  "El Comandante Mateo R. se ha unido a la tripulación.",
  "La Comandante Sofía V. aseguró su Pase Estelar."
];

const WaitlistLandingDebug = ({ onNavigate, theme, isLoading, isSplashActive, games = [] }) => {
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
  const [modelViewerElement, setModelViewerElement] = useState(null);

  // Section visibility toggles for "La técnica del hacha" (Descarte por eliminación)
  const [sections, setSections] = useState({
    hero: true,
    features: true,
    games: true,
    collection: true,
    parents: true,
    faq: true,
    cta: true,
    footer: true
  });

  const toggleSection = (key) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToWaitlist = () => {
    if (emailInputRef.current) {
      emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const [subscriberCount, setSubscriberCount] = useState(1482);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
    }, 800);
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-zinc-950 text-white relative font-sans">
      
      {/* GLOBAL DEBUG FLOATING CONTROL PANEL */}
      <div className="fixed top-2 left-2 right-2 z-999 bg-red-950/90 border-2 border-red-500/80 rounded-2xl p-3 text-xs text-white shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between font-bold border-b border-red-800/60 pb-2 mb-2">
          <div className="flex items-center gap-2 text-red-300">
            <ShieldAlert size={16} className="animate-bounce" />
            <span>DEBUG MOBILE: LENIS & GSAP DESACTIVADOS</span>
          </div>
          <span className="bg-red-900/60 text-red-200 px-2 py-0.5 rounded font-mono text-[10px]">#debug</span>
        </div>
        
        <p className="text-zinc-300 text-[11px] mb-2 font-medium">
          Técnica del hacha: Oculta secciones para aislar cuál genera el salto/jank en Safari.
        </p>

        <div className="flex flex-wrap gap-1.5">
          {Object.keys(sections).map((secKey) => (
            <button
              key={secKey}
              onClick={() => toggleSection(secKey)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                sections[secKey] 
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-zinc-800 text-zinc-500 border border-zinc-700 line-through'
              }`}
            >
              {sections[secKey] ? <Eye size={12} /> : <EyeOff size={12} />}
              {secKey.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-28"></div>

      {/* Global Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Grainient scrollSpeed={0.3} />
        <StarsBg className="opacity-100" />
      </div>

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        {sections.hero && (
          <WaitlistHeroSectionDebug
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
        )}

        {sections.features && (
          <WaitlistFeaturesSection onShowDemoModal={() => setShowDemoModal(true)} />
        )}

        {sections.games && (
          <WaitlistGamesSection games={games} onShowDemoModal={() => setShowDemoModal(true)} />
        )}
        
        {sections.collection && (
          <WaitlistCollectionSection onWaitlistClick={scrollToWaitlist} />
        )}
        
        {sections.parents && (
          <WaitlistParentsSection />
        )}

        {sections.faq && (
          <WaitlistFAQSection />
        )}

        {sections.cta && (
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
        )}
      </main>

      {/* Footer */}
      {sections.footer && (
        <footer className="relative z-10 bg-transparent border-t border-zinc-900/80 pt-16 pb-12 px-6 text-zinc-400 text-xs text-center">
          <div className="max-w-7xl mx-auto">
            <p>© 2026 LumiNauts Educational Tech. MODO DEBUG ACTIVO.</p>
          </div>
        </footer>
      )}

    </div>
  );
};

export default WaitlistLandingDebug;
