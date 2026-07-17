"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, Search, HelpCircle, Sparkles } from "lucide-react";
import { Reveal } from "@/lib/motion";
import { soundManager } from "@/lib/audio";

const FAQS = [
  {
    q: "How can ManickVerse deliver a production website in just 14 days?",
    a: "We operate with dedicated, small cross-functional teams (designer + frontend engineer) focused solely on your project during your sprint. By eliminating unnecessary agency layers, using modern Next.js architecture, and following a battle-tested milestone schedule, we launch in 2 weeks without ever cutting design or performance corners.",
  },
  {
    q: "What if my project requires custom e-commerce or complex backend APIs?",
    a: "Most business sites, personal brands, and landing pages land squarely within our 14-day window. For larger e-commerce stores with hundreds of SKUs or custom SaaS web portals, delivery ranges between 3 to 4 weeks. We provide an exact guaranteed timeline during our kickoff call.",
  },
  {
    q: "Will I be able to edit and manage content myself after launch?",
    a: "Yes! We build clean content editing workflows (via headless CMS or dynamic Markdown/JSON structures) so your team can easily update text, add blog posts, or publish new products without writing code.",
  },
  {
    q: "How does ManickVerse ensure 100/100 Core Web Vitals speed?",
    a: "We engineer using Next.js App Router, Tailwind CSS v4, dynamic code splitting, automated WebP image optimization, serverless edge caching, and semantic HTML5 markup. Every website passes Google Lighthouse performance audits before going live.",
  },
  {
    q: "What are the payment terms?",
    a: "We work with a standard 50/50 model: 50% deposit at project kickoff to reserve your dedicated 2-week build sprint, and the remaining 50% upon final approval and live domain deployment.",
  },
  {
    q: "Do you handle domain setup, hosting, and ongoing support?",
    a: "Yes! We configure your custom domain, SSL security, global Vercel Edge CDN hosting, and Google Search Console indexing. Every plan includes post-launch support and optional ongoing concierge care.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filterQuery, setFilterQuery] = useState("");

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(filterQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section id="faq" className="section-pad relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-light">
            Got Questions?
          </span>
          <h2 id="faq-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Everything you need to know about our 2-week production pipeline and agency promise.
          </p>

          {/* Search Bar inside FAQ */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter questions (e.g. speed, hosting, payment)..."
              className="w-full rounded-full border border-white/15 bg-white/5 pl-11 pr-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-light transition-all"
            />
          </div>
        </Reveal>

        <div className="mt-12 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-xs text-white/50">
              No matching questions found. Ask our AI Concierge or chat with us on WhatsApp!
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#070b1e]/80 backdrop-blur-xl transition-colors hover:border-white/20"
                >
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setOpenIdx(isOpen ? null : idx);
                    }}
                    className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-base text-white pr-4">
                      {faq.q}
                    </span>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-light">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="border-t border-white/10 p-6 pt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
