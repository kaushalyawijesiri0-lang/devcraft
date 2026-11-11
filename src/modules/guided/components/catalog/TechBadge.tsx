import React from 'react';

const techColors: Record<string, string> = {
  React: 'bg-sky-50 text-sky-700 border-sky-200',
  'Node.js': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  MongoDB: 'bg-green-50 text-green-700 border-green-200',
  Express: 'bg-slate-100 text-slate-700 border-slate-200',
  JavaScript: 'bg-amber-50 text-amber-700 border-amber-200',
  'Socket.io': 'bg-slate-100 text-slate-700 border-slate-200',
  JWT: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  OpenAI: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Chart.js': 'bg-rose-50 text-rose-700 border-rose-200',
  API: 'bg-purple-50 text-purple-700 border-purple-200',
};

export const TechBadge: React.FC<{ name: string; size?: 'xs' | 'sm' }> = ({ name, size = 'sm' }) => {
  const colorClass = techColors[name] || 'bg-brand-tint text-brand border-brand-200';
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md font-medium border ${colorClass} ${
        size === 'xs' ? 'px-1.5 py-0.5 text-[10.5px]' : 'px-2 py-0.5 text-xs'
      }`}
    >
      {name}
    </span>
  );
};
