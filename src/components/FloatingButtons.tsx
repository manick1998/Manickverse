"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageSquare, Phone } from "lucide-react";
import { soundManager } from "@/lib/audio";

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%27d%20like%20to%20discuss%20a%20website%20project."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundManager.playClick()}
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-space-black shadow-[0_5px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="h-5 w-5 fill-current" />
      </a>

      {/* Call Button */}
      <a
        href="tel:+919361099051"
        onClick={() => soundManager.playClick()}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#0a0f2b] text-cyan-light shadow-[0_5px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110"
        title="Direct Call"
        aria-label="Direct Call"
      >
        <Phone className="h-5 w-5" />
      </a>

      {/* Scroll to Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
