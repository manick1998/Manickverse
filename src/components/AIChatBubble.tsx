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
  Volume2,
  VolumeX,
  Flame,
  Gauge,
  Feather,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import { soundManager } from "@/lib/audio";

interface ChatCard {
  type: "estimate" | "audit" | "booking" | "copy_generator";
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
  { id: "all", label: "⚡ Neural AI" },
  { id: "estimate", label: "💰 Cost Matrix" },
  { id: "audit", label: "🔍 UX Audit" },
  { id: "copy", label: "✍️ Copy Generator" },
  { id: "booking", label: "📅 Book Sprint" },
];

export default function AIChatBubble({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Welcome to ManickVerse Neural AI Engine! I am your interactive digital strategy lead. What shall we engineer for your business today?",
      options: [
        { label: "💰 Calculate Instant Project Quote (₹ / $)", actionText: "Estimate project cost for my site" },
        { label: "🔍 Audit My Website UX & Speed", actionText: "Audit my current website" },
        { label: "✍️ Generate High-Converting Headlines", actionText: "Generate headlines for my brand" },
        { label: "📅 Reserve 14-Day Build Sprint", actionText: "Book a strategy call" },
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

  // Speak AI responses if Speech Synthesis is active
  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[^a-zA-Z0-9\s.,?!]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synth errors
    }
  };

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
        query.includes("quote") ||
        query.includes("budget")
      ) {
        replyText =
          "⚡ Instant Scope & Investment Matrix generated:";
        card = {
          type: "estimate",
          data: {
            title: "Project Scope & Investment Matrix",
            starterUSD: "$1,490",
            starterINR: "₹49,999",
            growthUSD: "$2,990",
            growthINR: "₹99,999",
            guarantee: "🚀 14-Day Delivery Guarantee",
            deliverables: [
              "Next.js 16 + Tailwind CSS v4 Architecture",
              "100/100 Core Web Vitals Speed Score",
              "Netlify / Edge Global Hosting Deployment",
              "JSON-LD SEO Schema for Google Indexing",
            ],
          },
        };
        options = [
          { label: "🚀 Start 14-Day Build Sprint", actionText: "I want to start a 14-day build sprint" },
          { label: "💬 Connect on WhatsApp (₹ / $)", actionText: "Chat on WhatsApp" },
        ];
      } else if (
        query.includes("copy") ||
        query.includes("headline") ||
        query.includes("generate") ||
        query.includes("slogan") ||
        query.includes("tagline")
      ) {
        replyText =
          "✨ AI High-Converting Headline System:";
        card = {
          type: "copy_generator",
          data: {
            title: "Generated Brand Hero Copy Options",
            headlines: [
              "“Redefining Excellence — Handcrafted Digital Flagships Built in 14 Days.”",
              "“Convert Traffic into Revenue with Apple-Grade Website Architecture.”",
              "“Ultra-Fast Next.js Engineering Engineered for Dominant Online Brands.”",
            ],
          },
        };
        options = [
          { label: "💰 Calculate Cost For This Site", actionText: "Estimate project cost for my site" },
          { label: "📅 Schedule Discovery Walkthrough", actionText: "Book a strategy call" },
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
          "🔍 AI Health & UX Performance Diagnostic Completed:";
        card = {
          type: "audit",
          data: {
            title: "Website UX & Conversion Diagnostic",
            currentBenchmark: "38 / 100 Speed Benchmark",
            targetBenchmark: "100 / 100 ManickVerse Target",
            diagnostics: [
              "Mobile LCP response delayed (>3.6s)",
              "Unoptimized image layout shifts",
              "Missing JSON-LD structured schema",
              "Low conversion CTA contrast",
            ],
          },
        };
        options = [
          { label: "✨ View Before vs After Case Studies", actionText: "Show case studies" },
          { label: "📅 Book Audit Proposal Call", actionText: "Book a strategy call" },
        ];
      } else if (
        query.includes("book") ||
        query.includes("call") ||
        query.includes("schedule") ||
        query.includes("sprint") ||
        query.includes("meeting")
      ) {
        replyText =
          "Select a strategy call slot or connect on WhatsApp directly with our founding leads:";
        card = {
          type: "booking",
          data: {
            title: "15-Min Technical Strategy Call",
            slots: ["Today at 4:00 PM IST", "Tomorrow at 11:00 AM IST", "Tomorrow at 3:00 PM IST"],
          },
        };
        cta = {
          label: "WhatsApp Founders Direct (+91 9361099051)",
          href: "https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20want%20to%20reserve%20a%20strategy%20call.",
        };
      } else {
        replyText =
          "ManickVerse constructs high-converting Next.js websites delivered within 14 days. How can namma team elevate your project today?";
        options = [
          { label: "💰 Cost Matrix (₹ / $)", actionText: "Estimate project cost for my site" },
          { label: "🔍 Audit My Site", actionText: "Audit my current website" },
          { label: "✍️ Generate Headlines", actionText: "Generate headlines for my brand" },
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
      speakText(replyText);
    }, 650);
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
            className="mb-3 flex flex-col h-[540px] max-h-[82vh] w-[calc(100vw-2rem)] sm:w-[420px] overflow-hidden rounded-3xl border border-white/20 bg-[#05091a]/95 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          >
            {/* Top Neural Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-electric/30 via-royal/20 to-cyan/20 p-3.5 sm:p-4">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric via-royal to-cyan p-0.5 shadow-md shrink-0">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#070b22]">
                    <Sparkles className="h-4 w-4 text-cyan-light animate-pulse" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#05091a] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-black text-white text-xs sm:text-sm flex items-center gap-1">
                    ManickVerse Neural Engine
                  </h3>
                  <p className="text-[10px] font-mono text-cyan-light flex items-center gap-1">
                    <Flame className="h-3 w-3 text-amber-400" /> Active Strategy v2.4
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Speech Synthesis Read Aloud Toggle */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSpeechEnabled(!speechEnabled);
                  }}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all ${
                    speechEnabled
                      ? "border-cyan-light/50 bg-cyan/20 text-cyan-light"
                      : "border-white/10 bg-white/5 text-white/50 hover:text-white"
                  }`}
                  title={speechEnabled ? "Voice Output ON" : "Voice Output OFF"}
                  aria-label="Toggle AI Speech Voice"
                >
                  {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick Filter Bar */}
            <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 bg-black/40 p-2 text-[10px] sm:text-[11px] scrollbar-none">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCategory(tab.id);
                    if (tab.id === "estimate") handleSendMessage("Estimate project cost for my site");
                    else if (tab.id === "audit") handleSendMessage("Audit my current website");
                    else if (tab.id === "copy") handleSendMessage("Generate headlines for my brand");
                    else if (tab.id === "booking") handleSendMessage("Book a strategy call");
                  }}
                  className={`rounded-full px-2.5 py-1 font-bold whitespace-nowrap transition-all ${
                    activeCategory === tab.id
                      ? "bg-gradient-to-r from-electric to-royal text-white border border-cyan-light/40 shadow-sm"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Chat Body */}
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

                    {/* Cost Matrix Card */}
                    {msg.card && msg.card.type === "estimate" && (
                      <div className="mt-2.5 rounded-xl border border-cyan/40 bg-cyan/10 p-3 text-xs text-white">
                        <div className="font-bold text-cyan-light font-mono flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5">
                            <Calculator className="h-3.5 w-3.5" /> {msg.card.data.title}
                          </span>
                          <span className="text-[9px] bg-cyan/20 px-2 py-0.5 rounded text-cyan-light">
                            {msg.card.data.guarantee}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2 font-mono text-[10px]">
                          <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                            <span className="block text-white/50 text-[9px]">Starter MVP</span>
                            <span className="font-bold text-cyan-light">{msg.card.data.starterINR}</span>
                            <span className="block text-white/40 text-[9px]">({msg.card.data.starterUSD})</span>
                          </div>
                          <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                            <span className="block text-white/50 text-[9px]">Growth Flagship</span>
                            <span className="font-bold text-emerald-400">{msg.card.data.growthINR}</span>
                            <span className="block text-white/40 text-[9px]">({msg.card.data.growthUSD})</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-[10px] text-white/80">
                          {msg.card.data.deliverables.map((d: string, i: number) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* UX & Speed Audit Card */}
                    {msg.card && msg.card.type === "audit" && (
                      <div className="mt-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-white">
                        <div className="font-bold text-amber-300 font-mono flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5">
                            <Gauge className="h-3.5 w-3.5" /> {msg.card.data.title}
                          </span>
                        </div>
                        <div className="flex items-center justify-between bg-black/50 p-2 rounded-lg mb-2 font-mono text-[10px]">
                          <span className="text-rose-400 font-bold">{msg.card.data.currentBenchmark}</span>
                          <span className="text-emerald-400 font-bold">{msg.card.data.targetBenchmark}</span>
                        </div>
                        <div className="space-y-1 text-[10px] text-white/80">
                          {msg.card.data.diagnostics.map((diag: string, i: number) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                              <span>{diag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Headline Copy Generator Card */}
                    {msg.card && msg.card.type === "copy_generator" && (
                      <div className="mt-2.5 rounded-xl border border-purple-500/40 bg-purple-500/10 p-3 text-xs text-white">
                        <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5 mb-2">
                          <Feather className="h-3.5 w-3.5" /> {msg.card.data.title}
                        </div>
                        <div className="space-y-2">
                          {msg.card.data.headlines.map((headline: string, i: number) => (
                            <div
                              key={i}
                              className="group relative bg-black/40 p-2.5 rounded-lg border border-white/10 text-[11px] italic text-white/90 flex items-center justify-between"
                            >
                              <span>{headline}</span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(headline);
                                  setCopiedIndex(i);
                                  setTimeout(() => setCopiedIndex(null), 2000);
                                }}
                                className="ml-2 rounded p-1 bg-white/10 text-white/60 hover:text-white"
                                title="Copy headline"
                              >
                                {copiedIndex === i ? (
                                  <Check className="h-3 w-3 text-emerald-400" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Booking Card */}
                    {msg.card && msg.card.type === "booking" && (
                      <div className="mt-2.5 rounded-xl border border-purple-500/40 bg-purple-500/10 p-3 text-xs text-white">
                        <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5 mb-2">
                          <Calendar className="h-3.5 w-3.5" /> {msg.card.data.title}
                        </div>
                        <div className="space-y-1 mb-1">
                          {msg.card.data.slots.map((s: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(`I choose strategy slot: ${s}`)}
                              className="w-full text-left rounded-lg bg-white/10 p-2 text-[10px] sm:text-xs font-semibold text-white hover:bg-white/20 transition-colors"
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
                          className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/80 hover:border-cyan-light/50 hover:bg-cyan-light/10 hover:text-cyan-light transition-all text-left"
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
                  <span>Neural Engine analyzing query...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <div className="border-t border-white/10 bg-black/60 p-2.5 sm:p-3">
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
                  title="Speak to AI via Microphone"
                  aria-label="Voice Input"
                >
                  <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask anything or type URL / brand name..."}
                  className="w-full rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-light transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-electric via-royal to-cyan text-white disabled:opacity-40 transition-transform active:scale-95 shadow-md"
                  aria-label="Send Message"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          soundManager.playClick();
          setIsOpen(!isOpen);
        }}
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-cyan/40 bg-gradient-to-tr from-electric via-royal to-cyan text-white shadow-[0_10px_35px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_15px_45px_rgba(34,211,238,0.7)]"
        aria-label="Toggle Neural AI Strategy Engine"
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
