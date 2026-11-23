import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  bookMentor,
  getMentors,
  getRewards,
  type Mentor,
} from '../services/mentorshipApi';

export function BookSession() {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [discountPct, setDiscountPct] = useState(0);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [topic, setTopic] = useState('');
  const [applyDiscount, setApplyDiscount] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([getMentors(), getRewards()])
      .then(([mentorData, rewardData]) => {
        if (!active) return;
        const found =
          mentorData.mentors.find((item) => item.id === mentorId) ?? null;
        setMentor(found);
        const topReward = rewardData.availableRewards[0];
        setDiscountPct(topReward ? topReward.discountPct : 0);
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
  }, [mentorId]);

  const today = new Date();
  const minimumDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const inputClass =
    'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-6 text-sm text-muted">
        Loading mentor details...
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-6">
        <h1 className="text-2xl font-bold text-ink">
          Mentor not found
        </h1>

        <p className="mt-2 text-muted">
          Please choose a mentor from the mentor list.
        </p>

        <Link
          to="/mentorship/mentors"
          className="mt-4 inline-block font-medium text-primary hover:underline"
        >
          Back to Find Mentors
        </Link>
      </div>
    );
  }

  const discountAmount =
    applyDiscount && discountPct > 0
      ? Math.round((mentor.fee * discountPct) / 100)
      : 0;
  const finalFee = mentor.fee - discountAmount;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!mentor || !date || !time || !topic.trim() || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      await bookMentor({
        mentorId: mentor.id,
        date,
        time,
        topic: topic.trim(),
        applyDiscount: applyDiscount && discountPct > 0,
      });
      navigate('/mentorship/sessions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed.');
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        to="/mentorship/mentors"
        className="inline-block text-sm font-medium text-primary hover:underline"
      >
        ← Back to Find Mentors
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-ink">
          Book a Session
        </h1>

        <p className="mt-2 text-muted">
          Choose when you would like to meet and what you need help with.
        </p>
      </div>

      <section className="rounded-2xl border border-line bg-white p-6 shadow-card">
        <p className="text-sm font-medium text-muted">
          Your selected mentor
        </p>

        <h2 className="mt-2 text-xl font-bold text-ink">
          {mentor.name}
        </h2>

        <p className="mt-1 text-sm text-primary">
          {mentor.role} · {mentor.durationMin} min · LKR {mentor.fee.toLocaleString('en-LK')}
        </p>

        <p className="mt-3 text-sm text-muted">
          {mentor.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {mentor.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <form
        onSubmit={handleSubmit}
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
            Sri Lanka time (Asia/Colombo).
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

        {discountPct > 0 && (
          <label className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm">
            <input
              type="checkbox"
              checked={applyDiscount}
              onChange={(event) => setApplyDiscount(event.target.checked)}
              className="mt-1 h-4 w-4 accent-primary"
            />
            <span>
              <span className="font-semibold text-ink">
                Apply {discountPct}% Leaderboard Reward Discount
              </span>
              <span className="block text-xs text-muted">
                Save LKR {Math.round((mentor.fee * discountPct) / 100).toLocaleString('en-LK')} on this session
              </span>
            </span>
          </label>
        )}

        <div className="flex items-center justify-between rounded-xl bg-canvas px-4 py-3 text-sm">
          <span className="font-medium text-muted">Total session fee</span>
          <span className="text-lg font-bold text-ink">
            LKR {finalFee.toLocaleString('en-LK')}
          </span>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!date || !time || !topic.trim() || submitting}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Booking session...' : 'Confirm & Book Session'}
        </button>
      </form>
    </div>
  );
}
