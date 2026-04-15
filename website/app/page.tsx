import Link from "next/link";
import { getTracks } from "@/lib/lessons";

const TRACK_META: Record<
  string,
  {
    description: string;
    color: string;
    gradient: string;
    border: string;
    badge: string;
    badgeBg: string;
    icon: React.ReactNode;
    modules: string[];
  }
> = {
  sql: {
    description:
      "Master SQL from first query to advanced analytics patterns used in real product teams.",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-600/8 via-cyan-500/5 to-transparent",
    border: "group-hover:border-blue-300 dark:group-hover:border-blue-700",
    badge: "SQL",
    badgeBg: "bg-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    modules: ["SELECT & Filtering", "JOINs & Aggregation", "Window Functions", "Performance"],
  },
  metrics: {
    description:
      "Build KPI intuition, dashboard thinking, and practical metric design frameworks.",
    color: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-600/8 via-fuchsia-500/5 to-transparent",
    border: "group-hover:border-violet-300 dark:group-hover:border-violet-700",
    badge: "KPI",
    badgeBg: "bg-violet-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    modules: ["Metric Fundamentals", "KPI Design", "Business Metrics", "Dashboard Design"],
  },
  "product-analytics": {
    description:
      "Understand user behavior, retention, funnels, and monetization with product analytics.",
    color: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-600/8 via-teal-500/5 to-transparent",
    border: "group-hover:border-emerald-300 dark:group-hover:border-emerald-700",
    badge: "PA",
    badgeBg: "bg-emerald-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    modules: ["User Acquisition", "Onboarding & Activation", "Retention Analysis", "Monetization"],
  },
};

const STATS = [
  { value: "3", label: "Learning Tracks" },
  { value: "25", label: "Structured Lessons" },
  { value: "100", label: "Practice Questions" },
  { value: "Free", label: "Always" },
];

export default async function HomePage() {
  const tracks = await getTracks();

  return (
    <main className="flex-1">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white dark:bg-zinc-950">
        {/* background glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/6 blur-3xl dark:bg-blue-500/8" />
        <div className="pointer-events-none absolute top-20 right-0 h-80 w-80 rounded-full bg-violet-500/6 blur-3xl dark:bg-violet-500/8" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/6" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 md:px-10 md:pb-24 md:pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 dark:border-blue-800/60 dark:bg-blue-950/40">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">
              Free · Self-paced · No signup required
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl dark:text-white">
            Learn Data & Product{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Analytics
            </span>{" "}
            the right way
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Three structured tracks — SQL, Metrics, and Product Analytics —
            with docs-quality lessons and built-in practice exams to test what
            you've learned.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/sql"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Start with SQL
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="#tracks"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
            >
              Browse all tracks
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-zinc-200 bg-white/80 px-5 py-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80"
              >
                <p className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracks ── */}
      <section id="tracks" className="bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-10">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Curriculum
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              Three tracks, one destination
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              Each track is a self-contained curriculum of module-based lessons.
              Work through them in order or jump to what you need.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tracks.map((track) => {
              const meta = TRACK_META[track.slug] ?? {
                description: "Structured lessons for modern analytics workflows.",
                color: "text-zinc-600 dark:text-zinc-400",
                gradient: "from-zinc-500/8 to-transparent",
                border: "group-hover:border-zinc-400",
                badge: "TR",
                badgeBg: "bg-zinc-600",
                icon: null,
                modules: [],
              };

              return (
                <article
                  key={track.slug}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 ${meta.border}`}
                >
                  {/* Gradient wash on hover */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative flex flex-1 flex-col p-6">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${meta.badgeBg} text-white shadow-sm`}
                      >
                        {meta.icon}
                      </div>
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                        {track.lessonCount} lessons
                      </span>
                    </div>

                    {/* Title + description */}
                    <h3 className="mt-4 text-lg font-bold capitalize tracking-tight text-zinc-950 dark:text-zinc-100">
                      {track.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {meta.description}
                    </p>

                    {/* Module pills */}
                    {meta.modules.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {meta.modules.map((m) => (
                          <span
                            key={m}
                            className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                      <Link
                        href={`/${track.slug}`}
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold transition ${meta.color} group-hover:gap-2.5`}
                      >
                        Start learning
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-10">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              How it works
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Simple, focused, and built for real skill-building
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick a track",
                desc: "Choose SQL, Metrics, or Product Analytics based on what you need to learn first.",
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-50 dark:bg-blue-950/40",
              },
              {
                step: "02",
                title: "Read the lesson",
                desc: "Each module is a structured, docs-quality lesson with examples and practical takeaways.",
                color: "text-violet-600 dark:text-violet-400",
                bg: "bg-violet-50 dark:bg-violet-950/40",
              },
              {
                step: "03",
                title: "Take the exam",
                desc: "Four realistic practice questions per lesson with instant feedback and explanations.",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-50 dark:bg-emerald-950/40",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="flex flex-col items-start rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className={`text-3xl font-black ${step.color}`}>{step.step}</span>
                <h3 className="mt-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
