"use client";

import { motion } from "framer-motion";
import { Zap, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/lib/motion";

const DAYS = [
  { d: "Days 1-2", label: "Discovery & Strategy", desc: "Competitor research & architecture blueprint" },
  { d: "Days 3-4", label: "UX Wireframing", desc: "User flows & content structure mapping" },
  { d: "Days 5-7", label: "Framer/Figma UI Design", desc: "High-fidelity modern visual design" },
  { d: "Days 8-11", label: "Next.js Production Build", desc: "Clean frontend & backend development" },
  { d: "Days 12-13", label: "QA & Speed Audit", desc: "100/100 Core Web Vitals & SEO Schema" },
  { d: "Day 14", label: "Global Launch 🚀", desc: "Live domain routing & SSL security" },
];

export default function DeliveryPromise() {
  return (
    <section aria-labelledby="promise-heading" className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#070a17_0%,#0c1230_45%,#1a0f33_75%,#070a17_100%)] bg-[length:200%_200%] animate-gradient-move" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />

      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-cyan-light shadow-lg">
            <Zap className="h-4 w-4 text-cyan-light animate-pulse" />
            <span>The 14-Day Delivery Guarantee</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 id="promise-heading" className="mt-6 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold text-white leading-tight">
            From Blank Canvas to Live Website in <span className="text-gradient font-black">2 Weeks</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Traditional web agencies drag projects for 3 to 6 months. We execute with extreme precision, delivering award-winning results right on schedule.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {DAYS.map((item, index) => (
            <Reveal key={item.d} delay={index * 0.08}>
              <div className="group relative flex flex-col items-center justify-between h-full rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md transition-all hover:border-cyan-light/50 hover:bg-white/10 hover:-translate-y-1">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-light px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20">
                    {item.d}
                  </span>
                  <h3 className="mt-3 font-display font-bold text-sm text-white">{item.label}</h3>
                  <p className="mt-1.5 text-[11px] text-white/50">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
