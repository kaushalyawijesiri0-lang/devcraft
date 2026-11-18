import { CoinsIcon, GiftIcon, ShoppingCartIcon } from 'lucide-react';

const walletSummary = {
  available: 65,
  dailyFree: 15,
  purchased: 50,
  usedToday: 5,
  usedThisWeek: 20,
};

export function CoinWallet() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold text-ink">
          Coin Wallet
        </h1>

        <p className="mt-2 text-muted">
          Use coins for AI Mentor responses and top up when your daily free coins run low.
        </p>

        <p className="mt-3 text-sm text-primary">
          Demo wallet — balances and PayHere checkout are sample data.
        </p>
      </div>

      {/* Balance summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <section className="rounded-2xl border border-ink bg-ink p-5 text-white">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-white/10 p-3 text-coin">
              <CoinsIcon className="h-6 w-6" aria-hidden="true" />
            </span>

            <div>
              <p className="text-sm text-white/70">Available coins</p>
              <p className="text-3xl font-bold">{walletSummary.available}</p>
            </div>
          </div>

          <p className="mt-3 text-xs text-white/70">
            {walletSummary.dailyFree} daily free + {walletSummary.purchased} purchased
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-green-50 p-3 text-green-700">
              <GiftIcon className="h-6 w-6" aria-hidden="true" />
            </span>

            <div>
              <p className="text-sm text-muted">Daily free coins</p>
              <p className="text-2xl font-bold text-ink">
                {walletSummary.dailyFree}
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted">
            Resets every day at midnight
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-primary-soft p-3 text-primary">
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </span>

            <div>
              <p className="text-sm text-muted">Purchased coins</p>
              <p className="text-2xl font-bold text-ink">
                {walletSummary.purchased}
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted">
            Never expire once bought
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <p className="text-sm font-medium text-ink">Recent usage</p>

          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Today</dt>
              <dd className="font-semibold text-ink">
                {walletSummary.usedToday} coins
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted">This week</dt>
              <dd className="font-semibold text-ink">
                {walletSummary.usedThisWeek} coins
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}