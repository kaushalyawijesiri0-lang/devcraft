import { Navigate, Route, Routes } from 'react-router-dom';
import { MentorshipTabs } from './components/MentorshipTabs';
import { Overview } from './pages/Overview';

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      <p className="mt-2 text-muted">
        We’ll build this page next.
      </p>
    </div>
  );
}

export function MentorshipRoutes() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <MentorshipTabs />

      <Routes>
        <Route index element={<Overview />} />

        <Route
          path="ai-mentor"
          element={<ComingSoon title="AI Mentor" />}
        />

        <Route
          path="mentors"
          element={<ComingSoon title="Find Mentors" />}
        />

        <Route
          path="sessions"
          element={<ComingSoon title="My Sessions" />}
        />

        <Route
          path="wallet"
          element={<ComingSoon title="Coin Wallet" />}
        />

        <Route
          path="rewards"
          element={<ComingSoon title="My Rewards" />}
        />

        <Route
          path="*"
          element={<Navigate to="/mentorship" replace />}
        />
      </Routes>
    </div>
  );
}