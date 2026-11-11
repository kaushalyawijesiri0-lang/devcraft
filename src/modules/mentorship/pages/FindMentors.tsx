import { useState } from 'react';
import { SearchIcon, UserIcon } from 'lucide-react';

const mentors = [
  {
    id: 'mentor-1',
    name: 'Nethmi',
    role: 'Frontend Developer',
    skills: ['React', 'JavaScript', 'CSS'],
    description:
      'Get help with React components, responsive layouts, and frontend projects.',
  },
  {
    id: 'mentor-2',
    name: 'Kavindu',
    role: 'Backend Developer',
    skills: ['Node.js', 'Express', 'MongoDB'],
    description:
      'Learn how to build APIs, structure backend applications, and work with databases.',
  },
  {
    id: 'mentor-3',
    name: 'Amaya',
    role: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB'],
    description:
      'Get guidance on connecting your frontend and backend into a complete application.',
  },
];

export function FindMentors() {
  const [search, setSearch] = useState('');

  const searchTerm = search.trim().toLowerCase();

  const filteredMentors = mentors.filter((mentor) => {
    const searchableText = [
      mentor.name,
      mentor.role,
      ...mentor.skills,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(searchTerm);
  });

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold text-ink">
          Find a Mentor
        </h1>

        <p className="mt-2 text-muted">
          Find guidance for your next coding challenge.
        </p>

        <span className="mt-3 inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
          Sample profiles
        </span>
      </div>

      {/* Search */}
      <div>
        <label
          htmlFor="mentor-search"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Search by name, role, or skill
        </label>

        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-muted"
            aria-hidden="true"
          />

          <input
            id="mentor-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try React, Node.js, or a mentor's name"
            className="w-full rounded-xl border border-line bg-white py-3 pl-12 pr-4 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <p role="status" className="text-sm text-muted">
        {filteredMentors.length}{' '}
        {filteredMentors.length === 1 ? 'mentor' : 'mentors'} found
      </p>

      {/* Mentor cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredMentors.map((mentor) => (
          <article
            key={mentor.id}
            className="rounded-2xl border border-line bg-white p-6 shadow-card"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-primary-soft p-3">
                <UserIcon
                  className="h-6 w-6 text-primary"
                  aria-hidden="true"
                />
              </span>

              <div>
                <h2 className="text-lg font-semibold text-ink">
                  {mentor.name}
                </h2>

                <p className="text-sm text-muted">
                  {mentor.role}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted">
              {mentor.description}
            </p>

            <ul
              aria-label={`${mentor.name}'s skills`}
              className="mt-5 flex flex-wrap gap-2"
            >
              {mentor.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Empty search result */}
      {filteredMentors.length === 0 && (
        <div className="rounded-2xl border border-line bg-white p-8 text-center">
          <h2 className="font-semibold text-ink">
            No mentors found
          </h2>

          <p className="mt-2 text-sm text-muted">
            Try another name or skill.
          </p>

          <button
            type="button"
            onClick={() => setSearch('')}
            className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-primary hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}