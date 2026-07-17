"use client";

import { Reveal } from "@/lib/motion";
import { useCountUp } from "@/lib/motion";

const STATS = [
  { target: 150, suffix: "+", label: "Websites Delivered", note: "Across 12+ Global Industries" },
  { target: 120, suffix: "+", label: "Happy Founders & Clients", note: "Long-term Partnerships" },
  { target: 99, suffix: "%", label: "Satisfaction Score", note: "Rated 4.95/5.0 Stars" },
  { target: 14, suffix: " Days", label: "Guaranteed Delivery Speed", note: "On-Time Milestone Track" },
];

function StatCard({
  target,
  suffix,
  label,
  note,
}: {
  target: number;
  suffix: string;
  label: string;
  note: string;
}) {
  const { value, ref } = useCountUp(target, 1800);
  return (
    <div
      ref={ref}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#070b1e]/80 p-8 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-light/50 hover:bg-[#0c1230] hover:-translate-y-1"
    >
      <div>
        <span className="font-display text-[clamp(2.5rem,5vw,3.8rem)] font-extrabold text-gradient">
          {value}
          {suffix}
        </span>
        <h3 className="mt-2 text-sm font-bold uppercase tracking-wide text-white">{label}</h3>
      </div>
      <p className="mt-3 text-[11px] font-mono text-cyan-light/80">{note}</p>
    </div>
  );
}

export default function Results() {
  return (
    <section id="results" className="section-pad relative overflow-hidden" aria-labelledby="results-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.15),transparent)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-light">
            Proven Performance
          </span>
          <h2 id="results-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-tight">
            Metrics That Scale Businesses
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
