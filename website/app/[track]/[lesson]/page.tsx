import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLesson, getTrackLessons, getTracks } from "@/lib/lessons";
import { getQuizForLesson } from "@/lib/quizData";
import QuizSection from "@/components/QuizSection";
import LessonTracker from "@/components/LessonTracker";

const TRACK_COLOR: Record<string, { active: string; dot: string; badge: string }> = {
  sql: {
    active: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    dot: "bg-blue-500",
    badge: "bg-blue-600",
  },
  metrics: {
    active: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
    dot: "bg-violet-500",
    badge: "bg-violet-600",
  },
  "product-analytics": {
    active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
    badge: "bg-emerald-600",
  },
};

function toTitle(s: string): string {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const tracks = await getTracks();
  const all = await Promise.all(
    tracks.map(async (track) => {
      const lessons = await getTrackLessons(track.slug);
      return lessons.map((lesson) => ({
        track: track.slug,
        lesson: lesson.slug,
      }));
    }),
  );
  return all.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; lesson: string }>;
}): Promise<Metadata> {
  const { track, lesson } = await params;
  const lessonData = await getLesson(track, lesson);
  if (!lessonData) return { title: "Lesson Not Found" };
  return { title: `${lessonData.title} | ${toTitle(track)}` };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ track: string; lesson: string }>;
}) {
  const { track, lesson } = await params;
  const lessonData = await getLesson(track, lesson);

  if (!lessonData) notFound();

  const trackLessons = await getTrackLessons(track);
  const quiz = getQuizForLesson(track, lessonData.slug);

  const currentIndex = trackLessons.findIndex((l) => l.slug === lessonData.slug);
  const prevLesson = currentIndex > 0 ? trackLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < trackLessons.length - 1 ? trackLessons[currentIndex + 1] : null;

  const colors = TRACK_COLOR[track] ?? {
    active: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100",
    dot: "bg-zinc-500",
    badge: "bg-zinc-600",
  };

  return (
    <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      {/* Auto-mark lesson as visited */}
      <LessonTracker track={track} slug={lessonData.slug} />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 sm:py-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-8 md:px-10">

        {/* ── Mobile top bar ── */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-2.5 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
          <Link href={`/${track}`} className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {toTitle(track)}
          </Link>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {currentIndex + 1} / {trackLessons.length}
          </span>
        </div>

        {/* ── Sidebar ── */}
        <aside className="h-fit md:sticky md:top-20">
          {/* Track header */}
          <div className="mb-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <Link
              href={`/${track}`}
              className="flex items-center gap-2 text-sm font-semibold text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {toTitle(track)}
            </Link>

            {/* Mini progress bar */}
            <div className="mt-3">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Lesson {currentIndex + 1} of {trackLessons.length}
                </span>
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {Math.round(((currentIndex + 1) / trackLessons.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    track === "sql"
                      ? "from-blue-600 to-cyan-500"
                      : track === "metrics"
                      ? "from-violet-600 to-fuchsia-500"
                      : "from-emerald-600 to-teal-500"
                  }`}
                  style={{
                    width: `${Math.round(((currentIndex + 1) / trackLessons.length) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Lesson list */}
          <nav className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Lessons
              </p>
            </div>
            <div className="max-h-[calc(100vh-20rem)] space-y-0.5 overflow-y-auto p-2">
              {trackLessons.map((item, i) => {
                const active = item.slug === lessonData.slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/${track}/${item.slug}`}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      active
                        ? colors.active + " font-semibold"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span className="shrink-0 w-5 text-right text-[11px] font-medium tabular-nums text-zinc-400 dark:text-zinc-600">
                      {i + 1}
                    </span>
                    <span className="line-clamp-2 leading-snug">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <div className="min-w-0 space-y-0">
          <article className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* Lesson header banner */}
            <div className={`rounded-t-2xl border-b border-zinc-100 bg-gradient-to-r px-6 py-4 dark:border-zinc-800 ${
              track === "sql"
                ? "from-blue-50 to-cyan-50/50 dark:from-blue-950/30 dark:to-zinc-900"
                : track === "metrics"
                ? "from-violet-50 to-fuchsia-50/50 dark:from-violet-950/30 dark:to-zinc-900"
                : "from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-zinc-900"
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    Lesson {currentIndex + 1}
                  </p>
                  <h1 className="mt-1 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                    {lessonData.title}
                  </h1>
                </div>
                <span className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold text-white shadow-sm ${colors.badge}`}>
                  {track === "sql" ? "SQL" : track === "metrics" ? "KPI" : "PA"}
                </span>
              </div>
            </div>

            {/* Lesson body */}
            <div className="px-5 py-6 sm:px-6 md:px-10 md:py-10">
              <div className="doc-content">
                <Markdown remarkPlugins={[remarkGfm]}>{lessonData.markdown}</Markdown>
              </div>

              {quiz && <QuizSection quiz={quiz} />}
            </div>
          </article>

          {/* ── Prev / Next navigation ── */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {prevLesson ? (
              <Link
                href={`/${track}/${prevLesson.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Previous
                </span>
                <span className="line-clamp-2 text-sm font-semibold text-zinc-800 transition group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                  {prevLesson.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/${track}/${nextLesson.slug}`}
                className="group col-start-2 flex flex-col items-end gap-1 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Next
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="line-clamp-2 text-right text-sm font-semibold text-zinc-800 transition group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                  {nextLesson.title}
                </span>
              </Link>
            ) : (
              <Link
                href={`/${track}`}
                className="group col-start-2 flex flex-col items-end gap-1 rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-emerald-800/50 dark:bg-emerald-950/30"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Track complete!
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </span>
                <span className="text-right text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  Back to {toTitle(track)}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
