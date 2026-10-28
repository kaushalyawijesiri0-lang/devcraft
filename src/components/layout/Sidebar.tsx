import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CodeXmlIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  XIcon,
} from 'lucide-react';
import { primaryNav, secondaryNav, NavItem } from '../../data/navigation';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const { pathname } = useLocation();

  const renderNavList = (items: NavItem[], isSecondary = false) => {
    return (
      <ul className={`space-y-1 ${isSecondary ? 'mt-auto border-t border-white/10 pt-4' : ''}`}>
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);

          return (
            <li key={item.id}>
              <Link
                to={item.to}
                onClick={onCloseMobile}
                title={collapsed ? item.label : undefined}
                aria-label={collapsed ? item.label : undefined}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex h-11 w-full items-center gap-3 rounded-xl text-sm font-medium transition-[background-color,color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  collapsed ? 'justify-center px-0' : 'px-3.5'
                } ${
                  active
                    ? 'text-white'
                    : 'text-white/65 hover:bg-white/5 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="unified-sidebar-active"
                    className="absolute inset-0 rounded-xl bg-brand shadow-[0_10px_24px_-10px_rgba(31,94,255,0.85)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                )}
                <Icon
                  className="relative h-5 w-5 shrink-0 transition-transform duration-150 group-hover:scale-110"
                  aria-hidden="true"
                />
                {!collapsed && (
                  <span className="relative truncate">{item.label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCloseMobile}
            className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-navy-900 border-r border-white/10 text-white transition-[width,transform] duration-200 ease-out ${
          collapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Platform navigation"
      >
        {/* Header */}
        <div
          className={`flex h-16 shrink-0 items-center justify-between border-b border-white/10 ${
            collapsed ? 'lg:justify-center px-4' : 'px-5'
          }`}
        >
          {(!collapsed || mobileOpen) && (
            <Link
              to="/"
              className="flex items-center gap-2.5 font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
                <CodeXmlIcon className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <span className="text-lg">DevCraft</span>
            </Link>
          )}

          {collapsed && !mobileOpen && (
            <Link
              to="/"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white hover:opacity-90"
              title="DevCraft Home"
            >
              <CodeXmlIcon className="h-5 w-5" strokeWidth={2.4} />
            </Link>
          )}

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <XIcon className="h-5 w-5" />
          </button>

          {/* Desktop collapse button */}
          {!mobileOpen && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className={`hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors ${
                collapsed ? 'mt-2' : ''
              }`}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <PanelLeftOpenIcon className="h-4 w-4" />
              ) : (
                <PanelLeftCloseIcon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation items */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
          {renderNavList(primaryNav)}
          {renderNavList(secondaryNav, true)}
        </nav>
      </aside>
    </>
  );
}
