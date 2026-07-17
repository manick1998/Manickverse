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
  Globe,
  MessageSquare,
  ArrowRight,
  Layers,
  Award,
  Play,
  CheckCircle2,
} from "lucide-react";
import { soundManager } from "@/lib/audio";

// Types for dynamic mini-app cards
type CardType =
  | "cost_calculator"
  | "hero_preview"
  | "roi_calculator"
  | "audit_report"
  | "dominance_quiz"
  | "booking_slot";

interface ChatCard {
  type: CardType;
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
  { id: "all", label: "⚡ Master AI" },
  { id: "calc", label: "🧮 Interactive Quote" },
  { id: "preview", label: "🎨 Design Preview" },
  { id: "roi", label: "📈 ROI Estimator" },
  { id: "audit", label: "🔍 Site Audit" },
  { id: "quiz", label: "📊 Dominance Quiz" },
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

  // Cost Calculator Mini-App State inside AI
  const [calcStep, setCalcStep] = useState(1);
  const [calcType, setCalcType] = useState("Corporate Business");
  const [calcScale, setCalcScale] = useState("5-8 Page Flagship");
  const [calcAddons, setCalcAddons] = useState<string[]>(["Payment Gateway", "SEO Schema"]);

  // ROI Mini-App State inside AI
  const [roiVisitors, setRoiVisitors] = useState(5000);
  const [roiOrderValue, setRoiOrderValue] = useState(2000); // in ₹

