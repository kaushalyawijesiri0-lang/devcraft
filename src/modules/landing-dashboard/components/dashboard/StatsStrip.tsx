import React from "react";
import { stats } from "../../data/dashboard";
import { useCountUp } from "../../hooks/useCountUp";

function Stat({ label, value, icon: Icon }: (typeof stats)[number]) {
  const count = useCountUp(value, true, 1.3);
  return (
    <div className="group flex items-center gap-3 px-6 py-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-tint text-brand transition-transform duration-200 group-hover:-rotate-6">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <p className="text-sm text-muted">
        {label}: <span className="font-semibold tabular-nums text-ink">{count.toLocaleString()}</span>
      </p>
    </div>);

}

export function StatsStrip() {
  return (
    <section
      aria-label="Your stats"
      className="grid divide-y divide-line rounded-2xl border border-line bg-white/85 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      
      {stats.map((s) =>
      <Stat key={s.label} {...s} />
      )}
    </section>);

}