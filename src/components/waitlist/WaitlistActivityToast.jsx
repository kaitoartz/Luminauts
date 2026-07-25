import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function WaitlistActivityToast({ show, text }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-6 z-[99] max-w-xs bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md text-left"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Rocket size={14} />
          </div>
          <div className="text-[11px] font-semibold text-zinc-300">
            <span className="text-[10px] font-extrabold text-[#8da9c4] uppercase tracking-wider block mb-0.5">
              Actividad Reciente
            </span>
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
