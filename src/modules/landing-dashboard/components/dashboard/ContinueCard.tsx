import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { currentLesson } from "../../data/dashboard";
import { easeOut } from "../../utils/motion";

export function ContinueCard() {
  const navigate = useNavigate();
  const pct = currentLesson.completed / currentLesson.total * 100;

  return (
    <section className="flex h-full flex-col rounded-2xl border border-line bg-white/85 p-6 backdrop-blur-sm">
      <h2 className="text-base font-semibold text-ink">Pick up where you left off</h2>
      <p className="mt-5 text-xs font-medium text-brand">{currentLesson.track}</p>
      <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">{currentLesson.title}</p>
      <p className="mt-1 text-sm text-muted">{currentLesson.lesson}</p>

      <div className="mt-auto pt-8">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">
            {currentLesson.completed} of {currentLesson.total} lessons completed
          </span>
          <span className="font-medium tabular-nums text-ink">{pct}%</span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}>
          
          <motion.div
            className="h-full w-full origin-left rounded-full bg-brand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: pct / 100 }}
            transition={{ delay: 0.4, duration: 1, ease: easeOut }} />
          
        </div>
        <button
          type="button"
          onClick={() => navigate('/theory-dojo')}
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-medium text-white shadow-[0_10px_24px_-12px_rgba(31,94,255,0.8)] transition-[background-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-brand-hover active:translate-y-0 active:scale-[0.99]">
          
          Continue learning
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </section>);

}