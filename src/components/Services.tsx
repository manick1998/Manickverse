"use client";

import { useState } from "react";
import {
  Code2,
  Globe,
  LayoutTemplate,
  Palette,
  Rocket,
  Search,
  Server,
  ShoppingCart,
  Wrench,
  Sparkles,
  ArrowRight,
  CheckCircle,
  X,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealGroup } from "@/lib/motion";
import { soundManager } from "@/lib/audio";

interface ServiceItem {
  id: string;
  icon: any;
  title: string;
  desc: string;
  timeline: string;
  features: string[];
  techStack: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "landing",
    icon: Rocket,
    title: "High-Converting Landing Pages",
    desc: "Single-page powerhouses engineered to convert pay-per-click traffic, product launches, and SaaS campaigns into immediate leads.",
    timeline: "3 to 5 Days",
    features: [
      "Persuasive copywriting structure",
      "Interactive 3D or Framer Motion visual hero",
      "Dynamic lead capture & CRM integration",
      "100/100 Core Web Vitals performance guarantee",
    ],
    techStack: ["Next.js App Router", "Tailwind CSS v4", "Framer Motion", "Resend / Postmark API"],
  },
  {
    id: "business",
    icon: Globe,
    title: "Corporate & Business Websites",
    desc: "Multi-page digital flagship sites establishing instant authority, brand dominance, and seamless lead booking for service companies.",
    timeline: "10 to 14 Days",
    features: [
      "5-10 Custom high-fidelity pages",
      "Interactive CMS / Blog integration",
      "Search Engine Optimization (SEO Schema JSON-LD)",
      "Multi-language & localized content ready",
    ],
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL / Drizzle"],
  },
  {
    id: "portfolio",
    icon: LayoutTemplate,
    title: "Portfolio & Personal Brand Hubs",
    desc: "Cinematic, editorial digital portfolios crafted for executives, creators, architects, coaches, and luxury agencies.",
    timeline: "7 to 10 Days",
    features: [
      "Fluid page transitions & smooth scrolling",
      "Interactive case study viewer & lightbox modals",
      "Embedded client video testimonials",
      "Direct calendar scheduling widget integration",
    ],
    techStack: ["Next.js", "Framer Motion", "Lucide Icons", "Vercel Analytics"],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce & Digital Storefronts",
    desc: "Ultra-fast online stores with seamless carts, zero-friction checkout flows, global payment integration, and inventory sync.",
    timeline: "14 to 21 Days",
    features: [
      "Custom product page galleries & 3D previews",
      "Stripe / Razorpay / PayPal multi-currency checkout",
      "Automated order confirmation & email triggers",
      "Sub-second page load speeds even on mobile 4G",
    ],
    techStack: ["Next.js", "Shopify Storefront API / Stripe", "Tailwind", "Zustand State"],
  },
  {
    id: "redesign",
    icon: Wrench,
    title: "Complete Website Redesign",
    desc: "Transform outdated, slow, or low-converting legacy websites into modern digital masterpieces while preserving SEO equity.",
    timeline: "10 to 14 Days",
    features: [
      "Full SEO redirect mapping & URL preservation",
      "2x to 4x speed increase audit",
      "Modern dark / light aesthetic overhaul",
      "Mobile-first responsive architecture upgrade",
    ],
    techStack: ["Next.js", "Lighthouse Audit", "Schema.org", "Tailwind"],
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & Performance Engineering",
    desc: "Technical optimization to dominate search results: schema markup, Core Web Vitals fixes, semantic HTML, and sub-second rendering.",
    timeline: "3 to 7 Days",
    features: [
      "JSON-LD structured data for Google Rich Snippets",
      "Image optimization & Next.js Image pipeline",
      "Canonical URLs, dynamic sitemaps & robots.txt",
      "Accessibility WCAG AAA audit & ARIA markup",
    ],
    techStack: ["Schema.org", "Core Web Vitals", "Ahrefs / SEMrush Standards", "Next SEO"],
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="section-pad relative overflow-hidden" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-light">
            Our Expertise
          </span>
          <h2 id="services-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            Comprehensive Digital Mastery
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            From single campaign landing pages to complex e-commerce flagships, every service is executed with world-class engineering and design.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((serv) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.id}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedService(serv);
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#070b1e]/80 p-8 shadow-xl backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-cyan-light/50 hover:bg-[#0c1230] hover:shadow-[0_20px_60px_rgba(34,211,238,0.2)] hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-cyan-light transition-colors group-hover:bg-cyan/20 group-hover:border-cyan-light/60">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-cyan/15 border border-cyan/30 px-3 py-1 text-[11px] font-bold text-cyan-light">
                      {serv.timeline}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-white group-hover:text-cyan-light transition-colors">
                    {serv.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {serv.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-white/60 group-hover:text-cyan-light transition-colors">
                  <span>View Deliverables & Scope</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </RevealGroup>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#080d24] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric to-royal text-white">
                  <selectedService.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs font-semibold text-cyan-light font-mono">
                    Estimated Timeline: {selectedService.timeline}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                {selectedService.desc}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-light mb-3">
                  Key Deliverables Included
                </h4>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-xl bg-white/5 p-3 border border-white/10 text-xs text-white/90">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-white/50 font-mono">Tech Stack:</span>
                  {selectedService.techStack.map((tech, i) => (
                    <span key={i} className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%27m%20interested%20in%20your%20${encodeURIComponent(selectedService.title)}%20service.`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-royal px-5 py-2.5 text-xs font-bold text-white shadow-lg"
                >
                  Request Proposal
                  <Zap className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
