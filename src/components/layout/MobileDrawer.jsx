import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Trophy,
  User,
  Settings,
  X,
  Zap,
  Flame,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import ProgressBar from '../ui/ProgressBar';

export default function MobileDrawer({ isOpen, onClose }) {
  const { levelInfo, streak, profile } = useGame();

  if (!isOpen) return null;

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/courses', label: 'Materi Belajar', icon: BookOpen },
    { to: '/quiz', label: 'Quiz Center', icon: HelpCircle },
    { to: '/achievements', label: 'Achievements', icon: Trophy },
    { to: '/profile', label: 'Profil & Statistik', icon: User },
    { to: '/settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed top-0 bottom-0 left-0 w-72 bg-white dark:bg-[#131722] border-r border-slate-200 dark:border-[#232B3E] shadow-2xl flex flex-col z-10 animate-slide-right">
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200 dark:border-[#232B3E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-glow-primary">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                Edu<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Gaming</span>
              </span>
              <p className="text-[10px] uppercase font-bold text-slate-400">Level Up Knowledge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#191F2D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#191F2D]'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Profile info */}
        <div className="p-4 m-4 rounded-2xl bg-slate-50 dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{profile.name}</p>
              <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold">{levelInfo.title}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{streak.count}d</span>
            </div>
          </div>
          <ProgressBar
            progress={levelInfo.progressPercent}
            height="h-2"
            label={`Lvl ${levelInfo.level}`}
            detail={`${levelInfo.xpInCurrentLevel}/${levelInfo.xpNeededForNext} XP`}
          />
        </div>
      </div>
    </div>
  );
}
