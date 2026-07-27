import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ViewportDebugHud() {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    winInnerHeight: 0,
    vvHeight: 0,
    vvTop: 0,
    docClientHeight: 0,
    appHeightVar: '',
    scrollY: 0,
    resizeCount: 0,
    userAgent: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let count = 0;

    const updateMetrics = () => {
      count++;
      const vv = window.visualViewport;
      const appHeight = getComputedStyle(document.documentElement).getPropertyValue('--app-height');

      setMetrics({
        winInnerHeight: window.innerHeight,
        vvHeight: vv ? Math.round(vv.height) : window.innerHeight,
        vvTop: vv ? Math.round(vv.offsetTop) : 0,
        docClientHeight: document.documentElement.clientHeight,
        appHeightVar: appHeight.trim(),
        scrollY: Math.round(window.scrollY),
        resizeCount: count,
        userAgent: navigator.userAgent.includes('Firefox') ? 'Firefox Mobile' : navigator.userAgent.includes('Safari') ? 'Safari Mobile' : 'Mobile Browser',
      });
    };

    updateMetrics();

    window.addEventListener('scroll', updateMetrics, { passive: true });
    window.addEventListener('resize', updateMetrics, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateMetrics);
      window.visualViewport.addEventListener('scroll', updateMetrics);
    }

    return () => {
      window.removeEventListener('scroll', updateMetrics);
      window.removeEventListener('resize', updateMetrics);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateMetrics);
        window.visualViewport.removeEventListener('scroll', updateMetrics);
      }
    };
  }, []);

  const hud = (
    <div className="fixed top-4 left-4 z-[99999] pointer-events-none font-mono text-[10px]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-red-600/90 text-white font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 active:scale-95 transition-transform"
      >
        {isOpen ? '✕ Hide Viewport HUD' : '🔍 Viewport Debug HUD'}
      </button>

      {isOpen && (
        <div className="pointer-events-auto mt-2 bg-zinc-950/95 border border-red-500/40 text-green-400 p-4 rounded-2xl shadow-2xl backdrop-blur-md max-w-xs space-y-1.5 text-left leading-tight">
          <div className="text-white font-extrabold border-b border-zinc-800 pb-1 mb-2 flex justify-between">
            <span>Viewport HUD</span>
            <span className="text-zinc-500">{metrics.userAgent}</span>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
            <span className="text-zinc-400">visualViewport.h:</span>
            <span className="font-bold text-yellow-300">{metrics.vvHeight}px</span>

            <span className="text-zinc-400">visualViewport.top:</span>
            <span className="font-bold text-yellow-300">{metrics.vvTop}px</span>

            <span className="text-zinc-400">window.innerHeight:</span>
            <span className="font-bold text-cyan-300">{metrics.winInnerHeight}px</span>

            <span className="text-zinc-400">--app-height:</span>
            <span className="font-bold text-purple-300">{metrics.appHeightVar || 'N/A'}</span>

            <span className="text-zinc-400">doc.clientHeight:</span>
            <span className="font-bold text-blue-300">{metrics.docClientHeight}px</span>

            <span className="text-zinc-400">scrollY:</span>
            <span className="font-bold text-white">{metrics.scrollY}px</span>

            <span className="text-zinc-400">Events Fired:</span>
            <span className="font-bold text-emerald-400">#{metrics.resizeCount}</span>
          </div>
        </div>
      )}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(hud, document.body) : null;
}
