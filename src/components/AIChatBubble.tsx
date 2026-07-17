"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  Zap,
  Calendar,
  CheckCircle,
  Calculator,
  Mic,
} from "lucide-react";
import { soundManager } from "@/lib/audio";

interface ChatCard {
  type: "estimate" | "audit" | "booking" | "case_study";
  data: any;
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  card?: ChatCard;
  options?: { label: string; actionText: string }[];
  cta?: { label: string; href: string };
}

const CATEGORY_TABS = [
  { id: "all", label: "✨ All Capabilities" },
  { id: "estimate", label: "💰 Cost Estimator" },
  { id: "audit", label: "🔍 Free UX Audit" },
  { id: "booking", label: "📅 Book Sprint" },
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
      text: "👋 Welcome to ManickVerse AI Strategy Engine! I am your digital consultant. How can I help launch or elevate your brand online?",
      options: [
        { label: "💰 Calculate Project Estimate", actionText: "Estimate project cost for my site" },
        { label: "🔍 Audit My Website UX/SEO", actionText: "Audit my current website" },
        { label: "⚡ 14-Day Delivery Process", actionText: "Explain the 2-week delivery process" },
        { label: "📅 Book 15-Min Strategy Call", actionText: "Book a strategy call" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleVoiceInput = () => {
    soundManager.playClick();
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser. Please type your message.");
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } catch {
      setIsListening(false);
    }
  };

  const generateAIResponse = (userText: string) => {
    setIsTyping(true);
    const query = userText.toLowerCase();

    setTimeout(() => {
      let replyText = "";
      let options: { label: string; actionText: string }[] | undefined;
      let cta: { label: string; href: string } | undefined;
      let card: ChatCard | undefined;

      if (
        query.includes("estimate") ||
        query.includes("cost") ||
        query.includes("price") ||
        query.includes("calculate") ||
        query.includes("budget")
      ) {
        replyText =
          "Here is an instant AI cost breakdown based on our 14-day delivery promise:";
        card = {
          type: "estimate",
          data: {
            title: "Project Scope Breakdown",
            starter: "$1,490 (3-5 Days MVP)",
            growth: "$2,990 (14 Days Flagship)",
            features: [
              "Custom Framer/Next.js 16 Architecture",
              "100/100 Core Web Vitals Performance",
              "JSON-LD SEO Schema Integration",
              "Netlify Edge CDN Deployment",
            ],
          },
        };
        options = [
          { label: "🚀 Start 14-Day Sprint", actionText: "I want to start a 14-day build sprint" },
          { label: "💬 Chat on WhatsApp", actionText: "Chat on WhatsApp" },
        ];
      } else if (
        query.includes("audit") ||
        query.includes("existing") ||
        query.includes("review") ||
        query.includes("redesign") ||
        query.includes(".com") ||
        query.includes("http")
      ) {
        replyText =
          "⚡ AI Diagnostic Audit Triggered:";
        card = {
          type: "audit",
          data: {
            title: "Website Health & UX Audit",
            score: "38/100 Legacy Benchmark",
            potentialScore: "100/100 ManickVerse Target",
            bottlenecks: [
              "Slow LCP load time (>3.8s)",
              "Unoptimized image layout shifts",
              "Missing JSON-LD structured schema",
              "Low mobile contrast CTAs",
            ],
          },
        };
        options = [
          { label: "✨ View Redesign Case Studies", actionText: "Show me redesign case studies" },
          { label: "📅 Schedule Walkthrough", actionText: "Book a call to review audit" },
        ];
      } else if (
        query.includes("book") ||
        query.includes("call") ||
        query.includes("schedule") ||
        query.includes("consultation") ||
        query.includes("meeting")
      ) {
        replyText =
          "Select a strategy call time slot below or connect on WhatsApp:";
        card = {
          type: "booking",
          data: {
            title: "15-Min Strategy Session",
            slots: ["Today at 4:00 PM", "Tomorrow at 11:00 AM", "Tomorrow at 3:00 PM"],
          },
        };
        cta = {
          label: "WhatsApp Direct Line (+91 9361099051)",
          href: "https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20want%20to%20schedule%20a%20strategy%20call.",
        };
      } else if (
        query.includes("2 week") ||
        query.includes("process") ||
        query.includes("14 day") ||
        query.includes("guarantee") ||
        query.includes("timeline")
      ) {
        replyText =
          "Our 14-day production pipeline:\n\n• Days 1-2: Discovery & Strategy\n• Days 3-4: Content Wireframes\n• Days 5-7: High-Fidelity UI Design\n• Days 8-11: Production Next.js Build\n• Days 12-13: Speed 100 Audit\n• Day 14: Global Launch 🚀";
        options = [
          { label: "💰 View Pricing Tiers", actionText: "Show pricing packages" },
          { label: "📂 View Selected Work", actionText: "Show case studies" },
        ];
      } else {
        replyText =
          "Thanks for asking! ManickVerse delivers award-winning Next.js websites within 14 days. How can we assist your business?";
        options = [
          { label: "💰 Estimate Cost", actionText: "Estimate project cost for my site" },
          { label: "🔍 Audit Website", actionText: "Audit my current website" },
          { label: "📱 Direct WhatsApp", actionText: "Chat on WhatsApp" },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: replyText,
          card,
          options,
          cta,
        },
      ]);
      setIsTyping(false);
      soundManager.playSuccess();
    }, 700);
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="mb-3 flex flex-col h-[520px] max-h-[82vh] w-[calc(100vw-2rem)] sm:w-[400px] overflow-hidden rounded-3xl border border-white/20 bg-[#060a1a]/95 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-electric/25 via-royal/20 to-cyan/15 p-3.5 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric via-royal to-cyan p-0.5 shadow-lg shrink-0">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#080d26]">
                    <Sparkles className="h-4 w-4 text-cyan-light animate-pulse" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#060a1a] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-white text-xs sm:text-sm flex items-center gap-1.5">
                    ManickVerse AI Intelligence
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-mono text-cyan-light">Active Strategy Engine • 14-Day Speed</p>
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

            {/* Quick Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/10 bg-black/30 p-2 text-[11px] scrollbar-none">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCategory(tab.id);
                    if (tab.id === "estimate") handleSendMessage("Estimate project cost for my site");
                    else if (tab.id === "audit") handleSendMessage("Audit my current website");
                    else if (tab.id === "booking") handleSendMessage("Book a strategy call");
                  }}
                  className={`rounded-full px-2.5 py-1 font-semibold whitespace-nowrap text-[10px] sm:text-xs transition-all ${
                    activeCategory === tab.id
                      ? "bg-gradient-to-r from-electric to-royal text-white shadow-sm border border-cyan-light/40"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 text-xs scrollbar-none">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-electric to-royal text-white rounded-br-none shadow-md font-medium"
                        : "border border-white/10 bg-white/5 text-white/90 rounded-bl-none shadow-sm backdrop-blur-md"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Rich Interactive Cards */}
                    {msg.card && msg.card.type === "estimate" && (
                      <div className="mt-2.5 rounded-xl border border-cyan/40 bg-cyan/10 p-2.5 text-xs text-white">
                        <div className="font-bold text-cyan-light font-mono flex items-center gap-1.5 mb-1.5">
                          <Calculator className="h-3.5 w-3.5" /> {msg.card.data.title}
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 mb-2 font-mono text-[10px]">
                          <div className="bg-white/10 p-1.5 rounded-lg">
                            <span className="block text-white/50">Starter</span>
                            <span className="font-bold text-cyan-light">{msg.card.data.starter}</span>
                          </div>
                          <div className="bg-white/10 p-1.5 rounded-lg">
                            <span className="block text-white/50">Growth</span>
                            <span className="font-bold text-emerald-400">{msg.card.data.growth}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-[10px] text-white/80">
                          {msg.card.data.features.map((f: string, i: number) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.card && msg.card.type === "audit" && (
                      <div className="mt-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-2.5 text-xs text-white">
                        <div className="font-bold text-amber-300 font-mono flex items-center gap-1.5 mb-1.5">
                          {msg.card.data.title}
                        </div>
                        <div className="flex items-center justify-between bg-black/40 p-2 rounded-lg mb-1.5 font-mono text-[10px]">
                          <span className="text-rose-400 font-bold">{msg.card.data.score}</span>
                          <span className="text-emerald-400 font-bold">{msg.card.data.potentialScore}</span>
                        </div>
                      </div>
                    )}

                    {msg.card && msg.card.type === "booking" && (
                      <div className="mt-2.5 rounded-xl border border-purple-500/40 bg-purple-500/10 p-2.5 text-xs text-white">
                        <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5 mb-1.5">
                          <Calendar className="h-3.5 w-3.5" /> {msg.card.data.title}
                        </div>
                        <div className="space-y-1 mb-1">
                          {msg.card.data.slots.map((s: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(`I choose slot: ${s}`)}
                              className="w-full text-left rounded-lg bg-white/10 p-1.5 text-[10px] sm:text-xs font-medium text-white hover:bg-white/20 transition-colors"
                            >
                              👉 {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.cta && (
                      <a
                        href={msg.cta.href}
                        target={msg.cta.href.startsWith("http") ? "_blank" : "_self"}
                        rel="noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl bg-cyan/20 border border-cyan/40 px-3 py-1.5 text-[11px] font-bold text-cyan-light hover:bg-cyan/30 transition-colors"
                        onClick={() => {
                          soundManager.playClick();
                          if (msg.cta?.href.startsWith("#")) {
                            setIsOpen(false);
                          }
                        }}
                      >
                        <Zap className="h-3 w-3" />
                        {msg.cta.label}
                      </a>
                    )}
                  </div>

                  {/* Option pills */}
                  {msg.options && (
                    <div className="mt-1.5 flex flex-wrap gap-1 max-w-[92%]">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(opt.actionText)}
                          className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/80 hover:border-cyan-light/50 hover:bg-cyan-light/10 hover:text-cyan-light transition-all text-left"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-cyan-light text-[11px] font-mono">
                  <Bot className="h-3.5 w-3.5 animate-bounce text-cyan-light" />
                  <span>AI Engine responding...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="border-t border-white/10 bg-black/50 p-2.5 sm:p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-1.5"
              >
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isListening
                      ? "border-rose-500 bg-rose-500/20 text-rose-400 animate-pulse"
                      : "border-white/15 bg-white/5 text-white/60 hover:text-white"
                  }`}
                  title="Voice Input"
                  aria-label="Voice Input"
                >
                  <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask anything or type domain..."}
                  className="w-full rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-light transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-electric to-royal text-white disabled:opacity-40 transition-transform active:scale-95"
                  aria-label="Send Message"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-cyan/40 bg-gradient-to-tr from-electric via-royal to-cyan text-white shadow-[0_10px_35px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_15px_45px_rgba(34,211,238,0.7)]"
        aria-label="Toggle AI Concierge Chat"
      >
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan to-electric opacity-40 blur-md group-hover:opacity-80 transition-opacity" />

        {isOpen ? (
          <X className="relative h-5 w-5 sm:h-6 sm:w-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-light"></span>
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
