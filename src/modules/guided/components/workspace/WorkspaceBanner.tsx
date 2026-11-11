import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { GuidedProjectItem } from '../../data/projectsData';
import { TechBadge } from '../catalog/TechBadge';
import { ProgressRing } from '../catalog/ProgressRing';

interface WorkspaceBannerProps {
  project: GuidedProjectItem;
  xp: number;
}

export const WorkspaceBanner: React.FC<WorkspaceBannerProps> = ({ project, xp }) => {
  const percent = Math.round((project.completedSteps / project.totalSteps) * 100);

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-4 shadow-card md:flex-row md:items-center">
      {/* Left: Thumbnail & Title */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <img
          src={project.image}
          alt=""
          className="hidden h-20 w-32 shrink-0 rounded-xl object-cover ring-1 ring-line sm:block"
        />
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-ink-900">
            {project.title}
          </h1>
          <p className="mt-0.5 line-clamp-2 text-xs text-ink-500">
            {project.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechBadge key={t} name={t} size="xs" />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Steps Progress & Back to Project */}
      <div className="flex items-center gap-5 md:border-l md:border-line md:pl-5">
        <div className="flex items-center gap-3">
          <ProgressRing
            value={percent}
            size={50}
            stroke={4}
            customLabel={<span className="text-xs font-bold text-ink-900">{project.completedSteps}/{project.totalSteps}</span>}
          />
          <div>
            <p className="text-xs font-semibold text-ink-900">
              Steps completed
            </p>
            <motion.p
              initial={{ y: -4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-amber-600"
            >
              <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              <span>+{xp} XP this session</span>
            </motion.p>
          </div>
        </div>

        <Link
          to="/guided"
          className="ml-auto flex items-center gap-2 whitespace-nowrap rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink-700 shadow-xs transition-colors hover:border-brand hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to project</span>
        </Link>
      </div>
    </section>
  );
};
