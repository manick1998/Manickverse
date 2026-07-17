"use client";

import { Phone, MessageSquare, ShieldCheck, Clock, Award } from "lucide-react";
import { Reveal } from "@/lib/motion";
import ContactForm from "./ContactForm";
import { soundManager } from "@/lib/audio";

export default function CTA() {
  return (
    <section id="contact" className="relative section-pad overflow-hidden" aria-labelledby="cta-heading">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.16),transparent_65%)]" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-royal/15 blur-[150px]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-light font-mono">
              Ready to Dominate Online?
            </span>
            <h2
              id="cta-heading"
              className="mt-4 font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-extrabold leading-[1.05] text-white"
            >
              Start Your Dream
              <br />
              <span className="text-gradient">Website Today.</span>
            </h2>
            <p className="mt-6 max-w-md text-base sm:text-lg text-white/70 leading-relaxed">
              Tell us about your business goals and we&apos;ll map out exactly how ManickVerse will deliver your award-winning website in 2 weeks.
            </p>
          </Reveal>

          {/* Quick Action Badges */}
          <Reveal delay={0.15} className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Guaranteed 14-Day Delivery</h4>
                <p className="text-xs text-white/60">Strict sprint schedule with milestone progress updates</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/20 text-cyan-light">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">100/100 Core Web Vitals Standard</h4>
                <p className="text-xs text-white/60">Sub-second page speeds, zero layout shift & rich SEO schema</p>
              </div>
            </div>
          </Reveal>

          {/* Direct Channels */}
          <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-4">
            <a
              href="https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%27d%20like%20to%20start%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-xs font-bold text-space-black shadow-[0_0_30px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Us Direct (+91 9361099051)</span>
            </a>

            <a
              href="tel:+919361099051"
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
            >
              <Phone className="h-4 w-4 text-cyan-light" />
              <span>Call Founding Team</span>
            </a>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
