import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  ChevronDownIcon,
  FlameIcon,
  MenuIcon,
  SearchIcon,
  SparklesIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { getStoredUser } from '../../utils/auth';

interface TopBarProps {
  onOpenMenu: () => void;
}

const pageTitles: Record<string, string> = {
  dashboard: 'Launchpad',
  launchpad: 'Launchpad',
  guided: 'Guided Workspace',
  'guided-workspace': 'Guided Workspace',
  workspace: 'Guided Workspace',
  'theory-dojo': 'Theory Dojo',
  arena: 'Debug Arena',
  'debug-arena': 'Debug Arena',
  blogs: 'Community Blogs',
  community: 'Developer Community',
  mentorship: 'Mentorship',
  'mentor-dashboard': 'Mentor Dashboard',
  leaderboard: 'Leaderboard',
  profile: 'My Profile',
  settings: 'Settings',
  help: 'Help & Docs',
};

export function TopBar({ onOpenMenu }: TopBarProps) {
  const { pathname } = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [storedUser, setStoredUser] = useState(getStoredUser);

  useEffect(() => {
    const sync = () => setStoredUser(getStoredUser());
    window.addEventListener('devcraft_user_changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('devcraft_user_changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [profileDropdownOpen]);

  // Ctrl+K keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Learner profile data
  const userData = {
    totalXp: 1250,
    firstName: storedUser.firstName || 'Kaushalya',
    fullName: storedUser.fullName || 'Kaushalya Wijesiri',
    initials: storedUser.initials || 'KW',
    email: storedUser.email || 'kaushalya@devcraft.io',
  };

  // Determine current page title
  const currentKey = pathname.replace(/^\//, '').split('/')[0] || 'dashboard';
  const pageTitle = pageTitles[currentKey] || currentKey.replace(/-/g, ' ');

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-white/10 bg-navy-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 text-white transition-all">
      <div className="flex h-full w-full items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Clean Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors lg:hidden shrink-0"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white capitalize truncate">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right Area: Clean, minimal & functional */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Quick search input */}
          <div className="relative hidden md:block w-52 lg:w-60">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search DevCraft..."
              className="h-8.5 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-14 text-xs text-white placeholder:text-slate-400 focus:border-brand-400 focus:bg-navy-900 focus:outline-none focus:ring-1 focus:ring-brand-400/30 transition-all"
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              Ctrl K
            </kbd>
          </div>

          {/* Streak pill */}
          <div
            title="5-day learning streak!"
            className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300"
          >
            <FlameIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span>5 days</span>
          </div>

          {/* XP pill */}
          <Link
            to="/leaderboard"
            title="View your XP and Rank"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand-300 hover:bg-brand/20 transition-colors"
          >
            <SparklesIcon className="h-3.5 w-3.5 text-brand-400" />
            <span>{userData.totalXp.toLocaleString()} XP</span>
          </Link>

          {/* Notifications button */}
          <button
            type="button"
            onClick={() => toast.info('You have 2 new milestone achievements in Theory Dojo and Debug Arena!')}
            className="relative flex h-8.5 w-8.5 items-center justify-center rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors border border-white/5"
            aria-label="Notifications"
          >
            <BellIcon className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand ring-2 ring-navy-950" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl p-1 text-xs font-medium text-white hover:bg-white/10 transition-colors"
              aria-label="Account menu"
              aria-expanded={profileDropdownOpen}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white font-bold text-xs ring-2 ring-white/10 shadow-md">
                {userData.initials}
              </span>
              <span className="hidden sm:inline font-semibold text-xs text-slate-200">
                {userData.firstName}
              </span>
              <ChevronDownIcon className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
            </button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 rounded-2xl border border-white/10 bg-navy-900 p-1.5 shadow-2xl ring-1 ring-black/5 z-50 text-white"
                >
                  <div className="border-b border-white/10 px-3 py-2.5">
                    <p className="text-xs font-semibold text-white">{userData.fullName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{userData.email}</p>
                  </div>
                  <div className="pt-1 space-y-0.5">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                      <span>Your Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <SettingsIcon className="h-3.5 w-3.5 text-slate-400" />
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOutIcon className="h-3.5 w-3.5 text-rose-400" />
                      <span>Sign Out</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;