import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameCardSkeleton from '../components/ui/GameCardSkeleton';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import PremiumGameCard from '../components/ui/PremiumGameCard';
import PageSkeleton from '../components/ui/PageSkeleton';

const Catalog = ({ onNavigate, onLockClick, games = [], theme, isLoading: isPageLoading }) => {
  if (isPageLoading) {
    return <PageSkeleton view="catalog" />;
  }
  const [filter, setFilter] = useState('Todos');
  const [isLoading, setIsLoading] = useState(false);
  const subjects = ['Todos', 'Matemáticas', 'Ciencias', 'Lectura', 'Programación', 'Ecología'];
  
  const handleFilterChange = (subj) => {
    if (subj === filter) return;
    setIsLoading(true);
    setFilter(subj);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const filtered = filter === 'Todos' 
    ? games 
    : games.filter(g => g.subject.includes(filter) || (filter==='Lectura' && g.subject==='Inglés') || (filter==='Ciencias' && g.subject==='Ecología'));

  const isAppDark = theme === 'dark';

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">Catálogo de Juegos</h1>
          <p className="text-xl text-zinc-650 dark:text-zinc-400 font-medium">Encuentra tu próximo reto por materia, edad o dificultad.</p>
        </div>
        
        <div className="flex overflow-x-auto gap-3 pb-4 mb-12 scrollbar-hide">
          {subjects.map(subj => (
            <button
              key={subj} onClick={() => handleFilterChange(subj)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${filter === subj ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20 dark:shadow-none scale-105' : 'bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300'}`}
            >{subj}</button>
          ))}
        </div>
        
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Render premium skeleton loaders during transition states
              [1, 2, 3].map((n) => (
                <motion.div key={`skeleton-${n}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <GameCardSkeleton />
                  <div className="mt-3"><SkeletonLoader /></div>
                </motion.div>
              ))
            ) : (
              filtered.map((game) => (
                <motion.div key={game.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                  <PremiumGameCard {...game} isDark={isAppDark} onClick={() => game.locked ? onLockClick(game) : onNavigate('game', { gameId: game.id })} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Catalog;
