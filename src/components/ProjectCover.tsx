"use client";

import * as React from "react";

type Node = { x: number; y: number; vx: number; vy: number; hot: boolean };

// Small deterministic PRNG so each project keeps its own layout.
function seeded(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Generative "systems" cover: drifting node network that wakes up on hover. */
export function ProjectCover({ seed, index }: { seed: string; index: number }) {
  const wrap = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    const host = wrap.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let accent = "#0d9488";
    let ink = "#09090b";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || "#0d9488";
      ink = cs.getPropertyValue("--ink").trim() || "#09090b";
    };
    readColors();
    window.addEventListener("themechange", readColors);

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let hover = 0; // eased 0..1
    let hoverTarget = 0;
    const mouse = { x: -999, y: -999 };

    const build = () => {
      const rnd = seeded(seed);
      const count = 16 + Math.floor(rnd() * 6);
      nodes = Array.from({ length: count }, () => ({
        x: rnd() * w,
        y: rnd() * h,
        vx: (rnd() - 0.5) * 0.28,
        vy: (rnd() - 0.5) * 0.28,
        hot: rnd() < 0.28,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = () => {
      hover += (hoverTarget - hover) * 0.08;
      ctx.clearRect(0, 0, w, h);

      // soft glow that follows the pointer (or rests at centre-top)
      const gx = hoverTarget ? mouse.x : w * 0.5;
      const gy = hoverTarget ? mouse.y : h * 0.35;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.55);
      g.addColorStop(0, accent);
      g.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.1 + hover * 0.16;
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const reach = 95 + hover * 45;
      for (const n of nodes) {
        if (!reduced) {
          const speed = 1 + hover * 2.2;
          n.x += n.vx * speed;
          n.y += n.vy * speed;
          if (n.x < 6 || n.x > w - 6) n.vx *= -1;
          if (n.y < 6 || n.y > h - 6) n.vy *= -1;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < reach) {
            const hotLink = a.hot && b.hot;
            ctx.strokeStyle = hotLink ? accent : ink;
            ctx.globalAlpha = (1 - d / reach) * (hotLink ? 0.7 : 0.16 + hover * 0.14);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const near = hoverTarget ? Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / 110) : 0;
        ctx.fillStyle = n.hot || near > 0.2 ? accent : ink;
        ctx.globalAlpha = n.hot ? 1 : 0.35 + near * 0.65;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hot ? 3.4 + near * 2 : 1.8 + near * 2.2, 0, Math.PI * 2);
        ctx.fill();
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
      ([e]) => (e.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(host);
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    const card = host.closest("article") ?? host;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      hoverTarget = 1;
      if (reduced) draw();
    };
    const onLeave = () => {
      hoverTarget = 0;
      if (reduced) draw();
    };
    card.addEventListener("pointermove", onMove as EventListener);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("focusin", () => (hoverTarget = 1));
    card.addEventListener("focusout", onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("themechange", readColors);
      card.removeEventListener("pointermove", onMove as EventListener);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, [seed]);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="relative h-44 overflow-hidden border-b border-black/10 bg-zinc-100/60 dark:border-white/10 dark:bg-white/[0.03]"
    >
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <span className="absolute left-5 top-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
