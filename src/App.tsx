import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';

// Master Shared Layout
import { AppShell } from './components/layout/AppShell';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Placeholder view for modules being developed by team members
import { ComingSoon } from './pages/ComingSoon';
import { DashboardOverview } from './pages/DashboardOverview';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{ style: { fontFamily: 'Inter, sans-serif' } }}
        />
        <Routes>
          {/* Main App Layout Shell */}
          <Route element={<AppShell />}>
            {/* Dashboard / Launchpad */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/launchpad" element={<Navigate to="/dashboard" replace />} />

            {/* Feature Modules - Handled by ComingSoon until each member connects their module */}
            <Route path="/theory-dojo/*" element={<ComingSoon />} />
            <Route path="/guided/*" element={<ComingSoon />} />
            <Route path="/guided-workspace" element={<ComingSoon />} />
            <Route path="/arena/*" element={<ComingSoon />} />
            <Route path="/debug-arena" element={<ComingSoon />} />
            <Route path="/blogs/*" element={<ComingSoon />} />
            <Route path="/community/*" element={<ComingSoon />} />
            <Route path="/mentorship/*" element={<ComingSoon />} />
            <Route path="/leaderboard/*" element={<ComingSoon />} />

            {/* Utility Pages */}
            <Route path="/settings" element={<ComingSoon />} />
            <Route path="/help" element={<ComingSoon />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
export default App;
