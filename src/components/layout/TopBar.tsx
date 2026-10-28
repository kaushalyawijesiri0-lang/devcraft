import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  ChevronDownIcon,
  MenuIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from 'lucide-react';
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
  blogs: 'Blogs',
  community: 'Community',
  mentorship: 'Mentorship',
  'mentor-dashboard': 'Mentor Dashboard',
  leaderboard: 'Leaderboard',
  profile: 'My Profile',
  settings: 'Settings',
  help: 'Help & Docs',
};

export function TopBar({ onOpenMenu }: TopBarProps) {
  const { pathname } = useLocation();
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

  const userData = {
    firstName: storedUser.firstName || 'Kaushalya',
    fullName: storedUser.fullName || 'Kaushalya Wijesiri',
    initials: storedUser.initials || 'KW',
    email: storedUser.email || 'kaushalya@devcraft.io',
  };

  const currentKey = pathname.replace(/^\//, '').split('/')[0] || 'dashboard';
  const pageTitle = pageTitles[currentKey] || currentKey.replace(/-/g, ' ');

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 text-slate-900 transition-colors">
      <div className="flex h-full w-full items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Section Name only */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors lg:hidden shrink-0"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 capitalize truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Right: Notifications & Profile Section */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notification Bell */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand ring-2 ring-white" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative shrink-0" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-xl p-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Account menu"
            aria-expanded={profileDropdownOpen}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white font-bold text-xs shadow-sm">
              {userData.initials}
            </span>
            <span className="hidden sm:inline font-semibold text-xs text-slate-800">
              {userData.fullName}
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
                className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 z-50 text-slate-800"
              >
                <div className="border-b border-slate-100 px-3 py-2.5">
                  <p className="text-xs font-semibold text-slate-900">{userData.fullName}</p>
                  <p className="text-[11px] text-slate-500 truncate">{userData.email}</p>
                </div>
                <div className="pt-1 space-y-0.5">
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                    <span>Your Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    <SettingsIcon className="h-3.5 w-3.5 text-slate-400" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOutIcon className="h-3.5 w-3.5 text-rose-500" />
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