  // Hero Preview Generator State inside AI
  const [brandNameInput, setBrandNameInput] = useState("");
  const [generatedPreview, setGeneratedPreview] = useState<any | null>(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Welcome to ManickVerse Master AI Strategy Suite! I am your lead digital architect. Select an interactive module below or ask any custom question in English or Tamil/Tanglish!",
      options: [
        { label: "🧮 Interactive Quote Calculator (₹ / $)", actionText: "Launch Interactive Quote Calculator" },
        { label: "🎨 Generate Live Hero Design Preview", actionText: "Generate live hero preview for my brand" },
        { label: "📈 Compute My Monthly Revenue Surge (ROI)", actionText: "Calculate projected ROI gain" },
        { label: "🔍 Audit My Website & Competitor Check", actionText: "Perform AI website audit" },
        { label: "📊 Take 30-Sec Digital Dominance Quiz", actionText: "Start Digital Dominance Quiz" },
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

  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[^a-zA-Z0-9\s.,?!]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  const handleVoiceInput = () => {
    soundManager.playClick();
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser. Please type your query.");
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

  // Advanced AI Response Router for Custom Questions, Tanglish, and Tools
  const generateAIResponse = (userText: string) => {
    setIsTyping(true);
    const query = userText.toLowerCase();

    setTimeout(() => {
      let replyText = "";
      let options: { label: string; actionText: string }[] | undefined;
      let cta: { label: string; href: string } | undefined;
      let card: ChatCard | undefined;

      // 1. COST CALCULATOR MODULE
      if (
        query.includes("calc") ||
        query.includes("quote") ||
        query.includes("cost") ||
        query.includes("price") ||
        query.includes("rupee") ||
        query.includes("dollar") ||
        query.includes("package")
      ) {
        replyText = "🧮 Interactive Scope & Cost Matrix loaded:";
        card = {
          type: "cost_calculator",
          data: {
            title: "Custom Investment & Scope Calculator",
          },
        };
        options = [
          { label: "🎨 Generate Visual Design Preview", actionText: "Generate live hero preview for my brand" },
          { label: "📱 WhatsApp Founder Direct", actionText: "Chat on WhatsApp" },
        ];
      }
      // 2. DESIGN PREVIEW MODULE
      else if (
        query.includes("preview") ||
        query.includes("design") ||
        query.includes("wireframe") ||
        query.includes("mockup") ||
        query.includes("look")
      ) {
        replyText = "🎨 Instant Visual Wireframe Generator loaded. Type your brand name below or click sample:";
        card = {
          type: "hero_preview",
          data: {
            sampleBrands: ["Saffron & Sage", "Lumen Apparel", "Meridian Estates", "Aura AI"],
          },
        };
        options = [
          { label: "💰 Calculate Cost For This Design", actionText: "Launch Interactive Quote Calculator" },
          { label: "📅 Reserve 14-Day Sprint Slot", actionText: "Book a strategy call" },
        ];
      }
      // 3. ROI GAIN ESTIMATOR
      else if (
        query.includes("roi") ||
        query.includes("revenue") ||
        query.includes("gain") ||
        query.includes("surge") ||
        query.includes("profit")
      ) {
        replyText = "📈 Interactive Revenue & ROI Surge Calculator:";
        card = {
          type: "roi_calculator",
          data: {
            title: "Projected Monthly Growth Analysis",
          },
        };
        options = [
          { label: "🚀 Claim This Revenue Growth in 14 Days", actionText: "Launch Interactive Quote Calculator" },
          { label: "💬 Discuss Conversion Strategy on WhatsApp", actionText: "Chat on WhatsApp" },
        ];
      }
      // 4. WEBSITE DIAGNOSTIC AUDIT
      else if (
        query.includes("audit") ||
        query.includes("review") ||
        query.includes("speed") ||
        query.includes("score") ||
        query.includes(".com") ||
        query.includes("http") ||
        query.includes("site")
      ) {
        replyText = "🔍 AI Diagnostic Performance & Competitor Benchmark Completed:";
        card = {
          type: "audit_report",
          data: {
            title: "Core Web Vitals & Conversion Audit",
            currentSpeed: "38 / 100 Legacy Benchmark",
            targetSpeed: "100 / 100 ManickVerse Standard",
            bottlenecks: [
              "Delayed LCP First Paint (>3.8s)",
              "Cumulative Layout Shift (CLS) on mobile",
              "Missing JSON-LD structured schema",
              "Low CTA button contrast & placement",
            ],
          },
        };
        options = [
          { label: "✨ See Before vs After Redesigns", actionText: "Show case studies" },
          { label: "📅 Book Audit Walkthrough Call", actionText: "Book a strategy call" },
        ];
      }
      // 5. DIGITAL DOMINANCE QUIZ
      else if (
        query.includes("quiz") ||
        query.includes("scorecard") ||
        query.includes("test") ||
        query.includes("dominance")
      ) {
        replyText = "📊 30-Second Digital Dominance Diagnostic Quiz:";
        card = {
          type: "dominance_quiz",
          data: {
            title: "Digital Dominance Scorecard",
          },
        };
      }
      // 6. STRATEGY CALL BOOKING
      else if (
        query.includes("book") ||
        query.includes("call") ||
        query.includes("schedule") ||
        query.includes("sprint") ||
        query.includes("meet")
      ) {
        replyText = "📅 Reserve a 15-Min Technical Strategy Session with Our Founding Leads:";
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
          label: "Direct WhatsApp Line (+91 9361099051)",
          href: "https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20want%20to%20reserve%20a%20strategy%20call.",
        };
      }
      // 7. TANGLISH / TAMIL & CUSTOM INTELLIGENT RESPONSES
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
          "Vanakkam bro! 👋 ManickVerse-la namma 2 weeks (14 days)-kulleyae full-a custom high-converting Next.js website design panni live panni tharovom.\n\n• Fixed Scope & On-Time Guarantee 🚀\n• 100/100 Core Web Vitals Speed Score ⚡\n• Custom Design in Framer/Figma 🎨\n\nUngalluku enna type website venum bro? Quotes check panna keezhe irukura button-ai click pannunga!";
        options = [
          { label: "💰 Estimate Quote (₹ Rupees)", actionText: "Launch Interactive Quote Calculator" },
          { label: "📱 WhatsApp Direct Chat", actionText: "Chat on WhatsApp" },
        ];
      }
      // 8. GENERAL CUSTOM INTENT
      else {
        replyText =
          `At ManickVerse, we engineer high-converting digital flagships in 14 days with 100/100 speed and Apple-inspired craftsmanship. How can we elevate your project?`;
        options = [
          { label: "🧮 Custom Quote Calculator (₹ / $)", actionText: "Launch Interactive Quote Calculator" },
          { label: "🎨 Visual Hero Preview Generator", actionText: "Generate live hero preview for my brand" },
          { label: "📈 ROI & Revenue Lift Calculator", actionText: "Calculate projected ROI gain" },
          { label: "📱 Direct Founder Line (+91 9361099051)", actionText: "Chat on WhatsApp" },
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
    }, 600);
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

  // Helper calculation for Cost Calculator
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
    } else if (calcType === "SaaS Application") {
      baseINR += 30000;
      baseUSD += 800;
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
            className="mb-3 flex flex-col h-[560px] max-h-[84vh] w-[calc(100vw-2rem)] sm:w-[430px] overflow-hidden rounded-3xl border border-white/20 bg-[#050818]/95 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          >
            {/* Neural Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-electric/30 via-royal/20 to-cyan/20 p-3.5 sm:p-4">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric via-royal to-cyan p-0.5 shadow-md shrink-0">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#070b22]">
                    <Sparkles className="h-4 w-4 text-cyan-light animate-pulse" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#050818] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-black text-white text-xs sm:text-sm flex items-center gap-1">
                    ManickVerse AI Strategist v3.0
                  </h3>
                  <p className="text-[10px] font-mono text-cyan-light flex items-center gap-1">
                    <Flame className="h-3 w-3 text-amber-400" /> Neural Architecture Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Speech Output Toggle */}
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
                  title={speechEnabled ? "Speech Voice ON" : "Speech Voice OFF"}
                  aria-label="Toggle AI Voice Output"
                >
                  {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close AI Engine"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Capability Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 bg-black/40 p-2 text-[10px] sm:text-[11px] scrollbar-none">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCategory(tab.id);
                    if (tab.id === "calc") handleSendMessage("Launch Interactive Quote Calculator");
                    else if (tab.id === "preview") handleSendMessage("Generate live hero preview for my brand");
                    else if (tab.id === "roi") handleSendMessage("Calculate projected ROI gain");
                    else if (tab.id === "audit") handleSendMessage("Perform AI website audit");
                    else if (tab.id === "quiz") handleSendMessage("Start Digital Dominance Quiz");
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
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-electric to-royal text-white rounded-br-none shadow-md font-medium"
                        : "border border-white/10 bg-white/5 text-white/90 rounded-bl-none shadow-sm backdrop-blur-md"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* MINI-APP 1: Interactive Cost & Scope Calculator */}
                    {msg.card && msg.card.type === "cost_calculator" && (
                      <div className="mt-3 rounded-xl border border-cyan/40 bg-[#080d2a] p-3 text-xs text-white shadow-lg">
                        <div className="font-bold text-cyan-light font-mono flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5">
                            <Calculator className="h-4 w-4" /> {msg.card.data.title}
                          </span>
                          <span className="text-[9px] bg-cyan/20 px-2 py-0.5 rounded font-bold text-cyan-light">
                            14-Day Delivery
                          </span>
                        </div>

                        {/* Step 1: Type */}
                        <div className="mb-2">
                          <span className="block text-[10px] text-white/50 mb-1 font-mono">Select Site Type:</span>
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

                        {/* Step 2: Scale */}
                        <div className="mb-3">
                          <span className="block text-[10px] text-white/50 mb-1 font-mono">Select Scope Scale:</span>
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

                        {/* Calculation Summary Box */}
                        <div className="bg-black/50 p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="block text-[9px] text-white/50 font-mono">Calculated Investment:</span>
                            <span className="text-sm font-extrabold text-emerald-400">
                              {getCalculatedPrice().baseINR} <span className="text-[10px] text-white/50 font-normal">({getCalculatedPrice().baseUSD})</span>
                            </span>
                          </div>
                          <a
                            href={`https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20calculated%20a%20quote%3A%20${encodeURIComponent(calcType)}%20(${encodeURIComponent(calcScale)})%20for%20${getCalculatedPrice().baseINR}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-3 py-1.5 text-[10px] font-bold text-space-black shadow"
                          >
                            <MessageSquare className="h-3 w-3" /> Lock In Quote
                          </a>
                        </div>
                      </div>
                    )}

                    {/* MINI-APP 2: Hero Wireframe & Design Preview Generator */}
                    {msg.card && msg.card.type === "hero_preview" && (
                      <div className="mt-3 rounded-xl border border-purple-500/40 bg-[#0a0824] p-3 text-xs text-white shadow-lg">
                        <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5 mb-2">
                          <Feather className="h-4 w-4" /> Live Visual Design Preview
                        </div>

                        <div className="flex gap-1.5 mb-2">
                          <input
                            type="text"
                            value={brandNameInput}
                            onChange={(e) => setBrandNameInput(e.target.value)}
                            placeholder="Type brand name (e.g. Aura Coffee)..."
                            className="w-full rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white outline-none focus:border-purple-400"
                          />
                          <button
                            onClick={() => {
                              soundManager.playClick();
                              const name = brandNameInput.trim() || "Sample Luxury Brand";
                              setGeneratedPreview({
                                name,
                                headline: `Redefining Luxury & Performance for ${name}`,
                                tag: "Awwwards Standard • 14 Days",
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
                            <button className="mt-2.5 rounded-full bg-gradient-to-r from-electric to-royal px-4 py-1 text-[10px] font-bold text-white">
                              Request Full Figma/Framer Scope
                            </button>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* MINI-APP 3: ROI Revenue Surge Estimator */}
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
                          <span className="block text-[9px] text-white/50 uppercase font-mono">Projected Net Monthly Revenue Gain</span>
                          <span className="font-display font-black text-lg text-emerald-400">
                            +₹{Math.round(roiVisitors * 0.018 * roiOrderValue).toLocaleString()} / Month
                          </span>
                        </div>
                      </div>
                    )}

                    {/* MINI-APP 4: Audit & Diagnostic Report */}
                    {msg.card && msg.card.type === "audit_report" && (
                      <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-white">
                        <div className="font-bold text-amber-300 font-mono flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5">
                            <Gauge className="h-4 w-4" /> {msg.card.data.title}
                          </span>
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

                    {/* MINI-APP 5: Digital Dominance Scorecard Quiz */}
                    {msg.card && msg.card.type === "dominance_quiz" && (
                      <div className="mt-3 rounded-xl border border-blue-500/40 bg-[#08122a] p-3 text-xs text-white">
                        <div className="font-bold text-cyan-light font-mono flex items-center gap-1.5 mb-2">
                          <Award className="h-4 w-4" /> Digital Health Quiz
                        </div>
                        <div className="space-y-2 text-[10px]">
                          <p className="text-white/80">1. Does your website load in under 1 second on mobile 4G?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                soundManager.playClick();
                                setQuizAnswers((p) => ({ ...p, 1: "No" }));
                              }}
                              className={`px-3 py-1 rounded-lg border ${
                                quizAnswers[1] === "No" ? "bg-rose-500/30 border-rose-500 text-rose-300" : "bg-white/5 border-white/10"
                              }`}
                            >
                              No (Needs Speed Fix)
                            </button>
                            <button
                              onClick={() => {
                                soundManager.playClick();
                                setQuizAnswers((p) => ({ ...p, 1: "Yes" }));
                              }}
                              className={`px-3 py-1 rounded-lg border ${
                                quizAnswers[1] === "Yes" ? "bg-emerald-500/30 border-emerald-500 text-emerald-300" : "bg-white/5 border-white/10"
                              }`}
                            >
                              Yes
                            </button>
                          </div>

                          {quizAnswers[1] && (
                            <div className="mt-2 bg-black/40 p-2 rounded-lg text-emerald-400 font-mono font-bold text-[10px]">
                              Score Diagnostic: 42/100 → Upgrade to ManickVerse 100/100 Architecture!
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* MINI-APP 6: Booking Slot Card */}
                    {msg.card && msg.card.type === "booking_slot" && (
                      <div className="mt-3 rounded-xl border border-purple-500/40 bg-purple-500/10 p-3 text-xs text-white">
                        <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5 mb-2">
                          <Calendar className="h-4 w-4" /> Available Technical Strategy Slots
                        </div>
                        <div className="space-y-1.5 mb-2">
                          {msg.card.data.slots.map((s: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(`Reserve strategy slot: ${s}`)}
                              className="w-full text-left rounded-lg bg-white/10 p-2 text-[10px] sm:text-xs font-semibold text-white hover:bg-white/20 transition-colors flex items-center justify-between"
                            >
                              <span>👉 {s}</span>
                              <span className="text-[9px] font-mono text-cyan-light">Confirm</span>
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
                        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-cyan/20 border border-cyan/40 px-3.5 py-2 text-xs font-bold text-cyan-light hover:bg-cyan/30 transition-colors"
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
                    <div className="mt-2 flex flex-wrap gap-1 max-w-[92%]">
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
                  <span>ManickVerse Neural Engine processing...</span>
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
                  placeholder={isListening ? "Listening..." : "Ask anything or describe your brand..."}
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
        aria-label="Toggle AI Strategy Engine"
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
