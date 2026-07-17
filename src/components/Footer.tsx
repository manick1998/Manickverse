"use client";

import { ArrowUp, Heart, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/audio";

export default function Footer() {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#03040a] text-white/70 pt-16 pb-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-electric via-royal to-cyan p-0.5 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#050611]">
                  <span className="font-display font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-light via-white to-electric-light">
                    M
                  </span>
                </div>
              </div>
              <span className="font-display text-xl font-extrabold text-white">
                Manick<span className="text-cyan-light">Verse</span>
              </span>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              Crafting Extraordinary Digital Experiences. Helping ambitious businesses dominate online through high-converting, award-worthy Next.js websites.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1.5 text-[11px] font-bold font-mono text-cyan-light">
              🚀 2-Week Guaranteed Delivery
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#why" onClick={() => soundManager.playHover()} className="hover:text-cyan-light transition-colors">
                  Why ManickVerse
                </a>
              </li>
              <li>
                <a href="#services" onClick={() => soundManager.playHover()} className="hover:text-cyan-light transition-colors">
                  Digital Services
                </a>
              </li>
              <li>
                <a href="#process" onClick={() => soundManager.playHover()} className="hover:text-cyan-light transition-colors">
                  14-Day Delivery Roadmap
                </a>
              </li>
              <li>
                <a href="#work" onClick={() => soundManager.playHover()} className="hover:text-cyan-light transition-colors">
                  Selected Portfolio Work
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={() => soundManager.playHover()} className="hover:text-cyan-light transition-colors">
                  Pricing & ROI Calculator
                </a>
              </li>
              <li>
                <a href="#faq" onClick={() => soundManager.playHover()} className="hover:text-cyan-light transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Expertise
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>High-Converting Landing Pages</li>
              <li>Corporate Business Websites</li>
              <li>E-Commerce Storefronts</li>
              <li>Portfolio & Personal Brands</li>
              <li>Complete Website Redesigns</li>
              <li>SEO Schema & Speed Optimization</li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-cyan-light shrink-0" />
                <a href="tel:+919361099051" className="hover:text-cyan-light font-mono">
                  +91 9361099051
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-cyan-light shrink-0" />
                <a href="mailto:contact@manickverse.com" className="hover:text-cyan-light">
                  contact@manickverse.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-cyan-light shrink-0" />
                <span>Puducherry & Global Digital Studio</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} ManickVerse. All rights reserved.</p>

          <p className="flex items-center gap-1">
            Handcrafted with precision & Next.js by <span className="font-bold text-white">ManickVerse</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
