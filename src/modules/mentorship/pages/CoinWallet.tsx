import { useEffect, useState } from 'react';
import {
  CoinsIcon,
  GiftIcon,
  MessageCircleIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import {
  getWallet,
  initiatePayment,
  submitPayHereForm,
  topUpWallet,
  type CoinActivity,
  type CoinPackage,
  type WalletSummary,
} from '../services/mentorshipApi';

function formatLKR(amount: number) {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

export function CoinWallet() {
  const [wallet, setWallet] = useState<WalletSummary | null>(null);
  const [packages, setPackages] = useState<CoinPackage[]>([]);
  const [activity, setActivity] = useState<CoinActivity[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    getWallet()
      .then((data) => {
        if (!active) return;
        setWallet(data.wallet);
        setPackages(data.packages);
        setActivity(data.activity);
        if (data.packages.length > 1) {
          setSelectedId(data.packages[1].id);
        } else if (data.packages.length > 0) {
          setSelectedId(data.packages[0].id);
        }
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

  const selectedPackage =
    packages.find((item) => item.id === selectedId) ?? packages[0];

  function handleSelectPackage(id: string) {
    setSelectedId(id);
    setCheckoutMessage('');
  }

  async function handleTopUp() {
    if (!selectedPackage || paying) return;
    setPaying(true);
    setError('');

    try {
      const payment = await initiatePayment({
        type: 'coin_topup',
        packageId: selectedPackage.id,
        amount: selectedPackage.price,
        itemTitle: `${selectedPackage.coins} DevCraft AI Coins`,
      });

      if (payment.mode === 'payhere') {
        submitPayHereForm(payment.checkoutUrl, payment.payload);
        return;
      }

      const data = await topUpWallet(selectedPackage.id);
      setWallet(data.wallet);
      setActivity(data.activity);
      setCheckoutMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Top-up failed.');
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6 text-sm text-muted">
        Loading your coin wallet...
      </div>
    );
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
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Balance summary cards */}
      {wallet && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <section className="rounded-2xl border border-ink bg-ink p-5 text-white">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-white/10 p-3 text-coin">
                <CoinsIcon className="h-6 w-6" aria-hidden="true" />
              </span>

              <div>
                <p className="text-sm text-white/70">Available coins</p>
                <p className="text-3xl font-bold">{wallet.available}</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-white/70">
              {wallet.dailyFree} daily free + {wallet.purchased} purchased
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
                  {wallet.dailyFree}
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
                  {wallet.purchased}
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
                  {wallet.usedToday} coins
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted">This week</dt>
                <dd className="font-semibold text-ink">
                  {wallet.usedThisWeek} coins
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}

      {/* Buy coins & Order summary */}
      {selectedPackage && (
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
              {packages.map((pack) => {
                const isSelected = pack.id === selectedPackage.id;

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
              onClick={handleTopUp}
              disabled={paying}
              className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {paying ? 'Processing...' : 'Continue to PayHere'}
            </button>

            {checkoutMessage ? (
              <p
                role="status"
                className="mt-3 rounded-xl bg-green-50 p-3 text-xs text-green-700"
              >
                {checkoutMessage}
              </p>
            ) : (
              <p className="mt-3 text-center text-xs text-muted">
                Simulates PayHere checkout and adds coins immediately.
              </p>
            )}
          </section>
        </div>
      )}

      {/* Recent coin activity */}
      <section className="rounded-2xl border border-line bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">
          Recent coin activity
        </h2>

        <p className="mt-1 text-sm text-muted">
          Track your daily free allocations, AI Mentor queries, and coin purchases.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th scope="col" className="py-3 pr-4 font-semibold">Date</th>
                <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                <th scope="col" className="px-4 py-3 font-semibold">Coins</th>
                <th scope="col" className="py-3 pl-4 font-semibold">Description</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {activity.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 pr-4 font-mono text-xs text-muted">
                    {item.date}
                  </td>

                  <td className="px-4 py-3 font-medium text-ink">
                    <span className="inline-flex items-center gap-2">
                      {item.type === 'allocation' && (
                        <GiftIcon className="h-4 w-4 text-green-600" aria-hidden="true" />
                      )}
                      {item.type === 'ai' && (
                        <MessageCircleIcon className="h-4 w-4 text-primary" aria-hidden="true" />
                      )}
                      {item.type === 'purchase' && (
                        <ShoppingCartIcon className="h-4 w-4 text-amber-500" aria-hidden="true" />
                      )}
                      {item.label}
                    </span>
                  </td>

                  <td
                    className={`px-4 py-3 font-mono font-semibold ${
                      item.coins > 0 ? 'text-green-700' : 'text-red-600'
                    }`}
                  >
                    {item.coins > 0 ? `+${item.coins}` : item.coins}
                  </td>

                  <td className="py-3 pl-4 text-muted">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
