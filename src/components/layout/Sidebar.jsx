import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Trophy,
  Medal,
  Bookmark,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
  Users,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import ProgressBar from '../ui/ProgressBar';
import UserAvatar from '../ui/UserAvatar';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { levelInfo, streak, profile, isLoggedIn } = useGame();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/courses', label: 'Materi Belajar', icon: BookOpen },
    { to: '/quiz', label: 'Quiz Center', icon: HelpCircle },
    { to: '/leaderboard', label: 'Peringkat', icon: Medal },
    { to: '/bookmarks', label: 'Simpanan', icon: Bookmark },
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
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30 shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight leading-none">
                Belajar Mandiri
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-1">
                Platform Belajar
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
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
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
        <Link
          to="/profile"
          className="p-4 m-3 rounded-2xl bg-slate-50 dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] hover:border-indigo-500/50 space-y-3 transition-colors block"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <UserAvatar
                avatarUrl={profile.avatarUrl}
                avatarId={profile.avatarId}
                name={profile.name}
                size="sm"
              />
              <div className="leading-tight">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[95px]">
                  {profile.name}
                </p>
                <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold truncate max-w-[95px]">
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
        </Link>
      ) : (
        <Link
          to="/profile"
          className="p-3 text-center border-t border-slate-200 dark:border-[#232B3E] flex items-center justify-center hover:opacity-80 transition-opacity"
          title="Buka Profil"
        >
          <UserAvatar
            avatarUrl={profile.avatarUrl}
            avatarId={profile.avatarId}
            name={profile.name}
            size="sm"
          />
        </Link>
      )}
    </aside>
  );
}
