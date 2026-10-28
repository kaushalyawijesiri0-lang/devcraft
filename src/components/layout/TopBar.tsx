import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { guidedTabs, blogTabs, communityTabs } from '../../data/navigation';
import { getStoredUser } from '../../utils/auth';

interface TopBarProps {
  onOpenMenu: () => void;
}

export function TopBar({ onOpenMenu }: TopBarProps) {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
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

  // Learner profile data
  const arenaData = {
    totalXp: 1250,
    firstName: storedUser.firstName || 'Kaushalya',
    fullName: storedUser.fullName || 'Kaushalya Wijesiri',
    initials: storedUser.initials || 'KW',
    email: storedUser.email || 'kaushalya@devcraft.io',
  };

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

  // Contextual Sub-tabs determination
  const isMentorView = pathname === '/mentorship/mentor' || pathname.startsWith('/mentor-dashboard');
  const isMentorship = pathname.startsWith('/mentorship') || isMentorView;
  const isGuided = pathname.startsWith('/guided');
  const isBlogs = pathname.startsWith('/blogs') || pathname.startsWith('/app/blogs');
  const isCommunity = pathname.startsWith('/community') || pathname.startsWith('/app/community');

  const mentorshipSubpath = isMentorView
    ? ''
    : pathname === '/mentorship'
    ? ''
    : pathname.replace('/mentorship', '');

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-line bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      <div className="flex h-full w-full items-center justify-between gap-3">
        {/* Left: Mobile hamburger & contextual tabs */}
        <div className="flex h-full items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-canvas transition-colors lg:hidden shrink-0"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          {/* Contextual navigation tabs */}
          {isMentorship && (
            <div className="flex flex-col gap-0.5 justify-center py-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
                {isMentorView ? 'Mentor Dashboard' : 'Mentorship'}
              </h1>
              <p className="text-xs font-mono text-slate-500">
                {isMentorView ? '~/mentor-dashboard' : `~/mentorship${mentorshipSubpath}`}
              </p>
            </div>
          )}

          {isGuided && (
            <nav aria-label="Guided projects sections" className="scrollbar-thin hidden sm:flex h-full items-stretch gap-1 overflow-x-auto">
              {guidedTabs.map((tab) => {
                const Icon = tab.icon;
                const active =
                  tab.id === 'saved'
                    ? pathname.startsWith('/guided') && search.includes('view=saved')
                    : tab.id === 'explore'
                    ? (pathname === '/guided' || pathname === '/projects') && !search.includes('view=saved')
                    : tab.id === 'mine'
                    ? pathname.includes('/guided/') && pathname.includes('/workspace')
                    : tab.id === 'interactive'
                    ? pathname === '/workspace' || pathname === '/guided-workspace'
                    : false;

                return (
                  <Link
                    key={tab.id}
                    to={tab.to}
                    className={`relative flex items-center gap-1.5 px-3 text-sm font-medium transition-colors ${
                      active ? 'text-brand' : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {active && (
                      <motion.span
                        layoutId="topbar-context-tab"
                        className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {isBlogs && (
            <nav aria-label="Blog sections" className="scrollbar-thin hidden sm:flex h-full items-stretch gap-1 overflow-x-auto">
              {blogTabs.map((tab) => {
                const Icon = tab.icon;
                const active = pathname === tab.to || (tab.id === 'explore' && pathname === '/blogs');
                return (
                  <Link
                    key={tab.id}
                    to={tab.to}
                    className={`relative flex items-center gap-1.5 px-3 text-sm font-medium transition-colors ${
                      active ? 'text-brand' : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {active && (
                      <motion.span
                        layoutId="topbar-context-tab"
                        className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {isCommunity && (
            <nav aria-label="Community sections" className="scrollbar-thin hidden sm:flex h-full items-stretch gap-1 overflow-x-auto">
              {communityTabs.map((tab) => {
                const Icon = tab.icon;
                const active = pathname === tab.to;
                return (
                  <Link
                    key={tab.id}
                    to={tab.to}
                    className={`relative flex items-center gap-1.5 px-3 text-sm font-medium transition-colors ${
                      active ? 'text-brand' : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {active && (
                      <motion.span
                        layoutId="topbar-context-tab"
                        className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {!isMentorship && !isGuided && !isBlogs && !isCommunity && (
            <span className="text-base font-semibold text-ink truncate capitalize">
              {pathname.replace('/', '').replace(/-/g, ' ') || 'Dashboard'}
            </span>
          )}
        </div>

        {/* Right Area */}
        {isMentorship ? (
          <div className="flex items-center gap-3 shrink-0">
            {/* Notification button */}
            <button
              type="button"
              onClick={() => toast.info('You have 1 upcoming mentorship session confirmed!')}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <BellIcon className="h-4 w-4 text-slate-700" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* Profile Dropdown with Switch View (Exact match to Screenshot 2) */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl p-1 text-sm font-medium hover:bg-slate-100 transition-colors"
                aria-label="Switch view menu"
                aria-expanded={profileDropdownOpen}
              >
                <img
                  src={
                    isMentorView
                      ? '/00d8f15f-6dc4-457e-b362-f41af8138ccc.jpg'
                      : '/5d69017a-f710-4911-a303-2121e4baae60.jpg'
                  }
                  alt={isMentorView ? 'Nethmi' : 'Kaushalya'}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <span className="font-semibold text-xs text-slate-900">
                  {isMentorView ? 'Nethmi' : 'Kaushalya'}
                </span>
                <ChevronDownIcon className="h-3.5 w-3.5 text-slate-500" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50"
                  >
                    <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      switch view
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/mentorship');
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between ${
                        !isMentorView ? 'bg-slate-50 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">Learner view</div>
                        <div className="text-[11px] text-slate-500">Kaushalya · find help</div>
                      </div>
                      {!isMentorView && (
                        <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/mentor-dashboard');
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between mt-1 ${
                        isMentorView ? 'bg-slate-50 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">Mentor view</div>
                        <div className="text-[11px] text-slate-500">Nethmi · run sessions</div>
                      </div>
                      {isMentorView && (
                        <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick search input */}
            <div className="relative hidden md:block w-56 lg:w-64">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search DevCraft..."
                className="h-9 w-full rounded-lg border border-line bg-canvas pl-9 pr-14 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-line bg-white px-1.5 py-0.5 text-[10px] font-mono text-muted">
                Ctrl K
              </kbd>
            </div>

            {/* Streak indicator */}
            <div
              title="5-day learning streak!"
              className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600"
            >
              <FlameIcon className="h-3.5 w-3.5 fill-orange-500 text-orange-500 animate-pulse" />
              <span>5 days</span>
            </div>

            {/* XP pill */}
            <Link
              to="/leaderboard/me"
              title="View your XP and Rank"
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-blue-200 bg-brand-tint px-2.5 py-1 text-xs font-semibold text-brand hover:bg-blue-100 transition-colors"
            >
              <SparklesIcon className="h-3.5 w-3.5 text-brand" />
              <span>{arenaData.totalXp.toLocaleString()} XP</span>
            </Link>

            {/* Notifications button */}
            <button
              type="button"
              onClick={() => toast.info('You have 2 new milestone achievements in Theory Dojo and Debug Arena!')}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-canvas transition-colors"
              aria-label="Notifications"
            >
              <BellIcon className="h-4 w-4 text-muted" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand ring-2 ring-white" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg p-1 text-sm font-medium text-ink hover:bg-canvas transition-colors"
                aria-label="Account menu"
                aria-expanded={profileDropdownOpen}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 font-bold text-xs text-white ring-2 ring-brand/20">
                  {arenaData.initials || 'IG'}
                </span>
                <span className="hidden sm:inline font-semibold text-xs text-ink">
                  {arenaData.firstName}
                </span>
                <ChevronDownIcon className="h-3.5 w-3.5 text-muted hidden sm:block" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 rounded-xl border border-line bg-white p-1.5 shadow-xl ring-1 ring-black/5 z-50"
                  >
                    <div className="border-b border-line px-3 py-2">
                      <p className="text-xs font-semibold text-ink">{arenaData.fullName}</p>
                      <p className="text-[11px] text-muted truncate">{arenaData.email || 'inusha@devcraft.io'}</p>
                    </div>
                    <div className="pt-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                      >
                        <UserIcon className="h-4 w-4 text-muted" />
                        <span>Your Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                      >
                        <SettingsIcon className="h-4 w-4 text-muted" />
                        <span>Settings</span>
                      </Link>
                      <Link
                        to="/login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOutIcon className="h-4 w-4 text-rose-500" />
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
