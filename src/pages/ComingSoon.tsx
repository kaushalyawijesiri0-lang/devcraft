import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRightIcon, TerminalIcon, SparklesIcon, CompassIcon } from 'lucide-react';

const descriptions: Record<string, string> = {
  settings: 'Manage your profile details, notification preferences, and coding workspace themes.',
  help: 'Guides, frequently asked questions, shortcut keys, and ways to contact mentor support.',
  mentorship: 'Book 1-on-1 sessions with verified industry mentors and request project code reviews.',
};

const terminalLines = [
  '$ devcraft status',
  '✔ checking active modules... 6/6 loaded',
  '✔ guided workspace: online',
  '✔ theory dojo: online',
  '✔ debug arena: online',
  '✔ developer community: online',
  '➜ this sub-view is in final polishing',
];

export function ComingSoon() {
  const { pathname } = useLocation();
  const section = pathname.replace(/^\//, '').split('/')[0] || 'space';
  const [shown, setShown] = useState(0);

  useEffect(() => {
    setShown(0);
    const id = window.setInterval(
      () => setShown((n) => (n >= terminalLines.length ? n : n + 1)),
      300
    );
    return () => window.clearInterval(id);
  }, [pathname]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint border border-blue-200 px-3 py-1 text-xs font-semibold text-brand">
            <SparklesIcon className="h-3.5 w-3.5" />
            Under active development
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl capitalize">
            {section} space
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
            {descriptions[section] ??
              'This feature is being connected into the unified DevCraft suite.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover transition-colors"
            >
              Back to Launchpad
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to="/guided"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink hover:bg-canvas transition-colors"
            >
              <CompassIcon className="h-4 w-4 text-muted" />
              Explore Guided Projects
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950 p-5 shadow-2xl text-white font-mono text-xs">
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-3 mb-4">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-white/40 flex items-center gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5" />
              devcraft-cli: ~/{section}
            </span>
          </div>

          <div className="space-y-2 min-h-[160px]">
            {terminalLines.slice(0, shown).map((line, idx) => (
              <p
                key={line}
                className={
                  idx === 0
                    ? 'text-brand-300 font-bold'
                    : idx === terminalLines.length - 1
                    ? 'text-emerald-400'
                    : 'text-white/70'
                }
              >
                {line}
              </p>
            ))}
            <span className="inline-block h-3.5 w-2 bg-brand animate-pulse align-middle" />
          </div>
        </div>
      </div>
    </div>
  );
}
