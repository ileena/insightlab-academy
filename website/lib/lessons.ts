import { existsSync, promises as fs } from "node:fs";
import path from "node:path";

export type TrackSummary = {
  slug: string;
  title: string;
  lessonCount: number;
};

export type LessonSummary = {
  slug: string;
  title: string;
  fileName: string;
};

const LESSONS_ROOT_CANDIDATES = [
  path.join(process.cwd(), "lessons"),
  path.join(process.cwd(), "..", "lessons"),
];

const LESSONS_ROOT =
  LESSONS_ROOT_CANDIDATES.find((candidate) => existsSync(candidate)) ??
  LESSONS_ROOT_CANDIDATES[0];

function humanizeSlug(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

async function readTrackDir(trackSlug: string): Promise<string[]> {
  if (!/^[a-z0-9-]+$/.test(trackSlug)) {
    return [];
  }

  const trackPath = path.join(LESSONS_ROOT, trackSlug);

  try {
    const entries = await fs.readdir(trackPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

function extractTitle(markdown: string, fallback: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return heading || fallback;
}

function stripReferenceSections(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const output: string[] = [];
  let skipUntilLevel: number | null = null;

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/);

    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].toLowerCase();

      if (skipUntilLevel !== null && level <= skipUntilLevel) {
        skipUntilLevel = null;
      }

      if (title.includes("references") || title === "reference") {
        skipUntilLevel = level;
        continue;
      }
    }

    if (skipUntilLevel === null) {
      output.push(line);
    }
  }

  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export async function getTracks(): Promise<TrackSummary[]> {
  const entries = await fs.readdir(LESSONS_ROOT, { withFileTypes: true });

  const trackDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const tracks = await Promise.all(
    trackDirs.map(async (slug) => {
      const lessons = await readTrackDir(slug);
      return {
        slug,
        title: humanizeSlug(slug),
        lessonCount: lessons.length,
      } satisfies TrackSummary;
    }),
  );

  return tracks.filter((track) => track.lessonCount > 0);
}

export async function getTrackLessons(trackSlug: string): Promise<LessonSummary[]> {
  const files = await readTrackDir(trackSlug);

  return Promise.all(
    files.map(async (fileName) => {
      const fullPath = path.join(LESSONS_ROOT, trackSlug, fileName);
      const markdown = await fs.readFile(fullPath, "utf8");
      const fileSlug = fileName.replace(/\.md$/, "");

      return {
        slug: fileSlug,
        title: extractTitle(markdown, humanizeSlug(fileSlug)),
        fileName,
      } satisfies LessonSummary;
    }),
  );
}

function resolveLessonFileName(files: string[], lessonSlug: string): string | null {
  const exactMatch = files.find((file) => file === `${lessonSlug}.md`);
  if (exactMatch) {
    return exactMatch;
  }

  const prefixMatch = files.find((file) => file.startsWith(`${lessonSlug}-`));
  return prefixMatch ?? null;
}

export async function getLesson(trackSlug: string, lessonSlug: string) {
  const files = await readTrackDir(trackSlug);
  const fileName = resolveLessonFileName(files, lessonSlug);

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(LESSONS_ROOT, trackSlug, fileName);
  const markdown = await fs.readFile(fullPath, "utf8");
  const resolvedSlug = fileName.replace(/\.md$/, "");

  return {
    slug: resolvedSlug,
    title: extractTitle(markdown, humanizeSlug(resolvedSlug)),
    markdown: stripReferenceSections(markdown),
  };
}
