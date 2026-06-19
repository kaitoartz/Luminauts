import React, { useState } from 'react';
import { Users, Star, Sparkles, Trash2, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import PageSkeleton from '../components/ui/PageSkeleton';

const ParentsPanel = ({ onNavigate, isLoading }) => {
  if (isLoading) {
    return <PageSkeleton view="parents" />;
  }
  // Cargar estudiantes de localStorage o valores por defecto
  const [kids, setKids] = useState(() => {
    const saved = localStorage.getItem('eduplay_kids');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error al cargar hijos:", e);
      }
    }
    return [
      { id: '1', name: "Leo", grade: "3º Básico", xp: 4500, time: "12h 30m", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&backgroundColor=b6e3f4" },
      { id: '2', name: "Mia", grade: "1º Básico", xp: 2100, time: "8h 15m", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&backgroundColor=ffd5dc" }
    ];
  });

  const [newKidName, setNewKidName] = useState('');
  const [newKidGrade, setNewKidGrade] = useState('1º Básico');
  const [selectedAvatar, setSelectedAvatar] = useState('Leo');
  const [loading, setLoading] = useState(false);

  const avatarPresets = [
    { name: 'Leo', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&backgroundColor=b6e3f4' },
    { name: 'Mia', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&backgroundColor=ffd5dc' },
    { name: 'Paco', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Paco&backgroundColor=ffdfbf' },
    { name: 'Lola', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lola&backgroundColor=c0aede' },
    { name: 'Sofi', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofi&backgroundColor=d1f4ff' }
  ];

  const saveKids = (updatedKids) => {
    setKids(updatedKids);
    localStorage.setItem('eduplay_kids', JSON.stringify(updatedKids));
  };

  const handleAddKid = (e) => {
    e.preventDefault();
    if (!newKidName.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const newKid = {
        id: Date.now().toString(),
        name: newKidName.trim(),
        grade: newKidGrade,
        xp: 0,
        time: '0h 0m',
        avatar: avatarPresets.find(av => av.name === selectedAvatar)?.url || avatarPresets[0].url
      };

      const updated = [...kids, newKid];
      saveKids(updated);
      setNewKidName('');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteKid = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este perfil de estudiante?')) {
      const updated = kids.filter(k => k.id !== id);
      saveKids(updated);
    }
  };

  // Calcular estadísticas totales
  const totalTimeStr = kids.reduce((acc, k) => {
    const match = k.time.match(/(\d+)h\s*(\d*)m?/);
    if (match) {
      const hours = parseInt(match[1]) || 0;
      const mins = parseInt(match[2]) || 0;
      return acc + (hours * 60) + mins;
    }
    return acc;
  }, 0);
  const totalHours = Math.floor(totalTimeStr / 60);
  const totalMins = totalTimeStr % 60;
  const totalXp = kids.reduce((acc, k) => acc + (k.xp || 0), 0);
  return (
    <div className="min-h-screen pt-32 px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white pb-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-4">
              <Users className="text-blue-500" size={40}/> Panel para Padres
            </h1>
            <p className="text-zinc-555 dark:text-zinc-400 font-medium text-lg mt-2">
              Registra y gestiona el progreso de aprendizaje de tus hijos.
            </p>
          </div>
          <Button variant="secondary" onClick={() => onNavigate('pricing')}>
            Ver Planes Premium
          </Button>
        </div>

        {/* Tarjetas de Resumen Global */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
            <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-sm mb-3">Tiempo Total</span>
            <span className="text-5xl font-black text-zinc-900 dark:text-white">
              {totalHours}<span className="text-2xl text-zinc-400">h</span> {totalMins}<span className="text-2xl text-zinc-400">m</span>
            </span>
            <span className="text-green-500 dark:text-green-400 font-bold mt-3 flex items-center gap-1 bg-green-50 dark:bg-green-950/30 px-3 py-1 rounded-full text-xs">
              <Sparkles size={14} className="text-yellow-500"/> Progreso activo
            </span>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
            <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-sm mb-3">Estudiantes</span>
            <span className="text-5xl font-black text-zinc-900 dark:text-white">
              {kids.length}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 font-bold mt-3 text-xs">Aventureros activos</span>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
            <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-sm mb-3">XP Acumulado</span>
            <span className="text-5xl font-black text-yellow-500 flex items-center gap-2">
              <Star fill="currentColor" size={32}/> {totalXp}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 font-bold mt-3 text-xs">Puntos de motivación</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Aventureros */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Aventureros Registrados</h3>
            
            {kids.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900/50 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center flex flex-col items-center justify-center">
                <Users size={48} className="text-zinc-300 dark:text-zinc-700 mb-4"/>
                <h4 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">No hay hijos registrados</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm">Registra a tu primer hijo usando el formulario de la derecha para comenzar a seguir su progreso.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                {kids.map((kid) => (
                  <div key={kid.id} className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-zinc-50/40 dark:hover:bg-zinc-850/40 transition-colors">
                    <div className="flex items-center gap-6">
                      <img 
                        src={kid.avatar} 
                        alt={`Avatar de ${kid.name}`} 
                        className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shadow-sm flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-black text-2xl text-zinc-900 dark:text-white">{kid.name}</h4>
                        <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-650 dark:text-zinc-300 text-xs font-bold rounded-full mt-1">
                          {kid.grade}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 justify-between sm:justify-end">
                      <div className="text-center sm:text-right">
                        <div className="font-black text-xl text-zinc-900 dark:text-white flex items-center gap-1">
                          <Star fill="currentColor" size={16} className="text-yellow-500"/> {kid.xp}
                        </div>
                        <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">XP</span>
                      </div>
                      
                      <div className="text-center sm:text-right">
                        <div className="font-black text-xl text-zinc-900 dark:text-white">{kid.time}</div>
                        <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Tiempo</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteKid(kid.id)}
                          className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 flex items-center justify-center transition-colors border border-red-100 dark:border-red-900/30"
                          aria-label={`Eliminar perfil de ${kid.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulario de Registro */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Registrar Aventurero</h3>
            
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <form onSubmit={handleAddKid} className="space-y-6">
                <div>
                  <label htmlFor="kid-name-input" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Nombre del Aventurero
                  </label>
                  <input
                    id="kid-name-input"
                    type="text"
                    required
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Ej. Sofía, Lucas..."
                    value={newKidName}
                    onChange={(e) => setNewKidName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none font-semibold text-base transition-colors"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="kid-grade-input" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Grado Escolar
                  </label>
                  <select
                    id="kid-grade-input"
                    value={newKidGrade}
                    onChange={(e) => setNewKidGrade(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:outline-none font-semibold text-base transition-colors bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white cursor-pointer"
                    disabled={loading}
                  >
                    <option value="Pre-Kinder">Pre-Kinder</option>
                    <option value="Kinder">Kinder</option>
                    <option value="1º Básico">1º Básico</option>
                    <option value="2º Básico">2º Básico</option>
                    <option value="3º Básico">3º Básico</option>
                    <option value="4º Básico">4º Básico</option>
                    <option value="5º Básico">5º Básico</option>
                    <option value="6º Básico">6º Básico</option>
                  </select>
                </div>

                <div>
                  <span className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                    Elige un Personaje
                  </span>
                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                    {avatarPresets.map(preset => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setSelectedAvatar(preset.name)}
                        className={`p-1 rounded-2xl border-2 flex-shrink-0 transition-all ${
                          selectedAvatar === preset.name 
                            ? 'border-blue-600 scale-105 bg-blue-50 dark:bg-blue-950/30 shadow-sm' 
                            : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 bg-white dark:bg-zinc-800'
                        }`}
                        disabled={loading}
                        aria-label={`Seleccionar avatar ${preset.name}`}
                      >
                        <img src={preset.url} alt="" className="w-12 h-12 rounded-xl" />
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-4 text-base rounded-2xl shadow-md"
                  disabled={loading || !newKidName.trim()}
                >
                  {loading ? 'Registrando...' : 'Agregar Aventurero'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Sección Premium Bloqueada */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200/60 dark:border-zinc-800 p-8 md:p-10 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-zinc-50/40 dark:bg-zinc-955/80 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-95/30 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-sm">
              <Award size={28} />
            </div>
            <h4 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">Reportes de Rendimiento Avanzados</h4>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm max-w-sm font-medium mb-6">Gráficos de progreso semanal, análisis de fortalezas y sugerencias personalizadas por IA.</p>
            <Button variant="primary" onClick={() => onNavigate('pricing')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow shadow-blue-500/20">
              Adquirir EduPlay Pro
            </Button>
          </div>
          
          <div className="opacity-20 select-none pointer-events-none space-y-6">
            <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-850 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-28 bg-zinc-100 dark:bg-zinc-850 rounded-xl"></div>
              <div className="h-28 bg-zinc-100 dark:bg-zinc-850 rounded-xl"></div>
            </div>
            <div className="h-40 bg-zinc-100 dark:bg-zinc-850 rounded-xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ParentsPanel;
