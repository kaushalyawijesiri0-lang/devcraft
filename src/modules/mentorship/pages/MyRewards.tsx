import { Link } from 'react-router-dom';
import { CircleCheckIcon, StarIcon, TrophyIcon } from 'lucide-react';

const rewardStats = {
  xp: 2450,
  rank: 12,
};

export function MyRewards() {
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

        <p className="mt-3 text-sm text-primary">
          Demo rewards — XP, rank, and discount vouchers are sample data.
        </p>
      </div>

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
                {rewardStats.xp.toLocaleString('en-US')}
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
                #{rewardStats.rank}
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
    </div>
  );
}