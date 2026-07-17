"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowRight,
  Zap,
} from "lucide-react";
import { soundManager } from "@/lib/audio";

const LINKS = [
  { href: "#why", label: "Why Us" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "2-Week Roadmap" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar({
  onOpenCommand,
  onOpenAI,
}: {
  onOpenCommand?: () => void;
  onOpenAI?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    setSoundOn(soundManager.isEnabled());
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleSound = () => {
    const next = soundManager.toggle();
    setSoundOn(next);
    if (next) soundManager.playSuccess();
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#04050a]/80 backdrop-blur-2xl border-b border-white/10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <a
          href="#"
          onClick={() => soundManager.playClick()}
          className="group flex items-center gap-2.5 focus-visible:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-electric via-royal to-cyan p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#050611]">
              <span className="font-display font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-light via-white to-electric-light">
                M
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-light transition-colors">
              Manick<span className="text-cyan-light">Verse</span>
            </span>
            <span className="text-[10px] font-mono font-medium text-white/50 tracking-wider">
              2-WEEK DIGITAL STUDIO
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => soundManager.playHover()}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all"
            title={soundOn ? "Sound Effects ON" : "Sound Effects OFF"}
            aria-label="Toggle Sound"
          >
            {soundOn ? (
              <Volume2 className="h-4 w-4 text-cyan-light" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          {/* Command Palette Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenCommand) onOpenCommand();
            }}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:border-cyan-light/50 hover:bg-white/10 hover:text-white transition-all"
            aria-label="Open Search Command Palette"
          >
            <Search className="h-3.5 w-3.5 text-cyan-light" />
            <span className="hidden md:inline font-mono text-[11px] text-white/40">Ctrl K</span>
          </button>

          {/* AI Concierge Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenAI) onOpenAI();
            }}
            className="hidden xl:flex items-center gap-1.5 rounded-xl border border-electric/30 bg-electric/10 px-3 py-2 text-xs font-semibold text-cyan-light hover:bg-electric/20 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask AI</span>
          </button>

          {/* Book Call CTA */}
          <a
            href="https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20want%20to%20discuss%20a%20website%20project."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-electric via-royal to-cyan px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Book Strategy Call</span>
            <Zap className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenCommand) onOpenCommand();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
            aria-label="Open Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setOpen(!open);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-[#060814]/95 backdrop-blur-2xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-3 px-6 py-6 text-sm font-medium">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    soundManager.playClick();
                    setOpen(false);
                  }}
                  className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-white/40" />
                </a>
              ))}

              <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setOpen(false);
                    if (onOpenAI) onOpenAI();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-electric/30 bg-electric/10 py-3 text-sm font-semibold text-cyan-light"
                >
                  <Sparkles className="h-4 w-4" />
                  Ask AI Concierge
                </button>
                <a
                  href="https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20want%20to%20discuss%20a%20website%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-royal py-3.5 text-sm font-bold text-white shadow-lg"
                >
                  Book 15-Min Strategy Call
                  <Zap className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
