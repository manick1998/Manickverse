"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IndustryMarquee from "@/components/IndustryMarquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import DeliveryPromise from "@/components/DeliveryPromise";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CommandPalette from "@/components/CommandPalette";
import AIChatBubble from "@/components/AIChatBubble";

export default function HomePage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Cosmic Dark");

  const handleToggleTheme = () => {
    const themes = ["Cosmic Dark", "Cyber Violet", "Emerald Obsidian", "Light Mode"];
    const nextIdx = (themes.indexOf(currentTheme) + 1) % themes.length;
    setCurrentTheme(themes[nextIdx]);
  };

  return (
    <>
      <Navbar
        onOpenCommand={() => setCommandOpen(true)}
        onOpenAI={() => setAiOpen(true)}
      />

      <main id="main-content" className="relative">
        <Hero />
        <IndustryMarquee />
        <WhyChooseUs />
        <Services />
        <DeliveryPromise />
        <Process />
        <Portfolio />
        <Pricing />
        <Results />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
      <FloatingButtons />

      {/* Global Modals & Overlay Widgets */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onOpenAI={() => setAiOpen(true)}
        onToggleTheme={handleToggleTheme}
        currentTheme={currentTheme}
      />

      <AIChatBubble
        isOpen={aiOpen}
        setIsOpen={setAiOpen}
      />
    </>
  );
}
