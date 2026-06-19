import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Star, Zap, Award, BookOpen, FlaskConical, Compass } from 'lucide-react';
import Button from '../components/ui/Button';
import PageSkeleton from '../components/ui/PageSkeleton';

const ProfilePanel = ({ onNavigate, user, onSaveUser, isLoading }) => {
  if (isLoading) {
    return <PageSkeleton view="profile" />;
  }
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatarSeed, setAvatarSeed] = useState(() => {
    const match = user.avatar.match(/seed=([^&]+)/);
    return match ? match[1] : user.name;
  });
  const [avatarBg, setAvatarBg] = useState(() => {
    const match = user.avatar.match(/backgroundColor=([^&]+)/);
    return match ? match[1] : 'ffdfbf';
  });

  const PRESET_BG = [
    { label: "Naranja", value: "ffdfbf", color: "bg-[#ffdfbf]" },
    { label: "Celeste", value: "b6e3f4", color: "bg-[#b6e3f4]" },
    { label: "Morado", value: "c0aede", color: "bg-[#c0aede]" },
    { label: "Cian", value: "d1f4ff", color: "bg-[#d1f4ff]" },
    { label: "Rosado", value: "ffd5dc", color: "bg-[#ffd5dc]" }
  ];

  const previewAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&backgroundColor=${avatarBg}`;

  const handleRandomize = () => {
    const randomWords = ["Leo", "Mia", "Paco", "Lola", "Gatito", "Panda", "Zorro", "Sparky", "Nacho", "Sofi", "Max", "Luna", "Astro", "Rayo", "Coco"];
    const random = randomWords[Math.floor(Math.random() * randomWords.length)] + Math.floor(Math.random() * 100);
    setAvatarSeed(random);
  };

  const handleSave = () => {
    onSaveUser({
      ...user,
      name: name.trim() || user.name,
      avatar: previewAvatar
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-32 px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {isEditing ? (
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row gap-10 mb-12 relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-[80px] -z-0 pointer-events-none"></div>
            <div className="flex flex-col items-center gap-4 flex-shrink-0 z-10">
              <div className="w-40 h-40 bg-zinc-50 dark:bg-zinc-850 rounded-[2.5rem] border-[6px] border-white dark:border-zinc-800 shadow-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                <img src={previewAvatar} alt="Preview Avatar" className="w-full h-full object-cover" />
              </div>
              <Button variant="secondary" size="sm" onClick={handleRandomize} className="rounded-xl flex items-center gap-1 shadow-sm">
                <Sparkles size={14} className="text-yellow-500"/> Aleatorio
              </Button>
            </div>
            
            <div className="flex-grow space-y-6 z-10 w-full">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-350 mb-2">Tu Nombre de Aventurero</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="SuperPanda99" 
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none font-medium transition-colors text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-355 mb-2">Semilla de Avatar (Escribe palabras para cambiarlo)</label>
                <input 
                  type="text" 
                  value={avatarSeed} 
                  onChange={(e) => setAvatarSeed(e.target.value)}
                  placeholder="seed" 
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none font-medium transition-colors text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-355 mb-2">Color de Fondo</label>
                <div className="flex gap-3 mt-1">
                  {PRESET_BG.map(bg => (
                    <button 
                      key={bg.value} 
                      onClick={() => setAvatarBg(bg.value)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${bg.color} ${avatarBg === bg.value ? 'border-zinc-800 scale-110 shadow-md' : 'border-white dark:border-zinc-800 hover:scale-105'}`}
                      title={bg.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Button variant="secondary" onClick={() => setIsEditing(false)} className="px-6 py-3.5 rounded-2xl">Cancelar</Button>
                <Button variant="primary" onClick={handleSave} className="flex-1 py-3.5 rounded-2xl shadow-blue-500/20">Guardar Cambios</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-10 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-[80px] -z-0 pointer-events-none"></div>
            <div className="relative z-10 w-40 h-40 bg-orange-100 dark:bg-zinc-800 rounded-[2.5rem] border-[6px] border-white dark:border-zinc-800 shadow-xl overflow-hidden flex-shrink-0 rotate-3">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 flex-grow text-center md:text-left">
              <h2 className="text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">{user.name}</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-950/30 text-yellow-750 dark:text-yellow-400 font-bold text-sm border border-yellow-200 dark:border-yellow-900/30"><Trophy size={18}/> Nivel {user.level}</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 font-bold text-sm border border-blue-200 dark:border-blue-900/30"><Star size={18}/> {user.xp} XP</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold text-sm border border-orange-200 dark:border-orange-900/30"><Zap size={18}/> Racha {user.streak} días</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 mb-3 shadow-inner">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full" style={{width: `${(user.xp / user.nextLevelXp) * 100}%`}}></div>
              </div>
              <p className="text-sm font-bold text-zinc-400 dark:text-zinc-550 text-right uppercase tracking-wider">{user.nextLevelXp - user.xp} XP para subir de nivel</p>
            </div>
            <div className="relative z-10">
              <Button className="rounded-2xl" onClick={() => setIsEditing(true)}>Editar Perfil</Button>
            </div>
          </div>
        )}
        
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3"><Award className="text-purple-500" size={28}/> Insignias Desbloqueadas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {user.badges && user.badges.map(b => {
            const BadgeIcon = b.name.includes("Matem") ? Zap : b.name.includes("Lector") ? BookOpen : b.name.includes("Cient") ? FlaskConical : b.name.includes("Aprendiz") ? Award : Trophy;
            return (
              <motion.div key={b.id} whileHover={{y:-8, scale: 1.02}} className={`${b.bg} dark:bg-zinc-800/40 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center cursor-pointer border border-white/50 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all`}>
                <BadgeIcon size={40} className={`${b.color} mb-4`} />
                <span className={`font-bold text-base ${b.color}`}>{b.name}</span>
              </motion.div>
            );
          })}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center border-2 border-zinc-200 dark:border-zinc-800 border-dashed opacity-60">
            <Compass size={40} className="text-zinc-400 mb-4" />
            <span className="font-bold text-base text-zinc-500">Bloqueado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
