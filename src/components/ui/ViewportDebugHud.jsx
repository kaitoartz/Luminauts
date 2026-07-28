import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ViewportDebugHud() {
  const [isOpen, setIsOpen] = useState(false);
  const [lenisDisabled, setLenisDisabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('luminauts-disable-lenis') === 'true';
  });
  const [metrics, setMetrics] = useState({
    winInnerHeight: 0,
    vvHeight: 0,
    vvTop: 0,
    docClientHeight: 0,
    appHeightVar: '',
    scrollY: 0,
    resizeCount: 0,
    userAgent: '',
    lenisClass: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let count = 0;

    const updateMetrics = () => {
      count++;
      const vv = window.visualViewport;
      const appHeight = getComputedStyle(document.documentElement).getPropertyValue('--app-height');
      const hasLenis = document.documentElement.classList.contains('lenis');

      setMetrics({
        winInnerHeight: window.innerHeight,
        vvHeight: vv ? Math.round(vv.height) : window.innerHeight,
        vvTop: vv ? Math.round(vv.offsetTop) : 0,
        docClientHeight: document.documentElement.clientHeight,
        appHeightVar: appHeight.trim(),
        scrollY: Math.round(window.scrollY),
        resizeCount: count,
        userAgent: navigator.userAgent.includes('Firefox') ? 'Firefox Mobile' : navigator.userAgent.includes('Safari') ? 'Safari Mobile' : 'Mobile Browser',
        lenisClass: hasLenis,
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

            <span className="text-zinc-400">Lenis Status:</span>
            <span className={`font-bold ${metrics.lenisClass ? 'text-emerald-400' : 'text-red-400'}`}>
              {metrics.lenisClass ? 'ACTIVE' : 'OFF'}
            </span>

            <span className="text-zinc-400">Events Fired:</span>
            <span className="font-bold text-emerald-400">#{metrics.resizeCount}</span>
          </div>

          <div className="border-t border-zinc-800 pt-2 mt-2 pointer-events-auto">
            <label className="flex items-center gap-2 text-[10px] text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={lenisDisabled}
                onChange={(e) => {
                  const val = e.target.checked;
                  setLenisDisabled(val);
                  localStorage.setItem('luminauts-disable-lenis', val ? 'true' : 'false');
                  window.location.reload();
                }}
                className="rounded border-zinc-700 text-red-600 focus:ring-red-500 bg-zinc-900 w-3 h-3"
              />
              <span>Force Disable Lenis</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(hud, document.body) : null;
}
