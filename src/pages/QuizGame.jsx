import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { MOCK_QUIZ } from '../data/mockData';
import TransactionCard from '../components/ui/TransactionCard';
import StarRatingInput from '../components/ui/StarRatingInput';
import Button from '../components/ui/Button';

const QuizGame = ({ onNavigate, onAddXp, gameId, games = [], apiUrl }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(0);
  const [xpAdded, setXpAdded] = useState(false);

  const game = games.find(g => g.id === gameId);
  const isApiGame = game?.isApi;

  useEffect(() => {
    if (isApiGame && game) {
      setScore(game.points || 100);
    }
  }, [isApiGame, game]);

  useEffect(() => {
    if (status === 'finished' && score > 0 && !xpAdded) {
      onAddXp(score);
      setXpAdded(true);
    }
  }, [status, score, xpAdded, onAddXp]);

  const q = !isApiGame && MOCK_QUIZ.questions[currentQ];

  const handleSelect = (idx) => {
    if (status !== 'idle') return;
    setSelected(idx);
    if (idx === q.correct) {
      setStatus('correct');
      setScore(s => s + 50);
    } else {
      setStatus('incorrect');
    }
  };

  const handleNext = () => {
    if (currentQ < MOCK_QUIZ.questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setStatus('idle');
    } else setStatus('finished');
  };

  if (status === 'finished') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", damping: 20 }} className="max-w-lg w-full mx-auto p-12 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl dark:shadow-none text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent h-1/2 pointer-events-none" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} transition={{ delay: 0.2, type: "spring" }} className="w-32 h-32 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-yellow-500/30 text-white">
            <Trophy size={64} />
          </motion.div>
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">¡Misión Cumplida!</h2>
          <p className="text-xl text-zinc-555 dark:text-zinc-400 font-medium mb-10">
            {isApiGame ? `Has completado el juego "${game?.title}" con éxito.` : "Has completado el reto matemático con éxito."}
          </p>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-[2rem] p-8 mb-6 border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
            <div className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-sm mb-2">Recompensa Obtenida</div>
            <div className="text-5xl font-black text-yellow-500 flex items-center justify-center gap-3">
              <Star fill="currentColor" size={40}/> +{score} XP
            </div>
          </div>

          {/* Transaction Reward Animation */}
          <div className="flex justify-center mb-6">
            <TransactionCard amount={`+${score} XP`} />
          </div>

          {/* Post-quiz Star Rating */}
          <div className="mb-8">
            <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">¿Qué te pareció el reto?</p>
            <StarRatingInput />
          </div>
          
          <div className="flex flex-col gap-4">
            <Button variant="primary" onClick={() => onNavigate('dashboard')} className="w-full py-5 text-xl rounded-2xl">Ir a mi Dashboard</Button>
            <Button variant="secondary" onClick={() => onNavigate('catalog')} className="w-full py-4 text-lg rounded-2xl">Jugar otro reto</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isApiGame) {
    return (
      <div className="min-h-screen flex flex-col items-center pt-28 pb-10 px-4 md:px-8 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
        <div className="w-full max-w-6xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-150 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('catalog')} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">&larr; Volver al catálogo</Button>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">{game?.subject}</span>
                <h2 className="text-2xl font-black tracking-tight mt-1">{game?.title}</h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-950/30 px-4 py-2 rounded-full border border-yellow-100 dark:border-yellow-900/30 text-sm">
                <Star size={16} fill="currentColor"/> {game?.points} XP
              </div>
              <Button 
                variant="primary" 
                onClick={() => setStatus('finished')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-green-500/25 transition-all duration-300"
              >
                ¡Terminé de jugar!
              </Button>
            </div>
          </div>
          
          <div className="relative w-full aspect-[16/9] md:aspect-[16/10] bg-black rounded-[2.5rem] overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <iframe 
              src={`${apiUrl}/jugar`} 
              className="w-full h-full" 
              frameBorder="0"
              allow="autoplay; fullscreen; keyboard"
              title={game?.title}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 pb-20 px-6 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-10">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('catalog')} className="-ml-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">&larr; Volver al catálogo</Button>
          <div className="font-bold text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm">
            Pregunta {currentQ + 1} de {MOCK_QUIZ.questions.length}
          </div>
          <div className="font-black text-yellow-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-5 py-2 rounded-full shadow-sm flex items-center gap-2 text-lg">
            <Star size={20} fill="currentColor"/> {score}
          </div>
        </div>
        
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-16 overflow-hidden shadow-inner p-1">
          <motion.div className="h-full bg-blue-500 rounded-full" initial={{ width: `${(currentQ / MOCK_QUIZ.questions.length) * 100}%` }} animate={{ width: `${((currentQ + (status!=='idle'?1:0)) / MOCK_QUIZ.questions.length) * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white dark:bg-zinc-900 p-10 md:p-14 rounded-[3rem] shadow-xl dark:shadow-none shadow-zinc-200/50 border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-12 text-center leading-tight">{q.question}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === q.correct;
                let btnClass = "bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20";
                if (status !== 'idle') {
                  if (isCorrect) btnClass = "bg-green-50 dark:bg-green-950/20 border-2 border-green-500 text-green-700 dark:text-green-400 shadow-md";
                  else if (isSelected) btnClass = "bg-red-50 dark:bg-red-950/20 border-2 border-red-500 text-red-700 dark:text-red-400 shadow-md";
                  else btnClass = "bg-zinc-50 dark:bg-zinc-850 border-2 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-650 opacity-50";
                }
                return (
                  <button key={i} onClick={() => handleSelect(i)} disabled={status !== 'idle'} className={`relative p-8 rounded-[2rem] font-bold text-2xl transition-all duration-300 transform active:scale-95 ${btnClass}`}>
                    {opt}
                    {status !== 'idle' && isCorrect && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-white dark:bg-zinc-900 rounded-full text-green-550 shadow-lg"><CheckCircle2 size={36} fill="currentColor" className="text-white bg-green-500 rounded-full"/></motion.div>}
                    {status !== 'idle' && isSelected && !isCorrect && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-white dark:bg-zinc-900 rounded-full text-red-500 shadow-lg"><XCircle size={36} fill="currentColor" className="text-white bg-red-500 rounded-full"/></motion.div>}
                  </button>
                )
              })}
            </div>
            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-12 flex justify-center">
                  <Button variant={status === 'correct' ? 'primary' : 'secondary'} size="lg" onClick={handleNext} className={`w-full sm:w-auto px-16 py-5 text-xl rounded-2xl ${status==='correct' ? 'bg-green-500 hover:bg-green-600 shadow-[0_8px_30px_rgb(34,197,94,0.3)]' : ''}`}>
                    {status === 'correct' ? '¡Excelente! Continuar' : 'Siguiente pregunta'} <ArrowRight className="ml-2"/>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizGame;
