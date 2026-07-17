"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  ClipboardList,
  PenTool,
  Hammer,
  TestTubeDiagonal,
  Rocket,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/lib/motion";
import { soundManager } from "@/lib/audio";

const STEPS = [
  {
    icon: Compass,
    title: "Discovery & Strategy",
    day: "Days 1 - 2",
    desc: "We analyze your target market, competitors, visual direction, and business goals to map out a clear conversion strategy.",
    deliverables: ["Brand Strategy Audit", "Information Architecture", "Competitor Benchmark Report"],
  },
  {
    icon: ClipboardList,
    title: "Planning & Wireframing",
    day: "Days 3 - 4",
    desc: "Low-fidelity structural wireframes and content hierarchy mapped out for optimal user journey and F-pattern reading flow.",
    deliverables: ["UX Sitemap", "High-Converting Content Copy Structure", "Page Layout Blueprint"],
  },
  {
    icon: PenTool,
    title: "Framer/Figma UI Design",
    day: "Days 5 - 7",
    desc: "Bespoke, award-worthy UI designs crafted with Apple and Framer aesthetic standards — glassmorphism, typography rhythm, and brand flair.",
    deliverables: ["High-Fidelity UI Design System", "Custom Micro-Animations Preview", "Interactive Prototype"],
  },
  {
    icon: Hammer,
    title: "Production Development",
    day: "Days 8 - 11",
    desc: "Clean, performant Next.js 16 + TypeScript + Tailwind CSS engineering with zero bloatware and instant route prefetching.",
    deliverables: ["Modular Frontend Architecture", "CMS / Database Schema Setup", "SEO Schema JSON-LD Integration"],
  },
  {
    icon: TestTubeDiagonal,
    title: "Rigorous QA & Audit",
    day: "Days 12 - 13",
    desc: "Deep testing across mobile browsers, 4K viewports, contrast ratios, keyboard accessibility, and Core Web Vitals speed tuning.",
    deliverables: ["100/100 Lighthouse Performance Audit", "Cross-Browser & Mobile Testing", "Security Hardening"],
  },
  {
    icon: Rocket,
    title: "Deployment & Launch",
    day: "Day 14",
    desc: "Your flagship website goes live globally on Vercel edge CDN with custom domain configuration, automated SSL, and analytics.",
    deliverables: ["Global Edge CDN Deployment", "Google Search Console Sitemap Submission", "Post-Launch Walkthrough & Video Call"],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="section-pad relative overflow-hidden" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-light">
            Our Battle-Tested Workflow
          </span>
          <h2 id="process-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            How We Build Production Masterpieces in 14 Days
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            A transparent, milestone-driven process engineered to eliminate surprises and guarantee on-time launches.
          </p>
        </Reveal>

        {/* Step Navigation Cards */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;

            return (
              <div
                key={idx}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setActiveStep(idx);
                }}
                className={`group relative flex flex-col justify-between rounded-3xl border p-6 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "border-cyan-light bg-gradient-to-br from-electric/20 via-royal/15 to-[#080d24] shadow-[0_15px_40px_rgba(34,211,238,0.25)] scale-[1.02]"
                    : "border-white/10 bg-[#070b1e]/70 hover:border-white/20 hover:bg-[#0c1230]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors ${
                        isActive
                          ? "border-cyan-light bg-cyan/20 text-cyan-light"
                          : "border-white/15 bg-white/5 text-white/60"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${
                        isActive
                          ? "bg-cyan-light text-space-black"
                          : "bg-white/5 text-white/50 border border-white/10"
                      }`}
                    >
                      {step.day}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed">{step.desc}</p>
                </div>

                {/* Deliverables List preview */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5">
                  {step.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-white/80">
                      <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
