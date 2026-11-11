import React, { useState, useEffect } from 'react';
import { ConceptCheckQuestion } from '../../types/guided.types';
import { GraduationCap, CheckCircle2, AlertCircle, X, ArrowRight } from 'lucide-react';

interface ConceptCheckModalProps {
  isOpen: boolean;
  conceptCheck: ConceptCheckQuestion;
  stepNumber?: number;
  onSuccess: () => void;
  onClose: () => void;
}

export const ConceptCheckModal: React.FC<ConceptCheckModalProps> = ({
  isOpen,
  conceptCheck,
  onSuccess,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Reset selection when modal opens or question changes
  useEffect(() => {
    if (isOpen) {
      setSelectedId(null);
      setHasInteracted(false);
    }
  }, [isOpen, conceptCheck]);

  if (!isOpen) return null;

  const isCorrect = selectedId === conceptCheck.correctOptionId;

  const handleSelectOption = (id: string) => {
    setSelectedId(id);
    setHasInteracted(true);
  };

  const handleUnlock = () => {
    if (!isCorrect) return;
    onSuccess();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="concept-checkpoint-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-line bg-white p-6 sm:p-8 text-ink-900 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1 text-ink-400 transition-colors hover:bg-canvas hover:text-ink-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with Blue Squircle Icon */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-button">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1 pr-6">
            <h2 id="concept-checkpoint-title" className="text-xl font-bold tracking-tight text-ink-900">
              Concept checkpoint
            </h2>
            <p className="mt-0.5 text-xs font-semibold text-ink-500">
              {conceptCheck.concept}
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Answer this question correctly to unlock the editor and continue with this step.
            </p>
          </div>
        </div>

        {/* Question Counter & XP Reward */}
        <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4">
          <span className="text-xs font-medium text-ink-500">Question 1 of 1</span>
          <span className="inline-flex items-center rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
            +10 XP
          </span>
        </div>

        {/* Question Body */}
        <p className="mt-3 text-sm font-bold text-ink-900">
          {conceptCheck.question}
        </p>

        {/* Options List */}
        <div className="mt-4 space-y-2.5">
          {conceptCheck.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            const isThisOptionCorrect = opt.id === conceptCheck.correctOptionId;

            return (
              <div
                key={opt.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectOption(opt.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectOption(opt.id);
                  }
                }}
                className={`group flex items-center gap-3.5 rounded-xl border p-3.5 text-xs sm:text-sm cursor-pointer transition-all ${
                  isSelected
                    ? isThisOptionCorrect
                      ? 'border-emerald-500 bg-emerald-50/50 text-ink-900 shadow-xs'
                      : 'border-rose-300 bg-rose-50/50 text-ink-900'
                    : 'border-line bg-white hover:border-ink-300 hover:bg-canvas/50 text-ink-800'
                }`}
              >
                {/* Circular Radio Indicator */}
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isSelected
                      ? isThisOptionCorrect
                        ? 'border-emerald-600 bg-emerald-600'
                        : 'border-rose-500 bg-rose-500'
                      : 'border-ink-300 group-hover:border-ink-400'
                  }`}
                >
                  {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>

                {/* Option Text */}
                <span className="flex-1 leading-relaxed">{opt.text}</span>
              </div>
            );
          })}
        </div>

        {/* Interactive Feedback Box */}
        {hasInteracted && selectedId && (
          <div
            className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3 text-xs leading-relaxed ${
              isCorrect
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border-rose-200 bg-rose-50 text-rose-900'
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <span className="font-bold text-emerald-950">Correct!</span> {conceptCheck.explanation}
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                <div>
                  <span className="font-bold text-rose-950">Not quite — try again.</span> In Express,
                  middleware functions run sequentially in the order defined before requests reach the route handler.
                </div>
              </>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-end">
          <button
            type="button"
            onClick={handleUnlock}
            disabled={!isCorrect}
            className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
              isCorrect
                ? 'bg-brand text-white shadow-button hover:bg-brand-hover active:scale-[0.99] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Unlock editor</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
