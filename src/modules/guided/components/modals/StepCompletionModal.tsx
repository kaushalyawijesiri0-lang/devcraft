import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface StepCompletionModalProps {
  isOpen: boolean;
  stepNumber: number;
  totalSteps: number;
  stepTitle: string;
  xpReward: number;
  onNextStep: () => void;
  onStayOnStep: () => void;
}

export const StepCompletionModal: React.FC<StepCompletionModalProps> = ({
  isOpen,
  stepNumber,
  totalSteps,
  stepTitle,
  xpReward,
  onNextStep,
  onStayOnStep,
}) => {
  const isFinalStep = stepNumber >= totalSteps;

  useEffect(() => {
    if (isOpen) {
      // Fire confetti bursts
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      const timeout = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center text-slate-100 shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute -top-16 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

        {/* Trophy icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-emerald-500/30">
          <Trophy className="h-8 w-8 text-emerald-400" />
        </div>

        {/* Title */}
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Step {stepNumber} Validated!</span>
        </div>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
          {isFinalStep ? 'Project Completed! 🚀' : 'Milestone Achieved!'}
        </h2>
        <p className="mt-1 text-sm text-slate-300">{stepTitle}</p>

        {/* XP Badge */}
        <div className="my-5 inline-flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-2.5">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <span className="text-lg font-black text-amber-300">+{xpReward} XP</span>
          <span className="text-xs text-amber-400/80">awarded</span>
        </div>

        <p className="text-xs text-slate-400">
          {isFinalStep
            ? 'You have successfully implemented all functional components and unit tests for this MERN stack project!'
            : 'All test assertions passed functional correctness checks. The next project milestone is now unlocked.'}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-2">
          {!isFinalStep ? (
            <button
              onClick={onNextStep}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500"
            >
              <span>Continue to Step {stepNumber + 1}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onStayOnStep}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500"
            >
              <span>Explore More Projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={onStayOnStep}
            className="w-full rounded-xl py-2 text-xs font-medium text-slate-400 hover:text-white"
          >
            Review Code Solution
          </button>
        </div>
      </div>
    </div>
  );
};
