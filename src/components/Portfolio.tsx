"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Star, Zap, Eye, X, Globe, Gauge } from "lucide-react";
import { Reveal, RevealGroup } from "@/lib/motion";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { soundManager } from "@/lib/audio";

interface Project {
  id: string;
  title: string;
  category: string;
  industry: string;
  tagline: string;
  metric: string;
  speed: string;
  deliverables: string[];
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    id: "saffron",
    title: "Saffron & Sage",
    category: "Hospitality & Dining",
    industry: "Restaurants",
    tagline: "Fine dining interactive menu & instant table reservation engine.",
    metric: "+210% Online Orders",
    speed: "100/100 Mobile",
    deliverables: ["Custom Digital Menu", "Reservation Portal", "Google Maps & Local SEO"],
    gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
  },
  {
    id: "meridian",
    title: "Meridian Estates",
    category: "Real Estate & Architecture",
    industry: "Real Estate",
    tagline: "Ultra-luxury architectural property gallery with 3D virtual tour embeds.",
    metric: "$14.2M Property Leads",
    speed: "99/100 Desktop",
    deliverables: ["Interactive Listing Filter", "Virtual Tour Viewer", "Lead Routing Automation"],
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
  },
  {
    id: "lumen",
    title: "Lumen Apparel",
    category: "E-Commerce & Fashion",
    industry: "E-Commerce",
    tagline: "Headless e-commerce storefront with sub-second page loads & express cart.",
    metric: "+180% Checkout Conversion",
    speed: "100/100 Web Vitals",
    deliverables: ["Stripe Express Checkout", "High-FPS Product Viewer", "Inventory Sync"],
    gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
  },
  {
    id: "wellpoint",
    title: "Wellpoint Medical Clinic",
    category: "Healthcare & Wellness",
    industry: "Medical",
    tagline: "Patient appointment scheduling portal with HIPAA-aligned security.",
    metric: "+320% Online Bookings",
    speed: "100/100 Speed Score",
    deliverables: ["Patient Intake Flow", "Doctor Schedule Sync", "Accessibility WCAG AAA"],
    gradient: "from-blue-500/20 via-indigo-600/10 to-transparent",
  },
  {
    id: "aravind",
    title: "Coach Aravind",
    category: "Personal Brand & Executive Coaching",
    industry: "Coaching",
    tagline: "Editorial, high-authority personal branding hub for leadership keynotes.",
    metric: "100% Fully Booked Cohort",
    speed: "100/100 Speed Score",
    deliverables: ["Video Keynote Showcase", "Masterclass Signup Funnel", "Lead Magnet Delivery"],
    gradient: "from-purple-500/20 via-royal/10 to-transparent",
  },
];

const CATEGORIES = ["All", "Restaurants", "Real Estate", "E-Commerce", "Medical", "Coaching"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.industry === activeCategory);

  return (
    <section id="work" className="section-pad relative overflow-hidden" aria-labelledby="work-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-light">
            Selected Work & Impact
          </span>
          <h2 id="work-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            Flagship Websites Built to Win
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Explore recent projects where ManickVerse elevated brand presence and dramatically boosted online conversion metrics.
          </p>
        </Reveal>

        {/* Industry Category Filter Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat);
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-electric to-royal text-white shadow-md border border-cyan-light/40"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(proj);
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#070b1e]/80 p-7 shadow-xl backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-cyan-light/50 hover:bg-[#0b1028] hover:-translate-y-1.5"
            >
              <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${proj.gradient}`} />

              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/70">
                    {proj.category}
                  </span>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 font-mono">
                    {proj.speed}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-extrabold text-white group-hover:text-cyan-light transition-colors flex items-center justify-between">
                  <span>{proj.title}</span>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-light" />
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                  {proj.tagline}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-light">
                  {proj.metric}
                </span>
                <span className="text-xs font-semibold text-white/50 group-hover:text-white">
                  Inspect Case Study →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Before vs After Interactive Showcase Component */}
        <BeforeAfterSlider />
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#080d24] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close Case Study"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="rounded-full bg-cyan/20 border border-cyan/40 px-3 py-1 text-xs font-bold text-cyan-light font-mono">
                {selectedProject.category}
              </span>

              <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="mt-2 text-sm text-white/80">
                {selectedProject.tagline}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <span className="block text-[11px] text-white/50 font-mono">Business Impact</span>
                  <span className="text-base font-extrabold text-cyan-light">{selectedProject.metric}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-white/50 font-mono">Performance Standard</span>
                  <span className="text-base font-extrabold text-emerald-400">{selectedProject.speed}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-bold font-mono text-cyan-light uppercase tracking-wider mb-2">
                  Key Production Deliverables
                </h4>
                <div className="space-y-2">
                  {selectedProject.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                      <CheckCircle2 className="h-4 w-4 text-cyan-light shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full bg-gradient-to-r from-electric to-royal px-6 py-2.5 text-xs font-bold text-white shadow-lg"
                >
                  Close Showcase
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
