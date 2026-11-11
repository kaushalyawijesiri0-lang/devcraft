import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, Lock, ArrowRight } from 'lucide-react';
import { useWorkspaceState } from '../hooks/useWorkspaceState';
import { WorkspaceBanner } from '../components/workspace/WorkspaceBanner';
import { InstructionPanel } from '../components/workspace/InstructionPanel';
import { EditorPanel } from '../components/workspace/EditorPanel';
import { LivePreviewCard } from '../components/workspace/LivePreviewCard';
import { ConsoleRunner } from '../components/workspace/ConsoleRunner';
import { ConceptCheckModal } from '../components/modals/ConceptCheckModal';
import { MemeBreakModal } from '../components/modals/MemeBreakModal';
import { StepCompletionModal } from '../components/modals/StepCompletionModal';
import { guidedProjectsList, GuidedProjectItem } from '../data/projectsData';

export const WorkspacePage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const currentProjectId = projectId || 'mern-task-manager';

  // Find project item from catalog list
  const catalogProject: GuidedProjectItem = useMemo(() => {
    return (
      guidedProjectsList.find((p) => p.id === currentProjectId) ||
      guidedProjectsList[0]
    );
  }, [currentProjectId]);

  const {
    project,
    activeStepIndex,
    currentStep,
    activeFileName,
    setActiveFileName,
    activeFile,
    currentCode,
    updateCurrentCode,
    resetCurrentFile,
    loadSolution,
    validationStatus,
    testResults,
    consecutiveFails,
    executionLogs,
    clearLogs,
    runValidation,
    isLocked,
    conceptChecksCleared,
    showConceptModal,
    setShowConceptModal,
    handlePassConceptCheck,
    showMemeModal,
    setShowMemeModal,
    showCompletionModal,
    setShowCompletionModal,
    goToNextStep,
  } = useWorkspaceState(currentProjectId);

  const allPassed = testResults.every((t) => t.passed) && validationStatus === 'success';

  return (
    <div className="w-full space-y-5">
      {/* 1. Top Banner */}
      <WorkspaceBanner project={catalogProject} xp={currentStep.xpReward} />

      {/* 2. Breadcrumbs & Next Step Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm text-ink-500">
          <Link
            to="/guided"
            className="rounded p-0.5 transition-colors hover:text-ink-900"
            aria-label="Guided projects"
          >
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-ink-300" />
          <Link
            to="/guided"
            className="truncate transition-colors hover:text-ink-900"
          >
            {project.title}
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-ink-300" />
          <span className="truncate font-semibold text-ink-900" aria-current="page">
            Step {activeStepIndex + 1}: {currentStep.title}
          </span>
        </nav>

        <button
          type="button"
          onClick={() => {
            if (allPassed) {
              goToNextStep();
            }
          }}
          disabled={!allPassed}
          className="group flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-hover disabled:text-ink-400"
        >
          {!allPassed && <Lock className="h-3.5 w-3.5" />}
          <span>
            {activeStepIndex < project.steps.length - 1
              ? `Next: Step ${activeStepIndex + 2} – ${project.steps[activeStepIndex + 1]?.title || 'Next'}`
              : 'Complete Project'}
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-enabled:group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* 3. Three-Column Workspace Layout */}
      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_370px]">
        {/* Column 1 (Left): Instructions Panel */}
        <div className="order-2 xl:order-1">
          <InstructionPanel
            currentStep={currentStep}
            totalSteps={project.steps.length}
            onOpenTheory={() => setShowConceptModal(true)}
            theoryDone={Boolean(conceptChecksCleared[currentStep.id])}
            onApplySolution={loadSolution}
          />
        </div>

        {/* Column 2 (Center): Code Editor */}
        <div className="order-1 xl:order-2">
          <div className="xl:sticky xl:top-20">
            <EditorPanel
              files={currentStep.files}
              activeFileName={activeFileName}
              activeFile={activeFile}
              code={currentCode}
              onCodeChange={updateCurrentCode}
              onSelectFile={(name) => setActiveFileName(name)}
              onReset={resetCurrentFile}
              onRun={runValidation}
              running={validationStatus === 'running'}
              locked={isLocked}
              onUnlockRequest={() => setShowConceptModal(true)}
            />
          </div>
        </div>

        {/* Column 3 (Right): Live Preview & Test Runner */}
        <div className="order-3 flex flex-col gap-5">
          <LivePreviewCard checks={testResults} />
          <ConsoleRunner
            testResults={testResults}
            logs={executionLogs}
            allPassed={allPassed}
            onClearLogs={clearLogs}
            onNextStep={goToNextStep}
          />
        </div>
      </div>

      {/* 4. Modals */}
      {currentStep.conceptCheck && (
        <ConceptCheckModal
          isOpen={showConceptModal}
          conceptCheck={currentStep.conceptCheck}
          stepNumber={currentStep.stepNumber}
          onSuccess={handlePassConceptCheck}
          onClose={() => setShowConceptModal(false)}
        />
      )}

      <MemeBreakModal
        isOpen={showMemeModal}
        consecutiveFails={consecutiveFails}
        onClose={() => setShowMemeModal(false)}
      />

      <StepCompletionModal
        isOpen={showCompletionModal}
        stepNumber={currentStep.stepNumber}
        totalSteps={project.steps.length}
        stepTitle={currentStep.title}
        xpReward={currentStep.xpReward}
        onNextStep={goToNextStep}
        onStayOnStep={() => {
          setShowCompletionModal(false);
          if (activeStepIndex >= project.steps.length - 1) {
            navigate('/guided');
          }
        }}
      />
    </div>
  );
};
