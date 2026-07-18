"use client";

import {
  Gauge,
  Layers,
  LifeBuoy,
  Palette,
  ShieldCheck,
  TrendingUp,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/lib/motion";
import { soundManager } from "@/lib/audio";

const FEATURES = [
  {
    icon: Gauge,
    badge: "14-Day Velocity",
    title: "Guaranteed 2-Week Launch",
    desc: "Our disciplined engineering workflow delivers custom, fully tested Next.js websites in 14 days — no scope creep, no delays.",
    metrics: "100% On-Time Delivery Record",
  },
  {
    icon: Palette,
    badge: "Award-Class UI",
    title: "Apple & Framer Aesthetics",
    desc: "Interfaces designed by multidisciplinary creatives inspired by Apple Keynotes, Linear, Stripe, and Vercel. Craftsmanship in every pixel.",
    metrics: "Awwwards-Inspired Polish",
  },
  {
    icon: TrendingUp,
    badge: "Conversion Science",
    title: "Psychology-Engineered Layouts",
    desc: "Every typography scale, CTA placement, and visual hierarchy is constructed using conversion psychology and F-pattern eye tracking.",
    metrics: "Average 2.4x Lead Surge",
  },
  {
    icon: Layers,
    badge: "Modern Architecture",
    title: "Next.js 16 + Tailwind v4",
    desc: "Clean, maintainable TypeScript architecture built for extreme velocity, instant route transitions, zero layout shift, and serverless edge reliability.",
    metrics: "Clean Modular Frontend Code",
  },
  {
    icon: ShieldCheck,
    badge: "SEO 100/100",
    title: "Structured Schema & Web Vitals",
    desc: "Semantic HTML5, Schema.org JSON-LD, automated sitemaps, OpenGraph cards, and Core Web Vitals performance baked in from line one.",
    metrics: "Perfect Search Indexing",
  },
  {
    icon: LifeBuoy,
    badge: "Founder Line",
    title: "24/7 Dedicated Support",
    desc: "No account manager middle-men. Direct communication line with lead engineers and senior designers from kickoff to post-launch scaling.",
    metrics: "Direct WhatsApp & Phone Line",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="section-pad relative overflow-hidden" aria-labelledby="why-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.14),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-electric/15 border border-electric/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-light font-mono">
            <Zap className="h-3.5 w-3.5" />
            The ManickVerse Advantage
          </span>
          <h2 id="why-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            Engineered for brands who refuse to look ordinary
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Combining award-winning aesthetics with high-converting frontend architecture to turn casual website visitors into paying clients.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#070b22]/70 p-6 sm:p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-light/50 hover:bg-[#0c1230] hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)] hover:-translate-y-1.5"
              >
                {/* Ambient Glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-electric/20 blur-2xl group-hover:bg-cyan/35 transition-all duration-300" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-tr from-electric/20 to-royal/20 text-cyan-light shadow-md transition-colors group-hover:border-cyan-light/60 group-hover:bg-cyan/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-bold text-white/60 font-mono">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-white group-hover:text-cyan-light transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-cyan-light font-mono">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{feat.metrics}</span>
                </div>
              </div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
