import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { StepFile } from '../../types/guided.types';
import { FileCode, Play, RefreshCw, Sparkles, Lock, Plus } from 'lucide-react';

interface EditorPanelProps {
  files: StepFile[];
  activeFileName: string;
  activeFile: StepFile;
  code: string;
  onCodeChange: (code: string) => void;
  onSelectFile: (fileName: string) => void;
  onReset: () => void;
  onRun: () => void;
  running?: boolean;
  locked?: boolean;
  onUnlockRequest?: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  files,
  activeFileName,
  activeFile,
  code,
  onCodeChange,
  onSelectFile,
  onReset,
  onRun,
  running = false,
  locked = false,
  onUnlockRequest,
}) => {
  const editorRef = useRef<any>(null);

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const lineCount = (code || '').split('\n').length;

  return (
    <section
      aria-label="Code editor"
      className="relative flex min-h-[560px] flex-col overflow-hidden rounded-2xl bg-[#090C10] shadow-card ring-1 ring-white/10 xl:min-h-[760px]"
    >
      {/* File Tabs Bar */}
      <div className="flex items-stretch justify-between border-b border-white/10 bg-[#0D1117] px-2">
        <div role="tablist" aria-label="Open files" className="flex flex-1 items-center gap-1 overflow-x-auto">
          {files.map((file) => {
            const isActive = file.name === activeFileName;
            return (
              <button
                key={file.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectFile(file.name)}
                className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-3 font-mono text-xs font-medium transition-colors ${
                  isActive ? 'bg-[#090C10] text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <FileCode className="h-3.5 w-3.5 text-brand" />
                <span>{file.name}</span>
                {file.readOnly && <Lock className="h-3 w-3 text-white/40" />}
                {isActive && (
                  <motion.span
                    layoutId="editor-tab"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-brand"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Plus tab button */}
        <div className="flex items-center px-2">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Add file"
            title="Add file"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Monaco Code Editor with Centered Lock Overlay */}
      <div className="relative flex-1 overflow-hidden">
        {/* Editor Background (blurred and read-only if locked) */}
        <div
          className={`h-full w-full transition-all duration-200 ${
            locked ? 'pointer-events-none select-none opacity-40 blur-[2px]' : ''
          }`}
        >
          <Editor
            height="100%"
            language={activeFile.language || 'javascript'}
            value={code}
            theme="vs-dark"
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            onChange={(val) => {
              if (!locked) {
                onCodeChange(val || '');
              }
            }}
            options={{
              readOnly: locked || activeFile.readOnly || false,
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              padding: { top: 12, bottom: 12 },
            }}
          />
        </div>

        {/* Centered Dark Lock Card Overlay */}
        {locked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-[#0B1329]/95 p-6 text-center shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/20 text-brand">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Editor locked</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                Answer one concept checkpoint to start coding this step.
              </p>
              {onUnlockRequest && (
                <button
                  type="button"
                  onClick={onUnlockRequest}
                  className="mt-4 w-full rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-button transition-all hover:bg-brand-hover active:scale-[0.99]"
                >
                  Open checkpoint
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Editor Bottom Bar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-t border-white/10 bg-[#0D1117] px-4 font-mono text-xs text-white/60">
        <div className="flex items-center gap-2 truncate">
          <span className="text-white/80">{activeFile.name}</span>
          <span>•</span>
          <span>JavaScript</span>
          <span>•</span>
          <span>{lineCount} lines</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline text-white/40">⌘/Ctrl + Enter to run</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            disabled={locked}
            title="Reset to boilerplate"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Format */}
          <button
            type="button"
            onClick={handleFormat}
            disabled={locked}
            title="Format Code"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Format</span>
          </button>

          {/* Run & Validate */}
          <button
            type="button"
            disabled={running || locked}
            onClick={onRun}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-button transition-all hover:bg-brand-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {running ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Validating Tests...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run &amp; Validate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
