import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Zap,
  RotateCcw,
  Clock,
  ArrowRight,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import StatCard from '../components/ui/StatCard';

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recordQuizResult } = useGame();

  const result = location.state?.result;
  const hasRecordedRef = useRef(false);

  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'correct'

  // Record quiz result exactly ONCE to prevent duplicate XP exploitation
  useEffect(() => {
    if (result && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordQuizResult(result);
    }
  }, [result, recordQuizResult]);

  if (!result) {
    return (
      <div className="py-20 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          Tidak ada hasil kuis yang aktif.
        </h3>
        <p className="text-xs text-slate-500">
          Silakan ikuti sesi kuis terlebih dahulu untuk melihat hasil penilaian.
        </p>
        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm"
        >
          Buka Quiz Center
        </Link>
      </div>
    );
  }

  const {
    category,
    difficulty,
    totalQuestions,
    correctCount,
    accuracy,
    score,
    xpEarned,
    timeSpentSeconds,
    answersReview = [],
    originalConfig,
  } = result;

  const wrongCount = totalQuestions - correctCount;

  // Motivational message
  const getMotivation = () => {
    if (accuracy === 100) {
      return {
        title: 'Luar Biasa! Skor Sempurna!',
        desc: 'Pemahamanmu pada materi ini sudah sangat solid tanpa cela. Pertahankan konsistensi prestasimu!',
        badge: 'Perfect Mastery',
      };
    }
    if (accuracy >= 80) {
      return {
        title: 'Hasil Hebat! Pemahaman Tajam!',
        desc: 'Hampir sempurna! Kamu menguasai sebagian besar konsep pertanyaan dengan sangat baik.',
        badge: 'Sharp Thinker',
      };
    }
    if (accuracy >= 50) {
      return {
        title: 'Performa Bagus! Terus Tingkatkan!',
        desc: 'Kamu berada di jalur yang tepat. Tinjau pembahasan soal yang salah di bawah untuk memperkuat fondasimu.',
        badge: 'Good Effort',
      };
    }
    return {
      title: 'Jangan Menyerah, Tetap Semangat!',
      desc: 'Setiap kesalahan adalah batu loncatan menuju kepintaran. Pelajari pembahasan dan coba kembali kuis ini!',
      badge: 'Keep Pushing',
    };
  };

  const motivation = getMotivation();

  const filteredReviews = answersReview.filter((item) => {
    if (reviewFilter === 'wrong') return !item.isCorrect;
    if (reviewFilter === 'correct') return item.isCorrect;
    return true;
  });

  const handlePlayAgain = () => {
    navigate('/quiz/play', {
      state: originalConfig,
      replace: true,
    });
  };

  const handleRetryMistakes = () => {
    const wrongQuestions = answersReview
      .filter((a) => !a.isCorrect)
      .map((a) => a.question);

    if (wrongQuestions.length === 0) return;

    navigate('/quiz/play', {
      state: {
        category,
        difficulty,
        count: wrongQuestions.length,
        timerEnabled: originalConfig?.timerEnabled ?? true,
      },
      replace: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Hero Victory Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-[#131722] to-[#191F2D] border border-indigo-500/30 p-8 sm:p-12 text-center text-white shadow-2xl">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{motivation.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          {motivation.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-normal">
          {motivation.desc}
        </p>

        {/* Primary XP Gained Badge */}
        <div className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600/60 to-cyan-600/60 border border-cyan-400/40 text-cyan-300 text-lg font-black shadow-lg shadow-cyan-500/20">
          <Zap className="w-5 h-5 fill-current" />
          <span>+{xpEarned} XP Berhasil Diraih!</span>
        </div>
      </div>

      {/* Metrics Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={CheckCircle2}
          title="Jawaban Benar"
          value={`${correctCount} Soal`}
          subtext={`Dari ${totalQuestions} soal total`}
          badgeColor="emerald"
          colorClass="from-emerald-500/20 to-teal-500/10 text-emerald-400"
        />

        <StatCard
          icon={XCircle}
          title="Jawaban Salah"
          value={`${wrongCount} Soal`}
          subtext="Perlu dievaluasi"
          badgeColor="rose"
          colorClass="from-rose-500/20 to-red-500/10 text-rose-400"
        />

        <StatCard
          icon={Trophy}
          title="Akurasi"
          value={`${accuracy}%`}
          subtext="Tingkat ketepatan"
          badgeColor="indigo"
          colorClass="from-indigo-500/20 to-purple-500/10 text-indigo-400"
        />

        <StatCard
          icon={Clock}
          title="Durasi Pengerjaan"
          value={`${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s`}
          subtext="Waktu penyelesaian"
          badgeColor="amber"
          colorClass="from-amber-500/20 to-orange-500/10 text-amber-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        <button
          onClick={handlePlayAgain}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Main Lagi (Konfigurasi Sama)</span>
        </button>

        {wrongCount > 0 && (
          <button
            onClick={handleRetryMistakes}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi {wrongCount} Soal yang Salah</span>
          </button>
        )}

        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] text-slate-700 dark:text-slate-300 font-bold text-sm hover:border-indigo-500 transition-all"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Quiz Center</span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] text-slate-700 dark:text-slate-300 font-bold text-sm hover:border-indigo-500 transition-all"
        >
          <span>Kembali ke Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Review Soal & Pembahasan */}
      <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Review Pembahasan Soal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Periksa kunci jawaban dan penjelasan mendalam untuk setiap nomor
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reviewFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              Semua ({answersReview.length})
            </button>
            <button
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reviewFilter === 'wrong'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              Salah ({wrongCount})
            </button>
            <button
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reviewFilter === 'correct'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              Benar ({correctCount})
            </button>
          </div>
        </div>

        {/* List of Questions Reviewed */}
        <div className="space-y-4">
          {filteredReviews.map((rev, idx) => {
            const q = rev.question;
            const letters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={q.id || idx}
                className={`p-5 rounded-2xl border transition-all ${
                  rev.isCorrect
                    ? 'border-emerald-500/30 bg-emerald-50/20 dark:bg-[#131722]'
                    : 'border-rose-500/30 bg-rose-50/20 dark:bg-[#131722]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {q.difficulty}
                    </span>
                  </div>

                  {rev.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Benar (+{rev.xpEarned} XP)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-500">
                      <XCircle className="w-4 h-4" /> Salah
                    </span>
                  )}
                </div>

                <h4 className="mt-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {q.question}
                </h4>

                {/* Choices breakdown */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => {
                    const isKey = oIdx === q.correctIndex;
                    const isSelected = oIdx === rev.userSelectedIndex;

                    let bg = 'bg-white dark:bg-[#191F2D] border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400';
                    if (isKey) {
                      bg = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold';
                    } else if (isSelected && !isKey) {
                      bg = 'bg-rose-500/10 border-rose-500/40 text-rose-700 dark:text-rose-300 line-through';
                    }

                    return (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 ${bg}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-[10px]">
                          {letters[oIdx]}
                        </span>
                        <span className="truncate">{opt}</span>
                        {isKey && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="mt-3 p-3.5 rounded-xl bg-slate-100 dark:bg-[#191F2D] border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-indigo-500 dark:text-indigo-400 block mb-0.5">
                    Pembahasan:
                  </span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
