"use client";

import {
  UtensilsCrossed,
  Building2,
  ShoppingBag,
  Stethoscope,
  UserCheck,
  Cpu,
  GraduationCap,
  Car,
  Briefcase,
  Layers,
} from "lucide-react";

const INDUSTRIES = [
  { icon: UtensilsCrossed, name: "Restaurants & Fine Dining" },
  { icon: Building2, name: "Real Estate & Luxury Estates" },
  { icon: ShoppingBag, name: "E-Commerce & DTC Fashion" },
  { icon: Stethoscope, name: "Hospitals & Medical Clinics" },
  { icon: UserCheck, name: "Coaches & Personal Brands" },
  { icon: Cpu, name: "SaaS & AI Tech Startups" },
  { icon: GraduationCap, name: "Education & Academies" },
  { icon: Car, name: "Automotive & Fleet Services" },
  { icon: Briefcase, name: "Legal & Advisory Firms" },
  { icon: Layers, name: "Local Enterprise Services" },
];

export default function IndustryMarquee() {
  return (
    <section aria-label="Industries We Serve" className="relative border-y border-white/10 bg-[#050713]/80 py-8 overflow-hidden backdrop-blur-md">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050611] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050611] to-transparent" />

      <div className="flex w-max animate-marquee space-x-6">
        {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white/80 transition-all duration-300 hover:border-cyan-light/40 hover:bg-white/10 hover:text-white shrink-0"
            >
              <Icon className="h-4 w-4 text-cyan-light" />
              <span>{ind.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
