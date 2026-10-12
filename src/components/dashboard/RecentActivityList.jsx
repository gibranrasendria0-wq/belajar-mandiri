import React from 'react';
import { History, Brain, BookOpen, Clock } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export default function RecentActivityList() {
  const { quizHistory, completedLessons } = useGame();

  // Combine and sort recent activities
  const combinedActivities = [
    ...quizHistory.map((q) => ({
      id: q.id,
      type: 'quiz',
      title: `Kuis ${q.category.toUpperCase()} (${q.difficulty})`,
      detail: `${q.correctCount}/${q.totalQuestions} Benar (${q.accuracy}%)`,
      xp: q.xpEarned,
      date: q.completedAt,
    })),
    ...completedLessons.map((l) => ({
      id: l.id + (l.completedAt || ''),
      type: 'lesson',
      title: l.title || 'Materi Belajar',
      detail: `Kategori: ${l.category || 'Akademik'}`,
      xp: 25,
      date: l.completedAt,
    })),
  ]
    .filter((a) => a.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
          <History className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Aktivitas Terakhir
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Riwayat pengerjaan kuis dan penyelesaian materi
          </p>
        </div>
      </div>

      {combinedActivities.length === 0 ? (
        <div className="py-8 text-center rounded-2xl bg-slate-50 dark:bg-[#131722] border border-dashed border-slate-200 dark:border-[#232B3E]">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Belum ada aktivitas belajar. Mulai kuis atau buka materi untuk mencatat progres!
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {combinedActivities.map((act) => {
            const timeFormatted = new Date(act.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={act.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      act.type === 'quiz'
                        ? 'bg-indigo-500/10 text-indigo-500'
                        : 'bg-emerald-500/10 text-emerald-500'
                    }`}
                  >
                    {act.type === 'quiz' ? <Brain className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[180px] sm:max-w-xs">
                      {act.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>{act.detail}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeFormatted}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="shrink-0 text-xs font-black text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/20">
                  +{act.xp} XP
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
