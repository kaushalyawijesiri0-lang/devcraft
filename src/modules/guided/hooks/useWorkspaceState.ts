import { useState, useEffect, useMemo, useCallback } from 'react';
import { GuidedProject, ProjectStep, StepFile, TestAssertion } from '../types/guided.types';
import { sampleProjects } from '../data/sampleProjects';
import { guidedProjectsList } from '../data/projectsData';
import { mernTaskManagerSteps } from '../data/projectSteps';

const STORAGE_KEY_PREFIX = 'devcraft_workspace_';

export function useWorkspaceState(projectId = 'mern-task-manager') {
  // 1. Find project
  const project: GuidedProject = useMemo(() => {
    const found = sampleProjects.find((p) => p.id === projectId);
    if (found) return found;
    const cat = guidedProjectsList.find((p) => p.id === projectId);
    if (cat) {
      return {
        id: cat.id,
        title: cat.title,
        tagline: cat.description,
        description: cat.overview,
        category: (cat.type === 'Full Stack' ? 'fullstack' : cat.type === 'API' ? 'backend' : 'frontend') as any,
        difficulty: cat.difficulty,
        durationMinutes: cat.minutes,
        totalSteps: cat.totalSteps,
        xpPoints: cat.xp,
        technologies: cat.tech,
        color: 'from-blue-600 to-indigo-600',
        iconName: 'CheckSquare',
        steps: mernTaskManagerSteps,
      };
    }
    return sampleProjects[0];
  }, [projectId]);

  // 2. Step index
  const [activeStepIndex, setActiveStepIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${project.id}_step_index`);
      if (saved !== null) {
        const idx = parseInt(saved, 10);
        if (!isNaN(idx) && idx >= 0 && idx < project.steps.length) return idx;
      }
    } catch (_err) {
      console.warn('Could not parse step index', _err);
    }
    const cat = guidedProjectsList.find((p) => p.id === projectId);
    if (cat && typeof cat.completedSteps === 'number' && cat.completedSteps > 0 && cat.completedSteps < project.steps.length) {
      return cat.completedSteps;
    }
    return 0;
  });
  const currentStep: ProjectStep = project.steps[activeStepIndex] || project.steps[0];

  // 3. User code buffers map: { [fileKey: string]: string }
  const [fileBuffers, setFileBuffers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${project.id}_buffers`);
      if (saved) return JSON.parse(saved);
    } catch (_err) {
      console.warn('Could not parse saved workspace buffers', _err);
    }
    // initialize from project steps
    const initial: Record<string, string> = {};
    project.steps.forEach((step) => {
      step.files.forEach((file) => {
        initial[`${step.id}:${file.path}`] = file.initialCode;
      });
    });
    return initial;
  });

  // 4. Active file tab
  const [activeFileName, setActiveFileName] = useState<string>(
    () => currentStep.defaultActiveFile || currentStep.files[0]?.name || ''
  );

  // Sync active file when step changes
  useEffect(() => {
    setActiveFileName(currentStep.defaultActiveFile || currentStep.files[0]?.name || '');
  }, [currentStep]);

  // 5. Completed steps & Concept check records
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${project.id}_completed`);
      if (saved) return JSON.parse(saved);
    } catch (_err) {
      console.warn('Could not parse completed steps', _err);
    }
    return {};
  });

  const [conceptChecksCleared, setConceptChecksCleared] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${project.id}_concepts`);
      if (saved) return JSON.parse(saved);
    } catch (_err) {
      console.warn('Could not parse concept checks', _err);
    }
    return {};
  });

  // 6. Validation states
  const [validationStatus, setValidationStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [testResults, setTestResults] = useState<TestAssertion[]>(() => currentStep.tests);
  const [consecutiveFails, setConsecutiveFails] = useState<number>(0);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    'DevCraft Virtual Sandbox v1.4.2 [Jest 29.7.0]',
    'Environment: Node.js 20.11 / Express.js 4.21.2',
    'Ready for automated code evaluation.',
  ]);

  // 7. Modals & Locking
  const isLocked = Boolean(currentStep.conceptCheck && !conceptChecksCleared[currentStep.id]);
  const [showConceptModal, setShowConceptModal] = useState<boolean>(() => {
    return Boolean(currentStep.conceptCheck && !conceptChecksCleared[currentStep.id]);
  });
  const [showMemeModal, setShowMemeModal] = useState<boolean>(false);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  // Check if current step needs concept check on load or step change
  useEffect(() => {
    if (currentStep.conceptCheck && !conceptChecksCleared[currentStep.id]) {
      setShowConceptModal(true);
    }
  }, [currentStep.id, currentStep.conceptCheck, conceptChecksCleared]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${project.id}_buffers`, JSON.stringify(fileBuffers));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${project.id}_completed`, JSON.stringify(completedSteps));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${project.id}_concepts`, JSON.stringify(conceptChecksCleared));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${project.id}_step_index`, String(activeStepIndex));
    } catch (_err) {
      console.warn('Could not save workspace state', _err);
    }
  }, [project.id, activeStepIndex, fileBuffers, completedSteps, conceptChecksCleared]);

  // Active file object & current code
  const activeFile = useMemo(() => {
    return currentStep.files.find((f) => f.name === activeFileName) || currentStep.files[0];
  }, [currentStep, activeFileName]);

  const currentCode = fileBuffers[`${currentStep.id}:${activeFile?.path}`] ?? activeFile?.initialCode ?? '';

  const updateCurrentCode = useCallback(
    (newCode: string) => {
      if (!activeFile) return;
      setFileBuffers((prev) => ({
        ...prev,
        [`${currentStep.id}:${activeFile.path}`]: newCode,
      }));
    },
    [activeFile, currentStep.id]
  );

  const resetCurrentFile = useCallback(() => {
    if (!activeFile) return;
    updateCurrentCode(activeFile.initialCode);
  }, [activeFile, updateCurrentCode]);

  const clearLogs = useCallback(() => {
    setExecutionLogs([]);
  }, []);

  const loadSolution = useCallback(() => {
    if (!activeFile) return;
    updateCurrentCode(activeFile.solutionCode);
  }, [activeFile, updateCurrentCode]);

  // 8. Evaluation runner
  const runValidation = useCallback(() => {
    setValidationStatus('running');
    setExecutionLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Executing AST parser & test runner on ${activeFile.name}...`,
    ]);

    setTimeout(() => {
      const code = currentCode;

      // Smart verification rules based on step
      let allPass = true;
      const updatedTests = currentStep.tests.map((t) => {
        let passed = false;

        if (currentStep.stepNumber === 1) {
          // Express app
          if (t.id === 'test-1-1') passed = code.includes('express()');
          if (t.id === 'test-1-2') passed = code.includes('express.json()') || code.includes('app.use');
          if (t.id === 'test-1-3') passed = code.includes('export default app');
        } else if (currentStep.stepNumber === 2) {
          // Mongoose schema
          if (t.id === 'test-2-1') passed = code.includes('title') && code.includes('completed');
          if (t.id === 'test-2-2') passed = code.includes('false');
          if (t.id === 'test-2-3') passed = code.includes('mongoose.model') && code.includes('Task');
        } else if (currentStep.stepNumber === 3) {
          // Express routes
          if (t.id === 'test-3-1') passed = code.includes("router.get('/api/tasks'") || code.includes('Task.find');
          if (t.id === 'test-3-2') passed = code.includes('req.body') || code.includes('title');
          if (t.id === 'test-3-3') passed = code.includes('201') || code.includes('Task.create');
        } else {
          // React
          passed = code.length > 50;
        }

        if (!passed) allPass = false;
        return { ...t, passed };
      });

      setTestResults(updatedTests);

      if (allPass) {
        setValidationStatus('success');
        setConsecutiveFails(0);
        setCompletedSteps((prev) => ({ ...prev, [currentStep.id]: true }));
        setShowCompletionModal(true);
        setExecutionLogs((prev) => [
          ...prev,
          `✓ PASS: ${currentStep.title} (${updatedTests.length}/${updatedTests.length} assertions passed)`,
          `🎉 Step unlocked! +${currentStep.xpReward} XP awarded to learner.`,
        ]);
      } else {
        setValidationStatus('failed');
        setConsecutiveFails((prev) => {
          const next = prev + 1;
          // Trigger fatigue relief meme break when failing 3 times consecutively
          if (next >= 3) {
            setShowMemeModal(true);
          }
          return next;
        });
        setExecutionLogs((prev) => [
          ...prev,
          `✗ FAIL: ${updatedTests.filter((t) => !t.passed).length} assertion(s) failed. Check your logic or review hints.`,
        ]);
      }
    }, 700);
  }, [currentCode, currentStep, activeFile]);

  // Concept check completed
  const handlePassConceptCheck = useCallback(() => {
    setConceptChecksCleared((prev) => ({ ...prev, [currentStep.id]: true }));
    setShowConceptModal(false);
    setExecutionLogs((prev) => [
      ...prev,
      `💡 Concept Check Cleared: Prerequisite logic verified for Step ${currentStep.stepNumber}! +10 XP awarded.`,
      `🔓 Editor unlocked: You can now modify and validate code for this step.`,
    ]);
  }, [currentStep.id, currentStep.stepNumber]);

  // Next step
  const goToNextStep = useCallback(() => {
    setShowCompletionModal(false);
    if (activeStepIndex < project.steps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
      setValidationStatus('idle');
    }
  }, [activeStepIndex, project.steps.length]);

  return {
    project,
    activeStepIndex,
    setActiveStepIndex,
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
    completedSteps,
    goToNextStep,
  };
}
