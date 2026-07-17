"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, AlertCircle, MessageSquare } from "lucide-react";
import { soundManager } from "@/lib/audio";

const SERVICES = [
  "High-Converting Landing Page",
  "Corporate Business Website",
  "Portfolio & Personal Brand",
  "E-Commerce Storefront",
  "Complete Website Redesign",
  "Custom Web Application / SaaS",
];

const BUDGETS = ["$1,000 - $3,000", "$3,000 - $5,000", "$5,000 - $10,000", "$10,000+"];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedService, setSelectedService] = useState(SERVICES[1]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGETS[1]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    soundManager.playClick();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const phone = (data.get("phone") as string) || "";
    const customService = (data.get("service") as string) || "";
    const message = (data.get("message") as string) || "";

    const finalService = customService ? `${selectedService} (${customService})` : selectedService;

    try {
      // 1. Submit directly to Netlify static form endpoint /form.html
      const netlifyBody = new URLSearchParams();
      netlifyBody.append("form-name", "contact");
      netlifyBody.append("name", name);
      netlifyBody.append("email", email);
      netlifyBody.append("phone", phone);
      netlifyBody.append("service", finalService);
      netlifyBody.append("budget", selectedBudget);
      netlifyBody.append("message", message);

      const netlifyPromise = fetch("/form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: netlifyBody.toString(),
      }).catch(() => null);

      // 2. Submit to internal API backup
      const apiPromise = fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: finalService,
          budget: selectedBudget,
          message,
        }),
      }).catch(() => null);

      await Promise.all([netlifyPromise, apiPromise]);

      soundManager.playSuccess();
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-[#080d24]/90 p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-light">
          2-Week Build Slot Openings Active
        </span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
        Start Your Project Sprint
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-white/70">
        Fill out your project details to receive a free strategy proposal within 24 hours.
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="font-display font-extrabold text-xl text-white">
            Proposal Request Received!
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-md mx-auto">
            Thank you! Your project request has been submitted. Our founding team will review your details and contact you via email / WhatsApp within 24 hours.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/919361099051?text=Hi%20ManickVerse%2C%20I%20just%20submitted%20a%20project%20form%20on%20your%20website!"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-space-black shadow-md"
            >
              <MessageSquare className="h-4 w-4" />
              Direct WhatsApp Follow-up
            </a>
            <button
              onClick={() => setStatus("idle")}
              className="rounded-full bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20"
            >
              Submit Another Inquiry
            </button>
          </div>
        </motion.div>
      ) : (
        <form
          action="/form.html"
          method="POST"
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
          name="contact"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Manickam R"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-light transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="e.g. founder@company.com"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-light transition-all"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +91 9361099051"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-light transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                Primary Goal / Industry
              </label>
              <input
                type="text"
                name="service"
                placeholder="e.g. E-Commerce Redesign"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-light transition-all"
              />
            </div>
          </div>

          {/* Service Selector Pills */}
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">
              Select Desired Service Scope
            </label>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedService(s);
                  }}
                  className={`rounded-xl px-3 py-2 text-[11px] font-semibold transition-all ${
                    selectedService === s
                      ? "border border-cyan-light bg-cyan/20 text-cyan-light shadow-sm"
                      : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Selector Pills */}
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">
              Target Project Budget
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedBudget(b);
                  }}
                  className={`rounded-xl py-2 text-[11px] font-mono font-semibold transition-all ${
                    selectedBudget === b
                      ? "border border-cyan-light bg-cyan/20 text-cyan-light shadow-sm"
                      : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1.5">
              Tell us about your project or existing website link
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Describe your goals, current site problems, or target launch deadline..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-light transition-all resize-none"
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric via-royal to-cyan py-4 text-xs font-extrabold text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting Project Sprint Request...</span>
              </>
            ) : (
              <>
                <span>Request Free Proposal & Scope</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
