import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Play, BookOpen, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export default function WelcomeHero() {
  const { profile, levelInfo } = useGame();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#191F2D] border border-blue-500/30 p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-card-dark">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Belajar Mandiri Experience</span>
            <span className="text-slate-400">•</span>
            <span className="text-blue-500 dark:text-blue-400">{levelInfo.title}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Selamat datang kembali,{' '}
            <span className="text-blue-600 dark:text-blue-400">
              {profile.name}
            </span>
            !
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            "Level Up Your Knowledge." Kuasai materi akademik sekolah menengah, selesaikan misi harian, kumpulkan XP, dan raih badge pencapaian tertinggi hari ini.
          </p>
        </div>

        {/* Quick Action buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <Link
            to="/quiz"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Quick Start Quiz</span>
          </Link>

          <Link
            to="/courses"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-[#131722] dark:hover:bg-[#131722]/80 border border-slate-200 dark:border-[#232B3E] text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>Katalog Materi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
