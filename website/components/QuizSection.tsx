"use client";

import { useState } from "react";
import type { LessonQuiz } from "@/lib/quizData";

type Props = {
  quiz: LessonQuiz;
};

type AnswerState = {
  selected: number;
  revealed: boolean;
};

const LABELS = ["A", "B", "C", "D"];

export default function QuizSection({ quiz }: Props) {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [showScore, setShowScore] = useState(false);

  const questions = quiz.questions;
  const answeredCount = Object.keys(answers).length;
  const correctCountActual = questions.filter(
    (q) => answers[q.id]?.selected === q.correctIndex
  ).length;

  const allAnswered = answeredCount === questions.length;
  const scorePercent =
    allAnswered ? Math.round((correctCountActual / questions.length) * 100) : 0;

  function handleSelect(questionId: string, optionIndex: number) {
    if (answers[questionId]) return; // already answered
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { selected: optionIndex, revealed: true },
    }));
  }

  function handleReset() {
    setAnswers({});
    setShowScore(false);
  }

  return (
    <section className="mt-10 border-t border-zinc-200 pt-10 dark:border-zinc-700">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Practice Exam
            </span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Test Your Understanding
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {questions.length} questions · Select an answer to see instant feedback
          </p>
        </div>

        {/* Progress pill */}
        {answeredCount > 0 && (
          <div className="shrink-0 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-800/60">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {answeredCount}/{questions.length}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">answered</div>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qi) => {
          const ans = answers[q.id];
          const isAnswered = !!ans;
          const isCorrect = isAnswered && ans.selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                !isAnswered
                  ? "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/40"
                  : isCorrect
                  ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-700/50 dark:bg-emerald-950/30"
                  : "border-red-200 bg-red-50/60 dark:border-red-800/40 dark:bg-red-950/20"
              }`}
            >
              {/* Question number + text */}
              <div className="mb-4 flex gap-3">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    !isAnswered
                      ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                      : isCorrect
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {!isAnswered ? (
                    qi + 1
                  ) : isCorrect ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <p className="text-sm font-semibold leading-relaxed text-zinc-800 dark:text-zinc-100 sm:text-base">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="ml-10 space-y-2.5">
                {q.options.map((option, oi) => {
                  const isSelected = isAnswered && ans.selected === oi;
                  const isTheCorrectOne = oi === q.correctIndex;
                  const showCorrectHighlight = isAnswered && isTheCorrectOne;

                  let optionStyle =
                    "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300 hover:bg-blue-50 cursor-pointer dark:border-zinc-600 dark:bg-zinc-700/40 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/30";

                  if (isAnswered) {
                    if (isSelected && isCorrect) {
                      optionStyle =
                        "border-emerald-400 bg-emerald-100 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-900/50 dark:text-emerald-200 cursor-default";
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        "border-red-400 bg-red-100 text-red-800 dark:border-red-500 dark:bg-red-900/40 dark:text-red-200 cursor-default";
                    } else if (showCorrectHighlight && !isCorrect) {
                      optionStyle =
                        "border-emerald-400 bg-emerald-100 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-900/50 dark:text-emerald-200 cursor-default";
                    } else {
                      optionStyle =
                        "border-zinc-200 bg-white/60 text-zinc-400 cursor-default dark:border-zinc-700 dark:bg-zinc-800/20 dark:text-zinc-500";
                    }
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(q.id, oi)}
                      disabled={isAnswered}
                      className={`group flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-150 ${optionStyle}`}
                    >
                      <span
                        className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          isAnswered
                            ? isSelected && isCorrect
                              ? "bg-emerald-500 text-white"
                              : isSelected && !isCorrect
                              ? "bg-red-500 text-white"
                              : showCorrectHighlight && !isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-zinc-100 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500"
                            : "bg-zinc-100 text-zinc-500 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-zinc-700 dark:text-zinc-400 dark:group-hover:bg-blue-900/40 dark:group-hover:text-blue-400"
                        }`}
                      >
                        {isAnswered && isSelected && isCorrect ? (
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : isAnswered && isSelected && !isCorrect ? (
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : isAnswered && showCorrectHighlight && !isCorrect ? (
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          LABELS[oi]
                        )}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div
                  className={`ml-10 mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    isCorrect
                      ? "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                      : "bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200"
                  }`}
                >
                  <span className="font-semibold">
                    {isCorrect ? "Correct! " : "Not quite — "}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Score banner */}
      {allAnswered && (
        <div
          className={`mt-8 rounded-2xl p-6 text-center ${
            scorePercent === 100
              ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
              : scorePercent >= 75
              ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
              : scorePercent >= 50
              ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
              : "bg-gradient-to-br from-red-500 to-rose-600 text-white"
          }`}
        >
          <div className="text-5xl font-black tracking-tight">
            {correctCountActual}/{questions.length}
          </div>
          <div className="mt-1 text-xl font-semibold opacity-90">
            {scorePercent === 100
              ? "Perfect score!"
              : scorePercent >= 75
              ? "Great work!"
              : scorePercent >= 50
              ? "Good effort — review the explanations"
              : "Keep studying — you've got this!"}
          </div>
          <div className="mt-1 text-sm opacity-75">{scorePercent}% correct</div>
          <button
            onClick={handleReset}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/30"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Try Again
          </button>
        </div>
      )}
    </section>
  );
}
