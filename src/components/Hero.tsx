"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  Zap,
  Globe,
  Gauge,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { Reveal, useParallaxTilt } from "@/lib/motion";
import { soundManager } from "@/lib/audio";

const SHOWCASE_TABS = [
  {
    id: "ecommerce",
    title: "E-Commerce",
    badge: "Lumen Apparel",
    headline: "Ultra-Fast Luxury Fashion Storefront",
    metrics: "2.8x Conversion Surge • 0.6s LCP",
    color: "from-cyan-500/20 to-blue-600/20",
    mockup: {
      nav: ["New Arrivals", "Collections", "Cart (2)"],
      heroTitle: "Elegance Engineered For Movement",
      subTitle: "Modern apparel tailored with precision fabrics and zero-friction checkout.",
      price: "$189.00",
      cta: "Instant Express Checkout",
    },
  },
  {
    id: "saas",
    title: "SaaS & Tech",
    badge: "Aura AI Analytics",
    headline: "Conversion-Engineered SaaS Landing Page",
    metrics: "+142% Signup Rate • 99 Lighthouse",
    color: "from-purple-500/20 to-indigo-600/20",
    mockup: {
      nav: ["Product", "Solutions", "Pricing"],
      heroTitle: "Intelligent Workflows for High-Growth Teams",
      subTitle: "Automate complex pipelines with real-time telemetry and predictive models.",
      price: "$49/mo",
      cta: "Start 14-Day Free Trial",
    },
  },
  {
    id: "realestate",
    title: "Real Estate",
    badge: "Meridian Estates",
    headline: "High-End Luxury Property Showcase",
    metrics: "3.4x Inquiries • Custom 3D Tours",
    color: "from-emerald-500/20 to-teal-600/20",
    mockup: {
      nav: ["Penthouses", "Villas", "Virtual Tour"],
      heroTitle: "The Pinnacle of Oceanfront Living",
      subTitle: "Curated architectural masterworks in prime coastal destinations worldwide.",
      price: "$4.2M",
      cta: "Schedule Private Viewing",
    },
  },
  {
    id: "medical",
    title: "Healthcare",
    badge: "Wellpoint Clinic",
    headline: "Trust-Building Medical Portal",
    metrics: "+210% Online Bookings • HIPAA Compliant",
    color: "from-blue-500/20 to-cyan-600/20",
    mockup: {
      nav: ["Specialties", "Doctors", "Book Now"],
      heroTitle: "Compassionate, World-Class Medical Care",
      subTitle: "Book appointments instantly with board-certified physicians in your area.",
      price: "Instant Booking",
      cta: "Schedule Appointment",
    },
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("ecommerce");
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useParallaxTilt(12);

  const activeShowcase = SHOWCASE_TABS.find((t) => t.id === activeTab) || SHOWCASE_TABS[0];

  return (
    <section className="relative min-h-[90vh] pt-24 pb-20 sm:pt-32 sm:pb-24 overflow-hidden flex flex-col justify-center">
      {/* Aurora Background Mesh & Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[350px] w-[90vw] max-w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-electric/20 via-royal/25 to-cyan/20 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Announcement Badge - Fully Responsive Text */}
        <div className="flex justify-center w-full">
          <Reveal>
            <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold backdrop-blur-xl shadow-lg text-center">
              <span className="flex h-2 w-2 rounded-full bg-cyan-light animate-ping shrink-0" />
              <span className="text-cyan-light font-bold">CORE PROMISE:</span>
              <span className="text-white/90">🚀 Website Delivered Within 2 Weeks</span>
            </div>
          </Reveal>
        </div>

        {/* Hero Title & Copy - Fluid Clamp Typography */}
        <div className="mt-6 sm:mt-8 text-center max-w-4xl mx-auto w-full">
          <Reveal>
            <h1 className="font-display text-[clamp(1.65rem,7vw,4.8rem)] font-extrabold tracking-tight leading-[1.08] text-white break-words">
              Crafting Extraordinary{" "}
              <span className="text-gradient block sm:inline drop-shadow-[0_10px_35px_rgba(59,130,246,0.3)]">
                Digital Experiences
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/70 max-w-2xl mx-auto font-normal leading-relaxed px-2">
              We build high-converting, award-worthy Next.js websites for businesses that refuse to look ordinary. Live in as little as 14 days.
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={0.2} className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-electric via-royal to-cyan px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold text-white shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Start Your Project Today</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#work"
              onClick={() => soundManager.playHover()}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
            >
              <Sparkles className="h-4 w-4 text-cyan-light" />
              <span>Explore Selected Work</span>
            </a>
          </Reveal>

          {/* Social Proof metrics - Mobile Responsive Stack */}
          <Reveal delay={0.25} className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-white/60 font-medium">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="ml-1.5 font-bold text-white">4.95 / 5.0 Rating</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-light" />
              <span>150+ Websites Launched</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-emerald-400" />
              <span>100/100 Core Web Vitals Guarantee</span>
            </div>
          </Reveal>
        </div>

        {/* 3D Interactive Device Showcase */}
        <Reveal delay={0.3} className="mt-10 sm:mt-14 w-full">
          <div
            className="perspective-1000 mx-auto max-w-5xl w-full"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Template Selector Tabs */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {SHOWCASE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-electric to-royal text-white border border-cyan-light/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                      : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-light" />
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>

            {/* 3D Browser Container */}
            <motion.div
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-[#080d22]/90 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            >
              {/* Window Controls Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-3.5 py-2.5 sm:px-5 sm:py-3.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-500/80" />
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80" />
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-1 sm:ml-2 font-mono text-[9px] sm:text-[11px] text-white/40 truncate max-w-[140px] sm:max-w-none">
                    https://manickverse.com/showcase/{activeShowcase.id}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> 100 Speed
                  </span>
                </div>
              </div>

              {/* Dynamic Live Mockup Canvas */}
              <div className={`p-4 sm:p-10 bg-gradient-to-br ${activeShowcase.color} min-h-[300px] sm:min-h-[380px] flex flex-col justify-between transition-all duration-500`}>
                {/* Mockup Top Nav */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                  <div className="font-display font-extrabold text-sm sm:text-lg text-white tracking-tight flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-cyan-light animate-ping" />
                    {activeShowcase.badge}
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-xs font-medium text-white/70">
                    {activeShowcase.mockup.nav.map((item, i) => (
                      <span key={i}>{item}</span>
                    ))}
                  </div>
                  <button className="rounded-lg bg-white/10 border border-white/20 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-white">
                    {activeShowcase.mockup.price}
                  </button>
                </div>

                {/* Mockup Main Hero Body */}
                <div className="my-4 sm:my-8 max-w-2xl">
                  <span className="inline-block rounded-full bg-cyan/20 border border-cyan/40 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-light mb-2">
                    Award-Winning Live Preview
                  </span>
                  <h2 className="font-display text-lg sm:text-3xl font-extrabold text-white leading-tight">
                    {activeShowcase.mockup.heroTitle}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {activeShowcase.mockup.subTitle}
                  </p>

                  <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                    <button className="rounded-xl bg-gradient-to-r from-electric to-royal px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold text-white shadow-lg">
                      {activeShowcase.mockup.cta}
                    </button>
                  </div>
                </div>

                {/* Mockup Footer Metric Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-3 border-t border-white/10 text-center">
                  <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                    <div className="text-[9px] sm:text-xs text-white/50">Delivery Speed</div>
                    <div className="text-xs sm:text-sm font-extrabold text-cyan-light">14 Days</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                    <div className="text-[9px] sm:text-xs text-white/50">Performance</div>
                    <div className="text-xs sm:text-sm font-extrabold text-emerald-400">100/100</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                    <div className="text-[9px] sm:text-xs text-white/50">SEO Standard</div>
                    <div className="text-xs sm:text-sm font-extrabold text-purple-300">Semantic Schema</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                    <div className="text-[9px] sm:text-xs text-white/50">Stack</div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">Next.js + TS</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
