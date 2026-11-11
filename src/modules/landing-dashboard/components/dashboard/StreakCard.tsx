import React from "react";
import { motion } from "framer-motion";
import { CheckIcon, FlameIcon } from "lucide-react";
import { weekStreak } from "../../data/dashboard";
import { easeOut } from "../../utils/motion";

export function StreakCard() {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-line bg-white/85 p-6 backdrop-blur-sm">
      <h2 className="text-base font-semibold text-ink">Keep your momentum</h2>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
          <motion.span
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
            
            <FlameIcon className="h-6 w-6" />
          </motion.span>
        </span>
        <p className="text-2xl font-semibold tracking-tight text-ink">5-day streak</p>
      </div>
      <p className="mt-3 text-sm text-muted">Complete a lesson today to keep your streak going.</p>

      <ol className="mt-6 grid grid-cols-7 gap-1" aria-label="This week">
        {weekStreak.map((d, i) =>
        <li key={d.day} className="flex flex-col items-center gap-2">
            <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.2, ease: easeOut }}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
            d.state === "done" ?
            "bg-brand text-white" :
            d.state === "today" ?
            "border-2 border-brand bg-white" :
            "bg-line"}`
            }>
            
              {d.state === "done" && <CheckIcon className="h-4 w-4" strokeWidth={3} />}
              {d.state === "today" &&
            <motion.span
              className="h-2 w-2 rounded-full bg-brand"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />

            }
            </motion.span>
            <span className={`text-[11px] ${d.state === "today" ? "font-medium text-brand" : "text-muted"}`}>
              {d.day}
            </span>
          </li>
        )}
      </ol>

      <p className="mt-auto pt-6 text-sm text-muted">
        Today’s lesson: <span className="font-medium text-ink">Not completed</span>
      </p>
    </section>);

}