import React from 'react';
import { Zap, Trophy, BookOpen, Target, Flame } from 'lucide-react';
import { useGame } from '../context/GameContext';
import StatCard from '../components/ui/StatCard';
import WelcomeHero from '../components/dashboard/WelcomeHero';
import DailyQuestsWidget from '../components/dashboard/DailyQuestsWidget';
import ActivityChart from '../components/dashboard/ActivityChart';
import ContinueLearningWidget from '../components/dashboard/ContinueLearningWidget';
import RecentActivityList from '../components/dashboard/RecentActivityList';

export default function Dashboard() {
  const { totalXp, levelInfo, streak, completedLessons, quizHistory } = useGame();

  // Average quiz accuracy
  const totalQuizzes = quizHistory.length;
  const avgAccuracy =
    totalQuizzes > 0
      ? Math.round(
          quizHistory.reduce((acc, q) => acc + (q.accuracy || 0), 0) / totalQuizzes
        )
      : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Welcome Hero */}
      <WelcomeHero />

      {/* 2. Key Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={Zap}
          title="Total Pengalaman"
          value={`${totalXp} XP`}
          subtext={`+${levelInfo.xpInCurrentLevel} XP di level saat ini`}
          badgeText="Akumulatif"
          badgeColor="cyan"
          colorClass="from-indigo-500/20 to-cyan-500/10 text-cyan-400"
        />

        <StatCard
          icon={Trophy}
          title="Level Pengguna"
          value={`Level ${levelInfo.level}`}
          subtext={levelInfo.title}
          badgeText={`${levelInfo.progressPercent}% to Lvl ${levelInfo.level + 1}`}
          badgeColor="indigo"
          colorClass="from-amber-500/20 to-indigo-500/10 text-amber-400"
        />

        <StatCard
          icon={BookOpen}
          title="Materi Selesai"
          value={`${completedLessons.length} Modul`}
          subtext="Kurikulum akademik terverifikasi"
          badgeText="Progress"
          badgeColor="emerald"
          colorClass="from-emerald-500/20 to-teal-500/10 text-emerald-400"
        />

        <StatCard
          icon={Target}
          title="Akurasi Quiz"
          value={`${avgAccuracy}%`}
          subtext={`Dari total ${totalQuizzes} sesi kuis`}
          badgeText={streak.count > 0 ? `${streak.count}d Streak` : 'Latihan'}
          badgeColor="amber"
          colorClass="from-rose-500/20 to-purple-500/10 text-rose-400"
        />
      </div>

      {/* 3. Main Dashboard Interactive Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column (2 cols): Activity Chart & Continue Learning */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <ActivityChart />
          <ContinueLearningWidget />
        </div>

        {/* Right Column (1 col): Daily Quests & Recent Activity */}
        <div className="space-y-6 lg:space-y-8">
          <DailyQuestsWidget />
          <RecentActivityList />
        </div>
      </div>
    </div>
  );
}
