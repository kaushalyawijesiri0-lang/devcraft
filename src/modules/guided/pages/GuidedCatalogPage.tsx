import React, { useState, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, FolderArchive } from 'lucide-react';
import { guidedProjectsList, GuidedProjectItem } from '../data/projectsData';
import { ProjectCard } from '../components/catalog/ProjectCard';
import { ProjectDetailSidebar } from '../components/catalog/ProjectDetailSidebar';
import { FilterPills } from '../components/catalog/FilterPills';

const DIFFICULTY_OPTIONS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const TECH_OPTIONS = ['All', 'React', 'Node.js', 'Express', 'MongoDB'];
const TECH_EXTRA_OPTIONS = ['JavaScript', 'Socket.io', 'JWT', 'OpenAI', 'Chart.js', 'API'];
const TYPE_OPTIONS = ['All', 'Web App', 'API', 'Full Stack'];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'duration', label: 'Shortest duration' },
  { value: 'steps', label: 'Fewest steps' },
];

export const GuidedCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSavedView = searchParams.get('view') === 'saved';

  // Saved bookmarks state
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('devcraft_saved_projects');
      if (stored) return new Set(JSON.parse(stored));
    } catch (_err) {
      console.warn(_err);
    }
    return new Set(['mern-task-manager']);
  });

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('devcraft_saved_projects', JSON.stringify(Array.from(next)));
      } catch (_e) {
        console.warn('Could not save bookmarks', _e);
      }
      return next;
    });
  };

  // Filter & Search states
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [tech, setTech] = useState('All');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('popular');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Selected project for right sidebar
  const [selectedProjectId, setSelectedProjectId] = useState<string>(guidedProjectsList[0].id);

  // Filtered list
  const filteredProjects = useMemo(() => {
    let list = isSavedView
      ? guidedProjectsList.filter((p) => savedIds.has(p.id))
      : guidedProjectsList;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q)) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (difficulty !== 'All') {
      list = list.filter((p) => p.difficulty === difficulty);
    }

    if (tech !== 'All') {
      list = list.filter((p) => p.tech.includes(tech));
    }

    if (type !== 'All') {
      list = list.filter((p) => p.type === type);
    }

    // Sort
    const sorted = [...list];
    if (sort === 'popular') sorted.sort((a, b) => b.popularity - a.popularity);
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === 'duration') sorted.sort((a, b) => a.minutes - b.minutes);
    else if (sort === 'steps') sorted.sort((a, b) => a.totalSteps - b.totalSteps);

    return sorted;
  }, [isSavedView, savedIds, query, difficulty, tech, type, sort]);

  // Selected project object
  const selectedProject: GuidedProjectItem = useMemo(() => {
    return (
      guidedProjectsList.find((p) => p.id === selectedProjectId) ||
      filteredProjects[0] ||
      guidedProjectsList[0]
    );
  }, [selectedProjectId, filteredProjects]);

  // Pagination (4 projects per page)
  const pageSize = 4;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const pagedProjects = filteredProjects.slice(page * pageSize, (page + 1) * pageSize);

  const clearAllFilters = () => {
    setQuery('');
    setDifficulty('All');
    setTech('All');
    setType('All');
    setSort('popular');
  };

  const handleOpenWorkspace = (projectId: string) => {
    navigate(`/guided/${projectId}/workspace`);
  };

  return (
    <div className="w-full">
      {/* 1. Page Header & Top Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-xs font-semibold text-brand">
            ~/guided-workspace
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {isSavedView ? 'Saved Projects' : 'Guided Projects'}
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Build real-world applications step by step with interactive coding exercises.
          </p>
        </div>

        {/* Search bar & filter toggle */}
        <div className="flex items-center gap-2 mt-1">
          <div className="relative w-72 sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search projects, technologies, or skills..."
              className="h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-xs text-ink-900 placeholder:text-ink-400 shadow-xs focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
            aria-label="Toggle filters"
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
              filtersOpen
                ? 'border-brand bg-brand-tint text-brand'
                : 'border-line bg-white text-ink-600 hover:border-brand-200 hover:text-ink-900'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2. Filter Groups: 3 columns in one horizontal bar */}
      {filtersOpen && (
        <div className="mt-6 flex flex-wrap items-start gap-x-12 gap-y-4">
          <FilterPills
            id="difficulty"
            label="Difficulty"
            options={DIFFICULTY_OPTIONS}
            value={difficulty}
            onChange={(v) => {
              setDifficulty(v);
              setPage(0);
            }}
          />
          <FilterPills
            id="tech"
            label="Technology"
            options={TECH_OPTIONS}
            extraOptions={TECH_EXTRA_OPTIONS}
            value={tech}
            onChange={(v) => {
              setTech(v);
              setPage(0);
            }}
          />
          <FilterPills
            id="type"
            label="Project type"
            options={TYPE_OPTIONS}
            value={type}
            onChange={(v) => {
              setType(v);
              setPage(0);
            }}
          />
        </div>
      )}

      {/* 3. Subheader: All Projects (count) + Sort Dropdown */}
      <div className="mt-8 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink-900">
          {isSavedView ? 'Saved Projects' : 'All Projects'}{' '}
          <span className="font-normal text-ink-500">({filteredProjects.length})</span>
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-500">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-8 rounded-lg border border-line bg-white px-2.5 text-xs font-semibold text-ink-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Main Grid: Projects List (Left) + Detail Sidebar (Right) */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_430px]">
        {/* Left Section: Cards */}
        <section aria-label="Projects list">
          {pagedProjects.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white/70 px-6 py-16 text-center shadow-card">
              <FolderArchive className="h-10 w-10 text-ink-400" />
              <p className="mt-3 font-semibold text-ink-900">
                {isSavedView ? 'No saved projects yet' : 'No projects match these filters'}
              </p>
              <p className="mt-1 text-sm text-ink-500">
                {isSavedView
                  ? 'Bookmark projects to quickly find them here later.'
                  : 'Try selecting a different filter or search term.'}
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-4 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover shadow-button transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {pagedProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  selected={p.id === selectedProject.id}
                  saved={savedIds.has(p.id)}
                  onSelect={() => setSelectedProjectId(p.id)}
                  onToggleSave={() => toggleSave(p.id)}
                  onOpen={() => handleOpenWorkspace(p.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-1.5">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPage(idx)}
                  aria-current={page === idx ? 'page' : undefined}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                    page === idx
                      ? 'bg-brand text-white shadow-button'
                      : 'border border-line bg-white text-ink-700 hover:border-brand-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                type="button"
                disabled={page === totalPages - 1}
                onClick={() => setPage((prev) => prev + 1)}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}
        </section>

        {/* Right Section: Sticky Project Detail Sidebar */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <ProjectDetailSidebar
            project={selectedProject}
            saved={savedIds.has(selectedProject.id)}
            onToggleSave={() => toggleSave(selectedProject.id)}
            onOpen={() => handleOpenWorkspace(selectedProject.id)}
          />
        </div>
      </div>
    </div>
  );
};
