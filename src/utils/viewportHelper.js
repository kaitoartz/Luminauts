/**
 * VisualViewport Helper to handle iOS Firefox / WebKit resize reflow jank.
 * Updates CSS variable --app-height dynamically without layout thrashing.
 */
export function initViewportHelper() {
  if (typeof window === 'undefined') return () => {};

  let ticking = false;

  const updateViewportHeight = () => {
    const vh = (window.visualViewport ? window.visualViewport.height : window.innerHeight) * 0.01;
    document.documentElement.style.setProperty('--app-height', `${vh * 100}px`);

    if (window.visualViewport) {
      document.documentElement.style.setProperty('--visual-top', `${window.visualViewport.offsetTop}px`);
    }

    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateViewportHeight);
      ticking = true;
    }
  };

  updateViewportHeight();

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
