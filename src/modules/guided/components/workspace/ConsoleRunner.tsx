import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, XCircle, ArrowRight, Trash2, Clock } from 'lucide-react';
import { TestAssertion } from '../../types/guided.types';

interface ConsoleRunnerProps {
  testResults: TestAssertion[];
  logs: string[];
  allPassed: boolean;
  onClearLogs: () => void;
  onNextStep: () => void;
}

export const ConsoleRunner: React.FC<ConsoleRunnerProps> = ({
  testResults,
  logs,
  allPassed,
  onClearLogs,
  onNextStep,
}) => {
  const [tab, setTab] = useState<'console' | 'tests'>('tests');
  const passedCount = testResults.filter((t) => t.passed).length;

  return (
    <div className="flex flex-col gap-4">
      <section
        aria-label="Console"
        className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
      >
        {/* Top tabs */}
        <div className="flex items-center justify-between border-b border-line p-1.5 bg-canvas">
          <div className="flex items-center gap-1">
            {[
              { id: 'tests', label: 'Test results' },
              { id: 'console', label: 'Console' },
            ].map((item) => {
              const isSelected = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id as any)}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'text-white'
                      : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="console-tab"
                      className="absolute inset-0 rounded-lg bg-brand shadow-button"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {item.id === 'tests' && (
                    <span
                      className={`relative rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        allPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-ink-100 text-ink-600'
                      }`}
                    >
                      {passedCount}/{testResults.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {tab === 'console' && (
            <button
              type="button"
              onClick={onClearLogs}
              title="Clear console"
              className="flex items-center gap-1 p-1 text-xs text-ink-400 hover:text-ink-700 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Tab panels */}
        <div className="p-4">
          {tab === 'tests' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-700 pb-1 border-b border-line">
                <span>Automated Validation Tests</span>
                <span className="flex items-center gap-1 text-[11px] text-ink-400 font-normal">
                  <Clock className="h-3 w-3" /> Real-time runner
                </span>
              </div>

              {testResults.map((test) => (
                <div
                  key={test.id}
                  className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-xs transition-colors ${
                    test.passed
                      ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900'
                      : 'border-line bg-white text-ink-700'
                  }`}
                >
                  {test.passed ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink-900">{test.name}</p>
                    <p className="text-[11px] text-ink-500 mt-0.5">
                      {test.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-navy-950 p-3 font-mono text-[11px] text-white/80 space-y-1 max-h-48 overflow-y-auto">
              <div className="flex items-center gap-1.5 text-white/40 pb-1 mb-1 border-b border-white/10">
                <Terminal className="h-3 w-3 text-brand" />
                <span>Node.js Express Sandbox Terminal</span>
              </div>
              {logs.map((line, i) => (
                <p key={i} className="leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Next Step Action Button */}
      {allPassed && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          type="button"
          onClick={onNextStep}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-button transition-all hover:bg-emerald-500 active:scale-[0.99]"
        >
          <span>All Tests Passed • Next Step</span>
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
};
