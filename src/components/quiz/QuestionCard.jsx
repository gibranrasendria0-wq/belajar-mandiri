import React from 'react';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import DifficultyBadge from '../ui/DifficultyBadge';

export default function QuestionCard({
  question,
  selectedIndex,
  isConfirmed,
  onSelectOption,
  onConfirmAnswer,
  onNextQuestion,
  isLastQuestion,
}) {
  if (!question) return null;

  const optionLetters = ['A', 'B', 'C', 'D'];

  const getOptionStyle = (index) => {
    if (!isConfirmed) {
      if (selectedIndex === index) {
        return 'border-indigo-500 bg-indigo-500/15 text-indigo-900 dark:text-white shadow-md ring-2 ring-indigo-500/30';
      }
      return 'border-slate-200 dark:border-[#232B3E] bg-white dark:bg-[#131722] hover:border-indigo-400 dark:hover:border-indigo-500/50 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#191F2D]';
    }

    // Confirmed state
    const isCorrectChoice = index === question.correctIndex;
    const isUserChoice = index === selectedIndex;

    if (isCorrectChoice) {
      return 'border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/40';
    }

    if (isUserChoice && !isCorrectChoice) {
      return 'border-rose-500 bg-rose-500/15 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/40';
    }

    return 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] opacity-50 text-slate-500';
  };

  const getBadgeStyle = (index) => {
    if (!isConfirmed) {
      if (selectedIndex === index) {
        return 'bg-indigo-600 text-white';
      }
      return 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300';
    }

    if (index === question.correctIndex) {
      return 'bg-emerald-600 text-white';
    }

    if (index === selectedIndex && index !== question.correctIndex) {
      return 'bg-rose-600 text-white';
    }

    return 'bg-slate-200 dark:bg-white/5 text-slate-400';
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-xl dark:shadow-card-dark space-y-6">
      {/* Category & Difficulty Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
          Kategori: {question.category}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      {/* Question Text */}
      <div className="space-y-2">
        <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            disabled={isConfirmed}
            onClick={() => onSelectOption(idx)}
            className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-4 ${getOptionStyle(
              idx
            )}`}
          >
            <div className="flex items-center gap-3.5">
              <span
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${getBadgeStyle(
                  idx
                )}`}
              >
                {optionLetters[idx]}
              </span>
              <span className="text-sm sm:text-base font-semibold leading-relaxed">
                {option}
              </span>
            </div>

            {/* Check/Cross icons when confirmed */}
            {isConfirmed && idx === question.correctIndex && (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 animate-scale-in" />
            )}
            {isConfirmed && idx === selectedIndex && idx !== question.correctIndex && (
              <XCircle className="w-6 h-6 text-rose-500 shrink-0 animate-scale-in" />
            )}
          </button>
        ))}
      </div>

      {/* Explanation Box (Revealed upon confirmation) */}
      {isConfirmed && (
        <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-[#131722] border border-indigo-200 dark:border-indigo-500/30 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Pembahasan & Penjelasan:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Bottom Action: Confirm OR Next */}
      <div className="pt-2 flex items-center justify-end">
        {!isConfirmed ? (
          <button
            disabled={selectedIndex === null}
            onClick={onConfirmAnswer}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all ${
              selectedIndex !== null
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
            }`}
          >
            Kunci Jawaban
          </button>
        ) : (
          <button
            onClick={onNextQuestion}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{isLastQuestion ? 'Lihat Hasil Akhir' : 'Soal Berikutnya'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
