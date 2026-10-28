import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCapIcon,
  MapIcon,
  BugIcon,
  NewspaperIcon,
  UserRoundIcon,
  FlameIcon,
  SparklesIcon,
  ArrowRightIcon,
  CodeXmlIcon,
  GitBranchIcon,
  CheckCircle2Icon
} from 'lucide-react';
import { getStoredUser } from '../utils/auth';

export function DashboardOverview() {
  const user = getStoredUser();

  const modules = [
    {
      title: 'Theory Dojo',
      desc: 'Interactive MERN curriculum, syntax-highlighted notes, and instant code puzzles.',
      path: '/theory-dojo',
      icon: GraduationCapIcon,
      status: 'Ready for integration',
      color: 'from-blue-500/20 to-indigo-500/10',
      badge: 'Module 01',
    },
    {
      title: 'Guided Workspace',
      desc: 'Step-by-step fullstack projects with real-time AST code verification and preview.',
      path: '/guided',
      icon: MapIcon,
      status: 'Ready for integration',
      color: 'from-cyan-500/20 to-blue-500/10',
      badge: 'Module 02',
    },
    {
      title: 'Debug Arena',
      desc: 'Interactive Monaco editor bug simulation with test runners, timers, and lives.',
      path: '/arena',
      icon: BugIcon,
      status: 'Ready for integration',
      color: 'from-amber-500/20 to-orange-500/10',
      badge: 'Module 03',
    },
    {
      title: 'Blogs & Community',
      desc: 'Technical write-ups, community discussion channels, and peer code reviews.',
      path: '/blogs',
      icon: NewspaperIcon,
      status: 'Ready for integration',
      color: 'from-emerald-500/20 to-teal-500/10',
      badge: 'Module 04',
    },
    {
      title: 'Mentorship & Launchpad',
      desc: '1-on-1 industry mentor bookings, AI assistance, and learner progress tracking.',
      path: '/mentorship',
      icon: UserRoundIcon,
      status: 'Ready for integration',
      color: 'from-purple-500/20 to-pink-500/10',
      badge: 'Module 05',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-950 p-6 sm:p-8 shadow-2xl"
      >
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 border border-brand/30 px-3 py-1 text-xs font-semibold text-brand-300">
                <SparklesIcon className="h-3.5 w-3.5" />
                DevCraft Architecture Scaffold
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome back, {user.firstName || 'Kaushalya'}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
              The unified frontend foundation is running with shared navigation, dark theme tokens,
              and live constellation effects. Each feature module is ready to be connected by team members.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <FlameIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Streak</p>
                <p className="text-sm font-bold text-white">5 Days</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/20 text-brand-300">
                <CodeXmlIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Total XP</p>
                <p className="text-sm font-bold text-white">1,250 XP</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature Modules Status Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Team Feature Modules</h2>
            <p className="text-xs text-slate-400">Select any module to inspect its route and placeholder view</p>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <GitBranchIcon className="h-3.5 w-3.5 text-brand-400" />
            Isolated Modular Architecture
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
              >
                <Link
                  to={m.path}
                  className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-navy-900/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:bg-navy-800/80"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-brand-400 group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {m.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2Icon className="h-3.5 w-3.5" />
                      {m.status}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 group-hover:text-brand-300 transition-colors">
                      Explore
                      <ArrowRightIcon className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default DashboardOverview;
