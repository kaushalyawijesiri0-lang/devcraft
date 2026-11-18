import { useState } from 'react';
import { CoinsIcon, GiftIcon, ShoppingCartIcon } from 'lucide-react';

type CoinPackage = {
  id: string;
  coins: number;
  price: number;
  note?: string;
};

const walletSummary = {
  available: 65,
  dailyFree: 15,
  purchased: 50,
  usedToday: 5,
  usedThisWeek: 20,
};

const coinPackages: CoinPackage[] = [
  {
    id: 'pack-1',
    coins: 25,
    price: 500,
    note: 'Starter pack',
  },
  {
    id: 'pack-2',
    coins: 60,
    price: 1000,
    note: 'Most popular',
  },
  {
    id: 'pack-3',
    coins: 150,
    price: 2200,
    note: 'Best value',
  },
];

function formatLKR(amount: number) {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

export function CoinWallet() {
  const [selectedId, setSelectedId] = useState(coinPackages[1].id);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const selectedPackage =
    coinPackages.find((item) => item.id === selectedId) ?? coinPackages[0];

  function handleSelectPackage(id: string) {
    setSelectedId(id);
    setShowCheckoutMessage(false);
  }

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

      {/* Buy coins & Order summary */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-line bg-white p-6 shadow-card lg:col-span-2">
          <h2 className="text-xl font-semibold text-ink">
            Buy coins
          </h2>

          <p className="mt-1 text-sm text-muted">
            Choose a coin package. Payments are processed via PayHere.
          </p>

          <div
            role="radiogroup"
            aria-label="Coin packages"
            className="mt-5 grid gap-4 sm:grid-cols-3"
          >
            {coinPackages.map((pack) => {
              const isSelected = pack.id === selectedId;

              return (
                <button
                  key={pack.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectPackage(pack.id)}
                  className={`flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isSelected
                      ? 'border-primary bg-primary-soft'
                      : 'border-line bg-white hover:border-primary/40'
                  }`}
                >
                  <span className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                    <CoinsIcon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <span className="mt-4 text-base font-semibold text-ink">
                    {pack.coins} coins
                  </span>

                  <span className="mt-1 text-2xl font-bold text-ink">
                    {formatLKR(pack.price)}
                  </span>

                  {pack.note && (
                    <span className="mt-2 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-primary">
                      {pack.note}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-ink">
            Order summary
          </h2>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Selected package</dt>
              <dd className="font-medium text-ink">
                {selectedPackage.coins} coins
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted">Price</dt>
              <dd className="text-ink">
                {formatLKR(selectedPackage.price)}
              </dd>
            </div>

            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="text-2xl font-bold text-ink">
                {formatLKR(selectedPackage.price)}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => setShowCheckoutMessage(true)}
            className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Continue to PayHere
          </button>

          {showCheckoutMessage ? (
            <p
              role="status"
              className="mt-3 rounded-xl bg-green-50 p-3 text-xs text-green-700"
            >
              Demo preview: {selectedPackage.coins} coins ({formatLKR(selectedPackage.price)}) selected. PayHere payment gateway will be connected via the backend service.
            </p>
          ) : (
            <p className="mt-3 text-center text-xs text-muted">
              You will be redirected to PayHere to complete your payment.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}