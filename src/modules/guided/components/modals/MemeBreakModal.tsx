import React, { useState } from 'react';
import { memeRepository } from '../../data/memeRepository';
import { Coffee, ArrowRight, MessageSquare, ThumbsUp, Sparkles, X } from 'lucide-react';

interface MemeBreakModalProps {
  isOpen: boolean;
  consecutiveFails: number;
  onClose: () => void;
}

export const MemeBreakModal: React.FC<MemeBreakModalProps> = ({
  isOpen,
  consecutiveFails,
  onClose,
}) => {
  const [memeIndex, setMemeIndex] = useState(0);
  const meme = memeRepository[memeIndex % memeRepository.length];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/50 px-6 py-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-400">
            <Coffee className="h-3.5 w-3.5" />
            <span>Anti-Boredom &amp; Fatigue Relief</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-400">
              Consecutive Errors: <span className="font-bold text-amber-400">{consecutiveFails}</span>
            </span>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Take a 60-Second Breather
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Compiler anxiety detected! Rest your eyes and clear your mind before diving back into the code.
          </p>

          {/* Meme Card */}
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
            {/* Header info */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-bold text-slate-200">{meme.subreddit}</span>
              <span>•</span>
              <span>Posted by {meme.author}</span>
              <span>•</span>
              <span>{meme.timeAgo}</span>
            </div>

            {/* Caption */}
            <p className="mt-3 text-sm font-semibold text-slate-100">
              {meme.caption}
            </p>

            {/* Code Joke Box */}
            {meme.codeLines && (
              <div className="mt-3 space-y-1.5 rounded-lg border border-slate-800/80 bg-slate-900/90 p-3 font-mono text-xs">
                {meme.codeLines.map((line, idx) => (
                  <div key={idx} className="flex items-baseline gap-2">
                    <span className="shrink-0 font-bold" style={{ color: line.color }}>
                      {line.label}
                    </span>
                    <span className="text-slate-200">{line.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Social pills */}
            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-400">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-sky-400">
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{meme.upvotes}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{meme.commentsCount} comments</span>
              </div>
              <button
                type="button"
                onClick={() => setMemeIndex((i) => i + 1)}
                className="ml-auto inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next Meme</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/60 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Snooze for 10m
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500"
          >
            <span>Back to Coding (Esc)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
