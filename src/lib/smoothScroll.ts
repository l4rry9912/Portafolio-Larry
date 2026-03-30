/** Scroll animado con easing; respeta prefers-reduced-motion. */

let animToken = 0;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Subida: parte con inercia y frena suave al llegar arriba */
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

function getFixedHeaderOffset(): number {
  const header = document.querySelector('header');
  if (!header) return 104;
  return Math.ceil(header.getBoundingClientRect().height) + 12;
}

export function smoothScrollToY(
  targetY: number,
  options?: { durationMs?: number; easing?: 'inOutCubic' | 'outQuint' }
): void {
  const durationMs = options?.durationMs ?? 750;
  const easing = options?.easing ?? 'inOutCubic';
  const ease = easing === 'outQuint' ? easeOutQuint : easeInOutCubic;

  const y = Math.max(0, targetY);

  if (prefersReducedMotion()) {
    window.scrollTo({ top: y, left: 0, behavior: 'auto' });
    return;
  }

  const token = ++animToken;
  const startY = window.scrollY;
  const dy = y - startY;
  if (Math.abs(dy) < 0.5) return;

  const t0 = performance.now();

  const step = (now: number) => {
    if (token !== animToken) return;
    const elapsed = now - t0;
    const t = Math.min(1, elapsed / durationMs);
    const eased = ease(t);
    window.scrollTo(0, startY + dy * eased);
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/** Bajar hasta una sección respetando el header fijo */
export function smoothScrollToElementId(elementId: string, durationMs = 900): void {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (prefersReducedMotion()) {
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - getFixedHeaderOffset();
  smoothScrollToY(top, { durationMs, easing: 'inOutCubic' });
}

export function smoothScrollToTop(durationMs = 720): void {
  smoothScrollToY(0, { durationMs, easing: 'outQuint' });
}
