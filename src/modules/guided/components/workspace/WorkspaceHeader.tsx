import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, RefreshCw, Smile, Lightbulb, CheckCircle2 } from 'lucide-react';
import { GuidedProject, ProjectStep } from '../../types/guided.types';

interface WorkspaceHeaderProps {
  project: GuidedProject;
  currentStep: ProjectStep;
  activeStepIndex: number;
  totalSteps: number;
  validationStatus: 'idle' | 'running' | 'success' | 'failed';
  onRunValidation: () => void;
  onResetCode: () => void;
  onTriggerMeme: () => void;
  onOpenConceptCheck?: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  project,
  currentStep,
  activeStepIndex,
  totalSteps,
  validationStatus,
  onRunValidation,
  onResetCode,
  onTriggerMeme,
  onOpenConceptCheck,
}) => {
  const isRunning = validationStatus === 'running';

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 text-slate-100">
      {/* Left: Back & Project info */}
      <div className="flex items-center gap-3">
        <Link
          to="/guided"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-slate-700 hover:text-white"
          title="Back to Catalog"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm sm:text-base">{project.title}</span>
          <span className="text-slate-600">•</span>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-400">
            <span>Step {activeStepIndex + 1} of {totalSteps}:</span>
            <span className="font-semibold text-slate-200">{currentStep.title}</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {currentStep.conceptCheck && onOpenConceptCheck && (
          <button
            type="button"
            onClick={onOpenConceptCheck}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white"
            title="Review Step Concept Check"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            <span>Theory Check</span>
          </button>
        )}

        <button
          type="button"
          onClick={onTriggerMeme}
          className="inline-flex items-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs font-medium text-pink-300 hover:bg-pink-500/20"
          title="Anti-Boredom Meme Break"
        >
          <Smile className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Meme Break</span>
        </button>

        <button
          type="button"
          onClick={onResetCode}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          title="Reset file code to initial boilerplate"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          type="button"
          disabled={isRunning}
          onClick={onRunValidation}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-bold text-white shadow-md transition-all ${
            validationStatus === 'success'
              ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
              : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>Validating...</span>
            </>
          ) : validationStatus === 'success' ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Passed! Re-Run</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Run &amp; Validate</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
