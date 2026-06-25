import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BookOpen, FlaskConical, Shield, Globe, XCircle, Lock } from 'lucide-react';
import './styles/main.css';

// Data
import { MOCK_GAMES, parseApiResponsePayload } from './data/mockData';

// UI Components
import Button from './components/ui/Button';
import AstronautLoader from './components/ui/AstronautLoader';
import { FrostedGlassCard } from './components/ui/interactive-frosted-glass-card';

// Layout Components
import Navbar from './components/Navbar';
import ModalWaitlistForm from './components/ModalWaitlistForm';

// Page Views
import Landing from './pages/Landing';
import Catalog from './pages/Catalog';
import Dashboard from './pages/Dashboard';
import QuizGame from './pages/QuizGame';
import ParentsPanel from './pages/ParentsPanel';
import ProfilePanel from './pages/ProfilePanel';
import PricingPanel from './pages/PricingPanel';

const App = () => {
  const [view, setView] = useState('landing');
  const [showSplash, setShowSplash] = useState(true);
  const [params, setParams] = useState({});
  const [lockedGame, setLockedGame] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [isTostadora] = useState(() => {
    // Detect slow network
    const connection = navigator.connection;
    const isSlowNetwork = connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    // Detect low-end hardware (<= 4 CPU cores or <= 4GB RAM)
    const isLowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isLowRam = navigator.deviceMemory && navigator.deviceMemory <= 4;
    return !!(isSlowNetwork || isLowCpu || isLowRam);
  });
  const [showCookies, setShowCookies] = useState(() => {
    const saved = localStorage.getItem('eduplay_cookie_consent');
    return saved !== 'accepted';
  });
  
  // Estado de Tema Día / Noche (Tema Día/Light es por defecto)
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

  // Estado del Usuario (Caché del navegador)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eduplay_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error al cargar perfil, reiniciando al invitado", e);
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
      newNextLevelXp = newLevel * 200; // Incremento progresivo de XP requerida
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
  const [apiStatus, setApiStatus] = useState('disconnected'); // 'disconnected' | 'connecting' | 'connected'
  const [games, setGames] = useState(MOCK_GAMES);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigate = (newView, newParams = {}) => {
    setView(newView);
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPageLoading(true);
    
    // Check connection speed
    const connection = navigator.connection;
    const isSlow = connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    const delay = isSlow ? 1500 : 800; // Delay del esqueleto

    setTimeout(() => {
      setPageLoading(false);
    }, delay);
  };

  // Función para conectar y cargar juegos de la API
  const loadApiGames = async (urlToTest) => {
    if (!urlToTest) {
      setGames(MOCK_GAMES);
      setApiStatus('disconnected');
      return false;
    }

    setApiStatus('connecting');
    
    // Limpiar URL y agregar protocolo si falta
    let cleanUrl = urlToTest.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'http://' + cleanUrl;
    }

    try {
      // Remover diagonal final si la tiene
      cleanUrl = cleanUrl.replace(/\/$/, "");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

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

  // Intentar cargar al iniciar si hay una URL guardada
  useEffect(() => {
    const init = async () => {
      const start = performance.now();
      if (apiUrl) {
        await loadApiGames(apiUrl);
      }
      const end = performance.now();
      const loadTime = end - start;
      // Buffer dynamically adjusted to load speed (min 1500ms)
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
    landing: <Landing onNavigate={navigate} onLockClick={setLockedGame} games={games} theme={theme} isLoading={isTostadora && pageLoading && view === 'landing'} isSplashActive={showSplash} />,
    catalog: <Catalog onNavigate={navigate} onLockClick={setLockedGame} games={games} theme={theme} isLoading={isTostadora && pageLoading && view === 'catalog'} />,
    dashboard: <Dashboard onNavigate={navigate} user={user} onAddXp={addXp} isLoading={isTostadora && pageLoading && view === 'dashboard'} />,
    game: <QuizGame onNavigate={navigate} onAddXp={addXp} gameId={params.gameId} games={games} apiUrl={apiUrl} />,
    parents: <ParentsPanel onNavigate={navigate} isLoading={isTostadora && pageLoading && view === 'parents'} />,
    profile: <ProfilePanel onNavigate={navigate} user={user} onSaveUser={saveUser} isLoading={isTostadora && pageLoading && view === 'profile'} />,
    pricing: <PricingPanel onNavigate={navigate} isLoading={isTostadora && pageLoading && view === 'pricing'} />
  };

  if (appLoading) {
    return <AstronautLoader />;
  }

  return (
    <div className="w-full min-h-screen relative font-sans text-zinc-900 dark:text-white selection:bg-blue-200 dark:selection:bg-blue-800">
      <Navbar 
        currentView={view} 
        onNavigate={navigate} 
        apiStatus={apiStatus} 
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        onOpenSettings={() => {
          setInputUrl(apiUrl);
          setIsSettingsOpen(true);
        }} 
      />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={view} 
          initial={{ opacity: 0, filter: 'blur(10px)' }} 
          animate={{ 
            opacity: pageLoading && !isTostadora ? 0.6 : 1, 
            filter: pageLoading && !isTostadora ? 'blur(6px)' : 'blur(0px)' 
          }} 
          exit={{ opacity: 0, filter: 'blur(10px)' }} 
          transition={{ duration: 0.4 }}
        >
          {views[view]}
        </motion.div>
      </AnimatePresence>

      {/* Modal de Configuración de API */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            style={{ zIndex: 100 }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 md:p-10 w-full max-w-lg shadow-2xl relative"
            >
              <button 
                onClick={() => setIsSettingsOpen(false)} 
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition-colors"
              >
                <XCircle size={20} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-zinc-900">Configuración de API</h3>
                  <p className="text-sm text-zinc-500 font-medium">Conecta el portal con el servidor FastAPI local</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">URL del Túnel Ngrok / Localhost</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={inputUrl} 
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://xxxx-xxxx.ngrok-free.app" 
                      className="w-full px-5 py-4 rounded-2xl border-2 border-zinc-200 focus:border-blue-500 focus:outline-none font-medium transition-colors text-base"
                    />
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 font-medium">Pega la URL pública generada por Ngrok (ej: `ngrok http 8000`).</p>
                </div>

                {/* Detalles de Estado de Conexión */}
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-zinc-500">Estado de Conexión:</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${apiStatus === 'connected' ? 'bg-green-100 text-green-700' : apiStatus === 'connecting' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {apiStatus === 'connected' ? 'Conectado' : apiStatus === 'connecting' ? 'Probando...' : 'Desconectado'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    {apiStatus === 'connected' 
                      ? '¡Excelente! Los juegos de la API han sido cargados e integrados al catálogo con éxito.' 
                      : apiStatus === 'connecting' 
                      ? 'Intentando contactar al servidor...' 
                      : 'No pudimos conectar con el servidor local de juegos. Asegúrate de iniciar tu servidor FastAPI local (ej: uvicorn) y de que la URL de Ngrok o localhost sea correcta. Mientras tanto, utilizaremos los juegos de respaldo integrados (MOCK_GAMES).'}
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

      {/* Modal de Juego Bloqueado / Waitlist */}
      <AnimatePresence>
        {lockedGame && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            style={{ zIndex: 110 }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 md:p-10 w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-[40px] -z-0"></div>
              
              <button 
                onClick={() => setLockedGame(null)} 
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition-colors"
              >
                <XCircle size={20} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <Lock size={32} />
                </div>
                
                <h3 className="text-3xl font-black text-zinc-900 mb-2">¡Próximamente en EduPlay Pro!</h3>
                <p className="text-zinc-650 font-medium text-base mb-6">
                  El juego <strong className="text-zinc-950 font-bold">"{lockedGame.title}"</strong> y más de 30 aventuras interactivas avanzadas estarán disponibles muy pronto en nuestra versión completa.
                </p>

                <ModalWaitlistForm gameTitle={lockedGame.title} onFinish={() => setLockedGame(null)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Consent Card */}
      <AnimatePresence>
        {showCookies && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[200]"
          >
            <div className="card-cookie">
              <svg xmlSpace="preserve" viewBox="0 0 122.88 122.25" y="0px" x="0px" id="cookieSvg" version="1.1"><g><path d="M101.77,49.38c2.09,3.1,4.37,5.11,6.86,5.78c2.45,0.66,5.32,0.06,8.7-2.01c1.36-0.84,3.14-0.41,3.97,0.95 c0.28,0.46,0.42,0.96,0.43,1.47c0.13,1.4,0.21,2.82,0.24,4.26c0.03,1.46,0.02,2.91-0.05,4.35h0v0c0,0.13-0.01,0.26-0.03,0.38 c-0.91,16.72-8.47,31.51-20,41.93c-11.55,10.44-27.06,16.49-43.82,15.69v0.01h0c-0.13,0-0.26-0.01-0.38-0.03 c-16.72-0.91-31.51-8.47-41.93-20C5.31,90.61-0.73,75.1,0.07,58.34H0.07v0c0-0.13,0.01-0.26,0.03-0.38 C1,41.22,8.81,26.35,20.57,15.87C32.34,5.37,48.09-0.73,64.85,0.07V0.07h0c1.6,0,2.89,1.29,2.89,2.89c0,0.4-0.08,0.78-0.23,1.12 c-1.17,3.81-1.25,7.34-0.27,10.14c0.89,2.54,2.7,4.51,5.41,5.52c1.44,0.54,2.2,2.1,1.74,3.55l0.01,0 c-1.83,5.89-1.87,11.08-0.52,15.26c0.82,2.53,2.14,4.69,3.88,6.4c1.74,1.72,3.9,3,6.39,3.78c4.04,1.26,8.94,1.18,14.31-0.55 C99.73,47.78,101.08,48.3,101.77,49.38L101.77,49.38z M59.28,57.86c2.77,0,5.01,2.24,5.01,5.01c0,2.77-2.24,5.01-5.01,5.01 c-2.77,0-5.01-2.24-5.01-5.01C54.27,60.1,56.52,57.86,59.28,57.86L59.28,57.86z M37.56,78.49c3.37,0,6.11,2.73,6.11,6.11 s-2.73,6.11-6.11,6.11s-6.11-2.73-6.11-6.11S34.18,78.49,37.56,78.49L37.56,78.49z M50.72,31.75c2.65,0,4.79,2.14,4.79,4.79 c0,2.65-2.14,4.79-4.79,4.79c-2.65,0-4.79-2.14-4.79-4.79C45.93,33.89,48.08,31.75,50.72,31.75L50.72,31.75z M119.3,32.4 c1.98,0,3.58,1.6,3.58,3.58c0,1.98-1.6,3.58-3.58,3.58s-3.58-1.6-3.58-3.58C115.71,34.01,117.32,32.4,119.3,32.4L119.3,32.4z M93.62,22.91c2.98,0,5.39,2.41,5.39,5.39c0,2.98-2.41,5.39-5.39,5.39c-2.98,0-5.39-2.41-5.39-5.39 C88.23,25.33,90.64,22.91,93.62,22.91L93.62,22.91z M97.79,0.59c3.19,0,5.78,2.59,5.78,5.78c0,3.19-2.59,5.78-5.78,5.78 c-3.19,0-5.78-2.59-5.78-5.78C92.02,3.17,94.6,0.59,97.79,0.59L97.79,0.59z M76.73,80.63c4.43,0,8.03,3.59,8.03,8.03 c0,4.43-3.59,8.03-8.03,8.03s-8.03-3.59-8.03-8.03C68.7,84.22,72.29,80.63,76.73,80.63L76.73,80.63z M31.91,46.78 c4.8,0,8.69,3.89,8.69,8.69c0,4.8-3.89,8.69-8.69,8.69s-8.69-3.89-8.69-8.69C23.22,50.68,27.11,46.78,31.91,46.78L31.91,46.78z M107.13,60.74c-3.39-0.91-6.35-3.14-8.95-6.48c-5.78,1.52-11.16,1.41-15.76-0.02c-3.37-1.05-6.32-2.81-8.71-5.18 c-2.39-2.37-4.21-5.32-5.32-8.75c-1.51-4.66-1.69-10.2-0.18-16.32c-3.1-1.8-5.25-4.53-6.42-7.88c-1.06-3.05-1.28-6.59-0.61-10.35 C47.27,5.95,34.3,11.36,24.41,20.18C13.74,29.69,6.66,43.15,5.84,58.29l0,0.05v0h0l-0.01,0.13v0C5.07,73.72,10.55,87.82,20.02,98.3 c9.44,10.44,22.84,17.29,38,18.1l0.05,0h0v0l0.13,0.01h0c15.24,0.77,29.35-4.71,39.83-14.19c10.44-9.44,17.29-22.84,18.1-38l0-0.05 v0h0l0.01-0.13v0c0.07-1.34,0.09-2.64,0.06-3.91C112.98,61.34,109.96,61.51,107.13,60.74L107.13,60.74z M116.15,64.04L116.15,64.04 L116.15,64.04L116.15,64.04z M58.21,116.42L58.21,116.42L58.21,116.42L58.21,116.42z" /></g></svg>
              <p className="cookieHeading">Usamos cookies</p>
              <p className="cookieDescription">
                Utilizamos cookies para asegurarnos de brindarte la mejor experiencia en nuestro sitio web. <br />
                <a href="#" className="text-blue-500 hover:underline">Leer políticas de cookies</a>.
              </p>
              <div className="buttonContainer">
                <button className="acceptButton" onClick={() => { localStorage.setItem('eduplay_cookie_consent', 'accepted'); setShowCookies(false); }}>Aceptar</button>
                <button className="declineButton" onClick={() => setShowCookies(false)}>Rechazar</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entry Splash Overlay with Frosted Glass Card */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } 
            }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-zinc-950/70"
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
  );
};

export default App;