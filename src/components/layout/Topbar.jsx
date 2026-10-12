import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Search, Flame, Zap, User } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import ThemeToggle from '../ui/ThemeToggle';

export default function Topbar({ onOpenMobileMenu }) {
  const { profile, levelInfo, streak } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-20 px-4 sm:px-8 flex items-center justify-between border-b border-slate-200 dark:border-[#232B3E] bg-white/80 dark:bg-[#0B0D12]/80 backdrop-blur-xl">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-[#232B3E] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#191F2D] transition-colors"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative flex-1 hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi atau topik (Matematika, Koding, Fisika)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </form>
      </div>

      {/* Right: Gamification Badges, Theme Toggle, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Streak Badge */}
        <div
          title={`Learning Streak: ${streak.count} hari berturut-turut`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-500 font-bold text-xs shadow-sm cursor-default"
        >
          <Flame className="w-4 h-4 fill-amber-500 animate-pulse" />
          <span>{streak.count} Hari</span>
        </div>

        {/* Level & XP Pill */}
        <Link
          to="/profile"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors"
          title={`Total XP: ${levelInfo.totalXp} XP`}
        >
          <Zap className="w-4 h-4 fill-indigo-500 text-indigo-500" />
          <span className="font-extrabold text-xs">Lvl {levelInfo.level}</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">|</span>
          <span className="font-bold text-xs text-cyan-500 dark:text-cyan-400">{levelInfo.totalXp} XP</span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Avatar */}
        <Link
          to="/profile"
          className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] transition-all"
          title="Buka Profil"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden md:inline text-xs font-bold text-slate-800 dark:text-white pr-1 truncate max-w-[100px]">
            {profile.name}
          </span>
        </Link>
      </div>
    </header>
  );
}
