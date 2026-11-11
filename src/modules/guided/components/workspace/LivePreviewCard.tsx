import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, Send, Plus, Check } from 'lucide-react';
import { TestAssertion } from '../../types/guided.types';

interface LivePreviewCardProps {
  checks: TestAssertion[];
}

interface MockTask {
  id: string;
  title: string;
  completed: boolean;
}

const initialTasks: MockTask[] = [
  { id: '1', title: 'Learn React Hooks', completed: true },
  { id: '2', title: 'Build Express REST API', completed: true },
  { id: '3', title: 'Design Database Schema', completed: false },
  { id: '4', title: 'Write Documentation', completed: false },
];

export const LivePreviewCard: React.FC<LivePreviewCardProps> = ({ checks }) => {
  const [tab, setTab] = useState<'preview' | 'api'>('preview');
  const [tasks, setTasks] = useState<MockTask[]>(initialTasks);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const allPassed = checks.every((c) => c.passed);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === 'Pending') return !t.completed;
      if (filter === 'Completed') return t.completed;
      return true;
    });
  }, [tasks, filter]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: MockTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const jsonResponse = allPassed
    ? JSON.stringify(
        tasks.map((t) => ({
          _id: `68f1c2d3${t.id}`,
          title: t.title,
          completed: t.completed,
        })),
        null,
        2
      )
    : `{
  "message": "Waiting for GET /api/tasks route validation..."
}`;

  return (
    <section
      aria-label="Live preview"
      className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
    >
      {/* Tabs bar */}
      <div className="flex items-center gap-1 border-b border-line p-1.5 bg-canvas">
        {[
          { id: 'preview', label: 'Live preview', icon: Globe },
          { id: 'api', label: 'API response', icon: Send },
        ].map((item) => {
          const isSelected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as any)}
              aria-pressed={isSelected}
              className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                isSelected
                  ? 'text-white'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="preview-tab"
                  className="absolute inset-0 rounded-lg bg-brand shadow-button"
                  transition={{ duration: 0.2 }}
                />
              )}
              <item.icon className="relative h-3.5 w-3.5" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="p-4">
        {tab === 'preview' ? (
          <div>
            {/* Address bar */}
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-line bg-canvas px-2.5 py-1 text-xs font-mono text-ink-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="truncate">http://localhost:3000</span>
              <span className="ml-auto rounded bg-emerald-50 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                200 OK
              </span>
            </div>

            {/* Task Manager Card */}
            <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white font-bold text-xs shadow-button">
                    ✓
                  </div>
                  <h3 className="font-bold text-ink-900 text-xs">Task Manager</h3>
                </div>

                <div className="flex gap-1 rounded-lg bg-canvas p-0.5 text-[11px] font-medium border border-line">
                  {(['All', 'Pending', 'Completed'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilter(cat)}
                      className={`rounded px-2 py-0.5 font-semibold transition-colors ${
                        filter === cat
                          ? 'bg-white text-ink-900 shadow-sm'
                          : 'text-ink-500 hover:text-ink-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add form */}
              <form onSubmit={handleAddTask} className="mt-3 flex gap-1.5">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Add new task..."
                  className="flex-1 rounded-lg border border-line bg-canvas px-2.5 py-1 text-xs text-ink-900 placeholder:text-ink-400 focus:border-brand focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1 text-xs font-semibold text-white shadow-button hover:bg-brand-hover transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add</span>
                </button>
              </form>

              {/* Tasks list */}
              <ul className="mt-3 divide-y divide-line max-h-48 overflow-y-auto">
                {filteredTasks.map((t) => (
                  <li
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className="flex cursor-pointer items-center justify-between py-2 text-xs hover:bg-canvas rounded px-1 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          t.completed
                            ? 'border-brand bg-brand text-white'
                            : 'border-line bg-white'
                        }`}
                      >
                        {t.completed && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span className={t.completed ? 'text-ink-400 line-through' : 'text-ink-800'}>
                        {t.title}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        t.completed
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {t.completed ? 'Completed' : 'Pending'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-line bg-navy-950 p-3 font-mono text-xs">
            <div className="mb-2 flex items-center justify-between text-[11px] text-white/60">
              <span className="font-bold text-brand">GET /api/tasks</span>
              <span className="text-emerald-400 font-semibold">Status: 200 OK</span>
            </div>
            <pre className="text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
              <code>{jsonResponse}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
