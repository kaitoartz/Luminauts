import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function WaitlistActivityToast({ show, text }) {
  const content = (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            backgroundColor: '#0F141E',
            bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))'
          }}
          className="fixed left-6 z-30 max-w-xs border border-[#8DA9C4]/30 p-3.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center gap-3 text-left pointer-events-auto text-white backdrop-blur-xl"
        >
          <div className="w-8 h-8 rounded-xl bg-[#8DA9C4]/20 border border-[#8DA9C4]/40 flex items-center justify-center text-[#8DA9C4] shrink-0 shadow-inner">
            <Rocket size={15} />
          </div>
          <div className="text-[11px] font-semibold text-zinc-200 leading-tight">
            <span className="text-[10px] font-extrabold text-[#E0B0FF] uppercase tracking-wider block mb-0.5">
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
