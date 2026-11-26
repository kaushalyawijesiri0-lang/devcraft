import { BotIcon, UsersIcon } from 'lucide-react';

export function Overview() {
  return (
    <div className="space-y-6">
      {}
      <div>
        <h1 className="text-3xl font-bold text-ink">
          Get unstuck. Keep building.
        </h1>

        <p className="mt-2 text-muted">
          Ask the AI mentor for a quick answer, or book time
          with a developer who has solved it before.
        </p>
      </div>

      {}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* AI mentor */}
        <section className="rounded-2xl border border-ink bg-ink p-6 text-white">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-white/10 p-3">
              <BotIcon
                className="h-6 w-6 text-primary-bright"
                aria-hidden="true"
              />
            </span>

            <h2 className="text-xl font-semibold">
              AI Mentor
            </h2>
          </div>

          <p className="mt-4 text-sm text-white/70">
            Instant help with concepts and code, any time of day.
          </p>

          <ul className="mt-5 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-sm">
            <li>
              <span className="text-primary-bright">
                $ explain
              </span>
              {' '}concepts in simple terms
            </li>

            <li>
              <span className="text-primary-bright">
                $ debug
              </span>
              {' '}your code, line by line
            </li>

            <li>
              <span className="text-primary-bright">
                $ review
              </span>
              {' '}for best practices
            </li>
          </ul>
        </section>

        {}
        <section className="rounded-2xl border border-line bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-primary-soft p-3">
              <UsersIcon
                className="h-6 w-6 text-primary"
                aria-hidden="true"
              />
            </span>

            <h2 className="text-xl font-semibold text-ink">
              Human Mentorship
            </h2>
          </div>

          <p className="mt-4 text-sm text-muted">
            Book focused, 1:1 guidance with a developer.
          </p>

          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm text-ink marker:text-primary">
            <li>Personalised guidance on your own code</li>
            <li>Talk through projects and career goals</li>
            <li>Learn from developers who ship every day</li>
          </ul>
        </section>
      </div>
    </div>
  );
}