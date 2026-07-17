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
  Copy,
  Check,
  TrendingUp,
  MessageSquare,
  Award,
} from "lucide-react";
import { soundManager } from "@/lib/audio";

interface ChatCard {
  type:
    | "cost_calculator"
    | "hero_preview"
    | "roi_calculator"
    | "audit_report"
    | "dominance_quiz"
    | "booking_slot";
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

export default function AIChatBubble({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Cost Calculator State
  const [calcType, setCalcType] = useState("Corporate Business");
  const [calcScale, setCalcScale] = useState("5-8 Page Flagship");

  // ROI Calculator State
  const [roiVisitors, setRoiVisitors] = useState(5000);
  const [roiOrderValue, setRoiOrderValue] = useState(2000);

  // Design Preview State
  const [brandNameInput, setBrandNameInput] = useState("");
  const [generatedPreview, setGeneratedPreview] = useState<any | null>(null);

  // Quiz State
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Welcome to ManickVerse AI Strategy Studio! How can I help launch or elevate your online business today?",
      options: [
        { label: "🧮 Instant Quote Calculator (₹ / $)", actionText: "Show quote calculator" },
        { label: "🎨 Live Hero Design Preview", actionText: "Generate hero preview" },
        { label: "📈 Revenue Surge Estimator (ROI)", actionText: "Calculate ROI revenue gain" },
        { label: "🔍 Free Website UX & Speed Audit", actionText: "Audit my website" },
        { label: "📅 Book 15-Min Technical Strategy Call", actionText: "Book a strategy call" },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    try {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Safe Speech Synthesis
  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[^a-zA-Z0-9\s.,?!]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // safe fallback
    }
  };

  // Safe Microphone Input
  const handleVoiceInput = () => {
    soundManager.playClick();
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser. Please type your message.");
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } catch {
      setIsListening(false);
    }
  };

  // Process User Input & Respond
  const processQuery = (userText: string) => {
    setIsTyping(true);
    const query = userText.trim().toLowerCase();

    setTimeout(() => {
      let replyText = "";
      let options: { label: string; actionText: string }[] | undefined;
      let cta: { label: string; href: string } | undefined;
      let card: ChatCard | undefined;

      // Intent 1: Quote / Cost / Price / Calculator
      if (
        query.includes("calc") ||
        query.includes("quote") ||
        query.includes("cost") ||
        query.includes("price") ||
        query.includes("rupee") ||
        query.includes("dollar") ||
        query.includes("package") ||
        query.includes("how much")
      ) {
        replyText = "🧮 Interactive Investment & Scope Calculator loaded:";
        card = {
          type: "cost_calculator",
          data: { title: "Custom Scope & Investment Matrix" },
        };
        options = [
          { label: "🎨 Generate Design Preview", actionText: "Generate hero preview" },
          { label: "📱 WhatsApp Founder Direct", actionText: "Chat on WhatsApp" },
        ];
      }
      // Intent 2: Design Preview / Wireframe / Hero
      else if (
        query.includes("preview") ||
        query.includes("design") ||
        query.includes("wireframe") ||
        query.includes("mockup") ||
        query.includes("look")
      ) {
        replyText = "🎨 Instant Visual Design Generator initialized. Type your brand name or click below:";
        card = {
          type: "hero_preview",
          data: {},
        };
        options = [
          { label: "💰 Calculate Cost For This Design", actionText: "Show quote calculator" },
          { label: "📅 Reserve 14-Day Sprint", actionText: "Book a strategy call" },
        ];
      }
      // Intent 3: ROI / Revenue / Growth
      else if (
        query.includes("roi") ||
        query.includes("revenue") ||
        query.includes("gain") ||
        query.includes("surge") ||
        query.includes("profit")
      ) {
        replyText = "📈 Interactive Monthly Revenue Surge Estimator:";
        card = {
          type: "roi_calculator",
          data: {},
        };
        options = [
          { label: "🚀 Start 14-Day Build Sprint", actionText: "Show quote calculator" },
          { label: "💬 Connect on WhatsApp", actionText: "Chat on WhatsApp" },
        ];
      }
      // Intent 4: Website Audit / Health Check / URL
      else if (
        query.includes("audit") ||
        query.includes("review") ||
        query.includes("speed") ||
        query.includes("score") ||
        query.includes(".com") ||
        query.includes("http") ||
        query.includes("site")
      ) {
        replyText = "🔍 AI Diagnostic Performance & Core Web Vitals Benchmark Completed:";
        card = {
          type: "audit_report",
          data: {
            title: "Core Web Vitals & Conversion Audit",
            currentSpeed: "38 / 100 Speed Score",
            targetSpeed: "100 / 100 ManickVerse Standard",
            bottlenecks: [
              "Mobile LCP response delayed (>3.8s)",
              "Unoptimized image layout shifts",
              "Missing JSON-LD structured schema",
              "Low conversion CTA contrast",
            ],
          },
        };
        options = [
          { label: "✨ See Before vs After Redesigns", actionText: "Show case studies" },
          { label: "📅 Book Audit Call", actionText: "Book a strategy call" },
        ];
      }
      // Intent 5: Quiz / Scorecard
      else if (
        query.includes("quiz") ||
        query.includes("scorecard") ||
        query.includes("test") ||
        query.includes("dominance")
      ) {
        replyText = "📊 30-Second Digital Dominance Quiz:";
        card = {
          type: "dominance_quiz",
          data: {},
        };
      }
      // Intent 6: Book Meeting / Call / Schedule
      else if (
        query.includes("book") ||
        query.includes("call") ||
        query.includes("schedule") ||
        query.includes("meet")
      ) {
        replyText = "📅 Select a 15-Minute Strategy Slot with Our Founding Leads:";
        card = {
          type: "booking_slot",
          data: {
            slots: [
              "Today at 4:30 PM IST",
              "Tomorrow at 11:30 AM IST",
              "Tomorrow at 3:00 PM IST",
              "Tomorrow at 6:00 PM IST",
            ],
          },
        };
        cta = {
          label: "WhatsApp Direct Line (+91 9361099051)",
          href: "https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20want%20to%20reserve%20a%20strategy%20call.",
        };
      }
      // Intent 7: Tamil / Tanglish Intention
      else if (
        query.includes("bro") ||
        query.includes("enna") ||
        query.includes("epdi") ||
        query.includes("evvalavu") ||
        query.includes("sollo") ||
        query.includes("vanakkam") ||
        query.includes("tamil")
      ) {
        replyText =
          "Vanakkam bro! 👋 ManickVerse-la namma 2 weeks (14 days)-kulleyae full custom high-converting website build panni live panni tharovom.\n\n• On-Time 14-Day Delivery 🚀\n• 100/100 Core Web Vitals Speed Score ⚡\n• Custom Design System 🎨\n\nQuotes check panna keezhe irukura buttons-ai click pannunga bro!";
        options = [
          { label: "🧮 Check Quote (₹ Rupees)", actionText: "Show quote calculator" },
          { label: "📱 WhatsApp Founder Direct", actionText: "Chat on WhatsApp" },
        ];
      }
      // Intent 8: Greetings / General
      else {
        replyText =
          "Hello! At ManickVerse, we build high-converting Next.js websites delivered in 14 days with 100/100 speed and custom Apple-tier design. How can we help your business today?";
        options = [
          { label: "🧮 Interactive Quote Calculator", actionText: "Show quote calculator" },
          { label: "🎨 Generate Design Preview", actionText: "Generate hero preview" },
          { label: "📈 Calculate Projected ROI", actionText: "Calculate ROI revenue gain" },
          { label: "📱 WhatsApp Founder Direct", actionText: "Chat on WhatsApp" },
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
    }, 400);
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
    processQuery(text);
  };

  // Calculate Price helper
  const getCalculatedPrice = () => {
    let baseINR = 49999;
    let baseUSD = 1490;

    if (calcScale === "5-8 Page Flagship") {
      baseINR = 99999;
      baseUSD = 2990;
    } else if (calcScale === "10+ Page Enterprise") {
      baseINR = 189999;
      baseUSD = 4990;
    }

    if (calcType === "E-Commerce Storefront") {
      baseINR += 20000;
      baseUSD += 500;
    }

    return { baseINR: `₹${baseINR.toLocaleString()}`, baseUSD: `$${baseUSD.toLocaleString()}` };
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
            className="mb-3 flex flex-col h-[540px] max-h-[84vh] w-[calc(100vw-2rem)] sm:w-[420px] overflow-hidden rounded-3xl border border-white/20 bg-[#050818]/95 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          >
            {/* AI Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-electric/30 via-royal/20 to-cyan/20 p-3.5 sm:p-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric via-royal to-cyan p-0.5 shadow-md shrink-0">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#070b22]">
                    <Sparkles className="h-4 w-4 text-cyan-light animate-pulse" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#050818] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-black text-white text-xs sm:text-sm">
                    ManickVerse AI Strategist
                  </h3>
                  <p className="text-[10px] font-mono text-cyan-light flex items-center gap-1">
                    <Flame className="h-3 w-3 text-amber-400" /> Active • 14-Day Delivery
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Speech Toggle */}
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
                  aria-label="Toggle AI Voice Output"
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

            {/* Quick Feature Action Bar */}
            <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 bg-black/40 p-2 text-[10px] sm:text-[11px] scrollbar-none shrink-0">
              <button
                onClick={() => handleSendMessage("Show quote calculator")}
                className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 font-semibold text-white/80 hover:bg-white/10 hover:text-white whitespace-nowrap"
              >
                🧮 Quote Calculator
              </button>
              <button
                onClick={() => handleSendMessage("Generate hero preview")}
                className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 font-semibold text-white/80 hover:bg-white/10 hover:text-white whitespace-nowrap"
              >
                🎨 Design Preview
              </button>
              <button
                onClick={() => handleSendMessage("Calculate ROI revenue gain")}
                className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 font-semibold text-white/80 hover:bg-white/10 hover:text-white whitespace-nowrap"
              >
                📈 ROI Surge
              </button>
              <button
                onClick={() => handleSendMessage("Audit my website")}
                className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 font-semibold text-white/80 hover:bg-white/10 hover:text-white whitespace-nowrap"
              >
                🔍 Site Audit
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 text-xs scrollbar-none">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-electric to-royal text-white rounded-br-none shadow-md font-medium"
                        : "border border-white/10 bg-white/5 text-white/90 rounded-bl-none shadow-sm backdrop-blur-md"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* CARD 1: Interactive Cost Calculator */}
                    {msg.card && msg.card.type === "cost_calculator" && (
                      <div className="mt-3 rounded-xl border border-cyan/40 bg-[#080d2a] p-3 text-xs text-white shadow-lg">
                        <div className="font-bold text-cyan-light font-mono flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5">
                            <Calculator className="h-4 w-4" /> Scope & Investment Matrix
                          </span>
                        </div>

                        {/* Selection 1 */}
                        <div className="mb-2">
                          <span className="block text-[10px] text-white/50 mb-1 font-mono">Industry / Type:</span>
                          <div className="flex flex-wrap gap-1">
                            {["Corporate Business", "E-Commerce Storefront", "Restaurant / Dining", "Personal Brand"].map((t) => (
                              <button
                                key={t}
                                onClick={() => {
                                  soundManager.playClick();
                                  setCalcType(t);
                                }}
                                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                                  calcType === t
                                    ? "bg-cyan/30 text-cyan-light border border-cyan/50"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Selection 2 */}
                        <div className="mb-3">
                          <span className="block text-[10px] text-white/50 mb-1 font-mono">Scope Scale:</span>
                          <div className="grid grid-cols-2 gap-1 text-[10px]">
                            {["1-Page High-Conv MVP", "5-8 Page Flagship", "10+ Page Enterprise"].map((s) => (
                              <button
                                key={s}
                                onClick={() => {
                                  soundManager.playClick();
                                  setCalcScale(s);
                                }}
                                className={`p-1.5 rounded-lg font-semibold transition-all ${
                                  calcScale === s
                                    ? "bg-gradient-to-r from-electric to-royal text-white border border-white/20"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price Output & WhatsApp Relay */}
                        <div className="bg-black/50 p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="block text-[9px] text-white/50 font-mono">Calculated Price:</span>
                            <span className="text-sm font-extrabold text-emerald-400">
                              {getCalculatedPrice().baseINR} <span className="text-[10px] text-white/50 font-normal">({getCalculatedPrice().baseUSD})</span>
                            </span>
                          </div>
                          <a
                            href={`https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20want%20to%20start%20a%20project%3A%20${encodeURIComponent(calcType)}%20(${encodeURIComponent(calcScale)})%20for%20${getCalculatedPrice().baseINR}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-3 py-1.5 text-[10px] font-bold text-space-black shadow"
                          >
                            <MessageSquare className="h-3 w-3" /> Lock In Quote
                          </a>
                        </div>
                      </div>
                    )}

                    {/* CARD 2: Live Design Preview */}
                    {msg.card && msg.card.type === "hero_preview" && (
                      <div className="mt-3 rounded-xl border border-purple-500/40 bg-[#0a0824] p-3 text-xs text-white shadow-lg">
                        <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5 mb-2">
                          <Feather className="h-4 w-4" /> Live Wireframe Generator
                        </div>

                        <div className="flex gap-1.5 mb-2">
                          <input
                            type="text"
                            value={brandNameInput}
                            onChange={(e) => setBrandNameInput(e.target.value)}
                            placeholder="Type brand name (e.g. Saffron Coffee)..."
                            className="w-full rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white outline-none focus:border-purple-400"
                          />
                          <button
                            onClick={() => {
                              soundManager.playClick();
                              const name = brandNameInput.trim() || "Sample Luxury Brand";
                              setGeneratedPreview({
                                name,
                                headline: `Redefining Luxury & Performance for ${name}`,
                                tag: "Apple Standard • 14 Days",
                              });
                            }}
                            className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-3 py-1 text-[10px] font-bold text-white shrink-0"
                          >
                            Generate
                          </button>
                        </div>

                        {generatedPreview && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-2 rounded-xl border border-white/20 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-black p-3 text-center"
                          >
                            <span className="inline-block rounded-full bg-cyan/20 px-2 py-0.5 text-[9px] font-bold text-cyan-light uppercase mb-1">
                              {generatedPreview.tag}
                            </span>
                            <h4 className="font-display font-extrabold text-sm text-white mt-1">
                              {generatedPreview.headline}
                            </h4>
                            <p className="mt-1 text-[10px] text-white/70">
                              Next.js 16 Glassmorphism • Sub-Second Speed Guarantee
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* CARD 3: ROI Surge Estimator */}
                    {msg.card && msg.card.type === "roi_calculator" && (
                      <div className="mt-3 rounded-xl border border-emerald-500/40 bg-[#051512] p-3 text-xs text-white shadow-lg">
                        <div className="font-bold text-emerald-400 font-mono flex items-center gap-1.5 mb-2">
                          <TrendingUp className="h-4 w-4" /> Projected Revenue Lift
                        </div>

                        <div className="space-y-2 mb-3 text-[10px]">
                          <div>
                            <div className="flex justify-between text-white/70 mb-1">
                              <span>Monthly Visitors</span>
                              <span className="font-bold text-cyan-light">{roiVisitors.toLocaleString()}</span>
                            </div>
                            <input
                              type="range"
                              min="1000"
                              max="50000"
                              step="1000"
                              value={roiVisitors}
                              onChange={(e) => setRoiVisitors(Number(e.target.value))}
                              className="w-full accent-emerald-400 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-white/70 mb-1">
                              <span>Average Order Value</span>
                              <span className="font-bold text-cyan-light">₹{roiOrderValue.toLocaleString()}</span>
                            </div>
                            <input
                              type="range"
                              min="500"
                              max="10000"
                              step="500"
                              value={roiOrderValue}
                              onChange={(e) => setRoiOrderValue(Number(e.target.value))}
                              className="w-full accent-emerald-400 cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="bg-black/60 p-2.5 rounded-xl border border-emerald-500/30 text-center">
                          <span className="block text-[9px] text-white/50 uppercase font-mono">Net Projected Monthly Growth</span>
                          <span className="font-display font-black text-lg text-emerald-400">
                            +₹{Math.round(roiVisitors * 0.018 * roiOrderValue).toLocaleString()} / Month
                          </span>
                        </div>
                      </div>
                    )}

                    {/* CARD 4: Site Audit Report */}
                    {msg.card && msg.card.type === "audit_report" && (
                      <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-white">
                        <div className="font-bold text-amber-300 font-mono flex items-center gap-1.5 mb-2">
                          <Gauge className="h-4 w-4" /> {msg.card.data.title}
                        </div>
                        <div className="flex items-center justify-between bg-black/50 p-2 rounded-lg mb-2 font-mono text-[10px]">
                          <span className="text-rose-400 font-bold">{msg.card.data.currentSpeed}</span>
                          <span className="text-emerald-400 font-bold">{msg.card.data.targetSpeed}</span>
                        </div>
                        <div className="space-y-1 text-[10px] text-white/80">
                          {msg.card.data.bottlenecks.map((b: string, i: number) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CARD 5: Quiz */}
                    {msg.card && msg.card.type === "dominance_quiz" && (
                      <div className="mt-3 rounded-xl border border-blue-500/40 bg-[#08122a] p-3 text-xs text-white">
                        <div className="font-bold text-cyan-light font-mono flex items-center gap-1.5 mb-2">
                          <Award className="h-4 w-4" /> Digital Dominance Quiz
                        </div>
                        <div className="space-y-2 text-[10px]">
                          <p className="text-white/80">1. Does your website load in under 1 second on mobile 4G?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                soundManager.playClick();
                                setQuizAnswer("No");
                              }}
                              className={`px-3 py-1 rounded-lg border ${
                                quizAnswer === "No" ? "bg-rose-500/30 border-rose-500 text-rose-300" : "bg-white/5 border-white/10"
                              }`}
                            >
                              No (Needs Upgrade)
                            </button>
                            <button
                              onClick={() => {
                                soundManager.playClick();
                                setQuizAnswer("Yes");
                              }}
                              className={`px-3 py-1 rounded-lg border ${
                                quizAnswer === "Yes" ? "bg-emerald-500/30 border-emerald-500 text-emerald-300" : "bg-white/5 border-white/10"
                              }`}
                            >
                              Yes
                            </button>
                          </div>

                          {quizAnswer && (
                            <div className="mt-2 bg-black/50 p-2 rounded-lg text-emerald-400 font-mono font-bold text-[10px]">
                              Score: 38/100 → Upgrade to ManickVerse 100/100 Core Web Vitals Architecture!
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CARD 6: Booking Slot */}
                    {msg.card && msg.card.type === "booking_slot" && (
                      <div className="mt-3 rounded-xl border border-purple-500/40 bg-purple-500/10 p-3 text-xs text-white">
                        <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5 mb-2">
                          <Calendar className="h-4 w-4" /> Strategy Slots
                        </div>
                        <div className="space-y-1.5">
                          {msg.card.data.slots.map((s: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(`Reserve strategy slot: ${s}`)}
                              className="w-full text-left rounded-lg bg-white/10 p-2 text-[10px] sm:text-xs font-semibold text-white hover:bg-white/20 transition-colors flex items-center justify-between"
                            >
                              <span>👉 {s}</span>
                              <span className="text-[9px] font-mono text-cyan-light">Reserve</span>
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
                          className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white/80 hover:border-cyan-light/50 hover:bg-cyan-light/10 hover:text-cyan-light transition-all text-left"
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
                  <span>AI Engine analyzing response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="border-t border-white/10 bg-black/60 p-2.5 sm:p-3 shrink-0">
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
                  placeholder={isListening ? "Listening..." : "Ask anything or type brand name..."}
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

      {/* Floating Toggle Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          soundManager.playClick();
          setIsOpen(!isOpen);
        }}
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-cyan/40 bg-gradient-to-tr from-electric via-royal to-cyan text-white shadow-[0_10px_35px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_15px_45px_rgba(34,211,238,0.7)]"
        aria-label="Toggle AI Strategy Studio"
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
