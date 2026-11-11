import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { RoadmapStep } from '../../data/projectsData';

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
  onResume: () => void;
  onReview?: (step: RoadmapStep) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ steps, onResume, onReview }) => {
  return (
    <ol className="relative space-y-2">
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const isDone = step.status === 'done';
        const isCurrent = step.status === 'current';

        return (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.02, ease: [0.23, 1, 0.32, 1] }}
            className={`relative flex items-center justify-between gap-3 rounded-xl transition-colors ${
              isCurrent
                ? 'bg-brand-tint border border-brand-200 p-2.5 shadow-xs'
                : 'p-1.5'
            }`}
          >
            {/* Connecting line for completed/pending items */}
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[17px] top-8 h-[calc(100%-14px)] w-0.5 ${
                  isDone ? 'bg-emerald-400' : 'bg-line'
                }`}
              />
            )}

            {/* Left: Icon + Text */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {isDone ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                ) : isCurrent ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white font-bold text-xs ring-2 ring-brand-200">
                    {step.id}
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Lock className="h-3 w-3" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h4
                  className={`text-xs ${
                    isCurrent
                      ? 'font-bold text-ink-900'
                      : isDone
                      ? 'font-semibold text-ink-900'
                      : 'font-medium text-slate-400'
                  }`}
                >
                  {step.title}
                </h4>
                <p className="mt-0.5 line-clamp-1 text-[11px] text-ink-500">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Right: Action button */}
            <div className="shrink-0 pl-2">
              {isCurrent && (
                <button
                  type="button"
                  onClick={onResume}
                  className="rounded-lg bg-brand px-3 py-1 text-xs font-semibold text-white shadow-button transition-colors hover:bg-brand-hover"
                >
                  Resume
                </button>
              )}

              {isDone && (
                <button
                  type="button"
                  onClick={() => onReview?.(step)}
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  Review
                </button>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
};
