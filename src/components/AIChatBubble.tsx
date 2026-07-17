"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Zap,
  Calendar,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { soundManager } from "@/lib/audio";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  options?: { label: string; actionText: string }[];
  cta?: { label: string; href: string };
}

const PRESET_QUESTIONS = [
  "🚀 How can you deliver a site in 2 weeks?",
  "💰 How much does a custom website cost?",
  "🎨 Can you redesign my existing website?",
  "📅 Book a free 15-min strategy call",
];

export default function AIChatBubble({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am ManickVerse Concierge — your dedicated digital strategy consultant. How can I help launch or elevate your online presence today?",
      options: [
        { label: "🚀 How 2-Week Delivery Works", actionText: "How does the 2-week delivery promise work?" },
        { label: "💰 Get Estimated Pricing", actionText: "How much does a website cost?" },
        { label: "⚡ Request Redesign Audit", actionText: "Can I request an audit of my existing website?" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateAIResponse = (userText: string) => {
    setIsTyping(true);
    const query = userText.toLowerCase();

    setTimeout(() => {
      let replyText = "";
      let options: { label: string; actionText: string }[] | undefined;
      let cta: { label: string; href: string } | undefined;

      if (query.includes("2 week") || query.includes("timeline") || query.includes("how does") || query.includes("fast")) {
        replyText =
          "Our 14-day delivery is backed by a structured production framework:\n\n• Days 1-2: Discovery & Strategy\n• Days 3-4: Sitemap & High-Fidelity Wireframes\n• Days 5-7: UI/UX Master Design in Framer/Figma\n• Days 8-11: Production Next.js + Tailwind Engineering\n• Days 12-13: Testing, Speed 100 Audit & SEO Setup\n• Day 14: Live Deployment 🚀\n\nNo delays, no missing deadlines.";
        options = [
          { label: "💰 What's the price?", actionText: "What is the cost for a 2-week build?" },
          { label: "📅 Schedule Discovery Call", actionText: "I want to schedule a call" },
        ];
      } else if (query.includes("price") || query.includes("cost") || query.includes("budget") || query.includes("package")) {
        replyText =
          "We offer transparent, fixed-scope pricing designed for fast ROI:\n\n1️⃣ Starter MVP: Single High-Converting Landing Page (3-5 Days)\n2️⃣ Growth Pro (Most Popular): Full 5-8 Page High-Performance Business Site (14 Days)\n3️⃣ Enterprise: Custom E-Commerce & Web Platforms (3-4 Weeks)\n\nEvery project includes 100/100 Lighthouse speed, SEO Schema, custom animations, and responsive support.";
        cta = { label: "View Detailed Pricing Tiers", href: "#pricing" };
      } else if (query.includes("redesign") || query.includes("existing") || query.includes("audit")) {
        replyText =
          "Absolutely! Over 60% of our projects are complete website redesigns. We take outdated, slow sites and convert them into hyper-modern, award-winning, fast-loading revenue engines. Check out our Before vs After interactive slider above!";
        cta = { label: "See Before vs After Redesigns", href: "#work" };
      } else if (query.includes("call") || query.includes("book") || query.includes("schedule") || query.includes("contact")) {
        replyText =
          "Great! You can schedule a direct strategy call or connect immediately on WhatsApp. Our founders are ready to review your goals and provide an exact scope breakdown.";
        cta = { label: "WhatsApp Us Directly (+91 9361099051)", href: "https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20want%20to%20book%20a%20project%20call." };
      } else {
        replyText =
          `Thank you for reaching out! At ManickVerse, we specialize in high-converting Next.js websites built in 2 weeks. Whether you need an e-commerce platform, landing page, real estate site, personal brand, or complete redesign, we're here to help.`;
        options = [
          { label: "📅 Book Discovery Session", actionText: "How do I book a call?" },
          { label: "📱 WhatsApp Founders", actionText: "Connect on WhatsApp" },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: replyText,
          options,
          cta,
        },
      ]);
      setIsTyping(false);
      soundManager.playSuccess();
    }, 800);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    soundManager.playClick();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    generateAIResponse(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="mb-4 flex flex-col h-[520px] w-[350px] sm:w-[390px] overflow-hidden rounded-3xl border border-white/20 bg-[#070b1b]/95 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-electric/20 via-royal/20 to-cyan/10 p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric to-royal p-0.5 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#090d24]">
                    <Sparkles className="h-5 w-5 text-cyan-light animate-pulse" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#070b1b] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                    ManickVerse AI Concierge
                  </h3>
                  <p className="text-[11px] text-cyan-light">Always Active • 2-Week Guarantee</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-none">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-electric to-royal text-white rounded-br-none shadow-md"
                        : "border border-white/10 bg-white/5 text-white/90 rounded-bl-none shadow-sm backdrop-blur-md"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {msg.cta && (
                      <a
                        href={msg.cta.href}
                        target={msg.cta.href.startsWith("http") ? "_blank" : "_self"}
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-cyan/20 border border-cyan/40 px-3 py-2 text-xs font-bold text-cyan-light hover:bg-cyan/30 transition-colors"
                        onClick={() => {
                          soundManager.playClick();
                          if (msg.cta?.href.startsWith("#")) {
                            setIsOpen(false);
                          }
                        }}
                      >
                        <Zap className="h-3.5 w-3.5" />
                        {msg.cta.label}
                      </a>
                    )}
                  </div>

                  {/* Option pills */}
                  {msg.options && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(opt.actionText)}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/80 hover:border-cyan-light/50 hover:bg-cyan-light/10 hover:text-cyan-light transition-all text-left"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <Bot className="h-4 w-4 animate-bounce text-electric-light" />
                  <span>Analyzing scope & crafting response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="border-t border-white/10 bg-black/40 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything or describe your site requirement..."
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-electric-light transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-electric to-royal text-white disabled:opacity-40 transition-transform active:scale-95"
                  aria-label="Send Message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          soundManager.playClick();
          setIsOpen(!isOpen);
        }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan/40 bg-gradient-to-tr from-electric via-royal to-cyan text-white shadow-[0_10px_35px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_15px_45px_rgba(34,211,238,0.7)]"
        aria-label="Toggle AI Concierge Chat"
      >
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan to-electric opacity-40 blur-md group-hover:opacity-80 transition-opacity" />

        {isOpen ? (
          <X className="relative h-6 w-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-light"></span>
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
