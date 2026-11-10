import { NavLink } from 'react-router-dom';

const tabs = [
  { label: 'Overview', to: '/mentorship', end: true },
  { label: 'AI Mentor', to: '/mentorship/ai-mentor', end: false },
  { label: 'Find Mentors', to: '/mentorship/mentors', end: false },
  { label: 'My Sessions', to: '/mentorship/sessions', end: false },
  { label: 'Coin Wallet', to: '/mentorship/wallet', end: false },
  { label: 'My Rewards', to: '/mentorship/rewards', end: false },
];

export function MentorshipTabs() {
  return (
    <nav
      aria-label="Mentorship navigation"
      className="mb-6 overflow-x-auto rounded-2xl border border-line bg-white p-2 shadow-card"
    >
      <div className="flex min-w-max gap-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              [
                'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive
                  ? 'bg-primary-soft text-primary'
                  : 'text-muted hover:bg-canvas hover:text-ink',
              ].join(' ')
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}