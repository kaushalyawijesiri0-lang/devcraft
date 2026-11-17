import React from 'react';

const badgeColors: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-200/80',
  Advanced: 'bg-rose-50 text-rose-700 border-rose-200/80',
};

const dotColors: Record<string, string> = {
  Beginner: 'bg-emerald-500',
  Intermediate: 'bg-amber-500',
  Advanced: 'bg-rose-500',
};

export const DifficultyBadge: React.FC<{ level: string }> = ({ level }) => {
  const colorClass = badgeColors[level] || badgeColors.Beginner;
  const dotClass = dotColors[level] || dotColors.Beginner;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold ${colorClass}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
      <span>{level}</span>
    </span>
  );
};
