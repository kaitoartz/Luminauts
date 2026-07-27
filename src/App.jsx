import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BookOpen, FlaskConical, Shield, Globe, XCircle, Lock, Cookie as CookieIcon } from 'lucide-react';
import './styles/main.css';

// Data
import { MOCK_GAMES, parseApiResponsePayload } from './data/mockData';

// UI Components
import Button from './components/ui/Button';
import AstronautLoader from './components/ui/AstronautLoader';
import { FrostedGlassCard } from './components/ui/interactive-frosted-glass-card';
import LegalInfoModal from './components/ui/LegalInfoModal';

// Layout Components
import Navbar from './components/Navbar';
import ModalWaitlistForm from './components/ModalWaitlistForm';
import ClickSpark from './components/ui/ClickSpark';

// Page Views (Lazy Loaded)
const Landing = lazy(() => import('./pages/Landing'));
const WaitlistLanding = lazy(() => import('./pages/WaitlistLanding'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const QuizGame = lazy(() => import('./pages/QuizGame'));
const ParentsPanel = lazy(() => import('./pages/ParentsPanel'));
const ProfilePanel = lazy(() => import('./pages/ProfilePanel'));
const PricingPanel = lazy(() => import('./pages/PricingPanel'));
const Adventure = lazy(() => import('./pages/Adventure'));

const App = () => {
  const isWaitlistMode = import.meta.env.VITE_WAITLIST_ONLY === 'true';
  const [view, setView] = useState('landing');
  const [showSplash, setShowSplash] = useState(true);
  const [params, setParams] = useState({});
  const [lockedGame, setLockedGame] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null);
  const [isTostadora] = useState(() => {
    const connection = navigator.connection;
    const isSlowNetwork = connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    const isLowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isLowRam = navigator.deviceMemory && navigator.deviceMemory <= 4;
    return !!(isSlowNetwork || isLowCpu || isLowRam);
  });
  const [showCookies, setShowCookies] = useState(() => {
    const saved = localStorage.getItem('eduplay_cookie_consent');
    return saved !== 'accepted';
  });
  
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('eduplay_theme');
    return saved || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('eduplay_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (showSplash && !isWaitlistMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showSplash, isWaitlistMode]);

  useEffect(() => {
    let interval;
    if (pageLoading) {
      setShowProgress(true);
      setLoadingProgress(0);
      
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev < 80) {
            const diff = Math.max(1, Math.floor((80 - prev) / 3));
            return prev + diff;
          }
          return prev;
        });
      }, 60);
    } else {
      if (showProgress) {
        setLoadingProgress(100);
        const timeout = setTimeout(() => {
          setShowProgress(false);
          setLoadingProgress(0);
        }, 400);
        return () => clearTimeout(timeout);
      }
    }
    return () => clearInterval(interval);
  }, [pageLoading]);

  // Estado del Usuario
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eduplay_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error al cargar perfil", e);
      }
    }
    return {
      name: "Aventurero",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aventurero&backgroundColor=ffdfbf",
      level: 1,
      xp: 0,
      nextLevelXp: 100,
      streak: 1,
      completedChallenges: 0,
      badges: [
        { id: 1, name: "Matemático Veloz", color: "text-yellow-500", bg: "bg-yellow-100" }
      ]
    };
  });

  const saveUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('eduplay_user', JSON.stringify(updatedUser));
  };

  const addXp = (amount) => {
    let newXp = user.xp + amount;
    let newLevel = user.level;
    let newNextLevelXp = user.nextLevelXp;

    while (newXp >= newNextLevelXp) {
      newXp -= newNextLevelXp;
      newLevel += 1;
      newNextLevelXp = newLevel * 200;
    }

    let newBadges = [...(user.badges || [])];
    if (newLevel >= 2 && !newBadges.some(b => b.id === 4)) {
      newBadges.push({ id: 4, name: "Super Aprendiz", color: "text-purple-500", bg: "bg-purple-100" });
    }
    if (newLevel >= 5 && !newBadges.some(b => b.id === 5)) {
      newBadges.push({ id: 5, name: "Héroe Educativo", color: "text-amber-500", bg: "bg-amber-100" });
    }

    const updated = {
      ...user,
      xp: newXp,
      level: newLevel,
      nextLevelXp: newNextLevelXp,
      completedChallenges: (user.completedChallenges || 0) + 1,
      badges: newBadges
    };
    saveUser(updated);
  };

  // Estado de la API
  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('eduplay_api_url') || '');
  const [inputUrl, setInputUrl] = useState(() => localStorage.getItem('eduplay_api_url') || '');
  const [apiStatus, setApiStatus] = useState('disconnected');
  const [games, setGames] = useState(MOCK_GAMES);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigate = (newView, newParams = {}) => {
    if (newView === 'adventure' && !import.meta.env.DEV) {
      setLockedGame({ title: 'Aventura Estelar' });
      return;
    }
    setView(newView);
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPageLoading(true);
    
    const connection = navigator.connection;
    const isSlow = connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    const delay = isSlow ? 1500 : 800;

    setTimeout(() => {
      setPageLoading(false);
    }, delay);
  };

  const loadApiGames = async (urlToTest) => {
    if (!urlToTest) {
      setGames(MOCK_GAMES);
      setApiStatus('disconnected');
      return false;
    }

    setApiStatus('connecting');
    let cleanUrl = urlToTest.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'http://' + cleanUrl;
    }

    try {
      cleanUrl = cleanUrl.replace(/\/$/, "");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${cleanUrl}/juegos`, { 
        mode: 'cors',
        headers: {
          "ngrok-skip-browser-warning": "true"
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Error en respuesta del servidor");
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = parseApiResponsePayload(text);
      }
      if (!Array.isArray(data)) throw new Error("Formato de datos inesperado");

      const apiGamesMapped = data.map((g, index) => {
        const title = g.titulo || g.title || `Juego ${index + 1}`;
        const normalizedTitle = title.toLowerCase();
        const subject = normalizedTitle.includes('matem') ? 'Matemáticas'
          : normalizedTitle.includes('letras') ? 'Lectura'
          : normalizedTitle.includes('ciencia') || normalizedTitle.includes('explorador') ? 'Ciencias'
          : 'General';
        const icon = normalizedTitle.includes('matem') ? Zap
          : normalizedTitle.includes('letras') ? BookOpen
          : normalizedTitle.includes('ciencia') || normalizedTitle.includes('explorador') ? FlaskConical
          : Shield;

        return {
          id: `api-${g.id ?? index}`,
          title,
          subject,
          level: 'Todas',
          duration: g.duracion || '5 min',
          points: g.puntos ?? 100,
          color: subject === 'Matemáticas' ? 'from-blue-500 to-cyan-400' : subject === 'Lectura' ? 'from-red-500 to-pink-400' : 'from-green-500 to-emerald-400',
          bg: subject === 'Matemáticas' ? 'bg-blue-50' : subject === 'Lectura' ? 'bg-red-50' : 'bg-green-50',
          icon,
          image: g.imagen || g.image,
          description: g.descripcion || g.description || 'Explora este juego educativo.',
          isApi: true
        };
      });

      setGames([...apiGamesMapped, ...MOCK_GAMES]);
      setApiStatus('connected');
      return true;
    } catch (err) {
      console.error("Error al conectar con la API:", err);
      setGames(MOCK_GAMES);
      setApiStatus('disconnected');
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      const start = performance.now();
      if (apiUrl) {
        await loadApiGames(apiUrl);
      }
      const end = performance.now();
      const loadTime = end - start;
      const buffer = Math.max(1500, loadTime + 200);
      setTimeout(() => setAppLoading(false), buffer);
    };
    init();
  }, [apiUrl]);

  const handleTestConnection = async () => {
    await loadApiGames(inputUrl);
  };

  const handleSaveSettings = async () => {
    await loadApiGames(inputUrl);
    localStorage.setItem('eduplay_api_url', inputUrl.trim());
    setApiUrl(inputUrl.trim());
    setIsSettingsOpen(false);
  };

  const views = {
    landing: isWaitlistMode ? (
      <WaitlistLanding 
        onNavigate={navigate} 
        games={games} 
        theme={theme} 
        isLoading={isTostadora && pageLoading && view === 'landing'} 
        isSplashActive={false} 
      />
    ) : (
      <Landing 
        onNavigate={navigate} 
        onLockClick={setLockedGame} 
        games={games} 
        theme={theme} 
        isLoading={isTostadora && pageLoading && view === 'landing'} 
        isSplashActive={showSplash} 
      />
    ),
    catalog: <Catalog onNavigate={navigate} onLockClick={setLockedGame} games={games} theme={theme} isLoading={isTostadora && pageLoading && view === 'catalog'} />,
    dashboard: <Dashboard onNavigate={navigate} user={user} onAddXp={addXp} isLoading={isTostadora && pageLoading && view === 'dashboard'} />,
    game: <QuizGame onNavigate={navigate} onAddXp={addXp} gameId={params.gameId} games={games} apiUrl={apiUrl} />,
    parents: <ParentsPanel onNavigate={navigate} isLoading={isTostadora && pageLoading && view === 'parents'} />,
    profile: <ProfilePanel onNavigate={navigate} user={user} onSaveUser={saveUser} isLoading={isTostadora && pageLoading && view === 'profile'} />,
    pricing: <PricingPanel onNavigate={navigate} isLoading={isTostadora && pageLoading && view === 'pricing'} />,
    adventure: <Adventure onNavigate={navigate} user={user} />
  };

  const activeView = isWaitlistMode ? 'landing' : view;

  if (appLoading && !isWaitlistMode) {
    return <AstronautLoader />;
  }

  return (
    <ClickSpark sparkColor="#E0B0FF" sparkSize={14} sparkRadius={24} sparkCount={10} duration={400}>
      <div className="w-full min-h-screen relative font-sans text-zinc-100 bg-[#141923] selection:bg-blue-800 selection:text-white">
        {/* Top progress bar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 h-1.5 z-9999 bg-white/10 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className="h-full bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] relative"
            >
              <div className="absolute right-0 top-3 bg-zinc-900/90 border border-zinc-800 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 transform translate-x-1/2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                {loadingProgress}%
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar 
        currentView={activeView} 
        onNavigate={navigate} 
        apiStatus={apiStatus} 
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        onOpenSettings={() => {
          setInputUrl(apiUrl);
          setIsSettingsOpen(true);
        }} 
        isWaitlistMode={isWaitlistMode}
        onJoinClick={() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeView} 
          initial={{ opacity: 0, filter: 'blur(10px)' }} 
          animate={{ 
            opacity: pageLoading && !isTostadora ? 0.6 : 1, 
            filter: pageLoading && !isTostadora ? 'blur(6px)' : 'blur(0px)' 
          }} 
          exit={{ opacity: 0, filter: 'blur(10px)' }} 
          transition={{ duration: 0.4 }}
        >
          <Suspense fallback={isWaitlistMode ? null : <AstronautLoader />}>
            {views[activeView]}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Modal de Configuración de API - Dark Cosmic Theme */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md"
            style={{ zIndex: 100 }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 p-8 md:p-10 w-full max-w-lg shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setIsSettingsOpen(false)} 
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <XCircle size={20} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[#8DA9C4] flex items-center justify-center">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Configuración de API</h3>
                  <p className="text-sm text-zinc-400 font-medium">Conecta el portal con el servidor FastAPI local</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-300 mb-2">URL del Túnel Ngrok / Localhost</label>
                  <input 
                    type="text" 
                    value={inputUrl} 
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://xxxx-xxxx.ngrok-free.app" 
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-[#8DA9C4] focus:outline-none font-medium text-white transition-colors text-base"
                  />
                  <p className="text-xs text-zinc-400 mt-2 font-medium">Pega la URL pública generada por Ngrok (ej: `ngrok http 8000`).</p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-zinc-400">Estado de Conexión:</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${apiStatus === 'connected' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : apiStatus === 'connecting' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                      {apiStatus === 'connected' ? 'Conectado' : apiStatus === 'connecting' ? 'Probando...' : 'Desconectado'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    {apiStatus === 'connected' 
                      ? '¡Excelente! Los juegos de la API han sido cargados e integrados al catálogo con éxito.' 
                      : apiStatus === 'connecting' 
                      ? 'Intentando contactar al servidor...' 
                      : 'No pudimos conectar con el servidor local de juegos. Asegúrate de iniciar tu servidor FastAPI local (ej: uvicorn) y de que la URL sea correcta.'}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="secondary" 
                    onClick={handleTestConnection}
                    className="flex-1 py-4"
                    disabled={apiStatus === 'connecting'}
                  >
                    Probar Conexión
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSaveSettings}
                    className="flex-1 py-4 shadow-blue-500/20"
                    disabled={apiStatus === 'connecting'}
                  >
                    Guardar y Cerrar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Juego Bloqueado / Waitlist - Dark Cosmic Theme */}
      <AnimatePresence>
        {lockedGame && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md"
            style={{ zIndex: 110 }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 p-8 md:p-10 w-full max-w-lg shadow-2xl relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-2xl z-0"></div>
              
              <button 
                onClick={() => setLockedGame(null)} 
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors z-10"
              >
                <XCircle size={20} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-[#E0B0FF] flex items-center justify-center mb-6">
                  <Lock size={32} />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-2">¡Próximamente en EduPlay Pro!</h3>
                <p className="text-zinc-400 font-medium text-base mb-6">
                  El juego <strong className="text-white font-bold">"{lockedGame.title}"</strong> y más de 30 aventuras interactivas avanzadas estarán disponibles muy pronto.
                </p>

                <ModalWaitlistForm gameTitle={lockedGame.title} onFinish={() => setLockedGame(null)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Consent Card - Dark Cosmic Glass Surface */}
      <AnimatePresence>
        {showCookies && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
            className="fixed right-6 left-6 sm:left-auto max-w-[calc(100vw-3rem)] sm:max-w-[340px] z-[9999] flex justify-center"
          >
            <div className="bg-zinc-900/95 border border-zinc-800 p-5 rounded-2xl shadow-2xl backdrop-blur-xl text-left space-y-3">
              <div className="flex items-center gap-2">
                <CookieIcon size={18} className="text-[#FDF9E2]" />
                <p className="font-extrabold text-sm text-white">Privacidad y Cookies</p>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Utilizamos cookies para garantizar la mejor experiencia en el portal espacial.{' '}
                <button 
                  onClick={() => setLegalModalType('cookies')}
                  className="text-[#8DA9C4] font-bold hover:underline"
                >
                  Leer políticas de cookies
                </button>.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Button 
                  size="sm"
                  variant="primary"
                  className="flex-1 py-2 rounded-xl text-xs font-bold" 
                  onClick={() => { localStorage.setItem('eduplay_cookie_consent', 'accepted'); setShowCookies(false); }}
                >
                  Aceptar
                </Button>
                <Button 
                  size="sm"
                  variant="secondary"
                  className="flex-1 py-2 rounded-xl text-xs font-bold" 
                  onClick={() => setShowCookies(false)}
                >
                  Rechazar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legal & Info Modal */}
      <LegalInfoModal 
        type={legalModalType} 
        isOpen={!!legalModalType} 
        onClose={() => setLegalModalType(null)} 
      />

      {/* Entry Splash Overlay */}
      <AnimatePresence>
        {!isWaitlistMode && showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } 
            }}
            className="fixed inset-0 z-999 flex items-center justify-center bg-zinc-950/70"
            style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 0.92,
                transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] }
              }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
            >
              <FrostedGlassCard onEnter={() => setShowSplash(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </ClickSpark>
  );
};

export default App;