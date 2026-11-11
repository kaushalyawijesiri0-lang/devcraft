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
import { guidedTabs } from '../../data/navigation';
import { getStoredUser } from '../../utils/auth';

interface TopBarProps {
  onOpenMenu: () => void;
}

export function TopBar({ onOpenMenu }: TopBarProps) {
  const { pathname, search } = useLocation();
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

  // Keyboard shortcut Ctrl+K
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

  const userData = {
    firstName: storedUser.firstName || 'Inusha',
    fullName: storedUser.fullName || 'Inusha Gunasekara',
    initials: storedUser.initials || 'IG',
    email: storedUser.email || 'inusha@devcraft.io',
  };

  const isGuided = pathname.startsWith('/guided') || pathname === '/workspace' || pathname === '/guided-workspace';

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-line bg-white/90 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      <div className="flex h-full w-full items-center justify-between gap-3">
        {/* Left: Mobile hamburger & Guided Sub-tabs */}
        <div className="flex h-full items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-canvas transition-colors lg:hidden shrink-0"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          {isGuided ? (
            <nav aria-label="Guided projects sections" className="hidden sm:flex h-full items-stretch gap-1 overflow-x-auto">
              {guidedTabs.map((tab) => {
                const Icon = tab.icon;
                const active =
                  tab.id === 'saved'
                    ? pathname.startsWith('/guided') && search.includes('view=saved')
                    : tab.id === 'explore'
                    ? pathname === '/guided' && !search.includes('view=saved')
                    : tab.id === 'mine'
                    ? pathname.includes('/guided/') && pathname.includes('/workspace')
                    : tab.id === 'interactive'
                    ? pathname === '/workspace' || pathname === '/guided-workspace'
                    : false;

                return (
                  <Link
                    key={tab.id}
                    to={tab.to}
                    className={`relative flex items-center gap-2 px-3.5 text-sm font-medium transition-colors ${
                      active ? 'text-brand font-semibold' : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? 'text-brand' : 'text-muted'}`} />
                    <span>{tab.label}</span>
                    {active && (
                      <motion.span
                        layoutId="topbar-guided-tab"
                        className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          ) : (
            <span className="text-base font-semibold text-ink truncate capitalize">
              {pathname.replace('/', '').replace(/-/g, ' ') || 'Dashboard'}
            </span>
          )}
        </div>

        {/* Right Area: Search, Streak, XP, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick search input */}
          <div className="relative hidden md:block w-52 lg:w-60">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search DevCraft..."
              className="h-9 w-full rounded-xl border border-line bg-canvas/60 pl-8 pr-14 text-xs text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
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
          <div
            title="Total Learning XP"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-blue-200 bg-brand-tint px-2.5 py-1 text-xs font-semibold text-brand"
          >
            <SparklesIcon className="h-3.5 w-3.5 text-brand" />
            <span>1,250 XP</span>
          </div>

          {/* Notifications button */}
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-ink hover:bg-canvas transition-colors"
            aria-label="Notifications"
          >
            <BellIcon className="h-4 w-4 text-muted" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand ring-2 ring-white" />
          </button>

          {/* User Profile Badge */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl p-1 text-sm font-medium text-ink hover:bg-canvas transition-colors"
              aria-label="Account menu"
              aria-expanded={profileDropdownOpen}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 font-bold text-xs text-white ring-1 ring-white/20">
                {userData.initials}
              </div>
              <span className="hidden sm:inline font-semibold text-xs text-ink-900">
                {userData.firstName}
              </span>
              <ChevronDownIcon className="h-3.5 w-3.5 text-muted" />
            </button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-line bg-white p-2 shadow-card backdrop-blur z-50"
                >
                  <div className="border-b border-line px-3 py-2 text-xs">
                    <p className="font-semibold text-ink-900">{userData.fullName}</p>
                    <p className="truncate text-muted">{userData.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                    >
                      <UserIcon className="h-3.5 w-3.5 text-muted" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                    >
                      <SettingsIcon className="h-3.5 w-3.5 text-muted" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  <div className="border-t border-line pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOutIcon className="h-3.5 w-3.5" />
                      <span>Sign out</span>
                    </button>
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
