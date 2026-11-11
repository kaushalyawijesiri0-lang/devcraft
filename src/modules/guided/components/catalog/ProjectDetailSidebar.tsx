import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Layers, Sparkles, Bookmark, Play, CheckCircle2, Star } from 'lucide-react';
import { GuidedProjectItem, sampleReviews, RoadmapStep } from '../../data/projectsData';
import { DifficultyBadge } from './DifficultyBadge';
import { TechBadge } from './TechBadge';
import { RoadmapTimeline } from './RoadmapTimeline';

interface ProjectDetailSidebarProps {
  project: GuidedProjectItem;
  saved?: boolean;
  onToggleSave?: () => void;
  onOpen: () => void;
}

export const ProjectDetailSidebar: React.FC<ProjectDetailSidebarProps> = ({
  project,
  saved = false,
  onToggleSave,
  onOpen,
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'overview' | 'skills' | 'reviews'>('roadmap');
  const hasProgress = project.completedSteps > 0;

  // Generate fallback roadmap if project doesn't have custom steps
  const roadmapSteps: RoadmapStep[] = useMemo(() => {
    if (project.roadmap && project.roadmap.length > 0) return project.roadmap;
    return Array.from({ length: project.totalSteps }, (_, idx) => {
      const stepNum = idx + 1;
      const isDone = stepNum <= project.completedSteps;
      const isCurrent = stepNum === project.completedSteps + 1;
      return {
        id: stepNum,
        title: `Module Step ${stepNum}`,
        description: `Implement and test step ${stepNum} functional logic.`,
        status: isDone ? 'done' : isCurrent ? 'current' : 'locked',
      };
    });
  }, [project]);

  const tabs = [
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'overview', label: 'Overview' },
    { id: 'skills', label: 'Skills' },
    { id: 'reviews', label: `Reviews (${project.reviews})` },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={project.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        aria-label={`${project.title} details`}
        className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
      >
        {/* Banner image with overlays */}
        <div className="relative aspect-[16/9] overflow-hidden bg-ink-950">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3">
            <DifficultyBadge level={project.difficulty} />
          </div>

          {onToggleSave && (
            <button
              type="button"
              onClick={onToggleSave}
              aria-pressed={saved}
              aria-label={saved ? 'Unsave project' : 'Save project'}
              className="absolute right-3 top-3 rounded-lg border border-line bg-white/90 p-1.5 text-ink-600 backdrop-blur shadow-sm transition-colors hover:text-brand"
            >
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-brand text-brand' : ''}`} />
            </button>
          )}
        </div>

        {/* Content body */}
        <div className="p-5">
          <h2 className="text-xl font-bold tracking-tight text-ink-900">
            {project.title}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            {project.overview}
          </p>

          {/* Metadata dl */}
          <dl className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-600">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-ink-400" />
              <dt className="sr-only">Duration</dt>
              <dd>{project.duration}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-ink-400" />
              <dt className="sr-only">Steps</dt>
              <dd>{project.totalSteps} steps</dd>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-amber-600">
              <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              <dt className="sr-only">Reward</dt>
              <dd>+{project.xp} XP</dd>
            </div>
          </dl>

          {/* Tech tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onOpen}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-button transition-all hover:bg-brand-hover active:scale-[0.99]"
          >
            <Play className="h-3.5 w-3.5 fill-current transition-transform duration-200 ease-out group-hover:scale-110" />
            <span>{hasProgress ? 'Resume Project' : 'Start Project'}</span>
          </button>
        </div>

        {/* Tabs Bar */}
        <div
          role="tablist"
          aria-label="Project details"
          className="flex gap-1 overflow-x-auto border-b border-line px-3"
        >
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative whitespace-nowrap px-3 py-2.5 text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'text-brand'
                    : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                <span>{tab.label}</span>
                {isSelected && (
                  <motion.span
                    layoutId="detail-tab"
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand"
                    transition={{ duration: 0.22 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <div role="tabpanel" className="p-4">
          {activeTab === 'roadmap' && (
            <RoadmapTimeline steps={roadmapSteps} onResume={onOpen} />
          )}

          {activeTab === 'overview' && (
            <div className="space-y-3 p-1 text-xs leading-relaxed text-ink-600">
              <p>{project.description}</p>
              <p className="font-semibold text-ink-900">You’ll finish with:</p>
              <ul className="space-y-2">
                {[
                  'A deployed, working fullstack application',
                  'A tested backend with real database collections',
                  'A portfolio-ready GitHub repository with passing Jest suites',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="flex flex-wrap gap-1.5 p-1">
              {project.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-line bg-canvas px-2.5 py-1 text-xs font-medium text-ink-700"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <ul className="divide-y divide-line">
              {sampleReviews.map((rev) => (
                <li key={rev.name} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-ink-900">
                      {rev.name} <span className="font-normal text-ink-400">· {rev.role}</span>
                    </p>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, idx) => (
                        <Star
                          key={idx}
                          className={`h-3 w-3 ${
                            idx < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">
                    {rev.text}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
