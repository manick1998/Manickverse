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
  Laptop,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Code,
  Layers,
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
      nav: ["New Arrivals", "Collections", "Lookbook", "Cart (2)"],
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
      nav: ["Product", "Solutions", "Integrations", "Pricing"],
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
      nav: ["Penthouses", "Villas", "Virtual Tour", "Contact Agent"],
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
      nav: ["Specialties", "Doctors", "Patient Portal", "Book Now"],
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
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden flex flex-col justify-center">
      {/* Aurora Background Mesh & Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-electric/20 via-royal/25 to-cyan/20 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top Announcement Badge */}
        <div className="flex justify-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold backdrop-blur-xl shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-cyan-light animate-ping" />
              <span className="text-cyan-light font-bold">CORE PROMISE:</span>
              <span className="text-white/90">🚀 Website Delivered Within 2 Weeks</span>
              <ChevronRight className="h-3.5 w-3.5 text-white/40" />
            </div>
          </Reveal>
        </div>

        {/* Hero Title & Copy */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <Reveal>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.2rem)] font-extrabold tracking-tight leading-[1.04] text-white">
              Crafting Extraordinary{" "}
              <span className="text-gradient drop-shadow-[0_10px_35px_rgba(59,130,246,0.3)]">
                Digital Experiences
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-normal leading-relaxed">
              We build high-converting, award-worthy Next.js websites for businesses that refuse to look ordinary. Live in as little as 14 days.
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-electric via-royal to-cyan px-8 py-4 text-sm font-extrabold text-white shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(34,211,238,0.7)] active:scale-95"
            >
              <span>Start Your Project Today</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#work"
              onClick={() => soundManager.playHover()}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
            >
              <Sparkles className="h-4 w-4 text-cyan-light" />
              <span>Explore Selected Work</span>
            </a>
          </Reveal>

          {/* Social Proof metrics */}
          <Reveal delay={0.25} className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 font-medium">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="ml-1.5 font-bold text-white">4.95 / 5.0 Rating</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-cyan-light" />
              <span>150+ Websites Launched</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-emerald-400" />
              <span>100/100 Core Web Vitals Guarantee</span>
            </div>
          </Reveal>
        </div>

        {/* 3D Interactive Device Showcase */}
        <Reveal delay={0.3} className="mt-14">
          <div
            className="perspective-1000 mx-auto max-w-5xl"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Template Selector Tabs */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              {SHOWCASE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-electric to-royal text-white border border-cyan-light/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                      : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Globe className="h-3.5 w-3.5 text-cyan-light" />
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>

            {/* 3D Browser Container */}
            <motion.div
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative overflow-hidden rounded-3xl border border-white/20 bg-[#080d22]/90 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            >
              {/* Window Controls Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-white/40">
                    https://manickverse.com/showcase/{activeShowcase.id}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    <CheckCircle className="h-3 w-3" /> 100 Speed Score
                  </span>
                  <span className="hidden sm:inline font-mono text-cyan-light">{activeShowcase.metrics}</span>
                </div>
              </div>

              {/* Dynamic Live Mockup Canvas */}
              <div className={`p-6 sm:p-10 bg-gradient-to-br ${activeShowcase.color} min-h-[380px] flex flex-col justify-between transition-all duration-500`}>
                {/* Mockup Top Nav */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="font-display font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-light animate-ping" />
                    {activeShowcase.badge}
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-white/70">
                    {activeShowcase.mockup.nav.map((item, i) => (
                      <span key={i} className="hover:text-white cursor-pointer transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                  <button className="rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-semibold text-white">
                    {activeShowcase.mockup.price}
                  </button>
                </div>

                {/* Mockup Main Hero Body */}
                <div className="my-8 max-w-2xl">
                  <span className="inline-block rounded-full bg-cyan/20 border border-cyan/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-light mb-3">
                    Award-Winning Interactive Preview
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                    {activeShowcase.mockup.heroTitle}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                    {activeShowcase.mockup.subTitle}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-xl bg-gradient-to-r from-electric to-royal px-5 py-2.5 text-xs font-bold text-white shadow-lg">
                      {activeShowcase.mockup.cta}
                    </button>
                    <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10">
                      View Live Case Study
                    </button>
                  </div>
                </div>

                {/* Mockup Footer Metric Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <div className="text-xs text-white/50">Delivery Speed</div>
                    <div className="text-sm font-extrabold text-cyan-light">14 Days</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <div className="text-xs text-white/50">Performance</div>
                    <div className="text-sm font-extrabold text-emerald-400">100/100</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <div className="text-xs text-white/50">SEO Standard</div>
                    <div className="text-sm font-extrabold text-purple-300">Semantic Schema</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <div className="text-xs text-white/50">Stack</div>
                    <div className="text-sm font-extrabold text-white">Next.js + TS</div>
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
