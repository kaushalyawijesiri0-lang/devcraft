import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BotIcon, CoinsIcon, SendIcon } from 'lucide-react';
import { getWallet, sendAiQuery } from '../services/mentorshipApi';

type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  text: string;
};

export function AIMentor() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [availableCoins, setAvailableCoins] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getWallet()
      .then((data) => setAvailableCoins(data.wallet.available))
      .catch(() => setAvailableCoins(null));
  }, []);

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || sending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMsg]);
    setMessage('');
    setSending(true);
    setError('');

    try {
      const data = await sendAiQuery(trimmedMessage);
      setAvailableCoins(data.wallet.available);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: data.reply,
      };
      setMessages((previous) => [...previous, aiMsg]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reach AI Mentor.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">
            AI Mentor
          </h1>

          <p className="mt-2 text-muted">
            Ask questions about concepts, debugging, and your code (5 coins per query).
          </p>
        </div>

        <Link
          to="/mentorship/mentors"
          className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:bg-primary-soft hover:text-primary"
        >
          Book Human Mentor →
        </Link>
      </div>

      {/* Chat panel */}
      <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-primary-soft p-3">
              <BotIcon
                className="h-6 w-6 text-primary"
                aria-hidden="true"
              />
            </span>

            <div>
              <h2 className="font-semibold text-ink">
                DevCraft AI Mentor
              </h2>

              <p className="text-sm text-muted">
                Connected to backend AI coin service
              </p>
            </div>
          </div>

          <Link
            to="/mentorship/wallet"
            className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-1.5 text-sm font-semibold text-amber-700 hover:bg-amber-100"
          >
            <CoinsIcon className="h-4 w-4" aria-hidden="true" />
            {availableCoins !== null ? `${availableCoins} coins` : 'Coin Wallet'}
          </Link>
        </div>

        {/* Messages */}
        <div
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
          className="h-80 space-y-4 overflow-y-auto p-5"
        >
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <BotIcon
                className="mb-3 h-10 w-10 text-primary"
                aria-hidden="true"
              />

              <h3 className="font-semibold text-ink">
                What are you working on?
              </h3>

              <p className="mt-2 max-w-sm text-sm text-muted">
                Ask a debugging question below. Each reply costs 5 coins.
              </p>
            </div>
          ) : (
            messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm ${
                    item.role === 'user'
                      ? 'bg-primary text-white'
                      : 'border border-line bg-canvas text-ink'
                  }`}
                >
                  <p className="mb-1 font-semibold">
                    {item.role === 'user' ? 'You' : 'AI Mentor'}
                  </p>
                  <p>{item.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="border-t border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700"
          >
            {error}{' '}
            <Link to="/mentorship/wallet" className="font-semibold underline">
              Top up coins
            </Link>
          </div>
        )}

        {/* Message input */}
        <form
          onSubmit={handleSend}
          className="border-t border-line p-4"
        >
          <label htmlFor="mentor-message" className="sr-only">
            Your message
          </label>

          <div className="flex gap-3">
            <input
              id="mentor-message"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about your code..."
              maxLength={4000}
              disabled={sending}
              className="min-w-0 flex-1 rounded-xl border border-line px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!message.trim() || sending}
              aria-label="Send message"
              className="rounded-xl bg-primary px-4 py-3 text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
