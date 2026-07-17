"use client";

import { useState } from "react";
import { CheckCircle2, Zap, Sparkles, ArrowRight, Calculator } from "lucide-react";
import { Reveal } from "@/lib/motion";
import { soundManager } from "@/lib/audio";

export default function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  // ROI Calculator states
  const [visitors, setVisitors] = useState(10000);
  const [leadValue, setLeadValue] = useState(150);
  const [conversionRate, setConversionRate] = useState(1.5);

  // Estimator logic: assumes ManickVerse redesign increases conversion by 1.8x
  const currentRevenue = (visitors * (conversionRate / 100) * leadValue);
  const projectedRate = conversionRate * 1.8;
  const projectedRevenue = (visitors * (projectedRate / 100) * leadValue);
  const monthlyGain = Math.round(projectedRevenue - currentRevenue);

  const isUSD = currency === "USD";

  const TIERS = [
    {
      name: "Starter MVP",
      badge: "Fast Launch",
      price: isUSD ? "$1,490" : "₹49,999",
      delivery: "3 to 5 Days",
      desc: "Ideal for product launches, single campaign landing pages, or event promotion.",
      features: [
        "1 High-Converting Custom Landing Page",
        "Next.js 16 + Framer Motion visual hero",
        "CRM & WhatsApp lead integration",
        "100/100 Core Web Vitals performance",
        "Basic SEO Meta Schema Setup",
      ],
      popular: false,
      cta: "Launch Starter MVP",
    },
    {
      name: "Growth Pro",
      badge: "Most Popular • 14-Day Guarantee",
      price: isUSD ? "$2,990" : "₹99,999",
      delivery: "14 Days",
      desc: "Complete digital flagship for businesses looking to dominate search & convert traffic.",
      features: [
        "5 to 8 Custom High-Fidelity Pages",
        "Full Brand Design System & Micro-Interactions",
        "Blog / CMS & Localized Content Ready",
        "JSON-LD Schema for Google Rich Snippets",
        "Command Palette & AI Assistant Integration",
        "100/100 Speed & Accessibility WCAG Guarantee",
        "30 Days Post-Launch Concierge Support",
      ],
      popular: true,
      cta: "Get Started in 14 Days",
    },
    {
      name: "Enterprise Custom",
      badge: "Custom Scale",
      price: isUSD ? "Custom Scope" : "Custom Scope",
      delivery: "3 to 4 Weeks",
      desc: "Tailored e-commerce stores, web portals, SaaS platforms, or headless builds.",
      features: [
        "Unlimited Custom Pages & Components",
        "Stripe / Shopify / Payment Gateways Integration",
        "Backend PostgreSQL Database & API Architecture",
        "Custom 3D / Shader / Canvas Interactions",
        "Dedicated Founder Lead & Ongoing Maintenance",
      ],
      popular: false,
      cta: "Request Custom Scope",
    },
  ];

  return (
    <section id="pricing" className="section-pad relative overflow-hidden" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-light">
            Transparent Pricing
          </span>
          <h2 id="pricing-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            Fixed-Scope Investment. Zero Hidden Fees.
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Choose a plan engineered for maximum return on investment and 14-day speed.
          </p>

          {/* Currency Switcher */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => {
                soundManager.playClick();
                setCurrency("USD");
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                currency === "USD"
                  ? "bg-gradient-to-r from-electric to-royal text-white shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setCurrency("INR");
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                currency === "INR"
                  ? "bg-gradient-to-r from-electric to-royal text-white shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              INR (₹)
            </button>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              onMouseEnter={() => soundManager.playHover()}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 shadow-xl backdrop-blur-xl transition-all duration-300 ${
                tier.popular
                  ? "border-cyan-light bg-gradient-to-b from-[#0e163b] to-[#070b1e] shadow-[0_20px_60px_rgba(34,211,238,0.25)] lg:-translate-y-2"
                  : "border-white/10 bg-[#070b1e]/80 hover:border-white/20"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-cyan to-electric px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-space-black shadow-md">
                  RECOMMENDED
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-light">
                  {tier.badge}
                </span>

                <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-black text-white">
                    {tier.price}
                  </span>
                  <span className="text-xs text-white/50 font-mono">/ {tier.delivery}</span>
                </div>

                <p className="mt-3 text-xs text-white/70 leading-relaxed">
                  {tier.desc}
                </p>

                <div className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white/90">
                      <CheckCircle2 className="h-4 w-4 text-cyan-light shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={`https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(tier.name)}%20package.`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold transition-all ${
                    tier.popular
                      ? "bg-gradient-to-r from-electric via-royal to-cyan text-white shadow-lg hover:scale-105"
                      : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <Zap className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive ROI Revenue Estimator Widget */}
        <div className="mt-16 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0a0f2b] to-[#050816] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan/10 border border-cyan/30 px-3.5 py-1 text-xs font-bold text-cyan-light font-mono">
                <Calculator className="h-4 w-4" /> Interactive Return on Investment Estimator
              </span>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-white">
                Calculate Your Projected Monthly Revenue Gain
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-white/60">
                Adjust the sliders to see how a high-converting ManickVerse redesign impacts your top-line revenue.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan/40 bg-cyan/10 p-5 text-center shrink-0">
              <span className="block text-xs font-bold uppercase tracking-wider text-cyan-light">
                Projected Monthly Revenue Lift
              </span>
              <span className="font-display text-3xl sm:text-4xl font-black text-emerald-400 mt-1 block">
                +${monthlyGain.toLocaleString()}
              </span>
              <span className="text-[10px] text-white/50 font-mono">Based on estimated 1.8x conversion bump</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {/* Slider 1 */}
            <div>
              <div className="flex justify-between text-xs text-white mb-2">
                <span className="font-medium text-white/70">Monthly Visitors</span>
                <span className="font-bold text-cyan-light">{visitors.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full accent-cyan-light cursor-pointer"
              />
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex justify-between text-xs text-white mb-2">
                <span className="font-medium text-white/70">Avg Lead / Order Value</span>
                <span className="font-bold text-cyan-light">${leadValue}</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={leadValue}
                onChange={(e) => setLeadValue(Number(e.target.value))}
                className="w-full accent-cyan-light cursor-pointer"
              />
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex justify-between text-xs text-white mb-2">
                <span className="font-medium text-white/70">Current Conversion Rate</span>
                <span className="font-bold text-cyan-light">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-cyan-light cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
