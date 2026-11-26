import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CircleCheckIcon,
  GiftIcon,
  HourglassIcon,
  InfoIcon,
  StarIcon,
  TrophyIcon,
} from 'lucide-react';
import {
  getRewards,
  type Reward,
  type UsedReward,
} from '../services/mentorshipApi';

type RewardFilter = 'available' | 'used' | 'expired';

function formatLKR(amount: number) {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

export function MyRewards() {
  const [filter, setFilter] = useState<RewardFilter>('available');
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState(0);
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const [usedRewards, setUsedRewards] = useState<UsedReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    getRewards()
      .then((data) => {
        if (!active) return;
        setXp(data.xp);
        setRank(data.rank);
        setAvailableRewards(data.availableRewards);
        setUsedRewards(data.usedRewards);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6 text-sm text-muted">
        Loading rewards...
      </div>
    );
  }

  const activeReward = availableRewards[0];
  const discountAmount = activeReward
    ? (activeReward.originalPrice * activeReward.discountPct) / 100
    : 0;
  const finalPrice = activeReward
    ? activeReward.originalPrice - discountAmount
    : 0;

  const filterTabs: Array<{ value: RewardFilter; label: string }> = [
    { value: 'available', label: `Available (${availableRewards.length})` },
    { value: 'used', label: `Used (${usedRewards.length})` },
    { value: 'expired', label: 'Expired (0)' },
  ];

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold text-ink">
          My Rewards
        </h1>

        <p className="mt-2 text-muted">
          Turn your learning progress and leaderboard rank into mentor session discounts.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* XP & Leaderboard rank summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-primary-soft p-3 text-primary">
              <StarIcon className="h-6 w-6" aria-hidden="true" />
            </span>

            <div>
              <p className="text-sm text-muted">Total XP</p>
              <p className="font-mono text-2xl font-bold text-ink">
                {xp.toLocaleString('en-US')}
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted">
            Earned from projects, quizzes, and debugging challenges
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <TrophyIcon className="h-6 w-6" aria-hidden="true" />
            </span>

            <div>
              <p className="text-sm text-muted">Leaderboard rank</p>
              <p className="font-mono text-2xl font-bold text-ink">
                #{rank}
              </p>
            </div>
          </div>

          <Link
            to="/leaderboard"
            className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
          >
            View global leaderboard →
          </Link>
        </section>

        <section className="rounded-2xl border border-green-200 bg-green-50 p-5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-green-600 p-2 text-white">
              <CircleCheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>

            <div>
              <h2 className="font-semibold text-ink">
                Eligible for mentor discount
              </h2>
              <p className="mt-1 text-sm text-muted">
                Top leaderboard performers unlock automatic discounts on 1:1 mentor bookings.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Filter tabs */}
      <div
        role="group"
        aria-label="Filter rewards by status"
        className="flex flex-wrap gap-2"
      >
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            aria-pressed={filter === tab.value}
            onClick={() => setFilter(tab.value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              filter === tab.value
                ? 'bg-primary text-white'
                : 'border border-line bg-white text-muted hover:bg-primary-soft'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Available rewards */}
      {filter === 'available' && activeReward && (
        <section className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-card lg:grid-cols-3">
          <div className="flex items-start gap-4 lg:col-span-2">
            <span className="rounded-xl bg-primary-soft p-3 text-primary">
              <GiftIcon className="h-6 w-6" aria-hidden="true" />
            </span>

            <div>
              <h2 className="text-xl font-semibold text-ink">
                {activeReward.title}
              </h2>

              <p className="mt-1 text-sm text-muted">
                {activeReward.meta.join(' · ')}
              </p>

              <p className="mt-4 text-sm text-muted">
                {activeReward.description}
              </p>

              <Link
                to="/mentorship/mentors"
                className="mt-6 inline-block rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Find a Mentor →
              </Link>
            </div>
          </div>

          <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-sm font-medium text-ink">
              Example price breakdown
            </p>

            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Original session price</dt>
                <dd className="text-ink">
                  {formatLKR(activeReward.originalPrice)}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted">
                  Discount ({activeReward.discountPct}%)
                </dt>
                <dd className="font-medium text-green-700">
                  − {formatLKR(discountAmount)}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-baseline justify-between rounded-xl bg-primary-soft px-4 py-3">
              <span className="font-semibold text-primary">Final price</span>
              <span className="text-xl font-bold text-ink">
                {formatLKR(finalPrice)}
              </span>
            </div>

            <p className="mt-3 flex items-start gap-2 text-xs text-muted">
              <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              This reward applies to eligible 1:1 mentor sessions, not AI coin packages.
            </p>
          </div>
        </section>
      )}

      {/* Used rewards */}
      {filter === 'used' && (
        <div className="space-y-4">
          {usedRewards.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-line bg-white p-6 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="rounded-xl bg-canvas p-3 text-muted">
                    <GiftIcon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div>
                    <h2 className="font-semibold text-ink">{item.title}</h2>
                    <p className="mt-1 text-sm text-muted">
                      Used on {item.usedOn} · Session with {item.mentor}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  Used
                </span>
              </div>

              <dl className="mt-4 grid gap-4 border-t border-line pt-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-muted">Session topic</dt>
                  <dd className="mt-1 font-medium text-ink">{item.topic}</dd>
                </div>

                <div>
                  <dt className="text-muted">Mentor</dt>
                  <dd className="mt-1 font-medium text-ink">{item.mentor}</dd>
                </div>

                <div>
                  <dt className="text-muted">You saved</dt>
                  <dd className="mt-1 font-semibold text-green-700">
                    {formatLKR(item.saved)}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}

      {/* Expired rewards */}
      {filter === 'expired' && (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white p-12 text-center">
          <HourglassIcon className="h-8 w-8 text-muted" aria-hidden="true" />
          <h2 className="mt-3 font-semibold text-ink">No expired rewards</h2>
          <p className="mt-1 text-sm text-muted">
            Use your earned discounts before their expiry date to keep it that way.
          </p>
        </div>
      )}
    </div>
  );
}
