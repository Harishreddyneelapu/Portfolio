"use client";

import * as React from "react";

type P = { x: number; y: number; vx: number; vy: number; hot: boolean };

/** Light particle network on canvas. */
export function HeroBackground() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    let cleanup: (() => void) | undefined;

    const boot = () => {
      const canvas = ref.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const accent =
        getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() ||
        "#0d9488";
      let w = 0;
      let h = 0;
      let particles: P[] = [];
      let raf = 0;
      let running = false;
      const mouse = { x: -999, y: -999 };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(70, Math.round((w * h) / 18000));
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          hot: Math.random() < 0.16,
        }));
      };

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = accent;
        ctx.strokeStyle = accent;
        for (const p of particles) {
          if (!reduced) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < 120 && d > 0) {
              p.x += (dx / d) * 0.8;
              p.y += (dy / d) * 0.8;
            }
          }
          // Regular nodes stay small and faint; ~1 in 6 is a larger solid highlight.
          ctx.globalAlpha = p.hot ? 1 : 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.hot ? 3.2 : 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 110) {
              // Links between two highlighted nodes are stronger.
              ctx.globalAlpha = (1 - d / 110) * (a.hot && b.hot ? 0.8 : 0.22);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
      };

      const loop = () => {
        draw();
        if (running) raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running || reduced) return;
        running = true;
        raf = requestAnimationFrame(loop);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      resize();
      draw();

      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
        { threshold: 0 },
      );
      io.observe(canvas);
      const onVisibility = () => (document.hidden ? stop() : start());
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      };
      const onLeave = () => {
        mouse.x = mouse.y = -999;
      };
      const ro = new ResizeObserver(() => {
        resize();
        draw();
      });
      ro.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);

      cleanup = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
      };
    };

    // Keep the canvas off the critical path: start once the browser is idle.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(boot, { timeout: 1500 })
      : window.setTimeout(boot, 400);
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup?.();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
