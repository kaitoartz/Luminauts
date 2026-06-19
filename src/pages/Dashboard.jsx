import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Star, CheckCircle2, Trophy, Award, BookOpen, FlaskConical, Sparkles } from 'lucide-react';
import TicketProfileCard from '../components/ui/TicketProfileCard';
import AlertBanner from '../components/ui/AlertBanner';
import Badge from '../components/ui/Badge';
import StarExplosionBtn from '../components/ui/StarExplosionBtn';
import PageSkeleton from '../components/ui/PageSkeleton';

const Dashboard = ({ onNavigate, user, onAddXp, isLoading }) => {
  if (isLoading) {
    return <PageSkeleton view="dashboard" />;
  }

  const [challenges, setChallenges] = useState([
    { id: 1, title: "Juega 2 partidas de Matemáticas", xp: 50, done: true },
    { id: 2, title: "Mantén tu racha de días", xp: 20, done: true },
    { id: 3, title: "Obtén 100% en Ciencias", xp: 100, done: false }
  ]);

  const handleToggleChallenge = (id, xp, done) => {
    if (done) return; // ya completado
    setChallenges(prev => prev.map(ch => ch.id === id ? { ...ch, done: true } : ch));
    if (onAddXp) onAddXp(xp);
  };

  const completedCount = challenges.filter(c => c.done).length;
  const isAllCompleted = completedCount === challenges.length;
  const progressPct = (user.xp / user.nextLevelXp) * 100;
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white dark:bg-zinc-900 p-10 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -z-0"></div>
          
          <div className="flex items-center gap-8 relative z-10">
            <div className="relative group">
              <img src={user.avatar} alt="Avatar" className="w-28 h-28 rounded-full bg-orange-100 border-4 border-white dark:border-zinc-800 shadow-xl group-hover:scale-105 transition-transform" />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold px-4 py-1.5 rounded-full border-2 border-white dark:border-zinc-850 shadow-lg">Lvl {user.level}</div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-zinc-900 dark:text-white mb-2">¡Hola, {user.name}!</h1>
              <p className="text-zinc-550 dark:text-zinc-400 font-medium text-lg">Estás a <strong className="text-zinc-900 dark:text-zinc-100">{user.nextLevelXp - user.xp} XP</strong> del nivel {user.level + 1}</p>
            </div>
          </div>
          
          <div className="flex gap-4 relative z-10">
            <div className="bg-white dark:bg-zinc-800 px-8 py-6 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-700 shadow-sm flex flex-col items-center min-w-[140px] hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-950/30 flex items-center justify-center mb-3">
                <Zap className="text-yellow-500" size={24}/>
              </div>
              <span className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{user.streak}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Días seguidos</span>
            </div>
            <div className="bg-white dark:bg-zinc-800 px-8 py-6 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-700 shadow-sm flex flex-col items-center min-w-[140px] hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center mb-3">
                <Star className="text-blue-500" size={24}/>
              </div>
              <span className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{user.xp}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">XP Total</span>
            </div>
          </div>
        </div>

        {/* Ticket Profile Card + Alerts */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <TicketProfileCard user={user} />
          <div className="flex-1 space-y-3">
            <AlertBanner type="success">¡Racha activa! Llevas {user.streak} días seguidos aprendiendo.</AlertBanner>
            <AlertBanner type="info">Tu próxima meta: {user.nextLevelXp - user.xp} XP para alcanzar el nivel {user.level + 1}.</AlertBanner>
            {user.completedChallenges > 0 && <AlertBanner type="warning">¡Tienes retos diarios pendientes! Completa 3/3 para bonus XP.</AlertBanner>}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-colors duration-300">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Progreso de Nivel</h3>
              <div className="relative h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-4 shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]" />
                </motion.div>
              </div>
              <div className="flex justify-between text-base font-bold text-zinc-500 dark:text-zinc-400">
                <span>Lvl {user.level} <span className="text-zinc-400 dark:text-zinc-500 font-medium">({user.xp} XP)</span></span>
                <span>Lvl {user.level + 1} <span className="text-zinc-400 dark:text-zinc-500 font-medium">({user.nextLevelXp} XP)</span></span>
              </div>
            </div>
                   <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Retos Diarios</h3>
                <Badge className={`text-sm px-4 py-1.5 ${isAllCompleted ? 'bg-green-150 dark:bg-green-950/20 text-green-700 dark:text-green-400' : 'bg-blue-50 dark:bg-blue-955/20 text-blue-600 dark:text-blue-400'}`}>
                  {completedCount} / {challenges.length} Completados
                </Badge>
              </div>

              {isAllCompleted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-green-50/50 to-emerald-50/20 dark:from-green-950/10 dark:to-emerald-950/5 rounded-2xl border border-green-100 dark:border-green-900/30"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-4 shadow-sm">
                    <Trophy size={32} />
                  </div>
                  <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-2">¡Misión Cumplida! 🚀</h4>
                  <p className="text-zinc-650 dark:text-zinc-400 text-sm max-w-sm font-medium">
                    Has completado todos tus retos diarios de hoy. Tu rango y XP han aumentado estelarmente. ¡Vuelve mañana para nuevas misiones!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {challenges.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleToggleChallenge(task.id, task.xp, task.done)}
                      className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all text-left ${
                        task.done 
                          ? 'bg-zinc-50/50 dark:bg-zinc-850/30 border-zinc-200 dark:border-zinc-800 cursor-default' 
                          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 hover:scale-[1.01] active:scale-[0.99]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${task.done ? 'bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-550'}`}>
                          {task.done ? <CheckCircle2 size={20} /> : <div className="w-3 h-3 rounded-full bg-zinc-350 dark:bg-zinc-700"/>}
                        </div>
                        <span className={`font-bold text-lg ${task.done ? 'text-zinc-400 dark:text-zinc-550 line-through font-medium' : 'text-zinc-900 dark:text-white'}`}>
                          {task.title}
                        </span>
                      </div>
                      <span className="font-black text-yellow-500 flex items-center gap-1.5"><Star size={18} fill="currentColor"/> {task.xp}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-colors duration-300">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Tus Insignias</h3>
              <div className="grid grid-cols-2 gap-4">
                {user.badges && user.badges.map(b => {
                  const BadgeIcon = b.name.includes("Matem") ? Zap : b.name.includes("Lector") ? BookOpen : b.name.includes("Cient") ? FlaskConical : b.name.includes("Aprendiz") ? Award : Trophy;
                  return (
                    <div key={b.id} className={`flex flex-col items-center text-center p-6 rounded-2xl ${b.bg} dark:bg-zinc-800/40 border border-white/50 dark:border-zinc-700 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer`}>
                      <div className={`w-14 h-14 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center mb-4 shadow-sm ${b.color}`}>
                        <BadgeIcon size={28} />
                      </div>
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-200 leading-tight">{b.name}</span>
                    </div>
                  );
                })}
                <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500">
                  <div className="w-14 h-14 rounded-full bg-zinc-50 dark:bg-zinc-850 flex items-center justify-center mb-4"><Trophy size={24} /></div>
                  <span className="text-sm font-bold">Bloqueado</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group transition-colors duration-300">
              <div className="absolute inset-0 bg-zinc-50/20 dark:bg-zinc-950/40 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-4 py-1.5 bg-yellow-100 dark:bg-yellow-950/30 text-yellow-850 dark:text-yellow-400 font-black text-xs rounded-full uppercase tracking-wider mb-2">Próximamente</div>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 font-bold">¡Desafía a otros niños en vivo!</p>
              </div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Trophy className="text-yellow-500" size={24}/> Torneos en Vivo
                </h3>
                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 font-bold px-3 py-1 rounded-full uppercase">Bloqueado</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">Competencias de matemáticas y ciencias los fines de semana. Gana premios exclusivos.</p>
              <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full"></div>
            </div>

            <div className="w-full flex justify-center">
              <StarExplosionBtn onClick={() => onNavigate('catalog')} className="w-full text-xl">
                ¡Seguir Jugando!
              </StarExplosionBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
