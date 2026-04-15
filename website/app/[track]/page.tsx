import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrackLessons, getTracks } from "@/lib/lessons";
import TrackProgress from "@/components/TrackProgress";

const TRACK_META: Record<
  string,
  {
    subtitle: string;
    accent: string;
    barColor: string;
    iconBg: string;
    icon: React.ReactNode;
    tag: string;
  }
> = {
  sql: {
    subtitle: "Build strong SQL foundations from your first SELECT query to advanced window functions and analytics patterns.",
    accent: "from-blue-600/10 via-cyan-500/5 to-transparent",
    barColor: "from-blue-600 to-cyan-500",
    iconBg: "bg-blue-600",
    tag: "SQL Foundations to Analytics",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  metrics: {
    subtitle: "Design meaningful KPIs, build clear dashboards, and create measurement frameworks that drive real decisions.",
    accent: "from-violet-600/10 via-fuchsia-500/5 to-transparent",
    barColor: "from-violet-600 to-fuchsia-500",
    iconBg: "bg-violet-600",
    tag: "Metrics & Dashboard Thinking",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  "product-analytics": {
    subtitle: "Master funnels, retention curves, user behavior analysis, and monetization decisions used in top product teams.",
    accent: "from-emerald-600/10 via-teal-500/5 to-transparent",
    barColor: "from-emerald-600 to-teal-500",
    iconBg: "bg-emerald-600",
    tag: "Product Analytics",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
};

function toTitle(track: string): string {
  return track
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const tracks = await getTracks();
  return tracks.map((track) => ({ track: track.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  const lessons = await getTrackLessons(track);
  if (lessons.length === 0) return { title: "Track Not Found" };
  return { title: `${toTitle(track)} | InsightLab Academy` };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  const lessons = await getTrackLessons(track);

  if (lessons.length === 0) notFound();

  const meta = TRACK_META[track] ?? {
    subtitle: "Follow a structured sequence of lessons and learn with a clean documentation experience.",
    accent: "from-zinc-500/10 to-transparent",
    barColor: "from-zinc-600 to-zinc-500",
    iconBg: "bg-zinc-600",
    tag: "Track",
    icon: null,
  };

  const lessonSlugs = lessons.map((l) => l.slug);

  return (
    <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      {/* ── Track hero ── */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.accent}`} />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-10">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All tracks
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
            {/* Left: info */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${meta.iconBg} shadow-md`}>
                  {meta.icon}
                </span>
                <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-0.5 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  {meta.tag}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold capitalize tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                {toTitle(track)}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                {meta.subtitle}
              </p>

              <div className="mt-5 flex items-center gap-5 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  {lessons.length} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {lessons.length * 4} practice questions
                </span>
              </div>
            </div>

            {/* Right: progress card */}
            <div className="w-full lg:w-72 shrink-0">
              <TrackProgress track={track} lessonSlugs={lessonSlugs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Lesson list ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-950 sm:text-xl dark:text-white">
              Course Curriculum
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              Work through lessons in order for best results
            </p>
          </div>
          <Link
            href={`/${track}/${lessons[0].slug}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Start from lesson 1
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
              href={`/${track}/${lesson.slug}`}
              className="group flex items-center gap-5 rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              {/* Number */}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-sm font-bold tabular-nums text-zinc-500 transition group-hover:border-zinc-300 group-hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:border-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-zinc-900 truncate dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white">
                  {lesson.title}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500 truncate">
                  {lesson.fileName}
                </p>
              </div>

              {/* Metadata + arrow */}
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  4 questions
                </span>
              </div>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:text-zinc-600 dark:group-hover:text-zinc-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
