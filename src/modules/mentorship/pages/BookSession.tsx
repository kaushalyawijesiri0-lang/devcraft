import { useState } from 'react';
import type { FormEvent } from 'react';

export function BookSession() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [topic, setTopic] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const today = new Date();
  const minimumDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!date || !time || !topic.trim()) return;

    setShowPreview(true);
  }

  const inputClass =
    'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink">
          Book a Session
        </h1>

        <p className="mt-2 text-muted">
          Choose when you would like to meet and what you need help with.
        </p>

        <p className="mt-3 text-sm text-primary">
          Demo form — no real booking will be created.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        onChange={() => setShowPreview(false)}
        className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-card"
      >
        <div>
          <label
            htmlFor="session-date"
            className="text-sm font-medium text-ink"
          >
            Preferred date
          </label>

          <input
            id="session-date"
            type="date"
            required
            min={minimumDate}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="session-time"
            className="text-sm font-medium text-ink"
          >
            Preferred time
          </label>

          <select
            id="session-time"
            required
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={inputClass}
          >
            <option value="">Select a time</option>
            <option value="09:00">9:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">2:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>

          <p className="mt-2 text-xs text-muted">
            Sri Lanka time (Asia/Colombo). These are sample slots;
            mentor availability is not connected yet.
          </p>
        </div>

        <div>
          <label
            htmlFor="session-topic"
            className="text-sm font-medium text-ink"
          >
            What would you like help with?
          </label>

          <textarea
            id="session-topic"
            required
            rows={4}
            maxLength={500}
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="For example: I need help connecting my React app to an Express API."
            className={inputClass}
          />

          <p className="mt-1 text-right text-xs text-muted">
            {topic.length}/500 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={!date || !time || !topic.trim()}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Preview session
        </button>
      </form>

      {showPreview && (
        <section
          role="status"
          className="rounded-2xl border border-primary/20 bg-primary-soft p-6"
        >
          <h2 className="text-lg font-semibold text-ink">
            Your session preview
          </h2>

          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-ink">Date</dt>
              <dd className="text-muted">{date}</dd>
            </div>

            <div>
              <dt className="font-medium text-ink">Time</dt>
              <dd className="text-muted">
                {time} — Asia/Colombo
              </dd>
            </div>

            <div>
              <dt className="font-medium text-ink">Topic</dt>
              <dd className="whitespace-pre-wrap break-words text-muted">
                {topic.trim()}
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-xs text-muted">
            Preview only. Nothing has been booked or saved.
          </p>
        </section>
      )}
    </div>
  );
}