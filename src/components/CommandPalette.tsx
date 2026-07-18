"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Compass,
  Briefcase,
  Layers,
  Calculator,
  MessageSquare,
  Volume2,
  VolumeX,
  PhoneCall,
  ArrowRight,
  Sun,
  Moon,
  Zap,
} from "lucide-react";
import { soundManager } from "@/lib/audio";

interface CommandItem {
  id: string;
  category: "Navigation" | "Actions" | "Preferences";
  title: string;
  subtitle: string;
  icon: any;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleTheme,
  currentTheme,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenAI?: () => void;
  onToggleTheme?: () => void;
  currentTheme?: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSoundOn(soundManager.isEnabled());
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleToggleSound = useCallback(() => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
    if (newState) soundManager.playSuccess();
  }, []);

  const items: CommandItem[] = [
    {
      id: "nav-services",
      category: "Navigation",
      title: "Explore Services",
      subtitle: "Landing Pages, E-Commerce, Custom Web Apps, Redesigns",
      icon: Layers,
      action: () => {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-work",
      category: "Navigation",
      title: "View Selected Work",
      subtitle: "Explore our portfolio & live redesign transformations",
      icon: Briefcase,
      action: () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-process",
      category: "Navigation",
      title: "2-Week Development Roadmap",
      subtitle: "See how we go from Day 1 Kickoff to Day 14 Launch",
      icon: Compass,
      action: () => {
        document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-pricing",
      category: "Navigation",
      title: "Pricing & ROI Calculator",
      subtitle: "Transparent packages and instant revenue growth estimator",
      icon: Calculator,
      action: () => {
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Start Your Project",
      subtitle: "Get a free 20-min strategy session & proposal",
      icon: Zap,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "action-whatsapp",
      category: "Actions",
      title: "Chat on WhatsApp Direct",
      subtitle: "Instant response from our team founders (+91 9361099051)",
      icon: MessageSquare,
      action: () => {
        window.open(
          "https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20found%20you%20via%20Command%20Palette%20and%20want%20to%20discuss%20a%20project.",
          "_blank"
        );
        onClose();
      },
    },
    {
      id: "action-call",
      category: "Actions",
      title: "Direct Phone Call",
      subtitle: "Speak directly to engineering & design (+91 9361099051)",
      icon: PhoneCall,
      action: () => {
        window.location.href = "tel:+919361099051";
        onClose();
      },
    },
    {
      id: "pref-sound",
      category: "Preferences",
      title: soundOn ? "Mute UI Sound Effects" : "Enable Tactile Sound Effects",
      subtitle: "Synthesized Web Audio clicks and hover micro-interactions",
      icon: soundOn ? VolumeX : Volume2,
      action: () => {
        handleToggleSound();
      },
    },
    {
      id: "pref-theme",
      category: "Preferences",
      title: `Switch Theme (${currentTheme || "Cosmic"})`,
      subtitle: "Toggle color themes for optimal viewing contrast",
      icon: currentTheme === "Light Mode" ? Moon : Sun,
      action: () => {
        if (onToggleTheme) onToggleTheme();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      soundManager.playHover();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
      soundManager.playHover();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        soundManager.playClick();
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#080c1e]/95 shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl"
            onKeyDown={handleKeyDown}
          >
            {/* Top Search Header */}
            <div className="relative flex items-center border-b border-white/10 px-4 py-3.5">
              <Search className="h-5 w-5 text-electric-light mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or section... (e.g. Services, Pricing, Sound, Contact)"
                className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
              <button
                onClick={onClose}
                className="ml-2 rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close Command Palette"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="max-h-[360px] overflow-y-auto p-2 scrollbar-none">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-white/50">
                  No matching commands found. Try searching for &quot;Services&quot;, &quot;Pricing&quot;, or &quot;Work&quot;.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        soundManager.playClick();
                        item.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group flex items-center justify-between rounded-xl p-3 cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? "bg-gradient-to-r from-electric/20 to-royal/20 border border-white/15 text-white shadow-md"
                          : "text-white/80 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                            isSelected
                              ? "border-electric-light/50 bg-electric/20 text-cyan-light"
                              : "border-white/10 bg-white/5 text-white/60"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white flex items-center gap-2">
                            {item.title}
                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/50">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-xs text-white/50">{item.subtitle}</div>
                        </div>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isSelected ? "translate-x-1 text-cyan-light opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-2 text-[11px] text-white/40 font-mono">
              <div className="flex items-center gap-3">
                <span><kbd className="rounded bg-white/10 px-1 py-0.5">↑↓</kbd> Navigate</span>
                <span><kbd className="rounded bg-white/10 px-1 py-0.5">↵</kbd> Select</span>
                <span><kbd className="rounded bg-white/10 px-1 py-0.5">ESC</kbd> Close</span>
              </div>
              <div>ManickVerse Command Center</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
