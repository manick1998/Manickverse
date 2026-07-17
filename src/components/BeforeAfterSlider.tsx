"use client";

import { useCallback, useRef, useState } from "react";
import { MoveHorizontal, Zap, Gauge, CheckCircle, AlertTriangle } from "lucide-react";
import { soundManager } from "@/lib/audio";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div className="mt-12">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-light">
          <Zap className="h-3.5 w-3.5 text-cyan-light" />
          Interactive Redesign Comparison
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-white">
          Drag the slider to experience the ManickVerse transformation
        </h3>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto aspect-[16/9] min-h-[360px] w-full max-w-4xl touch-none select-none overflow-hidden rounded-3xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] bg-[#070b1e]"
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => {
          dragging.current = true;
          updateFromClientX(e.touches[0].clientX);
        }}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
        onTouchEnd={() => (dragging.current = false)}
      >
        {/* AFTER LAYER (Right / Full Background) - ManickVerse Redesign */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1230] via-[#101942] to-[#080d24] p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold text-emerald-400">
                <CheckCircle className="h-3.5 w-3.5" /> MANICKVERSE REDESIGN (AFTER)
              </span>
              <span className="font-mono text-xs font-bold text-cyan-light">100/100 Core Web Vitals</span>
            </div>

            <div className="mt-6 max-w-lg">
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-light font-bold">
                Luxury E-Commerce Flagship
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Lumen Apparel Co.
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                Ultra-smooth 60fps animations, glassmorphic checkout, sub-second route changes, and responsive layout scaling across all mobile screen sizes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center font-mono text-xs">
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <span className="block text-white/50 text-[10px]">Speed Score</span>
              <span className="font-bold text-emerald-400 text-sm">100 / 100</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <span className="block text-white/50 text-[10px]">Conversion Surge</span>
              <span className="font-bold text-cyan-light text-sm">+218%</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <span className="block text-white/50 text-[10px]">Load Time</span>
              <span className="font-bold text-purple-300 text-sm">0.4 Seconds</span>
            </div>
          </div>
        </div>

        {/* BEFORE LAYER (Clipped Overlay) - Outdated Legacy Site */}
        <div
          className="absolute inset-0 bg-[#1e1c18] p-6 sm:p-10 flex flex-col justify-between overflow-hidden border-r-2 border-cyan-light"
          style={{ width: `${position}%` }}
        >
          <div>
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 px-3.5 py-1 text-xs font-bold text-rose-300">
                <AlertTriangle className="h-3.5 w-3.5" /> LEGACY WEBSITE (BEFORE)
              </span>
              <span className="font-mono text-xs font-bold text-rose-400">38/100 Slow Speed</span>
            </div>

            <div className="mt-6 max-w-lg">
              <span className="text-xs uppercase tracking-widest font-mono text-amber-300/60 font-bold">
                Cluttered Legacy Template
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-amber-100 mt-1 line-through opacity-70">
                Lumen Apparel Co.
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-amber-200/60 leading-relaxed">
                Slow WordPress theme, broken mobile layout shifts, slow server responses, and confusing checkout flow causing high cart abandonment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-amber-900/40 text-center font-mono text-xs">
            <div className="bg-black/30 rounded-xl p-2 border border-amber-900/40">
              <span className="block text-amber-200/40 text-[10px]">Speed Score</span>
              <span className="font-bold text-rose-400 text-sm">38 / 100</span>
            </div>
            <div className="bg-black/30 rounded-xl p-2 border border-amber-900/40">
              <span className="block text-amber-200/40 text-[10px]">Bounce Rate</span>
              <span className="font-bold text-rose-400 text-sm">74.2%</span>
            </div>
            <div className="bg-black/30 rounded-xl p-2 border border-amber-900/40">
              <span className="block text-amber-200/40 text-[10px]">Load Time</span>
              <span className="font-bold text-rose-400 text-sm">4.8 Seconds</span>
            </div>
          </div>
        </div>

        {/* Drag Handle Divider */}
        <div
          className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize"
          style={{ left: `calc(${position}% - 20px)` }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-light text-space-black shadow-[0_0_20px_rgba(34,211,238,0.8)] border-2 border-white">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
