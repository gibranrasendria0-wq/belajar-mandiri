import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Play, BookOpen, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export default function WelcomeHero() {
  const { profile, levelInfo } = useGame();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-[#131722] to-[#191F2D] border border-indigo-500/20 p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-card-dark">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>EduGaming Experience</span>
            <span className="text-white/30">•</span>
            <span className="text-cyan-400">{levelInfo.title}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Selamat datang kembali,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">
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
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Quick Start Quiz</span>
          </Link>

          <Link
            to="/courses"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Katalog Materi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
