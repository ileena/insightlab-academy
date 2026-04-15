import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 md:px-10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-cyan-500">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            InsightLab Academy
          </span>
        </div>

        <nav className="flex items-center gap-5">
          <Link href="/sql" className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition">SQL</Link>
          <Link href="/metrics" className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition">Metrics</Link>
          <Link href="/product-analytics" className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition">Product Analytics</Link>
        </nav>

        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          © {new Date().getFullYear()} InsightLab Academy
        </p>
      </div>
    </footer>
  );
}
