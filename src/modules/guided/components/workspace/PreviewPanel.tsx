import React, { useState } from 'react';
import { TestAssertion } from '../../types/guided.types';
import {
  Globe,
  Terminal,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Layers,
  Plus,
  Send,
} from 'lucide-react';

interface PreviewPanelProps {
  testResults: TestAssertion[];
  validationStatus: 'idle' | 'running' | 'success' | 'failed';
  executionLogs: string[];
}

interface SimulatedTask {
  id: string;
  title: string;
  completed: boolean;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  testResults,
  validationStatus,
  executionLogs,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'api' | 'tests'>('preview');

  // Interactive Live Preview State
  const [tasks, setTasks] = useState<SimulatedTask[]>([
    { id: '1', title: 'Connect MongoDB Atlas Database', completed: true },
    { id: '2', title: 'Define Task Mongoose Schema', completed: true },
    { id: '3', title: 'Implement GET & POST Express Routes', completed: false },
    { id: '4', title: 'Hook React state to Live REST API', completed: false },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: SimulatedTask = {
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

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const passedCount = testResults.filter((t) => t.passed).length;

  return (
    <div className="flex h-full flex-col border-l border-slate-800 bg-slate-900/90 text-slate-200">
      {/* Tab Switcher */}
      <div className="flex h-10 shrink-0 items-center border-b border-slate-800 bg-slate-950 px-2">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'preview'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Live Preview</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'api'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Send className="h-3.5 w-3.5" />
          <span>API Response</span>
        </button>

        <button
          onClick={() => setActiveTab('tests')}
          className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'tests'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="h-3.5 w-3.5" />
          <span>Test Results</span>
          {validationStatus !== 'idle' && (
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                validationStatus === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {passedCount}/{testResults.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* ================= LIVE PREVIEW ================= */}
        {activeTab === 'preview' && (
          <div className="flex flex-col gap-3">
            {/* Browser frame address bar */}
            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-mono text-slate-400">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </span>
              <span className="mx-2 text-slate-700">|</span>
              <span className="text-slate-300">http://localhost:3000</span>
              <span className="ml-auto rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                200 OK
              </span>
            </div>

            {/* Interactive Task Manager UI */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Task Manager</h3>
                    <p className="text-[11px] text-slate-500">MERN Stack Live Preview</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
                  <button
                    onClick={() => setFilter('all')}
                    className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                      filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : ''
                    }`}
                  >
                    All ({tasks.length})
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                      filter === 'pending' ? 'bg-white text-slate-900 shadow-sm' : ''
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                      filter === 'completed' ? 'bg-white text-slate-900 shadow-sm' : ''
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>

              {/* Add form */}
              <form onSubmit={handleAddTask} className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter a task to test live React state..."
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:bg-white"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-blue-500"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </form>

              {/* Task list */}
              <div className="mt-3 divide-y divide-slate-100 max-h-56 overflow-y-auto">
                {filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className="flex cursor-pointer items-center justify-between py-2.5 px-1 hover:bg-slate-50 rounded"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleTask(t.id)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span
                        className={`text-xs ${
                          t.completed ? 'text-slate-400 line-through' : 'font-medium text-slate-800'
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.completed
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}
                    >
                      {t.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= API RESPONSE ================= */}
        {activeTab === 'api' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-sky-500/20 px-2 py-0.5 text-xs font-bold text-sky-400">
                  GET
                </span>
                <span className="text-slate-200 font-semibold">/api/tasks</span>
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400 font-bold">
                200 OK • 24ms
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Response Payload (JSON)
              </div>
              <pre className="text-emerald-300 leading-relaxed overflow-x-auto text-[11px]">
                {JSON.stringify(
                  tasks.map((t) => ({
                    _id: `66d8f${t.id}a92b`,
                    title: t.title,
                    completed: t.completed,
                    createdAt: '2026-11-11T10:00:00.000Z',
                  })),
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        )}

        {/* ================= TEST RESULTS ================= */}
        {activeTab === 'tests' && (
          <div className="space-y-4">
            {/* Summary strip */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-sky-400" />
                <span className="font-bold text-slate-200">
                  Test Suite: {passedCount}/{testResults.length} Passed
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 142ms
                </span>
                <span className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" /> 12MB
                </span>
              </div>
            </div>

            {/* Test assertions */}
            <div className="space-y-2">
              {testResults.map((test) => (
                <div
                  key={test.id}
                  className={`rounded-xl border p-3.5 text-xs transition-all ${
                    test.passed
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      {test.passed ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-white">{test.name}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {test.description}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        test.passed
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {test.passed ? 'PASS' : 'UNVERIFIED'}
                    </span>
                  </div>

                  {!test.passed && test.errorHint && (
                    <div className="mt-2 rounded bg-slate-900 p-2 text-[11px] text-amber-300/90 font-mono">
                      ↳ Hint: {test.errorHint}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal logs */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px]">
              <div className="mb-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                Sandbox Output Console
              </div>
              <div className="space-y-1 text-slate-300">
                {executionLogs.slice(-4).map((log, i) => (
                  <div key={i} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
