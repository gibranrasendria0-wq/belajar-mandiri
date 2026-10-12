import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Trophy,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import ProgressBar from '../ui/ProgressBar';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { levelInfo, streak, profile } = useGame();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/courses', label: 'Materi Belajar', icon: BookOpen },
    { to: '/quiz', label: 'Quiz Center', icon: HelpCircle },
    { to: '/achievements', label: 'Achievements', icon: Trophy },
    { to: '/profile', label: 'Profil & Statistik', icon: User },
    { to: '/settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-[#232B3E] bg-white dark:bg-[#131722] ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-between px-5 border-b border-slate-200 dark:border-[#232B3E]">
        <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow-primary shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-none">
                Edu<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Gaming</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-1">
                Level Up Knowledge
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/25 dark:shadow-glow-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#191F2D]'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Mini Player Progression */}
      {!isCollapsed ? (
        <div className="p-4 m-3 rounded-2xl bg-slate-50 dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-xs font-black">
                {levelInfo.level}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  {profile.name}
                </p>
                <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold truncate max-w-[90px]">
                  {levelInfo.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{streak.count}d</span>
            </div>
          </div>

          <ProgressBar
            progress={levelInfo.progressPercent}
            height="h-2"
            label="Menuju Lvl "
            detail={`${levelInfo.xpInCurrentLevel}/${levelInfo.xpNeededForNext} XP`}
          />
        </div>
      ) : (
        <div className="p-3 text-center border-t border-slate-200 dark:border-[#232B3E]">
          <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            L{levelInfo.level}
          </div>
        </div>
      )}
    </aside>
  );
}
