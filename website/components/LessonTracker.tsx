"use client";

import { useEffect } from "react";

const STORAGE_KEY = "insightlab:completed";

function markCompleted(track: string, slug: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: Record<string, string[]> = raw ? JSON.parse(raw) : {};
    const current = all[track] ?? [];
    if (!current.includes(slug)) {
      all[track] = [...current, slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    }
  } catch {
    // ignore
  }
}

export default function LessonTracker({
  track,
  slug,
}: {
  track: string;
  slug: string;
}) {
  useEffect(() => {
    markCompleted(track, slug);
  }, [track, slug]);

  return null;
}
