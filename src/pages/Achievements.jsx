import React, { useState, useMemo } from 'react';
import { Trophy, Award, Lock, Sparkles, Filter } from 'lucide-react';
import { useGame } from '../context/GameContext';
import AchievementCard from '../components/gamification/AchievementCard';
import ProgressBar from '../components/ui/ProgressBar';

export default function Achievements() {
  const {
    allAchievements,
    unlockedAchievements,
    levelInfo,
    totalXp,
    quizHistory,
    completedLessons,
    streak,
  } = useGame();

  const [filterCategory, setFilterCategory] = useState('all');

  const unlockedMap = useMemo(() => {
    const map = new Map();
    unlockedAchievements.forEach((a) => map.set(a.id, a.unlockedAt));
    return map;
  }, [unlockedAchievements]);

  // Player stats bundle for calculating progress of locked badges
  const currentStats = useMemo(() => {
    return {
      level: levelInfo.level,
      totalXp,
      quizzesCompleted: quizHistory.length,
      lessonsCompletedCount: completedLessons.length,
      longestStreak: streak.longestStreak,
      hasPerfectScore: quizHistory.some((q) => q.accuracy === 100),
      totalQuestionsAnswered: quizHistory.reduce((acc, q) => acc + (q.totalQuestions || 0), 0),
      distinctCategoriesLearned: new Set(completedLessons.map((l) => l.category || 'general')).size,
    };
  }, [levelInfo.level, totalXp, quizHistory, completedLessons, streak.longestStreak]);

  const filteredAchievements = useMemo(() => {
    if (filterCategory === 'all') return allAchievements;
    return allAchievements.filter((a) => a.category === filterCategory);
  }, [allAchievements, filterCategory]);

  const totalBadges = allAchievements.length;
  const unlockedCount = unlockedAchievements.length;
  const progressPercent = Math.round((unlockedCount / Math.max(1, totalBadges)) * 100);

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-5xl mx-auto">
      {/* Header Banner with Trophy Progress */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-[#131722] to-[#191F2D] border border-indigo-500/30 p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Hall of Fame</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Koleksi Badge & Pencapaian
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Buktikan dedikasi belajarmu dengan membuka seluruh badge kehormatan. Setiap badge memberikan tambahan XP untuk mempercepat kenaikan level.
            </p>
          </div>

          <div className="w-full md:w-64 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Total Terbuka</span>
              <span className="text-lg font-black text-amber-400">
                {unlockedCount} / {totalBadges}
              </span>
            </div>
            <ProgressBar
              progress={progressPercent}
              height="h-2.5"
              gradient="from-amber-400 via-indigo-500 to-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'Semua Badge' },
          { id: 'quiz', label: 'Quiz & Akurasi' },
          { id: 'learning', label: 'Materi Belajar' },
          { id: 'streak', label: 'Streak Konsistensi' },
          { id: 'level', label: 'Level & XP' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterCategory === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'bg-white dark:bg-[#191F2D] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#232B3E] hover:border-indigo-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredAchievements.map((achievement) => {
          const isUnlocked = unlockedMap.has(achievement.id);
          const unlockedAt = unlockedMap.get(achievement.id);
          const progress = achievement.getProgress ? achievement.getProgress(currentStats) : null;

          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              isUnlocked={isUnlocked}
              unlockedAt={unlockedAt}
              progress={progress}
            />
          );
        })}
      </div>
    </div>
  );
}
