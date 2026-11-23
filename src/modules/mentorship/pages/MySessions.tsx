import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getMentors,
  getSessions,
  type Mentor,
  type Session,
  type SessionStatus,
} from '../services/mentorshipApi';

const filters: Array<'All' | SessionStatus> = [
  'All',
  'Upcoming',
  'Completed',
  'Cancelled',
];

const statusStyles: Record<SessionStatus, string> = {
  Upcoming: 'bg-primary-soft text-primary',
  Completed: 'bg-green-50 text-green-700',
  Cancelled: 'bg-gray-100 text-gray-600',
};

export function MySessions() {
  const [filter, setFilter] = useState<'All' | SessionStatus>('All');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    Promise.all([getSessions(filter), getMentors()])
      .then(([sessionData, mentorData]) => {
        if (!active) return;
        setSessions(sessionData.sessions);
        setMentors(mentorData.mentors);
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
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">
            My Sessions
          </h1>

          <p className="mt-2 text-muted">
            View your upcoming sessions and past mentorship activity.
          </p>
        </div>

        <Link
          to="/mentorship/mentors"
          className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Find a Mentor
        </Link>
      </div>

      <div
        role="group"
        aria-label="Filter sessions by status"
        className="flex flex-wrap gap-2"
      >
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              filter === item
                ? 'bg-primary text-white'
                : 'border border-line bg-white text-muted hover:bg-primary-soft'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          Could not load sessions: {error}
        </div>
      )}

      <p role="status" className="text-sm text-muted">
        {loading
          ? 'Loading sessions...'
          : `${sessions.length} session${sessions.length === 1 ? '' : 's'} shown`}
      </p>

      {!loading && sessions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {sessions.map((session) => {
            const mentor = mentors.find((item) => item.id === session.mentorId);

            return (
              <article
                key={session.id}
                className="rounded-2xl border border-line bg-white p-6 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-ink">
                      {session.topic}
                    </h2>

                    <p className="mt-2 text-sm text-muted">
                      With {mentor?.name ?? 'Unavailable mentor'}
                    </p>

                    {mentor && (
                      <p className="mt-1 text-xs text-muted">
                        {mentor.role}
                      </p>
                    )}
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[session.status]
                    }`}
                  >
                    {session.status}
                  </span>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="font-medium text-ink">Date</dt>
                    <dd className="mt-1 text-muted">{session.date}</dd>
                  </div>

                  <div>
                    <dt className="font-medium text-ink">Time</dt>
                    <dd className="mt-1 text-muted">
                      {session.time} (Sri Lanka)
                    </dd>
                  </div>

                  <div>
                    <dt className="font-medium text-ink">Duration</dt>
                    <dd className="mt-1 text-muted">
                      {session.duration} minutes
                    </dd>
                  </div>

                  <div>
                    <dt className="font-medium text-ink">Fee</dt>
                    <dd className="mt-1 text-muted">
                      LKR {session.fee.toLocaleString('en-LK')}
                      {session.discountApplied > 0 && (
                        <span className="ml-1 text-xs text-green-700">
                          (saved LKR {session.discountApplied.toLocaleString('en-LK')})
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>

                {mentor && session.status === 'Completed' && (
                  <Link
                    to={`/mentorship/mentors/${mentor.id}/book`}
                    className="mt-5 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    Book another session
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        !loading && (
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-ink">
              No {filter === 'All' ? '' : `${filter.toLowerCase()} `}
              sessions
            </h2>

            <p className="mt-2 text-sm text-muted">
              There are no sessions matching this filter.
            </p>

            <button
              type="button"
              onClick={() => setFilter('All')}
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Show all sessions
            </button>
          </div>
        )
      )}
    </div>
  );
}
