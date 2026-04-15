"use client";

import { useEffect, useState } from "react";

type Props = {
  track: string;
  lessonSlugs: string[];
};

const STORAGE_KEY = "insightlab:completed";

function loadCompleted(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function TrackProgress({ track, lessonSlugs }: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const all = loadCompleted();
    setCompleted(all[track] ?? []);
    setMounted(true);
  }, [track]);

  const total = lessonSlugs.length;
  const done = completed.filter((s) => lessonSlugs.includes(s)).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800/40">
        <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
        <div className="mt-3 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800/40">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            Your Progress
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {done} of {total} lessons completed
          </p>
        </div>
        <span
          className={`text-2xl font-black tabular-nums ${
            pct === 100
              ? "text-emerald-500"
              : pct > 0
              ? "text-blue-600 dark:text-blue-400"
              : "text-zinc-400"
          }`}
        >
          {pct}%
        </span>
      </div>

      {/* Bar */}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            pct === 100
              ? "bg-gradient-to-r from-emerald-500 to-teal-400"
              : "bg-gradient-to-r from-blue-600 to-cyan-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Lesson dots */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {lessonSlugs.map((slug, i) => {
          const isDone = completed.includes(slug);
          return (
            <span
              key={slug}
              title={`Lesson ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                isDone
                  ? "bg-blue-500 dark:bg-blue-400"
                  : "bg-zinc-200 dark:bg-zinc-600"
              }`}
            />
          );
        })}
      </div>

      {pct === 100 && (
        <p className="mt-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Track complete — well done!
        </p>
      )}
    </div>
  );
}
