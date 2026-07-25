import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function WaitlistActivityToast({ show, text }) {
  const content = (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs bg-[#141923]/95 border border-zinc-800 p-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md text-left pointer-events-auto text-white"
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

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
}
