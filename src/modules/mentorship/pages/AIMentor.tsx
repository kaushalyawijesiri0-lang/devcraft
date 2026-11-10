import { useState } from 'react';
import type { FormEvent } from 'react';
import { BotIcon, SendIcon } from 'lucide-react';

export function AIMentor() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setMessages((previous) => [...previous, trimmedMessage]);
    setMessage('');
  }

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold text-ink">
          AI Mentor
        </h1>

        <p className="mt-2 text-muted">
          Ask questions about concepts, debugging, and your code.
        </p>
      </div>

      {/* Chat panel */}
      <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="flex items-center gap-3 border-b border-line p-5">
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
              Chat preview — AI replies are not connected yet.
            </p>
          </div>
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
                Type a question below to try the chat interface.
              </p>
            </div>
          ) : (
            messages.map((text, index) => (
              <div key={index} className="flex justify-end">
                <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl bg-primary px-4 py-3 text-sm text-white">
                  <p className="mb-1 font-semibold">You</p>
                  <p>{text}</p>
                </div>
              </div>
            ))
          )}
        </div>

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
              className="min-w-0 flex-1 rounded-xl border border-line px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            <button
              type="submit"
              disabled={!message.trim()}
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