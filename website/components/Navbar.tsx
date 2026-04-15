"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TRACKS = [
  { slug: "sql", label: "SQL" },
  { slug: "metrics", label: "Metrics" },
  { slug: "product-analytics", label: "Product Analytics" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 shadow-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            InsightLab <span className="text-zinc-400 dark:text-zinc-500 font-normal">Academy</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 sm:flex">
          {TRACKS.map((t) => {
            const active = pathname.startsWith(`/${t.slug}`);
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-700 sm:block dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            All Tracks
          </Link>
          {/* Mobile menu icon */}
          <Link
            href="/"
            className="flex sm:hidden items-center justify-center h-8 w-8 rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Home"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
