import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Bookmark, ArrowRight } from 'lucide-react';
import { GuidedProjectItem } from '../../data/projectsData';
import { DifficultyBadge } from './DifficultyBadge';
import { TechBadge } from './TechBadge';
import { ProgressRing } from './ProgressRing';

interface ProjectCardProps {
  project: GuidedProjectItem;
  selected?: boolean;
  saved?: boolean;
  onSelect?: () => void;
  onToggleSave?: () => void;
  onOpen: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  selected = false,
  saved = false,
  onSelect,
  onToggleSave,
  onOpen,
}) => {
  const percent = Math.round((project.completedSteps / project.totalSteps) * 100);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative flex h-full flex-col rounded-2xl border bg-white p-4 shadow-card transition-all duration-200 ${
        selected
          ? 'border-brand ring-2 ring-brand/20 shadow-lift'
          : 'border-line hover:border-brand-200 hover:shadow-lift'
      }`}
    >
      {/* Click target for selecting card */}
      {onSelect && (
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={selected}
          aria-label={`Preview ${project.title}`}
          className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
      )}

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col">
        {/* Top: Difficulty, Duration, Bookmark */}
        <div className="flex items-center justify-between">
          <DifficultyBadge level={project.difficulty} />

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-ink-500">
              <Clock className="h-3.5 w-3.5 text-ink-400" />
              <span>{project.duration}</span>
            </span>

            {onToggleSave && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave();
                }}
                aria-pressed={saved}
                aria-label={saved ? `Unsave ${project.title}` : `Save ${project.title}`}
                className={`pointer-events-auto rounded-lg border p-1.5 transition-colors ${
                  saved
                    ? 'border-brand bg-brand-tint text-brand'
                    : 'border-line bg-white text-ink-400 hover:border-brand hover:text-brand'
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-brand text-brand' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Image */}
        <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-xl bg-ink-950">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Title & Description */}
        <h3 className="mt-3 text-[15px] font-bold leading-snug text-ink-900 group-hover:text-brand transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-500">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <TechBadge key={t} name={t} size="xs" />
          ))}
        </div>

        {/* Progress & Launch Button */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-line/60">
          <ProgressRing value={percent} size={38} stroke={4} />

          <div className="min-w-0 flex-1">
            <p className="text-xs text-ink-600">
              <span className="font-bold text-ink-900">{project.completedSteps}</span>
              {' / '}
              {project.totalSteps} steps completed
            </p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full bg-brand"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            aria-label={`Open ${project.title}`}
            className="pointer-events-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-button transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
