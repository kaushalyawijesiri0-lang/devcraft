export interface StepFile {
  name: string;
  path: string;
  language: string;
  initialCode: string;
  solutionCode: string;
  readOnly?: boolean;
}

export interface StepObjective {
  id: string;
  text: string;
  completed: boolean;
}

export interface TestAssertion {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  errorHint?: string;
}

export interface ConceptCheckQuestion {
  question: string;
  concept: string;
  explanation: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
}

export interface ProjectStep {
  stepNumber: number;
  id: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  xpReward: number;
  objectives: StepObjective[];
  instructionsMarkdown: string[];
  codeSnippets?: { title: string; code: string }[];
  hints: {
    level1: string;
    level2: string;
    solutionSnippet?: string;
  };
  files: StepFile[];
  defaultActiveFile: string;
  tests: TestAssertion[];
  conceptCheck?: ConceptCheckQuestion;
}

export interface GuidedProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'fullstack' | 'backend' | 'frontend' | 'database';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  totalSteps: number;
  xpPoints: number;
  technologies: string[];
  color: string;
  iconName: string;
  steps: ProjectStep[];
}

export interface MemeItem {
  id: string;
  subreddit: string;
  author: string;
  timeAgo: string;
  caption: string;
  codeLines?: { label: string; text: string; color: string }[];
  imageUrl?: string;
  upvotes: string;
  commentsCount: number;
}
