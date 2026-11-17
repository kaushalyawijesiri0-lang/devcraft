import React, { useState } from 'react';
import { ProjectStep } from '../../types/guided.types';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Copy,
  Check,
  Code2,
  BookOpen,
} from 'lucide-react';

interface InstructionPanelProps {
  currentStep: ProjectStep;
  totalSteps: number;
  onOpenTheory: () => void;
  theoryDone: boolean;
  onApplySolution: () => void;
}

export const InstructionPanel: React.FC<InstructionPanelProps> = ({
  currentStep,
  totalSteps,
  onOpenTheory,
  theoryDone,
  onApplySolution,
}) => {
  const [activeHintLevel, setActiveHintLevel] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const toggleHint = (level: number) => {
    setActiveHintLevel((prev) => (prev === level ? null : level));
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  };

  return (
    <section
      aria-label="Step instructions"
      className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-white shadow-card"
    >
      {/* Step Header */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-brand">
            Step {currentStep.stepNumber} of {totalSteps}
          </p>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            In progress
          </span>
        </div>

        <h2 className="mt-1.5 text-xl font-bold tracking-tight text-ink-900">
          {currentStep.title}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-500">
          {currentStep.subtitle}
        </p>

        {/* Theory Check Gatekeeper Card */}
        {currentStep.conceptCheck && (
          <button
            type="button"
            onClick={onOpenTheory}
            className={`group mt-4 flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
              theoryDone
                ? 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-300'
                : 'border-line bg-white hover:border-brand/50 hover:shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                  theoryDone
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'border border-line bg-canvas text-ink-700'
                }`}
              >
                📖
              </div>
              <div>
                <p className="text-xs font-bold text-ink-900">Theory check</p>
                <p className="text-[11px] text-ink-500">
                  {theoryDone ? 'Prerequisite verified ✓' : '5 short slides • +10 XP'}
                </p>
              </div>
            </div>
            <span className="text-sm text-ink-400 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </button>
        )}
      </div>

      {/* Objectives Checklist */}
      <div className="p-5">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">
          Objectives
        </h3>
        <ul className="space-y-2 text-xs">
          {currentStep.objectives.map((obj) => (
            <li key={obj.id} className="flex items-start gap-2.5 text-ink-700">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              <span>{obj.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="p-5 space-y-2.5 text-xs leading-relaxed text-ink-600">
        <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400">
          Instructions
        </h3>
        {currentStep.instructionsMarkdown.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Code Snippets */}
      {currentStep.codeSnippets && currentStep.codeSnippets.length > 0 && (
        <div className="p-5">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">
            Code Example
          </h3>
          {currentStep.codeSnippets.map((snippet, idx) => (
            <div key={idx} className="rounded-xl border border-line bg-navy-900 overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 text-[11px] text-white/60">
                <span>{snippet.title}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(snippet.code)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedCode ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 font-mono text-[11px] leading-relaxed text-emerald-300 overflow-x-auto">
                <code>{snippet.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* 3-Tier Collapsible Hints Drawer */}
      <div className="p-5 space-y-2" id="hints">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-500">
          <HelpCircle className="h-4 w-4 text-amber-500" />
          <span>Hints (3)</span>
        </div>

        {/* Level 1 Hint */}
        <div className="rounded-xl border border-line bg-canvas overflow-hidden">
          <button
            type="button"
            onClick={() => toggleHint(1)}
            className="flex w-full items-center justify-between p-2.5 text-left text-xs font-semibold text-ink-700 hover:text-ink-900"
          >
            <span>💡 Hint 1: Conceptual Direction</span>
            {activeHintLevel === 1 ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {activeHintLevel === 1 && (
            <div className="border-t border-line p-3 text-xs leading-relaxed text-ink-600 bg-white">
              {currentStep.hints.level1}
            </div>
          )}
        </div>

        {/* Level 2 Hint */}
        <div className="rounded-xl border border-line bg-canvas overflow-hidden">
          <button
            type="button"
            onClick={() => toggleHint(2)}
            className="flex w-full items-center justify-between p-2.5 text-left text-xs font-semibold text-ink-700 hover:text-ink-900"
          >
            <span>⚙️ Hint 2: Implementation Details</span>
            {activeHintLevel === 2 ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {activeHintLevel === 2 && (
            <div className="border-t border-line p-3 text-xs leading-relaxed text-ink-600 bg-white">
              {currentStep.hints.level2}
            </div>
          )}
        </div>

        {/* Level 3 Solution Peek */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleHint(3)}
            className="flex w-full items-center justify-between p-2.5 text-left text-xs font-semibold text-amber-700 hover:text-amber-900"
          >
            <span>🔓 Hint 3: Code Solution</span>
            {activeHintLevel === 3 ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {activeHintLevel === 3 && (
            <div className="border-t border-amber-200 p-3 text-xs bg-white">
              <pre className="mb-2 max-h-40 overflow-y-auto rounded-lg bg-navy-950 p-2.5 font-mono text-[11px] text-emerald-300">
                <code>{currentStep.hints.solutionSnippet || currentStep.files[0]?.solutionCode}</code>
              </pre>
              <button
                type="button"
                onClick={onApplySolution}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-500 transition-colors"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Apply Solution to Editor</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
