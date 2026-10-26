import { useEffect, useRef, type RefObject } from 'react';

export function useMagnetic<T extends HTMLElement>(strength = 3, radius = 150) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      if (Math.hypot(dx, dy) > radius + Math.max(rect.width, rect.height) / 2) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      node.style.transform = 'translate3d(0,0,0)';
    };
    window.addEventListener('pointermove', move, { passive: true });
    node.addEventListener('pointerleave', reset);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', reset); };
  }, [strength, radius]);
  return ref;
}

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let raf = 0;
    let active = !document.hidden;
    const start = async () => {
      const module = await import('lenis');
      if (!active) return;
      lenis = new module.default({ duration: 1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const tick = (time: number) => { if (!active || !lenis) return; lenis.raf(time); raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    };
    const visibility = () => {
      active = !document.hidden;
      if (!active) { cancelAnimationFrame(raf); }
      else if (lenis) { raf = requestAnimationFrame(function tick(time) { if (!active || !lenis) return; lenis.raf(time); raf = requestAnimationFrame(tick); }); }
      else void start();
    };
    void start();
    document.addEventListener('visibilitychange', visibility);
    return () => { active = false; cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', visibility); lenis?.destroy(); };
  }, []);
}

export function useScrollOffset<T extends HTMLElement>(ref: RefObject<T>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) * 0.3;
        node.style.setProperty('--scroll-shift', `${progress}px`);
      });
    };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [ref]);
}
