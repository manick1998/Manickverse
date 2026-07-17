"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle, Sparkles } from "lucide-react";
import { Reveal, RevealGroup } from "@/lib/motion";
import { soundManager } from "@/lib/audio";

const TESTIMONIALS = [
  {
    name: "Priya Raman",
    role: "Founder, Saffron & Sage Dining",
    initials: "PR",
    quote:
      "ManickVerse rebuilt our website in 11 days. Online reservation bookings surged by over 200% within the first month. The aesthetic is genuinely world-class.",
    outcome: "+210% Online Orders",
    speed: "11 Days Delivery",
  },
  {
    name: "Dr. Arjun Nair",
    role: "Director, Wellpoint Medical Portal",
    initials: "AN",
    quote:
      "Patients constantly praise how clean, fast, and trustworthy our new medical portal feels. The instant appointment booking flow saved our front desk hours every day.",
    outcome: "+320% Digital Appointments",
    speed: "14 Days Delivery",
  },
  {
    name: "Karthik Subramaniam",
    role: "Founder, Meridian Estates",
    initials: "KS",
    quote:
      "Sharp design direction, fast execution, and a website that rivals global luxury real estate agencies. Handled custom 3D property tours effortlessly.",
    outcome: "$14.2M Property Pipeline",
    speed: "13 Days Delivery",
  },
  {
    name: "Meera Iyer",
    role: "Leadership Coach & Speaker",
    initials: "MI",
    quote:
      "From strategic wireframing to final launch, the ManickVerse founders felt like true partners. My executive personal brand site now consistently converts visitors.",
    outcome: "100% Cohort Capacity",
    speed: "10 Days Delivery",
  },
  {
    name: "Vignesh Kumar",
    role: "Owner, Lumen Apparel",
    initials: "VK",
    quote:
      "Our e-commerce store looks like an Apple product release. Sub-second page loads on mobile 4G, seamless checkout, and zero layout shift.",
    outcome: "100/100 Core Web Vitals",
    speed: "14 Days Delivery",
  },
  {
    name: "Grace Thomas",
    role: "Administrator, St. Mary's Academy",
    initials: "GT",
    quote:
      "They understood our institution's requirements completely. Warm, accessible, and extraordinarily fast on every device.",
    outcome: "WCAG AAA Accessible",
    speed: "12 Days Delivery",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-light">
            Client Proof & Reviews
          </span>
          <h2 id="testimonials-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            Loved by Founders, CEOs & Creative Leaders
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Read how our 2-week digital delivery transformed brand presence and revenue for our partners.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#070b1e]/80 p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-light/50 hover:bg-[#0c1230] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="rounded-full bg-cyan/15 border border-cyan/30 px-2.5 py-0.5 text-[10px] font-bold font-mono text-cyan-light">
                    {item.speed}
                  </span>
                </div>

                <p className="mt-5 text-xs sm:text-sm text-white/80 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-electric to-royal text-xs font-bold text-white shadow-md">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{item.name}</h4>
                    <p className="text-[11px] text-white/50">{item.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] font-mono font-bold text-emerald-400">
                    {item.outcome}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
