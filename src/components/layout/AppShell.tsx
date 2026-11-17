import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { NetworkBackground } from '../effects/NetworkBackground';

const COLLAPSE_KEY = 'devcraft-sidebar-collapsed';

export function AppShell() {
  const [collapsed, setCollapsed] = useState(() => {
    return typeof window !== 'undefined' && window.localStorage.getItem(COLLAPSE_KEY) === '1';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isFullWidthWorkspace = pathname.includes('/workspace') || pathname.includes('/session');
  const isMentorshipRoute = pathname.startsWith('/mentorship') || pathname.startsWith('/mentor-dashboard');

  return (
    <div className="relative min-h-screen w-full bg-canvas text-ink antialiased">
      {/* Blueprint grid + animated drifting node network with cursor repel */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="tech-grid absolute inset-0" />
        <NetworkBackground />
      </div>

      {/* Unified Master Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`relative z-10 flex min-h-screen flex-col transition-[padding] duration-200 ease-out ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <TopBar onOpenMenu={() => setMobileOpen(true)} />

        <main className={`relative flex-1 ${isFullWidthWorkspace || isMentorshipRoute ? 'w-full' : 'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8'}`}>
          <div key={pathname} className="w-full page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
