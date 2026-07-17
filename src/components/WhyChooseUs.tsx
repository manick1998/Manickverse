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
import { Reveal, RevealGroup, fadeUp } from "@/lib/motion";
import { soundManager } from "@/lib/audio";

const FEATURES = [
  {
    icon: Gauge,
    badge: "14-Day Delivery",
    title: "Unmatched Production Velocity",
    desc: "Our disciplined engineering workflow delivers custom, fully tested Next.js websites in 2 weeks — no missed launch dates, no agency fluff.",
    metrics: "100% On-Time Delivery Track Record",
  },
  {
    icon: Palette,
    badge: "Award-Class Design",
    title: "Apple & Framer Precision",
    desc: "Interfaces designed by multidisciplinary creatives inspired by Apple Keynotes, Linear, Stripe, and Vercel. Craftsmanship in every pixel.",
    metrics: "Awwwards-Inspired Craftsmanship",
  },
  {
    icon: TrendingUp,
    badge: "Conversion Science",
    title: "Psychology-Engineered Layouts",
    desc: "Every typography scale, CTA placement, and visual hierarchy is constructed using conversion psychology, F-patterns, and social proof.",
    metrics: "Average 2.4x Lead Surge",
  },
  {
    icon: Layers,
    badge: "Modern Architecture",
    title: "Production Next.js + Tailwind",
    desc: "Clean, maintainable, TypeScript architecture built for extreme velocity, instant route transitions, zero layout shift, and serverless reliability.",
    metrics: "Clean Modular Components",
  },
  {
    icon: ShieldCheck,
    badge: "SEO 100/100",
    title: "Structured Data & Web Vitals",
    desc: "Semantic HTML5, Schema.org JSON-LD, automated sitemaps, OpenGraph cards, and Core Web Vitals optimization baked in from line one.",
    metrics: "Perfect Search Indexing",
  },
  {
    icon: LifeBuoy,
    badge: "Direct Founder Access",
    title: "24/7 Dedicated Support",
    desc: "No account manager middle-men. Direct line to senior designers and engineers from kickoff through post-launch scaling.",
    metrics: "Direct WhatsApp & Call Line",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="section-pad relative overflow-hidden" aria-labelledby="why-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-electric/15 border border-electric/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-light">
            <Zap className="h-3.5 w-3.5" />
            The ManickVerse Advantage
          </span>
          <h2 id="why-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            Engineered for brands who refuse to look ordinary
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Combining award-winning aesthetics with high-converting frontend architecture to turn casual website visitors into lifelong clients.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#080d22]/70 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-light/40 hover:bg-[#0c1230] hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)] hover:-translate-y-1"
              >
                {/* Subtle top ambient glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-electric/20 blur-2xl group-hover:bg-cyan/30 transition-all" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-tr from-electric/20 to-royal/20 text-cyan-light shadow-md transition-colors group-hover:border-cyan-light/50 group-hover:bg-cyan/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-bold text-white/60">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-white group-hover:text-cyan-light transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-cyan-light">
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
