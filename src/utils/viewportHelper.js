/**
 * VisualViewport Helper to handle iOS Firefox / WebKit resize reflow jank.
 * Updates CSS variable --app-height dynamically without layout thrashing.
 */
export function initViewportHelper() {
  if (typeof window === 'undefined') return () => {};

  let ticking = false;

  let lastWidth = window.innerWidth;
  let lastHeight = window.innerHeight;

  const updateViewportHeight = (force = false) => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    // Only update height var if width changes (orientation) or height change > 150px (keyboard)
    if (force || currentWidth !== lastWidth || Math.abs(currentHeight - lastHeight) > 150) {
      const vh = (window.visualViewport ? window.visualViewport.height : window.innerHeight) * 0.01;
      document.documentElement.style.setProperty('--app-height', `${vh * 100}px`);
      lastWidth = currentWidth;
      lastHeight = currentHeight;
    }

    if (window.visualViewport) {
      document.documentElement.style.setProperty('--visual-top', `${window.visualViewport.offsetTop}px`);
    }

    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(() => updateViewportHeight(false));
      ticking = true;
    }
  };

  updateViewportHeight(true);

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', requestUpdate);
    window.visualViewport.addEventListener('scroll', requestUpdate);
  } else {
    window.addEventListener('resize', requestUpdate);
  }

  return () => {
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', requestUpdate);
      window.visualViewport.removeEventListener('scroll', requestUpdate);
    } else {
      window.removeEventListener('resize', requestUpdate);
    }
  };
}
